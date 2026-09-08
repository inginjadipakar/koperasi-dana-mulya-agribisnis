# DOCS 06 — ALUR REKAP OTOMATIS & PERIODE LAPORAN

> Project: Sistem Digital Koperasi Danamulya  
> Versi: 1.0  
> Core Principle: Dynamic Date-Driven Aggregation (Single Source of Truth)  

---

## 1. DYNAMIC DATE-DRIVEN RECAP

Rekapitulasi tidak bergantung pada penamaan sheet manual seperti "Juli".  
Setiap rekap dihitung secara otomatis berdasarkan parameter **Periode** (`Bulan` & `Tahun`) dari kolom `tanggal` transaksi (`YYYY-MM-DD`).

```
                              [FILTER: JULI 2026]
                                       │
        ┌──────────────────────────────┼──────────────────────────────┐
        ↓                              ↓                              ↓
[KOPERASI_TRANSACTIONS]        [DEPOT_TRANSACTIONS]        [LOGISTIK_TRANSACTIONS]
(Filter tanggal 01-31 Juli)   (Filter tanggal 01-31 Juli)   (Filter tanggal 01-31 Juli)
        │                              │                              │
        ↓                              ↓                              ↓
 [KOPERASI RECAP]                [DEPOT RECAP]                [LOGISTIK RECAP]
 - Total Penerimaan KG & Rp     - Pembelian Processing       - (Status: PENDING)
 - Total Pengeluaran KG & Rp    - Penjualan Agen
 - Konversi Liter (÷1.025)      - Biaya Operasional
 - Susut / Selisih Liter        - Stok Teoretis vs Riil
        │                              │                              │
        └──────────────────────────────┼──────────────────────────────┘
                                       ↓
                                [REKAP PUSAT]
                           (Dashboard / Export Excel)
```

---

## 2. FORMULA MATEMATIS REKAP BULANAN

### A. Rekap Koperasi (Periode M-Y)
1. **Total Penerimaan KG**:
   $$\text{Penerimaan KG} = \sum \text{jumlah\_kg} \quad \text{dimana kategori} = \text{ANGGOTA / NON\_ANGGOTA}$$
2. **Total Penerimaan Rp**:
   $$\text{Penerimaan Rp} = \sum \text{total\_rupiah} \quad \text{pada periode M-Y}$$
3. **Total Pengeluaran KG**:
   $$\text{Pengeluaran KG} = \sum \text{jumlah\_kg} \quad \text{dimana kategori} = \text{PENJUALAN / LAIN\_LAIN}$$
4. **Total Penjualan Rp**:
   $$\text{Penjualan Rp} = \sum \text{total\_rupiah} \quad \text{pada kategori PENJUALAN}$$
5. **Konversi Densitas KG ke Liter**:
   $$\text{Liter Penerimaan} = \frac{\text{Penerimaan KG}}{1.025}$$
   $$\text{Liter Pengeluaran} = \frac{\text{Pengeluaran KG}}{1.025}$$
6. **Selisih / Susut Liter**:
   $$\text{Selisih Liter} = \text{Liter Penerimaan} - \text{Liter Pengeluaran}$$

---

### B. Rekap Depot Susu (Periode M-Y)
1. **Total Pembelian Processing**:
   $$\text{Pembelian KG} = \sum \text{KG Pembelian}$$
   $$\text{Pembelian Liter} = \frac{\text{Pembelian KG}}{1.025}$$
   $$\text{Pembelian Rp} = \sum \text{Total Rp Pembelian}$$
2. **Total Penjualan Agen**:
   $$\text{Penjualan Liter} = \sum \text{Liter Penjualan Agen}$$
   $$\text{Penjualan Rp} = \sum \text{Total Rp Penjualan Agen}$$
3. **Total Operasional Depot**:
   $$\text{Biaya Operasional Rp} = \sum \text{Nominal Biaya Operasional}$$
4. **Stok Susu Depot**:
   $$\text{Stok Teoretis} = (\text{Stok Awal Liter} + \text{Pembelian Liter}) - (\text{Penjualan Liter} + \text{Pengeluaran Lain Liter})$$
   $$\text{Selisih Stok Opname} = \text{Stok Teoretis} - \text{Stok Riil Opname}$$

---

## 3. ALUR EXPORT EXCEL FINAL (`REKAP_JULI_2026.xlsx`)

Saat Admin mengeklik `[EXPORT EXCEL]` untuk periode Juli 2026:
1. Backend Google Apps Script mengeksekusi modul pembuat workbook XLSX (memanfaatkan library openpyxl/script-exporter).
2. Hasil ekspor disusun menjadi 4-5 Sheet rapi:
   - **Sheet 1**: `REKAP UTAMA` (Ringkasan Eksekutif Koperasi + Depot + Logistik).
   - **Sheet 2**: `KOPERASI` (Neraca & Rincian Penerimaan & Pengeluaran Susu).
   - **Sheet 3**: `DEPOT SUSU` (Rincian Pembelian, Penjualan Agen, Operasional & Stok).
   - **Sheet 4**: `LOGISTIK` (Status: Pending / Sesuai Excel Logistik kelak).
3. Seluruh cell di-format secara presisi:
   - Format Mata Uang: `Rp #,##0`
   - Format Volume: `#,##0.0 Liter` / `#,##0 KG`
   - Header & Total diberi style konsisten.
