import json

with open('scratch/koperasi_full_data.json', 'r') as f:
    full_data = json.load(f)

json_str = json.dumps(full_data, indent=2)

with open('js/koperasi.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Replace defaultFullData: { ... }
start_marker = "defaultFullData: {"
end_marker = "  getMonthData: function(monthCode) {"

start_idx = js_content.find(start_marker)
end_idx = js_content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_js = js_content[:start_idx] + f"defaultFullData: {json_str},\n\n" + js_content[end_idx:]
    with open('js/koperasi.js', 'w', encoding='utf-8') as f:
        f.write(new_js)
    print("SUCCESSFULLY UPDATED js/koperasi.js WITH 7 MONTHS OF PRECISE DATA!")
else:
    print(f"ERROR FINDING MARKERS: start={start_idx}, end={end_idx}")
