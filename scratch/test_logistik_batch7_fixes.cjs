/**
 * TEST SUITE BATCH 7 (LOG-B38 - LOG-B41)
 * Memverifikasi perbaikan:
 * 1. LOG-B38: Paritas metrik ALL view antara recap.js dan LogistikModule.getMonthDataForView
 * 2. LOG-B39: Pencocokan komutatif (simetris) dua arah di isSec4FeedMatch
 * 3. LOG-B40: Proteksi harga pakan subsidi vs non-anggota (UI disabled, stepper guard, saveMultiTx validation)
 * 4. LOG-B41: Pengecekan kategori case-insensitive & trim pada apps-script/recap.gs dan logistik.gs
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

console.log("=== TEST SUITE BATCH 7 (LOG-B38 - LOG-B41) ===\n");

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
      disabled: false,
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

let lastAlert = null;
function mockShowAlert(title, message, type) {
  lastAlert = { title, message, type };
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
  showAlert: mockShowAlert,
  XLSX: {
    utils: {
      book_new: () => ({ SheetNames: [], Sheets: {} }),
      book_append_sheet: () => {},
      aoa_to_sheet: () => ({})
    },
    writeFile: () => {}
  }
};

sandbox.window = sandbox;

vm.createContext(sandbox);

// Load js/logistik.js & js/recap.js
const logistikCode = fs.readFileSync(path.join(__dirname, '../js/logistik.js'), 'utf8');
const recapCode = fs.readFileSync(path.join(__dirname, '../js/recap.js'), 'utf8');

vm.runInContext(logistikCode + '; this.LogistikModule = LogistikModule; window.LogistikModule = LogistikModule;', sandbox);
vm.runInContext(recapCode + '; this.RecapModule = RecapModule; window.RecapModule = RecapModule;', sandbox);

const LM = sandbox.LogistikModule;
const RM = sandbox.RecapModule;

// --- TEST 1: LOG-B38 (RecapModule ALL View Parity with LogistikModule) ---
(async () => {
  console.log("--- TEST LOG-B38: RecapModule & LogistikModule Parity for ALL View ---");
  const allData = LM.getFullData();
  LM.syncMatrixFromTransactions(allData, null);
  const expectedViewAll = LM.getMonthDataForView(allData, "ALL");

  RM.selectedMonth = "ALL";
  RM.selectedYear = "2026";

  // Render dashboard in RM and check metric calculation
  const recapHtml = await RM.render();

  const expectedSec1Rp = expectedViewAll.sec1.reduce((a, b) => a + Number(b.stok_akhir_rp || 0), 0);
  const expectedSec4Rp = expectedViewAll.sec4.reduce((a, b) => a + Number(b.jumlah_rp || 0), 0);

  assert("RecapModule render() berhasil menghasilkan HTML untuk ALL view", typeof recapHtml === 'string' && recapHtml.length > 0);
  assert("RecapModule memuat angka aset pakan Seksi IV dari viewAll (" + expectedSec4Rp.toLocaleString("id-ID") + ")", recapHtml.includes(expectedSec4Rp.toLocaleString("id-ID")));
  assert("LogistikModule.getMonthDataForView tersedia dan callable", typeof LM.getMonthDataForView === 'function');

  // --- TEST 2: LOG-B39 (Commutative Feed Matching in isSec4FeedMatch) ---
  console.log("\n--- TEST LOG-B39: Commutative Feed Matching in isSec4FeedMatch ---");
  assert("isSec4FeedMatch('MIX FEED A20', 'MIX FEED A20 RATIO') = true", LM.isSec4FeedMatch('MIX FEED A20', 'MIX FEED A20 RATIO') === true);
  assert("isSec4FeedMatch('MIX FEED A20 RATIO', 'MIX FEED A20') = true (pemanggilan terbalik)", LM.isSec4FeedMatch('MIX FEED A20 RATIO', 'MIX FEED A20') === true);
  assert("isSec4FeedMatch('MIX FEED A18', 'MIX FEED A18 AGGT SUB') = true", LM.isSec4FeedMatch('MIX FEED A18', 'MIX FEED A18 AGGT SUB') === true);
  assert("isSec4FeedMatch('MIX FEED A18 AGGT SUB', 'MIX FEED A18') = true (pemanggilan terbalik)", LM.isSec4FeedMatch('MIX FEED A18 AGGT SUB', 'MIX FEED A18') === true);
  assert("isSec4FeedMatch('DCP', 'MAGNESIUM') = false", LM.isSec4FeedMatch('DCP', 'MAGNESIUM') === false);

  // --- TEST 3: LOG-B40 (Subsidized Feed Protection & Validation) ---
  console.log("\n--- TEST LOG-B40: Subsidized Feed Protection & Validation ---");

  // Test A: Switching category to NON_RASIO disables subsidized inputs and clears values
  const inputRatio = getOrCreateMockElement("tx_qty_mf_a20_ratio");
  const inputSub = getOrCreateMockElement("tx_qty_mf_a18_sub");
  const inputNon = getOrCreateMockElement("tx_qty_mf_a20_non");

  inputRatio.value = "100";
  inputSub.value = "50";
  LM.onKategoriPembeliChange("NON_RASIO");

  assert("Input pakan subsidi mf_a20_ratio terkunci (disabled) untuk NON_RASIO", inputRatio.disabled === true);
  assert("Input pakan subsidi mf_a18_sub terkunci (disabled) untuk NON_RASIO", inputSub.disabled === true);
  assert("Nilai input pakan subsidi otomatis dikosongkan saat ganti ke NON_RASIO", inputRatio.value === "" && inputSub.value === "");
  assert("Input pakan non-anggota mf_a20_non aktif (disabled = false)", inputNon.disabled === false);

  // Test B: Stepper helper does not mutate disabled fields
  LM.stepperChange("tx_qty_mf_a20_ratio", 1);
  assert("Stepper tidak dapat menambah nilai pada input yang ter-disabled", inputRatio.value === "");

  // Test C: Switching back to RASIO enables subsidized and disables non-member feed
  inputNon.value = "75";
  LM.onKategoriPembeliChange("RASIO");
  assert("Input pakan subsidi aktif kembali untuk anggota RASIO", inputRatio.disabled === false && inputSub.disabled === false);
  assert("Input pakan non-anggota mf_a20_non ter-disabled untuk anggota", inputNon.disabled === true && inputNon.value === "");

  // Test D: Form submission validation in saveMultiTx
  getOrCreateMockElement("tx_peternak_select").value = "BAPAK PEMBELI UMUM";
  getOrCreateMockElement("tx_kategori_pembeli").value = "NON_RASIO";
  getOrCreateMockElement("tx_kode_r_nr").value = "NR-1";
  getOrCreateMockElement("tx_nomor_anggota").value = "0";

  // Force a subsidized feed quantity to simulate an attempted bypass
  inputRatio.value = "50";
  lastAlert = null;
  const mockEvent = { preventDefault: () => {} };
  LM.handleSaveLogistikTx(mockEvent);

  assert("saveMultiTx memblokir pembeli NON_RASIO dari pembelian pakan subsidi", lastAlert && lastAlert.title === "Pakan Khusus Anggota");

  // Test E: Member blocked from accidentally buying non-member feed
  getOrCreateMockElement("tx_kategori_pembeli").value = "RASIO";
  inputRatio.value = "";
  inputNon.value = "50";
  lastAlert = null;
  LM.handleSaveLogistikTx(mockEvent);
  assert("saveMultiTx mengarahkan anggota agar menggunakan pakan jatah subsidi", lastAlert && lastAlert.title === "Pakan Non-Anggota");

  // --- TEST 4: LOG-B41 (Case-Insensitive & Whitespace Trimming in Apps Script Backend) ---
  console.log("\n--- TEST LOG-B41: Case-Insensitive & Trimmed Filter in Apps Script ---");
  const recapGsCode = fs.readFileSync(path.join(__dirname, '../apps-script/recap.gs'), 'utf8');
  const logGsCode = fs.readFileSync(path.join(__dirname, '../apps-script/logistik.gs'), 'utf8');

  assert("recap.gs menggunakan normalisasi trim() & toUpperCase() untuk kategori", recapGsCode.includes('(r.kategori || "").toString().trim().toUpperCase()'));
  assert("logistik.gs getLogistikPenjualan menggunakan normalisasi trim() & toUpperCase()", logGsCode.includes('(r.kategori || "").toString().trim().toUpperCase() === "PENJUALAN"'));
  assert("logistik.gs getLogistikPembelian menggunakan normalisasi trim() & toUpperCase()", logGsCode.includes('(r.kategori || "").toString().trim().toUpperCase() === "PEMBELIAN"'));

  // Simulate filtering with variations of "penjualan " and "PEMBELIAN\n"
  const mockRows = [
    { kategori: "PENJUALAN", jumlah_kg: "100", total_rupiah: "420000" },
    { kategori: "penjualan ", jumlah_kg: "50", total_rupiah: "210000" },
    { kategori: "Penjualan", jumlah_kg: "20", total_rupiah: "84000" },
    { kategori: " PEMBELIAN ", jumlah_kg: "200", total_rupiah: "780000" }
  ];

  let simSalKg = 0;
  let simPurKg = 0;
  mockRows.forEach(r => {
    const kat = (r.kategori || "").toString().trim().toUpperCase();
    if (kat === "PENJUALAN") simSalKg += Number(r.jumlah_kg);
    if (kat === "PEMBELIAN") simPurKg += Number(r.jumlah_kg);
  });

  assert("Simulasi filter menangkap semua variasi penulisan PENJUALAN (100+50+20 = 170 KG)", simSalKg === 170);
  assert("Simulasi filter menangkap semua variasi penulisan PEMBELIAN (200 KG)", simPurKg === 200);

  console.log("\n======================================================");
  console.log(`HASIL: ${passed} PASSED, ${total - passed} FAILED`);
  console.log("======================================================");

  if (total - passed > 0) process.exit(1);
})();
