with open('js/logistik.js', 'r', encoding='utf-8') as f:
    text = f.read()

s = text.find('ensureMonthData:')
e = text.find('syncMatrixFromTransactions:')
print("START:")
print(text[s:e])
print("END")
