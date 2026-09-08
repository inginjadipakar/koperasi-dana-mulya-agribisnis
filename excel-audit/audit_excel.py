#!/usr/bin/env python3
"""
============================================================
AUDIT EXCEL — KOPERASI DANAMULYA
============================================================
Script ini membaca file Excel TANPA mengubah file asli.
Output berupa laporan Markdown di folder reports/.

Dijalankan: python audit_excel.py

Dependensi: openpyxl, pandas (opsional)
============================================================
"""

import os
import sys
from pathlib import Path
from datetime import datetime, date, time
from collections import defaultdict

try:
    import openpyxl
    from openpyxl.utils import get_column_letter
except ImportError:
    print("ERROR: openpyxl belum terinstall.")
    print("Jalankan: pip install openpyxl")
    sys.exit(1)

# ============================================================
# KONFIGURASI
# ============================================================

# Root folder project
PROJECT_ROOT = Path(__file__).parent.parent

# Folder output
REPORTS_DIR = Path(__file__).parent / "reports"

# File Excel yang diaudit
EXCEL_FILES = {
    "koperasi": [
        "LAPORAN PENGGURUS 2026.xlsx",
        "LAPORAN BULANAN PENERIMAAN SUSU 2026.xlsx",
        "LAPORAN PENERIMAAN DAN PENGELUARAN SUSU 2026.xlsx",
    ],
    "depot": [
        "LAPORAN BULANAN 2026 DEPOT SUSU.xlsx",
    ],
    # Logistik: FILE BELUM TERSEDIA
}


# ============================================================
# UTILITY FUNCTIONS
# ============================================================

def safe_str(value):
    """Konversi value ke string yang aman untuk markdown."""
    if value is None:
        return "(kosong)"
    if isinstance(value, (date, datetime)):
        return str(value)
    if isinstance(value, time):
        return str(value)
    if isinstance(value, float):
        if value == int(value):
            return str(int(value))
        return str(value)
    return str(value)


def detect_value_type(value, number_format=None):
    """Deteksi tipe data dari cell value dan format."""
    if value is None:
        return "KOSONG"
    if isinstance(value, bool):
        return "BOOLEAN"
    if isinstance(value, (int, float)):
        if number_format:
            nf_lower = str(number_format).lower()
            if any(k in nf_lower for k in ['rp', '#,##0', 'idr', '"rp"']):
                return "RUPIAH"
            if '%' in str(number_format):
                return "PERSENTASE"
            if any(k in nf_lower for k in ['dd', 'mm', 'yy', 'date']):
                return "TANGGAL (format angka)"
        return "ANGKA"
    if isinstance(value, datetime):
        return "TANGGAL/WAKTU"
    if isinstance(value, date):
        return "TANGGAL"
    if isinstance(value, time):
        return "WAKTU"
    if isinstance(value, str):
        val = value.strip()
        if not val:
            return "STRING KOSONG"
        # Deteksi satuan umum
        val_lower = val.lower()
        if any(k in val_lower for k in ['kg', 'kilogram']):
            return "STRING (mungkin KG)"
        if any(k in val_lower for k in ['ltr', 'liter', 'lt']):
            return "STRING (mungkin LITER)"
        return "STRING"
    return f"TIPE: {type(value).__name__}"


def format_number_analysis(number_format):
    """Analisis number format Excel."""
    if number_format is None or number_format == "General":
        return "General"
    return str(number_format)


# ============================================================
# AUDIT CORE
# ============================================================

def audit_workbook(filepath):
    """Audit lengkap satu workbook. Return dict hasil audit."""
    result = {
        "filepath": str(filepath),
        "filename": filepath.name,
        "filesize_kb": round(filepath.stat().st_size / 1024, 1),
        "sheets": [],
        "errors": [],
    }

    try:
        # Buka workbook (data_only=False untuk baca formula)
        wb = openpyxl.load_workbook(str(filepath), data_only=False)
        
        # Buka juga versi data_only untuk baca hasil formula
        wb_data = openpyxl.load_workbook(str(filepath), data_only=True)
    except Exception as e:
        result["errors"].append(f"Gagal membuka file: {e}")
        return result

    result["sheet_names"] = wb.sheetnames
    result["defined_names"] = []
    
    # Named ranges
    if wb.defined_names:
        for name in wb.defined_names.definedName:
            result["defined_names"].append({
                "name": name.name,
                "value": str(name.attr_text),
            })

    for sheet_name in wb.sheetnames:
        ws = wb[sheet_name]
        ws_data = wb_data[sheet_name]

        sheet_info = audit_sheet(ws, ws_data, sheet_name)
        result["sheets"].append(sheet_info)

    wb.close()
    wb_data.close()

    return result


def audit_sheet(ws, ws_data, sheet_name):
    """Audit satu worksheet."""
    info = {
        "name": sheet_name,
        "dimensions": ws.dimensions,
        "max_row": ws.max_row,
        "max_col": ws.max_column,
        "sheet_state": ws.sheet_state,  # visible, hidden, veryHidden
        "merged_cells": [],
        "formulas": [],
        "hidden_rows": [],
        "hidden_cols": [],
        "headers": [],
        "data_sample": [],
        "number_formats": defaultdict(int),
        "column_analysis": [],
        "data_validations": [],
        "empty_columns": [],
        "notes": [],
    }

    # --- Sheet visibility ---
    if ws.sheet_state != 'visible':
        info["notes"].append(f"[!] Sheet ini HIDDEN (state: {ws.sheet_state})")

    # --- Merged cells ---
    for merged_range in ws.merged_cells.ranges:
        info["merged_cells"].append(str(merged_range))

    # --- Hidden rows ---
    if ws.row_dimensions:
        for row_idx, rd in ws.row_dimensions.items():
            if rd.hidden:
                info["hidden_rows"].append(row_idx)

    # --- Hidden columns ---
    if ws.column_dimensions:
        for col_key, cd in ws.column_dimensions.items():
            if cd.hidden:
                info["hidden_cols"].append(col_key)

    # --- Data validations ---
    if ws.data_validations and ws.data_validations.dataValidation:
        for dv in ws.data_validations.dataValidation:
            info["data_validations"].append({
                "range": str(dv.sqref),
                "type": dv.type,
                "formula1": str(dv.formula1) if dv.formula1 else None,
                "formula2": str(dv.formula2) if dv.formula2 else None,
                "allow_blank": dv.allow_blank,
            })

    # --- Scan all cells ---
    formulas_found = []
    number_format_samples = defaultdict(list)

    for row in ws.iter_rows(min_row=1, max_row=ws.max_row, max_col=ws.max_column):
        for cell in row:
            if cell.value is None:
                continue

            # Number format
            nf = cell.number_format
            if nf and nf != "General":
                info["number_formats"][nf] += 1
                if len(number_format_samples[nf]) < 3:
                    number_format_samples[nf].append(f"{cell.coordinate}: {safe_str(cell.value)}")

            # Formula detection
            if isinstance(cell.value, str) and cell.value.startswith("="):
                # Ambil hasil formula dari wb_data
                data_cell = ws_data[cell.coordinate]
                formulas_found.append({
                    "cell": cell.coordinate,
                    "formula": cell.value,
                    "result": safe_str(data_cell.value),
                    "number_format": nf if nf != "General" else None,
                })

    info["formulas"] = formulas_found
    info["number_format_samples"] = dict(number_format_samples)

    # --- Header detection (cari baris pertama non-kosong) ---
    header_row = None
    for row_idx in range(1, min(ws.max_row + 1, 20)):  # Cek 20 baris pertama
        row_values = []
        non_empty = 0
        for col_idx in range(1, ws.max_column + 1):
            val = ws.cell(row=row_idx, column=col_idx).value
            row_values.append(safe_str(val))
            if val is not None:
                non_empty += 1
        if non_empty >= 2:  # Minimal 2 kolom terisi
            if header_row is None:
                header_row = row_idx
                info["header_row_idx"] = row_idx
                info["headers"] = row_values
                break

    # --- Column analysis ---
    if header_row:
        for col_idx in range(1, ws.max_column + 1):
            col_letter = get_column_letter(col_idx)
            header_val = ws.cell(row=header_row, column=col_idx).value
            
            col_info = {
                "column": col_letter,
                "header": safe_str(header_val),
                "data_types": defaultdict(int),
                "has_formula": False,
                "sample_values": [],
                "non_empty_count": 0,
                "classification": "BELUM DITENTUKAN",  # INPUT MANUAL / HASIL OTOMATIS
            }

            has_any_formula = False
            all_formula = True
            sample_count = 0

            for row_idx in range(header_row + 1, ws.max_row + 1):
                cell = ws.cell(row=row_idx, column=col_idx)
                if cell.value is not None:
                    col_info["non_empty_count"] += 1
                    dtype = detect_value_type(cell.value, cell.number_format)
                    col_info["data_types"][dtype] += 1

                    if isinstance(cell.value, str) and cell.value.startswith("="):
                        has_any_formula = True
                    else:
                        all_formula = False

                    if sample_count < 5:
                        data_cell = ws_data.cell(row=row_idx, column=col_idx)
                        sample_val = safe_str(data_cell.value) if data_cell.value is not None else safe_str(cell.value)
                        col_info["sample_values"].append(f"Row {row_idx}: {sample_val}")
                        sample_count += 1
                else:
                    all_formula = False

            col_info["has_formula"] = has_any_formula
            
            # Klasifikasi
            if col_info["non_empty_count"] == 0:
                col_info["classification"] = "KOLOM KOSONG"
                info["empty_columns"].append(col_letter)
            elif has_any_formula and all_formula:
                col_info["classification"] = "HASIL OTOMATIS (formula)"
            elif has_any_formula:
                col_info["classification"] = "CAMPURAN (ada formula & manual)"
            else:
                col_info["classification"] = "INPUT MANUAL"

            # Convert defaultdict to dict for serialization
            col_info["data_types"] = dict(col_info["data_types"])
            info["column_analysis"].append(col_info)

    # --- Data sample (5 baris pertama setelah header) ---
    if header_row:
        for row_idx in range(header_row + 1, min(header_row + 6, ws.max_row + 1)):
            row_data = []
            for col_idx in range(1, ws.max_column + 1):
                data_cell = ws_data.cell(row=row_idx, column=col_idx)
                cell = ws.cell(row=row_idx, column=col_idx)
                val = data_cell.value if data_cell.value is not None else cell.value
                row_data.append(safe_str(val))
            info["data_sample"].append({
                "row": row_idx,
                "values": row_data,
            })
    
    # --- Cek semua baris (termasuk sebelum header) untuk konteks ---
    info["pre_header_content"] = []
    if header_row and header_row > 1:
        for row_idx in range(1, header_row):
            row_vals = []
            for col_idx in range(1, min(ws.max_column + 1, 15)):
                val = ws.cell(row=row_idx, column=col_idx).value
                if val is not None:
                    row_vals.append(f"{get_column_letter(col_idx)}{row_idx}: {safe_str(val)}")
            if row_vals:
                info["pre_header_content"].append(row_vals)

    # --- Cek baris terakhir (mungkin total/summary) ---
    info["tail_content"] = []
    tail_start = max(header_row + 1 if header_row else 1, ws.max_row - 5)
    for row_idx in range(tail_start, ws.max_row + 1):
        row_vals = []
        for col_idx in range(1, min(ws.max_column + 1, 15)):
            cell = ws.cell(row=row_idx, column=col_idx)
            data_cell = ws_data.cell(row=row_idx, column=col_idx)
            val = cell.value
            result_val = data_cell.value
            
            if val is not None:
                if isinstance(val, str) and val.startswith("="):
                    row_vals.append(f"{get_column_letter(col_idx)}{row_idx}: FORMULA={val} -> HASIL={safe_str(result_val)}")
                else:
                    row_vals.append(f"{get_column_letter(col_idx)}{row_idx}: {safe_str(val)}")
        if row_vals:
            info["tail_content"].append(row_vals)

    return info


# ============================================================
# REPORT GENERATOR
# ============================================================

def generate_report(division, audit_results):
    """Generate laporan Markdown untuk satu divisi."""
    lines = []
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    lines.append(f"# AUDIT EXCEL — {division.upper()}")
    lines.append(f"")
    lines.append(f"> Tanggal audit: {timestamp}")
    lines.append(f"> Script: audit_excel.py")
    lines.append(f"> Mode: READ ONLY (file asli TIDAK diubah)")
    lines.append(f"")
    lines.append(f"---")
    lines.append(f"")

    for audit in audit_results:
        lines.append(f"## FILE: {audit['filename']}")
        lines.append(f"")
        lines.append(f"- **Path**: `{audit['filepath']}`")
        lines.append(f"- **Ukuran**: {audit['filesize_kb']} KB")
        lines.append(f"- **Jumlah Sheet**: {len(audit.get('sheet_names', []))}")
        lines.append(f"- **Nama Sheet**: {', '.join(audit.get('sheet_names', []))}")
        lines.append(f"")

        if audit.get("errors"):
            lines.append(f"### ⛔ ERROR")
            for err in audit["errors"]:
                lines.append(f"- {err}")
            lines.append(f"")
            continue

        # Named ranges
        if audit.get("defined_names"):
            lines.append(f"### Named Ranges / Defined Names")
            for dn in audit["defined_names"]:
                lines.append(f"- `{dn['name']}` → `{dn['value']}`")
            lines.append(f"")

        # Per-sheet detail
        for sheet in audit["sheets"]:
            lines.append(f"### SHEET: {sheet['name']}")
            lines.append(f"")
            
            # Basic info
            lines.append(f"| Properti | Nilai |")
            lines.append(f"|---|---|")
            lines.append(f"| Dimensi | {sheet['dimensions']} |")
            lines.append(f"| Max Baris | {sheet['max_row']} |")
            lines.append(f"| Max Kolom | {sheet['max_col']} |")
            lines.append(f"| Visibilitas | {sheet['sheet_state']} |")
            lines.append(f"| Merged Cells | {len(sheet['merged_cells'])} |")
            lines.append(f"| Formula | {len(sheet['formulas'])} |")
            lines.append(f"| Hidden Rows | {len(sheet['hidden_rows'])} |")
            lines.append(f"| Hidden Cols | {len(sheet['hidden_cols'])} |")
            lines.append(f"")

            # Notes
            if sheet.get("notes"):
                for note in sheet["notes"]:
                    lines.append(f"> {note}")
                lines.append(f"")

            # Pre-header content
            if sheet.get("pre_header_content"):
                lines.append(f"#### Konten Sebelum Header")
                lines.append(f"")
                for row_vals in sheet["pre_header_content"]:
                    for val in row_vals:
                        lines.append(f"- `{val}`")
                lines.append(f"")

            # Merged cells
            if sheet["merged_cells"]:
                lines.append(f"#### Merged Cells")
                lines.append(f"")
                for mc in sheet["merged_cells"]:
                    lines.append(f"- `{mc}`")
                lines.append(f"")

            # Hidden rows/cols
            if sheet["hidden_rows"]:
                lines.append(f"#### Hidden Rows")
                lines.append(f"")
                lines.append(f"- Baris: {', '.join(str(r) for r in sheet['hidden_rows'])}")
                lines.append(f"")

            if sheet["hidden_cols"]:
                lines.append(f"#### Hidden Columns")
                lines.append(f"")
                lines.append(f"- Kolom: {', '.join(str(c) for c in sheet['hidden_cols'])}")
                lines.append(f"")

            # Headers
            if sheet.get("headers"):
                lines.append(f"#### Header (Baris {sheet.get('header_row_idx', '?')})")
                lines.append(f"")
                for i, h in enumerate(sheet["headers"]):
                    col_letter = get_column_letter(i + 1)
                    lines.append(f"- **{col_letter}**: {h}")
                lines.append(f"")

            # Column analysis
            if sheet.get("column_analysis"):
                lines.append(f"#### Analisis Kolom")
                lines.append(f"")
                lines.append(f"| Kolom | Header | Klasifikasi | Tipe Data | Isi |")
                lines.append(f"|---|---|---|---|---|")
                for col in sheet["column_analysis"]:
                    types_str = ", ".join(f"{k}({v})" for k, v in col["data_types"].items())
                    lines.append(f"| {col['column']} | {col['header']} | {col['classification']} | {types_str} | {col['non_empty_count']} baris |")
                lines.append(f"")

                # Detail per kolom
                lines.append(f"#### Detail Kolom & Sample Data")
                lines.append(f"")
                for col in sheet["column_analysis"]:
                    if col["non_empty_count"] == 0:
                        continue
                    lines.append(f"##### Kolom {col['column']}: {col['header']}")
                    lines.append(f"")
                    lines.append(f"- **Klasifikasi**: {col['classification']}")
                    lines.append(f"- **Jumlah data**: {col['non_empty_count']} baris")
                    lines.append(f"- **Tipe data**: {', '.join(f'{k}({v})' for k, v in col['data_types'].items())}")
                    if col["sample_values"]:
                        lines.append(f"- **Sample**:")
                        for sv in col["sample_values"]:
                            lines.append(f"  - `{sv}`")
                    lines.append(f"")

            # Number formats
            nf_dict = dict(sheet["number_formats"])
            if nf_dict:
                lines.append(f"#### Format Angka yang Digunakan")
                lines.append(f"")
                lines.append(f"| Format | Jumlah Cell | Contoh |")
                lines.append(f"|---|---|---|")
                samples = sheet.get("number_format_samples", {})
                for fmt, count in sorted(nf_dict.items(), key=lambda x: -x[1]):
                    sample_list = samples.get(fmt, [])
                    sample_str = "; ".join(sample_list[:2]) if sample_list else "-"
                    # Escape pipe characters in format strings
                    fmt_escaped = fmt.replace("|", "\\|")
                    lines.append(f"| `{fmt_escaped}` | {count} | {sample_str} |")
                lines.append(f"")

            # Formulas
            if sheet["formulas"]:
                lines.append(f"#### Formula yang Ditemukan ({len(sheet['formulas'])} formula)")
                lines.append(f"")
                # Group by unique formula pattern
                formula_patterns = defaultdict(list)
                for f in sheet["formulas"]:
                    formula_patterns[f["formula"]].append(f)

                # Show unique patterns (max 30)
                shown = 0
                for formula, cells in sorted(formula_patterns.items()):
                    if shown >= 30:
                        remaining = len(formula_patterns) - shown
                        lines.append(f"")
                        lines.append(f"*... dan {remaining} pola formula lainnya*")
                        break
                    
                    if len(cells) == 1:
                        c = cells[0]
                        lines.append(f"- `{c['cell']}`: `{c['formula']}` → **{c['result']}**")
                    else:
                        cell_refs = ", ".join(c["cell"] for c in cells[:5])
                        if len(cells) > 5:
                            cell_refs += f" ... (+{len(cells)-5} lainnya)"
                        lines.append(f"- `{formula}` digunakan di: {cell_refs}")
                        # Show first result
                        lines.append(f"  - Contoh hasil: **{cells[0]['result']}**")
                    shown += 1
                lines.append(f"")

            # Data validations
            if sheet.get("data_validations"):
                lines.append(f"#### Data Validation")
                lines.append(f"")
                for dv in sheet["data_validations"]:
                    lines.append(f"- **Range**: `{dv['range']}` | Type: `{dv['type']}`")
                    if dv["formula1"]:
                        lines.append(f"  - Formula1: `{dv['formula1']}`")
                    if dv["formula2"]:
                        lines.append(f"  - Formula2: `{dv['formula2']}`")
                lines.append(f"")

            # Data sample
            if sheet.get("data_sample"):
                lines.append(f"#### Sample Data (5 baris pertama)")
                lines.append(f"")
                headers = sheet.get("headers", [])
                if headers:
                    # Build table
                    # Limit columns displayed
                    max_display_cols = min(len(headers), 12)
                    header_line = "| " + " | ".join(headers[:max_display_cols]) + " |"
                    sep_line = "|" + "|".join(["---"] * max_display_cols) + "|"
                    lines.append(header_line)
                    lines.append(sep_line)
                    for sample in sheet["data_sample"]:
                        vals = sample["values"][:max_display_cols]
                        # Escape pipe characters
                        vals = [v.replace("|", "\\|") for v in vals]
                        lines.append("| " + " | ".join(vals) + " |")
                    if len(headers) > 12:
                        lines.append(f"")
                        lines.append(f"*Catatan: {len(headers) - 12} kolom lainnya tidak ditampilkan*")
                lines.append(f"")

            # Tail content (baris terakhir)
            if sheet.get("tail_content"):
                lines.append(f"#### Baris Terakhir (kemungkinan Total/Summary)")
                lines.append(f"")
                for row_vals in sheet["tail_content"]:
                    for val in row_vals:
                        lines.append(f"- `{val}`")
                    lines.append(f"")

            # Empty columns
            if sheet.get("empty_columns"):
                lines.append(f"#### Kolom Kosong")
                lines.append(f"")
                lines.append(f"- {', '.join(sheet['empty_columns'])}")
                lines.append(f"")

            lines.append(f"---")
            lines.append(f"")

    return "\n".join(lines)


def generate_cross_reference_analysis(all_audits):
    """Analisis hubungan antar file/sheet."""
    lines = []
    lines.append(f"## ANALISIS HUBUNGAN ANTAR-FILE")
    lines.append(f"")
    
    # Collect all formula references to other sheets
    cross_refs = []
    for division, audits in all_audits.items():
        for audit in audits:
            for sheet in audit.get("sheets", []):
                for formula in sheet.get("formulas", []):
                    f = formula["formula"]
                    # Check if formula references another sheet
                    if "!" in f and not f.startswith("=!"):
                        cross_refs.append({
                            "file": audit["filename"],
                            "sheet": sheet["name"],
                            "cell": formula["cell"],
                            "formula": f,
                            "result": formula["result"],
                        })
    
    if cross_refs:
        lines.append(f"### Formula Antar-Sheet")
        lines.append(f"")
        for ref in cross_refs:
            lines.append(f"- **{ref['file']}** → Sheet `{ref['sheet']}` → Cell `{ref['cell']}`")
            lines.append(f"  - Formula: `{ref['formula']}`")
            lines.append(f"  - Hasil: {ref['result']}")
        lines.append(f"")
    else:
        lines.append(f"Tidak ditemukan formula antar-sheet yang eksplisit.")
        lines.append(f"")
    
    return "\n".join(lines)


# ============================================================
# MAIN
# ============================================================

def main():
    print("=" * 60)
    print("AUDIT EXCEL - KOPERASI DANAMULYA")
    print("=" * 60)
    print()
    print(f"Project root: {PROJECT_ROOT}")
    print(f"Reports dir:  {REPORTS_DIR}")
    print()

    # Buat folder reports
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)

    # Cek file Excel
    print("Memeriksa file Excel...")
    print()

    all_found_files = list(PROJECT_ROOT.glob("*.xlsx"))
    print(f"File .xlsx ditemukan di root: {len(all_found_files)}")
    for f in all_found_files:
        print(f"  - {f.name} ({round(f.stat().st_size/1024, 1)} KB)")
    print()

    # Audit per divisi
    all_audits = {}

    for division, files in EXCEL_FILES.items():
        print(f"--- DIVISI: {division.upper()} ---")
        division_audits = []

        for filename in files:
            filepath = PROJECT_ROOT / filename
            if not filepath.exists():
                print(f"  [!] FILE TIDAK DITEMUKAN: {filename}")
                division_audits.append({
                    "filepath": str(filepath),
                    "filename": filename,
                    "filesize_kb": 0,
                    "sheets": [],
                    "errors": [f"File tidak ditemukan: {filepath}"],
                })
                continue

            print(f"  [*] Mengaudit: {filename}...")
            audit = audit_workbook(filepath)
            division_audits.append(audit)
            
            sheet_count = len(audit.get("sheet_names", []))
            formula_count = sum(len(s.get("formulas", [])) for s in audit.get("sheets", []))
            print(f"      OK: {sheet_count} sheet, {formula_count} formula ditemukan")

        all_audits[division] = division_audits

        # Generate report
        report_content = generate_report(division, division_audits)
        
        # Tambah cross-reference di akhir
        if division == "koperasi":
            report_content += "\n" + generate_cross_reference_analysis({"koperasi": division_audits})
        
        report_path = REPORTS_DIR / f"{division}.md"
        report_path.write_text(report_content, encoding="utf-8")
        print(f"  [>] Laporan disimpan: {report_path}")
        print()

    # Logistik placeholder
    logistik_content = f"""# AUDIT EXCEL — LOGISTIK

> Tanggal audit: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

## STATUS: FILE BELUM TERSEDIA

Excel Logistik **BELUM TERSEDIA**.

Struktur dan implementasi Logistik **TIDAK DIBUAT** sampai file Excel diterima.

### [PERLU KONFIRMASI]

1. **File apa** yang digunakan divisi Logistik untuk pencatatan?
2. **Format laporan** seperti apa yang digunakan?
3. **Jenis transaksi** apa saja yang dicatat?
4. **Periode pelaporan** (harian/mingguan/bulanan)?

> ⚠️ JANGAN membuat asumsi tentang struktur data Logistik.
> Audit WAJIB dilakukan setelah file diterima.
"""
    logistik_path = REPORTS_DIR / "logistik.md"
    logistik_path.write_text(logistik_content, encoding="utf-8")
    print(f"--- DIVISI: LOGISTIK ---")
    print(f"  [!] File Logistik BELUM TERSEDIA. Placeholder dibuat.")
    print(f"  [>] Laporan disimpan: {logistik_path}")
    print()

    # Summary
    print("=" * 60)
    print("AUDIT SELESAI")
    print("=" * 60)
    print()
    print("Laporan tersedia di:")
    for division in list(EXCEL_FILES.keys()) + ["logistik"]:
        print(f"  - reports/{division}.md")
    print()
    print("LANGKAH BERIKUTNYA:")
    print("  Tinjau laporan audit sebelum melanjutkan ke tahap berikutnya.")
    print()


if __name__ == "__main__":
    main()
