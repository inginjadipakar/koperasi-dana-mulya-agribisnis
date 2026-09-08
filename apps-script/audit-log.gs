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

    // MITIGASI KUOTA SEL GOOGLE SHEETS:
    // Jika baris AUDIT_LOG melebihi 3.000 baris, bersihkan 500 baris tertua
    // agar spreadsheet tidak melampaui batas sel (10 juta sel) dan tetap cepat dibaca
    var totalRows = sheet.getLastRow();
    if (totalRows > 3000) {
      sheet.deleteRows(2, 500);
    }
  } catch (e) {
    Logger.log("Gagal membuat audit log: " + e.toString());
  }
}

