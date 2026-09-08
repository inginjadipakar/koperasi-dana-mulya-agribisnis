import json
from pathlib import Path

root = Path(r"c:\Users\HP\Desktop\KKN SIE ACARA\Proker UMKM\Koperasidanamulya")
seed_file = root / "scratch" / "seed_data.json"
api_file = root / "js" / "api.js"

with open(seed_file, "r", encoding="utf-8") as f:
    seed_data = json.load(f)

json_str = json.dumps(seed_data, indent=8, ensure_ascii=False)

api_code = api_file.read_text(encoding="utf-8")

start_marker = "initStorage: function() {"
end_marker = "getDB: function() {"

start_idx = api_code.find(start_marker)
end_idx = api_code.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_init = f"""initStorage: function() {{
    if (!localStorage.getItem("DANAMULYA_DB") || localStorage.getItem("DANAMULYA_DB_VERSION") !== "2026_FULL_V2") {{
      const db = {json_str};
      localStorage.setItem("DANAMULYA_DB", JSON.stringify(db));
      localStorage.setItem("DANAMULYA_DB_VERSION", "2026_FULL_V2");
    }}
  }},
  """
    new_code = api_code[:start_idx] + new_init + api_code[end_idx:]
    api_file.write_text(new_code, encoding="utf-8")
    print("Successfully updated js/api.js with full 2026 data!")
else:
    print("Error: markers not found")
