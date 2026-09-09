// scratch/test_logistik_all_fixes.cjs
const fs = require('fs');
const vm = require('vm');

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

// Load api.js and logistik.js
vm.runInThisContext(fs.readFileSync('js/api.js', 'utf8'));
vm.runInThisContext(fs.readFileSync('js/logistik.js', 'utf8'));

sessionStore['CURRENT_SESSION'] = JSON.stringify({
  sessionId: 'SESS-ADMIN',
  userId: 'USR-ADMIN',
  username: 'admin',
  role: 'admin',
  divisi: 'ALL'
});

console.log('=== TEST LOG-B1: Matrix Sync on Transaction Deletion ===');
const allData = LogistikModule.getFullData();

// Add transaction to JULI
let txs = LogistikModule.getTransactions();
txs.push({
  id: 'TX-TEST-JULI-1',
  timestamp: '2026-07-15T10:00',
  jenis_pakan: 'MF A20 RATIO',
  jumlah_sak_kg: 80,
  harga_satuan: 4200,
  total_rp: 336000,
  metode_pembayaran: 'TUNAI'
});
LogistikModule.saveTransactions(txs);
LogistikModule.syncMatrixFromTransactions(allData, null);

const juliWithTx = allData['JULI'];
console.log('JULI sec2 with tx:', juliWithTx.sec2.reduce((a, b) => a + (b.total_rp || 0), 0));
console.log('JULI sec4 penjualan with tx:', juliWithTx.sec4.find(s => s.nama === 'MIX FEED A20').penjualan);

// Now delete that transaction
global.confirm = () => true;
global.showToast = () => {};
global.App = { render: () => {} };
LogistikModule.deleteLogistikTx('TX-TEST-JULI-1');

const juliAfterDel = LogistikModule.getFullData()['JULI'];
const sec2Zero = juliAfterDel.sec2.reduce((a, b) => a + (b.total_rp || 0), 0) === 0;
const sec4Zero = juliAfterDel.sec4.find(s => s.nama === 'MIX FEED A20').penjualan === 0;
console.log('LOG-B1: JULI sec2 reset to 0 after deleting tx?', sec2Zero ? 'PASS' : 'FAIL');
console.log('LOG-B1: JULI sec4 reset to 0 after deleting tx?', sec4Zero ? 'PASS' : 'FAIL');

// Test baseline restoration for JAN
const janDataBefore = LogistikModule.getFullData()['JAN'];
const janSec2Base = janDataBefore.sec2.reduce((a, b) => a + (b.total_rp || 0), 0);
const janSec4Base = janDataBefore.sec4.find(s => s.nama === 'MIX FEED A20').penjualan;

txs = LogistikModule.getTransactions();
txs.push({
  id: 'TX-TEST-JAN-1',
  timestamp: '2026-01-10T10:00',
  jenis_pakan: 'MF A20 RATIO',
  jumlah_sak_kg: 50,
  harga_satuan: 4200,
  total_rp: 210000,
  metode_pembayaran: 'TUNAI'
});
LogistikModule.saveTransactions(txs);
LogistikModule.syncMatrixFromTransactions(LogistikModule.getFullData(), null);

LogistikModule.deleteLogistikTx('TX-TEST-JAN-1');
const janAfterDel = LogistikModule.getFullData()['JAN'];
const janSec2Restored = janAfterDel.sec2.reduce((a, b) => a + (b.total_rp || 0), 0) === janSec2Base;
const janSec4Restored = janAfterDel.sec4.find(s => s.nama === 'MIX FEED A20').penjualan === janSec4Base;
console.log('LOG-B1: JAN sec2 restored to Excel baseline after deleting tx?', janSec2Restored ? 'PASS' : 'FAIL');
console.log('LOG-B1: JAN sec4 restored to Excel baseline after deleting tx?', janSec4Restored ? 'PASS' : 'FAIL');

console.log('\n=== TEST LOG-B2: LocalBridgeEngine DB Sync on Delete ===');
// Create a tx via LocalBridgeEngine
const resCreate = LocalBridgeEngine.dispatch('createLogistikPenjualan', 'SESS-ADMIN', {
  tanggal: '2026-06-01',
  nama_pakan: 'MF A20 RATIO',
  jumlah_kg: 25,
  harga_per_kg: 4200
});
const bridgeTxId = resCreate.data.transaction_id;

// Verify it exists in LocalBridgeEngine
let dbBefore = LocalBridgeEngine.getDB();
console.log('Created in LocalBridgeEngine:', dbBefore.LOGISTIK_PAKAN_PENJUALAN.some(t => t.transaction_id === bridgeTxId));

// Delete via LogistikModule.deleteLogistikTx
LogistikModule.deleteLogistikTx(bridgeTxId);

// Verify it is REMOVED from LocalBridgeEngine
let dbAfter = LocalBridgeEngine.getDB();
const bridgeDeleted = !dbAfter.LOGISTIK_PAKAN_PENJUALAN.some(t => t.transaction_id === bridgeTxId);
console.log('LOG-B2: Deleted from LocalBridgeEngine DB?', bridgeDeleted ? 'PASS' : 'FAIL');

console.log('\n=== TEST LOG-B5: Double Checkmark Prevention for Program Bunting ===');
const sampleTxBunting = [{
  id: 'TX-BUNTING-1',
  kode_r_nr: 'R-10',
  nama_peternak: 'Sutrisno',
  jenis_pakan: 'MF A20 RATIO',
  jumlah_sak_kg: 50,
  harga_satuan: 4200,
  total_rp: 210000,
  timestamp: '2026-06-15T09:00',
  jadwal_penagihan: 'P1',
  metode_pembayaran: 'PROGRAM_BUNTING',
  is_program_bunting: true
}];

const htmlTable = LogistikModule.buildHtmlPenjualanHarian(sampleTxBunting);
// Check if P1 cell has checkmark
const p1HasCheck = htmlTable.includes('<td>✓</td><td></td><td></td><td></td><td>✓</td>');
const p1Empty = /<td><\/td>\s*<td><\/td>\s*<td><\/td>\s*<td><\/td>\s*<td>✓<\/td>/.test(htmlTable);
console.log('LOG-B5: Program Bunting has ONLY Bunting checkmark and P1 is empty?', p1Empty ? 'PASS' : 'FAIL');

console.log('\n=== TEST LOG-B3: Backend Apps Script Code.gs and logistik.gs ===');
const codeGsSrc = fs.readFileSync('apps-script/Code.gs', 'utf8');
const logGsSrc = fs.readFileSync('apps-script/logistik.gs', 'utf8');

const hasPenjRoute = codeGsSrc.includes('case "getLogistikPenjualan":') && codeGsSrc.includes('case "createLogistikPenjualan":');
const hasPembRoute = codeGsSrc.includes('case "getLogistikPembelian":') && codeGsSrc.includes('case "createLogistikPembelian":');
const hasPenjFn = logGsSrc.includes('function getLogistikPenjualan(') && logGsSrc.includes('function createLogistikPenjualan(');
const hasPembFn = logGsSrc.includes('function getLogistikPembelian(') && logGsSrc.includes('function createLogistikPembelian(');

console.log('LOG-B3: Code.gs routes getLogistikPenjualan & createLogistikPenjualan?', hasPenjRoute ? 'PASS' : 'FAIL');
console.log('LOG-B3: Code.gs routes getLogistikPembelian & createLogistikPembelian?', hasPembRoute ? 'PASS' : 'FAIL');
console.log('LOG-B3: logistik.gs implements getLogistikPenjualan & createLogistikPenjualan?', hasPenjFn ? 'PASS' : 'FAIL');
console.log('LOG-B3: logistik.gs implements getLogistikPembelian & createLogistikPembelian?', hasPembFn ? 'PASS' : 'FAIL');
