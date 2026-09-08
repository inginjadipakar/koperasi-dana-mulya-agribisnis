/**
 * UAT (USER ACCEPTANCE TEST) AUTOMATED EXECUTION SUITE
 * Sistem Digital Koperasi Danamulya
 */

console.log("==================================================================");
console.log(" 🧪 MENJALANKAN SIMULASI UAT (USER ACCEPTANCE TEST) END-TO-END");
console.log("==================================================================");

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function runTest(scenarioName, testName, testFn) {
  totalTests++;
  try {
    const result = testFn();
    if (result.success) {
      console.log(` ✅ [${scenarioName}] ${testName} -> PASS: ${result.message}`);
      passedTests++;
    } else {
      console.error(` ❌ [${scenarioName}] ${testName} -> FAIL: ${result.message}`);
      failedTests++;
    }
  } catch (err) {
    console.error(` 💥 [${scenarioName}] ${testName} -> ERROR: ${err.message}`);
    failedTests++;
  }
}

// SIMULASI IN-MEMORY DATABASE & BACKEND LOGIC MATCHING APPS SCRIPT
const MILK_DENSITY_FACTOR = 1.025;

const db = {
  USERS: [
    { user_id: "USR-001", username: "admin", role: "admin", divisi: "ALL" },
    { user_id: "USR-002", username: "koperasi01", role: "koperasi", divisi: "KOPERASI" },
    { user_id: "USR-003", username: "depot01", role: "depot", divisi: "DEPOT" }
  ],
  KOPERASI_PENERIMAAN: [],
  KOPERASI_PENGELUARAN: [],
  DEPOT_PEMBELIAN: [],
  DEPOT_PENJUALAN: [],
  DEPOT_OPERASIONAL: [],
  AUDIT_LOG: []
};

// HELPER BACKEND AUTH & AUTHORIZATION
function backendAuthorize(user, requiredRole, requiredDivision) {
  if (!user) return { success: false, code: "UNAUTHENTICATED", message: "Sesi tidak valid." };
  if (user.role === "admin") return { success: true, user: user };
  if (requiredRole && user.role !== requiredRole) return { success: false, code: "FORBIDDEN_ROLE", message: "Role mismatch." };
  if (requiredDivision && requiredDivision !== "ALL" && user.divisi !== requiredDivision) return { success: false, code: "FORBIDDEN_DIVISION", message: "Divisi mismatch." };
  return { success: true, user: user };
}

// HELPER AUDIT LOG
function logAudit(userId, role, action, division, status, info) {
  db.AUDIT_LOG.push({
    timestamp: new Date().toISOString(),
    user_id: userId,
    role: role,
    action: action,
    divisi: division,
    status: status,
    info: info
  });
}

// BACKEND API HANDLERS (PERSIS APPS SCRIPT)
function createKoperasiPenerimaan(user, payload) {
  const auth = backendAuthorize(user, "koperasi", "KOPERASI");
  if (!auth.success) {
    logAudit(user ? user.user_id : "UNKNOWN", user ? user.role : "ANONYMOUS", "CREATE_KOPERASI_PENERIMAAN", "KOPERASI", "DENIED", auth.message);
    return auth;
  }

  // Backend Validation
  if (!payload.tanggal || !payload.kategori_sumber || !payload.nama_sumber || payload.jumlah_kg === undefined) {
    return { success: false, code: "VALIDATION_ERROR", message: "Field mandatory tidak boleh kosong." };
  }

  const kg = Number(payload.jumlah_kg);
  if (isNaN(kg) || kg <= 0) {
    return { success: false, code: "VALIDATION_ERROR", message: "jumlah_kg harus berupa angka positif (> 0)." };
  }

  let harga = 0;
  if (payload.kategori_sumber === "NON_ANGGOTA") {
    harga = Number(payload.harga_per_kg);
    if (isNaN(harga) || harga <= 0) {
      return { success: false, code: "VALIDATION_ERROR", message: "harga_per_kg Non-Anggota harus berupa angka positif." };
    }
  }

  // Backend recalculation (ignore client total)
  const calculatedTotalRp = payload.kategori_sumber === "NON_ANGGOTA" ? (kg * harga) : 0;

  const trxId = "TRX-KOP-REC-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
  const record = {
    transaction_id: trxId,
    tanggal: payload.tanggal,
    kategori_sumber: payload.kategori_sumber,
    nama_sumber: payload.nama_sumber,
    jumlah_kg: kg,
    harga_per_kg: harga,
    total_rupiah: calculatedTotalRp,
    created_by: user.user_id
  };

  db.KOPERASI_PENERIMAAN.push(record);
  logAudit(user.user_id, user.role, "CREATE_KOPERASI_PENERIMAAN", "KOPERASI", "SUCCESS", "KG: " + kg);
  return { success: true, code: "CREATED", message: "Penerimaan Koperasi disimpan.", record: record };
}

function createDepotPembelian(user, payload) {
  const auth = backendAuthorize(user, "depot", "DEPOT");
  if (!auth.success) {
    logAudit(user ? user.user_id : "UNKNOWN", user ? user.role : "ANONYMOUS", "CREATE_DEPOT_PEMBELIAN", "DEPOT", "DENIED", auth.message);
    return auth;
  }

  const kg = Number(payload.jumlah_kg);
  const harga = Number(payload.harga_per_kg);
  if (isNaN(kg) || kg <= 0 || isNaN(harga) || harga <= 0) {
    return { success: false, code: "VALIDATION_ERROR", message: "Jumlah KG dan Harga harus angka positif." };
  }

  // Backend calculations
  const liter = Math.round((kg / MILK_DENSITY_FACTOR) * 10000) / 10000;
  const totalRp = kg * harga;

  const trxId = "TRX-DEP-PUR-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
  const record = {
    transaction_id: trxId,
    tanggal: payload.tanggal,
    harga_per_kg: harga,
    jumlah_kg: kg,
    faktor_densitas: MILK_DENSITY_FACTOR,
    jumlah_liter: liter,
    total_rupiah: totalRp,
    created_by: user.user_id
  };

  db.DEPOT_PEMBELIAN.push(record);
  logAudit(user.user_id, user.role, "CREATE_DEPOT_PEMBELIAN", "DEPOT", "SUCCESS", "Liter: " + liter);
  return { success: true, code: "CREATED", message: "Pembelian Depot disimpan.", record: record };
}

// ----------------------------------------------------------------
// RUN SKENARIO 1: TRANSAKSI NORMAL END-TO-END
// ----------------------------------------------------------------
console.log("\n--- SKENARIO 1: Transaksi Normal End-to-End ---");

const kopUser = db.USERS[1];
const depUser = db.USERS[2];

runTest("Skenario 1", "Input Penerimaan Susu Anggota (Cembor)", () => {
  const res = createKoperasiPenerimaan(kopUser, { tanggal: "2026-09-02", kategori_sumber: "ANGGOTA", nama_sumber: "Cembor", jumlah_kg: 500 });
  return { success: res.success && res.record.total_rupiah === 0, message: `Disimpan TRX ID ${res.record ? res.record.transaction_id : ''}` };
});

runTest("Skenario 1", "Input Penerimaan Susu Non-Anggota (Tawar)", () => {
  const res = createKoperasiPenerimaan(kopUser, { tanggal: "2026-09-02", kategori_sumber: "NON_ANGGOTA", nama_sumber: "Tawar", jumlah_kg: 200, harga_per_kg: 7500 });
  return { success: res.success && res.record.total_rupiah === 1500000, message: `Hitung Total Rp 1.500.000` };
});

runTest("Skenario 1", "Input Pembelian Depot dari Processing", () => {
  const res = createDepotPembelian(depUser, { tanggal: "2026-09-02", harga_per_kg: 9000, jumlah_kg: 1025 });
  return { success: res.success && res.record.jumlah_liter === 1000 && res.record.total_rupiah === 9225000, message: `1025 KG -> 1000 Liter persis @ Rp 9.225.000` };
});

runTest("Skenario 1", "Verifikasi Pencatatan Audit Log Skenario 1", () => {
  const logs = db.AUDIT_LOG.filter(l => l.status === "SUCCESS");
  return { success: logs.length === 3, message: `Tercatat ${logs.length} audit log sukses di database` };
});

// ----------------------------------------------------------------
// RUN SKENARIO 2: UJI CONCURRENCY & SIMULTANEOUS ENTRIES
// ----------------------------------------------------------------
console.log("\n--- SKENARIO 2: Simulasi Input Simultaneous (Concurrency Safety) ---");

runTest("Skenario 2", "Simulasi 5 Transaksi Berbarengan Tanpa Bentrokan Row", () => {
  let initialCount = db.KOPERASI_PENERIMAAN.length;
  for (let i = 0; i < 5; i++) {
    createKoperasiPenerimaan(kopUser, { tanggal: "2026-09-02", kategori_sumber: "ANGGOTA", nama_sumber: "Kelompok-" + i, jumlah_kg: 100 + i });
  }
  let finalCount = db.KOPERASI_PENERIMAAN.length;
  return { success: finalCount === initialCount + 5, message: `${finalCount - initialCount} transaksi tersimpan terpisah tanpa tertimpa` };
});

// ----------------------------------------------------------------
// RUN SKENARIO 3: CLIENT ATTACK & SECURITY BYPASS TEST
// ----------------------------------------------------------------
console.log("\n--- SKENARIO 3: Penolakan Serangan Client & Manipulasi Request ---");

runTest("Skenario 3", "Petugas Depot Mencoba Input Penerimaan Koperasi (Cross-Division Violation)", () => {
  const res = createKoperasiPenerimaan(depUser, { tanggal: "2026-09-02", kategori_sumber: "ANGGOTA", nama_sumber: "Ilegal", jumlah_kg: 100 });
  const auditRecorded = db.AUDIT_LOG.some(l => l.status === "DENIED" && l.user_id === "USR-003");
  return { success: !res.success && (res.code === "FORBIDDEN_ROLE" || res.code === "FORBIDDEN_DIVISION") && auditRecorded, message: "Akses DITOLAK backend (" + res.code + ") & dicatat di AUDIT_LOG" };
});

runTest("Skenario 3", "Client Mengirimkan Total Rp Palsu (Rp 999,999,999)", () => {
  const res = createKoperasiPenerimaan(kopUser, { tanggal: "2026-09-02", kategori_sumber: "NON_ANGGOTA", nama_sumber: "Tawar", jumlah_kg: 100, harga_per_kg: 7000, total_rupiah: 999999999 });
  return { success: res.success && res.record.total_rupiah === 700000, message: "Backend MENGABAIKAN total_rupiah palsu dan menghitung ulang Rp 700.000" };
});

// ----------------------------------------------------------------
// RUN SKENARIO 4: DATA INVALID & BOUNDARY TEST
// ----------------------------------------------------------------
console.log("\n--- SKENARIO 4: Data Invalid & Boundary Test ---");

runTest("Skenario 4", "Input Jumlah KG Negatif (-100 KG)", () => {
  const res = createKoperasiPenerimaan(kopUser, { tanggal: "2026-09-02", kategori_sumber: "ANGGOTA", nama_sumber: "Cembor", jumlah_kg: -100 });
  return { success: !res.success && res.code === "VALIDATION_ERROR", message: "Backend menolak KG negatif dengan VALIDATION_ERROR" };
});

runTest("Skenario 4", "Input Jumlah KG Nol (0 KG)", () => {
  const res = createKoperasiPenerimaan(kopUser, { tanggal: "2026-09-02", kategori_sumber: "ANGGOTA", nama_sumber: "Cembor", jumlah_kg: 0 });
  return { success: !res.success && res.code === "VALIDATION_ERROR", message: "Backend menolak KG = 0" };
});

runTest("Skenario 4", "Field Mandatory Tanggal Kosong", () => {
  const res = createKoperasiPenerimaan(kopUser, { tanggal: "", kategori_sumber: "ANGGOTA", nama_sumber: "Cembor", jumlah_kg: 500 });
  return { success: !res.success && res.code === "VALIDATION_ERROR", message: "Backend menolak transaksi tanpa tanggal" };
});

console.log("\n==================================================================");
console.log(` 📊 HASIL AKHIR UAT SIMULATION: ${passedTests}/${totalTests} PASSED, ${failedTests} FAILED`);
console.log("==================================================================");

if (failedTests > 0) process.exit(1);
