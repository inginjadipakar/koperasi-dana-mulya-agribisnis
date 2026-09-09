const fs = require('fs');
const vm = require('vm');

const localStore = {};
global.window = global;
global.localStorage = { getItem: (k) => localStore[k] || null, setItem: (k, v) => { localStore[k] = String(v); } };
global.sessionStorage = { getItem: () => null, setItem: () => {} };
global.document = { createElement: () => ({ querySelector: () => ({}) }) };
global.XLSX = { utils: { table_to_sheet: () => ({ '!ref': 'A1:A1' }), decode_range: () => ({ s: { c: 0, r: 0 }, e: { c: 0, r: 0 } }) } };

vm.runInThisContext(fs.readFileSync('js/logistik.js', 'utf8'));

const allData = LogistikModule.getFullData();
const md = LogistikModule.getMonthDataForView(allData);

// 1. Sec1
const h1 = LogistikModule.buildHtmlSec1(md);
// 2. Sec2
const h2 = LogistikModule.buildHtmlSec2(md);
// 3. Sec3
const h3 = LogistikModule.buildHtmlSec3(md);
// 4. Sec4
const h4 = LogistikModule.buildHtmlSec4(md);
// 5. Penjualan Harian
const h5 = LogistikModule.buildHtmlPenjualanHarian([]);

function getColCount(html) {
  // Extract tbody first row td count
  const tdMatch = html.match(/<tbody>[\s\S]*?<tr>([\s\S]*?)<\/tr>/);
  if (tdMatch) {
    return (tdMatch[1].match(/<td/g) || []).length;
  }
  // If no tbody row (empty table), check second thead tr
  const theadRows = html.match(/<thead>([\s\S]*?)<\/thead>/);
  if (theadRows) {
    const trs = theadRows[1].match(/<tr>([\s\S]*?)<\/tr>/g) || [];
    const lastTr = trs[trs.length - 1];
    return (lastTr.match(/<th/g) || []).length;
  }
  return 0;
}

console.log('Sec1 table columns:', getColCount(h1), '| colWidths defined: [6, 28, 10, 14, 16, 10, 14, 16, 10, 14, 16, 12, 16] (length: 13)');
console.log('Sec2 table columns:', getColCount(h2), '| colWidths defined: [6, 26, 10, 12, 15, 10, 12, 15, 10, 12, 15, 10, 12, 15, 12, 16] (length: 16)');
console.log('Sec3 table columns:', getColCount(h3), '| colWidths defined: [6, 30, 16, 16, 20] (length: 5)');
console.log('Sec4 table columns:', getColCount(h4), '| colWidths defined: [6, 28, 16, 16, 16, 16, 14, 16, 14, 20] (length: 10)');
console.log('Penjualan Harian table columns:', getColCount(h5), '| colWidths exportExcelPenjualanPakanHarian: 13 | colWidths exportExcelRekapBulananCombined: 12');
