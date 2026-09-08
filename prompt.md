============================================================
PROJECT: SISTEM DIGITAL KOPERASI DANAMULYA
============================================================

Saya sedang mengembangkan sistem digital untuk Koperasi Danamulya
sebagai proyek KKN.

Waktu pengerjaan sangat terbatas, sekitar 9 hari.

Sistem ini akan digunakan oleh beberapa divisi yang memiliki data
masing-masing.

PRIORITAS UTAMA:

1. AMAN
2. STABIL
3. MINIM ERROR
4. MUDAH DIGUNAKAN
5. MUDAH DIRAWAT
6. SESUAI DENGAN EXCEL ASLI
7. TIDAK MEMBUTUHKAN DATABASE BERBAYAR UNTUK VERSI AWAL
8. BISA LANGSUNG DIGUNAKAN SETELAH TESTING
9. JANGAN OVERENGINEERING

Jangan membuat sistem yang terlalu kompleks hanya karena secara
teknis bisa dibuat.

============================================================
1. LOKASI PROJECT
============================================================

Root project:

C:\Users\HP\Desktop\KKN SIE ACARA\Proker UMKM\Koperasidanamulya

Gunakan folder tersebut sebagai root project.

Jangan menghapus atau mengubah file Excel asli.

File Excel asli merupakan REFERENSI UTAMA sistem.

Jika membutuhkan eksperimen terhadap Excel, gunakan COPY.

============================================================
2. KONSEP SISTEM
============================================================

Sistem memiliki 3 divisi:

1. KOPERASI
2. DEPOT SUSU
3. LOGISTIK

Dan 1 role:

4. ADMIN

Arsitektur yang diinginkan:

                    WEB
                     │
          ┌──────────┼──────────┐
          ↓          ↓          ↓
      KOPERASI    DEPOT      LOGISTIK
          │          │          │
          └──────────┼──────────┘
                     ↓
              GOOGLE SHEETS
                     │
              REKAP OTOMATIS
                     │
             ┌───────┴───────┐
             ↓               ↓
         DASHBOARD       EXCEL FINAL


Alur data:

USER
 ↓
WEB
 ↓
VALIDASI
 ↓
GOOGLE APPS SCRIPT
 ↓
GOOGLE SHEETS
 ↓
PERHITUNGAN OTOMATIS
 ↓
REKAP
 ↓
DASHBOARD / EXCEL / PDF

============================================================
3. KEPUTUSAN TEKNOLOGI
============================================================

UNTUK VERSI AWAL JANGAN MENGGUNAKAN DATABASE BERBAYAR.

Gunakan:

FRONTEND:
- HTML5
- CSS3
- JavaScript Vanilla
- Bootstrap 5

BACKEND:
- Google Apps Script

STORAGE:
- Google Sheets

EXCEL AUDIT:
- Python
- openpyxl
- pandas jika diperlukan

EXPORT:
- XLSX
- PDF jika waktu memungkinkan

HOSTING:
- Gunakan hosting .com yang sudah dimiliki koperasi jika kompatibel.

Jika mereka memiliki domain:

contoh:

sistem.DOMAINKOPERASI.com

Jangan mengubah domain utama.

============================================================
4. ALASAN TIDAK MENGGUNAKAN DATABASE SERVER DULU
============================================================

Project hanya mempunyai waktu sekitar 9 hari.

Kebutuhan saat ini:

- beberapa divisi
- input transaksi
- laporan
- rekap
- admin
- export Excel

Belum membutuhkan database server kompleks.

Google Sheets digunakan sebagai storage sederhana.

Namun data harus tetap dirancang secara terstruktur seperti database.

JANGAN menganggap Spreadsheet sebagai tempat untuk mengetik
laporan secara sembarangan.

Gunakan struktur tabel yang konsisten.

Jika di masa depan sistem berkembang besar, data dapat dimigrasikan
ke database proper.

============================================================
5. ROLE LOGIN
============================================================

Ada 4 role:

KOPERASI
DEPOT
LOGISTIK
ADMIN

--------------------------------
KOPERASI
--------------------------------

Boleh:

- login
- melihat data Koperasi
- input transaksi Koperasi
- melihat laporan Koperasi
- melihat rekap Koperasi

Tidak boleh:

- melihat Depot
- melihat Logistik
- melihat Rekap Pusat

--------------------------------
DEPOT
--------------------------------

Boleh:

- login
- melihat data Depot
- input transaksi Depot
- melihat laporan Depot
- melihat rekap Depot

Tidak boleh:

- melihat Koperasi
- melihat Logistik
- melihat Rekap Pusat

--------------------------------
LOGISTIK
--------------------------------

Boleh:

- login
- melihat data Logistik
- input transaksi Logistik
- melihat laporan Logistik
- melihat rekap Logistik

Tidak boleh:

- melihat Koperasi
- melihat Depot
- melihat Rekap Pusat

--------------------------------
ADMIN
--------------------------------

Boleh:

- melihat Koperasi
- melihat Depot
- melihat Logistik
- melihat Rekap Pusat
- melihat Dashboard keseluruhan
- export Excel
- export PDF jika tersedia
- mengelola user jika fitur diperlukan

============================================================
6. KEAMANAN
============================================================

PENTING:

Jangan menganggap menyembunyikan menu sebagai sistem keamanan.

Contoh TIDAK CUKUP:

if(role !== "admin") {
   hideMenu();
}

User tetap tidak boleh dapat meminta data yang tidak menjadi
haknya melalui request/API.

Authorization harus diperiksa di backend Google Apps Script.

Prinsip:

LOGIN
 ↓
IDENTIFIKASI USER
 ↓
CEK ROLE
 ↓
CEK DIVISI
 ↓
IZINKAN / TOLAK

Contoh:

User Depot meminta data Koperasi.

Backend:

DENIED

User Koperasi meminta data Logistik.

Backend:

DENIED

Admin meminta data Koperasi.

Backend:

ALLOWED

============================================================
7. FILE EXCEL YANG TERSEDIA
============================================================

KOPERASI:

Ada 3 file:

1. Penerimaan
2. Pengeluaran
3. Laporan Penerimaan dan Pengeluaran

DEPOT SUSU:

Ada 1 file:

LAPORAN BULANAN 2026 DEPOT SUSU

LOGISTIK:

BELUM TERSEDIA.

Saya masih harus meminta:

LAPORAN LOGISTIK

JANGAN membuat struktur Logistik berdasarkan asumsi.

============================================================
8. EXCEL ADALAH REFERENSI BISNIS
============================================================

Excel lama merupakan acuan bagaimana koperasi bekerja saat ini.

Jangan mengubah:

- arti transaksi
- cara perhitungan
- satuan
- definisi laporan

tanpa alasan yang jelas.

Jika sistem baru menghasilkan angka berbeda dengan Excel lama,
jangan langsung menganggap Excel salah.

Cari tahu:

- apakah rumus berbeda
- apakah data berbeda
- apakah ada transaksi yang belum dimasukkan
- apakah pembulatan berbeda
- apakah periode berbeda

Jika tidak dapat ditentukan:

[PERLU KONFIRMASI]

JANGAN MENEBak.

============================================================
9. TAHAP 1 — AUDIT EXCEL
============================================================

WAJIB.

Sebelum membuat:

- database
- Google Sheets
- backend
- login
- UI

Lakukan audit Excel terlebih dahulu.

Gunakan:

Python + openpyxl

Gunakan pandas jika diperlukan.

Baca:

- workbook
- worksheet
- cell
- formula
- merged cells
- hidden sheet
- hidden rows
- hidden columns
- header
- data
- number format
- date format
- currency format
- data validation
- named range jika ada
- formula antar-sheet

Jangan hanya membaca hasil formula.

Contoh:

Jika:

B12 = =SUM(B5:B11)

Catat:

FORMULA:
=SUM(B5:B11)

HASIL:
nilai hasil formula

============================================================
10. EXCEL AUDIT TOOL
============================================================

Buat:

excel-audit/audit_excel.py

Script harus:

- membaca file Excel
- tidak mengubah file asli
- menampilkan workbook
- menampilkan worksheet
- mendeteksi formula
- mendeteksi merged cells
- mendeteksi hidden sheet
- mendeteksi hidden rows/columns
- membaca format angka
- membaca tanggal
- membaca data validation jika memungkinkan

Output:

excel-audit/
├── audit_excel.py
├── README.md
└── reports/
    ├── koperasi.md
    ├── depot.md
    └── logistik.md

Jika Logistik belum ada:

Jangan membuat laporan palsu.

============================================================
11. KLASIFIKASI DATA
============================================================

Setiap field harus dikategorikan:

INPUT MANUAL

atau

HASIL OTOMATIS

Contoh input:

- tanggal
- nama
- jenis transaksi
- jumlah
- harga
- keterangan

Contoh otomatis:

- subtotal
- total
- saldo
- stok
- rekap
- persentase

Namun jangan membuat asumsi.

Ikuti Excel asli.

============================================================
12. JANGAN DUPLIKASI INPUT
============================================================

Jika total dapat dihitung:

jumlah × harga

maka user tidak perlu mengetik total secara manual.

Jika stok dapat dihitung dari:

stok awal
+
penerimaan
-
pengeluaran

maka stok akhir dihitung otomatis.

TETAPI:

Hanya lakukan jika memang sesuai dengan aturan bisnis
yang ditemukan pada Excel.

============================================================
13. KOPERASI
============================================================

Audit:

1. Penerimaan
2. Pengeluaran
3. Laporan Penerimaan dan Pengeluaran

Cari hubungan antar file.

Tentukan:

INPUT
↓
TRANSAKSI
↓
PERHITUNGAN
↓
REKAP

Rekap tidak boleh menjadi input manual jika sebenarnya dapat
dihasilkan dari transaksi.

============================================================
14. DEPOT SUSU
============================================================

Gunakan:

LAPORAN BULANAN 2026 DEPOT SUSU

sebagai referensi utama.

Analisis seluruh:

- sheet
- kolom
- transaksi
- pembelian
- penjualan
- stok
- KG
- Liter
- harga
- total
- formula
- rekap

Jangan membuat struktur baru sebelum memahami file.

============================================================
15. LOGISTIK
============================================================

Excel Logistik BELUM TERSEDIA.

Untuk sementara:

BUAT PLACEHOLDER SAJA.

JANGAN membuat struktur final.

Setelah Excel Logistik tersedia:

Audit terlebih dahulu.

Kemudian implementasikan.

============================================================
16. GOOGLE SHEETS
============================================================

Google Sheets menjadi STORAGE.

Petugas tidak perlu membuka Google Sheets.

Petugas bekerja melalui WEB.

Spreadsheet berada di belakang sistem.

Struktur akhir harus mengikuti hasil audit.

Contoh struktur konseptual:

USERS
MASTER_DATA
KOPERASI_TRANSACTIONS
DEPOT_TRANSACTIONS
LOGISTIK_TRANSACTIONS
AUDIT_LOG

Tetapi jangan memaksakan nama tersebut.

Setiap transaksi harus memiliki:

- transaction_id
- tanggal
- divisi
- jenis transaksi
- data transaksi
- created_by
- created_at

Contoh ID:

TRX-2026-000001

ID harus unik.

============================================================
17. DATA TRANSAKSI ADALAH SUMBER UTAMA
============================================================

Jangan menjadikan REKAP sebagai sumber data.

Yang menjadi sumber:

TRANSAKSI

Kemudian:

TRANSAKSI
 ↓
PERHITUNGAN
 ↓
REKAP

Bukan:

TRANSAKSI
 ↓
User mengetik ulang rekap
 ↓
Laporan

============================================================
18. REKAP PUSAT
============================================================

Admin mempunyai halaman:

REKAP PUSAT

Admin memilih:

Bulan
Tahun

Contoh:

Juli 2026

Sistem mengambil:

Koperasi
+
Depot
+
Logistik

Kemudian menampilkan:

REKAP PUSAT

KOPERASI
- ringkasan penerimaan
- ringkasan pengeluaran

DEPOT SUSU
- ringkasan transaksi sesuai Excel
- total
- stok jika berlaku

LOGISTIK
- ringkasan sesuai Excel Logistik

Jangan mengarang indikator yang tidak ada pada laporan asli.

============================================================
19. DASHBOARD
============================================================

Dashboard Admin:

REKAP PUSAT
PERIODE: JULI 2026

-------------------------
KOPERASI
-------------------------

Ringkasan sesuai laporan.

-------------------------
DEPOT SUSU
-------------------------

Ringkasan sesuai laporan.

-------------------------
LOGISTIK
-------------------------

Ringkasan sesuai laporan.

Admin dapat:

[Lihat Detail]
[Export Excel]
[Export PDF]

============================================================
20. EXPORT EXCEL FINAL
============================================================

WAJIB.

Admin dapat mengklik:

EXPORT EXCEL

Contoh file:

REKAP_JULI_2026.xlsx

Struktur:

Sheet 1:
REKAP UTAMA

Sheet 2:
KOPERASI

Sheet 3:
DEPOT SUSU

Sheet 4:
LOGISTIK

Jika diperlukan:

Sheet 5:
DATA PENDUKUNG

Excel hasil harus:

- dapat dibuka
- rapi
- menggunakan format angka yang benar
- menggunakan format Rupiah
- menggunakan KG/Liter/Qty sesuai kebutuhan
- mempunyai periode laporan
- memiliki total yang benar

============================================================
21. PDF
============================================================

Jika waktu memungkinkan:

EXPORT PDF

Namun prioritas:

EXCEL > PDF

Jangan mengorbankan stabilitas sistem hanya untuk PDF.

============================================================
22. UI
============================================================

Gunakan:

HTML
CSS
JavaScript
Bootstrap 5

Halaman:

1. Login
2. Dashboard
3. Koperasi
4. Depot
5. Logistik
6. Rekap Pusat
7. Export
8. User Management jika diperlukan

Desain:

- sederhana
- profesional
- jelas
- responsive
- nyaman digunakan
- tidak terlalu banyak animasi

============================================================
23. VALIDASI INPUT
============================================================

Semua input harus divalidasi.

Contoh:

Tanggal:
harus valid.

Angka:
harus angka.

Harga:
harus angka.

Field wajib:
tidak boleh kosong.

Dropdown:
harus memilih pilihan valid.

Jangan menerima:

NaN
undefined
null

untuk field yang wajib.

============================================================
24. DUPLICATE SUBMISSION
============================================================

Cegah klik SIMPAN berkali-kali.

Setelah klik:

[SIMPAN]

tombol sementara disabled.

Backend juga harus memvalidasi agar transaksi yang sama
tidak tercatat dua kali.

============================================================
25. AUDIT LOG
============================================================

Jika memungkinkan, buat:

AUDIT_LOG

Isi:

- user
- role
- waktu
- action
- transaction_id
- status

Contoh:

2026-07-31 10:30
user: depot01
role: depot
action: CREATE_TRANSACTION
transaction: TRX-2026-00021
status: SUCCESS

============================================================
26. BACKUP
============================================================

Sebelum go-live:

Backup:

- Excel asli
- Google Sheets
- Apps Script
- source code
- konfigurasi
- dokumentasi

Jangan menghapus Excel lama.

Excel lama tetap menjadi arsip.

============================================================
27. TESTING
============================================================

Testing wajib.

Buat test case.

TEST LOGIN:

Koperasi:
hanya Koperasi.

Depot:
hanya Depot.

Logistik:
hanya Logistik.

Admin:
semua.

TEST SECURITY:

Depot meminta data Koperasi.

Expected:
DENIED

Koperasi meminta data Logistik.

Expected:
DENIED

TEST TRANSAKSI:

Input 1 transaksi.

Expected:
tepat 1 transaksi tersimpan.

TEST REKAP:

Input transaksi.

Expected:
rekap berubah sesuai transaksi.

TEST FILTER:

Pilih Juli 2026.

Expected:
hanya data Juli 2026.

TEST EXPORT:

Generate Excel.

Expected:
file dapat dibuka dan angka benar.

============================================================
28. GOLDEN REFERENCE
============================================================

Excel asli digunakan sebagai GOLDEN REFERENCE.

Bandingkan:

EXCEL ASLI
VS
SISTEM BARU

Yang dibandingkan:

- jumlah transaksi
- total penerimaan
- total pengeluaran
- total Rupiah
- KG
- Liter
- stok
- rekap

Jika berbeda:

JANGAN langsung deploy.

Cari penyebab.

============================================================
29. DEPLOYMENT
============================================================

Jika hosting .com koperasi tersedia:

Frontend dapat ditempatkan pada subdomain.

Contoh:

sistem.DOMAIN.com

Backend:

Google Apps Script

Jangan mengubah domain utama.

Jika hosting tidak cocok untuk kebutuhan frontend,
gunakan metode deployment paling sederhana dan stabil.

Jangan melakukan konfigurasi berisiko pada domain utama.

============================================================
30. STRATEGI 9 HARI
============================================================

HARI 1
Audit Excel Koperasi + Depot.

HARI 2
Mapping proses + desain struktur Google Sheets + role access.

HARI 3
Backend Apps Script + authentication.

HARI 4
Modul Koperasi.

HARI 5
Modul Depot.

HARI 6
Modul Logistik jika Excel sudah tersedia.

HARI 7
Rekap Pusat + Export Excel.

HARI 8
Testing + security + rekonsiliasi dengan Excel.

HARI 9
Deployment + backup + dokumentasi + training.

Jika Excel Logistik belum tersedia:

Jangan menunggu.

Gunakan waktu untuk:

- menyelesaikan Koperasi
- menyelesaikan Depot
- Rekap Pusat
- testing
- dokumentasi

============================================================
31. DOKUMENTASI
============================================================

Buat folder:

docs/

Isi:

01-excel-audit.md
02-process-mapping.md
03-data-structure.md
04-role-access.md
05-ui-design.md
06-testing.md
07-deployment.md
08-user-manual.md
09-backup-recovery.md

============================================================
32. ANTI-ERROR RULE
============================================================

Prioritas:

RELIABILITY > FITUR

Jangan menambahkan fitur jika:

- tidak diperlukan
- belum diminta
- meningkatkan risiko
- membutuhkan waktu terlalu lama

Jangan mengganti teknologi hanya karena menemukan error.

Pertama:

1. identifikasi error
2. cari penyebab
3. tentukan solusi
4. test
5. dokumentasikan

============================================================
33. JIKA MENEMUKAN AMBIGUITAS
============================================================

JANGAN MENEBak.

Tulis:

[PERLU KONFIRMASI]

Kemudian jelaskan:

1. Apa yang tidak jelas
2. Mengapa penting
3. Pilihan
4. Rekomendasi

============================================================
34. JANGAN MENGUBAH EXCEL ASLI
============================================================

Excel asli:

READ ONLY

Jangan:

- overwrite
- delete
- rename
- mengubah formula
- mengubah format

Jika diperlukan:

buat COPY.

============================================================
35. CARA KERJA AI
============================================================

Kamu bertindak sebagai:

- System Analyst
- Software Architect
- Developer
- Database/Spreadsheet Designer
- QA Tester
- Deployment Engineer

Tetapi jangan mengerjakan semuanya sekaligus.

WAJIB STEP-BY-STEP.

Setiap tahap harus selesai sebelum lanjut.

Format setiap respons:

TAHAP:
STATUS:

YANG DITEMUKAN:
...

KEPUTUSAN:
...

RISIKO:
...

PERLU KONFIRMASI:
...

FILE YANG DIBUAT:
...

LANGKAH BERIKUTNYA:
...

============================================================
36. DEFINITION OF DONE
============================================================

Sistem dianggap selesai jika:

[ ] Login Koperasi berjalan
[ ] Login Depot berjalan
[ ] Login Logistik berjalan
[ ] Login Admin berjalan
[ ] Role berjalan
[ ] Divisi tidak dapat melihat data divisi lain
[ ] Koperasi dapat input
[ ] Depot dapat input
[ ] Logistik dapat input
[ ] Data tersimpan
[ ] Tidak terjadi duplicate
[ ] Perhitungan benar
[ ] Rekap otomatis
[ ] Admin melihat Rekap Pusat
[ ] Filter periode berjalan
[ ] Export Excel berjalan
[ ] Excel dapat dibuka
[ ] Angka sesuai Excel referensi
[ ] Backup tersedia
[ ] Dokumentasi tersedia
[ ] Sistem telah diuji

============================================================
37. TUGAS PERTAMA
============================================================

MULAI DARI TAHAP 1.

JANGAN CODING.

JANGAN MEMBUAT UI.

JANGAN MEMBUAT LOGIN.

JANGAN MEMBUAT DATABASE BARU.

JANGAN MEMBUAT MODUL LOGISTIK.

Lakukan:

EXCEL AUDIT.

Cari seluruh file Excel yang tersedia di:

C:\Users\HP\Desktop\KKN SIE ACARA\Proker UMKM\Koperasidanamulya

Gunakan:

Python
openpyxl
pandas jika diperlukan

Audit:

- workbook
- worksheet
- struktur kolom
- header
- data
- formula
- merged cells
- hidden sheet
- hidden rows/columns
- format angka
- tanggal
- Rupiah
- KG
- Liter
- Qty
- data manual
- data otomatis
- hubungan antar-sheet
- formula penting
- potensi masalah
- hal yang perlu dikonfirmasi

Buat laporan audit.

Untuk Logistik:

FILE BELUM TERSEDIA.

JANGAN MENEBak.

Setelah Tahap 1 selesai:

BERHENTI.

Tampilkan hasil audit.

Jangan lanjut ke tahap berikutnya sampai saya memberikan instruksi.

============================================================
END OF PROJECT INSTRUCTION
============================================================