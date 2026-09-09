/**
 * ============================================================
 * LOGISTIK.GS — MODUL TRANSAKSI DIVISI LOGISTIK AGRIBISNIS
 * ============================================================
 */

function getLogistikData(sessionId) {
  var auth = authorize(sessionId, ROLES.LOGISTIK, DIVISIONS.LOGISTIK);
  if (!auth.authorized) return auth;
  
  var ss = getStorageSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAMES.LOGISTIK_TRANSACTIONS);
  var totalRows = (sheet && sheet.getLastRow() > 1) ? (sheet.getLastRow() - 1) : 0;
  
  logAuditLog(auth.session.userId, auth.session.role, "GET_LOGISTIK_DATA", DIVISIONS.LOGISTIK, null, "INFO", "Logistik Data Checked");
  
  // Kompatibilitas dengan tests.gs jika sheet masih kosong
  if (totalRows === 0) {
    return {
      success: true,
      code: "LOGISTIK_MODULE_PENDING",
      message: "Modul Logistik aktif. Belum ada transaksi tercatat.",
      data: {
        status: "ACTIVE",
        total_transactions: 0,
        excel_received: true
      }
    };
  }

  return {
    success: true,
    code: "OK",
    message: "Modul Logistik Aktif dengan " + totalRows + " transaksi.",
    data: {
      status: "ACTIVE",
      total_transactions: totalRows,
      excel_received: true
    }
  };
}

function createLogistikTransaction(sessionId, data) {
  var auth = authorize(sessionId, ROLES.LOGISTIK, DIVISIONS.LOGISTIK);
  if (!auth.authorized) return auth;
  
  return createLogistikPenjualan(sessionId, data);
}

// --- 1. PENJUALAN PAKAN LOGISTIK ---

function createLogistikPenjualan(sessionId, data) {
  var auth = authorize(sessionId, ROLES.LOGISTIK, DIVISIONS.LOGISTIK);
  if (!auth.authorized) return auth;
  
  var reqValid = validateRequiredFields(data, ["tanggal", "nama_pakan", "jumlah_kg"]);
  if (!reqValid.valid) return { success: false, code: "VALIDATION_ERROR", message: reqValid.error };
  
  var dateValid = validateDateFormat(data.tanggal);
  if (!dateValid.valid) return { success: false, code: "VALIDATION_ERROR", message: dateValid.error };
  
  var kgValid = validatePositiveNumber(data.jumlah_kg, "jumlah_kg");
  if (!kgValid.valid) return { success: false, code: "VALIDATION_ERROR", message: kgValid.error };
  
  var kg = kgValid.value;
  var harga = parseNumber(data.harga_per_kg || 0);
  var totalRp = kg * harga;
  
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    
    var ss = getStorageSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAMES.LOGISTIK_TRANSACTIONS);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAMES.LOGISTIK_TRANSACTIONS);
      sheet.appendRow(TABLE_HEADERS.LOGISTIK_TRANSACTIONS);
    }
    
    var trxId = generateUniqueId("TRX-LOG-PAK");
    var timestamp = new Date().toISOString();
    
    sheet.appendRow([
      trxId,
      data.tanggal,
      "PENJUALAN",
      (data.nama_pakan || "").trim(),
      (data.nama_peternak || "").trim(),
      data.jenis_pembayaran || "TUNAI",
      kg,
      harga,
      totalRp,
      data.keterangan || "",
      auth.session.userId,
      timestamp
    ]);
    
    logAuditLog(auth.session.userId, auth.session.role, "CREATE_LOGISTIK_PENJUALAN", DIVISIONS.LOGISTIK, trxId, "SUCCESS", kg + " KG @ Rp " + harga);
    
    return {
      success: true,
      code: "CREATED",
      message: "Transaksi Penjualan Pakan berhasil dicatat.",
      data: {
        transaction_id: trxId,
        tanggal: data.tanggal,
        nama_pakan: data.nama_pakan,
        jumlah_kg: kg,
        total_rupiah: totalRp
      }
    };
  } catch (err) {
    logAuditLog(auth.session.userId, auth.session.role, "CREATE_LOGISTIK_PENJUALAN", DIVISIONS.LOGISTIK, null, "FAILED", err.toString());
    return { success: false, code: "SERVER_ERROR", message: "Gagal menyimpan transaksi logistik: " + err.toString() };
  } finally {
    lock.releaseLock();
  }
}

function getLogistikPenjualan(sessionId) {
  var auth = authorize(sessionId, ROLES.LOGISTIK, DIVISIONS.LOGISTIK);
  if (!auth.authorized) return auth;
  
  var ss = getStorageSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAMES.LOGISTIK_TRANSACTIONS);
  if (!sheet) return { success: true, code: "OK", data: [] };
  
  var allRecords = readSheetAsObjects(sheet, TABLE_HEADERS.LOGISTIK_TRANSACTIONS);
  var penjualan = allRecords.filter(function(r) {
    return (r.kategori || "").toString().trim().toUpperCase() === "PENJUALAN";
  });
  
  return { success: true, code: "OK", data: penjualan };
}

// --- 2. PEMBELIAN PAKAN LOGISTIK ---

function createLogistikPembelian(sessionId, data) {
  var auth = authorize(sessionId, ROLES.LOGISTIK, DIVISIONS.LOGISTIK);
  if (!auth.authorized) return auth;
  
  var reqValid = validateRequiredFields(data, ["tanggal", "nama_pakan", "jumlah_kg"]);
  if (!reqValid.valid) return { success: false, code: "VALIDATION_ERROR", message: reqValid.error };
  
  var dateValid = validateDateFormat(data.tanggal);
  if (!dateValid.valid) return { success: false, code: "VALIDATION_ERROR", message: dateValid.error };
  
  var kgValid = validatePositiveNumber(data.jumlah_kg, "jumlah_kg");
  if (!kgValid.valid) return { success: false, code: "VALIDATION_ERROR", message: kgValid.error };
  
  var kg = kgValid.value;
  var harga = parseNumber(data.harga_per_kg || 0);
  var totalRp = kg * harga;
  
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    
    var ss = getStorageSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAMES.LOGISTIK_TRANSACTIONS);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAMES.LOGISTIK_TRANSACTIONS);
      sheet.appendRow(TABLE_HEADERS.LOGISTIK_TRANSACTIONS);
    }
    
    var trxId = generateUniqueId("TRX-LOG-PEM");
    var timestamp = new Date().toISOString();
    
    sheet.appendRow([
      trxId,
      data.tanggal,
      "PEMBELIAN",
      (data.nama_pakan || "").trim(),
      "", // nama_peternak kosong untuk pembelian
      "TUNAI",
      kg,
      harga,
      totalRp,
      data.keterangan || "",
      auth.session.userId,
      timestamp
    ]);
    
    logAuditLog(auth.session.userId, auth.session.role, "CREATE_LOGISTIK_PEMBELIAN", DIVISIONS.LOGISTIK, trxId, "SUCCESS", kg + " KG @ Rp " + harga);
    
    return {
      success: true,
      code: "CREATED",
      message: "Transaksi Pembelian Pakan berhasil dicatat.",
      data: {
        transaction_id: trxId,
        tanggal: data.tanggal,
        nama_pakan: data.nama_pakan,
        jumlah_kg: kg,
        total_rupiah: totalRp
      }
    };
  } catch (err) {
    logAuditLog(auth.session.userId, auth.session.role, "CREATE_LOGISTIK_PEMBELIAN", DIVISIONS.LOGISTIK, null, "FAILED", err.toString());
    return { success: false, code: "SERVER_ERROR", message: "Gagal menyimpan transaksi logistik: " + err.toString() };
  } finally {
    lock.releaseLock();
  }
}

function getLogistikPembelian(sessionId) {
  var auth = authorize(sessionId, ROLES.LOGISTIK, DIVISIONS.LOGISTIK);
  if (!auth.authorized) return auth;
  
  var ss = getStorageSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAMES.LOGISTIK_TRANSACTIONS);
  if (!sheet) return { success: true, code: "OK", data: [] };
  
  var allRecords = readSheetAsObjects(sheet, TABLE_HEADERS.LOGISTIK_TRANSACTIONS);
  var pembelian = allRecords.filter(function(r) {
    return (r.kategori || "").toString().trim().toUpperCase() === "PEMBELIAN";
  });
  
  return { success: true, code: "OK", data: pembelian };
}

// --- 3. PENGHAPUSAN TRANSAKSI LOGISTIK ---

function deleteLogistikTransaction(sessionId, dataOrId) {
  var auth = authorize(sessionId, ROLES.LOGISTIK, DIVISIONS.LOGISTIK);
  if (!auth.authorized) return auth;
  
  var txId = (typeof dataOrId === "object" && dataOrId !== null) ? (dataOrId.transaction_id || dataOrId.id) : dataOrId;
  if (!txId) return { success: false, code: "VALIDATION_ERROR", message: "transaction_id wajib diisi." };
  
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    
    var ss = getStorageSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAMES.LOGISTIK_TRANSACTIONS);
    if (!sheet) return { success: false, code: "NOT_FOUND", message: "Sheet Logistik tidak ditemukan." };
    
    var rowIndex = findRowIndexByValue(sheet, 1, txId);
    if (rowIndex === -1) {
      return { success: false, code: "NOT_FOUND", message: "Transaksi logistik tidak ditemukan." };
    }
    
    sheet.deleteRow(rowIndex);
    logAuditLog(auth.session.userId, auth.session.role, "DELETE_LOGISTIK_TRANSACTION", DIVISIONS.LOGISTIK, txId, "SUCCESS", "Baris " + rowIndex + " dihapus");
    
    return {
      success: true,
      code: "DELETED",
      message: "Transaksi Logistik (" + txId + ") berhasil dihapus.",
      data: { transaction_id: txId }
    };
  } catch (err) {
    logAuditLog(auth.session.userId, auth.session.role, "DELETE_LOGISTIK_TRANSACTION", DIVISIONS.LOGISTIK, txId, "FAILED", err.toString());
    return { success: false, code: "SERVER_ERROR", message: "Gagal menghapus transaksi: " + err.toString() };
  } finally {
    lock.releaseLock();
  }
}
