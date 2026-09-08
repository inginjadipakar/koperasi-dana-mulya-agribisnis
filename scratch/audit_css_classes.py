import re

logistik_path = r"c:\Users\HP\Desktop\KKN SIE ACARA\Proker UMKM\Koperasidanamulya\js\logistik.js"
css_path = r"c:\Users\HP\Desktop\KKN SIE ACARA\Proker UMKM\Koperasidanamulya\css\mobile-app.css"

with open(logistik_path, 'r', encoding='utf-8') as f:
    js_content = f.read()

with open(css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

# Extract all class names starting with ma-
js_classes = set(re.findall(r'class=["\']([^"\']+)["\']', js_content))
all_ma_classes_in_js = set()
for cstr in js_classes:
    for cls in cstr.split():
        if cls.startswith('ma-'):
            # clean template string placeholders if any
            cls_clean = cls.replace('${', '').replace('}', '').strip()
            if cls_clean and cls_clean.startswith('ma-'):
                all_ma_classes_in_js.add(cls_clean)

missing_classes = []
for cls in sorted(all_ma_classes_in_js):
    if f".{cls}" not in css_content and f"{cls}" not in css_content:
        missing_classes.append(cls)

print("=== MISSING MA- CLASSES IN CSS ===")
for m in missing_classes:
    print(m)
