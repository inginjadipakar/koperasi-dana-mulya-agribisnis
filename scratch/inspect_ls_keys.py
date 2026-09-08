with open('js/logistik.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'DANAMULYA_LOGISTIK', text)]
for pos in matches:
    print(text[pos-50:pos+100])
