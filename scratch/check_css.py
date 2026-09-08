with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
rules = re.findall(r'([^{]+)\{([^}]+)\}', css)
for sel, body in rules:
    sel = sel.strip()
    if any(k in sel for k in ['html', 'body', 'appLayout', 'mainContent', 'sidebar', 'layout', 'container']):
        print(f"Selector: {sel}")
        print(f"Body: {body.strip()}\n")
