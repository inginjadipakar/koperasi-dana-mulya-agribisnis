import shutil
from pathlib import Path

root = Path(r"c:\Users\HP\Desktop\KKN SIE ACARA\Proker UMKM\Koperasidanamulya")

files = [
    "2026-LAP LOGISTIK.xlsx",
    "LAPORAN BULANAN 2026 DEPOT SUSU.xlsx",
    "LAPORAN BULANAN PENERIMAAN SUSU 2026.xlsx",
    "LAPORAN PENERIMAAN DAN PENGELUARAN SUSU 2026.xlsx",
    "LAPORAN PENGGURUS 2026.xlsx"
]

months = ["JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI", "JULI", "AGUSTUS"]

for f_name in files:
    src = root / f_name
    if src.exists():
        base_name = src.stem
        ext = src.suffix
        for m in months:
            dst_name = f"{base_name} - {m}{ext}"
            dst = root / dst_name
            shutil.copy2(src, dst)
            print(f"Created file copy: {dst_name}")

print("All month-suffixed physical files created successfully!")
