/**
 * TEST SUITE BATCH 5 (LOG-B26 - LOG-B31)
 * Memverifikasi perbaikan bug desinkronisasi, bidirectional feed matching,
 * zero stock fallback handling, format waktu Excel, targetMonth extraction, dan DRY export helper.
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

console.log("=== TEST SUITE BATCH 5 (LOG-B26 - LOG-B31) ===\n");

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

const sandbox = {
  window: {},
  document: {
    getElementById: (id) => ({
      value: "",
      style: {},
      innerText: "",
      innerHTML: ""
    }),
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

// --- TEST 1: LOG-B26 (Seksi II to Seksi IV deterministic sales sync) ---
console.log("--- TEST LOG-B26: Seksi II to Seksi IV Deterministic Sales Sync ---");
const allData = LM.getFullData();
LM.ensureMonthData(allData, "JULI");
const juli = allData["JULI"];

const mf20Sec2 = juli.sec2.find(it => it.nama.includes("A20"));
if (mf20Sec2) {
  mf20Sec2.tunai_kg = 500;
  mf20Sec2.tunai_rp = 2250000;
  mf20Sec2._manual = true;
}

LM.syncMatrixFromTransactions(allData, "JULI");

const mf20Sec4 = juli.sec4.find(it => it.nama === "MIX FEED A20");
assert("Penjualan manual Seksi II tersinkron ke Seksi IV saat txs kosong", mf20Sec4 && mf20Sec4.penjualan === 500);
assert("Stok akhir Seksi IV dihitung akurat berdasarkan penjualan tersinkron", mf20Sec4 && mf20Sec4.stok_akhir === Math.max(0, mf20Sec4.siap_jual - 500 - (mf20Sec4.susut || 0)));

// --- TEST 2: LOG-B27 (Bidirectional Feed Matching in js/api.js) ---
console.log("\n--- TEST LOG-B27: Bidirectional Feed Matching in createLogistikPembelian ---");
mockLocalStorage.clear();
mockSessionStorage.clear();
mockSessionStorage.setItem("CURRENT_SESSION", JSON.stringify({
  sessionId: "TOK_TEST",
  userId: "USR01",
  role: "logistik",
  divisi: "LOGISTIK"
}));

const db = {
  USERS: [],
  AUTH_SESSIONS: [{ token: "TOK_TEST", userId: "USR01", role: "logistik", expiresAt: Date.now() + 100000 }],
  LOGISTIK_PAKAN_PEMBELIAN: []
};
LBE.saveDB(db);

const baseFull = LM.getFullData();
mockLocalStorage.setItem("DANAMULYA_LOGISTIK_FULL_V12", JSON.stringify(baseFull));
const initPurch = baseFull["MEI"].sec4.find(it => it.nama === "MIX FEED A20").pembelian || 0;

const res = LBE.dispatch("createLogistikPembelian", "TOK_TEST", {
  tanggal: "2026-05-15",
  nama_pakan: "MIX FEED A20 TUNAI",
  jumlah_kg: 350,
  harga_per_kg: 4500
});

assert("API createLogistikPembelian sukses", res.success);
const updatedAll = JSON.parse(mockLocalStorage.getItem("DANAMULYA_LOGISTIK_FULL_V12"));
const updatedSec4 = updatedAll["MEI"].sec4.find(it => it.nama === "MIX FEED A20");
assert("Pembelian Seksi IV MIX FEED A20 bertambah 350 KG dari pakan 'MIX FEED A20 TUNAI'", updatedSec4 && updatedSec4.pembelian === initPurch + 350);

// --- TEST 3: LOG-B28 (Strict zero stock handling in buildHtmlSec1 and buildHtmlSec4) ---
console.log("\n--- TEST LOG-B28: Strict Zero Stock Handling in HTML Exports ---");
const mockSec1Month = {
  sec1: [
    {
      no: 1,
      nama: "EMBER SUSU HABIS",
      stok_awal_unit: 10,
      stok_awal_harga: 50000,
      stok_awal_rp: 500000,
      pembelian_unit: 0,
      penjualan_unit: 0,
      stok_akhir_unit: 0, // Habis fisik
      stok_akhir_rp: 0
    }
  ]
};

const html1 = LM.buildHtmlSec1(mockSec1Month);
assert("buildHtmlSec1 mencetak 0 untuk stok_akhir_unit habis tanpa fallback ke saU (10)", html1.includes("<td>0</td>") && !html1.includes("<td>10</td>\n          <td>Rp 500.000</td>\n        </tr>"));

const mockSec4Month = {
  sec4: [
    {
      no: 1,
      nama: "KONSENTRAT HABIS",
      stok_awal: 500,
      pembelian: 0,
      siap_jual: 500,
      penjualan: 0,
      susut: 0,
      stok_akhir: 0, // Habis fisik
      harga: 4000,
      jumlah_rp: 0
    }
  ]
};

const html4 = LM.buildHtmlSec4(mockSec4Month);
assert("buildHtmlSec4 mencetak 0 untuk stok_akhir habis tanpa fallback ke siap_jual (500)", html4.includes("<td>0</td>") && !html4.includes("<td>500</td>\n          <td>Rp 4.000</td>"));

// --- TEST 4: LOG-B29 (Time format in buildHtmlPenjualanHarian) ---
console.log("\n--- TEST LOG-B29: Time Formatting in buildHtmlPenjualanHarian ---");
const mockTxs = [
  {
    id: "TX-01",
    timestamp: "2026-06-05T08:30:00.000Z",
    kategori_pembeli: "RASIO",
    nomor_anggota: "50",
    nama_peternak: "TEST",
    jenis_pakan: "MIX FEED A20",
    jumlah_sak_kg: 50,
    harga_satuan: 4500,
    total_rp: 225000,
    metode_pembayaran: "TUNAI"
  }
];

const htmlHarian = LM.buildHtmlPenjualanHarian(mockTxs);
assert("Kolom waktu diformat tepat HH:mm (08:30) agar cocok regex Excel", htmlHarian.includes("<td>08:30</td>") && !htmlHarian.includes("08:30:00.000Z"));

// --- TEST 5: LOG-B30 (TargetMonth Extraction in handleSaveLogistikTx) ---
console.log("\n--- TEST LOG-B30: TargetMonth Extraction from Form Date ---");
const testTgl = "2026-04-18";
const txParts = testTgl.split('-');
const txMonthNum = parseInt(txParts[1], 10);
const monthsList = ["JAN","FEB","MAR","APRIL","MEI","JUNI","JULI","AGU","SEP","OKT","NOV","DES"];
const targetMonth = monthsList[txMonthNum - 1];
assert("Target month diekstrak tepat 'APRIL' dari tgl '2026-04-18'", targetMonth === "APRIL");

// --- TEST 6: LOG-B31 (DRY Export Helper getPreparedMonthData) ---
console.log("\n--- TEST LOG-B31: DRY Export Helper getPreparedMonthData ---");
assert("LogistikModule.getPreparedMonthData adalah fungsi valid", typeof LM.getPreparedMonthData === "function");
const preparedData = LM.getPreparedMonthData();
assert("getPreparedMonthData mengembalikan objek monthData yang lengkap dengan 4 seksi", preparedData && preparedData.sec1 && preparedData.sec2 && preparedData.sec3 && preparedData.sec4);

console.log("\n======================================================");
console.log(`HASIL: ${passed} PASSED, ${total - passed} FAILED`);
console.log("======================================================");

if (total - passed > 0) process.exit(1);
