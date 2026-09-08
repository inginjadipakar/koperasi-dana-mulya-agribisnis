/**
 * ============================================================
 * TESTS.GS — COMPREHENSIVE BACKEND UNIT & INTEGRATION TEST SUITE
 * ============================================================
 * Menjalankan otomatis seluruh verifikasi keamanan, isolasi data,
 * validasi bisnis, konversi densitas, dan pencegahan duplikasi.
 */

function runBackendTestSuite() {
  Logger.log("==================================================");
  Logger.log("STARTING TEST SUITE: BACKEND KOPERASI DANAMULYA");
  Logger.log("==================================================");
  
  var passCount = 0;
  var failCount = 0;
  
  function assert(condition, testName, detail) {
    if (condition) {
      Logger.log("  [PASS] " + testName + (detail ? " - " + detail : ""));
      passCount++;
    } else {
      Logger.log("  [FAIL] " + testName + (detail ? " - " + detail : ""));
      failCount++;
    }
  }
  
  // 1. Inisialisasi Storage
  var initRes = initializeSpreadsheet();
  assert(initRes.success === true, "TEST 1: Inisialisasi Spreadsheet Storage");
  
  // 2. Test Login Admin Valid
  var adminLogin = loginUser("admin", "admin123", "Test Client");
  assert(adminLogin.success === true, "TEST 2: Login Admin Valid", "Session ID created");
  var adminSessionId = adminLogin.data ? adminLogin.data.sessionId : null;
  
  // 3. Test Login Koperasi Valid
  var kopLogin = loginUser("koperasi01", "koperasi123", "Test Client");
  assert(kopLogin.success === true, "TEST 3: Login Koperasi Valid");
  var kopSessionId = kopLogin.data ? kopLogin.data.sessionId : null;
  
  // 4. Test Login Depot Valid
  var depLogin = loginUser("depot01", "depot123", "Test Client");
  assert(depLogin.success === true, "TEST 4: Login Depot Valid");
  var depSessionId = depLogin.data ? depLogin.data.sessionId : null;
  
  // 5. Test Login Password Salah
  var wrongPass = loginUser("admin", "salah123", "Test Client");
  assert(wrongPass.success === false && wrongPass.code === "INVALID_CREDENTIALS", "TEST 5: Reject Password Salah");
  
  // 6. Test Security: User Koperasi Akses Depot (MUST BE DENIED)
  var kopAccessDepot = getDepotPembelian(kopSessionId, "2026-01-01", "2026-01-31");
  assert(kopAccessDepot.success === false && kopAccessDepot.code === "FORBIDDEN_DIVISION", "TEST 6: Security - Koperasi Akses Data Depot [DENIED]");
  
  // 7. Test Security: User Depot Akses Koperasi (MUST BE DENIED)
  var depAccessKop = getKoperasiPenerimaan(depSessionId, "2026-01-01", "2026-01-31");
  assert(depAccessKop.success === false && depAccessKop.code === "FORBIDDEN_DIVISION", "TEST 7: Security - Depot Akses Data Koperasi [DENIED]");
  
  // 8. Test Security: User Koperasi Akses Rekap Pusat (MUST BE DENIED)
  var kopAccessPusat = getPusatRecap(kopSessionId, "2026-01-01", "2026-01-31");
  assert(kopAccessPusat.success === false && kopAccessPusat.code === "FORBIDDEN_ROLE", "TEST 8: Security - Koperasi Akses Rekap Pusat [DENIED]");
  
  // 9. Test Admin Akses Semua (MUST BE ALLOWED)
  var adminAccessPusat = getPusatRecap(adminSessionId, "2026-01-01", "2026-01-31");
  assert(adminAccessPusat.success === true, "TEST 9: Security - Admin Akses Rekap Pusat [ALLOWED]");
  
  // 10. Test Validasi Business Input Invalid (Negative KG)
  var invalidInput = createKoperasiPenerimaan(kopSessionId, {
    tanggal: "2026-01-15",
    kategori_sumber: "ANGGOTA",
    nama_sumber: "Cembor",
    jumlah_kg: -50
  });
  assert(invalidInput.success === false && invalidInput.code === "VALIDATION_ERROR", "TEST 10: Validasi Input Angka Negatif (-50 KG) [REJECTED]");
  
  // 11. Test Transaksi Penerimaan Koperasi & Calculation
  var trxKopRec = createKoperasiPenerimaan(kopSessionId, {
    tanggal: "2026-01-15",
    kategori_sumber: "NON_ANGGOTA",
    nama_sumber: "Tawar",
    jumlah_kg: 1000,
    harga_per_kg: 7200
  });
  assert(trxKopRec.success === true, "TEST 11: Create Transaksi Penerimaan Koperasi");
  
  // 12. Test Transaksi Pembelian Depot & Densitas (1.025)
  var trxDepPur = createDepotPembelian(depSessionId, {
    tanggal: "2026-01-15",
    harga_per_kg: 9000,
    jumlah_kg: 1025
  });
  assert(
    trxDepPur.success === true && 
    trxDepPur.data.jumlah_liter === 1000 && 
    trxDepPur.data.total_rupiah === 9225000, 
    "TEST 12: Calculation Densitas Depot (1025 KG = 1000 Liter)"
  );
  
  // 13. Test Module Logistik Pending
  var logistikRes = getLogistikData(adminSessionId);
  assert(logistikRes.code === "LOGISTIK_MODULE_PENDING", "TEST 13: Logistik Pending Module Check");
  
  Logger.log("==================================================");
  Logger.log("TEST SUITE FINISHED: " + passCount + " PASSED, " + failCount + " FAILED.");
  Logger.log("==================================================");
  
  return { pass: passCount, fail: failCount };
}
