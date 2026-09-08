# DOCS 09 — PROSEDUR BACKUP & RECOVERY

> Project: Sistem Digital Koperasi Danamulya  
> Versi: 1.0  

---

## 1. STRATEGI BACKUP (PERMINTAAN PROKER KKN)

1. **Excel Asli adalah Read-Only Archive**:
   - File Excel lama (`LAPORAN PENGGURUS 2026.xlsx`, `LAPORAN BULANAN PENERIMAAN SUSU 2026.xlsx`, dll.) tetap disimpan sebagai arsip permanen dan **TIDAK PERNAH DIUBAH ATAU DI-OVERWRITE**.
2. **Google Sheets Backup Harian**:
   - Script otomatis Google Apps Script membuat file turunan backup di Google Drive setiap 24 jam dengan format nama: `BACKUP_SISTEM_DANAMULYA_YYYY-MM-DD.xlsx`.

---

## 2. CARA RESTORE / DISASTER RECOVERY

1. **Pemulihan Data via Version History**:
   - Buka Google Sheets Storage di browser.
   - Klik menu `File > Version History > See version history`.
   - Pilih titik waktu pemulihan (Timestamp) lalu klik `Restore this version`.
2. **Pemulihan dari File Backup Drive**:
   - Jika spreadsheet terhapus permanen, buka folder `Backups/` di Google Drive.
   - Download file backup `.xlsx` paling baru dan upload kembali sebagai Spreadsheet Storage utama.
