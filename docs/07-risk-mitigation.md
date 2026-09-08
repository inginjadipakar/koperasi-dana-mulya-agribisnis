# DOCS 07 — RISIKO & MITIGASI (RISK MATRIX)

> Project: Sistem Digital Koperasi Danamulya  
> Versi: 1.0  

---

## 1. MATRIX MITIGASI RISIKO SISTEM

| No | Identifikasi Risiko | Dampak | Strategi Mitigasi | Prioritas |
|:---:|---|---|---|:---:|
| **1** | **Akses Google Sheets Bersamaan** (Concurrency Contention) | Data overwrite, ID transaksi duplikat | Menggunakan `LockService.getScriptLock()` di Apps Script dengan timeout 10 detik. | **CRITICAL** |
| **2** | **Duplicate Submission** (Tombol klik berulang) | Transaksi tercatat 2x | Client-side disable button + server-side `client_request_id` check. | **HIGH** |
| **3** | **Privilege Escalation** (User divisi A mencoba minta data divisi B) | Kebocoran data antar divisi | Strict Backend Authorization check di Apps Script (bukan di frontend). | **CRITICAL** |
| **4** | **Formula Terhapus/Damaged** | Rekap salah hitung | Tidak menyajikan rumus pada cell sheet data. Seluruh kalkulasi dilakukan di backend Apps Script / View query. | **HIGH** |
| **5** | **Salah Input Data** (Input text pada angka / NaN) | System crash / Data kotor | Server-side Data Type Validation (regex number, date validation, minimum 0). | **HIGH** |
| **6** | **Spreadsheet Terhapus / Rusak** | Kehilangan seluruh data storage | Autobackup harian Google Apps Script ke Google Drive arsip + Google Sheets Version History. | **CRITICAL** |
| **7** | **Apps Script Quota Limit** (Eksos kuota eksekusi Google) | Error 500 / Timeouts | Menggunakan Batch Read (`getDisplayValues()`) dan Batch Write (`setValues()`), hindari loop per-cell. | **MEDIUM** |
| **8** | **Perubahan Struktur Excel Terlambat** (Kasus Logistik) | Modul Logistik tertunda | Menyiapkan interface modular `LOGISTIK_PENDING` yang siap di-connect tanpa merusak Koperasi/Depot. | **MEDIUM** |
| **9** | **Perbedaan Angka Rekap Web vs Excel Asli** | Ketidakpercayaan pengguna | Menjalankan **Golden Reference Reconciliation Script** berbasis Python untuk membandingkan output sistem vs Excel. | **HIGH** |
| **10** | **Layanan Berbayar Terpakai Tanpa Sengaja** | Membengkaknya biaya KKN/Koperasi | Strict No-Paid-Services policy (Hanya Google Sheets, Apps Script, & Domain/Hosting gratis/yang sudah ada). | **HIGH** |

---

## 2. DOKUMENTASI BACKUP & RECOVERY SPREADSHEET

1. **Hak Akses Google Spreadsheet Storage**:
   - **Owner**: Akun Utama Koperasi / Akun KKN.
   - **Editor**: Google Apps Script Service Account / Script Web App.
   - **Viewer / Restriksi**: Pengguna biasa **TIDAK DIBERI AKSES EDIT LANGSUNG** ke Spreadsheet. Pengguna hanya berinteraksi melalui Web Interface.
2. **Prosedur Backup**:
   - Script harian otomatis menyalin file Google Spreadsheet ke folder `Backups/` di Google Drive dengan nama `KOPERASI_DANAMULYA_BACKUP_YYYY-MM-DD.xlsx`.
3. **Prosedur Recovery**:
   - Jika terjadi kendala data kotor, Admin dapat melakukan restore versi sebelumnya via menu *File > Version history* di Google Sheets atau memulihkan dari file backup harian.
