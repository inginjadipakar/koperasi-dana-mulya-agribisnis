/**
 * ============================================================
 * CODE.GS — ENTRY POINT API & INITIALIZATION SPREADSHEET
 * ============================================================
 */

// --- 1. SPREADSHEET STORAGE INITIALIZATION ---
function initializeSpreadsheet() {
  var ss = getStorageSpreadsheet();
  var createdSheets = [];
  
  var keys = Object.keys(SHEET_NAMES);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var sheetName = SHEET_NAMES[key];
    var sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      createdSheets.push(sheetName);
    }
    
    // Set Header jika sheet masih kosong (0 baris atau belum ada header)
    if (sheet.getLastRow() === 0) {
      var headers = TABLE_HEADERS[key];
      if (headers && headers.length > 0) {
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
        sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      }
    }
  }
  
  // Create Default Admin User if USERS is empty
  setupDefaultUsers(ss);
  
  return {
    success: true,
    code: "INITIALIZED",
    message: "Spreadsheet storage berhasil diinisialisasi tanpa overwrite data.",
    createdSheets: createdSheets
  };
}

function setupDefaultUsers(ss) {
  var userSheet = ss.getSheetByName(SHEET_NAMES.USERS);
  if (userSheet.getLastRow() <= 1) {
    // Insert Default Seed Users
    var saltAdmin = generateSalt();
    var hashAdmin = hashPassword("admin123", saltAdmin);
    
    var saltKop = generateSalt();
    var hashKop = hashPassword("koperasi123", saltKop);
    
    var saltDep = generateSalt();
    var hashDep = hashPassword("depot123", saltDep);
    
    var timestamp = new Date().toISOString();
    
    userSheet.appendRow(["USR-ADMIN", "admin", hashAdmin, saltAdmin, "Administrator Utama", ROLES.ADMIN, DIVISIONS.ALL, "ACTIVE", timestamp]);
    userSheet.appendRow(["USR-KOP01", "koperasi01", hashKop, saltKop, "Petugas Koperasi", ROLES.KOPERASI, DIVISIONS.KOPERASI, "ACTIVE", timestamp]);
    userSheet.appendRow(["USR-DEP01", "depot01", hashDep, saltDep, "Petugas Depot Susu", ROLES.DEPOT, DIVISIONS.DEPOT, "ACTIVE", timestamp]);
  }
}

// --- 2. WEB API ROUTER (POST/GET) ---

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return buildResponse(false, "INVALID_REQUEST", "Body JSON request tidak ditemukan.");
    }
    
    var req = JSON.parse(e.postData.contents);
    var action = req.action;
    var sessionId = req.sessionId;
    var payload = req.payload || {};
    
    // Public Action: Login
    if (action === "login") {
      var loginRes = loginUser(payload.username, payload.password, req.clientInfo);
      return buildResponse(loginRes.success, loginRes.code, loginRes.message, loginRes.data);
    }
    
    // Auth & Permission Checked Actions
    switch (action) {
      // --- AUTH & USER ---
      case "changePassword":
        var res = changePassword(sessionId, payload.oldPassword, payload.newPassword);
        return buildResponse(res.success, res.code, res.message, res.data);
        
      // --- KOPERASI ---
      case "createKoperasiPenerimaan":
        var res = createKoperasiPenerimaan(sessionId, payload);
        return buildResponse(res.success, res.code, res.message, res.data);
      case "getKoperasiPenerimaan":
        var res = getKoperasiPenerimaan(sessionId, payload.startDate, payload.endDate);
        return buildResponse(res.success, res.code, res.message, res.data);
      case "createKoperasiPengeluaran":
        var res = createKoperasiPengeluaran(sessionId, payload);
        return buildResponse(res.success, res.code, res.message, res.data);
      case "getKoperasiPengeluaran":
        var res = getKoperasiPengeluaran(sessionId, payload.startDate, payload.endDate);
        return buildResponse(res.success, res.code, res.message, res.data);
        
      // --- DEPOT ---
      case "createDepotPembelian":
        var res = createDepotPembelian(sessionId, payload);
        return buildResponse(res.success, res.code, res.message, res.data);
      case "getDepotPembelian":
        var res = getDepotPembelian(sessionId, payload.startDate, payload.endDate);
        return buildResponse(res.success, res.code, res.message, res.data);
      case "createDepotPenjualan":
        var res = createDepotPenjualan(sessionId, payload);
        return buildResponse(res.success, res.code, res.message, res.data);
      case "getDepotPenjualan":
        var res = getDepotPenjualan(sessionId, payload.startDate, payload.endDate);
        return buildResponse(res.success, res.code, res.message, res.data);
      case "createDepotLainLain":
        var res = createDepotLainLain(sessionId, payload);
        return buildResponse(res.success, res.code, res.message, res.data);
      case "getDepotLainLain":
        var res = getDepotLainLain(sessionId, payload.startDate, payload.endDate);
        return buildResponse(res.success, res.code, res.message, res.data);
      case "createDepotOperasional":
        var res = createDepotOperasional(sessionId, payload);
        return buildResponse(res.success, res.code, res.message, res.data);
      case "getDepotOperasional":
        var res = getDepotOperasional(sessionId, payload.startDate, payload.endDate);
        return buildResponse(res.success, res.code, res.message, res.data);
      case "createDepotStokOpname":
        var res = createDepotStokOpname(sessionId, payload);
        return buildResponse(res.success, res.code, res.message, res.data);
      case "addDepotAgen":
        var res = addDepotAgen(sessionId, payload);
        return buildResponse(res.success, res.code, res.message, res.data);
      case "getDepotAgenList":
        var res = getDepotAgenList(sessionId);
        return buildResponse(res.success, res.code, res.message, res.data);
        
      // --- LOGISTIK ---
      case "getLogistikData":
        var res = getLogistikData(sessionId);
        return buildResponse(res.success, res.code, res.message, res.data);
      case "createLogistikTransaction":
        var res = createLogistikTransaction(sessionId, payload);
        return buildResponse(res.success, res.code, res.message, res.data);
        
      // --- REKAP ---
      case "getKoperasiRecap":
        var res = getKoperasiRecap(sessionId, payload.startDate, payload.endDate);
        return buildResponse(res.success, res.code, res.message, res.data);
      case "getDepotRecap":
        var res = getDepotRecap(sessionId, payload.startDate, payload.endDate);
        return buildResponse(res.success, res.code, res.message, res.data);
      case "getPusatRecap":
        var res = getPusatRecap(sessionId, payload.startDate, payload.endDate);
        return buildResponse(res.success, res.code, res.message, res.data);
        
      default:
        return buildResponse(false, "INVALID_ACTION", "Aksi API '" + action + "' tidak dikenali.");
    }
  } catch (err) {
    logAuditLog("UNKNOWN", "UNKNOWN", "SERVER_ERROR", "ALL", null, "FAILED", err.toString());
    return buildResponse(false, "SERVER_ERROR", "Terjadi kesalahan pada server. Silakan coba lagi.");
  }
}

function doGet(e) {
  return buildResponse(true, "HEALTHY", "Sistem Digital Koperasi Danamulya API Backend Apps Script Aktif.");
}
