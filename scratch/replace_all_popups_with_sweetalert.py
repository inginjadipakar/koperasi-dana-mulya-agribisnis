import re

# 1. UPDATE js/app.js
with open('js/app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

helpers_code = """
// GLOBAL MODERN POPUP & TOAST HELPERS (SWEETALERT2 INTEGRATION)
window.showToast = function(title, icon = 'success') {
  if (typeof Swal !== 'undefined') {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: icon,
      title: title,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  } else {
    alert(title);
  }
};

window.showAlert = function(title, text = '', icon = 'info') {
  if (typeof Swal !== 'undefined') {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      confirmButtonColor: '#0d6efd',
      confirmButtonText: 'Tutup',
      customClass: { popup: 'rounded-4 shadow' }
    });
  } else {
    alert(title + (text ? "\\n" + text : ""));
  }
};

window.showPromptYear = async function(currentYear, callback) {
  if (typeof Swal !== 'undefined') {
    const { value: inputYear } = await Swal.fire({
      title: 'Buat / Tambah Tahun Baru',
      text: 'Masukkan Tahun Laporan Baru (misal: 2027):',
      input: 'number',
      inputValue: (parseInt(currentYear || 2026) + 1).toString(),
      showCancelButton: true,
      confirmButtonText: 'Tambah Tahun',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#0d6efd',
      customClass: { popup: 'rounded-4 shadow' }
    });
    if (inputYear && inputYear.toString().trim()) {
      callback(inputYear.toString().trim());
    }
  } else {
    const inputYear = prompt("Masukkan Tahun Baru (misal: 2027):", (parseInt(currentYear || 2026) + 1).toString());
    if (inputYear && inputYear.trim()) callback(inputYear.trim());
  }
};
"""

app_js_updated = helpers_code + app_js
app_js_updated = app_js_updated.replace('alert("Database Resmi 2026 (Januari s/d Juli) berhasil dimuat ulang!");', 'showToast("Database Resmi 2026 (Januari s/d Juli) berhasil dimuat ulang!", "success");')
app_js_updated = app_js_updated.replace('alert("Gagal Login: " + res.message);', 'showAlert("Gagal Login", res.message, "error");')

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(app_js_updated)


# 2. UPDATE js/koperasi.js
with open('js/koperasi.js', 'r', encoding='utf-8') as f:
    kop_js = f.read()

kop_js_updated = kop_js.replace(
    'const inputYear = prompt("Masukkan Tahun Baru (misal: 2027):", (parseInt(this.selectedYear) + 1).toString());',
    'showPromptYear(this.selectedYear, (yr) => {\n      if (!this.availableYears.includes(yr)) {\n        this.availableYears.push(yr);\n        this.selectedYear = yr;\n        this.selectedMonth = "JAN";\n        showToast(`Tahun ${yr} Berhasil Ditambahkan!`, "success");\n        App.render();\n      } else {\n        this.selectYear(yr);\n      }\n    }); return;'
)
kop_js_updated = kop_js_updated.replace('alert("Transaksi Penerimaan berhasil disimpan!");', 'showToast("Transaksi Penerimaan berhasil disimpan!", "success");')
kop_js_updated = kop_js_updated.replace('alert("Gagal: " + res.message);', 'showAlert("Gagal Simpan", res.message, "error");')
kop_js_updated = kop_js_updated.replace('alert("Transaksi Pengeluaran berhasil disimpan!");', 'showToast("Transaksi Pengeluaran berhasil disimpan!", "success");')

with open('js/koperasi.js', 'w', encoding='utf-8') as f:
    f.write(kop_js_updated)


# 3. UPDATE js/depot.js
with open('js/depot.js', 'r', encoding='utf-8') as f:
    dep_js = f.read()

dep_js_updated = dep_js.replace(
    'const inputYear = prompt("Masukkan Tahun Baru (misal: 2027):", (parseInt(this.selectedYear) + 1).toString());',
    'showPromptYear(this.selectedYear, (yr) => {\n      if (!this.availableYears.includes(yr)) {\n        this.availableYears.push(yr);\n        this.selectedYear = yr;\n        this.selectedMonth = "ALL";\n        showToast(`Tahun ${yr} Berhasil Ditambahkan!`, "success");\n        App.render();\n      } else {\n        this.selectYear(yr);\n      }\n    }); return;'
)
dep_js_updated = dep_js_updated.replace('alert("Pembelian Depot berhasil disimpan!");', 'showToast("Pembelian Depot berhasil disimpan!", "success");')
dep_js_updated = dep_js_updated.replace('alert("Penjualan Agen berhasil disimpan!");', 'showToast("Penjualan Agen berhasil disimpan!", "success");')
dep_js_updated = dep_js_updated.replace('alert("Biaya Operasional berhasil disimpan!");', 'showToast("Biaya Operasional berhasil disimpan!", "success");')

with open('js/depot.js', 'w', encoding='utf-8') as f:
    f.write(dep_js_updated)


# 4. UPDATE js/logistik.js
with open('js/logistik.js', 'r', encoding='utf-8') as f:
    log_js = f.read()

log_js_updated = log_js.replace(
    'const inputYear = prompt("Masukkan Tahun Baru (misal: 2027):", (parseInt(this.selectedYear) + 1).toString());',
    'showPromptYear(this.selectedYear, (yr) => {\n      if (!this.availableYears.includes(yr)) {\n        this.availableYears.push(yr);\n        this.selectedYear = yr;\n        this.selectedMonth = "JAN";\n        showToast(`Tahun ${yr} Berhasil Ditambahkan!`, "success");\n        App.render();\n      } else {\n        this.selectYear(yr);\n      }\n    }); return;'
)
log_js_updated = re.sub(r'alert\(`Data Penjualan "[^"]+" berhasil diperbarui pada Seksi II!`\);', 'showToast("Data Penjualan Pakan berhasil disimpan!", "success");', log_js_updated)
log_js_updated = re.sub(r'alert\(`Data Pembelian "[^"]+" berhasil disimpan pada Seksi III!`\);', 'showToast("Data Pembelian Pakan berhasil disimpan!", "success");', log_js_updated)
log_js_updated = re.sub(r'alert\(`Data Keseimbangan Stok "[^"]+" berhasil diperbarui pada Seksi IV!`\);', 'showToast("Data Stok Pakan berhasil diperbarui!", "success");', log_js_updated)

with open('js/logistik.js', 'w', encoding='utf-8') as f:
    f.write(log_js_updated)


# 5. UPDATE js/recap.js
with open('js/recap.js', 'r', encoding='utf-8') as f:
    rec_js = f.read()

rec_js_updated = re.sub(r'alert\(`1 File Master Excel \(\.xlsx\) Resmi Konsolidasi Bulanan \([^)]+\) berhasil di-download dengan layout & kolom 100% presisi!`\);', 'showToast("1 File Master Excel (.xlsx) Resmi Konsolidasi Bulanan berhasil di-download!", "success");', rec_js)
rec_js_updated = rec_js_updated.replace('alert("Library SheetJS (XLSX) sedang dimuat, harap coba beberapa detik lagi.");', 'showAlert("Perhatian", "Library SheetJS (XLSX) sedang dimuat, harap coba beberapa detik lagi.", "warning");')

with open('js/recap.js', 'w', encoding='utf-8') as f:
    f.write(rec_js_updated)

print("SUCCESSFULLY REPLACED ALL NATIVE ALERTS AND PROMPTS WITH SWEETALERT2 POPUPS AND TOASTS!")
