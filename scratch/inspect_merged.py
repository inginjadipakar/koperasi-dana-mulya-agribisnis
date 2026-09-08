#!/usr/bin/env python3
from pathlib import Path
import openpyxl

PROJECT_ROOT = Path(r"c:\Users\HP\Desktop\KKN SIE ACARA\Proker UMKM\Koperasidanamulya")

files = [
    "2026-LAP LOGISTIK.xlsx",
    "LAPORAN PENGGURUS 2026.xlsx",
    "LAPORAN BULANAN 2026 DEPOT SUSU.xlsx",
    "LAPORAN BULANAN PENERIMAAN SUSU 2026.xlsx",
    "LAPORAN PENERIMAAN DAN PENGELUARAN SUSU 2026.xlsx"
]

print("============================================================")
print("INSPEKSI MERGED CELLS (GABUNGAN SEL EXCEL)")
print("============================================================\n")

for filename in files:
    filepath = PROJECT_ROOT / filename
    if not filepath.exists():
        continue
    wb = openpyxl.load_workbook(filepath, data_only=True)
    print(f"--- FILE: {filename} ---")
    for sname in wb.sheetnames:
        ws = wb[sname]
        merges = ws.merged_cells.ranges
        print(f"  Sheet: {sname:<12} | Total Merged Ranges: {len(merges)}")
        if len(merges) > 0:
            sample = [str(m) for m in list(merges)[:4]]
            print(f"    Sample Merges: {sample}")
