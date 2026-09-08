import json

with open('scratch/depot_parsed_db.json', encoding='utf-8') as f:
    depot_parsed = json.load(f)

pembelian_records = depot_parsed['pembelian']
penjualan_records = depot_parsed['penjualan']

# Now let's update js/depot.js to include default records if storage is empty!
with open('js/depot.js', 'r', encoding='utf-8') as f:
    depot_js = f.read()

# Add fallback data to DepotModule
default_pembelian_str = json.dumps(pembelian_records, indent=2)
default_penjualan_str = json.dumps(penjualan_records, indent=2)

depot_fallback_code = """const DepotModule = {
  selectedYear: "2026",
  selectedMonth: "ALL",
  availableYears: ["2026"],

  defaultPembelian: """ + default_pembelian_str + """,
  defaultPenjualan: """ + default_penjualan_str + """,

  getPembelianData: async function() {
    const res = await ApiClient.post("getDepotPembelian");
    if (res.success && res.data && res.data.length > 0) return res.data;
    return this.defaultPembelian;
  },

  getPenjualanData: async function() {
    const res = await ApiClient.post("getDepotPenjualan");
    if (res.success && res.data && res.data.length > 0) return res.data;
    return this.defaultPenjualan;
  },
"""

# Replace top of DepotModule in js/depot.js
import re
depot_js_updated = re.sub(
    r'const DepotModule = \{[\s\S]*?render: async function\(\) \{',
    depot_fallback_code + '\n  render: async function() {',
    depot_js,
    count=1
)

# Replace purRes and salRes calls inside render:
depot_js_updated = depot_js_updated.replace(
    'const purRes = await ApiClient.post("getDepotPembelian");\n    const salRes = await ApiClient.post("getDepotPenjualan");',
    'const allPembelian = await this.getPembelianData();\n    const allPenjualan = await this.getPenjualanData();'
).replace(
    'const allPembelian = purRes.data || [];\n    const allPenjualan = salRes.data || [];',
    '// loaded via getPembelianData / getPenjualanData'
)

with open('js/depot.js', 'w', encoding='utf-8') as f:
    f.write(depot_js_updated)

# Now update js/api.js to bump version to 2026_REAL_DATA_DEPOT_V13
with open('js/api.js', 'r', encoding='utf-8') as f:
    api_js = f.read()

api_js_updated = re.sub(r'DANAMULYA_DB_VERSION" !== "[^"]+"', 'DANAMULYA_DB_VERSION" !== "2026_REAL_DATA_DEPOT_V13"', api_js)
pembelian_indent = json.dumps(pembelian_records, indent=16)
penjualan_indent = json.dumps(penjualan_records, indent=16)

api_js_updated = re.sub(r'"DEPOT_PEMBELIAN":\s*\[[\s\S]*?\]\s*,\s*"DEPOT_PENJUALAN"', f'"DEPOT_PEMBELIAN": {pembelian_indent},\n        "DEPOT_PENJUALAN"', api_js_updated)
api_js_updated = re.sub(r'"DEPOT_PENJUALAN":\s*\[[\s\S]*?\]\s*,\s*"DEPOT_OPERASIONAL"', f'"DEPOT_PENJUALAN": {penjualan_indent},\n        "DEPOT_OPERASIONAL"', api_js_updated)

with open('js/api.js', 'w', encoding='utf-8') as f:
    f.write(api_js_updated)

print('SUCCESSFULLY UPDATED js/depot.js AND js/api.js WITH GUARANTEED FALLBACK DATA!')
