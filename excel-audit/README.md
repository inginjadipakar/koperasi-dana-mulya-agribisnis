# Excel Audit Tool — Koperasi Danamulya

## Deskripsi

Script Python untuk mengaudit file Excel asli Koperasi Danamulya.

**File asli TIDAK diubah.** Script hanya membaca (READ ONLY).

## Dependensi

```bash
pip install openpyxl pandas
```

## Cara Menjalankan

```bash
cd excel-audit
python audit_excel.py
```

## Output

```
excel-audit/
├── audit_excel.py      # Script audit
├── README.md           # Dokumentasi
└── reports/
    ├── koperasi.md     # Audit file Koperasi
    ├── depot.md        # Audit file Depot Susu
    └── logistik.md     # Placeholder (file belum tersedia)
```

## File Excel yang Diaudit

### Koperasi
1. `LAPORAN PENGGURUS 2026.xlsx`
2. `LAPORAN BULANAN PENERIMAAN SUSU 2026.xlsx`
3. `LAPORAN PENERIMAAN DAN PENGELUARAN SUSU 2026.xlsx`

### Depot Susu
1. `LAPORAN BULANAN 2026 DEPOT SUSU.xlsx`

### Logistik
- **BELUM TERSEDIA** — Tidak ada audit sampai file diterima.

## Yang Diaudit

- Workbook & worksheet
- Dimensi & jumlah baris/kolom
- Merged cells
- Hidden sheets, rows, columns
- Formula (termasuk formula antar-sheet)
- Hasil formula
- Format angka (Rupiah, %, tanggal, dll.)
- Data validation
- Named ranges
- Klasifikasi kolom: INPUT MANUAL vs HASIL OTOMATIS
- Sample data
- Baris summary/total
- Hubungan antar-file
