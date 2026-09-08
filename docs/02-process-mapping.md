# DOCS 02 — MAPPING PROSES BISNIS (KOPERASI & DEPOT SUSU)

> Project: Sistem Digital Koperasi Danamulya  
> Versi: 1.0  
> Status: Terverifikasi berdasarkan Hasil Audit Excel Tahap 1  

---

## 1. DOKUMEN MAPPING PROSES

Dokumen ini memetakan seluruh alur bisnis, input, validasi, transaksi, perhitungan otomatis, dan rekapitulasi untuk **Divisi Koperasi** dan **Divisi Depot Susu**.

---

## 2. MAPPING PROSES DIVISI KOPERASI

### A. Alur Penerimaan Susu (Koperasi)

```
[USER KOPERASI]
      ↓
[FORM INPUT PENERIMAAN]
      ↓
[VALIDASI BACKEND]
      ↓
[SIMPAN KOPERASI_PENERIMAAN]
      ↓
[PERHITUNGAN OTOMATIS (TOTAL KG & RP)]
      ↓
[REKAP PENERIMAAN BULANAN]
```

#### Detail Field & Aturan Perhitungan Penerimaan:
1. **Kategori Sumber Susu**:
   - **Dari Anggota (Kelompok)**:
     - Input: Tanggal, Nama Kelompok (Cembor, Claket, Mligi, Kambengan, dll.), Jumlah KG.
     - Harga per KG: Tidak dihitung per transaksi harian anggota (terhitung di rekap/sistem simpanan).
     - Otomatis: Sum KG per kelompok.
   - **Dari Non-Anggota (Wilayah)**:
     - Input: Tanggal, Nama Wilayah (Tawar, Prambon, Brangkal, Krian, Mojosari, dll.), Jumlah KG, Harga per KG (Dinamis: Rp 7.000 - Rp 8.000).
     - Otomatis: `Total Rupiah = Jumlah KG × Harga per KG`.
2. **Formula Rekap Penerimaan**:
   - `Total KG Anggota = SUM(KG Anggota)`
   - `Total KG Non-Anggota = SUM(KG Non-Anggota)`
   - `Total KG Penerimaan = Total KG Anggota + Total KG Non-Anggota`
   - `Total Rp Penerimaan = SUM(Total Rp Non-Anggota)`

---

### B. Alur Pengeluaran / Penjualan Susu (Koperasi)

```
[USER KOPERASI]
      ↓
[FORM INPUT PENGELUARAN]
      ↓
[VALIDASI BACKEND]
      ↓
[SIMPAN KOPERASI_PENGELUARAN]
      ↓
[PERHITUNGAN OTOMATIS (PENJUALAN VS LAIN-LAIN)]
      ↓
[REKAP PENGELUARAN BULANAN]
```

#### Detail Field & Aturan Perhitungan Pengeluaran:
1. **Kategori Tujuan Pengeluaran**:
   - **Penjualan (Komunal / Perusahaan / Agen)**:
     - Input: Tanggal, Nama Pembeli (Nestle, Lokal, Agen, RS Dr. Soetomo, Sampurna, Alfan, Didik, dll.), Jumlah KG, Harga per KG.
     - Otomatis: `Total Rupiah = Jumlah KG × Harga per KG`.
   - **Lain-lain (Pengeluaran Non-Komersial)**:
     - Input: Tanggal, Jenis (Pecah/Rusak, Sosial/Sumbangan, Karyawan), Jumlah KG.
     - Harga per KG & Total Rupiah: `0` (Tidak menghasilkan uang).
2. **Formula Rekap Pengeluaran**:
   - `Total KG Penjualan = SUM(KG Penjualan)`
   - `Total Rp Penjualan = SUM(Total Rp Penjualan)`
   - `Total KG Lain-lain = SUM(KG Lain-lain)`
   - `Total KG Pengeluaran Keseluruhan = Total KG Penjualan + Total KG Lain-lain`

---

### C. Alur Laporan Penerimaan & Pengeluaran (Neraca Koperasi)

1. **Konsolidasi Bulanan**:
   - Mengambil `Total KG Penerimaan` dan `Total KG Pengeluaran` pada periode bulan & tahun yang dipilih.
2. **Formula Konversi Densitas KG ke Liter (GOLDEN RULE)**:
   $$\text{Liter} = \frac{\text{KG}}{1.025}$$
   *Catatan: Angka 1.025 adalah faktor densitas susu murni standar yang dipakai pada Excel asli.*
3. **Perhitungan Susut / Selisih Liter**:
   $$\text{Selisih Liter} = \text{Liter Penerimaan} - \text{Liter Pengeluaran}$$

---

## 3. MAPPING PROSES DIVISI DEPOT SUSU

```
[USER DEPOT]
      ↓
[INPUT TRANSAKSI DEPOT]
  ├── A. Pembelian dari Processing
  ├── B. Penjualan Agen/Pelanggan
  ├── C. Pengeluaran Lain-lain / Susut / Sosial
  └── D. Biaya Operasional Depot
      ↓
[VALIDASI BACKEND]
      ↓
[SIMPAN KE TABEL DEPOT RESPECTIVE]
      ↓
[PERHITUNGAN OTOMATIS STOK & OPERASIONAL]
      ↓
[REKAP BULANAN DEPOT]
```

### A. Pembelian dari Processing
- **Input Manual**: Tanggal, Harga per KG, Total KG.
- **Perhitungan Otomatis**:
  - `Faktor Densitas = 1.025`
  - `Jumlah Liter = Total KG / 1.025`
  - `Total Rupiah Pembelian = Total KG × Harga per KG`

### B. Penjualan pada Agen / Pelanggan
- **Input Manual**: Tanggal, Nama Agen (Heru, Jainal, Yuli, dll.), Harga per Liter, Jumlah Liter.
- **Perhitungan Otomatis**:
  - `Total Rupiah Penjualan = Jumlah Liter × Harga per Liter`

### C. Pengeluaran Lain-lain / Susut / Sosial
- **Input Manual**: Tanggal, Jenis (Sosial Botol, Sosial Liter, Susut, Susu Rusak), Jumlah Item/Liter, Keterangan.
- **Perhitungan Otomatis**:
  - Aggregasi total liter pengeluaran non-penjualan.

### D. Biaya Operasional Depot
- **Input Manual**: Tanggal, Nama Barang/Jenis (Plastik, LPG, Gula, Lemburan, Galon, Kresek, dll.), Nominal Biaya (Rp).
- **Perhitungan Otomatis**:
  - `Total Biaya Operasional = SUM(Nominal Biaya)`

### E. Rekapitulasi Stok Susu Depot (Baris 30-34 Excel Depot)
- `Total Pengeluaran Liter = Penjualan Agen (Liter) + Pengeluaran Lain-lain (Liter)`
- `Stok Susu Teoretis (Liter) = (Stok Awal Liter + Pembelian Liter) - Total Pengeluaran Liter`
- `Stok Riil (Liter) = Input Opname Fisik`
- `Selisih Stok = Stok Teoretis - Stok Riil`

---

## 4. DIVISI LOGISTIK

- **STATUS**: `LOGISTIK_PENDING`
- **Aturan**: Tidak ada mapping proses yang dibuat sampai file Excel Logistik resmi diserahkan.
