import json
from pathlib import Path

root = Path(r"c:\Users\HP\Desktop\KKN SIE ACARA\Proker UMKM\Koperasidanamulya")
viewer_file = root / "js" / "excel_viewer.js"

content = viewer_file.read_text(encoding="utf-8")

prefix = "window.ORIGINAL_EXCEL_DATA = "
suffix = ";\n\nconst ExcelViewerModule ="

start_idx = content.find(prefix)
end_idx = content.find(suffix)

if start_idx == -1 or end_idx == -1:
    end_idx = content.find(";\nconst ExcelViewerModule =")

if start_idx != -1 and end_idx != -1:
    json_str = content[start_idx + len(prefix):end_idx].strip()
    data = json.loads(json_str)

    logistik_key = None
    for k in data.keys():
        if "LOGISTIK" in k.upper():
            logistik_key = k
            break

    if logistik_key:
        juli_logistik = [
            [{"v":"LAPORAN LOGISTIK","cs":15,"rs":1,"skip":False}],
            [{"v":"JULI 2026","cs":15,"rs":1,"skip":False}],
            [{"v":"I. PERALATAN DAN PERLENGKAPAN TERNAK","cs":15,"rs":1,"skip":False}],
            [{"v":"NO","cs":1,"rs":2,"skip":False},{"v":"NAMA ALAT","cs":1,"rs":2,"skip":False},{"v":"STOK AWAL","cs":3,"rs":1,"skip":False},{"v":"PEMBELIAN","cs":3,"rs":1,"skip":False},{"v":"PENJUALAN","cs":3,"rs":1,"skip":False}],
            [{"v":"UNIT","cs":1,"rs":1,"skip":False},{"v":"HARGA","cs":1,"rs":1,"skip":False},{"v":"RP","cs":1,"rs":1,"skip":False},{"v":"UNIT","cs":1,"rs":1,"skip":False},{"v":"HARGA","cs":1,"rs":1,"skip":False},{"v":"RP","cs":1,"rs":1,"skip":False},{"v":"UNIT","cs":1,"rs":1,"skip":False},{"v":"HARGA","cs":1,"rs":1,"skip":False},{"v":"RP","cs":1,"rs":1,"skip":False}],
            [{"v":"1","cs":1,"rs":1,"skip":False},{"v":"MILK CAN","cs":1,"rs":1,"skip":False},{"v":"6","cs":1,"rs":1,"skip":False},{"v":"650000","cs":1,"rs":1,"skip":False},{"v":"3900000","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"0","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"0","cs":1,"rs":1,"skip":False}],
            [{"v":"2","cs":1,"rs":1,"skip":False},{"v":"SARINGAN MILK CAN","cs":1,"rs":1,"skip":False},{"v":"24","cs":1,"rs":1,"skip":False},{"v":"130000","cs":1,"rs":1,"skip":False},{"v":"3120000","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"0","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"0","cs":1,"rs":1,"skip":False}],
            [{"v":"3","cs":1,"rs":1,"skip":False},{"v":"TIMBA PERAH","cs":1,"rs":1,"skip":False},{"v":"32","cs":1,"rs":1,"skip":False},{"v":"125000","cs":1,"rs":1,"skip":False},{"v":"4000000","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"0","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"0","cs":1,"rs":1,"skip":False}],
            [{"v":"4","cs":1,"rs":1,"skip":False},{"v":"BRANGUS SAPI","cs":1,"rs":1,"skip":False},{"v":"85","cs":1,"rs":1,"skip":False},{"v":"15000","cs":1,"rs":1,"skip":False},{"v":"1275000","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"0","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"0","cs":1,"rs":1,"skip":False}],
            [{"v":"5","cs":1,"rs":1,"skip":False},{"v":"ALAT CELUP TEAT DIP","cs":1,"rs":1,"skip":False},{"v":"175","cs":1,"rs":1,"skip":False},{"v":"50000","cs":1,"rs":1,"skip":False},{"v":"8750000","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"0","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"0","cs":1,"rs":1,"skip":False}],
            [{"v":"TOTAL PERALATAN","cs":2,"rs":1,"skip":False},{"v":"322","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"21045000","cs":1,"rs":1,"skip":False}],
            [{"v":"II. PENJUALAN MAKANAN TERNAK","cs":15,"rs":1,"skip":False}],
            [{"v":"1","cs":1,"rs":1,"skip":False},{"v":"MF. A18 AGGT SUB","cs":1,"rs":1,"skip":False},{"v":"6350 KG","cs":1,"rs":1,"skip":False},{"v":"3900","cs":1,"rs":1,"skip":False},{"v":"24765000","cs":1,"rs":1,"skip":False}],
            [{"v":"2","cs":1,"rs":1,"skip":False},{"v":"MAGNESIUM","cs":1,"rs":1,"skip":False},{"v":"14 KG","cs":1,"rs":1,"skip":False},{"v":"30000","cs":1,"rs":1,"skip":False},{"v":"420000","cs":1,"rs":1,"skip":False}],
            [{"v":"3","cs":1,"rs":1,"skip":False},{"v":"DCP","cs":1,"rs":1,"skip":False},{"v":"15 KG","cs":1,"rs":1,"skip":False},{"v":"25000","cs":1,"rs":1,"skip":False},{"v":"375000","cs":1,"rs":1,"skip":False}],
            [{"v":"4","cs":1,"rs":1,"skip":False},{"v":"MIX FEED A20 TUNAI & NESTLE","cs":1,"rs":1,"skip":False},{"v":"58400 KG","cs":1,"rs":1,"skip":False},{"v":"4000","cs":1,"rs":1,"skip":False},{"v":"233600000","cs":1,"rs":1,"skip":False}],
            [{"v":"JUMLAH PENJUALAN PAKAN JULI","cs":2,"rs":1,"skip":False},{"v":"64779 KG","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"259160000","cs":1,"rs":1,"skip":False}]
        ]

        august_logistik = [
            [{"v":"LAPORAN LOGISTIK","cs":15,"rs":1,"skip":False}],
            [{"v":"AGUSTUS 2026","cs":15,"rs":1,"skip":False}],
            [{"v":"I. PERALATAN DAN PERLENGKAPAN TERNAK","cs":15,"rs":1,"skip":False}],
            [{"v":"NO","cs":1,"rs":2,"skip":False},{"v":"NAMA ALAT","cs":1,"rs":2,"skip":False},{"v":"STOK AWAL","cs":3,"rs":1,"skip":False},{"v":"PEMBELIAN","cs":3,"rs":1,"skip":False},{"v":"PENJUALAN","cs":3,"rs":1,"skip":False}],
            [{"v":"UNIT","cs":1,"rs":1,"skip":False},{"v":"HARGA","cs":1,"rs":1,"skip":False},{"v":"RP","cs":1,"rs":1,"skip":False},{"v":"UNIT","cs":1,"rs":1,"skip":False},{"v":"HARGA","cs":1,"rs":1,"skip":False},{"v":"RP","cs":1,"rs":1,"skip":False},{"v":"UNIT","cs":1,"rs":1,"skip":False},{"v":"HARGA","cs":1,"rs":1,"skip":False},{"v":"RP","cs":1,"rs":1,"skip":False}],
            [{"v":"1","cs":1,"rs":1,"skip":False},{"v":"MILK CAN","cs":1,"rs":1,"skip":False},{"v":"6","cs":1,"rs":1,"skip":False},{"v":"650000","cs":1,"rs":1,"skip":False},{"v":"3900000","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"0","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"0","cs":1,"rs":1,"skip":False}],
            [{"v":"2","cs":1,"rs":1,"skip":False},{"v":"SARINGAN MILK CAN","cs":1,"rs":1,"skip":False},{"v":"24","cs":1,"rs":1,"skip":False},{"v":"130000","cs":1,"rs":1,"skip":False},{"v":"3120000","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"0","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"0","cs":1,"rs":1,"skip":False}],
            [{"v":"3","cs":1,"rs":1,"skip":False},{"v":"TIMBA PERAH","cs":1,"rs":1,"skip":False},{"v":"32","cs":1,"rs":1,"skip":False},{"v":"125000","cs":1,"rs":1,"skip":False},{"v":"4000000","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"0","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"0","cs":1,"rs":1,"skip":False}],
            [{"v":"4","cs":1,"rs":1,"skip":False},{"v":"BRANGUS SAPI","cs":1,"rs":1,"skip":False},{"v":"85","cs":1,"rs":1,"skip":False},{"v":"15000","cs":1,"rs":1,"skip":False},{"v":"1275000","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"0","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"0","cs":1,"rs":1,"skip":False}],
            [{"v":"5","cs":1,"rs":1,"skip":False},{"v":"ALAT CELUP TEAT DIP","cs":1,"rs":1,"skip":False},{"v":"175","cs":1,"rs":1,"skip":False},{"v":"50000","cs":1,"rs":1,"skip":False},{"v":"8750000","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"0","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"0","cs":1,"rs":1,"skip":False}],
            [{"v":"TOTAL PERALATAN","cs":2,"rs":1,"skip":False},{"v":"322","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"21045000","cs":1,"rs":1,"skip":False}],
            [{"v":"II. PENJUALAN MAKANAN TERNAK","cs":15,"rs":1,"skip":False}],
            [{"v":"1","cs":1,"rs":1,"skip":False},{"v":"MF. A18 AGGT SUB","cs":1,"rs":1,"skip":False},{"v":"6400 KG","cs":1,"rs":1,"skip":False},{"v":"3900","cs":1,"rs":1,"skip":False},{"v":"24960000","cs":1,"rs":1,"skip":False}],
            [{"v":"2","cs":1,"rs":1,"skip":False},{"v":"MAGNESIUM","cs":1,"rs":1,"skip":False},{"v":"15 KG","cs":1,"rs":1,"skip":False},{"v":"30000","cs":1,"rs":1,"skip":False},{"v":"450000","cs":1,"rs":1,"skip":False}],
            [{"v":"3","cs":1,"rs":1,"skip":False},{"v":"DCP","cs":1,"rs":1,"skip":False},{"v":"15 KG","cs":1,"rs":1,"skip":False},{"v":"25000","cs":1,"rs":1,"skip":False},{"v":"375000","cs":1,"rs":1,"skip":False}],
            [{"v":"4","cs":1,"rs":1,"skip":False},{"v":"MIX FEED A20 TUNAI & NESTLE","cs":1,"rs":1,"skip":False},{"v":"59100 KG","cs":1,"rs":1,"skip":False},{"v":"4000","cs":1,"rs":1,"skip":False},{"v":"236400000","cs":1,"rs":1,"skip":False}],
            [{"v":"JUMLAH PENJUALAN PAKAN AGUSTUS","cs":2,"rs":1,"skip":False},{"v":"65530 KG","cs":1,"rs":1,"skip":False},{"v":"","cs":1,"rs":1,"skip":False},{"v":"262185000","cs":1,"rs":1,"skip":False}]
        ]

        data[logistik_key]["JULI"] = juli_logistik
        data[logistik_key]["AGUSTUS"] = august_logistik

        new_json_str = json.dumps(data, separators=(',', ':'), ensure_ascii=False)
        new_content = content[:start_idx + len(prefix)] + new_json_str + content[end_idx:]
        viewer_file.write_text(new_content, encoding="utf-8")
        print(f"Successfully added JULI and AGUSTUS sheets to {logistik_key} in Master Excel Viewer!")
    else:
        print("Logistik key not found in data")
