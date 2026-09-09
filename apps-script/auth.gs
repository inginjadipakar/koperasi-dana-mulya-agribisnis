/**
 * ============================================================
 * AUTH.GS — AUTHENTICATION, SALTED SHA-256 & SESSION SYSTEM
 * ============================================================
 */

// Generate Hashing Salted SHA-256
function hashPassword(password, salt) {
  var rawBytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256, 
    password + salt, 
    Utilities.Charset.UTF_8
  );
  var txt = "";
  for (var i = 0; i < rawBytes.length; i++) {
    var byteVal = rawBytes[i];
    if (byteVal < 0) byteVal += 256;
    var byteStr = byteVal.toString(16);
    if (byteStr.length == 1) byteStr = "0" + byteStr;
    txt += byteStr;
  }
  return txt;
}

// Generate Random Salt
function generateSalt() {
  return generateUniqueId("SALT").substring(0, 16);
}

// Authenticate User Login
function loginUser(username, password, clientInfo) {
  if (!username || !password) {
    return { success: false, code: "MISSING_CREDENTIALS", message: "Username dan password wajib diisi." };
  }
  
  var ss = getStorageSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAMES.USERS);
  if (!sheet) {
    return { success: false, code: "SYSTEM_ERROR", message: "Tabel USERS tidak ditemukan." };
  }
  
  var users = readSheetAsObjects(sheet, TABLE_HEADERS.USERS);
  var targetUser = null;
  
  for (var i = 0; i < users.length; i++) {
    if (String(users[i].username).toLowerCase() === String(username).toLowerCase().trim()) {
      targetUser = users[i];
      break;
    }
  }
  
  if (!targetUser) {
    logAuditLog("ANONYMOUS", "UNKNOWN", "LOGIN", "ALL", null, "FAILED", "User tidak ditemukan: " + username);
    return { success: false, code: "INVALID_CREDENTIALS", message: "Username atau password salah." };
  }
  
  if (targetUser.status !== "ACTIVE") {
    logAuditLog(targetUser.user_id, targetUser.role, "LOGIN", targetUser.divisi, null, "DENIED", "Akun inaktif");
    return { success: false, code: "ACCOUNT_INACTIVE", message: "Akun Anda telah dinonaktifkan." };
  }
  
  // Verify Hashed Password
  var computedHash = hashPassword(password, targetUser.password_salt);
  if (computedHash !== targetUser.password_hash) {
    logAuditLog(targetUser.user_id, targetUser.role, "LOGIN", targetUser.divisi, null, "FAILED", "Password salah");
    return { success: false, code: "INVALID_CREDENTIALS", message: "Username atau password salah." };
  }
  
  // Create Session Token in CacheService / PropertiesService
  var sessionId = generateUniqueId("SESS");
  var sessionData = {
    sessionId: sessionId,
    userId: targetUser.user_id,
    username: targetUser.username,
    namaLengkap: targetUser.nama_lengkap,
    role: targetUser.role,
    divisi: targetUser.divisi,
    createdAt: new Date().getTime(),
    expiresAt: new Date().getTime() + SESSION_TTL_MS
  };
  
  // Store Session JSON
  var cache = CacheService.getScriptCache();
  // FIX Bug 4: TTL cache diselaraskan dengan SESSION_TTL_MS (8 jam = 28800 detik)
  var cacheTTL = Math.floor(SESSION_TTL_MS / 1000);
  cache.put(sessionId, JSON.stringify(sessionData), cacheTTL);
  
  logAuditLog(targetUser.user_id, targetUser.role, "LOGIN", targetUser.divisi, null, "SUCCESS", clientInfo || "Web Login");
  
  // Return User Payload WITHOUT password_hash & password_salt
  return {
    success: true,
    code: "LOGIN_SUCCESS",
    message: "Login berhasil",
    data: {
      sessionId: sessionId,
      userId: targetUser.user_id,
      username: targetUser.username,
      namaLengkap: targetUser.nama_lengkap,
      role: targetUser.role,
      divisi: targetUser.divisi,
      expiresAt: sessionData.expiresAt
    }
  };
}

// Fitur Ganti Password Hardening Backend
function changePassword(sessionId, oldPassword, newPassword) {
  var session = getSession(sessionId);
  if (!session) return { success: false, code: "UNAUTHENTICATED", message: "Sesi telah berakhir." };
  
  if (!newPassword || newPassword.length < 8) {
    return { success: false, code: "WEAK_PASSWORD", message: "Password baru minimal 8 karakter." };
  }
  
  // FIX Bug 1: Gunakan getStorageSpreadsheet() agar konsisten dengan SPREADSHEET_ID di config.gs
  var ss = getStorageSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAMES.USERS);
  var rowIndex = findRowIndexByValue(sheet, 1, session.userId);
  if (rowIndex === -1) return { success: false, code: "USER_NOT_FOUND", message: "User tidak ditemukan." };
  
  var currentSalt = sheet.getRange(rowIndex, 4).getValue();
  var currentHash = sheet.getRange(rowIndex, 3).getValue();
  
  if (hashPassword(oldPassword, currentSalt) !== currentHash) {
    return { success: false, code: "INVALID_OLD_PASSWORD", message: "Password lama tidak cocok." };
  }
  
  var newSalt = generateSalt();
  var newHash = hashPassword(newPassword, newSalt);
  
  sheet.getRange(rowIndex, 3).setValue(newHash);
  sheet.getRange(rowIndex, 4).setValue(newSalt);
  
  logAuditLog(session.userId, session.role, "CHANGE_PASSWORD", session.divisi, null, "SUCCESS", "Password updated");
  return { success: true, code: "PASSWORD_CHANGED", message: "Password berhasil diperbarui." };
}

// Get Session Payload from Cache/Properties
function getSession(sessionId) {
  if (!sessionId) return null;
  var cache = CacheService.getScriptCache();
  var raw = cache.get(sessionId);
  if (!raw) return null;
  
  try {
    var sess = JSON.parse(raw);
    if (new Date().getTime() > sess.expiresAt) {
      cache.remove(sessionId);
      return null;
    }
    return sess;
  } catch (e) {
    return null;
  }
}
