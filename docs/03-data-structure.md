# DOCS 03 — STRUKTUR DATA GOOGLE SHEETS (STORAGE SYSTEM)

> Project: Sistem Digital Koperasi Danamulya  
> Versi: 1.0  
> Storage: Google Sheets (Spreadsheet Backend)  

---

## 1. PRINSIP STRUKTUR SPREADSHEET

1. **Satu Baris = Satu Transaksi** (Data Granular, Bukan Rekap Manual).
2. **Setiap Transaksi Memiliki ID Unik** (`TRX-...`).
3. **Audit Trail**: Mengandung `created_by` (User ID) dan `created_at` (Timestamp).
4. **Pemisahan Sheet**: Masing-masing tabel disimpan dalam Sheet terpisah untuk mencegah kerusakan formula dan mempermudah query backend.

---

## 2. DAFTAR SHEET DALAM GOOGLE SPREADSHEET

| Nama Sheet | Fungsi Utama | Divisi Akses |
|---|---|---|
| `USERS` | Master Data Pengguna & Auth Hash | Admin Only |
| `KOPERASI_PENERIMAAN` | Catatan Transaksi Masuk Susu Koperasi | Koperasi, Admin |
| `KOPERASI_PENGELUARAN` | Catatan Transaksi Keluar/Penjualan Susu Koperasi | Koperasi, Admin |
| `DEPOT_PEMBELIAN` | Catatan Pembelian Susu Depot dari Processing | Depot, Admin |
| `DEPOT_PENJUALAN` | Catatan Penjualan Susu Depot ke Agen/Pelanggan | Depot, Admin |
| `DEPOT_LAIN_LAIN` | Catatan Susut, Sosial, dan Susu Rusak Depot | Depot, Admin |
| `DEPOT_OPERASIONAL` | Catatan Biaya Operasional Depot | Depot, Admin |
| `DEPOT_STOK_OPNAME` | Catatan Stok Opname Bulanan Depot | Depot, Admin |
| `LOGISTIK_TRANSACTIONS` | Status: `LOGISTIK_PENDING` | Logistik, Admin |
| `AUDIT_LOG` | Log Seluruh Aktivitas Sistem | Admin Only |

---

## 3. SPESIFIKASI RETAIL SKEMA KOLOM

### A. Sheet `USERS`
| Nama Kolom | Tipe Data | Wajib | Keterangan / Formula |
|---|---|---|---|
| `user_id` | STRING | Ya | Unique Primary Key (misal: `USR-001`) |
| `username` | STRING | Ya | Unique Username Login |
| `password_hash` | STRING | Ya | Salted SHA-256 Hash |
| `nama_lengkap` | STRING | Ya | Nama Petugas |
| `role` | ENUM | Ya | `koperasi`, `depot`, `logistik`, `admin` |
| `divisi` | ENUM | Ya | `KOPERASI`, `DEPOT`, `LOGISTIK`, `ALL` |
| `status` | ENUM | Ya | `ACTIVE`, `INACTIVE` |
| `created_at` | TIMESTAMP | Ya | Tanggal pembuatan akun |

---

### B. Sheet `KOPERASI_PENERIMAAN`
| Nama Kolom | Tipe Data | Wajib | Keterangan / Formula |
|---|---|---|---|
| `transaction_id` | STRING | Ya | Unique Key (misal: `TRX-KOP-REC-2026-000001`) |
| `tanggal` | DATE | Ya | Format `YYYY-MM-DD` |
| `kategori_sumber` | ENUM | Ya | `ANGGOTA`, `NON_ANGGOTA` |
| `nama_sumber` | STRING | Ya | Nama Kelompok (Anggota) / Wilayah (Non-Anggota) |
| `jumlah_kg` | DECIMAL | Ya | Jumlah Susu Masuk (KG) |
| `harga_per_kg` | DECIMAL | Tidak | Rp (0 untuk Anggota; Rp 7000-8000 untuk Non-Anggota) |
| `total_rupiah` | DECIMAL | Ya | Manual/Formula (`jumlah_kg * harga_per_kg`) |
| `keterangan` | STRING | Tidak | Catatan tambahan |
| `created_by` | STRING | Ya | User ID pembuat |
| `created_at` | TIMESTAMP | Ya | Waktu submit |

---

### C. Sheet `KOPERASI_PENGELUARAN`
| Nama Kolom | Tipe Data | Wajib | Keterangan / Formula |
|---|---|---|---|
| `transaction_id` | STRING | Ya | Unique Key (misal: `TRX-KOP-OUT-2026-000001`) |
| `tanggal` | DATE | Ya | Format `YYYY-MM-DD` |
| `kategori_tujuan` | ENUM | Ya | `PENJUALAN`, `LAIN_LAIN` |
| `nama_tujuan` | STRING | Ya | Nama Pembeli (Nestle, Lokal) / Kategori (Sosial, Rusak) |
| `jumlah_kg` | DECIMAL | Ya | Jumlah Susu Keluar (KG) |
| `harga_per_kg` | DECIMAL | Tidak | Rp (0 untuk Lain-lain) |
| `total_rupiah` | DECIMAL | Ya | Manual/Formula (`jumlah_kg * harga_per_kg`) |
| `keterangan` | STRING | Tidak | Catatan tambahan |
| `created_by` | STRING | Ya | User ID pembuat |
| `created_at` | TIMESTAMP | Ya | Waktu submit |

---

### D. Sheet `DEPOT_PEMBELIAN`
| Nama Kolom | Tipe Data | Wajib | Keterangan / Formula |
|---|---|---|---|
| `transaction_id` | STRING | Ya | Unique Key (misal: `TRX-DEP-PUR-2026-000001`) |
| `tanggal` | DATE | Ya | Format `YYYY-MM-DD` |
| `harga_per_kg` | DECIMAL | Ya | Harga per KG (misal Rp 9.000) |
| `jumlah_kg` | DECIMAL | Ya | Jumlah KG dibeli dari Processing |
| `faktor_densitas` | DECIMAL | Ya | Const `1.025` |
| `jumlah_liter` | DECIMAL | Ya | Otomatis: `jumlah_kg / 1.025` |
| `total_rupiah` | DECIMAL | Ya | Otomatis: `jumlah_kg * harga_per_kg` |
| `keterangan` | STRING | Tidak | Catatan |
| `created_by` | STRING | Ya | User ID |
| `created_at` | TIMESTAMP | Ya | Waktu submit |

---

### E. Sheet `DEPOT_PENJUALAN`
| Nama Kolom | Tipe Data | Wajib | Keterangan / Formula |
|---|---|---|---|
| `transaction_id` | STRING | Ya | Unique Key (misal: `TRX-DEP-SAL-2026-000001`) |
| `tanggal` | DATE | Ya | Format `YYYY-MM-DD` |
| `nama_agen` | STRING | Ya | Nama Agen / Pelanggan (Heru, Jainal, Yuli, dll.) |
| `harga_per_liter` | DECIMAL | Ya | Harga Penjualan per Liter |
| `jumlah_liter` | DECIMAL | Ya | Volume Susu Terjual (Liter) |
| `total_rupiah` | DECIMAL | Ya | Otomatis: `jumlah_liter * harga_per_liter` |
| `keterangan` | STRING | Tidak | Catatan |
| `created_by` | STRING | Ya | User ID |
| `created_at` | TIMESTAMP | Ya | Waktu submit |

---

### F. Sheet `DEPOT_LAIN_LAIN`
| Nama Kolom | Tipe Data | Wajib | Keterangan / Formula |
|---|---|---|---|
| `transaction_id` | STRING | Ya | Unique Key (misal: `TRX-DEP-OTH-2026-000001`) |
| `tanggal` | DATE | Ya | Format `YYYY-MM-DD` |
| `jenis_pengeluaran` | STRING | Ya | `Sosial Botol`, `Sosial Liter`, `Susut`, `Susu Rusak` |
| `jumlah_item` | DECIMAL | Tidak | Jumlah item (jika botol) |
| `jumlah_liter` | DECIMAL | Ya | Ekuivalen Liter pengeluaran |
| `keterangan` | STRING | Tidak | Catatan rincian |
| `created_by` | STRING | Ya | User ID |
| `created_at` | TIMESTAMP | Ya | Waktu submit |

---

### G. Sheet `DEPOT_OPERASIONAL`
| Nama Kolom | Tipe Data | Wajib | Keterangan / Formula |
|---|---|---|---|
| `transaction_id` | STRING | Ya | Unique Key (misal: `TRX-DEP-OPS-2026-000001`) |
| `tanggal` | DATE | Ya | Format `YYYY-MM-DD` |
| `nama_barang_jenis` | STRING | Ya | Jenis pengeluaran (Plastik, LPG, Gula, Lemburan) |
| `nominal_biaya` | DECIMAL | Ya | Total biaya dalam Rupiah |
| `keterangan` | STRING | Tidak | Catatan |
| `created_by` | STRING | Ya | User ID |
| `created_at` | TIMESTAMP | Ya | Waktu submit |

---

### H. Sheet `DEPOT_STOK_OPNAME`
| Nama Kolom | Tipe Data | Wajib | Keterangan / Formula |
|---|---|---|---|
| `opname_id` | STRING | Ya | Unique Key (misal: `STK-DEP-2026-01`) |
| `periode` | STRING | Ya | Format `YYYY-MM` (misal `2026-01`) |
| `stok_awal_liter` | DECIMAL | Ya | Stok awal bulan (diambil dari stok akhir bulan lalu) |
| `pembelian_liter` | DECIMAL | Ya | Otomatis dari `DEPOT_PEMBELIAN` |
| `pengeluaran_liter` | DECIMAL | Ya | Otomatis dari `DEPOT_PENJUALAN` + `DEPOT_LAIN_LAIN` |
| `stok_teoretis_liter` | DECIMAL | Ya | Otomatis: `(stok_awal + pembelian) - pengeluaran` |
| `stok_riil_liter` | DECIMAL | Ya | Input Opname Fisik Akhir Bulan |
| `selisih_liter` | DECIMAL | Ya | Otomatis: `stok_teoretis - stok_riil` |
| `catatan_sisa_botol` | STRING | Tidak | Catatan sisa botol/liter |
| `created_by` | STRING | Ya | User ID |
| `created_at` | TIMESTAMP | Ya | Waktu simpan |

---

### I. Sheet `LOGISTIK_TRANSACTIONS`
- **STATUS**: `LOGISTIK_PENDING` (Skema akan ditentukan setelah Excel Logistik diterima).

---

### J. Sheet `AUDIT_LOG`
| Nama Kolom | Tipe Data | Wajib | Keterangan / Formula |
|---|---|---|---|
| `log_id` | STRING | Ya | Unique Key (misal: `LOG-2026-000001`) |
| `timestamp` | TIMESTAMP | Ya | Waktu kejadian |
| `user_id` | STRING | Ya | User ID yang melakukan aksi |
| `role` | STRING | Ya | Role user saat aksi dilakukan |
| `action` | STRING | Ya | `LOGIN`, `CREATE_TRANSACTION`, `RECAP_VIEW`, `EXPORT_EXCEL` |
| `divisi` | STRING | Ya | Divisi target data |
| `transaction_id` | STRING | Tidak | Transaction ID terkait jika ada |
| `status` | STRING | Ya | `SUCCESS`, `DENIED`, `FAILED` |
| `client_info` | STRING | Tidak | User agent / IP info |
