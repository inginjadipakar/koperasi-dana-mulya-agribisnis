// scratch/test_api_fixes.js
const fs = require('fs');

const localStore = {};
const sessionStore = {};
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

// Read and execute api.js in current global scope
const apiSrc = fs.readFileSync('js/api.js', 'utf8');
const vm = require('vm');
vm.runInThisContext(apiSrc);

console.log('=== TEST 1: DB Persistence and Version Match (API-B1) ===');
LocalBridgeEngine.initStorage();
const v1 = localStorage.getItem('DANAMULYA_DB_VERSION');
console.log('Stored DB version:', v1);
const db1 = LocalBridgeEngine.getDB();
db1.DEPOT_OPERASIONAL.push({ transaction_id: 'CUSTOM_TEST_TRX', nominal_biaya: 50000 });
LocalBridgeEngine.saveDB(db1);

// Call getDB() again - it should NOT wipe out our custom record!
const db2 = LocalBridgeEngine.getDB();
const found = db2.DEPOT_OPERASIONAL.some(r => r.transaction_id === 'CUSTOM_TEST_TRX');
console.log('API-B1: DB persisted without being wiped?', found ? 'PASS' : 'FAIL');

console.log('\n=== TEST 2: Logistik Validation (API-B4) ===');
sessionStore['CURRENT_SESSION'] = JSON.stringify({
  sessionId: 'SESS-TEST',
  userId: 'USR-ADMIN',
  username: 'admin',
  role: 'admin',
  divisi: 'ALL'
});

// Invalid tanggal
const r1 = LocalBridgeEngine.dispatch('createLogistikPenjualan', 'SESS-TEST', { tanggal: '', nama_pakan: 'Pakan A', jumlah_kg: 10 });
console.log('Empty tanggal rejected?', r1.code === 'VALIDATION_ERROR' ? 'PASS' : 'FAIL');

// Empty nama_pakan
const r2 = LocalBridgeEngine.dispatch('createLogistikPenjualan', 'SESS-TEST', { tanggal: '2026-05-01', nama_pakan: '   ', jumlah_kg: 10 });
console.log('Empty nama_pakan rejected?', r2.code === 'VALIDATION_ERROR' ? 'PASS' : 'FAIL');

// NaN jumlah_kg
const r3 = LocalBridgeEngine.dispatch('createLogistikPenjualan', 'SESS-TEST', { tanggal: '2026-05-01', nama_pakan: 'Pakan A', jumlah_kg: 'abc' });
console.log('NaN jumlah_kg rejected?', r3.code === 'VALIDATION_ERROR' ? 'PASS' : 'FAIL');

// Negative jumlah_kg
const r4 = LocalBridgeEngine.dispatch('createLogistikPenjualan', 'SESS-TEST', { tanggal: '2026-05-01', nama_pakan: 'Pakan A', jumlah_kg: -5 });
console.log('Negative jumlah_kg rejected?', r4.code === 'VALIDATION_ERROR' ? 'PASS' : 'FAIL');

// Negative harga_per_kg
const r5 = LocalBridgeEngine.dispatch('createLogistikPenjualan', 'SESS-TEST', { tanggal: '2026-05-01', nama_pakan: 'Pakan A', jumlah_kg: 10, harga_per_kg: -100 });
console.log('Negative harga_per_kg rejected?', r5.code === 'VALIDATION_ERROR' ? 'PASS' : 'FAIL');

console.log('\n=== TEST 3: Logistik Penjualan Creation & Sync (API-B2) ===');
const r6 = LocalBridgeEngine.dispatch('createLogistikPenjualan', 'SESS-TEST', {
  tanggal: '2026-05-01',
  nama_pakan: 'MF A20 RATIO',
  nama_peternak: 'Budi Santoso',
  jumlah_kg: 50,
  harga_per_kg: 4200,
  jenis_pembayaran: 'TUNAI'
});
console.log('Valid penjualan created?', r6.success ? 'PASS' : 'FAIL');

const txList = JSON.parse(localStorage.getItem('DANAMULYA_LOGISTIK_TX_V1') || '[]');
const txSynced = txList.some(t => t.id === r6.data.transaction_id);
console.log('Penjualan synced to DANAMULYA_LOGISTIK_TX_V1?', txSynced ? 'PASS' : 'FAIL');

const getPenj = LocalBridgeEngine.dispatch('getLogistikPenjualan', 'SESS-TEST', {});
console.log('getLogistikPenjualan contains created tx?', getPenj.data.some(t => t.transaction_id === r6.data.transaction_id) ? 'PASS' : 'FAIL');

console.log('\n=== TEST 4: Logistik Pembelian Validation & Creation ===');
const rPemBad = LocalBridgeEngine.dispatch('createLogistikPembelian', 'SESS-TEST', { tanggal: '2026-05-01', nama_pakan: 'Pakan B', jumlah_kg: 'xyz' });
console.log('Invalid pembelian rejected?', rPemBad.code === 'VALIDATION_ERROR' ? 'PASS' : 'FAIL');

const rPemGood = LocalBridgeEngine.dispatch('createLogistikPembelian', 'SESS-TEST', {
  tanggal: '2026-05-01',
  nama_pakan: 'MIX FEED A20',
  jumlah_kg: 1000,
  harga_per_kg: 4000
});
console.log('Valid pembelian created?', rPemGood.success ? 'PASS' : 'FAIL');

console.log('\n=== TEST 5: getPusatRecap Logistik Aggregation (API-B3) ===');
const recap = LocalBridgeEngine.dispatch('getPusatRecap', 'SESS-TEST', { startDate: '2026-01-01', endDate: '2026-12-31' });
console.log('Recap logistik status:', recap.data.logistik.status);
console.log('Recap logistik penjualan kg:', recap.data.logistik.penjualan.total_kg);
console.log('Recap logistik penjualan Rp:', recap.data.logistik.penjualan.total_rupiah);
console.log('API-B3: Recap logistik status ACTIVE and not PENDING?', recap.data.logistik.status === 'ACTIVE' ? 'PASS' : 'FAIL');
console.log('Recap has correct penjualan total kg (50)?', recap.data.logistik.penjualan.total_kg === 50 ? 'PASS' : 'FAIL');
console.log('Recap has correct penjualan total Rp (210000)?', recap.data.logistik.penjualan.total_rupiah === 210000 ? 'PASS' : 'FAIL');
