/**
 * ============================================================
 * AUDIT-LOG.GS — CATATAN AUDIT TRAIL SISTEM
 * ============================================================
 */

function logAuditLog(userId, role, action, divisi, transactionId, status, clientInfo) {
  try {
    var ss = getStorageSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAMES.AUDIT_LOG);
    if (!sheet) return;
    
    var logId = generateUniqueId("LOG");
    var timestamp = new Date().toISOString();
    
    sheet.appendRow([
      logId,
      timestamp,
      userId || "SYSTEM",
      role || "UNKNOWN",
      action || "UNKNOWN",
      divisi || "ALL",
      transactionId || "-",
      status || "INFO",
      clientInfo || "-"
    ]);
  } catch (e) {
    Logger.log("Gagal membuat audit log: " + e.toString());
  }
}
