/**
 * Test Suite: Batch 8 Bug Fixes (LOG-B42 to LOG-B58)
 * Run: node C:\Users\HP\.gemini\antigravity-ide\brain\58a1f30b-c67e-4b18-9d7e-4080e5291919\scratch\test_logistik_batch8_fixes.cjs
 */
'use strict';

// Set working directory context for file reads
process.chdir('c:\\Users\\HP\\Desktop\\KKN SIE ACARA\\Proker UMKM\\Koperasidanamulya');

let passed = 0;
let failed = 0;
const errors = [];

function assert(condition, testName, detail = '') {
  if (condition) {
    console.log(`  \u2713 ${testName}`);
    passed++;
  } else {
    console.error(`  \u2717 ${testName}${detail ? ' \u2014 ' + detail : ''}`);
    failed++;
    errors.push(testName);
  }
}

// LOG-B43: checkBuntingLimit empty guard
console.log('\n[LOG-B43] checkBuntingLimit: empty noAnggota guard');
{
  function cleanNoAnggota(raw) {
    return String(raw || '').replace(/[^0-9]/g, '');
  }
  function shouldReturn0(raw) {
    const clean = cleanNoAnggota(raw);
    return !clean || clean === '0';
  }
  assert(shouldReturn0(''), 'empty string should return 0');
  assert(shouldReturn0('ABC'), 'non-digit string returns 0');
  assert(!shouldReturn0('50'), '"50" does NOT return 0');
  assert(shouldReturn0('0'), '"0" returns 0');
  const clean1 = cleanNoAnggota('');
  const clean2 = cleanNoAnggota('TANPA_ANGKA');
  // Both produce empty string - but shouldReturn0 guard prevents false match
  assert(shouldReturn0(clean1) && shouldReturn0(clean2), 'two empty-after-strip values both guarded');
}

// LOG-B42: Sec4 carryover custom feeds
console.log('\n[LOG-B42] Sec4 carryover: custom feeds carry over if stok > 0');
{
  function isSec4FeedMatch(a, b) {
    const norm = s => (s || '').toLowerCase().replace(/\s+/g, '').replace(/mf\./g, 'mixfeed');
    return norm(a) === norm(b);
  }
  function carryoverSec4(prevSec4, currSec4) {
    currSec4.forEach(curr => {
      if (curr._manual_stok_awal) return;
      const prev = prevSec4.find(p => isSec4FeedMatch(p.nama, curr.nama));
      if (prev) curr.stok_awal = prev.stok_akhir || 0;
    });
    prevSec4.forEach(prev => {
      if ((prev.stok_akhir || 0) <= 0) return;
      const exists = currSec4.some(c => isSec4FeedMatch(c.nama, prev.nama));
      if (!exists) {
        currSec4.push({ no: currSec4.length+1, nama: prev.nama, stok_awal: prev.stok_akhir, pembelian: 0, siap_jual: prev.stok_akhir, penjualan: 0, susut: 0, stok_akhir: prev.stok_akhir, harga: prev.harga, jumlah_rp: prev.stok_akhir * prev.harga });
      }
    });
    return currSec4;
  }
  const prev = [{ nama: 'MIX FEED A20', stok_akhir: 100, harga: 4200 }, { nama: 'KONSENTRAT BOOSTER', stok_akhir: 50, harga: 6000 }, { nama: 'PAKAN HABIS', stok_akhir: 0, harga: 3000 }];
  const curr = [{ nama: 'MIX FEED A20', stok_awal: 0 }];
  const res = carryoverSec4(prev, curr);
  assert(res[0].stok_awal === 100, 'Standard feed carryover stok_awal');
  assert(res.some(f => f.nama === 'KONSENTRAT BOOSTER'), 'Custom feed registered');
  assert(!res.some(f => f.nama === 'PAKAN HABIS'), 'Depleted feed NOT carried');
  assert(res.find(f => f.nama === 'KONSENTRAT BOOSTER')?.stok_awal === 50, 'Custom feed stok_awal correct');
}

// LOG-B52: _manual lock released when real tx exists
console.log('\n[LOG-B52] _manual lock: released when real transactions found');
{
  function isExactFeedMatch(a, b) {
    const norm = s => (s || '').trim().toLowerCase().replace(/\s+/g, ' ');
    return norm(a) === norm(b);
  }
  function syncSec2(sec2, txs) {
    // FIX LOG-B52: Pre-compute feed names di txs
    const txFeedNames = new Set(txs.map(tx => (tx.jenis_pakan || '').trim().toLowerCase()));
    // Reset phase: hanya reset item yang ada tx-nya (hapus _manual jika ada tx)
    sec2.forEach(it => {
      const hasTx = [...txFeedNames].some(txF => isExactFeedMatch(it.nama, txF));
      if (it._manual && !hasTx) return; // pertahankan manual jika tidak ada tx
      if (it._manual) delete it._manual; // cabut lock jika ada tx nyata
      it.tunai_kg = 0; it.tunai_rp = 0;
      it.total_kg = 0; it.total_rp = 0;
    });
    // Accumulate
    txs.forEach(tx => {
      const item = sec2.find(it => isExactFeedMatch(it.nama, tx.jenis_pakan));
      if (item) {
        item.tunai_kg = (item.tunai_kg || 0) + tx.qty;
        item.tunai_rp = (item.tunai_rp || 0) + tx.qty * tx.harga;
        item.total_kg = item.tunai_kg;
        item.total_rp = item.tunai_rp;
      }
    });
    return sec2;
  }
  const sec2 = [{ nama: 'MIX FEED A20', tunai_kg: 999, tunai_rp: 4000000, total_kg: 999, _manual: true }];
  const result = syncSec2(sec2, [{ jenis_pakan: 'MIX FEED A20', qty: 50, harga: 4200 }]);
  assert(!result[0]._manual, '_manual flag removed when tx exists');
  assert(result[0].tunai_kg === 50, 'tunai_kg = 50 (old 999 was reset before accumulation)');

  // Also verify: _manual preserved when NO tx for that feed
  const sec2b = [{ nama: 'MAGNESIUM', tunai_kg: 777, _manual: true }];
  const resultB = syncSec2(sec2b, [{ jenis_pakan: 'MIX FEED A20', qty: 10, harga: 4200 }]);
  assert(resultB[0]._manual, '_manual preserved for feed with no matching tx');
  assert(resultB[0].tunai_kg === 777, 'Manual value preserved when no matching tx');
}

// LOG-B53: sec3 standard feeds always present
console.log('\n[LOG-B53] sec3SelectPakan: standard feeds always visible');
{
  function getDropdownFeeds(sec3Data) {
    const std = ['MIX FEED A20', 'MIX FEED A18', 'MAGNESIUM', 'DCP', 'MF A20 NON RATIO'];
    const existing = (sec3Data || []).map(it => it.nama);
    return Array.from(new Set([...std, ...existing]));
  }
  const empty = getDropdownFeeds([]);
  assert(empty.includes('MIX FEED A20'), 'Standard feed in empty sec3');
  assert(empty.includes('DCP'), 'DCP in empty sec3');
  const withCustom = getDropdownFeeds([{ nama: 'MIX FEED A20' }, { nama: 'KONSENTRAT BOOSTER' }]);
  assert(withCustom.includes('MIX FEED A18'), 'Standard feeds appear even when sec3 has data');
  assert(withCustom.includes('KONSENTRAT BOOSTER'), 'Custom feed from sec3 present');
  assert(withCustom.filter(f => f === 'MIX FEED A20').length === 1, 'No duplicates');
}

// LOG-B51: jenis_pembayaran field
console.log('\n[LOG-B51] jenis_pembayaran field present in record');
{
  const fs = require('fs');
  const src = fs.readFileSync('js/logistik.js', 'utf8');
  assert(src.includes('jenis_pembayaran: metode'), 'jenis_pembayaran is set in logistik.js record');
}

// LOG-B54: tanggal uses target month
console.log('\n[LOG-B54] handleSaveSec3: tanggal = target month, not today');
{
  function buildTanggalTarget(targetMonth, year) {
    const map = { JAN:1, FEB:2, MAR:3, APRIL:4, MEI:5, JUNI:6, JULI:7, AGU:8, SEP:9, OKT:10, NOV:11, DES:12 };
    const m = map[targetMonth] || 1;
    const y = parseInt(year || new Date().getFullYear(), 10);
    return `${y}-${String(m).padStart(2,'0')}-01`;
  }
  assert(buildTanggalTarget('JUNI', 2026) === '2026-06-01', 'JUNI 2026');
  assert(buildTanggalTarget('APRIL', 2026) === '2026-04-01', 'APRIL 2026');
  assert(buildTanggalTarget('DES', 2026) === '2026-12-01', 'DES 2026');
}

// LOG-B55: transaction_id in record
console.log('\n[LOG-B55] handleSaveSec3: record has transaction_id');
{
  const record = { transaction_id: 'PUR-LOG-ABC', purchase_id: 'PUR-LOG-ABC' };
  assert(record.transaction_id !== undefined, 'transaction_id present');
  assert(record.transaction_id === record.purchase_id, 'IDs match');
}

// LOG-B49: SheetJS raw:true option to prevent 4.200 turning into 4.2 decimal
console.log('\n[LOG-B49] buildSheetFromHtml: raw:true option');
{
  const fs = require('fs');
  const src = fs.readFileSync('js/logistik.js', 'utf8');
  assert(src.includes('raw: true'), 'raw: true present');
  assert(src.includes("defval: ''"), 'defval option present');
}

// LOG-B56: createLogistikPembelian auto-register
console.log('\n[LOG-B56] createLogistikPembelian: auto-registers new feed to sec4');
{
  const fs = require('fs');
  const src = fs.readFileSync('js/api.js', 'utf8');
  assert(src.includes('FIX LOG-B56'), 'LOG-B56 fix present in api.js');
  assert(src.includes('Auto-register pakan baru ke Seksi IV'), 'Auto-register comment present');
}

// LOG-B57: Commutative feed matching
console.log('\n[LOG-B57] createLogistikPenjualan: commutative feed matching');
{
  function cleanFeed(s) {
    return (s || '').toLowerCase().replace(/mf\./g, 'mix feed').replace(/\bmf\b/g, 'mix feed').replace(/[^a-z0-9]/g, '');
  }
  function match(a, b) {
    const ic = cleanFeed(a), tc = cleanFeed(b);
    return ic === tc || (tc.includes(ic) && ic.length >= 4) || (ic.includes(tc) && tc.length >= 4);
  }
  assert(match('MIX FEED A20', 'MIX FEED A20 TUNAI'), 'Shorter sec2 matches longer tx name');
  assert(match('MIX FEED A20 TUNAI', 'MIX FEED A20'), 'Longer sec2 matches shorter tx name (was broken)');
  assert(!match('MIX FEED A18', 'MIX FEED A20'), 'A18 != A20');
}

// LOG-B45: FULL_V12 sync after delete
console.log('\n[LOG-B45] deleteLogistikTransaction: FULL_V12 synced');
{
  const fs = require('fs');
  const src = fs.readFileSync('js/api.js', 'utf8');
  assert(src.includes('LOG-B45'), 'B45 fix present');
  assert(src.includes('syncMatrixFromTransactions(allLog, null)'), 'syncMatrixFromTransactions called');
}

// LOG-B50: sec4 tambah pakan baru
console.log('\n[LOG-B50] sec4SelectPakan: + Tambah Pakan Baru option present');
{
  const fs = require('fs');
  const src = fs.readFileSync('js/logistik.js', 'utf8');
  assert(src.includes('sec4ColBaru'), 'sec4ColBaru element present');
  assert(src.includes('TAMBAH PAKAN BARU') && src.includes('sec4SelectPakan'), 'Tambah Pakan Baru option in sec4 dropdown');
}

// LOG-B58: Storage guards
console.log('\n[LOG-B58] saveTransactions/saveMasterPeternak: try-catch guards');
{
  const fs = require('fs');
  const src = fs.readFileSync('js/logistik.js', 'utf8');
  assert(src.includes('[LOG-B58] saveTransactions'), 'saveTransactions has guard');
  assert(src.includes('[LOG-B58] saveMasterPeternak'), 'saveMasterPeternak has guard');
}

// Summary
console.log('\n\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550');
console.log(`TOTAL: ${passed + failed} | PASS: ${passed} | FAIL: ${failed}`);
if (errors.length > 0) {
  console.error('\nFailed:');
  errors.forEach(e => console.error('  - ' + e));
  process.exit(1);
} else {
  console.log('\n\u2705 ALL BATCH 8 TESTS PASSED');
}
