const fs = require('fs');
const src = fs.readFileSync('js/logistik.js', 'utf8');

// Find all LogistikModule.<method> calls in the HTML
const handlerRegex = /LogistikModule\.([a-zA-Z0-9_]+)\s*\(/g;
let m;
const calledMethods = new Set();
while ((m = handlerRegex.exec(src)) !== null) {
  calledMethods.add(m[1]);
}

// Check which ones are defined on LogistikModule
const defRegex = /^\s*([a-zA-Z0-9_]+)\s*:\s*(async\s+)?function/gm;
const definedMethods = new Set();
while ((m = defRegex.exec(src)) !== null) {
  definedMethods.add(m[1]);
}

console.log('Called in HTML handlers:', Array.from(calledMethods));
const missing = [];
calledMethods.forEach(fn => {
  if (!definedMethods.has(fn)) missing.push(fn);
});
console.log('Missing methods on LogistikModule:', missing);
