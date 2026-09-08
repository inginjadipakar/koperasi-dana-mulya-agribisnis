/**
 * ============================================================
 * KOPERASI.GS — MODUL TRANSAKSI PENERIMAAN & PENGELUARAN KOPERASI
 * ============================================================
 */

// --- 1. PENERIMAAN SUSU KOPERASI ---

function createKoperasiPenerimaan(sessionId, data) {
  var auth = authorize(sessionId, ROLES.KOPERASI, DIVISIONS.KOPERASI);
  if (!auth.authorized) return auth;
  
  var reqValid = validateRequiredFields(data, ["tanggal", "kategori_sumber", "nama_sumber", "jumlah_kg"]);
  if (!reqValid.valid) return { success: false, code: "VALIDATION_ERROR", message: reqValid.error };
  
  var dateValid = validateDateFormat(data.tanggal);
  if (!dateValid.valid) return { success: false, code: "VALIDATION_ERROR", message: dateValid.error };
  
  var kgValid = validatePositiveNumber(data.jumlah_kg, "jumlah_kg");
  if (!kgValid.valid) return { success: false, code: "VALIDATION_ERROR", message: kgValid.error };
  
  var kg = kgValid.value;
  var harga = parseNumber(data.harga_per_kg);
  
  if (data.kategori_sumber === "NON_ANGGOTA") {
    var hargaValid = validatePositiveNumber(data.harga_per_kg, "harga_per_kg");
    if (!hargaValid.valid) return { success: false, code: "VALIDATION_ERROR", message: "Untuk Non-Anggota, harga per KG harus berupa angka positif." };
    harga = hargaValid.value;
  } else {
    harga = 0; // Anggota harian Rp = 0
  }
  
  // Backend Calculation (Ignore client total_rupiah)
  var totalRp = (data.kategori_sumber === "NON_ANGGOTA") ? (kg * harga) : 0;
  
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    
    var ss = getStorageSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAMES.KOPERASI_PENERIMAAN);
    var trxId = generateUniqueId("TRX-KOP-REC");
    var timestamp = new Date().toISOString();
    
    sheet.appendRow([
      trxId,
      dateValid.value,
      data.kategori_sumber,
      String(data.nama_sumber).trim(),
      kg,
      harga,
      totalRp,
      String(data.keterangan || "").trim(),
      auth.session.userId,
      timestamp
    ]);
    
    logAuditLog(auth.session.userId, auth.session.role, "CREATE_KOPERASI_PENERIMAAN", DIVISIONS.KOPERASI, trxId, "SUCCESS", "KG: " + kg);
    return { success: true, code: "CREATED", message: "Transaksi Penerimaan Koperasi berhasil disimpan.", data: { transaction_id: trxId } };
  } catch (e) {
    return { success: false, code: "CONCURRENCY_ERROR", message: "Gagal menyimpan transaksi (Lock timeout): " + e.toString() };
  } finally {
    lock.releaseLock();
  }
}

function getKoperasiPenerimaan(sessionId, startDate, endDate) {
  var auth = authorize(sessionId, null, DIVISIONS.KOPERASI);
  if (!auth.authorized) return auth;
  
  var ss = getStorageSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAMES.KOPERASI_PENERIMAAN);
  var records = readSheetAsObjects(sheet, TABLE_HEADERS.KOPERASI_PENERIMAAN);
  
  if (startDate && endDate) {
    var sDate = formatDateISO(startDate);
    var eDate = formatDateISO(endDate);
    records = records.filter(function(r) {
      var rDate = formatDateISO(r.tanggal);
      return rDate >= sDate && rDate <= eDate;
    });
  }
  
  return { success: true, code: "OK", data: records };
}

// --- 2. PENGELUARAN / PENJUALAN SUSU KOPERASI ---

function createKoperasiPengeluaran(sessionId, data) {
  var auth = authorize(sessionId, ROLES.KOPERASI, DIVISIONS.KOPERASI);
  if (!auth.authorized) return auth;
  
  var reqValid = validateRequiredFields(data, ["tanggal", "kategori_tujuan", "nama_tujuan", "jumlah_kg"]);
  if (!reqValid.valid) return { success: false, code: "VALIDATION_ERROR", message: reqValid.error };
  
  var dateValid = validateDateFormat(data.tanggal);
  if (!dateValid.valid) return { success: false, code: "VALIDATION_ERROR", message: dateValid.error };
  
  var kgValid = validatePositiveNumber(data.jumlah_kg, "jumlah_kg");
  if (!kgValid.valid) return { success: false, code: "VALIDATION_ERROR", message: kgValid.error };
  
  var kg = kgValid.value;
  var harga = 0;
  
  if (data.kategori_tujuan === "PENJUALAN") {
    var hargaValid = validatePositiveNumber(data.harga_per_kg, "harga_per_kg");
    if (!hargaValid.valid) return { success: false, code: "VALIDATION_ERROR", message: "Untuk Kategori PENJUALAN, harga per KG harus berupa angka positif." };
    harga = hargaValid.value;
  } else {
    harga = 0; // Lain-lain Rp = 0
  }
  
  // Backend Calculation (Ignore client total_rupiah)
  var totalRp = (data.kategori_tujuan === "PENJUALAN") ? (kg * harga) : 0;
  
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    
    var ss = getStorageSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAMES.KOPERASI_PENGELUARAN);
    var trxId = generateUniqueId("TRX-KOP-OUT");
    var timestamp = new Date().toISOString();
    
    sheet.appendRow([
      trxId,
      dateValid.value,
      data.kategori_tujuan,
      String(data.nama_tujuan).trim(),
      kg,
      harga,
      totalRp,
      String(data.keterangan || "").trim(),
      auth.session.userId,
      timestamp
    ]);
    
    logAuditLog(auth.session.userId, auth.session.role, "CREATE_KOPERASI_PENGELUARAN", DIVISIONS.KOPERASI, trxId, "SUCCESS", "KG: " + kg);
    return { success: true, code: "CREATED", message: "Transaksi Pengeluaran Koperasi berhasil disimpan.", data: { transaction_id: trxId } };
  } catch (e) {
    return { success: false, code: "CONCURRENCY_ERROR", message: "Gagal menyimpan transaksi: " + e.toString() };
  } finally {
    lock.releaseLock();
  }
}

function getKoperasiPengeluaran(sessionId, startDate, endDate) {
  var auth = authorize(sessionId, null, DIVISIONS.KOPERASI);
  if (!auth.authorized) return auth;
  
  var ss = getStorageSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAMES.KOPERASI_PENGELUARAN);
  var records = readSheetAsObjects(sheet, TABLE_HEADERS.KOPERASI_PENGELUARAN);
  
  if (startDate && endDate) {
    var sDate = formatDateISO(startDate);
    var eDate = formatDateISO(endDate);
    records = records.filter(function(r) {
      var rDate = formatDateISO(r.tanggal);
      return rDate >= sDate && rDate <= eDate;
    });
  }
  
  return { success: true, code: "OK", data: records };
}
