from pathlib import Path

file_path = Path("js/logistik.js")
text = file_path.read_text(encoding="utf-8")

# 1. Replace ensureMonthData
start_str = "ensureMonthData: function(allData, monthKey) {"
end_str = "syncMatrixFromTransactions: function(allData, monthKey) {"

s = text.find(start_str)
e = text.find(end_str)

new_ensure = """ensureMonthData: function(allData, monthKey) {
    const validMonths = ["JAN", "FEB", "MAR", "APRIL", "MEI", "JUNI"];
    if (!monthKey || monthKey === "ALL" || !validMonths.includes(monthKey)) {
      monthKey = this.getActiveSaveMonth();
    }
    if (!allData[monthKey]) {
      if (this.defaultFullData[monthKey]) {
        allData[monthKey] = JSON.parse(JSON.stringify(this.defaultFullData[monthKey]));
      } else {
        allData[monthKey] = {
          sec1: [],
          sec2: [],
          sec3: [],
          sec4: []
        };
      }
    }
    if (!allData[monthKey].sec1) allData[monthKey].sec1 = [];
    if (!allData[monthKey].sec2) allData[monthKey].sec2 = [];
    if (!allData[monthKey].sec3) allData[monthKey].sec3 = [];
    if (!allData[monthKey].sec4) allData[monthKey].sec4 = [];
    return allData[monthKey];
  },

  """

text = text[:s] + new_ensure + text[e:]

# 2. Update syncMatrixFromTransactions monthsList
text = text.replace(
    'const monthsList = ["JAN", "FEB", "MAR", "APRIL", "MEI", "JUNI", "JULI", "AGU", "SEP", "OKT", "NOV", "DES"];',
    'const monthsList = ["JAN", "FEB", "MAR", "APRIL", "MEI", "JUNI"];'
)

# 3. Update getTransactions filter in syncMatrixFromTransactions
text = text.replace(
    'const monthMap = { JAN:1, FEB:2, MAR:3, APRIL:4, MEI:5, JUNI:6, JULI:7, AGU:8, SEP:9, OKT:10, NOV:11, DES:12 };',
    'const monthMap = { JAN:1, FEB:2, MAR:3, APRIL:4, MEI:5, JUNI:6 };'
)

# 4. In getMonthlyTransactions, update monthMap
text = text.replace(
    'const monthMap = { JAN:1, FEB:2, MAR:3, APRIL:4, MEI:5, JUNI:6, JULI:7, AGU:8, SEP:9, OKT:10, NOV:11, DES:12 };',
    'const monthMap = { JAN:1, FEB:2, MAR:3, APRIL:4, MEI:5, JUNI:6 };'
)

file_path.write_text(text, encoding="utf-8")
print("Successfully replaced ensureMonthData and updated monthsList & monthMap in js/logistik.js!")
