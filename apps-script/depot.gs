/**
 * ============================================================
 * DEPOT.GS — MODUL TRANSAKSI & STOK DEPOT SUSU
 * ============================================================
 */

// --- 1. PEMBELIAN FROM PROCESSING ---

function createDepotPembelian(sessionId, data) {
  var auth = authorize(sessionId, ROLES.DEPOT, DIVISIONS.DEPOT);
  if (!auth.authorized) return auth;
  
  var reqValid = validateRequiredFields(data, ["tanggal", "harga_per_kg", "jumlah_kg"]);
  if (!reqValid.valid) return { success: false, code: "VALIDATION_ERROR", message: reqValid.error };
  
  var dateValid = validateDateFormat(data.tanggal);
  if (!dateValid.valid) return { success: false, code: "VALIDATION_ERROR", message: dateValid.error };
  
  var kgValid = validatePositiveNumber(data.jumlah_kg, "jumlah_kg");
  if (!kgValid.valid) return { success: false, code: "VALIDATION_ERROR", message: kgValid.error };
  
  var hargaValid = validatePositiveNumber(data.harga_per_kg, "harga_per_kg");
  if (!hargaValid.valid) return { success: false, code: "VALIDATION_ERROR", message: hargaValid.error };
  
  var kg = kgValid.value;
  var harga = hargaValid.value;
  
  // Backend Calculation (GOLDEN RULE): Liter = KG / 1.025; Total Rp = KG * Harga
  var liter = roundDecimal(kg / MILK_DENSITY_FACTOR, 4);
  var totalRp = roundDecimal(kg * harga, 2);
  
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    
    var ss = getStorageSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAMES.DEPOT_PEMBELIAN);
    var trxId = generateUniqueId("TRX-DEP-PUR");
    var timestamp = new Date().toISOString();
    
    sheet.appendRow([
      trxId,
      dateValid.value,
      harga,
      kg,
      MILK_DENSITY_FACTOR,
      liter,
      totalRp,
      String(data.keterangan || "").trim(),
      auth.session.userId,
      timestamp
    ]);
    
    logAuditLog(auth.session.userId, auth.session.role, "CREATE_DEPOT_PEMBELIAN", DIVISIONS.DEPOT, trxId, "SUCCESS", "Liter: " + liter);
    return { success: true, code: "CREATED", message: "Pembelian Depot berhasil disimpan.", data: { transaction_id: trxId, jumlah_liter: liter, total_rupiah: totalRp } };
  } catch (e) {
    return { success: false, code: "CONCURRENCY_ERROR", message: "Gagal menyimpan: " + e.toString() };
  } finally {
    lock.releaseLock();
  }
}

function getDepotPembelian(sessionId, startDate, endDate) {
  var auth = authorize(sessionId, null, DIVISIONS.DEPOT);
  if (!auth.authorized) return auth;
  
  var ss = getStorageSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAMES.DEPOT_PEMBELIAN);
  // FIX GS-B-D1: Guard null agar tidak crash jika sheet belum dibuat
  if (!sheet) return { success: true, code: "OK", data: [] };
  var records = readSheetAsObjects(sheet, TABLE_HEADERS.DEPOT_PEMBELIAN);
  
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

// --- 2. PENJUALAN AGEN / PELANGGAN ---

function createDepotPenjualan(sessionId, data) {
  var auth = authorize(sessionId, ROLES.DEPOT, DIVISIONS.DEPOT);
  if (!auth.authorized) return auth;
  
  var reqValid = validateRequiredFields(data, ["tanggal", "nama_agen", "harga_per_liter", "jumlah_liter"]);
  if (!reqValid.valid) return { success: false, code: "VALIDATION_ERROR", message: reqValid.error };
  
  var dateValid = validateDateFormat(data.tanggal);
  if (!dateValid.valid) return { success: false, code: "VALIDATION_ERROR", message: dateValid.error };
  
  var literValid = validatePositiveNumber(data.jumlah_liter, "jumlah_liter");
  if (!literValid.valid) return { success: false, code: "VALIDATION_ERROR", message: literValid.error };
  
  var hargaValid = validatePositiveNumber(data.harga_per_liter, "harga_per_liter");
  if (!hargaValid.valid) return { success: false, code: "VALIDATION_ERROR", message: hargaValid.error };
  
  var liter = literValid.value;
  var harga = hargaValid.value;
  
  // Backend Calculation: Total Rp
  var totalRp = (data.total_rp !== undefined && data.total_rp !== null && data.total_rp !== "") 
    ? parseNumber(data.total_rp) 
    : (liter * harga);
  
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    
    var ss = getStorageSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAMES.DEPOT_PENJUALAN);
    var trxId = generateUniqueId("TRX-DEP-SAL");
    var timestamp = new Date().toISOString();
    
    sheet.appendRow([
      trxId,
      dateValid.value,
      String(data.nama_agen).trim(),
      harga,
      liter,
      totalRp,
      String(data.keterangan || "").trim(),
      auth.session.userId,
      timestamp
    ]);
    
    logAuditLog(auth.session.userId, auth.session.role, "CREATE_DEPOT_PENJUALAN", DIVISIONS.DEPOT, trxId, "SUCCESS", "Liter: " + liter);
    return { success: true, code: "CREATED", message: "Penjualan Depot berhasil disimpan.", data: { transaction_id: trxId, total_rupiah: totalRp } };
  } catch (e) {
    return { success: false, code: "CONCURRENCY_ERROR", message: "Gagal menyimpan: " + e.toString() };
  } finally {
    lock.releaseLock();
  }
}

function getDepotPenjualan(sessionId, startDate, endDate) {
  var auth = authorize(sessionId, null, DIVISIONS.DEPOT);
  if (!auth.authorized) return auth;
  
  var ss = getStorageSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAMES.DEPOT_PENJUALAN);
  // FIX GS-B-D1: Guard null agar tidak crash jika sheet belum dibuat
  if (!sheet) return { success: true, code: "OK", data: [] };
  var records = readSheetAsObjects(sheet, TABLE_HEADERS.DEPOT_PENJUALAN);
  
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

// --- 3. PENGELUARAN LAIN-LAIN / SUSUT / SOSIAL ---

function createDepotLainLain(sessionId, data) {
  var auth = authorize(sessionId, ROLES.DEPOT, DIVISIONS.DEPOT);
  if (!auth.authorized) return auth;
  
  var reqValid = validateRequiredFields(data, ["tanggal", "jenis_pengeluaran", "jumlah_liter"]);
  if (!reqValid.valid) return { success: false, code: "VALIDATION_ERROR", message: reqValid.error };
  
  var dateValid = validateDateFormat(data.tanggal);
  if (!dateValid.valid) return { success: false, code: "VALIDATION_ERROR", message: dateValid.error };
  
  var literValid = validateNonNegativeNumber(data.jumlah_liter, "jumlah_liter");
  if (!literValid.valid) return { success: false, code: "VALIDATION_ERROR", message: literValid.error };
  
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    
    var ss = getStorageSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAMES.DEPOT_LAIN_LAIN);
    var trxId = generateUniqueId("TRX-DEP-OTH");
    var timestamp = new Date().toISOString();
    
    sheet.appendRow([
      trxId,
      dateValid.value,
      String(data.jenis_pengeluaran).trim(),
      parseNumber(data.jumlah_item),
      literValid.value,
      String(data.keterangan || "").trim(),
      auth.session.userId,
      timestamp
    ]);
    
    logAuditLog(auth.session.userId, auth.session.role, "CREATE_DEPOT_LAIN_LAIN", DIVISIONS.DEPOT, trxId, "SUCCESS", "Jenis: " + data.jenis_pengeluaran);
    return { success: true, code: "CREATED", message: "Pengeluaran Lain-lain Depot berhasil disimpan.", data: { transaction_id: trxId } };
  } catch (e) {
    return { success: false, code: "CONCURRENCY_ERROR", message: "Gagal menyimpan: " + e.toString() };
  } finally {
    lock.releaseLock();
  }
}

function getDepotLainLain(sessionId, startDate, endDate) {
  var auth = authorize(sessionId, null, DIVISIONS.DEPOT);
  if (!auth.authorized) return auth;
  
  var ss = getStorageSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAMES.DEPOT_LAIN_LAIN);
  // FIX GS-B-D1: Guard null agar tidak crash jika sheet belum dibuat
  if (!sheet) return { success: true, code: "OK", data: [] };
  var records = readSheetAsObjects(sheet, TABLE_HEADERS.DEPOT_LAIN_LAIN);
  
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

// --- 4. BIAYA OPERASIONAL DEPOT ---

function createDepotOperasional(sessionId, data) {
  var auth = authorize(sessionId, ROLES.DEPOT, DIVISIONS.DEPOT);
  if (!auth.authorized) return auth;
  
  var reqValid = validateRequiredFields(data, ["tanggal", "nama_barang_jenis", "nominal_biaya"]);
  if (!reqValid.valid) return { success: false, code: "VALIDATION_ERROR", message: reqValid.error };
  
  var dateValid = validateDateFormat(data.tanggal);
  if (!dateValid.valid) return { success: false, code: "VALIDATION_ERROR", message: dateValid.error };
  
  var biayaValid = validatePositiveNumber(data.nominal_biaya, "nominal_biaya");
  if (!biayaValid.valid) return { success: false, code: "VALIDATION_ERROR", message: biayaValid.error };
  
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    
    var ss = getStorageSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAMES.DEPOT_OPERASIONAL);
    var trxId = generateUniqueId("TRX-DEP-OPS");
    var timestamp = new Date().toISOString();
    
    var jumlahVal = data.jumlah ? parseNumber(data.jumlah) : "";
    var hargaVal = data.harga_satuan ? parseNumber(data.harga_satuan) : "";
    
    sheet.appendRow([
      trxId,
      dateValid.value,
      String(data.nama_barang_jenis).trim(),
      jumlahVal,
      hargaVal,
      biayaValid.value,
      String(data.keterangan || "").trim(),
      auth.session.userId,
      timestamp
    ]);
    
    logAuditLog(auth.session.userId, auth.session.role, "CREATE_DEPOT_OPERASIONAL", DIVISIONS.DEPOT, trxId, "SUCCESS", "Nominal: " + biayaValid.value);
    return { success: true, code: "CREATED", message: "Biaya Operasional Depot berhasil disimpan.", data: { transaction_id: trxId } };
  } catch (e) {
    return { success: false, code: "CONCURRENCY_ERROR", message: "Gagal menyimpan: " + e.toString() };
  } finally {
    lock.releaseLock();
  }
}

function getDepotOperasional(sessionId, startDate, endDate) {
  var auth = authorize(sessionId, null, DIVISIONS.DEPOT);
  if (!auth.authorized) return auth;
  
  // FIX Bug 3: Gunakan getStorageSpreadsheet() konsisten dengan SPREADSHEET_ID di config.gs
  var ss = getStorageSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAMES.DEPOT_OPERASIONAL);
  // FIX GS-B-D1: Guard null agar tidak crash jika sheet belum dibuat
  if (!sheet) return { success: true, code: "OK", data: [] };
  var records = readSheetAsObjects(sheet, TABLE_HEADERS.DEPOT_OPERASIONAL);
  
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

// --- 5. STOK OPNAME BULANAN DEPOT ---

function createDepotStokOpname(sessionId, data) {
  var auth = authorize(sessionId, ROLES.DEPOT, DIVISIONS.DEPOT);
  if (!auth.authorized) return auth;
  
  var reqValid = validateRequiredFields(data, ["periode", "stok_awal_liter", "stok_riil_liter"]);
  if (!reqValid.valid) return { success: false, code: "VALIDATION_ERROR", message: reqValid.error };
  
  var periodeStr = String(data.periode).trim(); // YYYY-MM
  var sDate = periodeStr + "-01";
  var eDate = periodeStr + "-31";
  
  // Calculate Aggregates for Periode
  // FIX Bug 3: Gunakan getStorageSpreadsheet() konsisten dengan SPREADSHEET_ID di config.gs
  var ss = getStorageSpreadsheet();
  var pSheet = ss.getSheetByName(SHEET_NAMES.DEPOT_PEMBELIAN);
  var sSheet = ss.getSheetByName(SHEET_NAMES.DEPOT_PENJUALAN);
  var oSheet = ss.getSheetByName(SHEET_NAMES.DEPOT_LAIN_LAIN);
  // FIX GS-B-D1: Guard null agar stok opname tidak crash jika salah satu sheet belum ada
  if (!pSheet || !sSheet || !oSheet) {
    return { success: false, code: "SHEET_NOT_FOUND", message: "Sheet transaksi Depot belum ditemukan. Jalankan setup terlebih dahulu." };
  }
  var pRecs = readSheetAsObjects(pSheet, TABLE_HEADERS.DEPOT_PEMBELIAN).filter(function(r) {
    var rd = formatDateISO(r.tanggal); return rd >= sDate && rd <= eDate;
  });
  var sRecs = readSheetAsObjects(sSheet, TABLE_HEADERS.DEPOT_PENJUALAN).filter(function(r) {
    var rd = formatDateISO(r.tanggal); return rd >= sDate && rd <= eDate;
  });
  var oRecs = readSheetAsObjects(oSheet, TABLE_HEADERS.DEPOT_LAIN_LAIN).filter(function(r) {
    var rd = formatDateISO(r.tanggal); return rd >= sDate && rd <= eDate;
  });
  
  var totalPembelianLiter = pRecs.reduce(function(acc, r) { return acc + parseNumber(r.jumlah_liter); }, 0);
  var totalPenjualanLiter = sRecs.reduce(function(acc, r) { return acc + parseNumber(r.jumlah_liter); }, 0);
  var totalLainLiter = oRecs.reduce(function(acc, r) { return acc + parseNumber(r.jumlah_liter); }, 0);
  
  var totalPengeluaranLiter = totalPenjualanLiter + totalLainLiter;
  var stokAwal = parseNumber(data.stok_awal_liter);
  var stokTeoretis = (stokAwal + totalPembelianLiter) - totalPengeluaranLiter;
  var stokRiil = parseNumber(data.stok_riil_liter);
  var selisih = stokTeoretis - stokRiil;
  
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    
    var opnameSheet = ss.getSheetByName(SHEET_NAMES.DEPOT_STOK_OPNAME);
    var opnameId = generateUniqueId("STK-DEP");
    var timestamp = new Date().toISOString();
    
    opnameSheet.appendRow([
      opnameId,
      periodeStr,
      stokAwal,
      totalPembelianLiter,
      totalPengeluaranLiter,
      stokTeoretis,
      stokRiil,
      selisih,
      String(data.catatan_sisa_botol || "").trim(),
      auth.session.userId,
      timestamp
    ]);
    
    logAuditLog(auth.session.userId, auth.session.role, "CREATE_DEPOT_STOK_OPNAME", DIVISIONS.DEPOT, opnameId, "SUCCESS", "Periode: " + periodeStr);
    return { 
      success: true, 
      code: "CREATED", 
      message: "Stok Opname Depot berhasil disimpan.", 
      data: { 
        opname_id: opnameId, 
        stok_teoretis_liter: stokTeoretis, 
        stok_riil_liter: stokRiil, 
        selisih_liter: selisih 
      } 
    };
  } catch (e) {
    return { success: false, code: "CONCURRENCY_ERROR", message: "Gagal menyimpan stok opname: " + e.toString() };
  } finally {
    lock.releaseLock();
  }
}

// --- 6. MASTER AGEN DEPOT ---

function addDepotAgen(sessionId, data) {
  var auth = authorize(sessionId, ROLES.DEPOT, DIVISIONS.DEPOT);
  if (!auth.authorized) return auth;
  
  if (!data || !data.nama_agen || !String(data.nama_agen).trim()) {
    return { success: false, code: "VALIDATION_ERROR", message: "Nama agen tidak boleh kosong." };
  }
  
  var namaAgen = String(data.nama_agen).trim().toUpperCase();
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    
    var ss = getStorageSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAMES.DEPOT_AGEN);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAMES.DEPOT_AGEN);
      sheet.appendRow(TABLE_HEADERS.DEPOT_AGEN);
    }
    
    // Check if already exists
    var existing = readSheetAsObjects(sheet, TABLE_HEADERS.DEPOT_AGEN);
    var isDup = existing.some(function(r) { return String(r.nama_agen).trim().toUpperCase() === namaAgen; });
    if (isDup) {
      return { success: true, code: "EXISTS", message: "Agen sudah terdaftar.", data: { nama_agen: namaAgen } };
    }
    
    var agenId = generateUniqueId("AGN-DEP");
    var timestamp = new Date().toISOString();
    
    sheet.appendRow([
      agenId,
      namaAgen,
      auth.session.userId,
      timestamp
    ]);
    
    logAuditLog(auth.session.userId, auth.session.role, "ADD_DEPOT_AGEN", DIVISIONS.DEPOT, agenId, "SUCCESS", "Nama Agen: " + namaAgen);
    return { success: true, code: "CREATED", message: "Agen baru berhasil ditambahkan.", data: { agen_id: agenId, nama_agen: namaAgen } };
  } catch (e) {
    return { success: false, code: "ERROR", message: "Gagal menyimpan agen: " + e.toString() };
  } finally {
    lock.releaseLock();
  }
}

function getDepotAgenList(sessionId) {
  var auth = authorize(sessionId, null, DIVISIONS.DEPOT);
  if (!auth.authorized) return auth;
  
  var ss = getStorageSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAMES.DEPOT_AGEN);
  if (!sheet) {
    return { success: true, code: "OK", data: [] };
  }
  var records = readSheetAsObjects(sheet, TABLE_HEADERS.DEPOT_AGEN);
  var list = records.map(function(r) { return String(r.nama_agen).trim(); });
  return { success: true, code: "OK", data: list };
}

