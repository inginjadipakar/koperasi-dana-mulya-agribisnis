import json
import re

print("=== INSPECTING LOGISTIK.JS ===")
with open('js/logistik.js', 'r', encoding='utf-8') as f:
    log_content = f.read()

# Let's search for month arrays or keys in logistik.js
for match in re.finditer(r'["\'](JAN|FEB|MAR|APR|MEI|JUN|JUNI|JUL|JULI|AGU|AGUSTUS|SEP|SEPTEMBER|OKT|NOV|DES)["\']\s*:\s*\{', log_content):
    print("Found key in logistik.js:", match.group(0), "at index", match.start())

print("\n=== INSPECTING EXCEL_VIEWER.JS ===")
with open('js/excel_viewer.js', 'r', encoding='utf-8') as f:
    viewer_content = f.read()

prefix = 'window.ORIGINAL_EXCEL_DATA = '
s = viewer_content.find(prefix)
if s != -1:
    e = viewer_content.find(';\nconst ExcelViewerModule', s)
    if e == -1: e = viewer_content.find(';\n\nconst ExcelViewerModule', s)
    if e != -1:
        data = json.loads(viewer_content[s+len(prefix):e].strip())
        for k, v in data.items():
            if isinstance(v, dict):
                print(f"  {k}: {list(v.keys())}")

print("\n=== INSPECTING EXCEL_DATA.JS ===")
with open('js/excel_data.js', 'r', encoding='utf-8') as f:
    ed_content = f.read()
s = ed_content.find('window.EXCEL_RAW_DATA = ')
if s != -1:
    raw_str = ed_content[s+len('window.EXCEL_RAW_DATA = '):].strip()
    if raw_str.endswith(';'): raw_str = raw_str[:-1]
    data = json.loads(raw_str)
    for k, v in data.items():
        if isinstance(v, dict):
            print(f"  {k}: {list(v.keys())}")

print("\n=== INSPECTING EXCEL FILES IN WORKSPACE ===")
import glob
for f in glob.glob('*LOGISTIK*.xlsx'):
    print("Logistik Excel file:", f)
