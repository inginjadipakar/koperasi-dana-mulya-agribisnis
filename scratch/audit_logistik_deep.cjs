const fs = require('fs');
const path = require('path');

const logistikCode = fs.readFileSync(path.join(__dirname, '../js/logistik.js'), 'utf8');
const apiCode = fs.readFileSync(path.join(__dirname, '../js/api.js'), 'utf8');
const logistikGs = fs.readFileSync(path.join(__dirname, '../apps-script/logistik.gs'), 'utf8');
const recapGs = fs.readFileSync(path.join(__dirname, '../apps-script/recap.gs'), 'utf8');
const recapJs = fs.readFileSync(path.join(__dirname, '../js/recap.js'), 'utf8');

console.log('--- Deep Auditing Logistik Ecosystem ---');

// 1. Check all getElementById in js/logistik.js and see if they exist in HTML strings or DOM
const getByIdRegex = /document\.getElementById\(['"]([^'"]+)['"]\)/g;
let match;
const queriedIds = new Set();
while ((match = getByIdRegex.exec(logistikCode)) !== null) {
  queriedIds.add(match[1]);
}

const renderedIdRegex = /id=['"]([^'"]+)['"]/g;
const definedIds = new Set();
while ((match = renderedIdRegex.exec(logistikCode)) !== null) {
  definedIds.add(match[1]);
}

console.log('Total queried IDs:', queriedIds.size);
console.log('Total rendered IDs:', definedIds.size);

const missingIds = [];
for (const id of queriedIds) {
  // Check if id is dynamic (e.g. contains variable interpolation)
  if (!definedIds.has(id)) {
    missingIds.push(id);
  }
}

const codeGs = fs.readFileSync(path.join(__dirname, '../apps-script/Code.gs'), 'utf8');

console.log('\n--- Checking Apps Script & API Route Parity ---');
const actionsInApiJs = [];
const apiActionRegex = /case\s+["']([^"']+)["']\s*:/g;
let m;
while ((m = apiActionRegex.exec(apiCode)) !== null) {
  actionsInApiJs.push(m[1]);
}

const actionsInCodeGs = [];
while ((m = apiActionRegex.exec(codeGs)) !== null) {
  actionsInCodeGs.push(m[1]);
}

const logistikActionsInCodeGs = actionsInCodeGs.filter(a => a.toLowerCase().includes('logistik'));
const logistikActionsInApiJs = actionsInApiJs.filter(a => a.toLowerCase().includes('logistik'));

console.log('Logistik Actions in Code.gs:', logistikActionsInCodeGs);
console.log('Logistik Actions in api.js: ', logistikActionsInApiJs);

// Check if any action in Code.gs is missing in api.js or vice versa
logistikActionsInCodeGs.forEach(a => {
  if (!logistikActionsInApiJs.includes(a)) console.log(`  [!] In Code.gs but missing in api.js: ${a}`);
});
logistikActionsInApiJs.forEach(a => {
  if (!logistikActionsInCodeGs.includes(a)) console.log(`  [!] In api.js but missing in Code.gs: ${a}`);
});

