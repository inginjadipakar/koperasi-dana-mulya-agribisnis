with open('js/excel_data.js', 'r', encoding='utf-8') as f:
    txt = f.read()

print("File size:", len(txt))
for l in txt.splitlines()[:50]:
    print(l[:100])
