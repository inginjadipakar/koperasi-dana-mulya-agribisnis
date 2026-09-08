import json
import os
from pathlib import Path

root = Path(r"c:\Users\HP\Desktop\KKN SIE ACARA\Proker UMKM\Koperasidanamulya")
seed_file = root / "scratch" / "seed_data.json"
api_file = root / "js" / "api.js"
viewer_file = root / "js" / "excel_viewer.js"

# 1. PURGE AUGUST FROM SEED DATA & JS/API.JS
with open(seed_file, "r", encoding="utf-8") as f:
    db = json.load(f)

for key in ["KOPERASI_PENERIMAAN", "KOPERASI_PENGELUARAN", "DEPOT_PEMBELIAN", "DEPOT_PENJUALAN", "DEPOT_OPERASIONAL"]:
    if key in db:
        db[key] = [r for r in db[key] if not r.get("transaction_id", "").startswith(f"TRX-{key[:3]}-202608") and r.get("tanggal", "") != "2026-08-15"]

with open(seed_file, "w", encoding="utf-8") as f:
    json.dump(db, f, indent=2, ensure_ascii=False)

json_str = json.dumps(db, indent=8, ensure_ascii=False)

api_code = api_file.read_text(encoding="utf-8")

start_marker = "initStorage: function() {"
end_marker = "getDB: function() {"

start_idx = api_code.find(start_marker)
end_idx = api_code.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_init = f"""initStorage: function() {{
    if (!localStorage.getItem("DANAMULYA_DB") || localStorage.getItem("DANAMULYA_DB_VERSION") !== "2026_REAL_DATA_ONLY_V3") {{
      const db = {json_str};
      localStorage.setItem("DANAMULYA_DB", JSON.stringify(db));
      localStorage.setItem("DANAMULYA_DB_VERSION", "2026_REAL_DATA_ONLY_V3");
    }}
  }},
  """
    new_code = api_code[:start_idx] + new_init + api_code[end_idx:]
    api_file.write_text(new_code, encoding="utf-8")
    print("SUCCESS: Purged August sample data from api.js and seed_data.json")

# 2. PURGE AGUSTUS SHEET FROM JS/EXCEL_VIEWER.JS
v_code = viewer_file.read_text(encoding="utf-8")
prefix = "window.ORIGINAL_EXCEL_DATA = "
suffix = ";\n\nconst ExcelViewerModule ="

v_start = v_code.find(prefix)
v_end = v_code.find(suffix)

if v_start == -1 or v_end == -1:
    v_end = v_code.find(";\nconst ExcelViewerModule =")

if v_start != -1 and v_end != -1:
    v_json_str = v_code[v_start + len(prefix):v_end].strip()
    v_data = json.loads(v_json_str)

    for file_k in list(v_data.keys()):
        if "AGUSTUS" in v_data[file_k]:
            del v_data[file_k]["AGUSTUS"]
            print(f"SUCCESS: Removed AGUSTUS sheet from {file_k}")

    new_v_json = json.dumps(v_data, separators=(',', ':'), ensure_ascii=False)
    new_v_code = v_code[:v_start + len(prefix)] + new_v_json + v_code[v_end:]
    viewer_file.write_text(new_v_code, encoding="utf-8")

# 3. DELETE ALL PHYSICAL * - AGUSTUS.xlsx FILES
for f_path in root.glob("*AGUSTUS*"):
    if f_path.is_file():
        f_path.unlink()
        print(f"SUCCESS: Deleted physical file {f_path.name}")

print("\nCOMPLETE PURGE OF AUGUST 2026 SAMPLE DATA SUCCESSFUL!")
