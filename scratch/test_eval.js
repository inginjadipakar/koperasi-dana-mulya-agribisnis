import fs from 'fs';

global.window = global;
global.document = {
  getElementById: () => null,
  querySelector: () => null
};
global.localStorage = {
  getItem: () => null,
  setItem: () => null
};
global.showToast = () => {};

try {
  const code = fs.readFileSync('./js/logistik.js', 'utf8');
  eval(code);
  console.log('LogistikModule loaded successfully!');
  console.log('LogistikModule keys count:', Object.keys(global.LogistikModule).length);
} catch (e) {
  console.error('Error evaluating LogistikModule:', e);
}
