with open('js/logistik.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print("--- logistik.js lines 1220 to 1290 ---")
for i in range(1220, min(1290, len(lines))):
    print(f"L{i+1}: {lines[i]}", end="")

print("\n--- logistik.js lines 1340 to 1370 ---")
for i in range(1340, min(1370, len(lines))):
    print(f"L{i+1}: {lines[i]}", end="")

print("\n--- logistik.js lines 2250 to 2340 ---")
for i in range(2250, min(2340, len(lines))):
    print(f"L{i+1}: {lines[i]}", end="")
