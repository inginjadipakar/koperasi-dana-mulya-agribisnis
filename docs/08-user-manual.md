# DOCS 08 — PANDUAN PENGGUNA (USER MANUAL)

> Project: Sistem Digital Koperasi Danamulya  
> Versi: 1.0  

---

## 1. PANDUAN AKUN & LOGIN

### Akun Bawaan (Default Seed Accounts):
| Role | Username | Password Default | Akses Hak Jangkauan |
|---|---|---|---|
| **Admin Utama** | `admin` | `admin123` | Seluruh Divisi (Koperasi, Depot, Logistik, Rekap Pusat, Ekspor, Audit) |
| **Petugas Koperasi** | `koperasi01` | `koperasi123` | Divisi Koperasi (Penerimaan & Pengeluaran Susu) |
| **Petugas Depot Susu** | `depot01` | `depot123` | Divisi Depot Susu (Pembelian Processing, Penjualan Agen, Operasional) |

---

## 2. CARA PENGGUNAAN PER DIVISI

### A. Divisi Koperasi
1. **Penerimaan Susu**:
   - Pilih tab *Penerimaan Susu*.
   - Pilih Kategori (`ANGGOTA` atau `NON ANGGOTA`).
   - Jika `NON ANGGOTA`, masukkan `Harga per KG (Rp)`.
   - Masukkan `Jumlah (KG)` lalu klik **[Simpan Penerimaan]**.
2. **Pengeluaran Susu**:
   - Pilih tab *Pengeluaran Susu*.
   - Pilih Kategori (`PENJUALAN` atau `LAIN-LAIN`).
   - Masukkan Nama Tujuan & Jumlah KG lalu klik **[Simpan Pengeluaran]**.

### B. Divisi Depot Susu
1. **Pembelian Susu Processing**:
   - Masukkan `Harga per KG` & `Jumlah KG`.
   - Sistem otomatis menghitung Hasil Liter ($\text{KG}/1.025$) dan Total Rp.
2. **Penjualan Agen**:
   - Masukkan Nama Agen, `Harga per Liter`, & `Jumlah Liter`.
3. **Biaya Operasional**:
   - Catat pengeluaran operasional (Plastik, LPG, Gula, Lemburan, dll.).

### C. Admin Utama
1. **Dashboard Rekap Pusat**:
   - Memantau omset, penerimaan, pengeluaran, dan selisih neraca Koperasi + Depot.
   - Mengubah `Periode Laporan` (Filter Tanggal Mulai s.d. Selesai).
   - Klik **[Export Excel Final (.xlsx)]** untuk mengunduh laporan bulanan.
