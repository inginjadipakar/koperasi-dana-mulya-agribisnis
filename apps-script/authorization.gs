/**
 * ============================================================
 * AUTHORIZATION.GS — ROLE & DIVISION ACCESS CONTROL ENFORCER
 * ============================================================
 */

function authorize(sessionId, requiredRole, requiredDivision) {
  var session = getSession(sessionId);
  if (!session) {
    return { 
      success: false,
      authorized: false, 
      code: "UNAUTHENTICATED", 
      message: "Sesi telah berakhir atau tidak valid. Silakan login kembali." 
    };
  }
  
  var userRole = session.role;
  var userDivisi = session.divisi;
  
  // Admin memegang akses ke seluruh divisi & role
  if (userRole === ROLES.ADMIN) {
    return { success: true, authorized: true, session: session };
  }
  
  // Cek Role Match
  if (requiredRole && userRole !== requiredRole) {
    logAuditLog(session.userId, userRole, "AUTHORIZE_CHECK", requiredDivision || "ALL", null, "DENIED", "Role mismatch");
    return { 
      success: false,
      authorized: false, 
      code: "FORBIDDEN_ROLE", 
      message: "Role Anda (" + userRole + ") tidak memiliki hak akses ke operasi ini." 
    };
  }
  
  // Cek Division Match
  if (requiredDivision && requiredDivision !== "ALL" && userDivisi !== requiredDivision) {
    logAuditLog(session.userId, userRole, "AUTHORIZE_CHECK", requiredDivision, null, "DENIED", "Divisi mismatch");
    return { 
      success: false,
      authorized: false, 
      code: "FORBIDDEN_DIVISION", 
      message: "Anda tidak berhak mengakses data Divisi " + requiredDivision + "." 
    };
  }
  
  return { success: true, authorized: true, session: session };
}
