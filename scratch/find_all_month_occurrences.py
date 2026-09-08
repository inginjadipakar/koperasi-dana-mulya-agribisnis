import glob, os, re, json

print("=== CHECKING ALL JS FILES FOR JULI / AGUSTUS / SEPTEMBER ===")

for path in ['js/logistik.js', 'js/koperasi.js', 'js/depot.js', 'js/recap.js', 'js/excel_viewer.js', 'js/excel_data.js', 'index.html']:
    if not os.path.exists(path):
        continue
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    print(f"\n--- {path} ---")
    # Find all occurrences of JULI, AGU, AGUSTUS, SEP, SEPTEMBER
    for m in re.finditer(r'["\'](JULI|JUL|AGUSTUS|AGU|SEPTEMBER|SEP)["\']', content):
        line_no = content.count('\n', 0, m.start()) + 1
        # get context line
        lines = content.splitlines()
        print(f"  Line {line_no}: {lines[line_no - 1].strip()[:140]}")
