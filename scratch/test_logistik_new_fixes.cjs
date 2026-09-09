// scratch/test_logistik_new_fixes.cjs
const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

const localStore = {};
const sessionStore = {};
global.window = global;
global.localStorage = {
  getItem: (k) => localStore[k] || null,
  setItem: (k, v) => { localStore[k] = String(v); },
  removeItem: (k) => { delete localStore[k]; },
  clear: () => { for (const k in localStore) delete localStore[k]; }
};
global.sessionStorage = {
  getItem: (k) => sessionStore[k] || null,
  setItem: (k, v) => { sessionStore[k] = String(v); },
  removeItem: (k) => { delete sessionStore[k]; }
};
global.navigator = { userAgent: 'NodeTest' };
global.showToast = (msg, type) => { /* console.log(`[TOAST ${type}] ${msg}`); */ };
global.showAlert = (title, msg, type) => { /* console.log(`[ALERT ${type}] ${title}: ${msg}`); */ };
global.App = { render: () => {} };

// Setup minimal fake DOM
const fakeElements = {};
global.document = {
  getElementById: (id) => {
    if (!fakeElements[id]) {
      fakeElements[id] = { id, value: '', innerText: '', style: {}, classList: { add:()=>{}, remove:()=>{}, toggle:()=>{} }, disabled: false };
    }
    return fakeElements[id];
  }
};

// Load api.js and logistik.js
vm.runInThisContext(fs.readFileSync('js/api.js', 'utf8'));
vm.runInThisContext(fs.readFileSync('js/logistik.js', 'utf8'));

sessionStore['CURRENT_SESSION'] = JSON.stringify({
  sessionId: 'SESS-LOG',
  userId: 'USR-LOG',
  username: 'logistik',
  role: 'logistik',
  divisi: 'LOGISTIK'
});

console.log('=== TEST 1: BUG DOM-1 Non-Rasio Payment Enforcement ===');
// Populate DOM elements that onKategoriPembeliChange interacts with
const optP1 = document.getElementById('opt_p1');
const optP2 = document.getElementById('opt_p2');
const optP3 = document.getElementById('opt_p3');
const optPiu = document.getElementById('opt_piutang');
const optBunt = document.getElementById('opt_prog_bunting');
const elJadwal = document.getElementById('tx_jadwal_penagihan');
const elMetode = document.getElementById('tx_metode_pembayaran');
const elNotice = document.getElementById('tx_non_rasio_notice');

LogistikModule.onKategoriPembeliChange('NON_RASIO');

assert.strictEqual(optP1.disabled, true, 'opt_p1 must be disabled for NON_RASIO');
assert.strictEqual(optP2.disabled, true, 'opt_p2 must be disabled for NON_RASIO');
assert.strictEqual(optP3.disabled, true, 'opt_p3 must be disabled for NON_RASIO');
assert.strictEqual(optPiu.disabled, true, 'opt_piutang must be disabled for NON_RASIO');
assert.strictEqual(optBunt.disabled, true, 'opt_prog_bunting must be disabled for NON_RASIO');
assert.strictEqual(elJadwal.value, 'TUNAI', 'jadwal must be TUNAI for NON_RASIO');
assert.strictEqual(elMetode.value, 'TUNAI', 'metode must be TUNAI for NON_RASIO');
assert.strictEqual(elNotice.style.display, 'block', 'notice should be visible for NON_RASIO');

// Test switching back to RASIO
LogistikModule.onKategoriPembeliChange('RASIO');
assert.strictEqual(optP1.disabled, false, 'opt_p1 re-enabled for RASIO');
assert.strictEqual(optP2.disabled, false, 'opt_p2 re-enabled for RASIO');
assert.strictEqual(optP3.disabled, false, 'opt_p3 re-enabled for RASIO');
assert.strictEqual(optPiu.disabled, false, 'opt_piutang re-enabled for RASIO');
assert.strictEqual(optBunt.disabled, false, 'opt_prog_bunting re-enabled for RASIO');
assert.strictEqual(elNotice.style.display, 'none', 'notice should be hidden for RASIO');
console.log('PASS: BUG DOM-1 UI enforcement works correctly.');

console.log('\n=== TEST 2: BUG SEC4-1 Live Preview and onSelectSec4Pakan ===');
const elSec4Select = document.getElementById('sec4SelectPakan');
const elSec4StokAwal = document.getElementById('sec4_stok_awal');
const elSec4Susut = document.getElementById('sec4_susut');
const elSec4Harga = document.getElementById('sec4_harga');
const elSec4SaBadge = document.getElementById('sec4PreviewStokAwal');
const elSec4SiapBadge = document.getElementById('sec4PreviewSiapJual');
const elSec4AkhirBadge = document.getElementById('sec4PreviewStokAkhir');
const elSec4RpBadge = document.getElementById('sec4PreviewRp');

LogistikModule.selectedMonth = 'JAN';
elSec4Select.value = 'MIX FEED A20';
LogistikModule.onSelectSec4Pakan('MIX FEED A20');

assert.ok(elSec4StokAwal.value !== '', 'sec4_stok_awal must be populated onSelectSec4Pakan');
console.log('MIX FEED A20 initial stock populated:', elSec4StokAwal.value);

// Test custom preview calculation with shrinkage
elSec4Susut.value = '50';
elSec4Harga.value = '4200';
LogistikModule.calcSec4Preview();
console.log('Preview Stok Awal badge:', elSec4SaBadge.innerText);
console.log('Preview Siap Jual badge:', elSec4SiapBadge.innerText);
console.log('Preview Stok Akhir badge:', elSec4AkhirBadge.innerText);
console.log('Preview Rp badge:', elSec4RpBadge.innerText);
assert.ok(elSec4AkhirBadge.innerText.includes('KG'), 'Preview stok akhir badge must contain KG');
assert.ok(elSec4RpBadge.innerText.includes('Rp'), 'Preview Rp badge must contain Rp');
console.log('PASS: BUG SEC4-1 Live Preview works properly.');

console.log('\n=== TEST 3: BUG SEC4-2 formLogSec4 stok_awal handling and carryover ===');
// Simulate handleSaveSec4 with custom stok_awal
LogistikModule.selectedMonth = 'FEB';
const fakeForm = {
  nama_pakan: { value: 'MIX FEED A20' },
  stok_awal: { value: '15000' },
  susut: { value: '25' },
  harga: { value: '4200' }
};

LogistikModule.handleSaveSec4({ preventDefault: () => {}, target: fakeForm });

const febData = LogistikModule.getFullData()['FEB'];
const febItem = febData.sec4.find(s => s.nama === 'MIX FEED A20');
assert.strictEqual(febItem.stok_awal, 15000, 'stok_awal must be saved as 15000');
assert.strictEqual(febItem._manual_stok_awal, true, '_manual_stok_awal flag must be true');

// Now run syncMatrixFromTransactions and ensure FEB stok_awal is NOT wiped by JAN carryover
LogistikModule.syncMatrixFromTransactions(LogistikModule.getFullData(), 'FEB');
const febDataAfterSync = LogistikModule.getFullData()['FEB'];
const febItemAfterSync = febDataAfterSync.sec4.find(s => s.nama === 'MIX FEED A20');
assert.strictEqual(febItemAfterSync.stok_awal, 15000, 'stok_awal should not be overwritten by carryover');
console.log('PASS: BUG SEC4-2 stok_awal is preserved correctly.');

console.log('\n=== TEST 4: BUG SEC1-1 Seksi I Annual Aggregation for selectedMonth === "ALL" ===');
const allData = LogistikModule.getFullData();
// Simulate equipment transactions across months
// FEB: beli 5 unit @ 100.000 (rp 500.000)
allData['FEB'].sec1 = [
  { no: 1, nama: 'EMBER SUSU 15L', stok_awal_unit: 10, stok_awal_harga: 100000, stok_awal_rp: 1000000, pembelian_unit: 5, pembelian_harga: 100000, pembelian_rp: 500000, penjualan_unit: 0, penjualan_harga: 0, penjualan_rp: 0, stok_akhir_unit: 15, stok_akhir_rp: 1500000 }
];
// MAR: jual 3 unit @ 120.000 (rp 360.000)
allData['MAR'].sec1 = [
  { no: 1, nama: 'EMBER SUSU 15L', stok_awal_unit: 15, stok_awal_harga: 100000, stok_awal_rp: 1500000, pembelian_unit: 0, pembelian_harga: 0, pembelian_rp: 0, penjualan_unit: 3, penjualan_harga: 120000, penjualan_rp: 360000, stok_akhir_unit: 12, stok_akhir_rp: 1200000 }
];
// JUNI: no new purchase or sale
allData['JUNI'].sec1 = [
  { no: 1, nama: 'EMBER SUSU 15L', stok_awal_unit: 12, stok_awal_harga: 100000, stok_awal_rp: 1200000, pembelian_unit: 0, pembelian_harga: 0, pembelian_rp: 0, penjualan_unit: 0, penjualan_harga: 0, penjualan_rp: 0, stok_akhir_unit: 12, stok_akhir_rp: 1200000 }
];

LogistikModule.selectedMonth = 'ALL';
const aggregatedView = LogistikModule.getMonthDataForView(allData);
const aggEmber = aggregatedView.sec1.find(it => it.nama === 'EMBER SUSU 15L');

console.log('Aggregated Sec1 EMBER SUSU 15L:', aggEmber);
assert.ok(aggEmber, 'EMBER SUSU 15L must be present in aggregated view');
assert.strictEqual(aggEmber.stok_awal_unit, 10, 'Initial stok awal must be 10 from the first month');
assert.strictEqual(aggEmber.pembelian_unit, 5, 'Pembelian unit must sum across months (5)');
assert.strictEqual(aggEmber.pembelian_rp, 500000, 'Pembelian rp must sum across months (500.000)');
assert.strictEqual(aggEmber.penjualan_unit, 3, 'Penjualan unit must sum across months (3)');
assert.strictEqual(aggEmber.penjualan_rp, 360000, 'Penjualan rp must sum across months (360.000)');
assert.strictEqual(aggEmber.stok_akhir_unit, 12, 'Stok akhir must reflect final ending balance (12)');
console.log('PASS: BUG SEC1-1 annual aggregation correctly sums purchases, sales, and tracks balances across all months.');

console.log('\n>>> ALL 4 BUG FIXES VERIFIED AND PASSING! <<<');
