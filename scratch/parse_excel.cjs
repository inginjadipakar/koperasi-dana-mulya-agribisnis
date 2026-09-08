const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const files = [
  "LAPORAN BULANAN 2026 DEPOT SUSU.xlsx",
  "LAPORAN BULANAN PENERIMAAN SUSU 2026.xlsx",
  "LAPORAN PENERIMAAN DAN PENGELUARAN SUSU 2026.xlsx",
  "LAPORAN PENGGURUS 2026.xlsx"
];

const dir = "c:\\Users\\HP\\Desktop\\KKN SIE ACARA\\Proker UMKM\\Koperasidanamulya";

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (fs.existsSync(filePath)) {
    console.log("\n==================================================");
    console.log("FILE:", file);
    console.log("==================================================");
    const workbook = xlsx.readFile(filePath);
    workbook.SheetNames.forEach(sheetName => {
      console.log(`\n--- SHEET: ${sheetName} ---`);
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
      data.slice(0, 15).forEach((row, idx) => {
        console.log(`Row ${idx+1}:`, JSON.stringify(row));
      });
    });
  } else {
    console.log("File not found:", file);
  }
});
