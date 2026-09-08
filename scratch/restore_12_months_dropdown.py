from pathlib import Path

file_path = Path("js/logistik.js")
code = file_path.read_text(encoding="utf-8")

# 1. Update monthsList in render() to 12 months
code = code.replace(
    'const monthsList = ["JAN", "FEB", "MAR", "APRIL", "MEI", "JUNI"];',
    'const monthsList = ["JAN", "FEB", "MAR", "APRIL", "MEI", "JUNI", "JULI", "AGU", "SEP", "OKT", "NOV", "DES"];'
)

# 2. Update monthMap in syncMatrixFromTransactions and getMonthlyTransactions
code = code.replace(
    'const monthMap = { JAN:1, FEB:2, MAR:3, APRIL:4, MEI:5, JUNI:6 };',
    'const monthMap = { JAN:1, FEB:2, MAR:3, APRIL:4, MEI:5, JUNI:6, JULI:7, AGU:8, SEP:9, OKT:10, NOV:11, DES:12 };'
)

# 3. Update getActiveSaveMonth
old_get_active = """  getActiveSaveMonth: function() {
    const validMonths = ["JAN", "FEB", "MAR", "APRIL", "MEI", "JUNI"];
    if (this.selectedMonth && validMonths.includes(this.selectedMonth)) return this.selectedMonth;
    return "JUNI";
  },"""

new_get_active = """  getActiveSaveMonth: function() {
    if (this.selectedMonth && this.selectedMonth !== "ALL") return this.selectedMonth;
    return "JUNI";
  },"""

if old_get_active in code:
    code = code.replace(old_get_active, new_get_active)
    print("Updated getActiveSaveMonth!")

# 4. Update getFullData so it doesn't delete months if user inputs them, but starts clean without trial data
old_get_full = """  getFullData: function() {
    // Purge old versions that contained trial data for JULI, AGUSTUS, SEPTEMBER
    try {
      localStorage.removeItem("DANAMULYA_LOGISTIK_FULL_V10");
      localStorage.removeItem("DANAMULYA_LOGISTIK_FULL_V9");
    } catch (e) {}

    const validMonths = ["JAN", "FEB", "MAR", "APRIL", "MEI", "JUNI"];
    let data = null;
    const stored = localStorage.getItem("DANAMULYA_LOGISTIK_FULL_V12");
    if (stored) {
      try {
        data = JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse logistik full data from localStorage", e);
      }
    }
    if (!data) {
      data = JSON.parse(JSON.stringify(this.defaultFullData));
    }
    
    // Strict sanitization: Delete any trial month keys not in Excel
    Object.keys(data).forEach(k => {
      if (!validMonths.includes(k)) {
        delete data[k];
      }
    });
    return data;
  },"""

new_get_full = """  getFullData: function() {
    // Purge old versions that contained trial dummy data for JULI, AGUSTUS, SEPTEMBER
    try {
      localStorage.removeItem("DANAMULYA_LOGISTIK_FULL_V10");
      localStorage.removeItem("DANAMULYA_LOGISTIK_FULL_V9");
    } catch (e) {}

    let data = null;
    const stored = localStorage.getItem("DANAMULYA_LOGISTIK_FULL_V12");
    if (stored) {
      try {
        data = JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse logistik full data from localStorage", e);
      }
    }
    if (!data) {
      data = JSON.parse(JSON.stringify(this.defaultFullData));
    }
    return data;
  },"""

if old_get_full in code:
    code = code.replace(old_get_full, new_get_full)
    print("Updated getFullData!")

# 5. Update ensureMonthData
old_ensure = """ensureMonthData: function(allData, monthKey) {
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
  },"""

new_ensure = """ensureMonthData: function(allData, monthKey) {
    if (!monthKey || monthKey === "ALL") {
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
  },"""

if old_ensure in code:
    code = code.replace(old_ensure, new_ensure)
    print("Updated ensureMonthData!")

file_path.write_text(code, encoding="utf-8")
print("Done updating logistik.js with 12 months dropdown & clean data!")
