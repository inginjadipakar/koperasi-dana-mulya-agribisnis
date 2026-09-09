/**
 * TEST SUITE BATCH 6 (LOG-B32 - LOG-B37)
 * Memverifikasi perbaikan bug kalkulasi neraca fisik "ALL", integrasi pakan baru sec3->sec4,
 * sinkronisasi API createLogistikPenjualan ke DANAMULYA_LOGISTIK_FULL_V12, route deleteLogistikTransaction,
 * pencegahan collision ID peternak, serta kelengkapan form Seksi II & Seksi I di UI.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

let passed = 0;
let total = 0;

function assert(name, condition, detail = '') {
  total++;
  if (condition) {
    console.log(`  PASS: ${name}`);
    passed++;
  } else {
    console.error(`  FAIL: ${name} ${detail}`);
  }
}

console.log("=== TEST SUITE BATCH 6 (LOG-B32 - LOG-B37) ===\n");

// Setup mock browser environment
const mockLocalStorage = {
  store: {},
  getItem(k) { return this.store[k] || null; },
  setItem(k, v) { this.store[k] = String(v); },
  removeItem(k) { delete this.store[k]; },
  clear() { this.store = {}; }
};

const mockSessionStorage = {
  store: {},
  getItem(k) { return this.store[k] || null; },
  setItem(k, v) { this.store[k] = String(v); },
  removeItem(k) { delete this.store[k]; },
  clear() { this.store = {}; }
};

const mockElements = {};
function getOrCreateMockElement(id) {
  if (!mockElements[id]) {
    mockElements[id] = {
      id: id,
      value: "",
      innerText: "",
      innerHTML: "",
      style: {},
      classList: {
        add: () => {},
        remove: () => {},
        toggle: () => {}
      }
    };
  }
  return mockElements[id];
}

const sandbox = {
  window: {},
  document: {
    getElementById: (id) => getOrCreateMockElement(id),
    querySelectorAll: () => []
  },
  localStorage: mockLocalStorage,
  sessionStorage: mockSessionStorage,
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  Number: Number,
  String: String,
  parseInt: parseInt,
  parseFloat: parseFloat,
  Date: Date,
  Math: Math,
  JSON: JSON,
  Array: Array,
  Object: Object,
  RegExp: RegExp,
  Set: Set,
  AuthManager: {
    requireAuth: () => true,
    getSession: () => ({ namaLengkap: 'Petugas Test', role: 'logistik', divisi: 'LOGISTIK', userId: 'USR-LOG01' })
  },
  App: { render: () => {} },
  showToast: () => {},
  showAlert: () => {},
  XLSX: {
    utils: {
      book_new: () => ({ SheetNames: [], Sheets: {} }),
      book_append_sheet: () => {},
      aoa_to_sheet: () => ({})
    },
    writeFile: () => {}
  }
};

vm.createContext(sandbox);

// Load js/api.js & js/logistik.js
const apiCode = fs.readFileSync(path.join(__dirname, '../js/api.js'), 'utf8');
const logistikCode = fs.readFileSync(path.join(__dirname, '../js/logistik.js'), 'utf8');

vm.runInContext(apiCode + '; this.LocalBridgeEngine = LocalBridgeEngine;', sandbox);
vm.runInContext(logistikCode + '; this.LogistikModule = LogistikModule;', sandbox);

const LM = sandbox.LogistikModule;
const LBE = sandbox.LocalBridgeEngine;

// --- TEST 1: LOG-B32 (Mathematical Balance for ALL view in getMonthDataForView) ---
console.log("--- TEST LOG-B32: Mathematical Balance for ALL View ---");
const allData = LM.getFullData();
LM.selectedMonth = "ALL";
const viewAll = LM.getMonthDataForView(allData);

// Check MILK CAN: saU: 6, pemU: 0, penU: 2 -> stok_akhir_unit MUST be 4!
const milkCan = viewAll.sec1.find(it => it.nama.toUpperCase().includes("MILK CAN"));
assert("Seksi I MILK CAN stok_akhir_unit sesuai rumus fisik (6 + 0 - 2 = 4)", milkCan && milkCan.stok_akhir_unit === 4);

// Check all items in Seksi I satisfy balance equation
const sec1AllValid = viewAll.sec1.every(it => {
  const expected = Math.max(0, (it.stok_awal_unit || 0) + (it.pembelian_unit || 0) - (it.penjualan_unit || 0));
  return it.stok_akhir_unit === expected;
});
assert("Seluruh item Seksi I pada view ALL memenuhi neraca stok awal + beli - jual", sec1AllValid);

// Check all items in Seksi IV satisfy balance equation
const sec4AllValid = viewAll.sec4.every(it => {
  const expected = Math.max(0, (it.siap_jual || 0) - (it.penjualan || 0) - (it.susut || 0));
  return it.stok_akhir === expected;
});
assert("Seluruh item Seksi IV pada view ALL memenuhi neraca siap_jual - jual - susut", sec4AllValid);

// --- TEST 2: LOG-B33 (Custom Feeds in Seksi III auto-created in Seksi IV) ---
console.log("\n--- TEST LOG-B33: Custom Feed Auto-Registration from Seksi III to Seksi IV ---");
const testData = LM.getFullData();
LM.ensureMonthData(testData, "MEI");
testData["MEI"].sec3.push({
  no: 99,
  nama: "KONSENTRAT BOOSTER KKN",
  kg: 500,
  harga: 5500,
  rp: 2750000
});

LM.syncMatrixFromTransactions(testData, "MEI");
const boosterInSec4 = testData["MEI"].sec4.find(it => it.nama === "KONSENTRAT BOOSTER KKN");
assert("Pakan baru 'KONSENTRAT BOOSTER KKN' dari Seksi III otomatis terdaftar di Seksi IV", !!boosterInSec4);
assert("Pakan baru di Seksi IV memiliki pembelian dan siap_jual = 500 KG", boosterInSec4 && boosterInSec4.pembelian === 500 && boosterInSec4.siap_jual === 500);

// --- TEST 3: LOG-B34 (createLogistikPenjualan syncs to DANAMULYA_LOGISTIK_FULL_V12) ---
console.log("\n--- TEST LOG-B34: createLogistikPenjualan Sync to DANAMULYA_LOGISTIK_FULL_V12 ---");
mockLocalStorage.clear();
mockSessionStorage.clear();
mockSessionStorage.setItem("CURRENT_SESSION", JSON.stringify({
  sessionId: "TOK_TEST",
  userId: "USR-LOG01",
  role: "logistik",
  divisi: "LOGISTIK"
}));

const db = {
  USERS: [],
  AUTH_SESSIONS: [{ token: "TOK_TEST", userId: "USR-LOG01", role: "logistik", expiresAt: Date.now() + 100000 }],
  LOGISTIK_PAKAN_PENJUALAN: [],
  LOGISTIK_PAKAN_PEMBELIAN: []
};
LBE.saveDB(db);

const baseMatrix = LM.getFullData();
mockLocalStorage.setItem("DANAMULYA_LOGISTIK_FULL_V12", JSON.stringify(baseMatrix));
const initPenj = baseMatrix["APRIL"].sec4.find(it => it.nama === "MIX FEED A20").penjualan || 0;

const resPenj = LBE.dispatch("createLogistikPenjualan", "TOK_TEST", {
  tanggal: "2026-04-10",
  nama_pakan: "MIX FEED A20",
  nama_peternak: "BAPAK AGUS",
  jumlah_kg: 200,
  harga_per_kg: 4200,
  jenis_pembayaran: "TUNAI"
});

assert("API createLogistikPenjualan sukses", resPenj.success);
const updatedMatrix = JSON.parse(mockLocalStorage.getItem("DANAMULYA_LOGISTIK_FULL_V12"));
const aprilSec2 = updatedMatrix["APRIL"].sec2.find(it => it.nama.includes("A20"));
const aprilSec4 = updatedMatrix["APRIL"].sec4.find(it => it.nama === "MIX FEED A20");
assert("Penjualan tunai Seksi II bertambah 200 KG", aprilSec2 && aprilSec2.tunai_kg >= 200);
assert("Penjualan Seksi IV bertambah 200 KG", aprilSec4 && aprilSec4.penjualan === initPenj + 200);

// --- TEST 4: LOG-B35 (deleteLogistikTransaction backend & api.js) ---
console.log("\n--- TEST LOG-B35: deleteLogistikTransaction Endpoint & Route ---");
const codeGsSrc = fs.readFileSync(path.join(__dirname, '../apps-script/Code.gs'), 'utf8');
const logGsSrc = fs.readFileSync(path.join(__dirname, '../apps-script/logistik.gs'), 'utf8');

assert("Code.gs routes deleteLogistikTransaction", codeGsSrc.includes('case "deleteLogistikTransaction":'));
assert("logistik.gs implements deleteLogistikTransaction", logGsSrc.includes('function deleteLogistikTransaction('));

const resDel = LBE.dispatch("deleteLogistikTransaction", "TOK_TEST", {
  transaction_id: resPenj.data.transaction_id
});
assert("LocalBridgeEngine deleteLogistikTransaction berhasil", resDel.success && resDel.code === "DELETED");
const dbAfterDel = LBE.getDB();
assert("Transaksi terhapus dari LOGISTIK_PAKAN_PENJUALAN", !dbAfterDel.LOGISTIK_PAKAN_PENJUALAN.some(t => t.transaction_id === resPenj.data.transaction_id));

// --- TEST 5: LOG-B36 (Collision-safe Peternak ID) ---
console.log("\n--- TEST LOG-B36: Collision-safe Peternak ID ---");
assert("Tidak ada lagi Date.now().toString().slice(-4)", !logistikCode.includes("Date.now().toString().slice(-4)"));
assert("Tidak ada lagi Date.now().toString().slice(-5)", !logistikCode.includes("Date.now().toString().slice(-5)"));
assert("Menggunakan base-36 timestamp acak untuk ID peternak", logistikCode.includes("Date.now().toString(36).toUpperCase()"));

// --- TEST 6: LOG-B37 (formLogSec2 and Badges exist in template) ---
console.log("\n--- TEST LOG-B37: formLogSec2 & Seksi I Badges ---");
assert("formLogSec2 dirender di template HTML", logistikCode.includes('id="formLogSec2"'));
assert("Input sec2_tunai_kg ada di formLogSec2", logistikCode.includes('id="sec2_tunai_kg"'));
assert("Badge sec1_pembelian_rp_input ada di template Seksi I", logistikCode.includes('id="sec1_pembelian_rp_input"'));
assert("Badge sec1_penjualan_rp_input ada di template Seksi I", logistikCode.includes('id="sec1_penjualan_rp_input"'));

console.log("\n======================================================");
console.log(`HASIL: ${passed} PASSED, ${total - passed} FAILED`);
console.log("======================================================");

if (total - passed > 0) process.exit(1);
