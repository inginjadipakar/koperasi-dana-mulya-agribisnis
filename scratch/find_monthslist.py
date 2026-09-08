with open('js/logistik.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'monthsList', text)]
for pos in matches:
    print(text[pos-20:pos+120])
    print("-" * 50)
