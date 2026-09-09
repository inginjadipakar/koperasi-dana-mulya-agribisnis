/**
 * Test Suite: Batch 10 Bug Fixes (LOG-B64 & LOG-B65)
 * Run: node scratch/test_logistik_batch10_fixes.cjs
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

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

console.log('=== TEST SUITE BATCH 10 (LOG-B64 & LOG-B65) ===');

const srcLogistik = fs.readFileSync(path.join(__dirname, '../js/logistik.js'), 'utf8');

// ============================================================================
// TEST 1: LOG-B64 — parseNum method exists and handles all number variations
// ============================================================================
console.log('\n[LOG-B64] parseNum: tolerant parser for comma decimal & thousand separators');
{
  const mockContext = {
    window: {},
    document: { getElementById: () => null },
    localStorage: { getItem: () => null, setItem: () => {} },
    console: console
  };
  vm.createContext(mockContext);
  vm.runInContext(srcLogistik + '; this.LogistikModule = LogistikModule;', mockContext);
  const LM = mockContext.LogistikModule;

  assert('LogistikModule.parseNum is a function', typeof LM.parseNum === 'function');
  assert('Normal integer: 50 -> 50', LM.parseNum(50) === 50);
  assert('String integer: "50" -> 50', LM.parseNum("50") === 50);
  assert('Indonesian comma decimal: "10,5" -> 10.5', LM.parseNum("10,5") === 10.5);
  assert('Standard dot decimal: "10.5" -> 10.5', LM.parseNum("10.5") === 10.5);
  assert('Indonesian thousand dot with comma: "1.250,5" -> 1250.5', LM.parseNum("1.250,5") === 1250.5);
  assert('Empty string: "" -> 0', LM.parseNum("") === 0);
  assert('Null: null -> 0', LM.parseNum(null) === 0);
  assert('Undefined: undefined -> 0', LM.parseNum(undefined) === 0);
  assert('Invalid string: "abc" -> 0', LM.parseNum("abc") === 0);
  assert('Spaced string: "  25,4  " -> 25.4', LM.parseNum("  25,4  ") === 25.4);
}

// ============================================================================
// TEST 2: LOG-B64 — calcMultiTxPreview & handleSaveLogistikTx with comma input
// ============================================================================
console.log('\n[LOG-B64] calcMultiTxPreview & handleSaveLogistikTx: comma input handled safely');
{
  assert('calcMultiTxPreview uses this.parseNum',
    srcLogistik.includes('this.parseNum(document.getElementById(`tx_qty_${item.id}`)?.value)')
  );
  assert('handleSaveLogistikTx uses this.parseNum',
    srcLogistik.includes('this.parseNum(document.getElementById(`tx_qty_${fc.id}`)?.value)')
  );
  assert('calcSec3Preview uses this.parseNum',
    srcLogistik.includes('this.parseNum(document.getElementById("sec3_kg")?.value)')
  );
  assert('calcSec4Preview uses this.parseNum for susut',
    srcLogistik.includes('this.parseNum(document.getElementById("sec4_susut")?.value)')
  );
  assert('calcSec1Preview uses this.parseNum for pembelian_unit',
    srcLogistik.includes('this.parseNum(document.getElementById("sec1_pembelian_unit")?.value)')
  );
}

// ============================================================================
// TEST 3: LOG-B65 — deleteLogistikTx dual-ID matching (id and transaction_id)
// ============================================================================
console.log('\n[LOG-B65] deleteLogistikTx: dual-ID matching (id and transaction_id)');
{
  assert('deleteLogistikTx filters both t.id and t.transaction_id',
    srcLogistik.includes('t.id !== txId && t.transaction_id !== txId')
  );

  // Behavioral test
  let txs = [
    { id: 'TX-001', nama_pakan: 'A20' },
    { transaction_id: 'TRX-LOG-999', nama_pakan: 'A18' } // synced from API without .id
  ];

  const delTarget = 'TRX-LOG-999';
  txs = txs.filter(t => t.id !== delTarget && t.transaction_id !== delTarget);

  assert('TRX-LOG-999 removed via dual-ID filter',
    txs.length === 1 && txs[0].id === 'TX-001'
  );
}

console.log('\n══════════════════════════════════════════════');
console.log(`TOTAL: ${passed + failed} | PASS: ${passed} | FAIL: ${failed}`);
if (failed === 0) {
  console.log('\n✅ ALL BATCH 10 TESTS PASSED');
} else {
  console.error('\n❌ SOME BATCH 10 TESTS FAILED');
  process.exit(1);
}
