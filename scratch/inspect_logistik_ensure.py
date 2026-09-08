with open('js/logistik.js', 'r', encoding='utf-8') as f:
    text = f.read()

s = text.find('ensureMonthData:')
if s != -1:
    print("--- ensureMonthData implementation ---")
    print(text[s:s+1500])

s = text.find('getActiveSaveMonth:')
if s != -1:
    print("\n--- getActiveSaveMonth implementation ---")
    print(text[s:s+1000])

s = text.find('syncMatrixFromTransactions:')
if s != -1:
    print("\n--- syncMatrixFromTransactions implementation ---")
    print(text[s:s+1000])
