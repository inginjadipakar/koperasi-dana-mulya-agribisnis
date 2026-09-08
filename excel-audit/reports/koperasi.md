# AUDIT EXCEL — KOPERASI

> Tanggal audit: 2026-09-04 08:49:37
> Script: audit_excel.py
> Mode: READ ONLY (file asli TIDAK diubah)

---

## FILE: LAPORAN PENGGURUS 2026.xlsx

- **Path**: `C:\Users\HP\Desktop\KKN SIE ACARA\Proker UMKM\Koperasidanamulya\LAPORAN PENGGURUS 2026.xlsx`
- **Ukuran**: 22.8 KB
- **Jumlah Sheet**: 7
- **Nama Sheet**: Januari, februari, maret, April, MEI, JUNI, JULI

### SHEET: Januari

| Properti | Nilai |
|---|---|
| Dimensi | A1:I39 |
| Max Baris | 39 |
| Max Kolom | 9 |
| Visibilitas | visible |
| Merged Cells | 12 |
| Formula | 22 |
| Hidden Rows | 0 |
| Hidden Cols | 1 |

#### Konten Sebelum Header

- `A1: LAPORAN PENGELUARAN SUSU`
- `A2: KOPERASI AGRIBISNIS DANA MULYA`
- `A3: PERIODE : JANUARI 2026`

#### Merged Cells

- `I5:I7`
- `A2:I2`
- `B5:F5`
- `A1:I1`
- `A5:A7`
- `A3:I3`
- `A30:C30`
- `C32:I32`
- `H5:H7`
- `H37:I37`
- `D37:G37`
- `A29:C29`

#### Hidden Columns

- Kolom: E

#### Header (Baris 5)

- **A**: NO.
- **B**: UNTUK PENJUALAN 
- **C**: (kosong)
- **D**: (kosong)
- **E**: (kosong)
- **F**: (kosong)
- **G**: UNTUK LAIN - LAIN
- **H**: KG
- **I**: KETERANGAN

#### Analisis Kolom

| Kolom | Header | Klasifikasi | Tipe Data | Isi |
|---|---|---|---|---|
| A | NO. | INPUT MANUAL | ANGKA(20), STRING(2) | 22 baris |
| B | UNTUK PENJUALAN  | INPUT MANUAL | STRING(5) | 5 baris |
| C | (kosong) | INPUT MANUAL | STRING(19) | 19 baris |
| D | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(8), STRING(3) | 12 baris |
| E | (kosong) | INPUT MANUAL | STRING(1), RUPIAH(18) | 19 baris |
| F | (kosong) | CAMPURAN (ada formula & manual) | STRING(20), RUPIAH(1) | 21 baris |
| G | UNTUK LAIN - LAIN | INPUT MANUAL | STRING(6) | 6 baris |
| H | KG | CAMPURAN (ada formula & manual) | ANGKA(3), STRING(2) | 5 baris |
| I | KETERANGAN | KOLOM KOSONG |  | 0 baris |

#### Detail Kolom & Sample Data

##### Kolom A: NO.

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 22 baris
- **Tipe data**: ANGKA(20), STRING(2)
- **Sample**:
  - `Row 9: 1`
  - `Row 10: 2`
  - `Row 11: 3`
  - `Row 12: 4`
  - `Row 13: 5`

##### Kolom B: UNTUK PENJUALAN 

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 5 baris
- **Tipe data**: STRING(5)
- **Sample**:
  - `Row 6: PADA`
  - `Row 7: PERUSAHAAN / KOMUNAL`
  - `Row 9: NESTLE`
  - `Row 10: LOKAL`
  - `Row 11: AGEN`

##### Kolom C: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 19 baris
- **Tipe data**: STRING(19)
- **Sample**:
  - `Row 7: PER ORANGAN`
  - `Row 12: RS.DR SOETOMO`
  - `Row 13: SAMPURNA`
  - `Row 14: ALFAN`
  - `Row 15: DIDIK`

##### Kolom D: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 12 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(8), STRING(3)
- **Sample**:
  - `Row 7: KG`
  - `Row 9: 53340`
  - `Row 12: 3255`
  - `Row 14: 422`
  - `Row 18: 335`

##### Kolom E: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 19 baris
- **Tipe data**: STRING(1), RUPIAH(18)
- **Sample**:
  - `Row 7: RP`
  - `Row 10: 0`
  - `Row 12: 12400`
  - `Row 13: 12000`
  - `Row 14: 9500`

##### Kolom F: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 21 baris
- **Tipe data**: STRING(20), RUPIAH(1)
- **Sample**:
  - `Row 7: RP`
  - `Row 9: 386362127.5`
  - `Row 10: 0`
  - `Row 12: 40362000`
  - `Row 13: 0`

##### Kolom G: UNTUK LAIN - LAIN

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 6 baris
- **Tipe data**: STRING(6)
- **Sample**:
  - `Row 6: DI PERGUNAKAN`
  - `Row 7: KARENA`
  - `Row 9: PECAH / RUSAK`
  - `Row 10: SOSIAL / SUMBANGAN`
  - `Row 11: KARYAWAN`

##### Kolom H: KG

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 5 baris
- **Tipe data**: ANGKA(3), STRING(2)
- **Sample**:
  - `Row 9: 30`
  - `Row 10: 160`
  - `Row 11: 40`
  - `Row 29: 230`
  - `Row 37: USMAN HADI`

#### Format Angka yang Digunakan

| Format | Jumlah Cell | Contoh |
|---|---|---|
| `_(* #,##0_);_(* \(#,##0\);_(* "-"_);_(@_)` | 48 | D9: 53340; F9: 386362127.5 |

#### Formula yang Ditemukan (22 formula)

- `F10`: `=D10*E10` → **0**
- `F12`: `=D12*E12` → **40362000**
- `F13`: `=D13*E13` → **0**
- `F14`: `=D14*E14` → **4009000**
- `F15`: `=D15*E15` → **0**
- `F16`: `=D16*E16` → **0**
- `F17`: `=D17*E17` → **0**
- `F18`: `=D18*E18` → **3182500**
- `F19`: `=D19*E19` → **24310500**
- `F20`: `=D20*E20` → **760000**
- `F21`: `=D21*E21` → **0**
- `F22`: `=D22*E22` → **325206000**
- `F23`: `=D23*E23` → **712500**
- `F24`: `=D24*E24` → **0**
- `F25`: `=D25*E25` → **0**
- `F26`: `=D26*E26` → **0**
- `F27`: `=D27*E27` → **0**
- `F28`: `=D28*E28` → **0**
- `D30`: `=D29+H29` → **96430**
- `D29`: `=SUM(D9:D28)` → **96200**
- `F29`: `=SUM(F9:F28)` → **784904627.5**
- `H29`: `=SUM(H9:H11)` → **230**

#### Sample Data (5 baris pertama)

| NO. | UNTUK PENJUALAN  | (kosong) | (kosong) | (kosong) | (kosong) | UNTUK LAIN - LAIN | KG | KETERANGAN |
|---|---|---|---|---|---|---|---|---|
| (kosong) | PADA | (kosong) | (kosong) | (kosong) | (kosong) | DI PERGUNAKAN | (kosong) | (kosong) |
| (kosong) | PERUSAHAAN / KOMUNAL | PER ORANGAN | KG | RP | RP | KARENA | (kosong) | (kosong) |
| (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 1 | NESTLE | (kosong) | 53340 | (kosong) | 386362127.5 | PECAH / RUSAK | 30 | (kosong) |
| 2 | LOKAL | (kosong) | (kosong) | 0 | 0 | SOSIAL / SUMBANGAN | 160 | (kosong) |

#### Baris Terakhir (kemungkinan Total/Summary)

- `D37: DRH.H.M.ILHAM SUPRAYITNO`
- `H37: USMAN HADI`

#### Kolom Kosong

- I

---

### SHEET: februari

| Properti | Nilai |
|---|---|
| Dimensi | A1:I39 |
| Max Baris | 39 |
| Max Kolom | 9 |
| Visibilitas | visible |
| Merged Cells | 12 |
| Formula | 22 |
| Hidden Rows | 0 |
| Hidden Cols | 1 |

#### Konten Sebelum Header

- `A1: LAPORAN PENGELUARAN SUSU`
- `A2: KOPERASI AGRIBISNIS DANA MULYA`
- `A3: PERIODE : FEBRUARI 2026`

#### Merged Cells

- `I5:I7`
- `A2:I2`
- `B5:F5`
- `A1:I1`
- `H37:I37`
- `C32:I32`
- `A30:C30`
- `A5:A7`
- `H5:H7`
- `A3:I3`
- `D37:G37`
- `A29:C29`

#### Hidden Columns

- Kolom: E

#### Header (Baris 5)

- **A**: NO.
- **B**: UNTUK PENJUALAN 
- **C**: (kosong)
- **D**: (kosong)
- **E**: (kosong)
- **F**: (kosong)
- **G**: UNTUK LAIN - LAIN
- **H**: KG
- **I**: KETERANGAN

#### Analisis Kolom

| Kolom | Header | Klasifikasi | Tipe Data | Isi |
|---|---|---|---|---|
| A | NO. | INPUT MANUAL | ANGKA(20), STRING(2) | 22 baris |
| B | UNTUK PENJUALAN  | INPUT MANUAL | STRING(5) | 5 baris |
| C | (kosong) | INPUT MANUAL | STRING(19) | 19 baris |
| D | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(7), STRING(3) | 11 baris |
| E | (kosong) | INPUT MANUAL | STRING(1), RUPIAH(18) | 19 baris |
| F | (kosong) | CAMPURAN (ada formula & manual) | STRING(20), RUPIAH(1) | 21 baris |
| G | UNTUK LAIN - LAIN | INPUT MANUAL | STRING(6) | 6 baris |
| H | KG | CAMPURAN (ada formula & manual) | ANGKA(3), STRING(2) | 5 baris |
| I | KETERANGAN | KOLOM KOSONG |  | 0 baris |

#### Detail Kolom & Sample Data

##### Kolom A: NO.

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 22 baris
- **Tipe data**: ANGKA(20), STRING(2)
- **Sample**:
  - `Row 9: 1`
  - `Row 10: 2`
  - `Row 11: 3`
  - `Row 12: 4`
  - `Row 13: 5`

##### Kolom B: UNTUK PENJUALAN 

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 5 baris
- **Tipe data**: STRING(5)
- **Sample**:
  - `Row 6: PADA`
  - `Row 7: PERUSAHAAN / KOMUNAL`
  - `Row 9: NESTLE`
  - `Row 10: LOKAL`
  - `Row 11: AGEN`

##### Kolom C: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 19 baris
- **Tipe data**: STRING(19)
- **Sample**:
  - `Row 7: PER ORANGAN`
  - `Row 12: RS.DR SOETOMO`
  - `Row 13: SAMPURNA`
  - `Row 14: ALFAN`
  - `Row 15: DIDIK`

##### Kolom D: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 11 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(7), STRING(3)
- **Sample**:
  - `Row 7: KG`
  - `Row 9: 52460`
  - `Row 12: 2950`
  - `Row 14: 246`
  - `Row 18: 202`

##### Kolom E: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 19 baris
- **Tipe data**: STRING(1), RUPIAH(18)
- **Sample**:
  - `Row 7: RP`
  - `Row 10: 0`
  - `Row 12: 12400`
  - `Row 13: 12000`
  - `Row 14: 9500`

##### Kolom F: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 21 baris
- **Tipe data**: STRING(20), RUPIAH(1)
- **Sample**:
  - `Row 7: RP`
  - `Row 9: 400698074`
  - `Row 10: 0`
  - `Row 12: 36580000`
  - `Row 13: 0`

##### Kolom G: UNTUK LAIN - LAIN

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 6 baris
- **Tipe data**: STRING(6)
- **Sample**:
  - `Row 6: DI PERGUNAKAN`
  - `Row 7: KARENA`
  - `Row 9: PECAH / RUSAK`
  - `Row 10: SOSIAL / SUMBANGAN`
  - `Row 11: KARYAWAN`

##### Kolom H: KG

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 5 baris
- **Tipe data**: ANGKA(3), STRING(2)
- **Sample**:
  - `Row 9: 260`
  - `Row 10: 80`
  - `Row 11: 90`
  - `Row 29: 430`
  - `Row 37: USMAN HADI`

#### Format Angka yang Digunakan

| Format | Jumlah Cell | Contoh |
|---|---|---|
| `_(* #,##0_);_(* \(#,##0\);_(* "-"_);_(@_)` | 47 | D9: 52460; F9: 400698074 |

#### Formula yang Ditemukan (22 formula)

- `F10`: `=D10*E10` → **0**
- `F12`: `=D12*E12` → **36580000**
- `F13`: `=D13*E13` → **0**
- `F14`: `=D14*E14` → **2337000**
- `F15`: `=D15*E15` → **0**
- `F16`: `=D16*E16` → **0**
- `F17`: `=D17*E17` → **0**
- `F18`: `=D18*E18` → **1919000**
- `F19`: `=D19*E19` → **17309000**
- `F20`: `=D20*E20` → **0**
- `F21`: `=D21*E21` → **0**
- `F22`: `=D22*E22` → **224370000**
- `F23`: `=D23*E23` → **2660000**
- `F24`: `=D24*E24` → **0**
- `F25`: `=D25*E25` → **0**
- `F26`: `=D26*E26` → **0**
- `F27`: `=D27*E27` → **0**
- `F28`: `=D28*E28` → **0**
- `D30`: `=D29+H29` → **83320**
- `D29`: `=SUM(D9:D28)` → **82890**
- `F29`: `=SUM(F9:F28)` → **685873074**
- `H29`: `=SUM(H9:H11)` → **430**

#### Sample Data (5 baris pertama)

| NO. | UNTUK PENJUALAN  | (kosong) | (kosong) | (kosong) | (kosong) | UNTUK LAIN - LAIN | KG | KETERANGAN |
|---|---|---|---|---|---|---|---|---|
| (kosong) | PADA | (kosong) | (kosong) | (kosong) | (kosong) | DI PERGUNAKAN | (kosong) | (kosong) |
| (kosong) | PERUSAHAAN / KOMUNAL | PER ORANGAN | KG | RP | RP | KARENA | (kosong) | (kosong) |
| (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 1 | NESTLE | (kosong) | 52460 | (kosong) | 400698074 | PECAH / RUSAK | 260 | (kosong) |
| 2 | LOKAL | (kosong) | (kosong) | 0 | 0 | SOSIAL / SUMBANGAN | 80 | (kosong) |

#### Baris Terakhir (kemungkinan Total/Summary)

- `D37: DRH.H.M.ILHAM SUPRAYITNO`
- `H37: USMAN HADI`

#### Kolom Kosong

- I

---

### SHEET: maret

| Properti | Nilai |
|---|---|
| Dimensi | A1:I39 |
| Max Baris | 39 |
| Max Kolom | 9 |
| Visibilitas | visible |
| Merged Cells | 12 |
| Formula | 22 |
| Hidden Rows | 0 |
| Hidden Cols | 1 |

#### Konten Sebelum Header

- `A1: LAPORAN PENGELUARAN SUSU`
- `A2: KOPERASI AGRIBISNIS DANA MULYA`
- `A3: PERIODE : MARET 2026`

#### Merged Cells

- `I5:I7`
- `A2:I2`
- `B5:F5`
- `A1:I1`
- `A5:A7`
- `A3:I3`
- `A30:C30`
- `C32:I32`
- `H5:H7`
- `H37:I37`
- `D37:G37`
- `A29:C29`

#### Hidden Columns

- Kolom: E

#### Header (Baris 5)

- **A**: NO.
- **B**: UNTUK PENJUALAN 
- **C**: (kosong)
- **D**: (kosong)
- **E**: (kosong)
- **F**: (kosong)
- **G**: UNTUK LAIN - LAIN
- **H**: KG
- **I**: KETERANGAN

#### Analisis Kolom

| Kolom | Header | Klasifikasi | Tipe Data | Isi |
|---|---|---|---|---|
| A | NO. | INPUT MANUAL | ANGKA(20), STRING(2) | 22 baris |
| B | UNTUK PENJUALAN  | INPUT MANUAL | STRING(5) | 5 baris |
| C | (kosong) | INPUT MANUAL | STRING(19) | 19 baris |
| D | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(7), STRING(3) | 11 baris |
| E | (kosong) | INPUT MANUAL | STRING(1), RUPIAH(18) | 19 baris |
| F | (kosong) | CAMPURAN (ada formula & manual) | STRING(20), RUPIAH(1) | 21 baris |
| G | UNTUK LAIN - LAIN | INPUT MANUAL | STRING(6) | 6 baris |
| H | KG | CAMPURAN (ada formula & manual) | ANGKA(3), STRING(2) | 5 baris |
| I | KETERANGAN | KOLOM KOSONG |  | 0 baris |

#### Detail Kolom & Sample Data

##### Kolom A: NO.

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 22 baris
- **Tipe data**: ANGKA(20), STRING(2)
- **Sample**:
  - `Row 9: 1`
  - `Row 10: 2`
  - `Row 11: 3`
  - `Row 12: 4`
  - `Row 13: 5`

##### Kolom B: UNTUK PENJUALAN 

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 5 baris
- **Tipe data**: STRING(5)
- **Sample**:
  - `Row 6: PADA`
  - `Row 7: PERUSAHAAN / KOMUNAL`
  - `Row 9: NESTLE`
  - `Row 10: LOKAL`
  - `Row 11: AGEN`

##### Kolom C: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 19 baris
- **Tipe data**: STRING(19)
- **Sample**:
  - `Row 7: PER ORANGAN`
  - `Row 12: RS.DR SOETOMO`
  - `Row 13: SAMPURNA`
  - `Row 14: ALFAN`
  - `Row 15: DIDIK`

##### Kolom D: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 11 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(7), STRING(3)
- **Sample**:
  - `Row 7: KG`
  - `Row 9: 65540`
  - `Row 12: 2970`
  - `Row 18: 58`
  - `Row 19: 1520`

##### Kolom E: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 19 baris
- **Tipe data**: STRING(1), RUPIAH(18)
- **Sample**:
  - `Row 7: RP`
  - `Row 10: 0`
  - `Row 12: 12400`
  - `Row 13: 12000`
  - `Row 14: 9500`

##### Kolom F: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 21 baris
- **Tipe data**: STRING(20), RUPIAH(1)
- **Sample**:
  - `Row 7: RP`
  - `Row 9: 507466103.7`
  - `Row 10: 0`
  - `Row 12: 36828000`
  - `Row 13: 0`

##### Kolom G: UNTUK LAIN - LAIN

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 6 baris
- **Tipe data**: STRING(6)
- **Sample**:
  - `Row 6: DI PERGUNAKAN`
  - `Row 7: KARENA`
  - `Row 9: PECAH / RUSAK`
  - `Row 10: SOSIAL / SUMBANGAN`
  - `Row 11: KARYAWAN`

##### Kolom H: KG

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 5 baris
- **Tipe data**: ANGKA(3), STRING(2)
- **Sample**:
  - `Row 9: 55`
  - `Row 10: 120`
  - `Row 11: 90`
  - `Row 29: 265`
  - `Row 37: USMAN HADI`

#### Format Angka yang Digunakan

| Format | Jumlah Cell | Contoh |
|---|---|---|
| `_(* #,##0_);_(* \(#,##0\);_(* "-"_);_(@_)` | 47 | D9: 65540; F9: 507466103.7 |

#### Formula yang Ditemukan (22 formula)

- `F10`: `=D10*E10` → **0**
- `F12`: `=D12*E12` → **36828000**
- `F13`: `=D13*E13` → **0**
- `F14`: `=D14*E14` → **0**
- `F15`: `=D15*E15` → **0**
- `F16`: `=D16*E16` → **0**
- `F17`: `=D17*E17` → **0**
- `F18`: `=D18*E18` → **551000**
- `F19`: `=D19*E19` → **14440000**
- `F20`: `=D20*E20` → **570000**
- `F21`: `=D21*E21` → **0**
- `F22`: `=D22*E22` → **233568000**
- `F23`: `=D23*E23` → **332500**
- `F24`: `=D24*E24` → **0**
- `F25`: `=D25*E25` → **0**
- `F26`: `=D26*E26` → **0**
- `F27`: `=D27*E27` → **0**
- `F28`: `=D28*E28` → **0**
- `D30`: `=D29+H29` → **96400**
- `D29`: `=SUM(D9:D28)` → **96135**
- `F29`: `=SUM(F9:F28)` → **793755603.7**
- `H29`: `=SUM(H9:H11)` → **265**

#### Sample Data (5 baris pertama)

| NO. | UNTUK PENJUALAN  | (kosong) | (kosong) | (kosong) | (kosong) | UNTUK LAIN - LAIN | KG | KETERANGAN |
|---|---|---|---|---|---|---|---|---|
| (kosong) | PADA | (kosong) | (kosong) | (kosong) | (kosong) | DI PERGUNAKAN | (kosong) | (kosong) |
| (kosong) | PERUSAHAAN / KOMUNAL | PER ORANGAN | KG | RP | RP | KARENA | (kosong) | (kosong) |
| (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 1 | NESTLE | (kosong) | 65540 | (kosong) | 507466103.7 | PECAH / RUSAK | 55 | (kosong) |
| 2 | LOKAL | (kosong) | (kosong) | 0 | 0 | SOSIAL / SUMBANGAN | 120 | (kosong) |

#### Baris Terakhir (kemungkinan Total/Summary)

- `D37: DRH.H.M.ILHAM SUPRAYITNO`
- `H37: USMAN HADI`

#### Kolom Kosong

- I

---

### SHEET: April

| Properti | Nilai |
|---|---|
| Dimensi | A1:I39 |
| Max Baris | 39 |
| Max Kolom | 9 |
| Visibilitas | visible |
| Merged Cells | 12 |
| Formula | 22 |
| Hidden Rows | 0 |
| Hidden Cols | 1 |

#### Konten Sebelum Header

- `A1: LAPORAN PENGELUARAN SUSU`
- `A2: KOPERASI AGRIBISNIS DANA MULYA`
- `A3: PERIODE : APRIL  2026`

#### Merged Cells

- `I5:I7`
- `A2:I2`
- `B5:F5`
- `A1:I1`
- `H37:I37`
- `C32:I32`
- `A30:C30`
- `A5:A7`
- `H5:H7`
- `A3:I3`
- `D37:G37`
- `A29:C29`

#### Hidden Columns

- Kolom: E

#### Header (Baris 5)

- **A**: NO.
- **B**: UNTUK PENJUALAN 
- **C**: (kosong)
- **D**: (kosong)
- **E**: (kosong)
- **F**: (kosong)
- **G**: UNTUK LAIN - LAIN
- **H**: KG
- **I**: KETERANGAN

#### Analisis Kolom

| Kolom | Header | Klasifikasi | Tipe Data | Isi |
|---|---|---|---|---|
| A | NO. | INPUT MANUAL | ANGKA(20), STRING(2) | 22 baris |
| B | UNTUK PENJUALAN  | INPUT MANUAL | STRING(5) | 5 baris |
| C | (kosong) | INPUT MANUAL | STRING(19) | 19 baris |
| D | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(8), STRING(3) | 12 baris |
| E | (kosong) | INPUT MANUAL | STRING(1), RUPIAH(18) | 19 baris |
| F | (kosong) | CAMPURAN (ada formula & manual) | STRING(20), RUPIAH(1) | 21 baris |
| G | UNTUK LAIN - LAIN | INPUT MANUAL | STRING(6) | 6 baris |
| H | KG | CAMPURAN (ada formula & manual) | ANGKA(3), STRING(2) | 5 baris |
| I | KETERANGAN | KOLOM KOSONG |  | 0 baris |

#### Detail Kolom & Sample Data

##### Kolom A: NO.

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 22 baris
- **Tipe data**: ANGKA(20), STRING(2)
- **Sample**:
  - `Row 9: 1`
  - `Row 10: 2`
  - `Row 11: 3`
  - `Row 12: 4`
  - `Row 13: 5`

##### Kolom B: UNTUK PENJUALAN 

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 5 baris
- **Tipe data**: STRING(5)
- **Sample**:
  - `Row 6: PADA`
  - `Row 7: PERUSAHAAN / KOMUNAL`
  - `Row 9: NESTLE`
  - `Row 10: LOKAL`
  - `Row 11: AGEN`

##### Kolom C: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 19 baris
- **Tipe data**: STRING(19)
- **Sample**:
  - `Row 7: PER ORANGAN`
  - `Row 12: RS.DR SOETOMO`
  - `Row 13: SAMPURNA`
  - `Row 14: ALFAN`
  - `Row 15: DIDIK`

##### Kolom D: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 12 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(8), STRING(3)
- **Sample**:
  - `Row 7: KG`
  - `Row 9: 48800`
  - `Row 12: 2920`
  - `Row 14: 300`
  - `Row 18: 320`

##### Kolom E: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 19 baris
- **Tipe data**: STRING(1), RUPIAH(18)
- **Sample**:
  - `Row 7: RP`
  - `Row 10: 0`
  - `Row 12: 12400`
  - `Row 13: 12000`
  - `Row 14: 9500`

##### Kolom F: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 21 baris
- **Tipe data**: STRING(20), RUPIAH(1)
- **Sample**:
  - `Row 7: RP`
  - `Row 9: 379319013.5`
  - `Row 10: 0`
  - `Row 12: 36208000`
  - `Row 13: 0`

##### Kolom G: UNTUK LAIN - LAIN

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 6 baris
- **Tipe data**: STRING(6)
- **Sample**:
  - `Row 6: DI PERGUNAKAN`
  - `Row 7: KARENA`
  - `Row 9: PECAH / RUSAK`
  - `Row 10: SOSIAL / SUMBANGAN`
  - `Row 11: KARYAWAN`

##### Kolom H: KG

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 5 baris
- **Tipe data**: ANGKA(3), STRING(2)
- **Sample**:
  - `Row 9: 40`
  - `Row 10: 180`
  - `Row 11: 90`
  - `Row 29: 310`
  - `Row 37: USMAN HADI`

#### Format Angka yang Digunakan

| Format | Jumlah Cell | Contoh |
|---|---|---|
| `_(* #,##0_);_(* \(#,##0\);_(* "-"_);_(@_)` | 48 | D9: 48800; F9: 379319013.5 |

#### Formula yang Ditemukan (22 formula)

- `F10`: `=D10*E10` → **0**
- `F12`: `=D12*E12` → **36208000**
- `F13`: `=D13*E13` → **0**
- `F14`: `=D14*E14` → **2850000**
- `F15`: `=D15*E15` → **0**
- `F16`: `=D16*E16` → **0**
- `F17`: `=D17*E17` → **0**
- `F18`: `=D18*E18` → **3040000**
- `F19`: `=D19*E19` → **23161000**
- `F20`: `=D20*E20` → **950000**
- `F21`: `=D21*E21` → **0**
- `F22`: `=D22*E22` → **316620000**
- `F23`: `=D23*E23` → **2498500**
- `F24`: `=D24*E24` → **0**
- `F25`: `=D25*E25` → **0**
- `F26`: `=D26*E26` → **0**
- `F27`: `=D27*E27` → **0**
- `F28`: `=D28*E28` → **0**
- `D30`: `=D29+H29` → **90631**
- `D29`: `=SUM(D9:D28)` → **90321**
- `F29`: `=SUM(F9:F28)` → **764646513.5**
- `H29`: `=SUM(H9:H11)` → **310**

#### Sample Data (5 baris pertama)

| NO. | UNTUK PENJUALAN  | (kosong) | (kosong) | (kosong) | (kosong) | UNTUK LAIN - LAIN | KG | KETERANGAN |
|---|---|---|---|---|---|---|---|---|
| (kosong) | PADA | (kosong) | (kosong) | (kosong) | (kosong) | DI PERGUNAKAN | (kosong) | (kosong) |
| (kosong) | PERUSAHAAN / KOMUNAL | PER ORANGAN | KG | RP | RP | KARENA | (kosong) | (kosong) |
| (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 1 | NESTLE | (kosong) | 48800 | (kosong) | 379319013.5 | PECAH / RUSAK | 40 | (kosong) |
| 2 | LOKAL | (kosong) | (kosong) | 0 | 0 | SOSIAL / SUMBANGAN | 180 | (kosong) |

#### Baris Terakhir (kemungkinan Total/Summary)

- `D37: DRH.H.M.ILHAM SUPRAYITNO`
- `H37: USMAN HADI`

#### Kolom Kosong

- I

---

### SHEET: MEI

| Properti | Nilai |
|---|---|
| Dimensi | A1:I39 |
| Max Baris | 39 |
| Max Kolom | 9 |
| Visibilitas | visible |
| Merged Cells | 12 |
| Formula | 22 |
| Hidden Rows | 0 |
| Hidden Cols | 1 |

#### Konten Sebelum Header

- `A1: LAPORAN PENGELUARAN SUSU`
- `A2: KOPERASI AGRIBISNIS DANA MULYA`
- `A3: PERIODE : MEI 2026`

#### Merged Cells

- `I5:I7`
- `A2:I2`
- `B5:F5`
- `A1:I1`
- `A5:A7`
- `A3:I3`
- `A30:C30`
- `C32:I32`
- `H5:H7`
- `H37:I37`
- `D37:G37`
- `A29:C29`

#### Hidden Columns

- Kolom: E

#### Header (Baris 5)

- **A**: NO.
- **B**: UNTUK PENJUALAN 
- **C**: (kosong)
- **D**: (kosong)
- **E**: (kosong)
- **F**: (kosong)
- **G**: UNTUK LAIN - LAIN
- **H**: KG
- **I**: KETERANGAN

#### Analisis Kolom

| Kolom | Header | Klasifikasi | Tipe Data | Isi |
|---|---|---|---|---|
| A | NO. | INPUT MANUAL | ANGKA(20), STRING(2) | 22 baris |
| B | UNTUK PENJUALAN  | INPUT MANUAL | STRING(5) | 5 baris |
| C | (kosong) | INPUT MANUAL | STRING(19) | 19 baris |
| D | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(8), STRING(3) | 12 baris |
| E | (kosong) | INPUT MANUAL | STRING(1), RUPIAH(18) | 19 baris |
| F | (kosong) | CAMPURAN (ada formula & manual) | STRING(20), RUPIAH(1) | 21 baris |
| G | UNTUK LAIN - LAIN | INPUT MANUAL | STRING(6) | 6 baris |
| H | KG | CAMPURAN (ada formula & manual) | ANGKA(3), STRING(2) | 5 baris |
| I | KETERANGAN | KOLOM KOSONG |  | 0 baris |

#### Detail Kolom & Sample Data

##### Kolom A: NO.

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 22 baris
- **Tipe data**: ANGKA(20), STRING(2)
- **Sample**:
  - `Row 9: 1`
  - `Row 10: 2`
  - `Row 11: 3`
  - `Row 12: 4`
  - `Row 13: 5`

##### Kolom B: UNTUK PENJUALAN 

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 5 baris
- **Tipe data**: STRING(5)
- **Sample**:
  - `Row 6: PADA`
  - `Row 7: PERUSAHAAN / KOMUNAL`
  - `Row 9: NESTLE`
  - `Row 10: LOKAL`
  - `Row 11: AGEN`

##### Kolom C: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 19 baris
- **Tipe data**: STRING(19)
- **Sample**:
  - `Row 7: PER ORANGAN`
  - `Row 12: RS.DR SOETOMO`
  - `Row 13: SAMPURNA`
  - `Row 14: ALFAN`
  - `Row 15: DIDIK`

##### Kolom D: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 12 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(8), STRING(3)
- **Sample**:
  - `Row 7: KG`
  - `Row 9: 55490`
  - `Row 12: 3140`
  - `Row 14: 429`
  - `Row 18: 354`

##### Kolom E: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 19 baris
- **Tipe data**: STRING(1), RUPIAH(18)
- **Sample**:
  - `Row 7: RP`
  - `Row 10: 0`
  - `Row 12: 12400`
  - `Row 13: 12000`
  - `Row 14: 9500`

##### Kolom F: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 21 baris
- **Tipe data**: STRING(20), RUPIAH(1)
- **Sample**:
  - `Row 7: RP`
  - `Row 9: 432820064.1`
  - `Row 10: 0`
  - `Row 12: 38936000`
  - `Row 13: 0`

##### Kolom G: UNTUK LAIN - LAIN

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 6 baris
- **Tipe data**: STRING(6)
- **Sample**:
  - `Row 6: DI PERGUNAKAN`
  - `Row 7: KARENA`
  - `Row 9: PECAH / RUSAK`
  - `Row 10: SOSIAL / SUMBANGAN`
  - `Row 11: KARYAWAN`

##### Kolom H: KG

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 5 baris
- **Tipe data**: ANGKA(3), STRING(2)
- **Sample**:
  - `Row 9: 60`
  - `Row 10: 180`
  - `Row 11: 130`
  - `Row 29: 370`
  - `Row 37: USMAN HADI`

#### Format Angka yang Digunakan

| Format | Jumlah Cell | Contoh |
|---|---|---|
| `_(* #,##0_);_(* \(#,##0\);_(* "-"_);_(@_)` | 48 | D9: 55490; F9: 432820064.1 |

#### Formula yang Ditemukan (22 formula)

- `F10`: `=D10*E10` → **0**
- `F12`: `=D12*E12` → **38936000**
- `F13`: `=D13*E13` → **0**
- `F14`: `=D14*E14` → **4075500**
- `F15`: `=D15*E15` → **0**
- `F16`: `=D16*E16` → **0**
- `F17`: `=D17*E17` → **0**
- `F18`: `=D18*E18` → **3363000**
- `F19`: `=D19*E19` → **25887500**
- `F20`: `=D20*E20` → **190000**
- `F21`: `=D21*E21` → **0**
- `F22`: `=D22*E22` → **369468000**
- `F23`: `=D23*E23` → **2660000**
- `F24`: `=D24*E24` → **0**
- `F25`: `=D25*E25` → **0**
- `F26`: `=D26*E26` → **0**
- `F27`: `=D27*E27` → **0**
- `F28`: `=D28*E28` → **0**
- `D30`: `=D29+H29` → **103860**
- `D29`: `=SUM(D9:D28)` → **103490**
- `F29`: `=SUM(F9:F28)` → **877400064.1**
- `H29`: `=SUM(H9:H11)` → **370**

#### Sample Data (5 baris pertama)

| NO. | UNTUK PENJUALAN  | (kosong) | (kosong) | (kosong) | (kosong) | UNTUK LAIN - LAIN | KG | KETERANGAN |
|---|---|---|---|---|---|---|---|---|
| (kosong) | PADA | (kosong) | (kosong) | (kosong) | (kosong) | DI PERGUNAKAN | (kosong) | (kosong) |
| (kosong) | PERUSAHAAN / KOMUNAL | PER ORANGAN | KG | RP | RP | KARENA | (kosong) | (kosong) |
| (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 1 | NESTLE | (kosong) | 55490 | (kosong) | 432820064.1 | PECAH / RUSAK | 60 | (kosong) |
| 2 | LOKAL | (kosong) | (kosong) | 0 | 0 | SOSIAL / SUMBANGAN | 180 | (kosong) |

#### Baris Terakhir (kemungkinan Total/Summary)

- `D37: DRH.H.M.ILHAM SUPRAYITNO`
- `H37: USMAN HADI`

#### Kolom Kosong

- I

---

### SHEET: JUNI

| Properti | Nilai |
|---|---|
| Dimensi | A1:I39 |
| Max Baris | 39 |
| Max Kolom | 9 |
| Visibilitas | visible |
| Merged Cells | 12 |
| Formula | 22 |
| Hidden Rows | 0 |
| Hidden Cols | 1 |

#### Konten Sebelum Header

- `A1: LAPORAN PENGELUARAN SUSU`
- `A2: KOPERASI AGRIBISNIS DANA MULYA`
- `A3: PERIODE :JUNI 2026`

#### Merged Cells

- `I5:I7`
- `A2:I2`
- `B5:F5`
- `A1:I1`
- `H37:I37`
- `C32:I32`
- `A30:C30`
- `A5:A7`
- `H5:H7`
- `A3:I3`
- `D37:G37`
- `A29:C29`

#### Hidden Columns

- Kolom: E

#### Header (Baris 5)

- **A**: NO.
- **B**: UNTUK PENJUALAN 
- **C**: (kosong)
- **D**: (kosong)
- **E**: (kosong)
- **F**: (kosong)
- **G**: UNTUK LAIN - LAIN
- **H**: KG
- **I**: KETERANGAN

#### Analisis Kolom

| Kolom | Header | Klasifikasi | Tipe Data | Isi |
|---|---|---|---|---|
| A | NO. | INPUT MANUAL | ANGKA(20), STRING(2) | 22 baris |
| B | UNTUK PENJUALAN  | INPUT MANUAL | STRING(5) | 5 baris |
| C | (kosong) | INPUT MANUAL | STRING(19) | 19 baris |
| D | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(8), STRING(3) | 12 baris |
| E | (kosong) | INPUT MANUAL | STRING(1), RUPIAH(18) | 19 baris |
| F | (kosong) | CAMPURAN (ada formula & manual) | STRING(20), RUPIAH(1) | 21 baris |
| G | UNTUK LAIN - LAIN | INPUT MANUAL | STRING(6) | 6 baris |
| H | KG | CAMPURAN (ada formula & manual) | ANGKA(3), STRING(2) | 5 baris |
| I | KETERANGAN | KOLOM KOSONG |  | 0 baris |

#### Detail Kolom & Sample Data

##### Kolom A: NO.

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 22 baris
- **Tipe data**: ANGKA(20), STRING(2)
- **Sample**:
  - `Row 9: 1`
  - `Row 10: 2`
  - `Row 11: 3`
  - `Row 12: 4`
  - `Row 13: 5`

##### Kolom B: UNTUK PENJUALAN 

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 5 baris
- **Tipe data**: STRING(5)
- **Sample**:
  - `Row 6: PADA`
  - `Row 7: PERUSAHAAN / KOMUNAL`
  - `Row 9: NESTLE`
  - `Row 10: LOKAL`
  - `Row 11: AGEN`

##### Kolom C: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 19 baris
- **Tipe data**: STRING(19)
- **Sample**:
  - `Row 7: PER ORANGAN`
  - `Row 12: RS.DR SOETOMO`
  - `Row 13: SAMPURNA`
  - `Row 14: ALFAN`
  - `Row 15: DIDIK`

##### Kolom D: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 12 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(8), STRING(3)
- **Sample**:
  - `Row 7: KG`
  - `Row 9: 54590`
  - `Row 12: 3165`
  - `Row 14: 459`
  - `Row 18: 352`

##### Kolom E: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 19 baris
- **Tipe data**: STRING(1), RUPIAH(18)
- **Sample**:
  - `Row 7: RP`
  - `Row 10: 0`
  - `Row 12: 12400`
  - `Row 13: 12000`
  - `Row 14: 9500`

##### Kolom F: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 21 baris
- **Tipe data**: STRING(20), RUPIAH(1)
- **Sample**:
  - `Row 7: RP`
  - `Row 9: 445232836.2`
  - `Row 10: 0`
  - `Row 12: 39246000`
  - `Row 13: 0`

##### Kolom G: UNTUK LAIN - LAIN

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 6 baris
- **Tipe data**: STRING(6)
- **Sample**:
  - `Row 6: DI PERGUNAKAN`
  - `Row 7: KARENA`
  - `Row 9: PECAH / RUSAK`
  - `Row 10: SOSIAL / SUMBANGAN`
  - `Row 11: KARYAWAN`

##### Kolom H: KG

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 5 baris
- **Tipe data**: ANGKA(3), STRING(2)
- **Sample**:
  - `Row 9: 30`
  - `Row 10: 180`
  - `Row 11: 80`
  - `Row 29: 290`
  - `Row 37: USMAN HADI`

#### Format Angka yang Digunakan

| Format | Jumlah Cell | Contoh |
|---|---|---|
| `_(* #,##0_);_(* \(#,##0\);_(* "-"_);_(@_)` | 48 | D9: 54590; F9: 445232836.2 |

#### Formula yang Ditemukan (22 formula)

- `F10`: `=D10*E10` → **0**
- `F12`: `=D12*E12` → **39246000**
- `F13`: `=D13*E13` → **0**
- `F14`: `=D14*E14` → **4360500**
- `F15`: `=D15*E15` → **0**
- `F16`: `=D16*E16` → **0**
- `F17`: `=D17*E17` → **0**
- `F18`: `=D18*E18` → **3344000**
- `F19`: `=D19*E19` → **31844000**
- `F20`: `=D20*E20` → **570000**
- `F21`: `=D21*E21` → **0**
- `F22`: `=D22*E22` → **357075000**
- `F23`: `=D23*E23` → **1330000**
- `F24`: `=D24*E24` → **0**
- `F25`: `=D25*E25` → **0**
- `F26`: `=D26*E26` → **0**
- `F27`: `=D27*E27` → **0**
- `F28`: `=D28*E28` → **0**
- `D30`: `=D29+H29` → **102083**
- `D29`: `=SUM(D9:D28)` → **101793**
- `F29`: `=SUM(F9:F28)` → **883002336.2**
- `H29`: `=SUM(H9:H11)` → **290**

#### Sample Data (5 baris pertama)

| NO. | UNTUK PENJUALAN  | (kosong) | (kosong) | (kosong) | (kosong) | UNTUK LAIN - LAIN | KG | KETERANGAN |
|---|---|---|---|---|---|---|---|---|
| (kosong) | PADA | (kosong) | (kosong) | (kosong) | (kosong) | DI PERGUNAKAN | (kosong) | (kosong) |
| (kosong) | PERUSAHAAN / KOMUNAL | PER ORANGAN | KG | RP | RP | KARENA | (kosong) | (kosong) |
| (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 1 | NESTLE | (kosong) | 54590 | (kosong) | 445232836.2 | PECAH / RUSAK | 30 | (kosong) |
| 2 | LOKAL | (kosong) | (kosong) | 0 | 0 | SOSIAL / SUMBANGAN | 180 | (kosong) |

#### Baris Terakhir (kemungkinan Total/Summary)

- `D37: DRH.H.M.ILHAM SUPRAYITNO`
- `H37: USMAN HADI`

#### Kolom Kosong

- I

---

### SHEET: JULI

| Properti | Nilai |
|---|---|
| Dimensi | A1:I39 |
| Max Baris | 39 |
| Max Kolom | 9 |
| Visibilitas | visible |
| Merged Cells | 12 |
| Formula | 22 |
| Hidden Rows | 0 |
| Hidden Cols | 0 |

#### Konten Sebelum Header

- `A1: LAPORAN PENGELUARAN SUSU`
- `A2: KOPERASI AGRIBISNIS DANA MULYA`
- `A3: PERIODE :JULI 2026`

#### Merged Cells

- `I5:I7`
- `A2:I2`
- `B5:F5`
- `A1:I1`
- `A5:A7`
- `A3:I3`
- `A30:C30`
- `C32:I32`
- `H5:H7`
- `H37:I37`
- `D37:G37`
- `A29:C29`

#### Header (Baris 5)

- **A**: NO.
- **B**: UNTUK PENJUALAN 
- **C**: (kosong)
- **D**: (kosong)
- **E**: (kosong)
- **F**: (kosong)
- **G**: UNTUK LAIN - LAIN
- **H**: KG
- **I**: KETERANGAN

#### Analisis Kolom

| Kolom | Header | Klasifikasi | Tipe Data | Isi |
|---|---|---|---|---|
| A | NO. | INPUT MANUAL | ANGKA(20), STRING(2) | 22 baris |
| B | UNTUK PENJUALAN  | INPUT MANUAL | STRING(5) | 5 baris |
| C | (kosong) | INPUT MANUAL | STRING(19) | 19 baris |
| D | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(8), STRING(3) | 12 baris |
| E | (kosong) | INPUT MANUAL | STRING(1), RUPIAH(18) | 19 baris |
| F | (kosong) | CAMPURAN (ada formula & manual) | STRING(20), RUPIAH(1) | 21 baris |
| G | UNTUK LAIN - LAIN | INPUT MANUAL | STRING(6) | 6 baris |
| H | KG | CAMPURAN (ada formula & manual) | ANGKA(3), STRING(2) | 5 baris |
| I | KETERANGAN | KOLOM KOSONG |  | 0 baris |

#### Detail Kolom & Sample Data

##### Kolom A: NO.

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 22 baris
- **Tipe data**: ANGKA(20), STRING(2)
- **Sample**:
  - `Row 9: 1`
  - `Row 10: 2`
  - `Row 11: 3`
  - `Row 12: 4`
  - `Row 13: 5`

##### Kolom B: UNTUK PENJUALAN 

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 5 baris
- **Tipe data**: STRING(5)
- **Sample**:
  - `Row 6: PADA`
  - `Row 7: PERUSAHAAN / KOMUNAL`
  - `Row 9: NESTLE`
  - `Row 10: LOKAL`
  - `Row 11: AGEN`

##### Kolom C: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 19 baris
- **Tipe data**: STRING(19)
- **Sample**:
  - `Row 7: PER ORANGAN`
  - `Row 12: RS.DR SOETOMO`
  - `Row 13: SAMPURNA`
  - `Row 14: ALFAN`
  - `Row 15: DIDIK`

##### Kolom D: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 12 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(8), STRING(3)
- **Sample**:
  - `Row 7: KG`
  - `Row 9: 66140`
  - `Row 12: 3245`
  - `Row 14: 473`
  - `Row 18: 318`

##### Kolom E: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 19 baris
- **Tipe data**: STRING(1), RUPIAH(18)
- **Sample**:
  - `Row 7: RP`
  - `Row 10: 0`
  - `Row 12: 12400`
  - `Row 13: 12000`
  - `Row 14: 10000`

##### Kolom F: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 21 baris
- **Tipe data**: STRING(20), RUPIAH(1)
- **Sample**:
  - `Row 7: RP`
  - `Row 9: 549287783.9`
  - `Row 10: 0`
  - `Row 12: 40238000`
  - `Row 13: 0`

##### Kolom G: UNTUK LAIN - LAIN

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 6 baris
- **Tipe data**: STRING(6)
- **Sample**:
  - `Row 6: DI PERGUNAKAN`
  - `Row 7: KARENA`
  - `Row 9: PECAH / RUSAK`
  - `Row 10: SOSIAL / SUMBANGAN`
  - `Row 11: KARYAWAN`

##### Kolom H: KG

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 5 baris
- **Tipe data**: ANGKA(3), STRING(2)
- **Sample**:
  - `Row 9: 80`
  - `Row 10: 186`
  - `Row 11: 140`
  - `Row 29: 406`
  - `Row 37: USMAN HADI`

#### Format Angka yang Digunakan

| Format | Jumlah Cell | Contoh |
|---|---|---|
| `_(* #,##0_);_(* \(#,##0\);_(* "-"_);_(@_)` | 48 | D9: 66140; F9: 549287783.9 |

#### Formula yang Ditemukan (22 formula)

- `F10`: `=D10*E10` → **0**
- `F12`: `=D12*E12` → **40238000**
- `F13`: `=D13*E13` → **0**
- `F14`: `=D14*E14` → **4730000**
- `F15`: `=D15*E15` → **0**
- `F16`: `=D16*E16` → **0**
- `F17`: `=D17*E17` → **0**
- `F18`: `=D18*E18` → **3180000**
- `F19`: `=D19*E19` → **34170000**
- `F20`: `=D20*E20` → **400000**
- `F21`: `=D21*E21` → **0**
- `F22`: `=D22*E22` → **380300000**
- `F23`: `=D23*E23` → **1900000**
- `F24`: `=D24*E24` → **0**
- `F25`: `=D25*E25` → **0**
- `F26`: `=D26*E26` → **0**
- `F27`: `=D27*E27` → **0**
- `F28`: `=D28*E28` → **0**
- `D30`: `=D29+H29` → **112259**
- `D29`: `=SUM(D9:D28)` → **111853**
- `F29`: `=SUM(F9:F28)` → **1014205783.9**
- `H29`: `=SUM(H9:H11)` → **406**

#### Sample Data (5 baris pertama)

| NO. | UNTUK PENJUALAN  | (kosong) | (kosong) | (kosong) | (kosong) | UNTUK LAIN - LAIN | KG | KETERANGAN |
|---|---|---|---|---|---|---|---|---|
| (kosong) | PADA | (kosong) | (kosong) | (kosong) | (kosong) | DI PERGUNAKAN | (kosong) | (kosong) |
| (kosong) | PERUSAHAAN / KOMUNAL | PER ORANGAN | KG | RP | RP | KARENA | (kosong) | (kosong) |
| (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 1 | NESTLE | (kosong) | 66140 | (kosong) | 549287783.9 | PECAH / RUSAK | 80 | (kosong) |
| 2 | LOKAL | (kosong) | (kosong) | 0 | 0 | SOSIAL / SUMBANGAN | 186 | (kosong) |

#### Baris Terakhir (kemungkinan Total/Summary)

- `D37: DRH.H.M.ILHAM SUPRAYITNO`
- `H37: USMAN HADI`

#### Kolom Kosong

- I

---

## FILE: LAPORAN BULANAN PENERIMAAN SUSU 2026.xlsx

- **Path**: `C:\Users\HP\Desktop\KKN SIE ACARA\Proker UMKM\Koperasidanamulya\LAPORAN BULANAN PENERIMAAN SUSU 2026.xlsx`
- **Ukuran**: 22.8 KB
- **Jumlah Sheet**: 7
- **Nama Sheet**: Januari, februari, maret, April, MEI, JUNI, JULI

### SHEET: Januari

| Properti | Nilai |
|---|---|
| Dimensi | A1:N40 |
| Max Baris | 40 |
| Max Kolom | 14 |
| Visibilitas | visible |
| Merged Cells | 9 |
| Formula | 10 |
| Hidden Rows | 0 |
| Hidden Cols | 0 |

#### Konten Sebelum Header

- `A1: LAPORAN PENERIMAAN SUSU`
- `A2: KOPERASI AGRIBISNIS DANA MULYA`
- `A3: BULAN  JANUARI 2026`

#### Merged Cells

- `A1:J1`
- `C21:J21`
- `C20:J20`
- `I25:J25`
- `A3:J3`
- `C25:F25`
- `A2:J2`
- `A17:B17`
- `A18:B18`

#### Header (Baris 5)

- **A**: NO
- **B**: DARI ANGGOTA
- **C**: (kosong)
- **D**: (kosong)
- **E**: DARI NON ANGGOTA
- **F**: (kosong)
- **G**: (kosong)
- **H**: JUMLAH
- **I**: (kosong)
- **J**: KETERANGAN
- **K**: (kosong)
- **L**: (kosong)
- **M**: (kosong)
- **N**: (kosong)

#### Analisis Kolom

| Kolom | Header | Klasifikasi | Tipe Data | Isi |
|---|---|---|---|---|
| A | NO | INPUT MANUAL | ANGKA(9), STRING(2) | 11 baris |
| B | DARI ANGGOTA | INPUT MANUAL | STRING(10) | 10 baris |
| C | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(9), STRING(5) | 15 baris |
| D | (kosong) | INPUT MANUAL | STRING(1), RUPIAH(1) | 2 baris |
| E | DARI NON ANGGOTA | INPUT MANUAL | STRING(7) | 7 baris |
| F | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(2), ANGKA(1), STRING(1) | 5 baris |
| G | (kosong) | CAMPURAN (ada formula & manual) | STRING(8) | 8 baris |
| H | JUMLAH | INPUT MANUAL | STRING (mungkin KG)(1), STRING KOSONG(1) | 2 baris |
| I | (kosong) | INPUT MANUAL | STRING(2) | 2 baris |
| J | KETERANGAN | KOLOM KOSONG |  | 0 baris |
| K | (kosong) | KOLOM KOSONG |  | 0 baris |
| L | (kosong) | KOLOM KOSONG |  | 0 baris |
| M | (kosong) | KOLOM KOSONG |  | 0 baris |
| N | (kosong) | KOLOM KOSONG |  | 0 baris |

#### Detail Kolom & Sample Data

##### Kolom A: NO

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 11 baris
- **Tipe data**: ANGKA(9), STRING(2)
- **Sample**:
  - `Row 8: 1`
  - `Row 9: 2`
  - `Row 10: 3`
  - `Row 11: 4`
  - `Row 12: 5`

##### Kolom B: DARI ANGGOTA

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 10 baris
- **Tipe data**: STRING(10)
- **Sample**:
  - `Row 6: KELOMPOK`
  - `Row 8: CEMBOR`
  - `Row 9: CLAKET`
  - `Row 10: MLIGI`
  - `Row 11: KAMBENGAN`

##### Kolom C: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 15 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(9), STRING(5)
- **Sample**:
  - `Row 6: KG`
  - `Row 8: 14602`
  - `Row 9: 17884`
  - `Row 10: 3244`
  - `Row 11: 2513`

##### Kolom D: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 2 baris
- **Tipe data**: STRING(1), RUPIAH(1)
- **Sample**:
  - `Row 6: RP`
  - `Row 17: 608718000`

##### Kolom E: DARI NON ANGGOTA

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 7 baris
- **Tipe data**: STRING(7)
- **Sample**:
  - `Row 6: WILAYAH`
  - `Row 8: TAWAR`
  - `Row 9: PRAMBON`
  - `Row 10: BRANGKAL`
  - `Row 11: KRIAN`

##### Kolom F: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 5 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(2), ANGKA(1), STRING(1)
- **Sample**:
  - `Row 6: KG`
  - `Row 9: 2443`
  - `Row 11: 3930`
  - `Row 12: 4184`
  - `Row 17: 10557`

##### Kolom G: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 8 baris
- **Tipe data**: STRING(8)
- **Sample**:
  - `Row 6: RP`
  - `Row 8: 0`
  - `Row 9: 17101000`
  - `Row 10: 0`
  - `Row 11: 28296000`

##### Kolom H: JUMLAH

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 2 baris
- **Tipe data**: STRING (mungkin KG)(1), STRING KOSONG(1)
- **Sample**:
  - `Row 6: KG`
  - `Row 25:      `

##### Kolom I: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 2 baris
- **Tipe data**: STRING(2)
- **Sample**:
  - `Row 6: RP`
  - `Row 25: USMAN HADI`

#### Format Angka yang Digunakan

| Format | Jumlah Cell | Contoh |
|---|---|---|
| `#,##0` | 22 | C8: 14602; G8: =SUM(F8*8000) |

#### Formula yang Ditemukan (10 formula)

- `C18`: `=SUM(C17+F17)` → **98777**
- `C17`: `=SUM(C8+C9+C10+C11+C12+C13+C14+C15+C16)` → **88220**
- `G18`: `=SUM(D17+G17)` → **683403000**
- `G10`: `=SUM(F10*7000)` → **0**
- `G11`: `=SUM(F11*7200)` → **28296000**
- `G12`: `=SUM(F12*7000)` → **29288000**
- `G8`: `=SUM(F8*8000)` → **0**
- `F17`: `=SUM(F8+F9+F10+F11+F12)` → **10557**
- `G9`: `=SUM(F9*7000)` → **17101000**
- `G17`: `=SUM(G8:G16)` → **74685000**

#### Sample Data (5 baris pertama)

| NO | DARI ANGGOTA | (kosong) | (kosong) | DARI NON ANGGOTA | (kosong) | (kosong) | JUMLAH | (kosong) | KETERANGAN | (kosong) | (kosong) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| (kosong) | KELOMPOK | KG | RP | WILAYAH | KG | RP | KG | RP | (kosong) | (kosong) | (kosong) |
| (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 1 | CEMBOR | 14602 | (kosong) | TAWAR | (kosong) | 0 | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 2 | CLAKET | 17884 | (kosong) | PRAMBON | 2443 | 17101000 | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 3 | MLIGI | 3244 | (kosong) | BRANGKAL | (kosong) | 0 | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |

*Catatan: 2 kolom lainnya tidak ditampilkan*

#### Kolom Kosong

- J, K, L, M, N

---

### SHEET: februari

| Properti | Nilai |
|---|---|
| Dimensi | A1:N40 |
| Max Baris | 40 |
| Max Kolom | 14 |
| Visibilitas | visible |
| Merged Cells | 9 |
| Formula | 10 |
| Hidden Rows | 0 |
| Hidden Cols | 0 |

#### Konten Sebelum Header

- `A1: LAPORAN PENERIMAAN SUSU`
- `A2: KOPERASI AGRIBISNIS DANA MULYA`
- `A3: BULAN  FEBRUARI 2026`

#### Merged Cells

- `A1:J1`
- `C21:J21`
- `C20:J20`
- `I25:J25`
- `A3:J3`
- `C25:F25`
- `A2:J2`
- `A18:B18`
- `A17:B17`

#### Header (Baris 5)

- **A**: NO
- **B**: DARI ANGGOTA
- **C**: (kosong)
- **D**: (kosong)
- **E**: DARI NON ANGGOTA
- **F**: (kosong)
- **G**: (kosong)
- **H**: JUMLAH
- **I**: (kosong)
- **J**: KETERANGAN
- **K**: (kosong)
- **L**: (kosong)
- **M**: (kosong)
- **N**: (kosong)

#### Analisis Kolom

| Kolom | Header | Klasifikasi | Tipe Data | Isi |
|---|---|---|---|---|
| A | NO | INPUT MANUAL | ANGKA(9), STRING(2) | 11 baris |
| B | DARI ANGGOTA | INPUT MANUAL | STRING(10) | 10 baris |
| C | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(9), STRING(5) | 15 baris |
| D | (kosong) | INPUT MANUAL | STRING(1), RUPIAH(1) | 2 baris |
| E | DARI NON ANGGOTA | INPUT MANUAL | STRING(7) | 7 baris |
| F | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(2), ANGKA(1), STRING(1) | 5 baris |
| G | (kosong) | CAMPURAN (ada formula & manual) | STRING(8) | 8 baris |
| H | JUMLAH | INPUT MANUAL | STRING (mungkin KG)(1), STRING KOSONG(1) | 2 baris |
| I | (kosong) | INPUT MANUAL | STRING(2) | 2 baris |
| J | KETERANGAN | KOLOM KOSONG |  | 0 baris |
| K | (kosong) | KOLOM KOSONG |  | 0 baris |
| L | (kosong) | KOLOM KOSONG |  | 0 baris |
| M | (kosong) | KOLOM KOSONG |  | 0 baris |
| N | (kosong) | KOLOM KOSONG |  | 0 baris |

#### Detail Kolom & Sample Data

##### Kolom A: NO

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 11 baris
- **Tipe data**: ANGKA(9), STRING(2)
- **Sample**:
  - `Row 8: 1`
  - `Row 9: 2`
  - `Row 10: 3`
  - `Row 11: 4`
  - `Row 12: 5`

##### Kolom B: DARI ANGGOTA

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 10 baris
- **Tipe data**: STRING(10)
- **Sample**:
  - `Row 6: KELOMPOK`
  - `Row 8: CEMBOR`
  - `Row 9: CLAKET`
  - `Row 10: MLIGI`
  - `Row 11: KAMBENGAN`

##### Kolom C: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 15 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(9), STRING(5)
- **Sample**:
  - `Row 6: KG`
  - `Row 8: 13529`
  - `Row 9: 16087`
  - `Row 10: 2612`
  - `Row 11: 2051`

##### Kolom D: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 2 baris
- **Tipe data**: STRING(1), RUPIAH(1)
- **Sample**:
  - `Row 6: RP`
  - `Row 17: 565487200`

##### Kolom E: DARI NON ANGGOTA

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 7 baris
- **Tipe data**: STRING(7)
- **Sample**:
  - `Row 6: WILAYAH`
  - `Row 8: TAWAR`
  - `Row 9: PRAMBON`
  - `Row 10: BRANGKAL`
  - `Row 11: KRIAN`

##### Kolom F: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 5 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(2), ANGKA(1), STRING(1)
- **Sample**:
  - `Row 6: KG`
  - `Row 9: 2289`
  - `Row 11: 3275`
  - `Row 12: 3659`
  - `Row 17: 9223`

##### Kolom G: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 8 baris
- **Tipe data**: STRING(8)
- **Sample**:
  - `Row 6: RP`
  - `Row 8: 0`
  - `Row 9: 16023000`
  - `Row 10: 0`
  - `Row 11: 23580000`

##### Kolom H: JUMLAH

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 2 baris
- **Tipe data**: STRING (mungkin KG)(1), STRING KOSONG(1)
- **Sample**:
  - `Row 6: KG`
  - `Row 25:      `

##### Kolom I: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 2 baris
- **Tipe data**: STRING(2)
- **Sample**:
  - `Row 6: RP`
  - `Row 25: USMAN HADI`

#### Format Angka yang Digunakan

| Format | Jumlah Cell | Contoh |
|---|---|---|
| `#,##0` | 22 | C8: 13529; G8: =SUM(F8*8000) |

#### Formula yang Ditemukan (10 formula)

- `C18`: `=SUM(C17+F17)` → **86687**
- `C17`: `=SUM(C8+C9+C10+C11+C12+C13+C14+C15+C16)` → **77464**
- `G18`: `=SUM(D17+G17)` → **630703200**
- `G10`: `=SUM(F10*7000)` → **0**
- `G11`: `=SUM(F11*7200)` → **23580000**
- `G12`: `=SUM(F12*7000)` → **25613000**
- `G8`: `=SUM(F8*8000)` → **0**
- `F17`: `=SUM(F8+F9+F10+F11+F12)` → **9223**
- `G9`: `=SUM(F9*7000)` → **16023000**
- `G17`: `=SUM(G8:G16)` → **65216000**

#### Sample Data (5 baris pertama)

| NO | DARI ANGGOTA | (kosong) | (kosong) | DARI NON ANGGOTA | (kosong) | (kosong) | JUMLAH | (kosong) | KETERANGAN | (kosong) | (kosong) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| (kosong) | KELOMPOK | KG | RP | WILAYAH | KG | RP | KG | RP | (kosong) | (kosong) | (kosong) |
| (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 1 | CEMBOR | 13529 | (kosong) | TAWAR | (kosong) | 0 | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 2 | CLAKET | 16087 | (kosong) | PRAMBON | 2289 | 16023000 | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 3 | MLIGI | 2612 | (kosong) | BRANGKAL | (kosong) | 0 | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |

*Catatan: 2 kolom lainnya tidak ditampilkan*

#### Kolom Kosong

- J, K, L, M, N

---

### SHEET: maret

| Properti | Nilai |
|---|---|
| Dimensi | A1:N40 |
| Max Baris | 40 |
| Max Kolom | 14 |
| Visibilitas | visible |
| Merged Cells | 9 |
| Formula | 10 |
| Hidden Rows | 0 |
| Hidden Cols | 0 |

#### Konten Sebelum Header

- `A1: LAPORAN PENERIMAAN SUSU`
- `A2: KOPERASI AGRIBISNIS DANA MULYA`
- `A3: BULAN  MARET 2026`

#### Merged Cells

- `A1:J1`
- `C21:J21`
- `C20:J20`
- `I25:J25`
- `A3:J3`
- `C25:F25`
- `A2:J2`
- `A17:B17`
- `A18:B18`

#### Header (Baris 5)

- **A**: NO
- **B**: DARI ANGGOTA
- **C**: (kosong)
- **D**: (kosong)
- **E**: DARI NON ANGGOTA
- **F**: (kosong)
- **G**: (kosong)
- **H**: JUMLAH
- **I**: (kosong)
- **J**: KETERANGAN
- **K**: (kosong)
- **L**: (kosong)
- **M**: (kosong)
- **N**: (kosong)

#### Analisis Kolom

| Kolom | Header | Klasifikasi | Tipe Data | Isi |
|---|---|---|---|---|
| A | NO | INPUT MANUAL | ANGKA(9), STRING(2) | 11 baris |
| B | DARI ANGGOTA | INPUT MANUAL | STRING(10) | 10 baris |
| C | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(9), STRING(5) | 15 baris |
| D | (kosong) | INPUT MANUAL | STRING(1), RUPIAH(1) | 2 baris |
| E | DARI NON ANGGOTA | INPUT MANUAL | STRING(7) | 7 baris |
| F | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(2), ANGKA(1), STRING(1) | 5 baris |
| G | (kosong) | CAMPURAN (ada formula & manual) | STRING(8) | 8 baris |
| H | JUMLAH | INPUT MANUAL | STRING (mungkin KG)(1), STRING KOSONG(1) | 2 baris |
| I | (kosong) | INPUT MANUAL | STRING(2) | 2 baris |
| J | KETERANGAN | KOLOM KOSONG |  | 0 baris |
| K | (kosong) | KOLOM KOSONG |  | 0 baris |
| L | (kosong) | KOLOM KOSONG |  | 0 baris |
| M | (kosong) | KOLOM KOSONG |  | 0 baris |
| N | (kosong) | KOLOM KOSONG |  | 0 baris |

#### Detail Kolom & Sample Data

##### Kolom A: NO

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 11 baris
- **Tipe data**: ANGKA(9), STRING(2)
- **Sample**:
  - `Row 8: 1`
  - `Row 9: 2`
  - `Row 10: 3`
  - `Row 11: 4`
  - `Row 12: 5`

##### Kolom B: DARI ANGGOTA

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 10 baris
- **Tipe data**: STRING(10)
- **Sample**:
  - `Row 6: KELOMPOK`
  - `Row 8: CEMBOR`
  - `Row 9: CLAKET`
  - `Row 10: MLIGI`
  - `Row 11: KAMBENGAN`

##### Kolom C: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 15 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(9), STRING(5)
- **Sample**:
  - `Row 6: KG`
  - `Row 8: 14452`
  - `Row 9: 18258`
  - `Row 10: 3327`
  - `Row 11: 2426`

##### Kolom D: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 2 baris
- **Tipe data**: STRING(1), RUPIAH(1)
- **Sample**:
  - `Row 6: RP`
  - `Row 17: 636129300`

##### Kolom E: DARI NON ANGGOTA

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 7 baris
- **Tipe data**: STRING(7)
- **Sample**:
  - `Row 6: WILAYAH`
  - `Row 8: TAWAR`
  - `Row 9: PRAMBON`
  - `Row 10: BRANGKAL`
  - `Row 11: KRIAN`

##### Kolom F: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 5 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(2), ANGKA(1), STRING(1)
- **Sample**:
  - `Row 6: KG`
  - `Row 9: 3455`
  - `Row 11: 3530`
  - `Row 12: 3916`
  - `Row 17: 10901`

##### Kolom G: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 8 baris
- **Tipe data**: STRING(8)
- **Sample**:
  - `Row 6: RP`
  - `Row 8: 0`
  - `Row 9: 24876000`
  - `Row 10: 0`
  - `Row 11: 26475000`

##### Kolom H: JUMLAH

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 2 baris
- **Tipe data**: STRING (mungkin KG)(1), STRING KOSONG(1)
- **Sample**:
  - `Row 6: KG`
  - `Row 25:      `

##### Kolom I: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 2 baris
- **Tipe data**: STRING(2)
- **Sample**:
  - `Row 6: RP`
  - `Row 25: USMAN HADI`

#### Format Angka yang Digunakan

| Format | Jumlah Cell | Contoh |
|---|---|---|
| `#,##0` | 22 | C8: 14452; G8: =SUM(F8*8000) |

#### Formula yang Ditemukan (10 formula)

- `C18`: `=SUM(C17+F17)` → **98042**
- `C17`: `=SUM(C8+C9+C10+C11+C12+C13+C14+C15+C16)` → **87141**
- `G18`: `=SUM(D17+G17)` → **716850300**
- `G10`: `=SUM(F10*7000)` → **0**
- `G11`: `=SUM(F11*7500)` → **26475000**
- `G12`: `=SUM(F12*7500)` → **29370000**
- `G8`: `=SUM(F8*8000)` → **0**
- `F17`: `=SUM(F8+F9+F10+F11+F12)` → **10901**
- `G9`: `=SUM(F9*7200)` → **24876000**
- `G17`: `=SUM(G8:G16)` → **80721000**

#### Sample Data (5 baris pertama)

| NO | DARI ANGGOTA | (kosong) | (kosong) | DARI NON ANGGOTA | (kosong) | (kosong) | JUMLAH | (kosong) | KETERANGAN | (kosong) | (kosong) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| (kosong) | KELOMPOK | KG | RP | WILAYAH | KG | RP | KG | RP | (kosong) | (kosong) | (kosong) |
| (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 1 | CEMBOR | 14452 | (kosong) | TAWAR | (kosong) | 0 | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 2 | CLAKET | 18258 | (kosong) | PRAMBON | 3455 | 24876000 | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 3 | MLIGI | 3327 | (kosong) | BRANGKAL | (kosong) | 0 | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |

*Catatan: 2 kolom lainnya tidak ditampilkan*

#### Kolom Kosong

- J, K, L, M, N

---

### SHEET: April

| Properti | Nilai |
|---|---|
| Dimensi | A1:N40 |
| Max Baris | 40 |
| Max Kolom | 14 |
| Visibilitas | visible |
| Merged Cells | 9 |
| Formula | 12 |
| Hidden Rows | 0 |
| Hidden Cols | 0 |

#### Konten Sebelum Header

- `A1: LAPORAN PENERIMAAN SUSU`
- `A2: KOPERASI AGRIBISNIS DANA MULYA`
- `A3: BULAN  APRI L2026`

#### Merged Cells

- `A1:J1`
- `C21:J21`
- `C20:J20`
- `I25:J25`
- `A3:J3`
- `C25:F25`
- `A2:J2`
- `A18:B18`
- `A17:B17`

#### Header (Baris 5)

- **A**: NO
- **B**: DARI ANGGOTA
- **C**: (kosong)
- **D**: (kosong)
- **E**: DARI NON ANGGOTA
- **F**: (kosong)
- **G**: (kosong)
- **H**: JUMLAH
- **I**: (kosong)
- **J**: KETERANGAN
- **K**: (kosong)
- **L**: (kosong)
- **M**: (kosong)
- **N**: (kosong)

#### Analisis Kolom

| Kolom | Header | Klasifikasi | Tipe Data | Isi |
|---|---|---|---|---|
| A | NO | INPUT MANUAL | ANGKA(9), STRING(2) | 11 baris |
| B | DARI ANGGOTA | INPUT MANUAL | STRING(10) | 10 baris |
| C | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(9), STRING(5) | 15 baris |
| D | (kosong) | INPUT MANUAL | STRING(1), RUPIAH(1) | 2 baris |
| E | DARI NON ANGGOTA | INPUT MANUAL | STRING(9) | 9 baris |
| F | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(3), ANGKA(2), STRING(1) | 7 baris |
| G | (kosong) | CAMPURAN (ada formula & manual) | STRING(10) | 10 baris |
| H | JUMLAH | INPUT MANUAL | STRING (mungkin KG)(1), STRING KOSONG(1) | 2 baris |
| I | (kosong) | INPUT MANUAL | STRING(2) | 2 baris |
| J | KETERANGAN | KOLOM KOSONG |  | 0 baris |
| K | (kosong) | KOLOM KOSONG |  | 0 baris |
| L | (kosong) | KOLOM KOSONG |  | 0 baris |
| M | (kosong) | KOLOM KOSONG |  | 0 baris |
| N | (kosong) | KOLOM KOSONG |  | 0 baris |

#### Detail Kolom & Sample Data

##### Kolom A: NO

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 11 baris
- **Tipe data**: ANGKA(9), STRING(2)
- **Sample**:
  - `Row 8: 1`
  - `Row 9: 2`
  - `Row 10: 3`
  - `Row 11: 4`
  - `Row 12: 5`

##### Kolom B: DARI ANGGOTA

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 10 baris
- **Tipe data**: STRING(10)
- **Sample**:
  - `Row 6: KELOMPOK`
  - `Row 8: CEMBOR`
  - `Row 9: CLAKET`
  - `Row 10: MLIGI`
  - `Row 11: KAMBENGAN`

##### Kolom C: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 15 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(9), STRING(5)
- **Sample**:
  - `Row 6: KG`
  - `Row 8: 13743`
  - `Row 9: 17953`
  - `Row 10: 2633`
  - `Row 11: 3015`

##### Kolom D: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 2 baris
- **Tipe data**: STRING(1), RUPIAH(1)
- **Sample**:
  - `Row 6: RP`
  - `Row 17: 530686800`

##### Kolom E: DARI NON ANGGOTA

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 9 baris
- **Tipe data**: STRING(9)
- **Sample**:
  - `Row 6: WILAYAH`
  - `Row 8: MOJOSARI`
  - `Row 9: PRAMBON`
  - `Row 10: BRANGKAL`
  - `Row 11: KRIAN`

##### Kolom F: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 7 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(3), ANGKA(2), STRING(1)
- **Sample**:
  - `Row 6: KG`
  - `Row 8: 1600`
  - `Row 9: 1800`
  - `Row 11: 2550`
  - `Row 13: 1753`

##### Kolom G: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 10 baris
- **Tipe data**: STRING(10)
- **Sample**:
  - `Row 6: RP`
  - `Row 8: 11520000`
  - `Row 9: 12960000`
  - `Row 10: 0`
  - `Row 11: 19125000`

##### Kolom H: JUMLAH

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 2 baris
- **Tipe data**: STRING (mungkin KG)(1), STRING KOSONG(1)
- **Sample**:
  - `Row 6: KG`
  - `Row 25:      `

##### Kolom I: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 2 baris
- **Tipe data**: STRING(2)
- **Sample**:
  - `Row 6: RP`
  - `Row 25: USMAN HADI`

#### Format Angka yang Digunakan

| Format | Jumlah Cell | Contoh |
|---|---|---|
| `#,##0` | 25 | C8: 13743; F8: 1600 |

#### Formula yang Ditemukan (12 formula)

- `C18`: `=SUM(C17+F17)` → **92499**
- `C17`: `=SUM(C8+C9+C10+C11+C12+C13+C14+C15+C16)` → **84236**
- `G18`: `=SUM(D17+G17)` → **592795800**
- `G10`: `=SUM(F10*7000)` → **0**
- `G11`: `=SUM(F11*7500)` → **19125000**
- `G12`: `=SUM(F12*7500)` → **0**
- `G13`: `=SUM(F13*8000)` → **14024000**
- `G14`: `=SUM(F14*8000)` → **4480000**
- `G8`: `=SUM(F8*7200)` → **11520000**
- `F17`: `=SUM(F8+F9+F10+F11+F12+F13+F14+F15+F16)` → **8263**
- `G9`: `=SUM(F9*7200)` → **12960000**
- `G17`: `=SUM(G8:G16)` → **62109000**

#### Sample Data (5 baris pertama)

| NO | DARI ANGGOTA | (kosong) | (kosong) | DARI NON ANGGOTA | (kosong) | (kosong) | JUMLAH | (kosong) | KETERANGAN | (kosong) | (kosong) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| (kosong) | KELOMPOK | KG | RP | WILAYAH | KG | RP | KG | RP | (kosong) | (kosong) | (kosong) |
| (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 1 | CEMBOR | 13743 | (kosong) | MOJOSARI | 1600 | 11520000 | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 2 | CLAKET | 17953 | (kosong) | PRAMBON | 1800 | 12960000 | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 3 | MLIGI | 2633 | (kosong) | BRANGKAL | (kosong) | 0 | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |

*Catatan: 2 kolom lainnya tidak ditampilkan*

#### Kolom Kosong

- J, K, L, M, N

---

### SHEET: MEI

| Properti | Nilai |
|---|---|
| Dimensi | A1:N40 |
| Max Baris | 40 |
| Max Kolom | 14 |
| Visibilitas | visible |
| Merged Cells | 9 |
| Formula | 12 |
| Hidden Rows | 0 |
| Hidden Cols | 0 |

#### Konten Sebelum Header

- `A1: LAPORAN PENERIMAAN SUSU`
- `A2: KOPERASI AGRIBISNIS DANA MULYA`
- `A3: BULAN  MEI 2026`

#### Merged Cells

- `A1:J1`
- `C21:J21`
- `C20:J20`
- `I25:J25`
- `A3:J3`
- `C25:F25`
- `A2:J2`
- `A17:B17`
- `A18:B18`

#### Header (Baris 5)

- **A**: NO
- **B**: DARI ANGGOTA
- **C**: (kosong)
- **D**: (kosong)
- **E**: DARI NON ANGGOTA
- **F**: (kosong)
- **G**: (kosong)
- **H**: JUMLAH
- **I**: (kosong)
- **J**: KETERANGAN
- **K**: (kosong)
- **L**: (kosong)
- **M**: (kosong)
- **N**: (kosong)

#### Analisis Kolom

| Kolom | Header | Klasifikasi | Tipe Data | Isi |
|---|---|---|---|---|
| A | NO | INPUT MANUAL | ANGKA(9), STRING(2) | 11 baris |
| B | DARI ANGGOTA | INPUT MANUAL | STRING(10) | 10 baris |
| C | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(9), STRING(5) | 15 baris |
| D | (kosong) | INPUT MANUAL | STRING(1), RUPIAH(1) | 2 baris |
| E | DARI NON ANGGOTA | INPUT MANUAL | STRING(9) | 9 baris |
| F | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(3), ANGKA(2), STRING(1) | 7 baris |
| G | (kosong) | CAMPURAN (ada formula & manual) | STRING(10) | 10 baris |
| H | JUMLAH | INPUT MANUAL | STRING (mungkin KG)(1), STRING KOSONG(1) | 2 baris |
| I | (kosong) | INPUT MANUAL | STRING(2) | 2 baris |
| J | KETERANGAN | KOLOM KOSONG |  | 0 baris |
| K | (kosong) | KOLOM KOSONG |  | 0 baris |
| L | (kosong) | KOLOM KOSONG |  | 0 baris |
| M | (kosong) | KOLOM KOSONG |  | 0 baris |
| N | (kosong) | KOLOM KOSONG |  | 0 baris |

#### Detail Kolom & Sample Data

##### Kolom A: NO

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 11 baris
- **Tipe data**: ANGKA(9), STRING(2)
- **Sample**:
  - `Row 8: 1`
  - `Row 9: 2`
  - `Row 10: 3`
  - `Row 11: 4`
  - `Row 12: 5`

##### Kolom B: DARI ANGGOTA

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 10 baris
- **Tipe data**: STRING(10)
- **Sample**:
  - `Row 6: KELOMPOK`
  - `Row 8: CEMBOR`
  - `Row 9: CLAKET`
  - `Row 10: MLIGI`
  - `Row 11: KAMBENGAN`

##### Kolom C: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 15 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(9), STRING(5)
- **Sample**:
  - `Row 6: KG`
  - `Row 8: 13515`
  - `Row 9: 18936`
  - `Row 10: 2064`
  - `Row 11: 3875`

##### Kolom D: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 2 baris
- **Tipe data**: STRING(1), RUPIAH(1)
- **Sample**:
  - `Row 6: RP`
  - `Row 17: 654795400`

##### Kolom E: DARI NON ANGGOTA

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 9 baris
- **Tipe data**: STRING(9)
- **Sample**:
  - `Row 6: WILAYAH`
  - `Row 8: MOJOSARI`
  - `Row 9: PRAMBON`
  - `Row 10: BRANGKAL`
  - `Row 11: KRIAN`

##### Kolom F: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 7 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(3), ANGKA(2), STRING(1)
- **Sample**:
  - `Row 6: KG`
  - `Row 8: 1663`
  - `Row 9: 2150`
  - `Row 11: 2590`
  - `Row 13: 7779`

##### Kolom G: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 10 baris
- **Tipe data**: STRING(10)
- **Sample**:
  - `Row 6: RP`
  - `Row 8: 12306200`
  - `Row 9: 15910000`
  - `Row 10: 0`
  - `Row 11: 19425000`

##### Kolom H: JUMLAH

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 2 baris
- **Tipe data**: STRING (mungkin KG)(1), STRING KOSONG(1)
- **Sample**:
  - `Row 6: KG`
  - `Row 25:      `

##### Kolom I: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 2 baris
- **Tipe data**: STRING(2)
- **Sample**:
  - `Row 6: RP`
  - `Row 25: USMAN HADI`

#### Format Angka yang Digunakan

| Format | Jumlah Cell | Contoh |
|---|---|---|
| `#,##0` | 25 | C8: 13515; F8: 1663 |

#### Formula yang Ditemukan (12 formula)

- `C18`: `=SUM(C17+F17)` → **104920**
- `C17`: `=SUM(C8+C9+C10+C11+C12+C13+C14+C15+C16)` → **89698**
- `G18`: `=SUM(D17+G17)` → **772988600**
- `G10`: `=SUM(F10*7000)` → **0**
- `G11`: `=SUM(F11*7500)` → **19425000**
- `G12`: `=SUM(F12*7500)` → **0**
- `G13`: `=SUM(F13*8000)` → **62232000**
- `G14`: `=SUM(F14*8000)` → **8320000**
- `G8`: `=SUM(F8*7400)` → **12306200**
- `F17`: `=SUM(F8+F9+F10+F11+F12+F13+F14+F15+F16)` → **15222**
- `G9`: `=SUM(F9*7400)` → **15910000**
- `G17`: `=SUM(G8:G16)` → **118193200**

#### Sample Data (5 baris pertama)

| NO | DARI ANGGOTA | (kosong) | (kosong) | DARI NON ANGGOTA | (kosong) | (kosong) | JUMLAH | (kosong) | KETERANGAN | (kosong) | (kosong) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| (kosong) | KELOMPOK | KG | RP | WILAYAH | KG | RP | KG | RP | (kosong) | (kosong) | (kosong) |
| (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 1 | CEMBOR | 13515 | (kosong) | MOJOSARI | 1663 | 12306200 | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 2 | CLAKET | 18936 | (kosong) | PRAMBON | 2150 | 15910000 | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 3 | MLIGI | 2064 | (kosong) | BRANGKAL | (kosong) | 0 | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |

*Catatan: 2 kolom lainnya tidak ditampilkan*

#### Kolom Kosong

- J, K, L, M, N

---

### SHEET: JUNI

| Properti | Nilai |
|---|---|
| Dimensi | A1:N40 |
| Max Baris | 40 |
| Max Kolom | 14 |
| Visibilitas | visible |
| Merged Cells | 9 |
| Formula | 12 |
| Hidden Rows | 0 |
| Hidden Cols | 0 |

#### Konten Sebelum Header

- `A1: LAPORAN PENERIMAAN SUSU`
- `A2: KOPERASI AGRIBISNIS DANA MULYA`
- `A3: BULAN  JUNI 2026`

#### Merged Cells

- `A1:J1`
- `C21:J21`
- `C20:J20`
- `I25:J25`
- `A3:J3`
- `C25:F25`
- `A2:J2`
- `A18:B18`
- `A17:B17`

#### Header (Baris 5)

- **A**: NO
- **B**: DARI ANGGOTA
- **C**: (kosong)
- **D**: (kosong)
- **E**: DARI NON ANGGOTA
- **F**: (kosong)
- **G**: (kosong)
- **H**: JUMLAH
- **I**: (kosong)
- **J**: KETERANGAN
- **K**: (kosong)
- **L**: (kosong)
- **M**: (kosong)
- **N**: (kosong)

#### Analisis Kolom

| Kolom | Header | Klasifikasi | Tipe Data | Isi |
|---|---|---|---|---|
| A | NO | INPUT MANUAL | ANGKA(9), STRING(2) | 11 baris |
| B | DARI ANGGOTA | INPUT MANUAL | STRING(10) | 10 baris |
| C | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(9), STRING(5) | 15 baris |
| D | (kosong) | INPUT MANUAL | STRING(1), RUPIAH(1) | 2 baris |
| E | DARI NON ANGGOTA | INPUT MANUAL | STRING(9) | 9 baris |
| F | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(3), ANGKA(2), STRING(1) | 7 baris |
| G | (kosong) | CAMPURAN (ada formula & manual) | STRING(10) | 10 baris |
| H | JUMLAH | INPUT MANUAL | STRING (mungkin KG)(1), STRING KOSONG(1) | 2 baris |
| I | (kosong) | INPUT MANUAL | STRING(2) | 2 baris |
| J | KETERANGAN | KOLOM KOSONG |  | 0 baris |
| K | (kosong) | KOLOM KOSONG |  | 0 baris |
| L | (kosong) | KOLOM KOSONG |  | 0 baris |
| M | (kosong) | KOLOM KOSONG |  | 0 baris |
| N | (kosong) | KOLOM KOSONG |  | 0 baris |

#### Detail Kolom & Sample Data

##### Kolom A: NO

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 11 baris
- **Tipe data**: ANGKA(9), STRING(2)
- **Sample**:
  - `Row 8: 1`
  - `Row 9: 2`
  - `Row 10: 3`
  - `Row 11: 4`
  - `Row 12: 5`

##### Kolom B: DARI ANGGOTA

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 10 baris
- **Tipe data**: STRING(10)
- **Sample**:
  - `Row 6: KELOMPOK`
  - `Row 8: CEMBOR`
  - `Row 9: CLAKET`
  - `Row 10: MLIGI`
  - `Row 11: KAMBENGAN`

##### Kolom C: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 15 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(9), STRING(5)
- **Sample**:
  - `Row 6: KG`
  - `Row 8: 12464`
  - `Row 9: 17410`
  - `Row 10: 1372`
  - `Row 11: 3710`

##### Kolom D: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 2 baris
- **Tipe data**: STRING(1), RUPIAH(1)
- **Sample**:
  - `Row 6: RP`
  - `Row 17: 641494800`

##### Kolom E: DARI NON ANGGOTA

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 9 baris
- **Tipe data**: STRING(9)
- **Sample**:
  - `Row 6: WILAYAH`
  - `Row 8: MOJOSARI`
  - `Row 9: PRAMBON`
  - `Row 10: BRANGKAL`
  - `Row 11: KRIAN`

##### Kolom F: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 7 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(3), ANGKA(2), STRING(1)
- **Sample**:
  - `Row 6: KG`
  - `Row 8: 1511`
  - `Row 9: 1830`
  - `Row 11: 2190`
  - `Row 13: 8606`

##### Kolom G: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 10 baris
- **Tipe data**: STRING(10)
- **Sample**:
  - `Row 6: RP`
  - `Row 8: 11181400`
  - `Row 9: 13542000`
  - `Row 10: 0`
  - `Row 11: 16425000`

##### Kolom H: JUMLAH

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 2 baris
- **Tipe data**: STRING (mungkin KG)(1), STRING KOSONG(1)
- **Sample**:
  - `Row 6: KG`
  - `Row 25:      `

##### Kolom I: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 2 baris
- **Tipe data**: STRING(2)
- **Sample**:
  - `Row 6: RP`
  - `Row 25: USMAN HADI`

#### Format Angka yang Digunakan

| Format | Jumlah Cell | Contoh |
|---|---|---|
| `#,##0` | 25 | C8: 12464; F8: 1511 |

#### Formula yang Ditemukan (12 formula)

- `C18`: `=SUM(C17+F17)` → **103493**
- `C17`: `=SUM(C8+C9+C10+C11+C12+C13+C14+C15+C16)` → **87876**
- `G18`: `=SUM(D17+G17)` → **763331200**
- `G10`: `=SUM(F10*7000)` → **0**
- `G11`: `=SUM(F11*7500)` → **16425000**
- `G12`: `=SUM(F12*7500)` → **0**
- `G13`: `=SUM(F13*8000)` → **68848000**
- `G14`: `=SUM(F14*8000)` → **11840000**
- `G8`: `=SUM(F8*7400)` → **11181400**
- `F17`: `=SUM(F8+F9+F10+F11+F12+F13+F14+F15+F16)` → **15617**
- `G9`: `=SUM(F9*7400)` → **13542000**
- `G17`: `=SUM(G8:G16)` → **121836400**

#### Sample Data (5 baris pertama)

| NO | DARI ANGGOTA | (kosong) | (kosong) | DARI NON ANGGOTA | (kosong) | (kosong) | JUMLAH | (kosong) | KETERANGAN | (kosong) | (kosong) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| (kosong) | KELOMPOK | KG | RP | WILAYAH | KG | RP | KG | RP | (kosong) | (kosong) | (kosong) |
| (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 1 | CEMBOR | 12464 | (kosong) | MOJOSARI | 1511 | 11181400 | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 2 | CLAKET | 17410 | (kosong) | PRAMBON | 1830 | 13542000 | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 3 | MLIGI | 1372 | (kosong) | BRANGKAL | (kosong) | 0 | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |

*Catatan: 2 kolom lainnya tidak ditampilkan*

#### Kolom Kosong

- J, K, L, M, N

---

### SHEET: JULI

| Properti | Nilai |
|---|---|
| Dimensi | A1:N40 |
| Max Baris | 40 |
| Max Kolom | 14 |
| Visibilitas | visible |
| Merged Cells | 9 |
| Formula | 12 |
| Hidden Rows | 0 |
| Hidden Cols | 0 |

#### Konten Sebelum Header

- `A1: LAPORAN PENERIMAAN SUSU`
- `A2: KOPERASI AGRIBISNIS DANA MULYA`
- `A3: BULAN  JULI 2026`

#### Merged Cells

- `A1:J1`
- `C21:J21`
- `C20:J20`
- `I25:J25`
- `A3:J3`
- `C25:F25`
- `A2:J2`
- `A17:B17`
- `A18:B18`

#### Header (Baris 5)

- **A**: NO
- **B**: DARI ANGGOTA
- **C**: (kosong)
- **D**: (kosong)
- **E**: DARI NON ANGGOTA
- **F**: (kosong)
- **G**: (kosong)
- **H**: JUMLAH
- **I**: (kosong)
- **J**: KETERANGAN
- **K**: (kosong)
- **L**: (kosong)
- **M**: (kosong)
- **N**: (kosong)

#### Analisis Kolom

| Kolom | Header | Klasifikasi | Tipe Data | Isi |
|---|---|---|---|---|
| A | NO | INPUT MANUAL | ANGKA(9), STRING(2) | 11 baris |
| B | DARI ANGGOTA | INPUT MANUAL | STRING(10) | 10 baris |
| C | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(9), STRING(5) | 15 baris |
| D | (kosong) | INPUT MANUAL | STRING(1), RUPIAH(1) | 2 baris |
| E | DARI NON ANGGOTA | INPUT MANUAL | STRING(9) | 9 baris |
| F | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(3), ANGKA(2), STRING(1) | 7 baris |
| G | (kosong) | CAMPURAN (ada formula & manual) | STRING(10) | 10 baris |
| H | JUMLAH | INPUT MANUAL | STRING (mungkin KG)(1), STRING KOSONG(1) | 2 baris |
| I | (kosong) | INPUT MANUAL | STRING(2) | 2 baris |
| J | KETERANGAN | KOLOM KOSONG |  | 0 baris |
| K | (kosong) | KOLOM KOSONG |  | 0 baris |
| L | (kosong) | KOLOM KOSONG |  | 0 baris |
| M | (kosong) | KOLOM KOSONG |  | 0 baris |
| N | (kosong) | KOLOM KOSONG |  | 0 baris |

#### Detail Kolom & Sample Data

##### Kolom A: NO

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 11 baris
- **Tipe data**: ANGKA(9), STRING(2)
- **Sample**:
  - `Row 8: 1`
  - `Row 9: 2`
  - `Row 10: 3`
  - `Row 11: 4`
  - `Row 12: 5`

##### Kolom B: DARI ANGGOTA

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 10 baris
- **Tipe data**: STRING(10)
- **Sample**:
  - `Row 6: KELOMPOK`
  - `Row 8: CEMBOR`
  - `Row 9: CLAKET`
  - `Row 10: MLIGI`
  - `Row 11: KAMBENGAN`

##### Kolom C: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 15 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(9), STRING(5)
- **Sample**:
  - `Row 6: KG`
  - `Row 8: 13700`
  - `Row 9: 18131`
  - `Row 10: 1386`
  - `Row 11: 3824`

##### Kolom D: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 2 baris
- **Tipe data**: STRING(1), RUPIAH(1)
- **Sample**:
  - `Row 6: RP`
  - `Row 17: 722115000`

##### Kolom E: DARI NON ANGGOTA

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 9 baris
- **Tipe data**: STRING(9)
- **Sample**:
  - `Row 6: WILAYAH`
  - `Row 8: MOJOSARI`
  - `Row 9: PRAMBON`
  - `Row 10: BRANGKAL`
  - `Row 11: KRIAN`

##### Kolom F: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 7 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(3), ANGKA(2), STRING(1)
- **Sample**:
  - `Row 6: KG`
  - `Row 8: 1752`
  - `Row 9: 1785`
  - `Row 11: 2390`
  - `Row 13: 8155`

##### Kolom G: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 10 baris
- **Tipe data**: STRING(10)
- **Sample**:
  - `Row 6: RP`
  - `Row 8: 12964800`
  - `Row 9: 13209000`
  - `Row 10: 0`
  - `Row 11: 17925000`

##### Kolom H: JUMLAH

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 2 baris
- **Tipe data**: STRING (mungkin KG)(1), STRING KOSONG(1)
- **Sample**:
  - `Row 6: KG`
  - `Row 25:      `

##### Kolom I: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 2 baris
- **Tipe data**: STRING(2)
- **Sample**:
  - `Row 6: RP`
  - `Row 25: USMAN HADI`

#### Format Angka yang Digunakan

| Format | Jumlah Cell | Contoh |
|---|---|---|
| `#,##0` | 25 | C8: 13700; F8: 1752 |

#### Formula yang Ditemukan (12 formula)

- `C18`: `=SUM(C17+F17)` → **113164**
- `C17`: `=SUM(C8+C9+C10+C11+C12+C13+C14+C15+C16)` → **96282**
- `G18`: `=SUM(D17+G17)` → **853853800**
- `G10`: `=SUM(F10*7000)` → **0**
- `G11`: `=SUM(F11*7500)` → **17925000**
- `G12`: `=SUM(F12*7500)` → **0**
- `G13`: `=SUM(F13*8000)` → **65240000**
- `G14`: `=SUM(F14*8000)` → **22400000**
- `G8`: `=SUM(F8*7400)` → **12964800**
- `F17`: `=SUM(F8+F9+F10+F11+F12+F13+F14+F15+F16)` → **16882**
- `G9`: `=SUM(F9*7400)` → **13209000**
- `G17`: `=SUM(G8:G16)` → **131738800**

#### Sample Data (5 baris pertama)

| NO | DARI ANGGOTA | (kosong) | (kosong) | DARI NON ANGGOTA | (kosong) | (kosong) | JUMLAH | (kosong) | KETERANGAN | (kosong) | (kosong) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| (kosong) | KELOMPOK | KG | RP | WILAYAH | KG | RP | KG | RP | (kosong) | (kosong) | (kosong) |
| (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 1 | CEMBOR | 13700 | (kosong) | MOJOSARI | 1752 | 12964800 | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 2 | CLAKET | 18131 | (kosong) | PRAMBON | 1785 | 13209000 | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| 3 | MLIGI | 1386 | (kosong) | BRANGKAL | (kosong) | 0 | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |

*Catatan: 2 kolom lainnya tidak ditampilkan*

#### Kolom Kosong

- J, K, L, M, N

---

## FILE: LAPORAN PENERIMAAN DAN PENGELUARAN SUSU 2026.xlsx

- **Path**: `C:\Users\HP\Desktop\KKN SIE ACARA\Proker UMKM\Koperasidanamulya\LAPORAN PENERIMAAN DAN PENGELUARAN SUSU 2026.xlsx`
- **Ukuran**: 32.0 KB
- **Jumlah Sheet**: 7
- **Nama Sheet**: Januari, Februari, Maret, April, Mei, Juni, juli.

### SHEET: Januari

| Properti | Nilai |
|---|---|
| Dimensi | A1:AA36 |
| Max Baris | 36 |
| Max Kolom | 27 |
| Visibilitas | visible |
| Merged Cells | 8 |
| Formula | 9 |
| Hidden Rows | 0 |
| Hidden Cols | 0 |

#### Konten Sebelum Header

- `A2: LAPORAN PEMBELIAN DAN PENJUALAN SUSU`
- `A3: BULAN  JANUARI  2026`

#### Merged Cells

- `H27:L27`
- `A2:L2`
- `B28:C28`
- `H28:L28`
- `B26:C26`
- `B27:C27`
- `A3:L3`
- `H34:L34`

#### Header (Baris 4)

- **A**: (kosong)
- **B**: (kosong)
- **C**:                                                                PENERIMAAN
- **D**: (kosong)
- **E**: (kosong)
- **F**: (kosong)
- **G**: PENGELUARAN
- **H**: (kosong)
- **I**: (kosong)
- **J**: (kosong)
- **K**: (kosong)
- **L**: (kosong)
- **M**: (kosong)
- **N**: (kosong)
- **O**: (kosong)
- **P**: (kosong)
- **Q**: (kosong)
- **R**: (kosong)
- **S**: (kosong)
- **T**: (kosong)
- **U**: (kosong)
- **V**: (kosong)
- **W**: (kosong)
- **X**: (kosong)
- **Y**: (kosong)
- **Z**: (kosong)
- **AA**: (kosong)

#### Analisis Kolom

| Kolom | Header | Klasifikasi | Tipe Data | Isi |
|---|---|---|---|---|
| A | (kosong) | KOLOM KOSONG |  | 0 baris |
| B | (kosong) | INPUT MANUAL | ANGKA(7), STRING(6) | 13 baris |
| C |                                                                PENERIMAAN | INPUT MANUAL | STRING(11) | 11 baris |
| D | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(4), ANGKA(1), STRING(5) | 11 baris |
| E | (kosong) | CAMPURAN (ada formula & manual) | STRING(3), STRING (mungkin LITER)(2) | 5 baris |
| F | (kosong) | INPUT MANUAL | STRING(2), ANGKA(6) | 8 baris |
| G | PENGELUARAN | INPUT MANUAL | STRING(11) | 11 baris |
| H | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin LITER)(1), RUPIAH(5), STRING(6), ANGKA(1) | 13 baris |
| I | (kosong) | INPUT MANUAL | STRING(1) | 1 baris |
| J | (kosong) | KOLOM KOSONG |  | 0 baris |
| K | (kosong) | KOLOM KOSONG |  | 0 baris |
| L | (kosong) | KOLOM KOSONG |  | 0 baris |
| M | (kosong) | KOLOM KOSONG |  | 0 baris |
| N | (kosong) | KOLOM KOSONG |  | 0 baris |
| O | (kosong) | KOLOM KOSONG |  | 0 baris |
| P | (kosong) | KOLOM KOSONG |  | 0 baris |
| Q | (kosong) | KOLOM KOSONG |  | 0 baris |
| R | (kosong) | KOLOM KOSONG |  | 0 baris |
| S | (kosong) | KOLOM KOSONG |  | 0 baris |
| T | (kosong) | KOLOM KOSONG |  | 0 baris |
| U | (kosong) | KOLOM KOSONG |  | 0 baris |
| V | (kosong) | KOLOM KOSONG |  | 0 baris |
| W | (kosong) | KOLOM KOSONG |  | 0 baris |
| X | (kosong) | KOLOM KOSONG |  | 0 baris |
| Y | (kosong) | KOLOM KOSONG |  | 0 baris |
| Z | (kosong) | KOLOM KOSONG |  | 0 baris |
| AA | (kosong) | KOLOM KOSONG |  | 0 baris |

#### Detail Kolom & Sample Data

##### Kolom B: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 13 baris
- **Tipe data**: ANGKA(7), STRING(6)
- **Sample**:
  - `Row 7: 1`
  - `Row 8: 2`
  - `Row 9: 3`
  - `Row 10: 4`
  - `Row 11: 5`

##### Kolom C:                                                                PENERIMAAN

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 11 baris
- **Tipe data**: STRING(11)
- **Sample**:
  - `Row 5:                     DARI`
  - `Row 7: ANGGOTA DANA MULYA`
  - `Row 8: GONDANG`
  - `Row 9: BRANGKAL`
  - `Row 10: TAWAR`

##### Kolom D: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 11 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(4), ANGKA(1), STRING(5)
- **Sample**:
  - `Row 5:                     KG`
  - `Row 7: 88220`
  - `Row 11: 3920`
  - `Row 12: 4194`
  - `Row 13: 2443`

##### Kolom E: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 5 baris
- **Tipe data**: STRING(3), STRING (mungkin LITER)(2)
- **Sample**:
  - `Row 5:                 RP`
  - `Row 20:  Ltr`
  - `Row 21: Ltr `
  - `Row 25: 96724.8048780488`
  - `Row 26: 96430`

##### Kolom F: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 8 baris
- **Tipe data**: STRING(2), ANGKA(6)
- **Sample**:
  - `Row 5: NO`
  - `Row 7: 1`
  - `Row 8: 2`
  - `Row 9: 3`
  - `Row 11:     LAIN-LAIN`

##### Kolom G: PENGELUARAN

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 11 baris
- **Tipe data**: STRING(11)
- **Sample**:
  - `Row 5:              UNTUK`
  - `Row 6: PENJUALAN PADA`
  - `Row 7: NESTLE`
  - `Row 8: AGEN`
  - `Row 9: LOKAL`

##### Kolom H: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 13 baris
- **Tipe data**: STRING (mungkin LITER)(1), RUPIAH(5), STRING(6), ANGKA(1)
- **Sample**:
  - `Row 5:        LITER`
  - `Row 7: 53340`
  - `Row 8: 6726`
  - `Row 9: 36134`
  - `Row 10: 96200`

##### Kolom I: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 1 baris
- **Tipe data**: STRING(1)
- **Sample**:
  - `Row 5:                RP`

#### Format Angka yang Digunakan

| Format | Jumlah Cell | Contoh |
|---|---|---|
| `#,##0` | 19 | D7: 88220; H7: 53340 |
| `0` | 1 | D16: =D15/1.025 |

#### Formula yang Ditemukan (9 formula)

- `D16`: `=D15/1.025` → **96367.80487804879**
- `D21`: `=D16` → **96367.80487804879**
- `E25`: `=D20+D21` → **96724.8048780488**
- `D28`: `=E25-E26` → **294.8048780488025**
- `H16`: `=H10+H15` → **96430**
- `E26`: `=H16` → **96430**
- `D15`: `=SUM(D7:D13)` → **98777**
- `H15`: `=SUM(H12:H14)` → **230**
- `H10`: `=SUM(H7:H9)` → **96200**

#### Sample Data (5 baris pertama)

| (kosong) | (kosong) |                                                                PENERIMAAN | (kosong) | (kosong) | (kosong) | PENGELUARAN | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| (kosong) | (kosong) |                     DARI |                     KG |                 RP | NO |              UNTUK |        LITER |                RP | (kosong) | (kosong) | (kosong) |
| (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | PENJUALAN PADA | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| (kosong) | 1 | ANGGOTA DANA MULYA | 88220 | (kosong) | 1 | NESTLE | 53340 | (kosong) | (kosong) | (kosong) | (kosong) |
| (kosong) | 2 | GONDANG | (kosong) | (kosong) | 2 | AGEN | 6726 | (kosong) | (kosong) | (kosong) | (kosong) |
| (kosong) | 3 | BRANGKAL | (kosong) | (kosong) | 3 | LOKAL | 36134 | (kosong) | (kosong) | (kosong) | (kosong) |

*Catatan: 15 kolom lainnya tidak ditampilkan*

#### Baris Terakhir (kemungkinan Total/Summary)

- `H34: Drh.H.M.ILHAM`

#### Kolom Kosong

- A, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, AA

---

### SHEET: Februari

| Properti | Nilai |
|---|---|
| Dimensi | A1:AA36 |
| Max Baris | 36 |
| Max Kolom | 27 |
| Visibilitas | visible |
| Merged Cells | 8 |
| Formula | 9 |
| Hidden Rows | 0 |
| Hidden Cols | 0 |

#### Konten Sebelum Header

- `A2: LAPORAN PEMBELIAN DAN PENJUALAN SUSU`
- `A3: BULAN  FEBRUARI 2026`

#### Merged Cells

- `H27:L27`
- `A2:L2`
- `B28:C28`
- `H28:L28`
- `B26:C26`
- `B27:C27`
- `A3:L3`
- `H34:L34`

#### Header (Baris 4)

- **A**: (kosong)
- **B**: (kosong)
- **C**:                                                                PENERIMAAN
- **D**: (kosong)
- **E**: (kosong)
- **F**: (kosong)
- **G**: PENGELUARAN
- **H**: (kosong)
- **I**: (kosong)
- **J**: (kosong)
- **K**: (kosong)
- **L**: (kosong)
- **M**: (kosong)
- **N**: (kosong)
- **O**: (kosong)
- **P**: (kosong)
- **Q**: (kosong)
- **R**: (kosong)
- **S**: (kosong)
- **T**: (kosong)
- **U**: (kosong)
- **V**: (kosong)
- **W**: (kosong)
- **X**: (kosong)
- **Y**: (kosong)
- **Z**: (kosong)
- **AA**: (kosong)

#### Analisis Kolom

| Kolom | Header | Klasifikasi | Tipe Data | Isi |
|---|---|---|---|---|
| A | (kosong) | KOLOM KOSONG |  | 0 baris |
| B | (kosong) | INPUT MANUAL | ANGKA(7), STRING(6) | 13 baris |
| C |                                                                PENERIMAAN | INPUT MANUAL | STRING(11) | 11 baris |
| D | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(4), ANGKA(1), STRING(5) | 11 baris |
| E | (kosong) | CAMPURAN (ada formula & manual) | STRING(3), STRING (mungkin LITER)(2) | 5 baris |
| F | (kosong) | INPUT MANUAL | STRING(2), ANGKA(6) | 8 baris |
| G | PENGELUARAN | INPUT MANUAL | STRING(11) | 11 baris |
| H | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin LITER)(1), RUPIAH(5), STRING(6), ANGKA(1) | 13 baris |
| I | (kosong) | INPUT MANUAL | STRING(1) | 1 baris |
| J | (kosong) | KOLOM KOSONG |  | 0 baris |
| K | (kosong) | KOLOM KOSONG |  | 0 baris |
| L | (kosong) | KOLOM KOSONG |  | 0 baris |
| M | (kosong) | KOLOM KOSONG |  | 0 baris |
| N | (kosong) | KOLOM KOSONG |  | 0 baris |
| O | (kosong) | KOLOM KOSONG |  | 0 baris |
| P | (kosong) | KOLOM KOSONG |  | 0 baris |
| Q | (kosong) | KOLOM KOSONG |  | 0 baris |
| R | (kosong) | KOLOM KOSONG |  | 0 baris |
| S | (kosong) | KOLOM KOSONG |  | 0 baris |
| T | (kosong) | KOLOM KOSONG |  | 0 baris |
| U | (kosong) | KOLOM KOSONG |  | 0 baris |
| V | (kosong) | KOLOM KOSONG |  | 0 baris |
| W | (kosong) | KOLOM KOSONG |  | 0 baris |
| X | (kosong) | KOLOM KOSONG |  | 0 baris |
| Y | (kosong) | KOLOM KOSONG |  | 0 baris |
| Z | (kosong) | KOLOM KOSONG |  | 0 baris |
| AA | (kosong) | KOLOM KOSONG |  | 0 baris |

#### Detail Kolom & Sample Data

##### Kolom B: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 13 baris
- **Tipe data**: ANGKA(7), STRING(6)
- **Sample**:
  - `Row 7: 1`
  - `Row 8: 2`
  - `Row 9: 3`
  - `Row 10: 4`
  - `Row 11: 5`

##### Kolom C:                                                                PENERIMAAN

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 11 baris
- **Tipe data**: STRING(11)
- **Sample**:
  - `Row 5:                     DARI`
  - `Row 7: ANGGOTA DANA MULYA`
  - `Row 8: GONDANG`
  - `Row 9: BRANGKAL`
  - `Row 10: TAWAR`

##### Kolom D: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 11 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(4), ANGKA(1), STRING(5)
- **Sample**:
  - `Row 5:                     KG`
  - `Row 7: 77464`
  - `Row 11: 3275`
  - `Row 12: 3659`
  - `Row 13: 2289`

##### Kolom E: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 5 baris
- **Tipe data**: STRING(3), STRING (mungkin LITER)(2)
- **Sample**:
  - `Row 5:                 RP`
  - `Row 20:  Ltr`
  - `Row 21: Ltr `
  - `Row 25: 84867.6829268293`
  - `Row 26: 83320`

##### Kolom F: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 8 baris
- **Tipe data**: STRING(2), ANGKA(6)
- **Sample**:
  - `Row 5: NO`
  - `Row 7: 1`
  - `Row 8: 2`
  - `Row 9: 3`
  - `Row 11:     LAIN-LAIN`

##### Kolom G: PENGELUARAN

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 11 baris
- **Tipe data**: STRING(11)
- **Sample**:
  - `Row 5:              UNTUK`
  - `Row 6: PENJUALAN PADA`
  - `Row 7: NESTLE`
  - `Row 8: AGEN`
  - `Row 9: LOKAL`

##### Kolom H: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 13 baris
- **Tipe data**: STRING (mungkin LITER)(1), RUPIAH(5), STRING(6), ANGKA(1)
- **Sample**:
  - `Row 5:        LITER`
  - `Row 7: 52460`
  - `Row 8: 5500`
  - `Row 9: 24930`
  - `Row 10: 82890`

##### Kolom I: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 1 baris
- **Tipe data**: STRING(1)
- **Sample**:
  - `Row 5:                RP`

#### Format Angka yang Digunakan

| Format | Jumlah Cell | Contoh |
|---|---|---|
| `#,##0` | 19 | D7: 77464; H7: 52460 |
| `0` | 1 | D16: =D15/1.025 |

#### Formula yang Ditemukan (9 formula)

- `D16`: `=D15/1.025` → **84572.68292682928**
- `D21`: `=D16` → **84572.68292682928**
- `E25`: `=D20+D21` → **84867.6829268293**
- `D28`: `=E25-E26` → **1547.6829268292931**
- `H16`: `=H10+H15` → **83320**
- `E26`: `=H16` → **83320**
- `D15`: `=SUM(D7:D13)` → **86687**
- `H15`: `=SUM(H12:H14)` → **430**
- `H10`: `=SUM(H7:H9)` → **82890**

#### Sample Data (5 baris pertama)

| (kosong) | (kosong) |                                                                PENERIMAAN | (kosong) | (kosong) | (kosong) | PENGELUARAN | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| (kosong) | (kosong) |                     DARI |                     KG |                 RP | NO |              UNTUK |        LITER |                RP | (kosong) | (kosong) | (kosong) |
| (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | PENJUALAN PADA | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| (kosong) | 1 | ANGGOTA DANA MULYA | 77464 | (kosong) | 1 | NESTLE | 52460 | (kosong) | (kosong) | (kosong) | (kosong) |
| (kosong) | 2 | GONDANG | (kosong) | (kosong) | 2 | AGEN | 5500 | (kosong) | (kosong) | (kosong) | (kosong) |
| (kosong) | 3 | BRANGKAL | (kosong) | (kosong) | 3 | LOKAL | 24930 | (kosong) | (kosong) | (kosong) | (kosong) |

*Catatan: 15 kolom lainnya tidak ditampilkan*

#### Baris Terakhir (kemungkinan Total/Summary)

- `H34: Drh.H.M.ILHAM`

#### Kolom Kosong

- A, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, AA

---

### SHEET: Maret

| Properti | Nilai |
|---|---|
| Dimensi | A1:AA36 |
| Max Baris | 36 |
| Max Kolom | 27 |
| Visibilitas | visible |
| Merged Cells | 8 |
| Formula | 9 |
| Hidden Rows | 0 |
| Hidden Cols | 0 |

#### Konten Sebelum Header

- `A2: LAPORAN PEMBELIAN DAN PENJUALAN SUSU`
- `A3: BULAN  MARET 2026`

#### Merged Cells

- `H27:L27`
- `A2:L2`
- `B28:C28`
- `H28:L28`
- `B26:C26`
- `B27:C27`
- `A3:L3`
- `H34:L34`

#### Header (Baris 4)

- **A**: (kosong)
- **B**: (kosong)
- **C**:                                                                PENERIMAAN
- **D**: (kosong)
- **E**: (kosong)
- **F**: (kosong)
- **G**: PENGELUARAN
- **H**: (kosong)
- **I**: (kosong)
- **J**: (kosong)
- **K**: (kosong)
- **L**: (kosong)
- **M**: (kosong)
- **N**: (kosong)
- **O**: (kosong)
- **P**: (kosong)
- **Q**: (kosong)
- **R**: (kosong)
- **S**: (kosong)
- **T**: (kosong)
- **U**: (kosong)
- **V**: (kosong)
- **W**: (kosong)
- **X**: (kosong)
- **Y**: (kosong)
- **Z**: (kosong)
- **AA**: (kosong)

#### Analisis Kolom

| Kolom | Header | Klasifikasi | Tipe Data | Isi |
|---|---|---|---|---|
| A | (kosong) | KOLOM KOSONG |  | 0 baris |
| B | (kosong) | INPUT MANUAL | ANGKA(7), STRING(6) | 13 baris |
| C |                                                                PENERIMAAN | INPUT MANUAL | STRING(11) | 11 baris |
| D | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(4), ANGKA(1), STRING(5) | 11 baris |
| E | (kosong) | CAMPURAN (ada formula & manual) | STRING(3), STRING (mungkin LITER)(2) | 5 baris |
| F | (kosong) | INPUT MANUAL | STRING(2), ANGKA(6) | 8 baris |
| G | PENGELUARAN | INPUT MANUAL | STRING(11) | 11 baris |
| H | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin LITER)(1), RUPIAH(5), STRING(6), ANGKA(1) | 13 baris |
| I | (kosong) | INPUT MANUAL | STRING(1) | 1 baris |
| J | (kosong) | KOLOM KOSONG |  | 0 baris |
| K | (kosong) | KOLOM KOSONG |  | 0 baris |
| L | (kosong) | KOLOM KOSONG |  | 0 baris |
| M | (kosong) | KOLOM KOSONG |  | 0 baris |
| N | (kosong) | KOLOM KOSONG |  | 0 baris |
| O | (kosong) | KOLOM KOSONG |  | 0 baris |
| P | (kosong) | KOLOM KOSONG |  | 0 baris |
| Q | (kosong) | KOLOM KOSONG |  | 0 baris |
| R | (kosong) | KOLOM KOSONG |  | 0 baris |
| S | (kosong) | KOLOM KOSONG |  | 0 baris |
| T | (kosong) | KOLOM KOSONG |  | 0 baris |
| U | (kosong) | KOLOM KOSONG |  | 0 baris |
| V | (kosong) | KOLOM KOSONG |  | 0 baris |
| W | (kosong) | KOLOM KOSONG |  | 0 baris |
| X | (kosong) | KOLOM KOSONG |  | 0 baris |
| Y | (kosong) | KOLOM KOSONG |  | 0 baris |
| Z | (kosong) | KOLOM KOSONG |  | 0 baris |
| AA | (kosong) | KOLOM KOSONG |  | 0 baris |

#### Detail Kolom & Sample Data

##### Kolom B: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 13 baris
- **Tipe data**: ANGKA(7), STRING(6)
- **Sample**:
  - `Row 7: 1`
  - `Row 8: 2`
  - `Row 9: 3`
  - `Row 10: 4`
  - `Row 11: 5`

##### Kolom C:                                                                PENERIMAAN

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 11 baris
- **Tipe data**: STRING(11)
- **Sample**:
  - `Row 5:                     DARI`
  - `Row 7: ANGGOTA DANA MULYA`
  - `Row 8: GONDANG`
  - `Row 9: BRANGKAL`
  - `Row 10: TAWAR`

##### Kolom D: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 11 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(4), ANGKA(1), STRING(5)
- **Sample**:
  - `Row 5:                     KG`
  - `Row 7: 87141`
  - `Row 11: 3530`
  - `Row 12: 3916`
  - `Row 13: 3455`

##### Kolom E: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 5 baris
- **Tipe data**: STRING(3), STRING (mungkin LITER)(2)
- **Sample**:
  - `Row 5:                 RP`
  - `Row 20:  Ltr`
  - `Row 21: Ltr `
  - `Row 25: 97198.7317073171`
  - `Row 26: 96400`

##### Kolom F: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 8 baris
- **Tipe data**: STRING(2), ANGKA(6)
- **Sample**:
  - `Row 5: NO`
  - `Row 7: 1`
  - `Row 8: 2`
  - `Row 9: 3`
  - `Row 11:     LAIN-LAIN`

##### Kolom G: PENGELUARAN

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 11 baris
- **Tipe data**: STRING(11)
- **Sample**:
  - `Row 5:              UNTUK`
  - `Row 6: PENJUALAN PADA`
  - `Row 7: NESTLE`
  - `Row 8: AGEN`
  - `Row 9: LOKAL`

##### Kolom H: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 13 baris
- **Tipe data**: STRING (mungkin LITER)(1), RUPIAH(5), STRING(6), ANGKA(1)
- **Sample**:
  - `Row 5:        LITER`
  - `Row 7: 65540`
  - `Row 8: 4643`
  - `Row 9: 25952`
  - `Row 10: 96135`

##### Kolom I: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 1 baris
- **Tipe data**: STRING(1)
- **Sample**:
  - `Row 5:                RP`

#### Format Angka yang Digunakan

| Format | Jumlah Cell | Contoh |
|---|---|---|
| `#,##0` | 19 | D7: 87141; H7: 65540 |
| `0` | 1 | D16: =D15/1.025 |

#### Formula yang Ditemukan (9 formula)

- `D16`: `=D15/1.025` → **95650.73170731709**
- `D21`: `=D16` → **95650.73170731709**
- `E25`: `=D20+D21` → **97198.7317073171**
- `D28`: `=E25-E26` → **798.7317073170998**
- `H16`: `=H10+H15` → **96400**
- `E26`: `=H16` → **96400**
- `D15`: `=SUM(D7:D13)` → **98042**
- `H15`: `=SUM(H12:H14)` → **265**
- `H10`: `=SUM(H7:H9)` → **96135**

#### Sample Data (5 baris pertama)

| (kosong) | (kosong) |                                                                PENERIMAAN | (kosong) | (kosong) | (kosong) | PENGELUARAN | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| (kosong) | (kosong) |                     DARI |                     KG |                 RP | NO |              UNTUK |        LITER |                RP | (kosong) | (kosong) | (kosong) |
| (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | PENJUALAN PADA | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| (kosong) | 1 | ANGGOTA DANA MULYA | 87141 | (kosong) | 1 | NESTLE | 65540 | (kosong) | (kosong) | (kosong) | (kosong) |
| (kosong) | 2 | GONDANG | (kosong) | (kosong) | 2 | AGEN | 4643 | (kosong) | (kosong) | (kosong) | (kosong) |
| (kosong) | 3 | BRANGKAL | (kosong) | (kosong) | 3 | LOKAL | 25952 | (kosong) | (kosong) | (kosong) | (kosong) |

*Catatan: 15 kolom lainnya tidak ditampilkan*

#### Baris Terakhir (kemungkinan Total/Summary)

- `H34: Drh.H.M.ILHAM`

#### Kolom Kosong

- A, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, AA

---

### SHEET: April

| Properti | Nilai |
|---|---|
| Dimensi | A1:AA36 |
| Max Baris | 36 |
| Max Kolom | 27 |
| Visibilitas | visible |
| Merged Cells | 8 |
| Formula | 9 |
| Hidden Rows | 0 |
| Hidden Cols | 0 |

#### Konten Sebelum Header

- `A2: LAPORAN PEMBELIAN DAN PENJUALAN SUSU`
- `A3: BULAN  APRIL 2026`

#### Merged Cells

- `H27:L27`
- `A2:L2`
- `B28:C28`
- `H28:L28`
- `B26:C26`
- `B27:C27`
- `A3:L3`
- `H34:L34`

#### Header (Baris 4)

- **A**: (kosong)
- **B**: (kosong)
- **C**:                                                                PENERIMAAN
- **D**: (kosong)
- **E**: (kosong)
- **F**: (kosong)
- **G**: PENGELUARAN
- **H**: (kosong)
- **I**: (kosong)
- **J**: (kosong)
- **K**: (kosong)
- **L**: (kosong)
- **M**: (kosong)
- **N**: (kosong)
- **O**: (kosong)
- **P**: (kosong)
- **Q**: (kosong)
- **R**: (kosong)
- **S**: (kosong)
- **T**: (kosong)
- **U**: (kosong)
- **V**: (kosong)
- **W**: (kosong)
- **X**: (kosong)
- **Y**: (kosong)
- **Z**: (kosong)
- **AA**: (kosong)

#### Analisis Kolom

| Kolom | Header | Klasifikasi | Tipe Data | Isi |
|---|---|---|---|---|
| A | (kosong) | KOLOM KOSONG |  | 0 baris |
| B | (kosong) | INPUT MANUAL | ANGKA(7), STRING(6) | 13 baris |
| C |                                                                PENERIMAAN | INPUT MANUAL | STRING(11) | 11 baris |
| D | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(5), ANGKA(2), STRING(5) | 13 baris |
| E | (kosong) | CAMPURAN (ada formula & manual) | STRING(3), STRING (mungkin LITER)(2) | 5 baris |
| F | (kosong) | INPUT MANUAL | STRING(2), ANGKA(6) | 8 baris |
| G | PENGELUARAN | INPUT MANUAL | STRING(11) | 11 baris |
| H | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin LITER)(1), RUPIAH(5), STRING(6), ANGKA(1) | 13 baris |
| I | (kosong) | INPUT MANUAL | STRING(1) | 1 baris |
| J | (kosong) | KOLOM KOSONG |  | 0 baris |
| K | (kosong) | KOLOM KOSONG |  | 0 baris |
| L | (kosong) | KOLOM KOSONG |  | 0 baris |
| M | (kosong) | KOLOM KOSONG |  | 0 baris |
| N | (kosong) | KOLOM KOSONG |  | 0 baris |
| O | (kosong) | KOLOM KOSONG |  | 0 baris |
| P | (kosong) | KOLOM KOSONG |  | 0 baris |
| Q | (kosong) | KOLOM KOSONG |  | 0 baris |
| R | (kosong) | KOLOM KOSONG |  | 0 baris |
| S | (kosong) | KOLOM KOSONG |  | 0 baris |
| T | (kosong) | KOLOM KOSONG |  | 0 baris |
| U | (kosong) | KOLOM KOSONG |  | 0 baris |
| V | (kosong) | KOLOM KOSONG |  | 0 baris |
| W | (kosong) | KOLOM KOSONG |  | 0 baris |
| X | (kosong) | KOLOM KOSONG |  | 0 baris |
| Y | (kosong) | KOLOM KOSONG |  | 0 baris |
| Z | (kosong) | KOLOM KOSONG |  | 0 baris |
| AA | (kosong) | KOLOM KOSONG |  | 0 baris |

#### Detail Kolom & Sample Data

##### Kolom B: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 13 baris
- **Tipe data**: ANGKA(7), STRING(6)
- **Sample**:
  - `Row 7: 1`
  - `Row 8: 2`
  - `Row 9: 3`
  - `Row 10: 4`
  - `Row 11: 5`

##### Kolom C:                                                                PENERIMAAN

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 11 baris
- **Tipe data**: STRING(11)
- **Sample**:
  - `Row 5:                     DARI`
  - `Row 7: ANGGOTA DANA MULYA`
  - `Row 8: MOJOSARI`
  - `Row 9: POJEJER`
  - `Row 10: TAWAR`

##### Kolom D: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 13 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(5), ANGKA(2), STRING(5)
- **Sample**:
  - `Row 5:                     KG`
  - `Row 7: 84236`
  - `Row 8: 1600`
  - `Row 9: 1753`
  - `Row 11: 2550`

##### Kolom E: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 5 baris
- **Tipe data**: STRING(3), STRING (mungkin LITER)(2)
- **Sample**:
  - `Row 5:                 RP`
  - `Row 20:  Ltr`
  - `Row 21: Ltr `
  - `Row 25: 91041.9268292683`
  - `Row 26: 90631`

##### Kolom F: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 8 baris
- **Tipe data**: STRING(2), ANGKA(6)
- **Sample**:
  - `Row 5: NO`
  - `Row 7: 1`
  - `Row 8: 2`
  - `Row 9: 3`
  - `Row 11:     LAIN-LAIN`

##### Kolom G: PENGELUARAN

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 11 baris
- **Tipe data**: STRING(11)
- **Sample**:
  - `Row 5:              UNTUK`
  - `Row 6: PENJUALAN PADA`
  - `Row 7: NESTLE`
  - `Row 8: AGEN`
  - `Row 9: LOKAL`

##### Kolom H: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 13 baris
- **Tipe data**: STRING (mungkin LITER)(1), RUPIAH(5), STRING(6), ANGKA(1)
- **Sample**:
  - `Row 5:        LITER`
  - `Row 7: 48800`
  - `Row 8: 6341`
  - `Row 9: 35180`
  - `Row 10: 90321`

##### Kolom I: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 1 baris
- **Tipe data**: STRING(1)
- **Sample**:
  - `Row 5:                RP`

#### Format Angka yang Digunakan

| Format | Jumlah Cell | Contoh |
|---|---|---|
| `#,##0` | 20 | D7: 84236; H7: 48800 |
| `0` | 1 | D16: =D15/1.025 |

#### Formula yang Ditemukan (9 formula)

- `D16`: `=D15/1.025` → **90242.9268292683**
- `D21`: `=D16` → **90242.9268292683**
- `E25`: `=D20+D21` → **91041.9268292683**
- `D28`: `=E25-E26` → **410.9268292682973**
- `H16`: `=H10+H15` → **90631**
- `E26`: `=H16` → **90631**
- `D15`: `=SUM(D7:D13)` → **92499**
- `H15`: `=SUM(H12:H14)` → **310**
- `H10`: `=SUM(H7:H9)` → **90321**

#### Sample Data (5 baris pertama)

| (kosong) | (kosong) |                                                                PENERIMAAN | (kosong) | (kosong) | (kosong) | PENGELUARAN | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| (kosong) | (kosong) |                     DARI |                     KG |                 RP | NO |              UNTUK |        LITER |                RP | (kosong) | (kosong) | (kosong) |
| (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | PENJUALAN PADA | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| (kosong) | 1 | ANGGOTA DANA MULYA | 84236 | (kosong) | 1 | NESTLE | 48800 | (kosong) | (kosong) | (kosong) | (kosong) |
| (kosong) | 2 | MOJOSARI | 1600 | (kosong) | 2 | AGEN | 6341 | (kosong) | (kosong) | (kosong) | (kosong) |
| (kosong) | 3 | POJEJER | 1753 | (kosong) | 3 | LOKAL | 35180 | (kosong) | (kosong) | (kosong) | (kosong) |

*Catatan: 15 kolom lainnya tidak ditampilkan*

#### Baris Terakhir (kemungkinan Total/Summary)

- `H34: Drh.H.M.ILHAM`

#### Kolom Kosong

- A, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, AA

---

### SHEET: Mei

| Properti | Nilai |
|---|---|
| Dimensi | A1:AA37 |
| Max Baris | 37 |
| Max Kolom | 27 |
| Visibilitas | visible |
| Merged Cells | 11 |
| Formula | 10 |
| Hidden Rows | 0 |
| Hidden Cols | 0 |

#### Konten Sebelum Header

- `A2: LAPORAN PEMBELIAN DAN PENJUALAN SUSU`
- `A3: BULAN  MEI 2026`

#### Merged Cells

- `A2:L2`
- `B29:C29`
- `H35:L35`
- `C15:C17`
- `H29:L29`
- `B28:C28`
- `H28:L28`
- `D16:D17`
- `B27:C27`
- `A3:L3`
- `G16:G17`

#### Header (Baris 4)

- **A**: (kosong)
- **B**: (kosong)
- **C**:                                                                PENERIMAAN
- **D**: (kosong)
- **E**: (kosong)
- **F**: (kosong)
- **G**: PENGELUARAN
- **H**: (kosong)
- **I**: (kosong)
- **J**: (kosong)
- **K**: (kosong)
- **L**: (kosong)
- **M**: (kosong)
- **N**: (kosong)
- **O**: (kosong)
- **P**: (kosong)
- **Q**: (kosong)
- **R**: (kosong)
- **S**: (kosong)
- **T**: (kosong)
- **U**: (kosong)
- **V**: (kosong)
- **W**: (kosong)
- **X**: (kosong)
- **Y**: (kosong)
- **Z**: (kosong)
- **AA**: (kosong)

#### Analisis Kolom

| Kolom | Header | Klasifikasi | Tipe Data | Isi |
|---|---|---|---|---|
| A | (kosong) | KOLOM KOSONG |  | 0 baris |
| B | (kosong) | INPUT MANUAL | ANGKA(7), STRING(6) | 13 baris |
| C |                                                                PENERIMAAN | INPUT MANUAL | STRING(11) | 11 baris |
| D | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(7), STRING(5) | 13 baris |
| E | (kosong) | CAMPURAN (ada formula & manual) | STRING(3), STRING (mungkin LITER)(2) | 5 baris |
| F | (kosong) | INPUT MANUAL | STRING(2), ANGKA(6) | 8 baris |
| G | PENGELUARAN | INPUT MANUAL | STRING(11) | 11 baris |
| H | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin LITER)(1), RUPIAH(5), STRING(7), ANGKA(1) | 14 baris |
| I | (kosong) | INPUT MANUAL | STRING(1) | 1 baris |
| J | (kosong) | KOLOM KOSONG |  | 0 baris |
| K | (kosong) | KOLOM KOSONG |  | 0 baris |
| L | (kosong) | KOLOM KOSONG |  | 0 baris |
| M | (kosong) | KOLOM KOSONG |  | 0 baris |
| N | (kosong) | KOLOM KOSONG |  | 0 baris |
| O | (kosong) | KOLOM KOSONG |  | 0 baris |
| P | (kosong) | KOLOM KOSONG |  | 0 baris |
| Q | (kosong) | KOLOM KOSONG |  | 0 baris |
| R | (kosong) | KOLOM KOSONG |  | 0 baris |
| S | (kosong) | KOLOM KOSONG |  | 0 baris |
| T | (kosong) | KOLOM KOSONG |  | 0 baris |
| U | (kosong) | KOLOM KOSONG |  | 0 baris |
| V | (kosong) | KOLOM KOSONG |  | 0 baris |
| W | (kosong) | KOLOM KOSONG |  | 0 baris |
| X | (kosong) | KOLOM KOSONG |  | 0 baris |
| Y | (kosong) | KOLOM KOSONG |  | 0 baris |
| Z | (kosong) | KOLOM KOSONG |  | 0 baris |
| AA | (kosong) | KOLOM KOSONG |  | 0 baris |

#### Detail Kolom & Sample Data

##### Kolom B: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 13 baris
- **Tipe data**: ANGKA(7), STRING(6)
- **Sample**:
  - `Row 7: 1`
  - `Row 8: 2`
  - `Row 9: 3`
  - `Row 10: 4`
  - `Row 11: 5`

##### Kolom C:                                                                PENERIMAAN

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 11 baris
- **Tipe data**: STRING(11)
- **Sample**:
  - `Row 5:                     DARI`
  - `Row 7: ANGGOTA DANA MULYA`
  - `Row 8: MOJOSARI`
  - `Row 9: POJEJER`
  - `Row 10: TAWAR`

##### Kolom D: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 13 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(7), STRING(5)
- **Sample**:
  - `Row 5:                     KG`
  - `Row 7: 89698`
  - `Row 8: 1663`
  - `Row 9: 7779`
  - `Row 11: 2590`

##### Kolom E: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 5 baris
- **Tipe data**: STRING(3), STRING (mungkin LITER)(2)
- **Sample**:
  - `Row 5:                 RP`
  - `Row 21:  Ltr`
  - `Row 22: Ltr `
  - `Row 26: 102771.975609756`
  - `Row 27: 101326.8292682927`

##### Kolom F: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 8 baris
- **Tipe data**: STRING(2), ANGKA(6)
- **Sample**:
  - `Row 5: NO`
  - `Row 7: 1`
  - `Row 8: 2`
  - `Row 9: 3`
  - `Row 11:     LAIN-LAIN`

##### Kolom G: PENGELUARAN

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 11 baris
- **Tipe data**: STRING(11)
- **Sample**:
  - `Row 5:              UNTUK`
  - `Row 6: PENJUALAN PADA`
  - `Row 7: NESTLE`
  - `Row 8: AGEN`
  - `Row 9: LOKAL`

##### Kolom H: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 14 baris
- **Tipe data**: STRING (mungkin LITER)(1), RUPIAH(5), STRING(7), ANGKA(1)
- **Sample**:
  - `Row 5:        LITER`
  - `Row 7: 55490`
  - `Row 8: 6948`
  - `Row 9: 41052`
  - `Row 10: 103490`

##### Kolom I: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 1 baris
- **Tipe data**: STRING(1)
- **Sample**:
  - `Row 5:                RP`

#### Format Angka yang Digunakan

| Format | Jumlah Cell | Contoh |
|---|---|---|
| `#,##0` | 24 | D7: 89698; H7: 55490 |

#### Formula yang Ditemukan (10 formula)

- `D16`: `=D15/1.025` → **102360.9756097561**
- `D22`: `=D16` → **102360.9756097561**
- `E26`: `=D21+D22` → **102771.975609756**
- `D29`: `=E26-E27` → **1445.146341462998**
- `H16`: `=H10+H15` → **103860**
- `H17`: `=H16/1.025` → **101326.8292682927**
- `E27`: `=H17` → **101326.8292682927**
- `D15`: `=SUM(D7:D13)` → **104920**
- `H15`: `=SUM(H12:H14)` → **370**
- `H10`: `=SUM(H7:H9)` → **103490**

#### Sample Data (5 baris pertama)

| (kosong) | (kosong) |                                                                PENERIMAAN | (kosong) | (kosong) | (kosong) | PENGELUARAN | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| (kosong) | (kosong) |                     DARI |                     KG |                 RP | NO |              UNTUK |        LITER |                RP | (kosong) | (kosong) | (kosong) |
| (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | PENJUALAN PADA | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| (kosong) | 1 | ANGGOTA DANA MULYA | 89698 | (kosong) | 1 | NESTLE | 55490 | (kosong) | (kosong) | (kosong) | (kosong) |
| (kosong) | 2 | MOJOSARI | 1663 | (kosong) | 2 | AGEN | 6948 | (kosong) | (kosong) | (kosong) | (kosong) |
| (kosong) | 3 | POJEJER | 7779 | (kosong) | 3 | LOKAL | 41052 | (kosong) | (kosong) | (kosong) | (kosong) |

*Catatan: 15 kolom lainnya tidak ditampilkan*

#### Baris Terakhir (kemungkinan Total/Summary)

- `H35: Drh.H.M.ILHAM`

#### Kolom Kosong

- A, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, AA

---

### SHEET: Juni

| Properti | Nilai |
|---|---|
| Dimensi | A1:AA37 |
| Max Baris | 37 |
| Max Kolom | 27 |
| Visibilitas | visible |
| Merged Cells | 11 |
| Formula | 10 |
| Hidden Rows | 0 |
| Hidden Cols | 0 |

#### Konten Sebelum Header

- `A2: LAPORAN PEMBELIAN DAN PENJUALAN SUSU`
- `A3: BULAN  JUNI 2026`

#### Merged Cells

- `A2:L2`
- `B29:C29`
- `H29:L29`
- `C15:C17`
- `H35:L35`
- `B28:C28`
- `D16:D17`
- `H28:L28`
- `B27:C27`
- `A3:L3`
- `G16:G17`

#### Header (Baris 4)

- **A**: (kosong)
- **B**: (kosong)
- **C**:                                                                PENERIMAAN
- **D**: (kosong)
- **E**: (kosong)
- **F**: (kosong)
- **G**: PENGELUARAN
- **H**: (kosong)
- **I**: (kosong)
- **J**: (kosong)
- **K**: (kosong)
- **L**: (kosong)
- **M**: (kosong)
- **N**: (kosong)
- **O**: (kosong)
- **P**: (kosong)
- **Q**: (kosong)
- **R**: (kosong)
- **S**: (kosong)
- **T**: (kosong)
- **U**: (kosong)
- **V**: (kosong)
- **W**: (kosong)
- **X**: (kosong)
- **Y**: (kosong)
- **Z**: (kosong)
- **AA**: (kosong)

#### Analisis Kolom

| Kolom | Header | Klasifikasi | Tipe Data | Isi |
|---|---|---|---|---|
| A | (kosong) | KOLOM KOSONG |  | 0 baris |
| B | (kosong) | INPUT MANUAL | ANGKA(7), STRING(6) | 13 baris |
| C |                                                                PENERIMAAN | INPUT MANUAL | STRING(11) | 11 baris |
| D | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(7), STRING(5) | 13 baris |
| E | (kosong) | CAMPURAN (ada formula & manual) | STRING(3), STRING (mungkin LITER)(2) | 5 baris |
| F | (kosong) | INPUT MANUAL | STRING(2), ANGKA(6) | 8 baris |
| G | PENGELUARAN | INPUT MANUAL | STRING(11) | 11 baris |
| H | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin LITER)(1), RUPIAH(5), STRING(7), ANGKA(1) | 14 baris |
| I | (kosong) | INPUT MANUAL | STRING(1) | 1 baris |
| J | (kosong) | KOLOM KOSONG |  | 0 baris |
| K | (kosong) | KOLOM KOSONG |  | 0 baris |
| L | (kosong) | KOLOM KOSONG |  | 0 baris |
| M | (kosong) | KOLOM KOSONG |  | 0 baris |
| N | (kosong) | KOLOM KOSONG |  | 0 baris |
| O | (kosong) | KOLOM KOSONG |  | 0 baris |
| P | (kosong) | KOLOM KOSONG |  | 0 baris |
| Q | (kosong) | KOLOM KOSONG |  | 0 baris |
| R | (kosong) | KOLOM KOSONG |  | 0 baris |
| S | (kosong) | KOLOM KOSONG |  | 0 baris |
| T | (kosong) | KOLOM KOSONG |  | 0 baris |
| U | (kosong) | KOLOM KOSONG |  | 0 baris |
| V | (kosong) | KOLOM KOSONG |  | 0 baris |
| W | (kosong) | KOLOM KOSONG |  | 0 baris |
| X | (kosong) | KOLOM KOSONG |  | 0 baris |
| Y | (kosong) | KOLOM KOSONG |  | 0 baris |
| Z | (kosong) | KOLOM KOSONG |  | 0 baris |
| AA | (kosong) | KOLOM KOSONG |  | 0 baris |

#### Detail Kolom & Sample Data

##### Kolom B: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 13 baris
- **Tipe data**: ANGKA(7), STRING(6)
- **Sample**:
  - `Row 7: 1`
  - `Row 8: 2`
  - `Row 9: 3`
  - `Row 10: 4`
  - `Row 11: 5`

##### Kolom C:                                                                PENERIMAAN

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 11 baris
- **Tipe data**: STRING(11)
- **Sample**:
  - `Row 5:                     DARI`
  - `Row 7: ANGGOTA DANA MULYA`
  - `Row 8: MOJOSARI`
  - `Row 9: POJEJER`
  - `Row 10: TAWAR`

##### Kolom D: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 13 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(7), STRING(5)
- **Sample**:
  - `Row 5:                     KG`
  - `Row 7: 87876`
  - `Row 8: 1511`
  - `Row 9: 8606`
  - `Row 11: 2190`

##### Kolom E: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 5 baris
- **Tipe data**: STRING(3), STRING (mungkin LITER)(2)
- **Sample**:
  - `Row 5:                 RP`
  - `Row 21:  Ltr`
  - `Row 22: Ltr `
  - `Row 26: 102413.780487805`
  - `Row 27: 102083`

##### Kolom F: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 8 baris
- **Tipe data**: STRING(2), ANGKA(6)
- **Sample**:
  - `Row 5: NO`
  - `Row 7: 1`
  - `Row 8: 2`
  - `Row 9: 3`
  - `Row 11:     LAIN-LAIN`

##### Kolom G: PENGELUARAN

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 11 baris
- **Tipe data**: STRING(11)
- **Sample**:
  - `Row 5:              UNTUK`
  - `Row 6: PENJUALAN PADA`
  - `Row 7: NESTLE`
  - `Row 8: AGEN`
  - `Row 9: LOKAL`

##### Kolom H: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 14 baris
- **Tipe data**: STRING (mungkin LITER)(1), RUPIAH(5), STRING(7), ANGKA(1)
- **Sample**:
  - `Row 5:        LITER`
  - `Row 7: 54590`
  - `Row 8: 7528`
  - `Row 9: 39675`
  - `Row 10: 101793`

##### Kolom I: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 1 baris
- **Tipe data**: STRING(1)
- **Sample**:
  - `Row 5:                RP`

#### Format Angka yang Digunakan

| Format | Jumlah Cell | Contoh |
|---|---|---|
| `#,##0` | 24 | D7: 87876; H7: 54590 |

#### Formula yang Ditemukan (10 formula)

- `D16`: `=D15/1.025` → **100968.78048780489**
- `D22`: `=D16` → **100968.78048780489**
- `E26`: `=D21+D22` → **102413.780487805**
- `D29`: `=E26-E27` → **330.78048780499375**
- `H16`: `=H10+H15` → **102083**
- `H17`: `=H16` → **102083**
- `E27`: `=H17` → **102083**
- `D15`: `=SUM(D7:D13)` → **103493**
- `H15`: `=SUM(H12:H14)` → **290**
- `H10`: `=SUM(H7:H9)` → **101793**

#### Sample Data (5 baris pertama)

| (kosong) | (kosong) |                                                                PENERIMAAN | (kosong) | (kosong) | (kosong) | PENGELUARAN | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| (kosong) | (kosong) |                     DARI |                     KG |                 RP | NO |              UNTUK |        LITER |                RP | (kosong) | (kosong) | (kosong) |
| (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | PENJUALAN PADA | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| (kosong) | 1 | ANGGOTA DANA MULYA | 87876 | (kosong) | 1 | NESTLE | 54590 | (kosong) | (kosong) | (kosong) | (kosong) |
| (kosong) | 2 | MOJOSARI | 1511 | (kosong) | 2 | AGEN | 7528 | (kosong) | (kosong) | (kosong) | (kosong) |
| (kosong) | 3 | POJEJER | 8606 | (kosong) | 3 | LOKAL | 39675 | (kosong) | (kosong) | (kosong) | (kosong) |

*Catatan: 15 kolom lainnya tidak ditampilkan*

#### Baris Terakhir (kemungkinan Total/Summary)

- `H35: Drh.H.M.ILHAM`

#### Kolom Kosong

- A, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, AA

---

### SHEET: juli.

| Properti | Nilai |
|---|---|
| Dimensi | A1:AA37 |
| Max Baris | 37 |
| Max Kolom | 27 |
| Visibilitas | visible |
| Merged Cells | 11 |
| Formula | 10 |
| Hidden Rows | 0 |
| Hidden Cols | 0 |

#### Konten Sebelum Header

- `A2: LAPORAN PEMBELIAN DAN PENJUALAN SUSU`
- `A3: BULAN  JULI 2026`

#### Merged Cells

- `A2:L2`
- `B29:C29`
- `H35:L35`
- `C15:C17`
- `H29:L29`
- `B28:C28`
- `H28:L28`
- `D16:D17`
- `B27:C27`
- `A3:L3`
- `G16:G17`

#### Header (Baris 4)

- **A**: (kosong)
- **B**: (kosong)
- **C**:                                                                PENERIMAAN
- **D**: (kosong)
- **E**: (kosong)
- **F**: (kosong)
- **G**: PENGELUARAN
- **H**: (kosong)
- **I**: (kosong)
- **J**: (kosong)
- **K**: (kosong)
- **L**: (kosong)
- **M**: (kosong)
- **N**: (kosong)
- **O**: (kosong)
- **P**: (kosong)
- **Q**: (kosong)
- **R**: (kosong)
- **S**: (kosong)
- **T**: (kosong)
- **U**: (kosong)
- **V**: (kosong)
- **W**: (kosong)
- **X**: (kosong)
- **Y**: (kosong)
- **Z**: (kosong)
- **AA**: (kosong)

#### Analisis Kolom

| Kolom | Header | Klasifikasi | Tipe Data | Isi |
|---|---|---|---|---|
| A | (kosong) | KOLOM KOSONG |  | 0 baris |
| B | (kosong) | INPUT MANUAL | ANGKA(7), STRING(6) | 13 baris |
| C |                                                                PENERIMAAN | INPUT MANUAL | STRING(11) | 11 baris |
| D | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin KG)(1), RUPIAH(7), STRING(5) | 13 baris |
| E | (kosong) | CAMPURAN (ada formula & manual) | STRING(3), STRING (mungkin LITER)(2) | 5 baris |
| F | (kosong) | INPUT MANUAL | STRING(2), ANGKA(6) | 8 baris |
| G | PENGELUARAN | INPUT MANUAL | STRING(11) | 11 baris |
| H | (kosong) | CAMPURAN (ada formula & manual) | STRING (mungkin LITER)(1), RUPIAH(5), STRING(7), ANGKA(1) | 14 baris |
| I | (kosong) | INPUT MANUAL | STRING(1) | 1 baris |
| J | (kosong) | KOLOM KOSONG |  | 0 baris |
| K | (kosong) | KOLOM KOSONG |  | 0 baris |
| L | (kosong) | KOLOM KOSONG |  | 0 baris |
| M | (kosong) | KOLOM KOSONG |  | 0 baris |
| N | (kosong) | KOLOM KOSONG |  | 0 baris |
| O | (kosong) | KOLOM KOSONG |  | 0 baris |
| P | (kosong) | KOLOM KOSONG |  | 0 baris |
| Q | (kosong) | KOLOM KOSONG |  | 0 baris |
| R | (kosong) | KOLOM KOSONG |  | 0 baris |
| S | (kosong) | KOLOM KOSONG |  | 0 baris |
| T | (kosong) | KOLOM KOSONG |  | 0 baris |
| U | (kosong) | KOLOM KOSONG |  | 0 baris |
| V | (kosong) | KOLOM KOSONG |  | 0 baris |
| W | (kosong) | KOLOM KOSONG |  | 0 baris |
| X | (kosong) | KOLOM KOSONG |  | 0 baris |
| Y | (kosong) | KOLOM KOSONG |  | 0 baris |
| Z | (kosong) | KOLOM KOSONG |  | 0 baris |
| AA | (kosong) | KOLOM KOSONG |  | 0 baris |

#### Detail Kolom & Sample Data

##### Kolom B: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 13 baris
- **Tipe data**: ANGKA(7), STRING(6)
- **Sample**:
  - `Row 7: 1`
  - `Row 8: 2`
  - `Row 9: 3`
  - `Row 10: 4`
  - `Row 11: 5`

##### Kolom C:                                                                PENERIMAAN

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 11 baris
- **Tipe data**: STRING(11)
- **Sample**:
  - `Row 5:                     DARI`
  - `Row 7: ANGGOTA DANA MULYA`
  - `Row 8: MOJOSARI`
  - `Row 9: POJEJER`
  - `Row 10: TAWAR`

##### Kolom D: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 13 baris
- **Tipe data**: STRING (mungkin KG)(1), RUPIAH(7), STRING(5)
- **Sample**:
  - `Row 5:                     KG`
  - `Row 7: 96282`
  - `Row 8: 1752`
  - `Row 9: 8155`
  - `Row 11: 2390`

##### Kolom E: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 5 baris
- **Tipe data**: STRING(3), STRING (mungkin LITER)(2)
- **Sample**:
  - `Row 5:                 RP`
  - `Row 21:  Ltr`
  - `Row 22: Ltr `
  - `Row 26: 110734.902439024`
  - `Row 27: 109520.9756097561`

##### Kolom F: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 8 baris
- **Tipe data**: STRING(2), ANGKA(6)
- **Sample**:
  - `Row 5: NO`
  - `Row 7: 1`
  - `Row 8: 2`
  - `Row 9: 3`
  - `Row 11:     LAIN-LAIN`

##### Kolom G: PENGELUARAN

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 11 baris
- **Tipe data**: STRING(11)
- **Sample**:
  - `Row 5:              UNTUK`
  - `Row 6: PENJUALAN PADA`
  - `Row 7: NESTLE`
  - `Row 8: AGEN`
  - `Row 9: LOKAL`

##### Kolom H: (kosong)

- **Klasifikasi**: CAMPURAN (ada formula & manual)
- **Jumlah data**: 14 baris
- **Tipe data**: STRING (mungkin LITER)(1), RUPIAH(5), STRING(7), ANGKA(1)
- **Sample**:
  - `Row 5:        LITER`
  - `Row 7: 66140`
  - `Row 8: 7683`
  - `Row 9: 38030`
  - `Row 10: 111853`

##### Kolom I: (kosong)

- **Klasifikasi**: INPUT MANUAL
- **Jumlah data**: 1 baris
- **Tipe data**: STRING(1)
- **Sample**:
  - `Row 5:                RP`

#### Format Angka yang Digunakan

| Format | Jumlah Cell | Contoh |
|---|---|---|
| `#,##0` | 24 | D7: 96282; H7: 66140 |

#### Formula yang Ditemukan (10 formula)

- `D16`: `=D15/1.025` → **110403.9024390244**
- `D22`: `=D16` → **110403.9024390244**
- `E26`: `=D21+D22` → **110734.902439024**
- `D29`: `=E26-E27` → **1213.9268292679917**
- `H16`: `=H10+H15` → **112259**
- `H17`: `=H16/1.025` → **109520.9756097561**
- `E27`: `=H17` → **109520.9756097561**
- `D15`: `=SUM(D7:D13)` → **113164**
- `H15`: `=SUM(H12:H14)` → **406**
- `H10`: `=SUM(H7:H9)` → **111853**

#### Sample Data (5 baris pertama)

| (kosong) | (kosong) |                                                                PENERIMAAN | (kosong) | (kosong) | (kosong) | PENGELUARAN | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| (kosong) | (kosong) |                     DARI |                     KG |                 RP | NO |              UNTUK |        LITER |                RP | (kosong) | (kosong) | (kosong) |
| (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) | PENJUALAN PADA | (kosong) | (kosong) | (kosong) | (kosong) | (kosong) |
| (kosong) | 1 | ANGGOTA DANA MULYA | 96282 | (kosong) | 1 | NESTLE | 66140 | (kosong) | (kosong) | (kosong) | (kosong) |
| (kosong) | 2 | MOJOSARI | 1752 | (kosong) | 2 | AGEN | 7683 | (kosong) | (kosong) | (kosong) | (kosong) |
| (kosong) | 3 | POJEJER | 8155 | (kosong) | 3 | LOKAL | 38030 | (kosong) | (kosong) | (kosong) | (kosong) |

*Catatan: 15 kolom lainnya tidak ditampilkan*

#### Baris Terakhir (kemungkinan Total/Summary)

- `H35: Drh.H.M.ILHAM`

#### Kolom Kosong

- A, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, AA

---

## ANALISIS HUBUNGAN ANTAR-FILE

Tidak ditemukan formula antar-sheet yang eksplisit.
