with open('js/logistik.js', 'r', encoding='utf-8') as f:
    text = f.read()

s = text.find('ensureMonthData:')
print(text[s:s+1200])
