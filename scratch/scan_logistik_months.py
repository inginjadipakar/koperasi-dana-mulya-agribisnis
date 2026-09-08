with open('js/logistik.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    for target in ['JULI', 'AGU', 'AGUSTUS', 'SEP', 'SEPTEMBER']:
        if target in line:
            print(f"L{idx+1} [{target}]: {line.strip()}")
