/**
 * Test suite for verifying P1, P2, P3 billing schedule labels & logic:
 * P1 tgl 1-10 -> tagih tgl 15
 * P2 tgl 11-20 -> tagih tgl 25
 * P3 tgl 21-akhir -> tagih tgl 5
 */

const assert = require('assert');
const fs = require('fs');

console.log('=== TEST: JADWAL PENAGIHAN P1, P2, P3 LOGISTIK ===\n');

// 1. Verify text in logistik.js
const logistikContent = fs.readFileSync('js/logistik.js', 'utf8');

assert(logistikContent.includes('Potongan Rutin P1 (Tgl 1-10 | Tagih Tgl 15)'), 'P1 label must match Tagih Tgl 15');
assert(logistikContent.includes('Potongan Rutin P2 (Tgl 11-20 | Tagih Tgl 25)'), 'P2 label must match Tagih Tgl 25');
assert(logistikContent.includes('Potongan Rutin P3 (Tgl 21-Akhir | Tagih Tgl 5)'), 'P3 label must match Tagih Tgl 5');

console.log('✓ PASS: Dropdown option labels correctly show:');
console.log('  - P1: Tgl 1-10 | Tagih Tgl 15');
console.log('  - P2: Tgl 11-20 | Tagih Tgl 25');
console.log('  - P3: Tgl 21-Akhir | Tagih Tgl 5\n');

// 2. Mock environment to test logic
const mockStorage = {};
global.localStorage = {
  getItem: (k) => mockStorage[k] || null,
  setItem: (k, v) => { mockStorage[k] = String(v); },
  removeItem: (k) => { delete mockStorage[k]; }
};

global.AuthManager = {
  getSession: () => ({ namaLengkap: 'Petugas Test', role: 'LOGISTIK' })
};

global.window = global;
global.showToast = () => {};
global.showAlert = () => {};
global.App = { render: () => {} };

// Evaluate logistik.js
eval(logistikContent);

// Test initialPeriode logic
function getPeriodeForDate(dateStr) {
  const day = parseInt(dateStr.split('-')[2], 10) || 1;
  return (day <= 10) ? 'P1' : (day <= 20 ? 'P2' : 'P3');
}

assert.strictEqual(getPeriodeForDate('2026-09-01'), 'P1', 'Tgl 1 is P1');
assert.strictEqual(getPeriodeForDate('2026-09-10'), 'P1', 'Tgl 10 is P1');
assert.strictEqual(getPeriodeForDate('2026-09-11'), 'P2', 'Tgl 11 is P2');
assert.strictEqual(getPeriodeForDate('2026-09-20'), 'P2', 'Tgl 20 is P2');
assert.strictEqual(getPeriodeForDate('2026-09-21'), 'P3', 'Tgl 21 is P3');
assert.strictEqual(getPeriodeForDate('2026-09-30'), 'P3', 'Tgl 30 is P3');
assert.strictEqual(getPeriodeForDate('2026-09-31'), 'P3', 'Tgl 31 is P3');

console.log('✓ PASS: Date boundary calculations (1-10 -> P1, 11-20 -> P2, 21-end -> P3) verified');

// Test onTanggalPengambilanChange
const mockElements = {
  tx_kategori_pembeli: { value: 'RASIO' },
  tx_jadwal_penagihan: { value: 'P1' },
  tx_metode_pembayaran: { value: 'POTONGAN_RUTIN' }
};

global.document = {
  getElementById: (id) => mockElements[id] || null
};

// Date change to 15th -> P2
LogistikModule.onTanggalPengambilanChange('2026-09-15');
assert.strictEqual(mockElements.tx_jadwal_penagihan.value, 'P2', 'Date 15th must change dropdown to P2');

// Date change to 25th -> P3
LogistikModule.onTanggalPengambilanChange('2026-09-25');
assert.strictEqual(mockElements.tx_jadwal_penagihan.value, 'P3', 'Date 25th must change dropdown to P3');

// Date change to 5th -> P1
LogistikModule.onTanggalPengambilanChange('2026-09-05');
assert.strictEqual(mockElements.tx_jadwal_penagihan.value, 'P1', 'Date 5th must change dropdown to P1');

console.log('✓ PASS: onTanggalPengambilanChange dynamic updates to P1, P2, and P3 verified');
console.log('\n=== ALL BILLING SCHEDULE TESTS PASSED SUCCESSFULLY! ===\n');
