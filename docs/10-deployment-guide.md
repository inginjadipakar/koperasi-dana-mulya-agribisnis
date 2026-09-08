# DOCS 10 — PANDUAN DEPLOYMENT & GO-LIVE PRODUKSI

> Project: Sistem Digital Koperasi Danamulya  
> Versi: 1.0  
> Target: Hosting cPanel / Subdomain `sistem.DOMAIN.com` + Google Apps Script + Google Sheets  

---

## 1. TAHAP 1: PERSIAPAN GOOGLE SHEETS STORAGE

1. Buka [Google Sheets](https://sheets.google.com) dengan akun Google resmi Koperasi/KKN.
2. Buat **Spreadsheet Baru** dengan nama: `STORAGE_SISTEM_DIGITAL_KOPERASI_DANAMULYA`.
3. **Penting**: File Excel lama asli **TIDAK DISENTUH** dan tetap menjadi arsip Read-Only.
4. Salin `Spreadsheet ID` dari URL browser:
   `https://docs.google.com/spreadsheets/d/`**`[SPREADSHEET_ID_ANDA]`**`/edit`

---

## 2. TAHAP 2: DEPLOYMENT BACKEND GOOGLE APPS SCRIPT

1. Buka [Google Apps Script](https://script.google.com) dan buat **New Project** bernama `Backend_Koperasi_Danamulya`.
2. Salin 11 file dari folder `apps-script/` ke dalam Apps Script Editor:
   - `config.gs`
   - `utils.gs`
   - `validation.gs`
   - `auth.gs`
   - `authorization.gs`
   - `audit-log.gs`
   - `koperasi.gs`
   - `depot.gs`
   - `logistik.gs`
   - `recap.gs`
   - `Code.gs`
3. Jalankan fungsi `initializeSpreadsheet()` **satu kali** dari dropdown toolbar Apps Script Editor.
   - Pastikan 10 Sheet otomatis terbentuk dengan header lengkap & seed users awal.
4. Klik **Deploy > New deployment**:
   - **Select type**: Web App
   - **Description**: Production Web App v1.0
   - **Execute as**: `Me (Akun Google Anda)`
   - **Who has access**: `Anyone`
5. Klik **Deploy**, beri izin akses (Authorize access), lalu **Salin Web App URL**:
   `https://script.google.com/macros/s/AKfycb.../exec`

---

## 3. TAHAP 3: DEPLOYMENT FRONTEND WEB (HOSTING / SUBDOMAIN)

1. Buka cPanel / File Manager hosting domain koperasi (misal: `sistem.NAMADOMAIN.com`).
2. Upload seluruh file dari folder project:
   - `index.html`
   - `css/styles.css`
   - `js/api.js`, `js/auth.js`, `js/koperasi.js`, `js/depot.js`, `js/logistik.js`, `js/recap.js`, `js/app.js`
3. Buka website `https://sistem.NAMADOMAIN.com` di browser.
4. Klik badge **`Mode: Testing Bridge`** pada header navbar, lalu tempelkan **Web App URL** Google Apps Script dari Tahap 2.
5. Indikator navbar akan berubah menjadi **`Backend: Google Apps Script API` (Hijau)**.

---

## 4. TAHAP 4: HARDENING PASSWORDS & AKUN OPERASIONAL

1. Login sebagai Admin Utama (`admin` / `admin123`).
2. Gunakan endpoint `changePassword` atau perbarui password default untuk 3 akun operasional:
   - **Admin**: `admin`
   - **Koperasi**: `koperasi01`
   - **Depot**: `depot01`
   - **Logistik**: `logistik01`
3. Pastikan password default awal (`123`) sudah diganti total sebelum sistem diserahkan ke pengurus koperasi.

---

## 5. STATUS MODUL GO-LIVE

- **DIVISI KOPERASI**: `READY` (Penerimaan & Pengeluaran Susu)
- **DIVISI DEPOT SUSU**: `READY` (Pembelian 1.025, Penjualan Agen, Ops, & Stok Opname)
- **DIVISI LOGISTIK**: `PENDING EXCEL ASLI` (Menunggu file Excel Logistik diserahkan)
- **ADMIN PUSAT**: `READY` (Dashboard Rekap Koperasi + Depot & Ekspor Excel Final `.xlsx`)
