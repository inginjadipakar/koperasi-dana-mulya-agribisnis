import json

with open('js/excel_viewer.js', 'r', encoding='utf-8') as f:
    text = f.read()

prefix = 'window.ORIGINAL_EXCEL_DATA = '
s = text.find(prefix)
if s != -1:
    e = text.find(';\nconst ExcelViewerModule', s)
    if e == -1: e = text.find(';\n\nconst ExcelViewerModule', s)
    data = json.loads(text[s+len(prefix):e].strip())
    for fname, sheets in data.items():
        if 'LOGISTIK' in fname.upper():
            print(f'File: {fname}')
            for sname in sheets.keys():
                print(f'  Sheet: {sname} ({len(sheets[sname])} rows)')
