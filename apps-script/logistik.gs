/**
 * ============================================================
 * LOGISTIK.GS — MODUL LOGISTIK (STATUS: LOGISTIK_PENDING)
 * ============================================================
 */

function getLogistikData(sessionId) {
  var auth = authorize(sessionId, ROLES.LOGISTIK, DIVISIONS.LOGISTIK);
  if (!auth.authorized) return auth;
  
  logAuditLog(auth.session.userId, auth.session.role, "GET_LOGISTIK_DATA", DIVISIONS.LOGISTIK, null, "INFO", "Module Pending");
  
  return {
    success: true,
    code: "LOGISTIK_MODULE_PENDING",
    message: "Modul Logistik belum diimplementasikan karena file Excel referensi belum tersedia.",
    data: {
      status: "PENDING",
      excel_received: false,
      note: "Silakan berikan file Excel Logistik untuk audit sebelum modul dikembangkan."
    }
  };
}

function createLogistikTransaction(sessionId, data) {
  var auth = authorize(sessionId, ROLES.LOGISTIK, DIVISIONS.LOGISTIK);
  if (!auth.authorized) return auth;
  
  return {
    success: false,
    code: "LOGISTIK_MODULE_PENDING",
    message: "Tidak dapat menyimpan transaksi. Modul Logistik dalam status PENDING."
  };
}
