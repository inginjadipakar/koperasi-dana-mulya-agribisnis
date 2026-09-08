import json
from pathlib import Path
import os

root = Path(r"c:\Users\HP\Desktop\KKN SIE ACARA\Proker UMKM\Koperasidanamulya")
viewer_file = root / "js" / "excel_viewer.js"

content = viewer_file.read_text(encoding="utf-8")

prefix = "window.ORIGINAL_EXCEL_DATA = "
start_idx = content.find(prefix)

if start_idx != -1:
    end_idx = content.find(";\nconst ExcelViewerModule =", start_idx)
    if end_idx == -1:
        end_idx = content.find(";\n\nconst ExcelViewerModule =", start_idx)
    
    if end_idx != -1:
        json_str = content[start_idx + len(prefix):end_idx].strip()
        data = json.loads(json_str)

        logistik_key = None
        for k in data.keys():
            if "LOGISTIK" in k.upper():
                logistik_key = k
                break

        if logistik_key:
            sheets = data[logistik_key]
            print(f"Before removal, sheets in {logistik_key}: {list(sheets.keys())}")
            
            # Remove trial months: JULI, AGUSTUS, SEPTEMBER
            for trial_month in ["JULI", "JUL", "AGUSTUS", "AGU", "SEPTEMBER", "SEP"]:
                if trial_month in sheets:
                    del sheets[trial_month]
                    print(f"Removed '{trial_month}' from {logistik_key}")

            print(f"After removal, sheets in {logistik_key}: {list(sheets.keys())}")

            new_json_str = json.dumps(data, separators=(',', ':'), ensure_ascii=False)
            new_content = content[:start_idx + len(prefix)] + new_json_str + content[end_idx:]
            viewer_file.write_text(new_content, encoding="utf-8")
            print(f"Successfully updated {viewer_file}")

# Delete 2026-LAP LOGISTIK - JULI.xlsx if exists
juli_excel = root / "2026-LAP LOGISTIK - JULI.xlsx"
if juli_excel.exists():
    os.remove(juli_excel)
    print("Deleted 2026-LAP LOGISTIK - JULI.xlsx")

# Delete scratch trial script if appropriate
trial_script = root / "scratch" / "add_juli_agustus_to_logistik.py"
if trial_script.exists():
    os.remove(trial_script)
    print("Deleted scratch/add_juli_agustus_to_logistik.py")
