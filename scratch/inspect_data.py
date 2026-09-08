import json
import re

# Check js/excel_viewer.js
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
            print(f'ExcelViewer {fname} sheets: {list(sheets.keys())}')

# Check defaultFullData in logistik.js
with open('js/logistik.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

in_default = False
keys = []
for idx, line in enumerate(lines):
    if 'defaultFullData:' in line:
        in_default = True
        continue
    if in_default:
        # Check if line is a top-level key like '  "JAN": {'
        if re.match(r'^\s{2,4}"[A-Za-z0-9_]+":\s*\{', line):
            k = line.strip().split(':')[0].replace('"', '').strip()
            keys.append((k, idx + 1))
        # Check if defaultFullData ends
        if re.match(r'^\s*\},?\s*$', line) and idx > 1000:
            in_default = False

print(f'logistik.js defaultFullData keys found: {keys}')

# Check if there are other places in logistik.js where JULI, AGU/AGUSTUS, SEP/SEPTEMBER are used
for idx, line in enumerate(lines):
    if any(m in line for m in ['JULI', 'AGUSTUS', 'SEPTEMBER', 'SEP', 'AGU']):
        # print line
        if any(w in line for w in ['sec1', 'sec2', 'sec3', 'sec4', 'data', 'default', 'JULI', 'AGUSTUS', 'SEPTEMBER']):
            print(f'Line {idx+1}: {line.strip()[:100]}')
