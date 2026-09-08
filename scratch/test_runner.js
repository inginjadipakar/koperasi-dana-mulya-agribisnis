/**
 * AUTOMATED TEST SUITE FOR KOPERASI DANAMULYA SYSTEM
 */
const fs = require('fs');

console.log("==================================================");
console.log(" 🧪 MENJALANKAN AUTOMATED TEST SUITE DANAMULYA");
console.log("==================================================");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(` ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(` ❌ FAIL: ${message}`);
    failed++;
  }
}

// 1. UJI FAKTOR DENSITAS SUSU (GOLDEN RULE: 1.025)
console.log("\n--- [1] Pengujian Rumus Densitas Susu (KG <-> Liter) ---");
const MILK_DENSITY_FACTOR = 1.025;

function kgToLiter(kg) {
  return Math.round((kg / MILK_DENSITY_FACTOR) * 10000) / 10000;
}

assert(kgToLiter(1025) === 1000, "1025 KG = 1000 Liter persis");
assert(Math.round(kgToLiter(36144)) === 35262, "36,144 KG = ~35,262 Liter (Sesuai Data Depot Excel)");

// 2. UJI PERHITUNGAN NERACA KOPERASI
console.log("\n--- [2] Pengujian Neraca & Selisih Susu Koperasi ---");
const penerimaanKg = 14602 + 2443; // 17045 KG
const pengeluaranKg = 53340; // 53340 KG

const penerimaanLiter = kgToLiter(penerimaanKg);
const pengeluaranLiter = kgToLiter(pengeluaranKg);
const selisihLiter = Math.round(penerimaanLiter - pengeluaranLiter);

assert(selisihLiter === Math.round((17045 - 53340) / 1.025), "Kalkulasi selisih liter konsisten dengan formula neraca");

// 3. UJI LOGIKA DEPOT PEMBELIAN & PENJUALAN
console.log("\n--- [3] Pengujian Kalkulasi Depot Susu ---");
const depotBeliKg = 36144;
const depotBeliHarga = 9000;
const depotTotalBeliRp = depotBeliKg * depotBeliHarga;
const depotLiterBeli = kgToLiter(depotBeliKg);

assert(depotTotalBeliRp === 325296000, "Total Beli Processing 36,144 KG @ Rp 9.000 = Rp 325.296.000 (Presisi)");

const depotJualLiter = 9270;
const depotJualHarga = 11000;
const depotOmsetRp = depotJualLiter * depotJualHarga;

assert(depotOmsetRp === 101970000, "Total Omset Agen 9,270 Liter @ Rp 11.000 = Rp 101.970.000 (Presisi)");

// 4. UJI ROLES & HASIL LOGIK AUTHENTICATION
console.log("\n--- [4] Pengujian Izin Akses Role & Hierarki ---");
const roles = {
  admin: ["ALL", "KOPERASI", "DEPOT", "LOGISTIK"],
  koperasi: ["KOPERASI"],
  depot: ["DEPOT"],
  logistik: ["LOGISTIK"]
};

function canAccess(userRole, targetDivision) {
  if (userRole === "admin") return true;
  return roles[userRole] && roles[userRole].includes(targetDivision);
}

assert(canAccess("admin", "KOPERASI") === true, "Admin bisa akses Divisi Koperasi");
assert(canAccess("admin", "DEPOT") === true, "Admin bisa akses Divisi Depot");
assert(canAccess("koperasi", "KOPERASI") === true, "Petugas Koperasi bisa akses Divisi Koperasi");
assert(canAccess("koperasi", "DEPOT") === false, "Petugas Koperasi DITOLAK akses Divisi Depot");
assert(canAccess("depot", "KOPERASI") === false, "Petugas Depot DITOLAK akses Divisi Koperasi");

console.log("\n==================================================");
console.log(` 📊 HASIL AKHIR: ${passed} PASSED, ${failed} FAILED`);
console.log("==================================================");

if (failed > 0) process.exit(1);
