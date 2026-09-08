# DOCS 01 — HASIL AUDIT EXCEL KOPERASI & DEPOT SUSU

> Project: Sistem Digital Koperasi Danamulya  
> Versi: 1.0  
> Status: Terverifikasi (Read-Only Mode)  

---

## 1. RINGKASAN EXECUTION AUDIT EXCEL

Audit dilakukan menggunakan script Python `excel-audit/audit_excel.py` terhadap 4 file Excel asli:
1. `LAPORAN PENGGURUS 2026.xlsx` (Divisi Koperasi - Pengeluaran Susu)
2. `LAPORAN BULANAN PENERIMAAN SUSU 2026.xlsx` (Divisi Koperasi - Penerimaan Susu)
3. `LAPORAN PENERIMAAN DAN PENGELUARAN SUSU 2026.xlsx` (Divisi Koperasi - Rekap / Neraca Pembelian & Penjualan)
4. `LAPORAN BULANAN 2026 DEPOT SUSU.xlsx` (Divisi Depot Susu - Pembelian, Penjualan, Operasional, Stok)

---

## 2. HASIL AUDIT DIVISI KOPERASI

1. **`LAPORAN PENGGURUS 2026.xlsx` (Pengeluaran Susu)**:
   - **Sheet**: 7 Sheet (`Januari` - `JULI`).
   - **Temuan Hidden Column**: Kolom E tersembunyi! Berisi Harga per KG (Rp), Kolom D berisi KG, Kolom F menghitung Total Rp (`=D*E`).
   - **Kategori**: Penjualan Komunal (Nestle, Lokal, Agen, RS Dr Soetomo, Sampurna, Alfan, Didik) & Pengeluaran Lain-lain (Pecah/Rusak, Sosial/Sumbangan, Karyawan).
2. **`LAPORAN BULANAN PENERIMAAN SUSU 2026.xlsx` (Penerimaan Susu)**:
   - **Sheet**: 7 Sheet (`Januari` - `JULI`).
   - **Kategori**: Anggota (Kelompok Cembor, Claket, Mligi, Kambengan, dll.) & Non-Anggota (Tawar, Prambon, Brangkal, Krian, Mojosari).
   - **Perhitungan**: Non-Anggota menggunakan harga dinamis Rp 7.000 - Rp 8.000 per KG.
3. **`LAPORAN PENERIMAAN DAN PENGELUARAN SUSU 2026.xlsx` (Neraca Koperasi)**:
   - **Sheet**: 7 Sheet (`Januari` - `JULI`).
   - **Golden Rule Konversi**: $\text{Liter} = \text{KG} / 1.025$ (Faktor densitas $1.025$).

---

## 3. HASIL AUDIT DIVISI DEPOT SUSU

1. **`LAPORAN BULANAN 2026 DEPOT SUSU.xlsx`**:
   - **Sheet**: 13 Sheet (`JANUARI` - `juli`, `Sheet7` - `Sheet11`, `Sheet1`).
   - **Struktur 4 Blok Utama**:
     - *Pembelian Processing*: Harga/KG, KG, Faktor $1.025$, Liter ($\text{KG}/1.025$), Total Rp ($\text{KG} \times \text{Harga}$).
     - *Penjualan Agen*: Nama Agen (Heru, Jainal, Yuli, dll.), Harga/Liter, Liter, Total Rp ($\text{Liter} \times \text{Harga}$).
     - *Pengeluaran Lain-lain*: Sosial Botol, Sosial Liter, Susut, Susu Rusak.
     - *Biaya Operasional*: Plastik, LPG, Gula, Lemburan, Galon, Kresek, dll.
   - **Rekap Stok**: $\text{Stok Teoretis} = (\text{Stok Awal} + \text{Pembelian}) - \text{Total Pengeluaran}$.

---

## 4. DIVISI LOGISTIK

- **STATUS**: `LOGISTIK_PENDING` (File Excel belum tersedia).
