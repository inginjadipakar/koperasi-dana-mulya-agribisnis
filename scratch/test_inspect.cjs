const fs = require('fs');
const code = fs.readFileSync('js/logistik.js', 'utf8');
const vm = require('vm');
const sandbox = {
  window: {},
  document: { getElementById: () => null, createElement: () => ({}) },
  localStorage: { getItem: () => null, setItem: () => {} },
  AuthManager: { getSession: () => ({ role: 'LOGISTIK' }), requireAuth: () => true },
  console: console
};
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);
const mod = sandbox.LogistikModule;
const data = mod.defaultFullData;
for (const m of ['JAN', 'FEB', 'MAR', 'APRIL', 'MEI', 'JUNI']) {
  if (data[m]) {
    console.log(m + ' sec4:', data[m].sec4.map(x => x.nama));
    console.log(m + ' sec2:', data[m].sec2.map(x => x.nama));
  }
}
