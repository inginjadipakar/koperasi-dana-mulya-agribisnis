import os
import re

js_dir = 'js'
for fname in sorted(os.listdir(js_dir)):
    if not fname.endswith('.js'): continue
    fpath = os.path.join(js_dir, fname)
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print(f"=== {fname} ===")
    juli = len(re.findall(r'JULI', content, re.IGNORECASE))
    agu = len(re.findall(r'AGUSTUS|AGU', content, re.IGNORECASE))
    sep = len(re.findall(r'SEPTEMBER|SEP', content, re.IGNORECASE))
    print(f"  JULI count: {juli}, AGUSTUS/AGU count: {agu}, SEPTEMBER/SEP count: {sep}")
    
    # check keys in objects if any
    object_keys = set(re.findall(r'[\"\'](JAN|FEB|MAR|APR|APRIL|MEI|JUNI|JULI|AGU|AGUSTUS|SEP|SEPTEMBER|OKT|NOV|DES)[\"\']\s*:', content))
    if object_keys:
        print(f"  Object month keys present: {sorted(list(object_keys))}")
