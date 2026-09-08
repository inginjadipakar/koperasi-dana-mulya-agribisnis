import json
import re

with open('js/logistik.js', 'r', encoding='utf-8') as f:
    log_code = f.read()

print("--- MONTH LISTS IN logistik.js ---")
for line_no, line in enumerate(log_code.splitlines(), 1):
    if any(m in line for m in ['JULI', 'AGU', 'SEP', 'months', 'selectedMonth', 'monthSelect', 'optMonth', 'renderMonth']):
        print(f"L{line_no}: {line.strip()[:120]}")

print("\n--- MONTH LISTS IN recap.js ---")
with open('js/recap.js', 'r', encoding='utf-8') as f:
    recap_code = f.read()
for line_no, line in enumerate(recap_code.splitlines(), 1):
    if any(m in line for m in ['JULI', 'AGU', 'SEP', 'LOGISTIK', 'logistik']):
        if any(w in line for w in ['month', 'bulan', 'JAN', 'JUL', 'AGU', 'SEP', 'data', 'Logistik']):
            print(f"L{line_no}: {line.strip()[:120]}")
