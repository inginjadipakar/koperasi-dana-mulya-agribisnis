with open('js/logistik.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's check lines 1180-1280
lines = text.splitlines()
print("--- getFullData & render header ---")
for idx, l in enumerate(lines[1170:1270], 1171):
    print(f"L{idx}: {l}")
