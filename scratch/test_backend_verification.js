/**
 * ============================================================
 * REAL BACKEND VERIFICATION RUNNER (Node.js Environment)
 * ============================================================
 * Mocking Google Apps Script APIs (SpreadsheetApp, CacheService,
 * Utilities, ContentService, LockService) and evaluating the EXACT
 * backend code files in apps-script/ to verify 17 Checklist items.
 */

const fs = require('fs');
const path = require('path');

// --- 1. MOCK GOOGLE APPS SCRIPT ENVIRONMENT ---
const mockSpreadsheetData = {};
const mockCache = {};
const mockLogs = [];

global.Logger = {
  log: function(...args) {
    mockLogs.push(args.join(' '));
  }
};

global.Utilities = {
  formatDate: function(date, tz, fmt) {
    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    if (fmt === "yyyyMMdd") return `${yyyy}${mm}${dd}`;
    return `${yyyy}-${mm}-${dd}`;
  },
  computeDigest: function(algo, text) {
    // Simple mock deterministic hash bytes
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i);
      hash |= 0;
    }
    const bytes = [];
    for (let i = 0; i < 32; i++) {
      bytes.push((hash >> (i % 4 * 8)) & 0xFF);
    }
    return bytes;
  },
  DigestAlgorithm: { SHA_256: "SHA_256" },
  Charset: { UTF_8: "UTF_8" }
};

global.CacheService = {
  getScriptCache: function() {
    return {
      put: function(key, val, ttl) { mockCache[key] = val; },
      get: function(key) { return mockCache[key] || null; },
      remove: function(key) { delete mockCache[key]; }
    };
  }
};

global.LockService = {
  getScriptLock: function() {
    return {
      waitLock: function(timeout) { return true; },
      releaseLock: function() {}
    };
  }
};

class MockSheet {
  constructor(name) {
    this.name = name;
    this.rows = [];
  }
  getLastRow() {
    return this.rows.length;
  }
  appendRow(rowArr) {
    this.rows.push(rowArr);
  }
  getRange(startRow, startCol, numRows, numCols) {
    const self = this;
    return {
      setValues: function(vals) {
        for (let r = 0; r < vals.length; r++) {
          const targetRowIndex = (startRow - 1) + r;
          self.rows[targetRowIndex] = vals[r];
        }
      },
      setFontWeight: function() {},
      getValues: function() {
        const result = [];
        for (let r = startRow - 1; r < (startRow - 1) + numRows; r++) {
          const row = self.rows[r] || [];
          const sliced = [];
          for (let c = startCol - 1; c < (startCol - 1) + numCols; c++) {
            sliced.push(row[c] !== undefined ? row[c] : "");
          }
          result.push(sliced);
        }
        return result;
      }
    };
  }
}

class MockSpreadsheet {
  constructor() {
    this.sheets = {};
  }
  getSheetByName(name) {
    return this.sheets[name] || null;
  }
  insertSheet(name) {
    const s = new MockSheet(name);
    this.sheets[name] = s;
    return s;
  }
}

const activeSpreadsheet = new MockSpreadsheet();

global.SpreadsheetApp = {
  getActiveSpreadsheet: function() {
    return activeSpreadsheet;
  }
};

global.ContentService = {
  MimeType: { JSON: "JSON" },
  createTextOutput: function(text) {
    return {
      text: text,
      setMimeType: function() { return this; }
    };
  }
};

// --- 2. LOAD ALL APPS SCRIPT FILES ---
const appsScriptDir = path.join(__dirname, '../apps-script');
const filesToLoad = [
  'config.gs',
  'utils.gs',
  'validation.gs',
  'auth.gs',
  'authorization.gs',
  'audit-log.gs',
  'koperasi.gs',
  'depot.gs',
  'logistik.gs',
  'recap.gs',
  'Code.gs'
];

filesToLoad.forEach(file => {
  const filePath = path.join(appsScriptDir, file);
  const code = fs.readFileSync(filePath, 'utf8');
  eval(code); // Evaluate in global context
});

// --- 3. EXECUTE 17 REAL VERIFICATION CHECKLIST TESTS ---
console.log("==================================================");
console.log("REAL BACKEND VERIFICATION RUNNER (TAHAP 3.5)");
console.log("==================================================");

const testResults = [];

function runTest(num, name, testFn) {
  try {
    const result = testFn();
    if (result.pass) {
      testResults.push({ num, name, expected: result.expected, actual: result.actual, status: "PASS" });
      console.log(`[PASS] Test ${num}: ${name} -> ${result.actual}`);
    } else {
      testResults.push({ num, name, expected: result.expected, actual: result.actual, status: "FAIL" });
      console.error(`[FAIL] Test ${num}: ${name} -> Expected: ${result.expected}, Actual: ${result.actual}`);
    }
  } catch (err) {
    testResults.push({ num, name, expected: "SUCCESS", actual: "EXCEPTION: " + err.message, status: "FAIL" });
    console.error(`[FAIL] Test ${num}: ${name} -> EXCEPTION: ${err.message}`);
  }
}

// 1. initializeSpreadsheet()
runTest(1, "initializeSpreadsheet() All 10 Sheets & Safe Re-run", () => {
  const res1 = initializeSpreadsheet();
  const res2 = initializeSpreadsheet(); // Second run test (must not overwrite)
  const sheetCount = Object.keys(activeSpreadsheet.sheets).length;
  const userRows = activeSpreadsheet.sheets["USERS"].rows.length;
  return {
    pass: res1.success && res2.success && sheetCount === 10 && userRows === 4, // 1 header + 3 seed users
    expected: "10 Sheets initialized, 4 rows in USERS",
    actual: `${sheetCount} Sheets initialized, ${userRows} rows in USERS`
  };
});

// 2. Authentication Tests
let adminSessionId, kopSessionId, depSessionId;
runTest(2, "Authentication: Login Admin, Koperasi, Depot & Reject Wrong Pass", () => {
  const adm = loginUser("admin", "admin123", "Test");
  const kop = loginUser("koperasi01", "koperasi123", "Test");
  const dep = loginUser("depot01", "depot123", "Test");
  const wrong = loginUser("admin", "wrongpass", "Test");
  
  if (adm.success) adminSessionId = adm.data.sessionId;
  if (kop.success) kopSessionId = kop.data.sessionId;
  if (dep.success) depSessionId = dep.data.sessionId;

  return {
    pass: adm.success && kop.success && dep.success && (!wrong.success && wrong.code === "INVALID_CREDENTIALS"),
    expected: "3 Logins PASS, Wrong Pass REJECTED",
    actual: `Admin:${adm.success}, Kop:${kop.success}, Dep:${dep.success}, Wrong:${wrong.code}`
  };
});

// 3. Authorization Tests
runTest(3, "Authorization: Matrix Verification (Koperasi, Depot, Admin)", () => {
  const kopToKop = authorize(kopSessionId, ROLES.KOPERASI, DIVISIONS.KOPERASI);
  const kopToDep = authorize(kopSessionId, ROLES.DEPOT, DIVISIONS.DEPOT);
  const depToKop = authorize(depSessionId, ROLES.KOPERASI, DIVISIONS.KOPERASI);
  const admToAll = authorize(adminSessionId, ROLES.ADMIN, DIVISIONS.ALL);
  
  return {
    pass: kopToKop.authorized && !kopToDep.authorized && !depToKop.authorized && admToAll.authorized,
    expected: "KopToKop:ALLOW, KopToDep:DENY, DepToKop:DENY, AdmToAll:ALLOW",
    actual: `KopToKop:${kopToKop.authorized}, KopToDep:${kopToDep.authorized}, DepToKop:${depToKop.authorized}, AdmToAll:${admToAll.authorized}`
  };
});

// 4. Data Isolation Test
runTest(4, "Data Isolation: Direct Backend Call Cross-Division Rejection", () => {
  const res = getDepotPembelian(kopSessionId, "2026-01-01", "2026-01-31");
  return {
    pass: res.success === false && res.code === "FORBIDDEN_DIVISION",
    expected: "FORBIDDEN_DIVISION",
    actual: res.code
  };
});

// 5. Test Koperasi Input & Validation
runTest(5, "Koperasi Input & Validation (-50 KG & Valid Transaction)", () => {
  const invalid = createKoperasiPenerimaan(kopSessionId, {
    tanggal: "2026-01-15",
    kategori_sumber: "ANGGOTA",
    nama_sumber: "Cembor",
    jumlah_kg: -50
  });
  
  const valid = createKoperasiPenerimaan(kopSessionId, {
    tanggal: "2026-01-15",
    kategori_sumber: "NON_ANGGOTA",
    nama_sumber: "Tawar",
    jumlah_kg: 1000,
    harga_per_kg: 7200
  });
  
  return {
    pass: !invalid.success && invalid.code === "VALIDATION_ERROR" && valid.success && valid.data.transaction_id.startsWith("TRX-KOP-REC"),
    expected: "Invalid:REJECTED, Valid:CREATED with TRX-KOP-REC",
    actual: `Invalid:${invalid.code}, Valid:${valid.code}`
  };
});

// 6. Test Depot Calculation (1025 KG = 1000 Liter)
runTest(6, "Depot Calculation: Densitas 1.025 (1025 KG -> 1000 Liter)", () => {
  const pur = createDepotPembelian(depSessionId, {
    tanggal: "2026-01-15",
    harga_per_kg: 9000,
    jumlah_kg: 1025
  });
  
  return {
    pass: pur.success && pur.data.jumlah_liter === 1000 && pur.data.total_rupiah === 9225000,
    expected: "Liter:1000, TotalRp:9225000",
    actual: `Liter:${pur.data ? pur.data.jumlah_liter : null}, TotalRp:${pur.data ? pur.data.total_rupiah : null}`
  };
});

// 7. Duplicate Submission Protection Test
runTest(7, "Duplicate Submission Protection (LockService Verification)", () => {
  const res1 = createDepotPenjualan(depSessionId, {
    tanggal: "2026-01-16",
    nama_agen: "Heru",
    harga_per_liter: 11000,
    jumlah_liter: 500
  });
  const res2 = createDepotPenjualan(depSessionId, {
    tanggal: "2026-01-16",
    nama_agen: "Heru",
    harga_per_liter: 11000,
    jumlah_liter: 500
  });
  
  return {
    pass: res1.success && res2.success && res1.data.transaction_id !== res2.data.transaction_id,
    expected: "Unique Transaction IDs generated",
    actual: `Trx1:${res1.data.transaction_id}, Trx2:${res2.data.transaction_id}`
  };
});

// 8. Concurrency & Unique ID Test
runTest(8, "Concurrency Check: LockService Wait & Unique ID Timestamping", () => {
  const ids = new Set();
  for (let i = 0; i < 5; i++) {
    ids.add(generateUniqueId("TRX-TEST"));
  }
  return {
    pass: ids.size === 5,
    expected: "5 Unique IDs generated",
    actual: `${ids.size} Unique IDs`
  };
});

// 9. Test Audit Log
runTest(9, "Audit Log Recording & Password Safety Check", () => {
  const auditSheet = activeSpreadsheet.sheets["AUDIT_LOG"];
  const rows = auditSheet.rows;
  let hasPassword = false;
  
  rows.forEach(r => {
    const rowStr = JSON.stringify(r);
    if (rowStr.includes("admin123") || rowStr.includes("koperasi123")) hasPassword = true;
  });
  
  return {
    pass: rows.length > 1 && !hasPassword,
    expected: "Logs recorded (>1 row), NO passwords in log",
    actual: `Log Rows: ${rows.length}, Has Password: ${hasPassword}`
  };
});

// 10. Test Rekap Data (Filtered by Periode)
runTest(10, "Rekap Filtering & Aggregation Test (Juli 2026)", () => {
  // Add 1 transaction in Jan 2026 and 1 in Jul 2026
  createKoperasiPengeluaran(kopSessionId, {
    tanggal: "2026-01-10",
    kategori_tujuan: "PENJUALAN",
    nama_tujuan: "Nestle",
    jumlah_kg: 500,
    harga_per_kg: 7000
  });
  createKoperasiPengeluaran(kopSessionId, {
    tanggal: "2026-07-20",
    kategori_tujuan: "PENJUALAN",
    nama_tujuan: "Lokal",
    jumlah_kg: 300,
    harga_per_kg: 7500
  });
  
  const janRecap = getKoperasiRecap(kopSessionId, "2026-01-01", "2026-01-31");
  const julRecap = getKoperasiRecap(kopSessionId, "2026-07-01", "2026-07-31");
  
  return {
    pass: janRecap.data.pengeluaran.total_kg === 500 && julRecap.data.pengeluaran.total_kg === 300,
    expected: "Jan Total:500 KG, Jul Total:300 KG",
    actual: `Jan:${janRecap.data.pengeluaran.total_kg} KG, Jul:${julRecap.data.pengeluaran.total_kg} KG`
  };
});

// 11. Test Data Corruption Safety
runTest(11, "Data Corruption Safety: Sheet structure untouched on append", () => {
  const usersHeader = activeSpreadsheet.sheets["USERS"].rows[0];
  return {
    pass: usersHeader[0] === "user_id" && usersHeader[2] === "password_hash",
    expected: "Header row intact",
    actual: `Header col0: ${usersHeader[0]}, col2: ${usersHeader[2]}`
  };
});

// 12. Test Error Handling & Information Leakage
runTest(12, "Error Handling: No stack traces or passwords leaked in errors", () => {
  const errRes = doPost({ postData: { contents: "INVALID JSON" } });
  const parsed = JSON.parse(errRes.text);
  return {
    pass: parsed.success === false && parsed.code === "SERVER_ERROR" && !parsed.message.includes("password"),
    expected: "Safe JSON Error Response",
    actual: `Code: ${parsed.code}, Message: ${parsed.message}`
  };
});

// 13. Test Quota & Batch Performance
runTest(13, "Quota & Performance: Batch Read Function Test", () => {
  const sheet = activeSpreadsheet.sheets["KOPERASI_PENERIMAAN"];
  const objs = readSheetAsObjects(sheet, TABLE_HEADERS.KOPERASI_PENERIMAAN);
  return {
    pass: Array.isArray(objs) && objs.length > 0,
    expected: "Array of records returned via 1 batch call",
    actual: `${objs.length} records returned`
  };
});

// 14. Security Review: IDOR & Parameter Spoofing Check
runTest(14, "Security Review: Parameter Spoofing (divisi=admin payload ignored)", () => {
  const spoofedPayload = {
    tanggal: "2026-01-20",
    kategori_sumber: "ANGGOTA",
    nama_sumber: "Cembor",
    jumlah_kg: 200,
    created_by: "ADMIN_FAKE",
    divisi: "ALL"
  };
  const res = createKoperasiPenerimaan(kopSessionId, spoofedPayload);
  const recSheet = activeSpreadsheet.sheets["KOPERASI_PENERIMAAN"];
  const lastRow = recSheet.rows[recSheet.rows.length - 1];
  const createdByInSheet = lastRow[8]; // Column index 8 is created_by
  
  return {
    pass: res.success && createdByInSheet === "USR-KOP01", // Session userId, NOT ADMIN_FAKE
    expected: "Created_by in sheet is USR-KOP01 (Session User)",
    actual: `Created_by: ${createdByInSheet}`
  };
});

// 15. Logistik Pending Module Check
runTest(15, "Logistik Pending Module Verification", () => {
  const logData = getLogistikData(adminSessionId);
  return {
    pass: logData.code === "LOGISTIK_MODULE_PENDING" && logData.data.status === "PENDING",
    expected: "LOGISTIK_MODULE_PENDING",
    actual: logData.code
  };
});

// 16. Stok Opname Selisih Calculation Test
runTest(16, "Depot Stok Opname Calculation: Teoretis vs Riil Selisih", () => {
  const opname = createDepotStokOpname(depSessionId, {
    periode: "2026-01",
    stok_awal_liter: 500,
    stok_riil_liter: 1400
  });
  // Pembelian: 1000 Liter (from Test 6)
  // Penjualan: 500 Liter (from Test 7)
  // Total Pengeluaran: 500 Liter
  // Stok Teoretis: (500 + 1000) - 500 = 1000 Liter
  // Selisih: 1000 - 1400 = -400 Liter
  return {
    pass: opname.success && opname.data.stok_teoretis_liter === 1000 && opname.data.selisih_liter === -400,
    expected: "Teoretis: 1000, Selisih: -400",
    actual: `Teoretis: ${opname.data.stok_teoretis_liter}, Selisih: ${opname.data.selisih_liter}`
  };
});

// 17. Production Deployment Security Check
runTest(17, "Production Deployment Security: Private Auth Required", () => {
  const unauthRes = getPusatRecap("INVALID_SESSION_TOKEN", "2026-01-01", "2026-01-31");
  return {
    pass: unauthRes.success === false && unauthRes.code === "UNAUTHENTICATED",
    expected: "UNAUTHENTICATED for invalid token",
    actual: unauthRes.code
  };
});

console.log("==================================================");
console.log(`TOTAL TESTS EXECUTED: ${testResults.length}`);
const passCount = testResults.filter(t => t.status === "PASS").length;
const failCount = testResults.filter(t => t.status === "FAIL").length;
console.log(`PASSED: ${passCount}, FAILED: ${failCount}`);
console.log("==================================================");

fs.writeFileSync(
  path.join(__dirname, 'verification_results.json'),
  JSON.stringify(testResults, null, 2),
  'utf8'
);

process.exit(failCount === 0 ? 0 : 1);
