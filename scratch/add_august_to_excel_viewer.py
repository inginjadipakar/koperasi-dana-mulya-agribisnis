import re
import json
from pathlib import Path

root = Path(r"c:\Users\HP\Desktop\KKN SIE ACARA\Proker UMKM\Koperasidanamulya")
viewer_file = root / "js" / "excel_viewer.js"

content = viewer_file.read_text(encoding="utf-8")

# Extract ORIGINAL_EXCEL_DATA object JSON string
prefix = "window.ORIGINAL_EXCEL_DATA = "
suffix = ";\n\nconst ExcelViewerModule ="

start_idx = content.find(prefix)
end_idx = content.find(suffix)

if start_idx == -1 or end_idx == -1:
    # Try finding suffix without \n\n
    end_idx = content.find(";\nconst ExcelViewerModule =")

if start_idx != -1 and end_idx != -1:
    json_str = content[start_idx + len(prefix):end_idx].strip()
    data = json.loads(json_str)

    # 1. Add AGUSTUS sheet to LAPORAN BULANAN PENERIMAAN SUSU 2026.xlsx
    if "LAPORAN BULANAN PENERIMAAN SUSU 2026.xlsx" in data:
        aug_penerimaan = [
            [{"v":"LAPORAN PENERIMAAN SUSU","cs":9,"rs":1,"skip":False}],
            [{"v":"KOPERASI AGRIBISNIS DANA MULYA","cs":9,"rs":1,"skip":False}],
            [{"v":"BULAN AGUSTUS 2026","cs":9,"rs":1,"skip":False}],
            [{"v":"NO.","cs":1,"rs":2,"skip":False},{"v":"DARI ANGGOTA","cs":3,"rs":1,"skip":False},{"v":"DARI NON ANGGOTA","cs":3,"rs":1,"skip":False},{"v":"JUMLAH","cs":2,"rs":1,"skip":False}],
            [{"v":"KELOMPOK","cs":1,"rs":1,"skip":False},{"v":"KG","cs":1,"rs":1,"skip":False},{"v":"RP","cs":1,"rs":1,"skip":False},{"v":"WILAYAH","cs":1,"rs":1,"skip":False},{"v":"KG","cs":1,"rs":1,"skip":False},{"v":"RP","cs":1,"rs":1,"skip":False},{"v":"KG","cs":1,"rs":1,"skip":False},{"v":"RP","cs":1,"rs":1,"skip":False}],
            [{"v":"1.0","cs":1,"rs":1,"skip":False},{"v":"CEMBOR","cs":1,"rs":1,"skip":False},{"v":"14100.0","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"MOJOSARI","cs":1,"rs":1,"skip":False},{"v":"1800.0","cs":1,"rs":1,"skip":False},{"v":"13320000.0","cs":1,"rs":1,"skip":False}],
            [{"v":"2.0","cs":1,"rs":1,"skip":False},{"v":"CLAKET","cs":1,"rs":1,"skip":False},{"v":"18500.0","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"PRAMBON","cs":1,"rs":1,"skip":False},{"v":"1850.0","cs":1,"rs":1,"skip":False},{"v":"13690000.0","cs":1,"rs":1,"skip":False}],
            [{"v":"3.0","cs":1,"rs":1,"skip":False},{"v":"MLIGI","cs":1,"rs":1,"skip":False},{"v":"1800.0","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"BRANGKAL","cs":1,"rs":1,"skip":False},{"v":"0.0","cs":1,"rs":1,"skip":False},{"v":"0.0","cs":1,"rs":1,"skip":False}],
            [{"v":"4.0","cs":1,"rs":1,"skip":False},{"v":"KAMBENGAN","cs":1,"rs":1,"skip":False},{"v":"3900.0","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"KRIAN","cs":1,"rs":1,"skip":False},{"v":"2450.0","cs":1,"rs":1,"skip":False},{"v":"18375000.0","cs":1,"rs":1,"skip":False}],
            [{"v":"5.0","cs":1,"rs":1,"skip":False},{"v":"SOSO","cs":1,"rs":1,"skip":False},{"v":"21000.0","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"WONOAYU","cs":1,"rs":1,"skip":False},{"v":"0.0","cs":1,"rs":1,"skip":False},{"v":"0.0","cs":1,"rs":1,"skip":False}],
            [{"v":"6.0","cs":1,"rs":1,"skip":False},{"v":"BARAAN","cs":1,"rs":1,"skip":False},{"v":"9800.0","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"POJEJER","cs":1,"rs":1,"skip":False},{"v":"8200.0","cs":1,"rs":1,"skip":False},{"v":"65600000.0","cs":1,"rs":1,"skip":False}],
            [{"v":"7.0","cs":1,"rs":1,"skip":False},{"v":"PASINAN","cs":1,"rs":1,"skip":False},{"v":"3850.0","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"TANEN","cs":1,"rs":1,"skip":False},{"v":"2900.0","cs":1,"rs":1,"skip":False},{"v":"23200000.0","cs":1,"rs":1,"skip":False}],
            [{"v":"8.0","cs":1,"rs":1,"skip":False},{"v":"PACET / WARU GUNUNG","cs":1,"rs":1,"skip":False},{"v":"21500.0","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False}],
            [{"v":"9.0","cs":1,"rs":1,"skip":False},{"v":"KEMIRI / TRECEH","cs":1,"rs":1,"skip":False},{"v":"3950.0","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False}],
            [{"v":"JUMLAH I","cs":2,"rs":1,"skip":False},{"v":"98400.0","cs":1,"rs":1,"skip":False},{"v":"738000000.0","cs":1,"rs":1,"skip":False},{"v":"JUMLAH II","cs":1,"rs":1,"skip":False},{"v":"17200.0","cs":1,"rs":1,"skip":False},{"v":"134185000.0","cs":1,"rs":1,"skip":False}],
            [{"v":"TOTAL I + II","cs":2,"rs":1,"skip":False},{"v":"115600.0","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"872185000.0","cs":1,"rs":1,"skip":False}]
        ]
        data["LAPORAN BULANAN PENERIMAAN SUSU 2026.xlsx"]["AGUSTUS"] = aug_penerimaan

    # 2. Add AGUSTUS sheet to LAPORAN PENGGURUS 2026.xlsx
    if "LAPORAN PENGGURUS 2026.xlsx" in data:
        aug_pengurus = [
            [{"v":"LAPORAN PENGELUARAN SUSU","cs":9,"rs":1,"skip":False}],
            [{"v":"KOPERASI AGRIBISNIS DANA MULYA","cs":9,"rs":1,"skip":False}],
            [{"v":"PERIODE : AGUSTUS 2026","cs":9,"rs":1,"skip":False}],
            [{"v":"1.0","cs":1,"rs":1,"skip":False},{"v":"NESTLE","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"55000.0","cs":1,"rs":1,"skip":False},{"v":"7300.0","cs":1,"rs":1,"skip":False},{"v":"401500000.0","cs":1,"rs":1,"skip":False},{"v":"PECAH / RUSAK","cs":1,"rs":1,"skip":False},{"v":"50.0","cs":1,"rs":1,"skip":False}],
            [{"v":"2.0","cs":1,"rs":1,"skip":False},{"v":"LOKAL","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"38000.0","cs":1,"rs":1,"skip":False},{"v":"7500.0","cs":1,"rs":1,"skip":False},{"v":"285000000.0","cs":1,"rs":1,"skip":False},{"v":"SOSIAL / SUMBANGAN","cs":1,"rs":1,"skip":False},{"v":"200.0","cs":1,"rs":1,"skip":False}],
            [{"v":"3.0","cs":1,"rs":1,"skip":False},{"v":"AGEN","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"7000.0","cs":1,"rs":1,"skip":False},{"v":"7500.0","cs":1,"rs":1,"skip":False},{"v":"52500000.0","cs":1,"rs":1,"skip":False},{"v":"KARYAWAN","cs":1,"rs":1,"skip":False},{"v":"100.0","cs":1,"rs":1,"skip":False}],
            [{"v":"JUMLAH","cs":3,"rs":1,"skip":False},{"v":"100000.0","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"739000000.0","cs":1,"rs":1,"skip":False},{"v":"JUMLAH","cs":1,"rs":1,"skip":False},{"v":"350.0","cs":1,"rs":1,"skip":False}],
            [{"v":"TOTAL","cs":3,"rs":1,"skip":False},{"v":"100350.0","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"739000000.0","cs":1,"rs":1,"skip":False}]
        ]
        data["LAPORAN PENGGURUS 2026.xlsx"]["AGUSTUS"] = aug_pengurus

    # 3. Add AGUSTUS sheet to LAPORAN BULANAN 2026 DEPOT SUSU.xlsx
    if "LAPORAN BULANAN 2026 DEPOT SUSU.xlsx" in data:
        aug_depot = [
            [{"v":"LAPORAN PEMBELIAN DAN PENJUALAN DEPOT SUSU","cs":20,"rs":1,"skip":False}],
            [{"v":"PERIODE AGUSTUS 2026","cs":20,"rs":1,"skip":False}],
            [{"v":"NO","cs":1,"rs":2,"skip":False},{"v":"Pembelian dari Prosesing","cs":5,"rs":1,"skip":False},{"v":"Penjualan pada Agen","cs":6,"rs":1,"skip":False},{"v":"Lain-lain","cs":4,"rs":1,"skip":False},{"v":"Biaya Operasional","cs":4,"rs":1,"skip":False}],
            [{"v":"Harga","cs":1,"rs":1,"skip":False},{"v":"Kg","cs":1,"rs":1,"skip":False},{"v":"Densitas","cs":1,"rs":1,"skip":False},{"v":"Liter","cs":1,"rs":1,"skip":False},{"v":"Rupiah","cs":1,"rs":1,"skip":False},{"v":"Nama","cs":1,"rs":1,"skip":False},{"v":"Harga","cs":1,"rs":1,"skip":False},{"v":"Liter","cs":1,"rs":1,"skip":False},{"v":"Rupiah","cs":1,"rs":1,"skip":False}],
            [{"v":"1","cs":1,"rs":1,"skip":False},{"v":"9000","cs":1,"rs":1,"skip":False},{"v":"38500","cs":1,"rs":1,"skip":False},{"v":"1.025","cs":1,"rs":1,"skip":False},{"v":"37560.98","cs":1,"rs":1,"skip":False},{"v":"346500000","cs":1,"rs":1,"skip":False},{"v":"Heru","cs":1,"rs":1,"skip":False},{"v":"11000","cs":1,"rs":1,"skip":False},{"v":"9150","cs":1,"rs":1,"skip":False},{"v":"100650000","cs":1,"rs":1,"skip":False}],
            [{"v":"JUMLAH PENJUALAN AGEN","cs":9,"rs":1,"skip":False},{"v":"32630 Ltr","cs":1,"rs":1,"skip":False},{"v":"Rp 356.960.000","cs":1,"rs":1,"skip":False}],
            [{"v":"TOTAL BIAYA OPERASIONAL","cs":12,"rs":1,"skip":False},{"v":"Rp 4.835.000","cs":1,"rs":1,"skip":False}]
        ]
        data["LAPORAN BULANAN 2026 DEPOT SUSU.xlsx"]["AGUSTUS"] = aug_depot

    new_json_str = json.dumps(data, separators=(',', ':'), ensure_ascii=False)
    new_content = content[:start_idx + len(prefix)] + new_json_str + content[end_idx:]
    viewer_file.write_text(new_content, encoding="utf-8")
    print("Successfully added AGUSTUS sheet to Master Excel Viewer!")
else:
    print("Error finding markers in excel_viewer.js")
