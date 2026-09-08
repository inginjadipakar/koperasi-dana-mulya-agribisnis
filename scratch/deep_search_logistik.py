import glob, os, re

for root_dir, dirs, files in os.walk('.'):
    if '.git' in root_dir or 'node_modules' in root_dir:
        continue
    for f in files:
        if f.endswith(('.js', '.py', '.json', '.html', '.md')):
            p = os.path.join(root_dir, f)
            try:
                with open(p, 'r', encoding='utf-8', errors='ignore') as fh:
                    content = fh.read()
                    if '2026-LAP LOGISTIK' in content or 'Logistik' in content or 'logistik' in content:
                        for m in ['JULI', 'AGUSTUS', 'SEPTEMBER']:
                            if m in content and ('logistik' in content.lower() or 'LOGISTIK' in content):
                                print(f"{p}: mentions {m}")
                                break
            except:
                pass
