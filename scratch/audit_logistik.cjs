// scratch/audit_logistik.cjs
const fs = require('fs');

const src = fs.readFileSync('js/logistik.js', 'utf8');
const indexHtml = fs.readFileSync('index.html', 'utf8');

// 1. Check document.getElementById references in logistik.js
const regex = /document\.getElementById\(['"]([^'"]+)['"]\)/g;
const ids = new Set();
let match;
while ((match = regex.exec(src)) !== null) {
  ids.add(match[1]);
}
console.log('Total unique getElementById in logistik.js:', ids.size);

const missing = [];
ids.forEach(id => {
  const inSrc = src.includes(`id="${id}"`) || src.includes(`id='${id}'`);
  const inIndex = indexHtml.includes(`id="${id}"`) || indexHtml.includes(`id='${id}'`);
  if (!inSrc && !inIndex) {
    missing.push(id);
  }
});
console.log('Missing DOM IDs queried in logistik.js:', missing);
