const fs = require('fs');
const content = fs.readFileSync('js/logistik.js', 'utf8');
const lines = content.split('\n');
console.log('Total lines:', lines.length);

const keys = [];
lines.forEach((line, idx) => {
  const match = line.match(/^(\s*)([a-zA-Z0-9_$]+)\s*:\s*(function|async\s+function|\{)/);
  if (match && match[1].length <= 2) {
    keys.push({ line: idx + 1, name: match[2], type: match[3] });
  }
});
console.log('Top-level methods / properties in LogistikModule:');
keys.forEach(k => console.log('Line ' + k.line + ': ' + k.name + ' (' + k.type + ')'));
