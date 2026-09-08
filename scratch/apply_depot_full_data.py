import json, re

with open('scratch/depot_parsed_db.json', encoding='utf-8') as f:
    depot_data = json.load(f)

pembelian_json = json.dumps(depot_data['pembelian'], indent=16)
penjualan_json = json.dumps(depot_data['penjualan'], indent=16)

with open('js/api.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace version
content = re.sub(r'DANAMULYA_DB_VERSION" !== "[^"]+"', 'DANAMULYA_DB_VERSION" !== "2026_REAL_DATA_DEPOT_V12"', content)

# Replace DEPOT_PEMBELIAN array
content = re.sub(
    r'"DEPOT_PEMBELIAN":\s*\[\s*\]',
    f'"DEPOT_PEMBELIAN": {pembelian_json}',
    content
)

# Replace DEPOT_PENJUALAN array
content = re.sub(
    r'"DEPOT_PENJUALAN":\s*\[\s*\]',
    f'"DEPOT_PENJUALAN": {penjualan_json}',
    content
)

with open('js/api.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('SUCCESSFULLY POPULATED DEPOT_PEMBELIAN AND DEPOT_PENJUALAN IN js/api.js!')
