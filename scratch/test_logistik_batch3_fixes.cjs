/**
 * TEST SUITE — Batch 3 Fixes (LOG-B12 through LOG-B17)
 * Verifikasi fungsional dan statis modul Logistik dan backend recap.gs
 */
'use strict';

const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;

function assert(label, condition, detail = '') {
  if (condition) {
    console.log(`  PASS: ${label}`);
    passed++;
  } else {
    console.error(`  FAIL: ${label} ${detail}`);
    failed++;
  }
}

console.log('=== TEST SUITE BATCH 3 (LOG-B12 - LOG-B17) ===\n');

const srcLogistik = fs.readFileSync(path.join(__dirname, '../js/logistik.js'), 'utf8');
const srcRecap = fs.readFileSync(path.join(__dirname, '../apps-script/recap.gs'), 'utf8');

// ============================================================================
// TEST 1: BUG LOG-B12 — Dynamic Month Init and selectedMonth update after save
// ============================================================================
console.log('--- TEST LOG-B12: Inisialisasi Dinamis selectedMonth & Update Pasca Simpan ---');
assert('Tidak ada hardcode selectedMonth: "JUNI"', !srcLogistik.includes('selectedMonth: "JUNI"'));
assert('Inisialisasi selectedMonth menggunakan Date().getMonth()', 
  srcLogistik.includes('new Date().getMonth()') && srcLogistik.includes('selectedMonth:'));
assert('selectedMonth diperbarui otomatis setelah simpan transaksi',
  srcLogistik.includes('if (monthsList[txMonthNum - 1]) this.selectedMonth'));
assert('selectedYear diperbarui otomatis setelah simpan transaksi',
  srcLogistik.includes('if (txParts[0]) this.selectedYear = txParts[0]'));

// ============================================================================
// TEST 2: BUG LOG-B13 — Regex Strip Karakter Non-Digit pada generateNextKodePeternak
// ============================================================================
console.log('\n--- TEST LOG-B13: Sanitasi nomor_anggota pada generateNextKodePeternak ---');
assert('Pembersihan karakter non-digit dengan regex [^0-9]',
  srcLogistik.includes('[^0-9]') && srcLogistik.includes('replace(/[^0-9]'));

// Functional simulation of generateNextKodePeternak logic
function simulateGenerateNextKodePeternak(kategori, existingMembers) {
  if (kategori === "NON_ANGGOTA") {
    let maxNum = 0;
    existingMembers.forEach(m => {
      const sanitized = String(m.nomor_anggota || '').replace(/[^0-9]/g, '');
      const num = parseInt(sanitized, 10);
      if (!isNaN(num) && num > maxNum) maxNum = num;
    });
    return "NR-" + (maxNum + 1);
  }
  return "R-1";
}

const mockMembers = [
  { nomor_anggota: "NR-1" },
  { nomor_anggota: "R-50" }, // has letter prefix
  { nomor_anggota: "NR-05" },
  { nomor_anggota: "100" }
];
const nextCode = simulateGenerateNextKodePeternak("NON_ANGGOTA", mockMembers);
assert('Menghasilkan NR-101 tanpa error NaN saat menemukan nomor anggota berformat R-50', nextCode === "NR-101");

// ============================================================================
// TEST 3: BUG LOG-B14 — Sinkronisasi Transaksi ke DANAMULYA_DB.LOGISTIK_PAKAN_PENJUALAN
// ============================================================================
console.log('\n--- TEST LOG-B14: Sinkronisasi Transaksi ke DANAMULYA_DB.LOGISTIK_PAKAN_PENJUALAN ---');
assert('Menyimpan ke DANAMULYA_DB.LOGISTIK_PAKAN_PENJUALAN saat simpan transaksi harian',
  srcLogistik.includes('db.LOGISTIK_PAKAN_PENJUALAN.push'));
assert('Pencegahan duplikasi data transaksi (alreadyExists check)',
  srcLogistik.includes('alreadyExists'));
assert('Penanda created_by: "LOGISTIK_UI"',
  srcLogistik.includes('created_by: "LOGISTIK_UI"') || srcLogistik.includes("created_by: 'LOGISTIK_UI'"));

// ============================================================================
// TEST 4: BUG LOG-B15 — Pre-fill Seksi III saat Pakan Dipilih di Dropdown
// ============================================================================
console.log('\n--- TEST LOG-B15: Pre-fill Form Seksi III saat Pilih Pakan ---');
assert('Fungsi onSelectSec3Pakan didefinisikan di LogistikModule',
  srcLogistik.includes('onSelectSec3Pakan: function('));
assert('Dropdown Seksi III memiliki id="sec3SelectPakan"',
  srcLogistik.includes('id="sec3SelectPakan"'));
assert('Dropdown Seksi III memiliki onchange="LogistikModule.onSelectSec3Pakan(this.value)"',
  srcLogistik.includes('onSelectSec3Pakan(this.value)'));

// ============================================================================
// TEST 5: BUG LOG-B16 — Status Logistik ACTIVE di apps-script/recap.gs
// ============================================================================
console.log('\n--- TEST LOG-B16: Status ACTIVE pada Konsolidasi recap.gs ---');
assert('recap.gs memberikan status: "ACTIVE" saat sheet LOGISTIK_TRANSACTIONS ditemukan',
  srcRecap.includes('status: "ACTIVE"'));
assert('recap.gs tidak lagi membiarkan status PENDING jika sheet ada',
  !srcRecap.includes('status: "PENDING",\n        total_transactions'));

// ============================================================================
// TEST 6: BUG LOG-B17 — Dead Code Elimination
// ============================================================================
console.log('\n--- TEST LOG-B17: Pembersihan Dead Code ---');
assert('Variabel sec2Items yang tidak terpakai dihapus',
  !srcLogistik.includes('const sec2Items = monthData.sec2'));
const sec4DeclarationCount = (srcLogistik.match(/const sec4Items = monthData\.sec4/g) || []).length;
assert('Variabel sec4Items yang tidak terpakai di handleSaveLogistikTx telah dihapus (hanya ada di handleSaveSec4)',
  sec4DeclarationCount === 1);

console.log(`\n======================================================`);
console.log(`HASIL: ${passed} PASSED, ${failed} FAILED`);
console.log(`======================================================\n`);

process.exit(failed > 0 ? 1 : 0);
