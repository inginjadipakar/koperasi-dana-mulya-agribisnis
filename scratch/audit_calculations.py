#!/usr/bin/env python3
from pathlib import Path
import re

PROJECT_ROOT = Path(r"c:\Users\HP\Desktop\KKN SIE ACARA\Proker UMKM\Koperasidanamulya")

files_to_check = [
    PROJECT_ROOT / "js" / "koperasi.js",
    PROJECT_ROOT / "js" / "depot.js",
    PROJECT_ROOT / "js" / "recap.js",
    PROJECT_ROOT / "js" / "api.js",
    PROJECT_ROOT / "apps-script" / "code.gs",
    PROJECT_ROOT / "apps-script" / "config.gs",
]

print("============================================================")
print("AUDIT LOGIKA PERHITUNGAN DAN KONSTANTA BISNIS")
print("============================================================\n")

density_factor = 1.025

for fpath in files_to_check:
    if not fpath.exists():
        print(f"[MISSING] {fpath.name}")
        continue
    
    content = fpath.read_text(encoding="utf-8")
    print(f"--- MEMERIKSA FILE: {fpath.name} ---")
    
    # Check 1.025 density factor
    matches_1025 = re.findall(r"1\.025", content)
    print(f"  - Penggunaan faktor 1.025: {len(matches_1025)} kali ditemukan.")
    
    # Check division vs multiplication for density
    # Liter = KG / 1.025 or KG = Liter * 1.025
    div_matches = re.findall(r"(\w+)\s*/\s*1\.025", content)
    mul_matches = re.findall(r"(\w+)\s*\*\s*1\.025", content)
    
    if div_matches:
        print(f"    Conversion (KG -> Liter [/ 1.025]): {div_matches}")
    if mul_matches:
        print(f"    Conversion (Liter -> KG [* 1.025]): {mul_matches}")
        
    print("")

print("============================================================")
print("HASIL AUDIT SELESAI")
print("============================================================")
