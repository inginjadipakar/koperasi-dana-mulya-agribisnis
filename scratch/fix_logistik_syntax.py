import re

file_path = r"c:\Users\HP\Desktop\KKN SIE ACARA\Proker UMKM\Koperasidanamulya\js\logistik.js"

with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

print(f"Total lines before: {len(lines)}")
print("Line 1964:", repr(lines[1963]))
print("Line 1965:", repr(lines[1964]))
print("Line 1966:", repr(lines[1965]))
print("Line 1967:", repr(lines[1966]))

# Find where `selectYear:` starts after line 1965
target_start = 1966 # 0-indexed: line 1967
target_end = -1
for i in range(1966, len(lines)):
    if "selectYear: function" in lines[i]:
        target_end = i
        break

print(f"Target start: {target_start}, Target end: {target_end}")
if target_end != -1:
    new_lines = lines[:target_start] + ["\n"] + lines[target_end:]
    with open(file_path, "w", encoding="utf-8") as f:
        f.writelines(new_lines)
    print(f"Total lines after: {len(new_lines)}")
else:
    print("Could not find target_end!")
