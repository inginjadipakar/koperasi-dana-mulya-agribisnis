import re

with open('js/logistik.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's inspect where getFullData or getMonthData or defaultFullData is handled
print("--- ALL DATA METHODS IN LOGISTIK ---")
for m in re.finditer(r'(getFullData|getMonthData|loadData|saveData|init|render)\s*:\s*function', text):
    print(m.group(0), "at pos", m.start())

# Let's inspect getFullData implementation
s = text.find('getFullData:')
if s != -1:
    print("\n--- getFullData implementation ---")
    print(text[s:s+1500])

# Let's inspect getMonthData
s = text.find('getMonthData:')
if s != -1:
    print("\n--- getMonthData implementation ---")
    print(text[s:s+1500])
