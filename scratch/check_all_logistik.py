import glob, os, openpyxl, json

print("=== CHECKING ALL EXCEL FILES RELATED TO LOGISTIK ===")
for f in glob.glob('*LOGISTIK*.xlsx'):
    wb = openpyxl.load_workbook(f, data_only=True)
    print(f, "Sheets:", wb.sheetnames)

print("\n=== CHECKING EXCEL VIEWER JS ===")
with open('js/excel_viewer.js', 'r', encoding='utf-8') as f:
    txt = f.read()

prefix = 'window.ORIGINAL_EXCEL_DATA = '
s = txt.find(prefix)
if s != -1:
    e = txt.find(';\nconst ExcelViewerModule', s)
    if e == -1: e = txt.find(';\n\nconst ExcelViewerModule', s)
    data = json.loads(txt[s+len(prefix):e].strip())
    for k, v in data.items():
        if 'LOGISTIK' in k.upper():
            print(k, "Sheets in ExcelViewer:", list(v.keys()))

print("\n=== CHECKING EXCEL DATA JS ===")
with open('js/excel_data.js', 'r', encoding='utf-8') as f:
    txt = f.read()
for m in ['JULI', 'AGUSTUS', 'SEPTEMBER', 'LOGISTIK']:
    if m in txt:
        print(f"Found {m} in js/excel_data.js")

print("\n=== CHECKING RECAP JS ===")
with open('js/recap.js', 'r', encoding='utf-8') as f:
    txt = f.read()
# Let's see if recap.js has hardcoded logistik data for JULI/AGUSTUS/SEPTEMBER
if 'logistik' in txt.lower():
    lines = txt.splitlines()
    for idx, l in enumerate(lines):
        if 'logistik' in l.lower() or 'pakan' in l.lower():
            print(f"recap.js L{idx+1}: {l.strip()[:100]}")
