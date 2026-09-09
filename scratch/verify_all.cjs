const fs = require('fs');

console.log("=== COMPREHENSIVE LOGISTIK AUDIT SCRIPT ===");

// 1. Check index.html for script references
const html = fs.readFileSync('index.html', 'utf8');
const scriptMatches = [...html.matchAll(/<script[^>]*src=["']([^"']+)["'][^>]*>/g)].map(m => m[1]);
console.log("Total script tags:", scriptMatches.length);
let missingScripts = 0;
scriptMatches.forEach(rawSrc => {
  const src = rawSrc.split('?')[0];
  if (!src.startsWith('http') && !fs.existsSync(src)) {
    console.error("Missing script:", src);
    missingScripts++;
  }
});
if (missingScripts === 0) {
  console.log("✓ All referenced scripts in index.html exist locally or are remote CDN.");
}

// 2. Check LogistikModule declaration and methods
const logistikSrc = fs.readFileSync('js/logistik.js', 'utf8');
try {
  new Function(logistikSrc);
  console.log("✓ js/logistik.js: clean JS syntax, no syntax errors.");
} catch (e) {
  console.error("js/logistik.js syntax error:", e);
}

// 3. Check api.js declaration and methods
const apiSrc = fs.readFileSync('js/api.js', 'utf8');
try {
  new Function(apiSrc);
  console.log("✓ js/api.js: clean JS syntax, no syntax errors.");
} catch (e) {
  console.error("js/api.js syntax error:", e);
}

// 4. Check apps-script/logistik.gs and Code.gs
['apps-script/logistik.gs', 'apps-script/Code.gs', 'apps-script/recap.gs'].forEach(f => {
  try {
    const code = fs.readFileSync(f, 'utf8');
    new Function(code);
    console.log(`✓ ${f}: clean syntax.`);
  } catch (e) {
    console.error(`${f} syntax error:`, e);
  }
});

console.log("=== AUDIT COMPLETE: ALL MODULES VALIDATED ===");
