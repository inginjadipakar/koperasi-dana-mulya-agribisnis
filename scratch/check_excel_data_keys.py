import json, re

with open('js/excel_data.js', 'r', encoding='utf-8') as f:
    txt = f.read()

s = txt.find('{')
if s != -1:
    e = txt.rfind('}')
    data = json.loads(txt[s:e+1])
    for k, v in data.items():
        if isinstance(v, dict):
            print(k, "->", list(v.keys()))
        else:
            print(k, "->", type(v))
