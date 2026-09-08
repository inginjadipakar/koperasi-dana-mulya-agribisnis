# DOCS 04 — ROLE & PERMISSION MATRIX

> Project: Sistem Digital Koperasi Danamulya  
> Versi: 1.0  

---

## 1. DAFTAR ROLE SISTEM

Sistem digital memiliki 4 role utama:
1. **`koperasi`**: Petugas/Pengurus Divisi Koperasi.
2. **`depot`**: Petugas/Pengelola Divisi Depot Susu.
3. **`logistik`**: Petugas/Pengelola Divisi Logistik.
4. **`admin`**: Pengurus Pusat / Admin Utama Koperasi Danamulya.

---

## 2. ROLE & PERMISSION MATRIX

| Fitur / Modul / Akses | Koperasi | Depot | Logistik | Admin |
|---|:---:|:---:|:---:|:---:|
| **Login Sistem** | ✓ | ✓ | ✓ | ✓ |
| **Lihat Data Koperasi** | ✓ | ✗ | ✗ | ✓ |
| **Input Transaksi Koperasi** | ✓ | ✗ | ✗ | ✓ |
| **Lihat Laporan/Rekap Koperasi** | ✓ | ✗ | ✗ | ✓ |
| **Lihat Data Depot** | ✗ | ✓ | ✗ | ✓ |
| **Input Transaksi Depot** | ✗ | ✓ | ✗ | ✓ |
| **Lihat Laporan/Rekap Depot** | ✗ | ✓ | ✗ | ✓ |
| **Lihat Data Logistik** | ✗ | ✗ | ✓ | ✓ |
| **Input Transaksi Logistik** | ✗ | ✗ | ✓ | ✓ |
| **Lihat Laporan/Rekap Logistik** | ✗ | ✗ | ✓ | ✓ |
| **Dashboard Rekap Pusat** | ✗ | ✗ | ✗ | ✓ |
| **Export Excel Final (.xlsx)** | ✗ | ✗ | ✗ | ✓ |
| **User Management** | ✗ | ✗ | ✗ | ✓ |
| **Lihat Audit Log** | ✗ | ✗ | ✗ | ✓ |

---

## 3. ATURAN DATA ISOLATION PER DIVISI

1. **User Koperasi**:
   - Meminta data Depot → Backend Response: `403 FORBIDDEN / DENIED`
   - Meminta data Logistik → Backend Response: `403 FORBIDDEN / DENIED`
   - Meminta Rekap Pusat → Backend Response: `403 FORBIDDEN / DENIED`

2. **User Depot**:
   - Meminta data Koperasi → Backend Response: `403 FORBIDDEN / DENIED`
   - Meminta data Logistik → Backend Response: `403 FORBIDDEN / DENIED`
   - Meminta Rekap Pusat → Backend Response: `403 FORBIDDEN / DENIED`

3. **User Logistik**:
   - Meminta data Koperasi → Backend Response: `403 FORBIDDEN / DENIED`
   - Meminta data Depot → Backend Response: `403 FORBIDDEN / DENIED`
   - Meminta Rekap Pusat → Backend Response: `403 FORBIDDEN / DENIED`

4. **Admin**:
   - Berhak mengakses seluruh data divisi (Koperasi, Depot, Logistik, Rekap Pusat, Ekspor, User).

---

## 4. [PERLU KONFIRMASI]
- Apakah petugas Divisi Koperasi diperbolehkan mengunduh (export) Excel laporan bulanan internal Koperasi mereka sendiri, atau ekspor Excel **khusus milik Admin**?
  - *Rekomendasi*: Pengurus Divisi boleh export ringkasan PDF/Excel terbatas untuk divisi mereka sendiri, sedangkan Ekspor Final Gabungan (`REKAP_PUSAT.xlsx`) khusus Admin.
