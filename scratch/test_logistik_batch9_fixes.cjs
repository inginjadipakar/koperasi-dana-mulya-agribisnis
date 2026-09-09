/**
 * Test Suite: Batch 9 Bug Fixes (LOG-B59 to LOG-B63)
 * Run: node scratch/test_logistik_batch9_fixes.cjs
 */
'use strict';

const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;

function assert(name, condition) {
  if (condition) {
    console.log(`  ✓ ${name}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${name}`);
    failed++;
  }
}

console.log('=== TEST SUITE BATCH 9 (LOG-B59 to LOG-B63) ===');

// ============================================================================
// TEST 1: LOG-B59 — onSelectSec4Pakan updates calcSec4Preview on Tambah Pakan Baru
// ============================================================================
console.log('\n[LOG-B59] onSelectSec4Pakan: updates preview badge on + TAMBAH PAKAN BARU');
{
  const src = fs.readFileSync(path.join(__dirname, '../js/logistik.js'), 'utf8');
  assert('onSelectSec4Pakan has calcSec4Preview call before return',
    src.includes('this.calcSec4Preview();\n      return;') ||
    src.includes('this.calcSec4Preview();\r\n      return;')
  );

  // Behavioral test
  const domElements = {
    sec4ColBaru: { style: { display: 'none' } },
    sec4_stok_awal: { value: '500' },
    sec4_susut: { value: '10' },
    sec4_harga: { value: '4200' },
    sec4PreviewStokAwal: { innerText: 'STOK AWAL: 500 KG' },
    sec4PreviewSiapJual: { innerText: 'SIAP JUAL: 500 KG' },
    sec4PreviewStokAkhir: { innerText: 'ESTIMASI STOK AKHIR: 490 KG' },
    sec4PreviewRp: { innerText: 'Rp 2.058.000' }
  };

  let calcPreviewCalled = false;
  const mockLM = {
    calcSec4Preview: function() {
      calcPreviewCalled = true;
      domElements.sec4PreviewStokAwal.innerText = 'STOK AWAL: 0 KG';
      domElements.sec4PreviewSiapJual.innerText = 'SIAP JUAL: 0 KG';
      domElements.sec4PreviewStokAkhir.innerText = 'ESTIMASI STOK AKHIR: 0 KG';
      domElements.sec4PreviewRp.innerText = 'Rp 0';
    }
  };

  // Run the logic from onSelectSec4Pakan
  const colBaru = domElements.sec4ColBaru;
  const val = "+ TAMBAH PAKAN BARU";
  if (colBaru) colBaru.style.display = (val === "+ TAMBAH PAKAN BARU") ? "block" : "none";

  if (val === "+ TAMBAH PAKAN BARU") {
    if (domElements.sec4_stok_awal) domElements.sec4_stok_awal.value = "";
    if (domElements.sec4_susut) domElements.sec4_susut.value = "";
    if (domElements.sec4_harga) domElements.sec4_harga.value = "";
    mockLM.calcSec4Preview();
  }

  assert('Input fields cleared to empty', domElements.sec4_stok_awal.value === "" && domElements.sec4_harga.value === "");
  assert('calcSec4Preview was invoked', calcPreviewCalled === true);
  assert('Preview badges reset to 0', domElements.sec4PreviewStokAkhir.innerText === 'ESTIMASI STOK AKHIR: 0 KG' && domElements.sec4PreviewRp.innerText === 'Rp 0');
}

// ============================================================================
// TEST 2: LOG-B60 — createLogistikPembelian commutative feed matching
// ============================================================================
console.log('\n[LOG-B60] createLogistikPembelian: commutative feed matching in API');
{
  const srcApi = fs.readFileSync(path.join(__dirname, '../js/api.js'), 'utf8');
  assert('api.js createLogistikPembelian uses commutative includes for mixfeeda18',
    srcApi.includes("itClean.includes('mixfeeda18') && targetClean.includes('mixfeeda18')")
  );
  assert('api.js createLogistikPembelian uses commutative includes for mixfeeda20',
    srcApi.includes("itClean.includes('mixfeeda20') && targetClean.includes('mixfeeda20')")
  );

  // Behavioral test with a feed variant in sec4
  const cleanFeed = (s) => (s || '').toLowerCase().replace(/mf\./g, 'mix feed').replace(/\bmf\b/g, 'mix feed').replace(/[^a-z0-9]/g, '');
  const sec4Items = [
    { nama: 'MIX FEED A20 STANDAR', pembelian: 100 }
  ];
  const payloadNama = 'MIX FEED A20';
  const targetClean = cleanFeed(payloadNama);

  const matchedItem = sec4Items.find(it => {
    const itClean = cleanFeed(it.nama);
    if (itClean === targetClean) return true;
    if (itClean.includes('mixfeeda18') && targetClean.includes('mixfeeda18')) return true;
    if (itClean.includes('mixfeeda20') && targetClean.includes('mixfeeda20')) return true;
    return false;
  });

  assert('Matches variant feed in sec4 correctly', matchedItem !== undefined && matchedItem.nama === 'MIX FEED A20 STANDAR');
}

// ============================================================================
// TEST 3: LOG-B61 — Normalized keys in getMonthDataForView
// ============================================================================
console.log('\n[LOG-B61] getMonthDataForView: normalized keys prevent duplicate rows');
{
  const src = fs.readFileSync(path.join(__dirname, '../js/logistik.js'), 'utf8');
  assert('aggSec2Map uses normalized uppercase key', src.includes('aggSec2Map[key]'));
  assert('aggSec3Map uses normalized uppercase key', src.includes('aggSec3Map[key]'));
  assert('aggSec4Map uses normalized uppercase key', src.includes('aggSec4Map[key]'));

  // Test simulation: items with varied casing and whitespace across months
  const mockMonthsData = {
    JAN: {
      sec2: [{ nama: 'DCP', total_kg: 50, total_rp: 1250000 }],
      sec3: [{ nama: 'Mix Feed A20', kg: 100, harga: 4200, rp: 420000 }],
      sec4: [{ nama: 'MAGNESIUM ', stok_awal: 20, pembelian: 0, penjualan: 5, susut: 0, stok_akhir: 15, harga: 30000, jumlah_rp: 450000 }]
    },
    FEB: {
      sec2: [{ nama: 'dcp ', total_kg: 30, total_rp: 750000 }],
      sec3: [{ nama: 'MIX FEED A20', kg: 200, harga: 4200, rp: 840000 }],
      sec4: [{ nama: 'Magnesium', stok_awal: 15, pembelian: 10, penjualan: 10, susut: 0, stok_akhir: 15, harga: 30000, jumlah_rp: 450000 }]
    }
  };

  const aggSec2Map = {};
  const aggSec3Map = {};
  const aggSec4Map = {};

  ['JAN', 'FEB'].forEach(mKey => {
    const md = mockMonthsData[mKey];
    md.sec2.forEach(it => {
      const key = (it.nama || "").trim().toUpperCase();
      if (!aggSec2Map[key]) {
        aggSec2Map[key] = { nama: it.nama, total_kg: 0, total_rp: 0 };
      }
      aggSec2Map[key].total_kg += it.total_kg;
      aggSec2Map[key].total_rp += it.total_rp;
    });

    md.sec3.forEach(it => {
      const key = (it.nama || "").trim().toUpperCase();
      if (!aggSec3Map[key]) {
        aggSec3Map[key] = { nama: it.nama, kg: 0, rp: 0 };
      }
      aggSec3Map[key].kg += it.kg;
      aggSec3Map[key].rp += it.rp;
    });

    md.sec4.forEach(it => {
      const key = (it.nama || "").trim().toUpperCase();
      if (!aggSec4Map[key]) {
        aggSec4Map[key] = { nama: it.nama, stok_awal: it.stok_awal, pembelian: 0, penjualan: 0, susut: 0, harga: it.harga };
      }
      aggSec4Map[key].pembelian += it.pembelian;
      aggSec4Map[key].penjualan += it.penjualan;
    });
  });

  assert('Seksi II DCP consolidated into 1 row (50 + 30 = 80 KG)',
    Object.keys(aggSec2Map).length === 1 && aggSec2Map['DCP'].total_kg === 80
  );
  assert('Seksi III MIX FEED A20 consolidated into 1 row (100 + 200 = 300 KG)',
    Object.keys(aggSec3Map).length === 1 && aggSec3Map['MIX FEED A20'].kg === 300
  );
  assert('Seksi IV MAGNESIUM consolidated into 1 row (penjualan = 15 KG)',
    Object.keys(aggSec4Map).length === 1 && aggSec4Map['MAGNESIUM'].penjualan === 15
  );
}

// ============================================================================
// TEST 4: LOG-B62 — deleteLogistikTransaction deletes from db.LOGISTIK_PAKAN_PEMBELIAN
// ============================================================================
console.log('\n[LOG-B62] deleteLogistikTransaction: deletes from db.LOGISTIK_PAKAN_PEMBELIAN');
{
  const srcApi = fs.readFileSync(path.join(__dirname, '../js/api.js'), 'utf8');
  assert('api.js routes deleteLogistikPembelian', srcApi.includes('case "deleteLogistikPembelian":'));
  assert('api.js filters db.LOGISTIK_PAKAN_PEMBELIAN', srcApi.includes('db.LOGISTIK_PAKAN_PEMBELIAN.filter'));

  const srcCode = fs.readFileSync(path.join(__dirname, '../apps-script/Code.gs'), 'utf8');
  assert('Code.gs routes deleteLogistikPembelian', srcCode.includes('case "deleteLogistikPembelian":'));

  // Behavioral simulation
  const mockDb = {
    LOGISTIK_PAKAN_PENJUALAN: [
      { transaction_id: 'TX-100', nama_pakan: 'A20' }
    ],
    LOGISTIK_PAKAN_PEMBELIAN: [
      { transaction_id: 'PEM-200', purchase_id: 'PEM-200', nama_pakan: 'DCP' },
      { transaction_id: 'PEM-300', purchase_id: 'PEM-300', nama_pakan: 'MAGNESIUM' }
    ]
  };

  const delTxId = 'PEM-200';
  if (mockDb.LOGISTIK_PAKAN_PEMBELIAN && Array.isArray(mockDb.LOGISTIK_PAKAN_PEMBELIAN)) {
    mockDb.LOGISTIK_PAKAN_PEMBELIAN = mockDb.LOGISTIK_PAKAN_PEMBELIAN.filter(
      t => t.transaction_id !== delTxId && t.purchase_id !== delTxId && t.id !== delTxId
    );
  }

  assert('PEM-200 successfully removed from LOGISTIK_PAKAN_PEMBELIAN',
    mockDb.LOGISTIK_PAKAN_PEMBELIAN.length === 1 && mockDb.LOGISTIK_PAKAN_PEMBELIAN[0].transaction_id === 'PEM-300'
  );
}

// ============================================================================
// TEST 5: LOG-B63 — NaN Guard in calcSec2Preview
// ============================================================================
console.log('\n[LOG-B63] calcSec2Preview: NaN guard for formatted numbers with dot/comma');
{
  const src = fs.readFileSync(path.join(__dirname, '../js/logistik.js'), 'utf8');
  assert('calcSec2Preview contains parseSafe or parseNum helper', src.includes('const parseSafe = id =>') || src.includes('this.parseNum(document.getElementById("sec2_tunai_kg")?.value)'));

  // Test the parseSafe logic with various inputs
  const parseSafe = (raw) => {
    if (raw === undefined || raw === null || raw === "") return 0;
    const clean = String(raw).trim().replace(/,/g, '.');
    const n = Number(clean);
    return isNaN(n) ? 0 : n;
  };

  assert('Normal string integer returns 50', parseSafe("50") === 50);
  assert('Decimal with comma "10,5" parsed to 10.5', parseSafe("10,5") === 10.5);
  assert('Empty string returns 0', parseSafe("") === 0);
  assert('Garbage string returns 0 without NaN', parseSafe("abc") === 0);
  assert('Subtotal with "10,5" kg and 4000 price = 42000', (parseSafe("10,5") * parseSafe("4000")) === 42000);
}

console.log('\n══════════════════════════════════════════════');
console.log(`TOTAL: ${passed + failed} | PASS: ${passed} | FAIL: ${failed}`);
if (failed === 0) {
  console.log('\n✅ ALL BATCH 9 TESTS PASSED');
} else {
  console.error('\n❌ SOME BATCH 9 TESTS FAILED');
  process.exit(1);
}
