import re

with open('js/logistik.js', 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find('render: async function')
end = text.find('exportExcelSec1:', start)
render_code = text[start:end]

# Find all tab-pane sections
panes = re.findall(r'<div[^>]*class="[^"]*tab-pane[^"]*"[^>]*>', render_code)
print("Found tab-pane elements:")
for p in panes:
    print(" -", p)

# Check all style attributes in render_code for height or min-height
styles = re.findall(r'style="([^"]*)"', render_code)
print("\nStyles in render():")
for s in styles:
    if 'height' in s or 'margin' in s or 'padding' in s:
        print(" -", s)
