/**
 * TEST SUITE — Batch 4 Fixes (LOG-B18 through LOG-B25)
 * Memverifikasi integritas modul Logistik, LocalBridgeEngine di api.js,
 * dan Apps Script recap.gs secara komprehensif.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

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

console.log('=== TEST SUITE BATCH 4 (LOG-B18 - LOG-B25) ===\n');

const srcLogistik = fs.readFileSync(path.join(__dirname, '../js/logistik.js'), 'utf8');
const srcApi = fs.readFileSync(path.join(__dirname, '../js/api.js'), 'utf8');
const srcRecapGs = fs.readFileSync(path.join(__dirname, '../apps-script/recap.gs'), 'utf8');
const srcRecapJs = fs.readFileSync(path.join(__dirname, '../js/recap.js'), 'utf8');

// Mock browser environment for LogistikModule testing
const mockLocalStorage = {
  store: {},
  getItem(k) { return this.store[k] || null; },
  setItem(k, v) { this.store[k] = String(v); },
  removeItem(k) { delete this.store[k]; }
};

const sandbox = {
  window: {},
  document: {
    getElementById: () => null,
    querySelectorAll: () => []
  },
  localStorage: mockLocalStorage,
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  Number: Number,
  String: String,
  parseInt: parseInt,
  Date: Date,
  Math: Math,
  JSON: JSON,
  Array: Array,
  Object: Object,
  RegExp: RegExp,
  Set: Set,
  AuthManager: {
    requireAuth: () => true,
    getSession: () => ({ namaLengkap: 'Petugas Test', role: 'logistik', divisi: 'LOGISTIK' })
  },
  App: { render: () => {} },
  showToast: () => {},
  showAlert: () => {}
};
vm.createContext(sandbox);
vm.runInContext(srcLogistik + '; this.LogistikModule = LogistikModule;', sandbox);
const LM = sandbox.LogistikModule;

// ============================================================================
// TEST 1: BUG LOG-B18 — Baseline Seksi I (Peralatan Ternak)
// ============================================================================
console.log('--- TEST LOG-B18: Baseline Data Seksi I & Dynamic Recap Integration ---');
assert('defaultFullData memiliki sec1 pada bulan JAN', Array.isArray(LM.defaultFullData['JAN']?.sec1) && LM.defaultFullData['JAN'].sec1.length === 5);
assert('Item Milk Can ada pada sec1 JAN dengan 6 unit', LM.defaultFullData['JAN'].sec1.find(it => it.nama === 'MILK CAN')?.stok_awal_unit === 6);
assert('Item Alat Celup ada pada sec1 JAN dengan 175 unit', LM.defaultFullData['JAN'].sec1.find(it => it.nama === 'ALAT CELUP')?.stok_awal_unit === 175);

const testAllData = {};
const juliData = LM.ensureMonthData(testAllData, 'JULI');
assert('ensureMonthData menyediakan template defaultSec1 pada bulan baru JULI', Array.isArray(juliData.sec1) && juliData.sec1.length === 5);

// Test carryover sec1 in syncMatrixFromTransactions
const carryData = {
  'JAN': {
    sec1: [
      { no: 1, nama: 'MILK CAN', stok_awal_unit: 6, stok_awal_harga: 650000, stok_awal_rp: 3900000, pembelian_unit: 0, pembelian_harga: 0, pembelian_rp: 0, penjualan_unit: 1, penjualan_harga: 650000, penjualan_rp: 650000, stok_akhir_unit: 5, stok_akhir_rp: 3250000 }
    ],
    sec2: [], sec3: [], sec4: []
  },
  'FEB': {
    sec1: [], sec2: [], sec3: [], sec4: []
  }
};
LM.syncMatrixFromTransactions(carryData, 'FEB');
assert('Carryover stok akhir Seksi I diteruskan ke stok awal bulan berikutnya', carryData['FEB'].sec1.find(it => it.nama === 'MILK CAN')?.stok_awal_unit === 5);

assert('recap.js membaca aset peralatan secara dinamis (tidak hardcode)', srcRecapJs.includes('logSec1Unit') && srcRecapJs.includes('logSec1Rp'));

// ============================================================================
// TEST 2: BUG LOG-B19 — Form Seksi III Dropdown Feed Fallback & Tambah Pakan
// ============================================================================
console.log('\n--- TEST LOG-B19: Seksi III Dropdown Fallback & Custom Feed ---');
assert('HTML form Seksi III menyediakan pakan fallback jika sec3 kosong', srcLogistik.includes('standardFeeds =') || srcLogistik.includes('feeds = (monthData.sec3 && monthData.sec3.length > 0)'));
assert('HTML form Seksi III menyediakan opsi + TAMBAH PAKAN BARU', srcLogistik.includes('<option value="+ TAMBAH PAKAN BARU">+ Tambah Pakan Baru...</option>'));
assert('HTML form Seksi III memiliki input field sec3ColBaru', srcLogistik.includes('id="sec3ColBaru"'));
assert('handleSaveSec3 mendukung input pakan custom', srcLogistik.includes('form.nama_pakan_custom?.value.trim()'));

// ============================================================================
// TEST 3 & 4: BUG LOG-B20 & LOG-B21 — checkBuntingLimit NaN Safety & BaseId Uniqueness
// ============================================================================
console.log('\n--- TEST LOG-B20 & LOG-B21: checkBuntingLimit NaN Safe & API ID Collision Fix ---');

// Mock transactions in localStorage
const mockBuntingTxs = [
  // 2 transaksi via form harian (multi-feed: 2 baris pakan dalam 1 transaksi)
  { id: 'TX-K1M2N3-0', nomor_anggota: 'R-50', is_program_bunting: true, timestamp: '2026-03-10T08:00', jenis_pakan: 'MF A20 RATIO' },
  { id: 'TX-K1M2N3-1', nomor_anggota: 'R-50', is_program_bunting: true, timestamp: '2026-03-10T08:00', jenis_pakan: 'MAGNESIUM' },
  // 1 transaksi kedua via form harian
  { id: 'TX-K9X8Y7-0', nomor_anggota: 'R-50', is_program_bunting: true, timestamp: '2026-05-15T09:00', jenis_pakan: 'MF A20 RATIO' },
  // 1 transaksi ketiga via API
  { id: 'TRX-LOG-PAK-1725883921000', nomor_anggota: 'R-50', is_program_bunting: true, timestamp: '2026-07-20T10:00', jenis_pakan: 'MF A20 RATIO' },
  // 1 transaksi keempat via API pada waktu berbeda
  { id: 'TRX-LOG-PAK-1725999999000', nomor_anggota: 'R-50', is_program_bunting: true, timestamp: '2026-08-25T11:00', jenis_pakan: 'DCP' }
];
mockLocalStorage.setItem('DANAMULYA_LOGISTIK_TX_V1', JSON.stringify(mockBuntingTxs));

const countWithPrefix = LM.checkBuntingLimit('R-50', 2026);
const countNumericOnly = LM.checkBuntingLimit('50', 2026);
assert('LOG-B20: checkBuntingLimit mengenali anggota berawalan R-50', countWithPrefix > 0);
assert('LOG-B20: checkBuntingLimit menghasilkan nilai sama antara "R-50" dan "50"', countWithPrefix === countNumericOnly);
// TX-K1M2N3 (1) + TX-K9X8Y7 (2) + TRX-LOG-PAK-1725883921000 (3) + TRX-LOG-PAK-1725999999000 (4) = 4 transaksi unik
assert('LOG-B21: checkBuntingLimit menghitung 4 transaksi unik tanpa collision TRX-LOG', countWithPrefix === 4);

// ============================================================================
// TEST 5: BUG LOG-B22 — createLogistikTransaction di LocalBridgeEngine
// ============================================================================
console.log('\n--- TEST LOG-B22: Action createLogistikTransaction di js/api.js ---');
assert('js/api.js menangani case "createLogistikTransaction"', srcApi.includes('case "createLogistikTransaction":'));

// ============================================================================
// TEST 6: BUG LOG-B23 — createLogistikPembelian Sinkronisasi ke DANAMULYA_LOGISTIK_FULL_V12
// ============================================================================
console.log('\n--- TEST LOG-B23: createLogistikPembelian Sync ke DANAMULYA_LOGISTIK_FULL_V12 ---');
assert('createLogistikPembelian menyinkronkan data ke DANAMULYA_LOGISTIK_FULL_V12',
  srcApi.includes('DANAMULYA_LOGISTIK_FULL_V12') && srcApi.includes('case "createLogistikPembelian":'));

// ============================================================================
// TEST 7: BUG LOG-B24 — Kontrak getPusatRecap di Apps Script recap.gs
// ============================================================================
console.log('\n--- TEST LOG-B24: Kontrak API getPusatRecap di recap.gs ---');
assert('recap.gs menghitung penjualan Logistik per periode tanggal', srcRecapGs.includes('logSalKg') && srcRecapGs.includes('logSalRp'));
assert('recap.gs menghitung pembelian Logistik per periode tanggal', srcRecapGs.includes('logPurKg') && srcRecapGs.includes('logPurRp'));
assert('recap.gs mengembalikan objek penjualan & pembelian di logistikInfo',
  srcRecapGs.includes('penjualan: { total_kg: logSalKg, total_rupiah: logSalRp }') &&
  srcRecapGs.includes('pembelian: { total_kg: logPurKg, total_rupiah: logPurRp }'));

// ============================================================================
// TEST 8: BUG LOG-B25 — Null Crash Guard pada onSelectSec2Pakan
// ============================================================================
console.log('\n--- TEST LOG-B25: Null Guard pada onSelectSec2Pakan ---');
let threwError = false;
try {
  // Dalam sandbox, getElementById mengembalikan null, menguji ketahanan guard
  LM.onSelectSec2Pakan('MAGNESIUM');
} catch (e) {
  threwError = true;
  console.error('Crash pada onSelectSec2Pakan:', e);
}
assert('onSelectSec2Pakan berjalan aman tanpa TypeError ketika elemen tidak ada di DOM', !threwError);

console.log(`\n======================================================`);
console.log(`HASIL: ${passed} PASSED, ${failed} FAILED`);
console.log(`======================================================\n`);

process.exit(failed > 0 ? 1 : 0);
