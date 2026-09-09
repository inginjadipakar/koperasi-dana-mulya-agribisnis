const fs = require('fs');
const src = fs.readFileSync('js/logistik.js', 'utf8');

// 1. Extract all document.getElementById calls
const getElRegex = /document\.getElementById\(['"]([^'"]+)['"]\)/g;
let m;
const getIds = new Set();
while ((m = getElRegex.exec(src)) !== null) {
  getIds.add(m[1]);
}

// 2. Extract all id="..." and id='...' in the template HTML
const idRegex = /\bid=['"]([^'"]+)['"]/g;
const declaredIds = new Set();
while ((m = idRegex.exec(src)) !== null) {
  declaredIds.add(m[1]);
}

console.log('Total document.getElementById references:', getIds.size);
console.log('Total declared IDs in HTML templates:', declaredIds.size);

const missing = [];
getIds.forEach(id => {
  if (!declaredIds.has(id)) {
    missing.push(id);
  }
});
console.log('Referenced IDs not directly found in HTML template literals:', missing);
