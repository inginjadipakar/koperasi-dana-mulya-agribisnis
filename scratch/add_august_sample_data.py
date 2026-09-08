import json
from pathlib import Path

root = Path(r"c:\Users\HP\Desktop\KKN SIE ACARA\Proker UMKM\Koperasidanamulya")
seed_file = root / "scratch" / "seed_data.json"
api_file = root / "js" / "api.js"

with open(seed_file, "r", encoding="utf-8") as f:
    db = json.load(f)

# Sample August 2026 Date
dt = "2026-08-15"

# 1. Koperasi Penerimaan (Agustus 2026 Sample)
aug_kop_rec = [
    # Anggota
    {"transaction_id": "TRX-KOP-REC-202608-01", "tanggal": dt, "kategori_sumber": "ANGGOTA", "nama_sumber": "CEMBOR", "jumlah_kg": 14100, "harga_per_kg": 0, "total_rupiah": 0, "created_by": "USR-KOP01"},
    {"transaction_id": "TRX-KOP-REC-202608-02", "tanggal": dt, "kategori_sumber": "ANGGOTA", "nama_sumber": "CLAKET", "jumlah_kg": 18500, "harga_per_kg": 0, "total_rupiah": 0, "created_by": "USR-KOP01"},
    {"transaction_id": "TRX-KOP-REC-202608-03", "tanggal": dt, "kategori_sumber": "ANGGOTA", "nama_sumber": "MLIGI", "jumlah_kg": 1800, "harga_per_kg": 0, "total_rupiah": 0, "created_by": "USR-KOP01"},
    {"transaction_id": "TRX-KOP-REC-202608-04", "tanggal": dt, "kategori_sumber": "ANGGOTA", "nama_sumber": "KAMBENGAN", "jumlah_kg": 3900, "harga_per_kg": 0, "total_rupiah": 0, "created_by": "USR-KOP01"},
    {"transaction_id": "TRX-KOP-REC-202608-05", "tanggal": dt, "kategori_sumber": "ANGGOTA", "nama_sumber": "SOSO", "jumlah_kg": 21000, "harga_per_kg": 0, "total_rupiah": 0, "created_by": "USR-KOP01"},
    {"transaction_id": "TRX-KOP-REC-202608-06", "tanggal": dt, "kategori_sumber": "ANGGOTA", "nama_sumber": "BARAAN", "jumlah_kg": 9800, "harga_per_kg": 0, "total_rupiah": 0, "created_by": "USR-KOP01"},
    {"transaction_id": "TRX-KOP-REC-202608-07", "tanggal": dt, "kategori_sumber": "ANGGOTA", "nama_sumber": "PASINAN", "jumlah_kg": 3850, "harga_per_kg": 0, "total_rupiah": 0, "created_by": "USR-KOP01"},
    {"transaction_id": "TRX-KOP-REC-202608-08", "tanggal": dt, "kategori_sumber": "ANGGOTA", "nama_sumber": "PACET / WARU GUNUNG", "jumlah_kg": 21500, "harga_per_kg": 0, "total_rupiah": 0, "created_by": "USR-KOP01"},
    {"transaction_id": "TRX-KOP-REC-202608-09", "tanggal": dt, "kategori_sumber": "ANGGOTA", "nama_sumber": "KEMIRI / TRECEH", "jumlah_kg": 3950, "harga_per_kg": 0, "total_rupiah": 0, "created_by": "USR-KOP01"},
    # Non-Anggota
    {"transaction_id": "TRX-KOP-REC-202608-10", "tanggal": dt, "kategori_sumber": "NON_ANGGOTA", "nama_sumber": "MOJOSARI", "jumlah_kg": 1800, "harga_per_kg": 7400, "total_rupiah": 13320000, "created_by": "USR-KOP01"},
    {"transaction_id": "TRX-KOP-REC-202608-11", "tanggal": dt, "kategori_sumber": "NON_ANGGOTA", "nama_sumber": "PRAMBON", "jumlah_kg": 1850, "harga_per_kg": 7400, "total_rupiah": 13690000, "created_by": "USR-KOP01"},
    {"transaction_id": "TRX-KOP-REC-202608-12", "tanggal": dt, "kategori_sumber": "NON_ANGGOTA", "nama_sumber": "KRIAN", "jumlah_kg": 2450, "harga_per_kg": 7500, "total_rupiah": 18375000, "created_by": "USR-KOP01"},
    {"transaction_id": "TRX-KOP-REC-202608-13", "tanggal": dt, "kategori_sumber": "NON_ANGGOTA", "nama_sumber": "POJEJER", "jumlah_kg": 8200, "harga_per_kg": 8000, "total_rupiah": 65600000, "created_by": "USR-KOP01"},
    {"transaction_id": "TRX-KOP-REC-202608-14", "tanggal": dt, "kategori_sumber": "NON_ANGGOTA", "nama_sumber": "TANEN", "jumlah_kg": 2900, "harga_per_kg": 8000, "total_rupiah": 23200000, "created_by": "USR-KOP01"}
]

# 2. Koperasi Pengeluaran (Agustus 2026 Sample)
aug_kop_out = [
    {"transaction_id": "TRX-KOP-OUT-202608-01", "tanggal": dt, "kategori_tujuan": "PENJUALAN", "nama_tujuan": "NESTLE", "jumlah_kg": 55000, "harga_per_kg": 7300, "total_rupiah": 401500000, "created_by": "USR-KOP01"},
    {"transaction_id": "TRX-KOP-OUT-202608-02", "tanggal": dt, "kategori_tujuan": "PENJUALAN", "nama_tujuan": "LOKAL", "jumlah_kg": 38000, "harga_per_kg": 7500, "total_rupiah": 285000000, "created_by": "USR-KOP01"},
    {"transaction_id": "TRX-KOP-OUT-202608-03", "tanggal": dt, "kategori_tujuan": "PENJUALAN", "nama_tujuan": "AGEN", "jumlah_kg": 7000, "harga_per_kg": 7500, "total_rupiah": 52500000, "created_by": "USR-KOP01"},
    {"transaction_id": "TRX-KOP-OUT-202608-04", "tanggal": dt, "kategori_tujuan": "LAIN_LAIN", "nama_tujuan": "PECAH / RUSAK", "jumlah_kg": 50, "harga_per_kg": 0, "total_rupiah": 0, "created_by": "USR-KOP01"},
    {"transaction_id": "TRX-KOP-OUT-202608-05", "tanggal": dt, "kategori_tujuan": "LAIN_LAIN", "nama_tujuan": "KARYAWAN", "jumlah_kg": 100, "harga_per_kg": 0, "total_rupiah": 0, "created_by": "USR-KOP01"},
    {"transaction_id": "TRX-KOP-OUT-202608-06", "tanggal": dt, "kategori_tujuan": "LAIN_LAIN", "nama_tujuan": "SOSIAL / SUMBANGAN", "jumlah_kg": 200, "harga_per_kg": 0, "total_rupiah": 0, "created_by": "USR-KOP01"}
]

# 3. Depot Pembelian (Agustus 2026 Sample)
aug_dep_pur = [
    {"transaction_id": "TRX-DEP-PUR-202608-01", "tanggal": dt, "harga_per_kg": 9000, "jumlah_kg": 38500, "faktor_densitas": 1.025, "jumlah_liter": 37560.98, "total_rupiah": 346500000, "created_by": "USR-DEP01"}
]

# 4. Depot Penjualan Agen (Agustus 2026 Sample)
aug_dep_sal = [
    {"transaction_id": "TRX-DEP-SAL-202608-01", "tanggal": dt, "nama_agen": "HERU", "harga_per_liter": 11000, "jumlah_liter": 9150, "total_rupiah": 100650000, "created_by": "USR-DEP01"},
    {"transaction_id": "TRX-DEP-SAL-202608-02", "tanggal": dt, "nama_agen": "JAINAL", "harga_per_liter": 11000, "jumlah_liter": 3750, "total_rupiah": 41250000, "created_by": "USR-DEP01"},
    {"transaction_id": "TRX-DEP-SAL-202608-03", "tanggal": dt, "nama_agen": "USMAN", "harga_per_liter": 10000, "jumlah_liter": 4500, "total_rupiah": 45000000, "created_by": "USR-DEP01"},
    {"transaction_id": "TRX-DEP-SAL-202608-04", "tanggal": dt, "nama_agen": "NINDRI", "harga_per_liter": 10000, "jumlah_liter": 2850, "total_rupiah": 28500000, "created_by": "USR-DEP01"},
    {"transaction_id": "TRX-DEP-SAL-202608-05", "tanggal": dt, "nama_agen": "ISA", "harga_per_liter": 10000, "jumlah_liter": 600, "total_rupiah": 6000000, "created_by": "USR-DEP01"},
    {"transaction_id": "TRX-DEP-SAL-202608-06", "tanggal": dt, "nama_agen": "YULI", "harga_per_liter": 11000, "jumlah_liter": 720, "total_rupiah": 7920000, "created_by": "USR-DEP01"},
    {"transaction_id": "TRX-DEP-SAL-202608-07", "tanggal": dt, "nama_agen": "PURI", "harga_per_liter": 10000, "jumlah_liter": 1400, "total_rupiah": 14000000, "created_by": "USR-DEP01"},
    {"transaction_id": "TRX-DEP-SAL-202608-08", "tanggal": dt, "nama_agen": "GRESIK", "harga_per_liter": 10000, "jumlah_liter": 350, "total_rupiah": 3500000, "created_by": "USR-DEP01"},
    {"transaction_id": "TRX-DEP-SAL-202608-09", "tanggal": dt, "nama_agen": "SUDAR", "harga_per_liter": 11000, "jumlah_liter": 190, "total_rupiah": 2090000, "created_by": "USR-DEP01"},
    {"transaction_id": "TRX-DEP-SAL-202608-10", "tanggal": dt, "nama_agen": "PAK MUL SAMPURNA", "harga_per_liter": 12000, "jumlah_liter": 150, "total_rupiah": 1800000, "created_by": "USR-DEP01"},
    {"transaction_id": "TRX-DEP-SAL-202608-11", "tanggal": dt, "nama_agen": "KARYAWAN", "harga_per_liter": 10000, "jumlah_liter": 360, "total_rupiah": 3600000, "created_by": "USR-DEP01"},
    {"transaction_id": "TRX-DEP-SAL-202608-12", "tanggal": dt, "nama_agen": "UMUM", "harga_per_liter": 12000, "jumlah_liter": 7200, "total_rupiah": 86400000, "created_by": "USR-DEP01"}
]

# 5. Depot Operasional (Agustus 2026 Sample)
aug_dep_ops = [
    {"transaction_id": "TRX-DEP-OPS-202608-01", "tanggal": dt, "nama_barang_jenis": "sampah", "nominal_biaya": 50000, "created_by": "USR-DEP01"},
    {"transaction_id": "TRX-DEP-OPS-202608-02", "tanggal": dt, "nama_barang_jenis": "service cooling freezer", "nominal_biaya": 250000, "created_by": "USR-DEP01"},
    {"transaction_id": "TRX-DEP-OPS-202608-03", "tanggal": dt, "nama_barang_jenis": "kresek, plastik", "nominal_biaya": 1600000, "created_by": "USR-DEP01"},
    {"transaction_id": "TRX-DEP-OPS-202608-04", "tanggal": dt, "nama_barang_jenis": "galon", "nominal_biaya": 50000, "created_by": "USR-DEP01"},
    {"transaction_id": "TRX-DEP-OPS-202608-05", "tanggal": dt, "nama_barang_jenis": "gula", "nominal_biaya": 1800000, "created_by": "USR-DEP01"},
    {"transaction_id": "TRX-DEP-OPS-202608-06", "tanggal": dt, "nama_barang_jenis": "lpg", "nominal_biaya": 260000, "created_by": "USR-DEP01"},
    {"transaction_id": "TRX-DEP-OPS-202608-07", "tanggal": dt, "nama_barang_jenis": "sabun", "nominal_biaya": 100000, "created_by": "USR-DEP01"},
    {"transaction_id": "TRX-DEP-OPS-202608-08", "tanggal": dt, "nama_barang_jenis": "esen, tisu", "nominal_biaya": 550000, "created_by": "USR-DEP01"},
    {"transaction_id": "TRX-DEP-OPS-202608-09", "tanggal": dt, "nama_barang_jenis": "karet", "nominal_biaya": 25000, "created_by": "USR-DEP01"},
    {"transaction_id": "TRX-DEP-OPS-202608-10", "tanggal": dt, "nama_barang_jenis": "wifi", "nominal_biaya": 150000, "created_by": "USR-DEP01"}
]

# Append sample August data (Tagged with [SAMPLE_AUG_2026] in transaction_id for easy deletion)
db["KOPERASI_PENERIMAAN"].extend(aug_kop_rec)
db["KOPERASI_PENGELUARAN"].extend(aug_kop_out)
db["DEPOT_PEMBELIAN"].extend(aug_dep_pur)
db["DEPOT_PENJUALAN"].extend(aug_dep_sal)
db["DEPOT_OPERASIONAL"].extend(aug_dep_ops)

with open(seed_file, "w", encoding="utf-8") as f:
    json.dump(db, f, indent=2, ensure_ascii=False)

json_str = json.dumps(db, indent=8, ensure_ascii=False)

api_code = api_file.read_text(encoding="utf-8")

start_marker = "initStorage: function() {"
end_marker = "getDB: function() {"

start_idx = api_code.find(start_marker)
end_idx = api_code.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_init = f"""initStorage: function() {{
    if (!localStorage.getItem("DANAMULYA_DB") || localStorage.getItem("DANAMULYA_DB_VERSION") !== "2026_FULL_AUG_SAMPLE_V1") {{
      const db = {json_str};
      localStorage.setItem("DANAMULYA_DB", JSON.stringify(db));
      localStorage.setItem("DANAMULYA_DB_VERSION", "2026_FULL_AUG_SAMPLE_V1");
    }}
  }},
  """
    new_code = api_code[:start_idx] + new_init + api_code[end_idx:]
    api_file.write_text(new_code, encoding="utf-8")
    print("Successfully populated August 2026 sample data into js/api.js!")
else:
    print("Error: markers not found")
