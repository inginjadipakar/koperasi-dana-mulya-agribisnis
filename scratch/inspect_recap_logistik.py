with open('js/recap.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
lines = text.splitlines()
for idx, l in enumerate(lines):
    if 'logistik' in l.lower() or 'alllogdata' in l.lower() or 'sec2' in l.lower():
        print(f"L{idx+1}: {l.strip()[:120]}")
