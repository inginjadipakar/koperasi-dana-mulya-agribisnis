import re

with open('js/logistik.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update selectedMonth initial value
code = re.sub(
    r'selectedMonth:\s*\(\["JAN",\s*"FEB",\s*"MAR",\s*"APR",\s*"MEI",\s*"JUNI",\s*"JULI",\s*"AGU",\s*"SEP",\s*"OKT",\s*"NOV",\s*"DES"\]\)\[new Date\(\)\.getMonth\(\)\]\s*\|\|\s*"SEP",',
    'selectedMonth: "JUNI",',
    code
)

# 2. Update getFullData to sanitize and purge obsolete months
old_get_full = '''  getFullData: function() {
    const stored = localStorage.getItem("DANAMULYA_LOGISTIK_FULL_V10");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse logistik full data from localStorage", e);
      }
    }
    return JSON.parse(JSON.stringify(this.defaultFullData));
  },'''

new_get_full = '''  getFullData: function() {
    // Purge old versions that contained trial data for JULI, AGUSTUS, SEPTEMBER
    try {
      localStorage.removeItem("DANAMULYA_LOGISTIK_FULL_V10");
      localStorage.removeItem("DANAMULYA_LOGISTIK_FULL_V9");
    } catch (e) {}

    const validMonths = ["JAN", "FEB", "MAR", "APRIL", "MEI", "JUNI"];
    let data = null;
    const stored = localStorage.getItem("DANAMULYA_LOGISTIK_FULL_V12");
    if (stored) {
      try {
        data = JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse logistik full data from localStorage", e);
      }
    }
    if (!data) {
      data = JSON.parse(JSON.stringify(this.defaultFullData));
    }
    
    // Strict sanitization: Delete any trial month keys not in Excel
    Object.keys(data).forEach(k => {
      if (!validMonths.includes(k)) {
        delete data[k];
      }
    });
    return data;
  },'''

if old_get_full in code:
    code = code.replace(old_get_full, new_get_full)
    print("Replaced getFullData successfully!")
else:
    print("Could not find exact old_get_full string!")

# 3. Update saveFullData to V12
code = code.replace('localStorage.setItem("DANAMULYA_LOGISTIK_FULL_V10"', 'localStorage.setItem("DANAMULYA_LOGISTIK_FULL_V12"')

# 4. Update getActiveSaveMonth
old_get_active = '''  getActiveSaveMonth: function() {
    if (this.selectedMonth && this.selectedMonth !== "ALL") return this.selectedMonth;
    const monthNames = ["JAN", "FEB", "MAR", "APRIL", "MEI", "JUNI", "JULI", "AGU", "SEP", "OKT", "NOV", "DES"];
    const currentMonthIdx = new Date().getMonth();
    return monthNames[currentMonthIdx] || "SEP";
  },'''

new_get_active = '''  getActiveSaveMonth: function() {
    const validMonths = ["JAN", "FEB", "MAR", "APRIL", "MEI", "JUNI"];
    if (this.selectedMonth && validMonths.includes(this.selectedMonth)) return this.selectedMonth;
    return "JUNI";
  },'''

if old_get_active in code:
    code = code.replace(old_get_active, new_get_active)
    print("Replaced getActiveSaveMonth successfully!")
else:
    print("Could not find exact old_get_active string!")

# 5. Update monthsList in render() (around line 1235)
code = re.sub(
    r'const monthsList = \["JAN", "FEB", "MAR", "APRIL", "MEI", "JUNI", "JULI", "AGU", "SEP", "OKT", "NOV", "DES"\];',
    'const monthsList = ["JAN", "FEB", "MAR", "APRIL", "MEI", "JUNI"];',
    code
)

# 6. Update monthMap in syncMatrixFromTransactions
code = code.replace(
    'const monthMap = { JAN:1, FEB:2, MAR:3, APRIL:4, MEI:5, JUNI:6, JULI:7, AGU:8, SEP:9, OKT:10, NOV:11, DES:12 };',
    'const monthMap = { JAN:1, FEB:2, MAR:3, APRIL:4, MEI:5, JUNI:6 };'
)

# 7. Update ensureMonthData to avoid creating dummy data for invalid months
old_ensure = '''  ensureMonthData: function(allData, monthKey) {
    if (!monthKey || monthKey === "ALL") monthKey = this.getActiveSaveMonth();
    if (!allData[monthKey]) {
      allData[monthKey] = {
        sec1: [
          { no: 1, nama: "MILK CAN", stok_awal_unit: 6, stok_awal_harga: 650000, stok_awal_rp: 3900000, pembelian_unit: 0, pembelian_harga: 0, pembelian_rp: 0, penjualan_unit: 0, penjualan_harga: 0, penjualan_rp: 0, stok_akhir_unit: 6, stok_akhir_rp: 3900000 },
          { no: 2, nama: "SARINGAN MILK CAN", stok_awal_unit: 24, stok_awal_harga: 130000, stok_awal_rp: 3120000, pembelian_unit: 0, pembelian_harga: 0, pembelian_rp: 0, penjualan_unit: 0, penjualan_harga: 0, penjualan_rp: 0, stok_akhir_unit: 24, stok_akhir_rp: 3120000 },
          { no: 3, nama: "TIMBA PERAH", stok_awal_unit: 32, stok_awal_harga: 125000, stok_awal_rp: 4000000, pembelian_unit: 0, pembelian_harga: 0, pembelian_rp: 0, penjualan_unit: 0, penjualan_harga: 0, penjualan_rp: 0, stok_akhir_unit: 32, stok_akhir_rp: 4000000 },
          { no: 4, nama: "BRANGUS SAPI", stok_awal_unit: 85, stok_awal_harga: 15000, stok_awal_rp: 1275000, pembelian_unit: 0, pembelian_harga: 0, pembelian_rp: 0, penjualan_unit: 0, penjualan_harga: 0, penjualan_rp: 0, stok_akhir_unit: 85, stok_akhir_rp: 1275000 },
          { no: 5, nama: "ALAT CELUP TEAT DIP", stok_awal_unit: 175, stok_awal_harga: 50000, stok_awal_rp: 8750000, pembelian_unit: 0, pembelian_harga: 0, pembelian_rp: 0, penjualan_unit: 0, penjualan_harga: 0, penjualan_rp: 0, stok_akhir_unit: 175, stok_akhir_rp: 8750000 }
        ],
        sec2: [],
        sec3: [],
        sec4: []
      };
    }
    if (!allData[monthKey].sec1) allData[monthKey].sec1 = [];
    if (!allData[monthKey].sec2) allData[monthKey].sec2 = [];
    if (!allData[monthKey].sec3) allData[monthKey].sec3 = [];
    if (!allData[monthKey].sec4) allData[monthKey].sec4 = [];
    return allData[monthKey];
  },'''

new_ensure = '''  ensureMonthData: function(allData, monthKey) {
    const validMonths = ["JAN", "FEB", "MAR", "APRIL", "MEI", "JUNI"];
    if (!monthKey || monthKey === "ALL" || !validMonths.includes(monthKey)) {
      monthKey = this.getActiveSaveMonth();
    }
    if (!allData[monthKey]) {
      if (this.defaultFullData[monthKey]) {
        allData[monthKey] = JSON.parse(JSON.stringify(this.defaultFullData[monthKey]));
      } else {
        allData[monthKey] = {
          sec1: [],
          sec2: [],
          sec3: [],
          sec4: []
        };
      }
    }
    if (!allData[monthKey].sec1) allData[monthKey].sec1 = [];
    if (!allData[monthKey].sec2) allData[monthKey].sec2 = [];
    if (!allData[monthKey].sec3) allData[monthKey].sec3 = [];
    if (!allData[monthKey].sec4) allData[monthKey].sec4 = [];
    return allData[monthKey];
  },'''

if old_ensure in code:
    code = code.replace(old_ensure, new_ensure)
    print("Replaced ensureMonthData successfully!")
else:
    print("Could not find exact old_ensure string!")

with open('js/logistik.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Saved updated js/logistik.js")
