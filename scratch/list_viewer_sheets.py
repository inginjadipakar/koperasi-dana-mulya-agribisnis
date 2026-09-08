import json

with open('js/excel_viewer.js', 'r', encoding='utf-8') as f:
    text = f.read()

prefix = 'window.ORIGINAL_EXCEL_DATA = '
s = text.find(prefix)
if s != -1:
    e = text.find(';\nconst ExcelViewerModule', s)
    if e == -1: e = text.find(';\n\nconst ExcelViewerModule', s)
    data = json.loads(text[s+len(prefix):e].strip())
    print("ALL FILES AND SHEETS IN EXCEL_VIEWER.JS:")
    for fname, sheets in data.items():
        print(f"  {fname}: {list(sheets.keys())}")
