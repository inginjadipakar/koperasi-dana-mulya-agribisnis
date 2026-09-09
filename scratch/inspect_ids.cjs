const fs = require('fs');
const src = fs.readFileSync('js/logistik.js', 'utf8').split('\n');
const missing = [
  'sec2_tunai_kg', 'sec2_tunai_harga', 'sec2_pot_kg', 'sec2_pot_harga',
  'sec2_piu_kg', 'sec2_piu_harga', 'sec2_bunt_kg', 'sec2_bunt_harga',
  'sec2_tunai_rp_input', 'sec2_pot_rp_input', 'sec2_piu_rp_input', 'sec2_bunt_rp_input',
  'sec2PreviewKg', 'sec2PreviewRp', 'sec4SelectPakan', 'sec4PreviewStokAwal', 'sec4PreviewSiapJual',
  'sec2ColBaru', 'seg_btn_rasio', 'seg_btn_non_rasio', 'tx_kode_display',
  'opt_p1', 'opt_p2', 'opt_p3', 'opt_piutang', 'opt_prog_bunting',
  'sec1_pembelian_rp_input', 'sec1_penjualan_rp_input'
];
missing.forEach(id => {
  src.forEach((line, idx) => {
    if (line.includes(id)) {
      console.log(`Line ${idx+1}: [${id}] -> ${line.trim()}`);
    }
  });
});
