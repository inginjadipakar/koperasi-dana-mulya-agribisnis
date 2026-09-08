/**
 * ============================================================
 * KOPERASI.JS — MODUL VISUAL & INTERAKTIF DIVISI KOPERASI
 * PRESISE 100% SINKRON SHEET EXCEL MASTER (JANUARI - JULI 2026)
 * ============================================================
 */

const KoperasiModule = {
  selectedYear: (new Date().getFullYear()).toString(),
  selectedMonth: (["JAN", "FEB", "MAR", "APR", "MEI", "JUNI", "JULI", "AGU", "SEP", "OKT", "NOV", "DES"])[new Date().getMonth()] || "SEP",
  
  getAvailableYears: function() {
    const current = (new Date().getFullYear()).toString();
    const set = new Set(["2026", current]);
    return Array.from(set).sort();
  },

  // ============================================================
  // MASTER DATA EXCEL KOPERASI (1:1 METRICS & REKAPITULASI)
  // ============================================================
  defaultFullData: {
  "JAN": {
    "penerimaan_anggota": [
      {
        "kelompok": "CEMBOR",
        "kg": 14602,
        "rp": 0
      },
      {
        "kelompok": "CLAKET",
        "kg": 17884,
        "rp": 0
      },
      {
        "kelompok": "MLIGI",
        "kg": 3244,
        "rp": 0
      },
      {
        "kelompok": "KAMBENGAN",
        "kg": 2513,
        "rp": 0
      },
      {
        "kelompok": "SOSO",
        "kg": 15352,
        "rp": 0
      },
      {
        "kelompok": "BARAAN",
        "kg": 8354,
        "rp": 0
      },
      {
        "kelompok": "PASINAN",
        "kg": 4056,
        "rp": 0
      },
      {
        "kelompok": "PACET / WARU GUNUNG",
        "kg": 19263,
        "rp": 0
      },
      {
        "kelompok": "KEMIRI / TRECEH",
        "kg": 2952,
        "rp": 0
      }
    ],
    "penerimaan_non_anggota": [
      {
        "wilayah": "TAWAR",
        "kg": 0,
        "rp": 0
      },
      {
        "wilayah": "PRAMBON",
        "kg": 2443,
        "rp": 17101000
      },
      {
        "wilayah": "BRANGKAL",
        "kg": 0,
        "rp": 0
      },
      {
        "wilayah": "KRIAN",
        "kg": 3930,
        "rp": 28296000
      },
      {
        "wilayah": "WONOAYU",
        "kg": 4184,
        "rp": 29288000
      }
    ],
    "j1_kg": 88220,
    "j1_rp": 608718000,
    "j2_kg": 10557,
    "j2_rp": 74685000,
    "tot_kg": 98777,
    "tot_rp": 683403000,
    "pengeluaran_perusahaan": [
      {
        "nama": "NESTLE",
        "kg": 53340,
        "rp": 386362128
      },
      {
        "nama": "LOKAL",
        "kg": 0,
        "rp": 0
      },
      {
        "nama": "AGEN",
        "kg": 0,
        "rp": 0
      }
    ],
    "pengeluaran_perorangan": [
      {
        "nama": "RS.DR SOETOMO",
        "kg": 3255,
        "harga": 12400,
        "rp": 40362000
      },
      {
        "nama": "SAMPURNA",
        "kg": 0,
        "harga": 12000,
        "rp": 0
      },
      {
        "nama": "ALFAN",
        "kg": 422,
        "harga": 9500,
        "rp": 4009000
      },
      {
        "nama": "DIDIK",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "KEJU",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "MAMA",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "HARI",
        "kg": 335,
        "harga": 9500,
        "rp": 3182500
      },
      {
        "nama": "WARDI",
        "kg": 2559,
        "harga": 9500,
        "rp": 24310500
      },
      {
        "nama": "SUZANA",
        "kg": 80,
        "harga": 9500,
        "rp": 760000
      },
      {
        "nama": "KRISTIN",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "DEPOT",
        "kg": 36134,
        "harga": 9000,
        "rp": 325206000
      },
      {
        "nama": "PONDOK",
        "kg": 75,
        "harga": 9500,
        "rp": 712500
      },
      {
        "nama": "HENDRO",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "YAYAK",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "WIDODO",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "YUSUF",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "HARTATIK",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      }
    ],
    "pengeluaran_lain_lain": [
      {
        "karena": "PECAH / RUSAK",
        "kg": 30
      },
      {
        "karena": "SOSIAL / SUMBANGAN",
        "kg": 160
      },
      {
        "karena": "KARYAWAN",
        "kg": 40
      }
    ],
    "rekap_penerimaan": [
      {
        "sumber": "ANGGOTA DANA MULYA",
        "kg": 88220,
        "rp": 0
      },
      {
        "sumber": "GONDANG",
        "kg": 0,
        "rp": 0
      },
      {
        "sumber": "BRANGKAL",
        "kg": 0,
        "rp": 0
      },
      {
        "sumber": "TAWAR",
        "kg": 0,
        "rp": 0
      },
      {
        "sumber": "KRIAN",
        "kg": 3920,
        "rp": 0
      },
      {
        "sumber": "WONOAYU",
        "kg": 4194,
        "rp": 0
      },
      {
        "sumber": "PRAMBON",
        "kg": 2443,
        "rp": 0
      }
    ],
    "rekap_pengeluaran": [
      {
        "untuk": "NESTLE",
        "kg": 53340,
        "rp": 0
      },
      {
        "untuk": "AGEN",
        "kg": 6726,
        "rp": 0
      },
      {
        "untuk": "LOKAL",
        "kg": 36134,
        "rp": 0
      },
      {
        "untuk": "PECAH/RUSAK",
        "kg": 30,
        "rp": 0
      },
      {
        "untuk": "KARYAWAN",
        "kg": 40,
        "rp": 0
      },
      {
        "untuk": "SOSIAL/SUMBANGAN",
        "kg": 160,
        "rp": 0
      }
    ],
    "stok_awal": 357,
    "stok_rekap": {
      "stok_awal": 357.0,
      "penerimaan": 96368,
      "persediaan": 96725,
      "pengeluaran": 96430,
      "stok_akhir": 295
    },
    "rekap_sheet3": {
      "penerimaan": [
        {
          "no": 1,
          "dari": "ANGGOTA DANA MULYA",
          "kg": 88220.0,
          "rp": 0
        },
        {
          "no": 2,
          "dari": "GONDANG",
          "kg": 0,
          "rp": 0
        },
        {
          "no": 3,
          "dari": "BRANGKAL",
          "kg": 0,
          "rp": 0
        },
        {
          "no": 4,
          "dari": "TAWAR",
          "kg": 0,
          "rp": 0
        },
        {
          "no": 5,
          "dari": "KRIAN",
          "kg": 3920.0,
          "rp": 0
        },
        {
          "no": 6,
          "dari": "WONOAYU",
          "kg": 4194.0,
          "rp": 0
        },
        {
          "no": 7,
          "dari": "PRAMBON",
          "kg": 2443.0,
          "rp": 0
        }
      ],
      "tot_pen_kg": 98777.0,
      "penjualan": [
        {
          "no": 1,
          "untuk": "NESTLE",
          "liter": 53340.0,
          "rp": 0
        },
        {
          "no": 2,
          "untuk": "AGEN",
          "liter": 6726.0,
          "rp": 0
        },
        {
          "no": 3,
          "untuk": "LOKAL",
          "liter": 36134.0,
          "rp": 0
        }
      ],
      "tot_penjualan_ltr": 96200.0,
      "lain_lain": [
        {
          "no": 1,
          "untuk": "PECAH/RUSAK",
          "liter": 30.0,
          "rp": 0
        },
        {
          "no": 2,
          "untuk": "KARYAWAN",
          "liter": 40.0,
          "rp": 0
        },
        {
          "no": 3,
          "untuk": "SOSIAL/SUMBANGAN",
          "liter": 160.0,
          "rp": 0
        }
      ],
      "tot_lain_ltr": 230.0,
      "tot_out_ltr": 96430.0
    }
  },
  "FEB": {
    "penerimaan_anggota": [
      {
        "kelompok": "CEMBOR",
        "kg": 13529,
        "rp": 0
      },
      {
        "kelompok": "CLAKET",
        "kg": 16087,
        "rp": 0
      },
      {
        "kelompok": "MLIGI",
        "kg": 2612,
        "rp": 0
      },
      {
        "kelompok": "KAMBENGAN",
        "kg": 2051,
        "rp": 0
      },
      {
        "kelompok": "SOSO",
        "kg": 13515,
        "rp": 0
      },
      {
        "kelompok": "BARAAN",
        "kg": 7489,
        "rp": 0
      },
      {
        "kelompok": "PASINAN",
        "kg": 3501,
        "rp": 0
      },
      {
        "kelompok": "PACET / WARU GUNUNG",
        "kg": 15693,
        "rp": 0
      },
      {
        "kelompok": "KEMIRI / TRECEH",
        "kg": 2987,
        "rp": 0
      }
    ],
    "penerimaan_non_anggota": [
      {
        "wilayah": "TAWAR",
        "kg": 0,
        "rp": 0
      },
      {
        "wilayah": "PRAMBON",
        "kg": 2289,
        "rp": 16023000
      },
      {
        "wilayah": "BRANGKAL",
        "kg": 0,
        "rp": 0
      },
      {
        "wilayah": "KRIAN",
        "kg": 3275,
        "rp": 23580000
      },
      {
        "wilayah": "WONOAYU",
        "kg": 3659,
        "rp": 25613000
      }
    ],
    "j1_kg": 77464,
    "j1_rp": 565487200,
    "j2_kg": 9223,
    "j2_rp": 65216000,
    "tot_kg": 86687,
    "tot_rp": 630703200,
    "pengeluaran_perusahaan": [
      {
        "nama": "NESTLE",
        "kg": 52460,
        "rp": 400698074
      },
      {
        "nama": "LOKAL",
        "kg": 0,
        "rp": 0
      },
      {
        "nama": "AGEN",
        "kg": 0,
        "rp": 0
      }
    ],
    "pengeluaran_perorangan": [
      {
        "nama": "RS.DR SOETOMO",
        "kg": 2950,
        "harga": 12400,
        "rp": 36580000
      },
      {
        "nama": "SAMPURNA",
        "kg": 0,
        "harga": 12000,
        "rp": 0
      },
      {
        "nama": "ALFAN",
        "kg": 246,
        "harga": 9500,
        "rp": 2337000
      },
      {
        "nama": "DIDIK",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "KEJU",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "MAMA",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "HARI",
        "kg": 202,
        "harga": 9500,
        "rp": 1919000
      },
      {
        "nama": "WARDI",
        "kg": 1822,
        "harga": 9500,
        "rp": 17309000
      },
      {
        "nama": "SUZANA",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "KRISTIN",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "DEPOT",
        "kg": 24930,
        "harga": 9000,
        "rp": 224370000
      },
      {
        "nama": "PONDOK",
        "kg": 280,
        "harga": 9500,
        "rp": 2660000
      },
      {
        "nama": "HENDRO",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "YAYAK",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "WIDODO",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "YUSUF",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "HARTATIK",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      }
    ],
    "pengeluaran_lain_lain": [
      {
        "karena": "PECAH / RUSAK",
        "kg": 260
      },
      {
        "karena": "SOSIAL / SUMBANGAN",
        "kg": 80
      },
      {
        "karena": "KARYAWAN",
        "kg": 90
      }
    ],
    "rekap_penerimaan": [
      {
        "sumber": "ANGGOTA DANA MULYA",
        "kg": 77464,
        "rp": 0
      },
      {
        "sumber": "GONDANG",
        "kg": 0,
        "rp": 0
      },
      {
        "sumber": "BRANGKAL",
        "kg": 0,
        "rp": 0
      },
      {
        "sumber": "TAWAR",
        "kg": 0,
        "rp": 0
      },
      {
        "sumber": "KRIAN",
        "kg": 3275,
        "rp": 0
      },
      {
        "sumber": "WONOAYU",
        "kg": 3659,
        "rp": 0
      },
      {
        "sumber": "PRAMBON",
        "kg": 2289,
        "rp": 0
      }
    ],
    "rekap_pengeluaran": [
      {
        "untuk": "NESTLE",
        "kg": 52460,
        "rp": 0
      },
      {
        "untuk": "AGEN",
        "kg": 5500,
        "rp": 0
      },
      {
        "untuk": "LOKAL",
        "kg": 24930,
        "rp": 0
      },
      {
        "untuk": "PECAH/RUSAK",
        "kg": 260,
        "rp": 0
      },
      {
        "untuk": "KARYAWAN",
        "kg": 90,
        "rp": 0
      },
      {
        "untuk": "SOSIAL/SUMBANGAN",
        "kg": 80,
        "rp": 0
      }
    ],
    "stok_awal": 295,
    "stok_rekap": {
      "stok_awal": 295.0,
      "penerimaan": 84573,
      "persediaan": 84868,
      "pengeluaran": 83320,
      "stok_akhir": 1548
    },
    "rekap_sheet3": {
      "penerimaan": [
        {
          "no": 1,
          "dari": "ANGGOTA DANA MULYA",
          "kg": 77464.0,
          "rp": 0
        },
        {
          "no": 2,
          "dari": "GONDANG",
          "kg": 0,
          "rp": 0
        },
        {
          "no": 3,
          "dari": "BRANGKAL",
          "kg": 0,
          "rp": 0
        },
        {
          "no": 4,
          "dari": "TAWAR",
          "kg": 0,
          "rp": 0
        },
        {
          "no": 5,
          "dari": "KRIAN",
          "kg": 3275.0,
          "rp": 0
        },
        {
          "no": 6,
          "dari": "WONOAYU",
          "kg": 3659.0,
          "rp": 0
        },
        {
          "no": 7,
          "dari": "PRAMBON",
          "kg": 2289.0,
          "rp": 0
        }
      ],
      "tot_pen_kg": 86687.0,
      "penjualan": [
        {
          "no": 1,
          "untuk": "NESTLE",
          "liter": 52460.0,
          "rp": 0
        },
        {
          "no": 2,
          "untuk": "AGEN",
          "liter": 5500.0,
          "rp": 0
        },
        {
          "no": 3,
          "untuk": "LOKAL",
          "liter": 24930.0,
          "rp": 0
        }
      ],
      "tot_penjualan_ltr": 82890.0,
      "lain_lain": [
        {
          "no": 1,
          "untuk": "PECAH/RUSAK",
          "liter": 260.0,
          "rp": 0
        },
        {
          "no": 2,
          "untuk": "KARYAWAN",
          "liter": 90.0,
          "rp": 0
        },
        {
          "no": 3,
          "untuk": "SOSIAL/SUMBANGAN",
          "liter": 80.0,
          "rp": 0
        }
      ],
      "tot_lain_ltr": 430.0,
      "tot_out_ltr": 83320.0
    }
  },
  "MAR": {
    "penerimaan_anggota": [
      {
        "kelompok": "CEMBOR",
        "kg": 14452,
        "rp": 0
      },
      {
        "kelompok": "CLAKET",
        "kg": 18258,
        "rp": 0
      },
      {
        "kelompok": "MLIGI",
        "kg": 3327,
        "rp": 0
      },
      {
        "kelompok": "KAMBENGAN",
        "kg": 2426,
        "rp": 0
      },
      {
        "kelompok": "SOSO",
        "kg": 16417,
        "rp": 0
      },
      {
        "kelompok": "BARAAN",
        "kg": 9061,
        "rp": 0
      },
      {
        "kelompok": "PASINAN",
        "kg": 3651,
        "rp": 0
      },
      {
        "kelompok": "PACET / WARU GUNUNG",
        "kg": 17250,
        "rp": 0
      },
      {
        "kelompok": "KEMIRI / TRECEH",
        "kg": 2299,
        "rp": 0
      }
    ],
    "penerimaan_non_anggota": [
      {
        "wilayah": "TAWAR",
        "kg": 0,
        "rp": 0
      },
      {
        "wilayah": "PRAMBON",
        "kg": 3455,
        "rp": 24876000
      },
      {
        "wilayah": "BRANGKAL",
        "kg": 0,
        "rp": 0
      },
      {
        "wilayah": "KRIAN",
        "kg": 3530,
        "rp": 26475000
      },
      {
        "wilayah": "WONOAYU",
        "kg": 3916,
        "rp": 29370000
      }
    ],
    "j1_kg": 87141,
    "j1_rp": 636129300,
    "j2_kg": 10901,
    "j2_rp": 80721000,
    "tot_kg": 98042,
    "tot_rp": 716850300,
    "pengeluaran_perusahaan": [
      {
        "nama": "NESTLE",
        "kg": 65540,
        "rp": 507466104
      },
      {
        "nama": "LOKAL",
        "kg": 0,
        "rp": 0
      },
      {
        "nama": "AGEN",
        "kg": 0,
        "rp": 0
      }
    ],
    "pengeluaran_perorangan": [
      {
        "nama": "RS.DR SOETOMO",
        "kg": 2970,
        "harga": 12400,
        "rp": 36828000
      },
      {
        "nama": "SAMPURNA",
        "kg": 0,
        "harga": 12000,
        "rp": 0
      },
      {
        "nama": "ALFAN",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "DIDIK",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "KEJU",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "MAMA",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "HARI",
        "kg": 58,
        "harga": 9500,
        "rp": 551000
      },
      {
        "nama": "WARDI",
        "kg": 1520,
        "harga": 9500,
        "rp": 14440000
      },
      {
        "nama": "SUZANA",
        "kg": 60,
        "harga": 9500,
        "rp": 570000
      },
      {
        "nama": "KRISTIN",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "DEPOT",
        "kg": 25952,
        "harga": 9000,
        "rp": 233568000
      },
      {
        "nama": "PONDOK",
        "kg": 35,
        "harga": 9500,
        "rp": 332500
      },
      {
        "nama": "HENDRO",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "YAYAK",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "WIDODO",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "YUSUF",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "HARTATIK",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      }
    ],
    "pengeluaran_lain_lain": [
      {
        "karena": "PECAH / RUSAK",
        "kg": 55
      },
      {
        "karena": "SOSIAL / SUMBANGAN",
        "kg": 120
      },
      {
        "karena": "KARYAWAN",
        "kg": 90
      }
    ],
    "rekap_penerimaan": [
      {
        "sumber": "ANGGOTA DANA MULYA",
        "kg": 87141,
        "rp": 0
      },
      {
        "sumber": "GONDANG",
        "kg": 0,
        "rp": 0
      },
      {
        "sumber": "BRANGKAL",
        "kg": 0,
        "rp": 0
      },
      {
        "sumber": "TAWAR",
        "kg": 0,
        "rp": 0
      },
      {
        "sumber": "KRIAN",
        "kg": 3530,
        "rp": 0
      },
      {
        "sumber": "WONOAYU",
        "kg": 3916,
        "rp": 0
      },
      {
        "sumber": "PRAMBON",
        "kg": 3455,
        "rp": 0
      }
    ],
    "rekap_pengeluaran": [
      {
        "untuk": "NESTLE",
        "kg": 65540,
        "rp": 0
      },
      {
        "untuk": "AGEN",
        "kg": 4643,
        "rp": 0
      },
      {
        "untuk": "LOKAL",
        "kg": 25952,
        "rp": 0
      },
      {
        "untuk": "PECAH/RUSAK",
        "kg": 55,
        "rp": 0
      },
      {
        "untuk": "KARYAWAN",
        "kg": 90,
        "rp": 0
      },
      {
        "untuk": "SOSIAL/SUMBANGAN",
        "kg": 120,
        "rp": 0
      }
    ],
    "stok_awal": 1548,
    "stok_rekap": {
      "stok_awal": 1548.0,
      "penerimaan": 95651,
      "persediaan": 97199,
      "pengeluaran": 96400,
      "stok_akhir": 799
    },
    "rekap_sheet3": {
      "penerimaan": [
        {
          "no": 1,
          "dari": "ANGGOTA DANA MULYA",
          "kg": 87141.0,
          "rp": 0
        },
        {
          "no": 2,
          "dari": "GONDANG",
          "kg": 0,
          "rp": 0
        },
        {
          "no": 3,
          "dari": "BRANGKAL",
          "kg": 0,
          "rp": 0
        },
        {
          "no": 4,
          "dari": "TAWAR",
          "kg": 0,
          "rp": 0
        },
        {
          "no": 5,
          "dari": "KRIAN",
          "kg": 3530.0,
          "rp": 0
        },
        {
          "no": 6,
          "dari": "WONOAYU",
          "kg": 3916.0,
          "rp": 0
        },
        {
          "no": 7,
          "dari": "PRAMBON",
          "kg": 3455.0,
          "rp": 0
        }
      ],
      "tot_pen_kg": 98042.0,
      "penjualan": [
        {
          "no": 1,
          "untuk": "NESTLE",
          "liter": 65540.0,
          "rp": 0
        },
        {
          "no": 2,
          "untuk": "AGEN",
          "liter": 4643.0,
          "rp": 0
        },
        {
          "no": 3,
          "untuk": "LOKAL",
          "liter": 25952.0,
          "rp": 0
        }
      ],
      "tot_penjualan_ltr": 96135.0,
      "lain_lain": [
        {
          "no": 1,
          "untuk": "PECAH/RUSAK",
          "liter": 55.0,
          "rp": 0
        },
        {
          "no": 2,
          "untuk": "KARYAWAN",
          "liter": 90.0,
          "rp": 0
        },
        {
          "no": 3,
          "untuk": "SOSIAL/SUMBANGAN",
          "liter": 120.0,
          "rp": 0
        }
      ],
      "tot_lain_ltr": 265.0,
      "tot_out_ltr": 96400.0
    }
  },
  "APRIL": {
    "penerimaan_anggota": [
      {
        "kelompok": "CEMBOR",
        "kg": 13743,
        "rp": 0
      },
      {
        "kelompok": "CLAKET",
        "kg": 17953,
        "rp": 0
      },
      {
        "kelompok": "MLIGI",
        "kg": 2633,
        "rp": 0
      },
      {
        "kelompok": "KAMBENGAN",
        "kg": 3015,
        "rp": 0
      },
      {
        "kelompok": "SOSO",
        "kg": 15677,
        "rp": 0
      },
      {
        "kelompok": "BARAAN",
        "kg": 8373,
        "rp": 0
      },
      {
        "kelompok": "PASINAN",
        "kg": 3856,
        "rp": 0
      },
      {
        "kelompok": "PACET / WARU GUNUNG",
        "kg": 16499,
        "rp": 0
      },
      {
        "kelompok": "KEMIRI / TRECEH",
        "kg": 2487,
        "rp": 0
      }
    ],
    "penerimaan_non_anggota": [
      {
        "wilayah": "MOJOSARI",
        "kg": 1600,
        "rp": 11520000
      },
      {
        "wilayah": "PRAMBON",
        "kg": 1800,
        "rp": 12960000
      },
      {
        "wilayah": "BRANGKAL",
        "kg": 0,
        "rp": 0
      },
      {
        "wilayah": "KRIAN",
        "kg": 2550,
        "rp": 19125000
      },
      {
        "wilayah": "WONOAYU",
        "kg": 0,
        "rp": 0
      },
      {
        "wilayah": "POJEJER",
        "kg": 1753,
        "rp": 14024000
      },
      {
        "wilayah": "TANEN",
        "kg": 560,
        "rp": 4480000
      }
    ],
    "j1_kg": 84236,
    "j1_rp": 530686800,
    "j2_kg": 8263,
    "j2_rp": 62109000,
    "tot_kg": 92499,
    "tot_rp": 592795800,
    "pengeluaran_perusahaan": [
      {
        "nama": "NESTLE",
        "kg": 48800,
        "rp": 379319014
      },
      {
        "nama": "LOKAL",
        "kg": 0,
        "rp": 0
      },
      {
        "nama": "AGEN",
        "kg": 0,
        "rp": 0
      }
    ],
    "pengeluaran_perorangan": [
      {
        "nama": "RS.DR SOETOMO",
        "kg": 2920,
        "harga": 12400,
        "rp": 36208000
      },
      {
        "nama": "SAMPURNA",
        "kg": 0,
        "harga": 12000,
        "rp": 0
      },
      {
        "nama": "ALFAN",
        "kg": 300,
        "harga": 9500,
        "rp": 2850000
      },
      {
        "nama": "DIDIK",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "KEJU",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "MAMA",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "HARI",
        "kg": 320,
        "harga": 9500,
        "rp": 3040000
      },
      {
        "nama": "WARDI",
        "kg": 2438,
        "harga": 9500,
        "rp": 23161000
      },
      {
        "nama": "SUZANA",
        "kg": 100,
        "harga": 9500,
        "rp": 950000
      },
      {
        "nama": "KRISTIN",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "DEPOT",
        "kg": 35180,
        "harga": 9000,
        "rp": 316620000
      },
      {
        "nama": "PONDOK",
        "kg": 263,
        "harga": 9500,
        "rp": 2498500
      },
      {
        "nama": "HENDRO",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "YAYAK",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "WIDODO",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "YUSUF",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "HARTATIK",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      }
    ],
    "pengeluaran_lain_lain": [
      {
        "karena": "PECAH / RUSAK",
        "kg": 40
      },
      {
        "karena": "SOSIAL / SUMBANGAN",
        "kg": 180
      },
      {
        "karena": "KARYAWAN",
        "kg": 90
      }
    ],
    "rekap_penerimaan": [
      {
        "sumber": "ANGGOTA DANA MULYA",
        "kg": 84236,
        "rp": 0
      },
      {
        "sumber": "MOJOSARI",
        "kg": 1600,
        "rp": 0
      },
      {
        "sumber": "POJEJER",
        "kg": 1753,
        "rp": 0
      },
      {
        "sumber": "TAWAR",
        "kg": 0,
        "rp": 0
      },
      {
        "sumber": "KRIAN",
        "kg": 2550,
        "rp": 0
      },
      {
        "sumber": "TANEN",
        "kg": 560,
        "rp": 0
      },
      {
        "sumber": "PRAMBON",
        "kg": 1800,
        "rp": 0
      }
    ],
    "rekap_pengeluaran": [
      {
        "untuk": "NESTLE",
        "kg": 48800,
        "rp": 0
      },
      {
        "untuk": "AGEN",
        "kg": 6341,
        "rp": 0
      },
      {
        "untuk": "LOKAL",
        "kg": 35180,
        "rp": 0
      },
      {
        "untuk": "PECAH/RUSAK",
        "kg": 40,
        "rp": 0
      },
      {
        "untuk": "KARYAWAN",
        "kg": 90,
        "rp": 0
      },
      {
        "untuk": "SOSIAL/SUMBANGAN",
        "kg": 180,
        "rp": 0
      }
    ],
    "stok_awal": 799,
    "stok_rekap": {
      "stok_awal": 799.0,
      "penerimaan": 90243,
      "persediaan": 91042,
      "pengeluaran": 90631,
      "stok_akhir": 411
    },
    "rekap_sheet3": {
      "penerimaan": [
        {
          "no": 1,
          "dari": "ANGGOTA DANA MULYA",
          "kg": 84236.0,
          "rp": 0
        },
        {
          "no": 2,
          "dari": "MOJOSARI",
          "kg": 1600.0,
          "rp": 0
        },
        {
          "no": 3,
          "dari": "POJEJER",
          "kg": 1753.0,
          "rp": 0
        },
        {
          "no": 4,
          "dari": "TAWAR",
          "kg": 0,
          "rp": 0
        },
        {
          "no": 5,
          "dari": "KRIAN",
          "kg": 2550.0,
          "rp": 0
        },
        {
          "no": 6,
          "dari": "TANEN",
          "kg": 560.0,
          "rp": 0
        },
        {
          "no": 7,
          "dari": "PRAMBON",
          "kg": 1800.0,
          "rp": 0
        }
      ],
      "tot_pen_kg": 92499.0,
      "penjualan": [
        {
          "no": 1,
          "untuk": "NESTLE",
          "liter": 48800.0,
          "rp": 0
        },
        {
          "no": 2,
          "untuk": "AGEN",
          "liter": 6341.0,
          "rp": 0
        },
        {
          "no": 3,
          "untuk": "LOKAL",
          "liter": 35180.0,
          "rp": 0
        }
      ],
      "tot_penjualan_ltr": 90321.0,
      "lain_lain": [
        {
          "no": 1,
          "untuk": "PECAH/RUSAK",
          "liter": 40.0,
          "rp": 0
        },
        {
          "no": 2,
          "untuk": "KARYAWAN",
          "liter": 90.0,
          "rp": 0
        },
        {
          "no": 3,
          "untuk": "SOSIAL/SUMBANGAN",
          "liter": 180.0,
          "rp": 0
        }
      ],
      "tot_lain_ltr": 310.0,
      "tot_out_ltr": 90631.0
    }
  },
  "MEI": {
    "penerimaan_anggota": [
      {
        "kelompok": "CEMBOR",
        "kg": 13515,
        "rp": 0
      },
      {
        "kelompok": "CLAKET",
        "kg": 18936,
        "rp": 0
      },
      {
        "kelompok": "MLIGI",
        "kg": 2064,
        "rp": 0
      },
      {
        "kelompok": "KAMBENGAN",
        "kg": 3875,
        "rp": 0
      },
      {
        "kelompok": "SOSO",
        "kg": 17543,
        "rp": 0
      },
      {
        "kelompok": "BARAAN",
        "kg": 9045,
        "rp": 0
      },
      {
        "kelompok": "PASINAN",
        "kg": 3423,
        "rp": 0
      },
      {
        "kelompok": "PACET / WARU GUNUNG",
        "kg": 18986,
        "rp": 0
      },
      {
        "kelompok": "KEMIRI / TRECEH",
        "kg": 2311,
        "rp": 0
      }
    ],
    "penerimaan_non_anggota": [
      {
        "wilayah": "MOJOSARI",
        "kg": 1663,
        "rp": 12306200
      },
      {
        "wilayah": "PRAMBON",
        "kg": 2150,
        "rp": 15910000
      },
      {
        "wilayah": "BRANGKAL",
        "kg": 0,
        "rp": 0
      },
      {
        "wilayah": "KRIAN",
        "kg": 2590,
        "rp": 19425000
      },
      {
        "wilayah": "WONOAYU",
        "kg": 0,
        "rp": 0
      },
      {
        "wilayah": "POJEJER",
        "kg": 7779,
        "rp": 62232000
      },
      {
        "wilayah": "TANEN",
        "kg": 1040,
        "rp": 8320000
      }
    ],
    "j1_kg": 89698,
    "j1_rp": 654795400,
    "j2_kg": 15222,
    "j2_rp": 118193200,
    "tot_kg": 104920,
    "tot_rp": 772988600,
    "pengeluaran_perusahaan": [
      {
        "nama": "NESTLE",
        "kg": 55490,
        "rp": 432820064
      },
      {
        "nama": "LOKAL",
        "kg": 0,
        "rp": 0
      },
      {
        "nama": "AGEN",
        "kg": 0,
        "rp": 0
      }
    ],
    "pengeluaran_perorangan": [
      {
        "nama": "RS.DR SOETOMO",
        "kg": 3140,
        "harga": 12400,
        "rp": 38936000
      },
      {
        "nama": "SAMPURNA",
        "kg": 0,
        "harga": 12000,
        "rp": 0
      },
      {
        "nama": "ALFAN",
        "kg": 429,
        "harga": 9500,
        "rp": 4075500
      },
      {
        "nama": "DIDIK",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "KEJU",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "MAMA",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "HARI",
        "kg": 354,
        "harga": 9500,
        "rp": 3363000
      },
      {
        "nama": "WARDI",
        "kg": 2725,
        "harga": 9500,
        "rp": 25887500
      },
      {
        "nama": "SUZANA",
        "kg": 20,
        "harga": 9500,
        "rp": 190000
      },
      {
        "nama": "KRISTIN",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "DEPOT",
        "kg": 41052,
        "harga": 9000,
        "rp": 369468000
      },
      {
        "nama": "PONDOK",
        "kg": 280,
        "harga": 9500,
        "rp": 2660000
      },
      {
        "nama": "HENDRO",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "YAYAK",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "WIDODO",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "YUSUF",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "HARTATIK",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      }
    ],
    "pengeluaran_lain_lain": [
      {
        "karena": "PECAH / RUSAK",
        "kg": 60
      },
      {
        "karena": "SOSIAL / SUMBANGAN",
        "kg": 180
      },
      {
        "karena": "KARYAWAN",
        "kg": 130
      }
    ],
    "rekap_penerimaan": [
      {
        "sumber": "ANGGOTA DANA MULYA",
        "kg": 89698,
        "rp": 0
      },
      {
        "sumber": "MOJOSARI",
        "kg": 1663,
        "rp": 0
      },
      {
        "sumber": "POJEJER",
        "kg": 7779,
        "rp": 0
      },
      {
        "sumber": "TAWAR",
        "kg": 0,
        "rp": 0
      },
      {
        "sumber": "KRIAN",
        "kg": 2590,
        "rp": 0
      },
      {
        "sumber": "TANEN",
        "kg": 1040,
        "rp": 0
      },
      {
        "sumber": "PRAMBON",
        "kg": 2150,
        "rp": 0
      }
    ],
    "rekap_pengeluaran": [
      {
        "untuk": "NESTLE",
        "kg": 55490,
        "rp": 0
      },
      {
        "untuk": "AGEN",
        "kg": 6948,
        "rp": 0
      },
      {
        "untuk": "LOKAL",
        "kg": 41052,
        "rp": 0
      },
      {
        "untuk": "PECAH/RUSAK",
        "kg": 60,
        "rp": 0
      },
      {
        "untuk": "KARYAWAN",
        "kg": 130,
        "rp": 0
      },
      {
        "untuk": "SOSIAL/SUMBANGAN",
        "kg": 180,
        "rp": 0
      },
      {
        "untuk": "TOTAL",
        "kg": 103860,
        "rp": 0
      }
    ],
    "stok_awal": 0,
    "stok_rekap": {
      "stok_awal": 411.0,
      "penerimaan": 102361,
      "persediaan": 102772,
      "pengeluaran": 103860,
      "stok_akhir": -1088
    },
    "rekap_sheet3": {
      "penerimaan": [
        {
          "no": 1,
          "dari": "ANGGOTA DANA MULYA",
          "kg": 89698.0,
          "rp": 0
        },
        {
          "no": 2,
          "dari": "MOJOSARI",
          "kg": 1663.0,
          "rp": 0
        },
        {
          "no": 3,
          "dari": "POJEJER",
          "kg": 7779.0,
          "rp": 0
        },
        {
          "no": 4,
          "dari": "TAWAR",
          "kg": 0,
          "rp": 0
        },
        {
          "no": 5,
          "dari": "KRIAN",
          "kg": 2590.0,
          "rp": 0
        },
        {
          "no": 6,
          "dari": "TANEN",
          "kg": 1040.0,
          "rp": 0
        },
        {
          "no": 7,
          "dari": "PRAMBON",
          "kg": 2150.0,
          "rp": 0
        }
      ],
      "tot_pen_kg": 104920.0,
      "penjualan": [
        {
          "no": 1,
          "untuk": "NESTLE",
          "liter": 55490.0,
          "rp": 0
        },
        {
          "no": 2,
          "untuk": "AGEN",
          "liter": 6948.0,
          "rp": 0
        },
        {
          "no": 3,
          "untuk": "LOKAL",
          "liter": 41052.0,
          "rp": 0
        }
      ],
      "tot_penjualan_ltr": 103490.0,
      "lain_lain": [
        {
          "no": 1,
          "untuk": "PECAH/RUSAK",
          "liter": 60.0,
          "rp": 0
        },
        {
          "no": 2,
          "untuk": "KARYAWAN",
          "liter": 130.0,
          "rp": 0
        },
        {
          "no": 3,
          "untuk": "SOSIAL/SUMBANGAN",
          "liter": 180.0,
          "rp": 0
        }
      ],
      "tot_lain_ltr": 370.0,
      "tot_out_ltr": 103860.0
    }
  },
  "JUNI": {
    "penerimaan_anggota": [
      {
        "kelompok": "CEMBOR",
        "kg": 12464,
        "rp": 0
      },
      {
        "kelompok": "CLAKET",
        "kg": 17410,
        "rp": 0
      },
      {
        "kelompok": "MLIGI",
        "kg": 1372,
        "rp": 0
      },
      {
        "kelompok": "KAMBENGAN",
        "kg": 3710,
        "rp": 0
      },
      {
        "kelompok": "SOSO",
        "kg": 18266,
        "rp": 0
      },
      {
        "kelompok": "BARAAN",
        "kg": 9188,
        "rp": 0
      },
      {
        "kelompok": "PASINAN",
        "kg": 3201,
        "rp": 0
      },
      {
        "kelompok": "PACET / WARU GUNUNG",
        "kg": 19364,
        "rp": 0
      },
      {
        "kelompok": "KEMIRI / TRECEH",
        "kg": 2901,
        "rp": 0
      }
    ],
    "penerimaan_non_anggota": [
      {
        "wilayah": "MOJOSARI",
        "kg": 1511,
        "rp": 11181400
      },
      {
        "wilayah": "PRAMBON",
        "kg": 1830,
        "rp": 13542000
      },
      {
        "wilayah": "BRANGKAL",
        "kg": 0,
        "rp": 0
      },
      {
        "wilayah": "KRIAN",
        "kg": 2190,
        "rp": 16425000
      },
      {
        "wilayah": "WONOAYU",
        "kg": 0,
        "rp": 0
      },
      {
        "wilayah": "POJEJER",
        "kg": 8606,
        "rp": 68848000
      },
      {
        "wilayah": "TANEN",
        "kg": 1480,
        "rp": 11840000
      }
    ],
    "j1_kg": 87876,
    "j1_rp": 641494800,
    "j2_kg": 15617,
    "j2_rp": 121836400,
    "tot_kg": 103493,
    "tot_rp": 763331200,
    "pengeluaran_perusahaan": [
      {
        "nama": "NESTLE",
        "kg": 54590,
        "rp": 445232836
      },
      {
        "nama": "LOKAL",
        "kg": 0,
        "rp": 0
      },
      {
        "nama": "AGEN",
        "kg": 0,
        "rp": 0
      }
    ],
    "pengeluaran_perorangan": [
      {
        "nama": "RS.DR SOETOMO",
        "kg": 3165,
        "harga": 12400,
        "rp": 39246000
      },
      {
        "nama": "SAMPURNA",
        "kg": 0,
        "harga": 12000,
        "rp": 0
      },
      {
        "nama": "ALFAN",
        "kg": 459,
        "harga": 9500,
        "rp": 4360500
      },
      {
        "nama": "DIDIK",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "KEJU",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "MAMA",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "HARI",
        "kg": 352,
        "harga": 9500,
        "rp": 3344000
      },
      {
        "nama": "WARDI",
        "kg": 3352,
        "harga": 9500,
        "rp": 31844000
      },
      {
        "nama": "SUZANA",
        "kg": 60,
        "harga": 9500,
        "rp": 570000
      },
      {
        "nama": "KRISTIN",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "DEPOT",
        "kg": 39675,
        "harga": 9000,
        "rp": 357075000
      },
      {
        "nama": "PONDOK",
        "kg": 140,
        "harga": 9500,
        "rp": 1330000
      },
      {
        "nama": "HENDRO",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "YAYAK",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "WIDODO",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "YUSUF",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      },
      {
        "nama": "HARTATIK",
        "kg": 0,
        "harga": 9500,
        "rp": 0
      }
    ],
    "pengeluaran_lain_lain": [
      {
        "karena": "PECAH / RUSAK",
        "kg": 30
      },
      {
        "karena": "SOSIAL / SUMBANGAN",
        "kg": 180
      },
      {
        "karena": "KARYAWAN",
        "kg": 80
      }
    ],
    "rekap_penerimaan": [
      {
        "sumber": "ANGGOTA DANA MULYA",
        "kg": 87876,
        "rp": 0
      },
      {
        "sumber": "MOJOSARI",
        "kg": 1511,
        "rp": 0
      },
      {
        "sumber": "POJEJER",
        "kg": 8606,
        "rp": 0
      },
      {
        "sumber": "TAWAR",
        "kg": 0,
        "rp": 0
      },
      {
        "sumber": "KRIAN",
        "kg": 2190,
        "rp": 0
      },
      {
        "sumber": "TANEN",
        "kg": 1480,
        "rp": 0
      },
      {
        "sumber": "PRAMBON",
        "kg": 1830,
        "rp": 0
      }
    ],
    "rekap_pengeluaran": [
      {
        "untuk": "NESTLE",
        "kg": 54590,
        "rp": 0
      },
      {
        "untuk": "AGEN",
        "kg": 7528,
        "rp": 0
      },
      {
        "untuk": "LOKAL",
        "kg": 39675,
        "rp": 0
      },
      {
        "untuk": "PECAH/RUSAK",
        "kg": 30,
        "rp": 0
      },
      {
        "untuk": "KARYAWAN",
        "kg": 80,
        "rp": 0
      },
      {
        "untuk": "SOSIAL/SUMBANGAN",
        "kg": 180,
        "rp": 0
      },
      {
        "untuk": "TOTAL",
        "kg": 102083,
        "rp": 0
      }
    ],
    "stok_awal": 0,
    "stok_rekap": {
      "stok_awal": 1445.0,
      "penerimaan": 100969,
      "persediaan": 102414,
      "pengeluaran": 102083,
      "stok_akhir": 331
    },
    "rekap_sheet3": {
      "penerimaan": [
        {
          "no": 1,
          "dari": "ANGGOTA DANA MULYA",
          "kg": 87876.0,
          "rp": 0
        },
        {
          "no": 2,
          "dari": "MOJOSARI",
          "kg": 1511.0,
          "rp": 0
        },
        {
          "no": 3,
          "dari": "POJEJER",
          "kg": 8606.0,
          "rp": 0
        },
        {
          "no": 4,
          "dari": "TAWAR",
          "kg": 0,
          "rp": 0
        },
        {
          "no": 5,
          "dari": "KRIAN",
          "kg": 2190.0,
          "rp": 0
        },
        {
          "no": 6,
          "dari": "TANEN",
          "kg": 1480.0,
          "rp": 0
        },
        {
          "no": 7,
          "dari": "PRAMBON",
          "kg": 1830.0,
          "rp": 0
        }
      ],
      "tot_pen_kg": 103493.0,
      "penjualan": [
        {
          "no": 1,
          "untuk": "NESTLE",
          "liter": 54590.0,
          "rp": 0
        },
        {
          "no": 2,
          "untuk": "AGEN",
          "liter": 7528.0,
          "rp": 0
        },
        {
          "no": 3,
          "untuk": "LOKAL",
          "liter": 39675.0,
          "rp": 0
        }
      ],
      "tot_penjualan_ltr": 101793.0,
      "lain_lain": [
        {
          "no": 1,
          "untuk": "PECAH/RUSAK",
          "liter": 30.0,
          "rp": 0
        },
        {
          "no": 2,
          "untuk": "KARYAWAN",
          "liter": 80.0,
          "rp": 0
        },
        {
          "no": 3,
          "untuk": "SOSIAL/SUMBANGAN",
          "liter": 180.0,
          "rp": 0
        }
      ],
      "tot_lain_ltr": 290.0,
      "tot_out_ltr": 102083.0
    }
  },
  "JULI": {
    "penerimaan_anggota": [
      {
        "kelompok": "CEMBOR",
        "kg": 13700,
        "rp": 0
      },
      {
        "kelompok": "CLAKET",
        "kg": 18131,
        "rp": 0
      },
      {
        "kelompok": "MLIGI",
        "kg": 1386,
        "rp": 0
      },
      {
        "kelompok": "KAMBENGAN",
        "kg": 3824,
        "rp": 0
      },
      {
        "kelompok": "SOSO",
        "kg": 20693,
        "rp": 0
      },
      {
        "kelompok": "BARAAN",
        "kg": 9680,
        "rp": 0
      },
      {
        "kelompok": "PASINAN",
        "kg": 3778,
        "rp": 0
      },
      {
        "kelompok": "PACET / WARU GUNUNG",
        "kg": 21210,
        "rp": 0
      },
      {
        "kelompok": "KEMIRI / TRECEH",
        "kg": 3880,
        "rp": 0
      }
    ],
    "penerimaan_non_anggota": [
      {
        "wilayah": "MOJOSARI",
        "kg": 1752,
        "rp": 12964800
      },
      {
        "wilayah": "PRAMBON",
        "kg": 1785,
        "rp": 13209000
      },
      {
        "wilayah": "BRANGKAL",
        "kg": 0,
        "rp": 0
      },
      {
        "wilayah": "KRIAN",
        "kg": 2390,
        "rp": 17925000
      },
      {
        "wilayah": "WONOAYU",
        "kg": 0,
        "rp": 0
      },
      {
        "wilayah": "POJEJER",
        "kg": 8155,
        "rp": 65240000
      },
      {
        "wilayah": "TANEN",
        "kg": 2800,
        "rp": 22400000
      }
    ],
    "j1_kg": 96282,
    "j1_rp": 722115000,
    "j2_kg": 16882,
    "j2_rp": 131738800,
    "tot_kg": 113164,
    "tot_rp": 853853800,
    "pengeluaran_perusahaan": [
      {
        "nama": "NESTLE",
        "kg": 66140,
        "rp": 549287784
      },
      {
        "nama": "LOKAL",
        "kg": 0,
        "rp": 0
      },
      {
        "nama": "AGEN",
        "kg": 0,
        "rp": 0
      }
    ],
    "pengeluaran_perorangan": [
      {
        "nama": "RS.DR SOETOMO",
        "kg": 3245,
        "harga": 12400,
        "rp": 40238000
      },
      {
        "nama": "SAMPURNA",
        "kg": 0,
        "harga": 12000,
        "rp": 0
      },
      {
        "nama": "ALFAN",
        "kg": 473,
        "harga": 10000,
        "rp": 4730000
      },
      {
        "nama": "DIDIK",
        "kg": 0,
        "harga": 10000,
        "rp": 0
      },
      {
        "nama": "KEJU",
        "kg": 0,
        "harga": 10000,
        "rp": 0
      },
      {
        "nama": "MAMA",
        "kg": 0,
        "harga": 10000,
        "rp": 0
      },
      {
        "nama": "HARI",
        "kg": 318,
        "harga": 10000,
        "rp": 3180000
      },
      {
        "nama": "WARDI",
        "kg": 3417,
        "harga": 10000,
        "rp": 34170000
      },
      {
        "nama": "SUZANA",
        "kg": 40,
        "harga": 10000,
        "rp": 400000
      },
      {
        "nama": "KRISTIN",
        "kg": 0,
        "harga": 10000,
        "rp": 0
      },
      {
        "nama": "DEPOT",
        "kg": 38030,
        "harga": 10000,
        "rp": 380300000
      },
      {
        "nama": "PONDOK",
        "kg": 190,
        "harga": 10000,
        "rp": 1900000
      },
      {
        "nama": "HENDRO",
        "kg": 0,
        "harga": 10000,
        "rp": 0
      },
      {
        "nama": "YAYAK",
        "kg": 0,
        "harga": 10000,
        "rp": 0
      },
      {
        "nama": "WIDODO",
        "kg": 0,
        "harga": 10000,
        "rp": 0
      },
      {
        "nama": "YUSUF",
        "kg": 0,
        "harga": 10000,
        "rp": 0
      },
      {
        "nama": "HARTATIK",
        "kg": 0,
        "harga": 10000,
        "rp": 0
      }
    ],
    "pengeluaran_lain_lain": [
      {
        "karena": "PECAH / RUSAK",
        "kg": 80
      },
      {
        "karena": "SOSIAL / SUMBANGAN",
        "kg": 186
      },
      {
        "karena": "KARYAWAN",
        "kg": 140
      }
    ],
    "rekap_penerimaan": [
      {
        "sumber": "ANGGOTA DANA MULYA",
        "kg": 96282,
        "rp": 0
      },
      {
        "sumber": "MOJOSARI",
        "kg": 1752,
        "rp": 0
      },
      {
        "sumber": "POJEJER",
        "kg": 8155,
        "rp": 0
      },
      {
        "sumber": "TAWAR",
        "kg": 0,
        "rp": 0
      },
      {
        "sumber": "KRIAN",
        "kg": 2390,
        "rp": 0
      },
      {
        "sumber": "TANEN",
        "kg": 2800,
        "rp": 0
      },
      {
        "sumber": "PRAMBON",
        "kg": 1785,
        "rp": 0
      }
    ],
    "rekap_pengeluaran": [
      {
        "untuk": "NESTLE",
        "kg": 66140,
        "rp": 0
      },
      {
        "untuk": "AGEN",
        "kg": 7683,
        "rp": 0
      },
      {
        "untuk": "LOKAL",
        "kg": 38030,
        "rp": 0
      },
      {
        "untuk": "PECAH/RUSAK",
        "kg": 80,
        "rp": 0
      },
      {
        "untuk": "KARYAWAN",
        "kg": 140,
        "rp": 0
      },
      {
        "untuk": "SOSIAL/SUMBANGAN",
        "kg": 186,
        "rp": 0
      },
      {
        "untuk": "TOTAL",
        "kg": 112259,
        "rp": 0
      }
    ],
    "stok_awal": 0,
    "stok_rekap": {
      "stok_awal": 331.0,
      "penerimaan": 110404,
      "persediaan": 110735,
      "pengeluaran": 112259,
      "stok_akhir": -1524
    },
    "rekap_sheet3": {
      "penerimaan": [
        {
          "no": 1,
          "dari": "ANGGOTA DANA MULYA",
          "kg": 96282.0,
          "rp": 0
        },
        {
          "no": 2,
          "dari": "MOJOSARI",
          "kg": 1752.0,
          "rp": 0
        },
        {
          "no": 3,
          "dari": "POJEJER",
          "kg": 8155.0,
          "rp": 0
        },
        {
          "no": 4,
          "dari": "TAWAR",
          "kg": 0,
          "rp": 0
        },
        {
          "no": 5,
          "dari": "KRIAN",
          "kg": 2390.0,
          "rp": 0
        },
        {
          "no": 6,
          "dari": "TANEN",
          "kg": 2800.0,
          "rp": 0
        },
        {
          "no": 7,
          "dari": "PRAMBON",
          "kg": 1785.0,
          "rp": 0
        }
      ],
      "tot_pen_kg": 113164.0,
      "penjualan": [
        {
          "no": 1,
          "untuk": "NESTLE",
          "liter": 66140.0,
          "rp": 0
        },
        {
          "no": 2,
          "untuk": "AGEN",
          "liter": 7683.0,
          "rp": 0
        },
        {
          "no": 3,
          "untuk": "LOKAL",
          "liter": 38030.0,
          "rp": 0
        }
      ],
      "tot_penjualan_ltr": 111853.0,
      "lain_lain": [
        {
          "no": 1,
          "untuk": "PECAH/RUSAK",
          "liter": 80.0,
          "rp": 0
        },
        {
          "no": 2,
          "untuk": "KARYAWAN",
          "liter": 140.0,
          "rp": 0
        },
        {
          "no": 3,
          "untuk": "SOSIAL/SUMBANGAN",
          "liter": 186.0,
          "rp": 0
        }
      ],
      "tot_lain_ltr": 406.0,
      "tot_out_ltr": 112259.0
    }
  }
},

  getMonthData: function(monthCode) {
    const code = monthCode || this.selectedMonth;
    if (this.defaultFullData[code]) {
      return this.defaultFullData[code];
    }
    return this.defaultFullData["JULI"] || this.defaultFullData["JAN"];
  },

  render: async function() {
    if (!AuthManager.requireAuth("koperasi", "KOPERASI")) {
      return `<div class="alert alert-danger">Akses Ditolak. Anda tidak berhak mengakses Divisi Koperasi.</div>`;
    }

    const recRes = await ApiClient.post("getKoperasiPenerimaan");
    const outRes = await ApiClient.post("getKoperasiPengeluaran");
    const rawPenerimaan = recRes.data || [];
    const rawPengeluaran = outRes.data || [];

    const monthsList = ["JAN","FEB","MAR","APRIL","MEI","JUNI","JULI","AGU","SEP","OKT","NOV","DES"];

    const filterFn = (r) => {
      if (!r.tanggal) return true;
      const d = new Date(r.tanggal);
      const yearMatch = d.getFullYear().toString() === this.selectedYear;
      return yearMatch && monthsList[d.getMonth()] === this.selectedMonth;
    };

    const allPenerimaan = rawPenerimaan.filter(filterFn);
    const allPengeluaran = rawPengeluaran.filter(filterFn);

    const mData = this.getMonthData();

    // Aggregates for Penerimaan
    const totAnggotaKg = mData.j1_kg || mData.penerimaan_anggota.reduce((a, b) => a + Number(b.kg || 0), 0);
    const totAnggotaRp = mData.j1_rp || mData.penerimaan_anggota.reduce((a, b) => a + Number(b.rp || 0), 0);
    const totNonAnggotaKg = mData.j2_kg || mData.penerimaan_non_anggota.reduce((a, b) => a + Number(b.kg || 0), 0);
    const totNonAnggotaRp = mData.j2_rp || mData.penerimaan_non_anggota.reduce((a, b) => a + Number(b.rp || 0), 0);
    const totalPenerimaanKg = mData.tot_kg || (totAnggotaKg + totNonAnggotaKg);
    const totalPenerimaanRp = mData.tot_rp || (totAnggotaRp + totNonAnggotaRp);

    // Aggregates for Pengeluaran
    const totPerusahaanKg = mData.pengeluaran_perusahaan.reduce((a, b) => a + Number(b.kg || 0), 0);
    const totPerusahaanRp = mData.pengeluaran_perusahaan.reduce((a, b) => a + Number(b.rp || 0), 0);
    const totPeroranganKg = mData.pengeluaran_perorangan.reduce((a, b) => a + Number(b.kg || 0), 0);
    const totPeroranganRp = mData.pengeluaran_perorangan.reduce((a, b) => a + Number(b.rp || 0), 0);
    const totalPenjualanKg = totPerusahaanKg + totPeroranganKg;
    const totalPenjualanRp = totPerusahaanRp + totPeroranganRp;

    const totLainKg = mData.pengeluaran_lain_lain.reduce((a, b) => a + Number(b.kg || 0), 0);
    const totalPengeluaranKg = totalPenjualanKg + totLainKg;

    const stokRekap = (mData && mData.stok_rekap) ? mData.stok_rekap : {
      stok_awal: Number(mData?.stok_awal || 0),
      penerimaan: Math.round((mData?.rekap_sheet3?.tot_pen_kg || totalPenerimaanKg) / 1.025),
      persediaan: Number(mData?.stok_awal || 0) + Math.round((mData?.rekap_sheet3?.tot_pen_kg || totalPenerimaanKg) / 1.025),
      pengeluaran: Math.round(mData?.rekap_sheet3?.tot_out_ltr || (totalPengeluaranKg / 1.025)),
      stok_akhir: (Number(mData?.stok_awal || 0) + Math.round((mData?.rekap_sheet3?.tot_pen_kg || totalPenerimaanKg) / 1.025)) - Math.round(mData?.rekap_sheet3?.tot_out_ltr || (totalPengeluaranKg / 1.025))
    };

    return `
      <!-- MOBILE HERO FINANCIAL HEADER CARD (DANA / LIVIN' / MYBCA STYLE) -->
      <div class="finance-hero-card mb-3" style="background: linear-gradient(135deg, #064e3b 0%, #047857 50%, #0f172a 100%);">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <div class="finance-hero-greeting">
              <i class="bi bi-shield-check text-emerald me-1"></i>Sistem Informasi Digital Danamulya
            </div>
            <div class="finance-hero-name">
              Divisi Koperasi Susu
            </div>
          </div>
          <span class="badge bg-dark bg-opacity-40 text-white border border-white border-opacity-25 rounded-pill px-3 py-1 fw-semibold small d-inline-flex align-items-center">
            <i class="bi bi-calendar3 me-1 text-emerald"></i>${this.selectedMonth} ${this.selectedYear}
          </span>
        </div>

        <!-- BALANCE & SUMMARY CARDS -->
        <div class="finance-balance-box">
          <div class="d-flex justify-content-between align-items-center">
            <span class="finance-balance-label">Total Penerimaan Susu (Anggota + Non)</span>
            <span class="badge bg-emerald text-white rounded-pill px-2 py-1 small fw-bold">
              ${Math.round(totalPenerimaanKg).toLocaleString('id-ID')} KG
            </span>
          </div>
          <div class="finance-balance-amount">
            Rp ${Math.round(totalPenerimaanRp).toLocaleString('id-ID')}
          </div>
          <div class="d-flex justify-content-between align-items-center mt-2 pt-2 border-top border-white border-opacity-10 text-white-50 extra-small">
            <span><i class="bi bi-box-arrow-up-right me-1"></i>Pengeluaran: ${Math.round(totalPengeluaranKg).toLocaleString('id-ID')} KG</span>
            <span><i class="bi bi-graph-up-arrow me-1"></i>Omset Jual: Rp ${Math.round(totalPenjualanRp).toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>

      <!-- 6-GRID SHORTCUT MENU (ALA DANA / LIVIN' / SHOPEEPAY) -->
      <div class="finance-grid-menu mb-3">
        <a class="finance-grid-item" onclick="document.getElementById('rec-tab').click()">
          <div class="finance-icon-circle emerald"><i class="bi bi-box-arrow-in-down"></i></div>
          <span>Penerimaan</span>
        </a>
        <a class="finance-grid-item" onclick="document.getElementById('out-tab').click()">
          <div class="finance-icon-circle blue"><i class="bi bi-box-arrow-up-right"></i></div>
          <span>Pengeluaran</span>
        </a>
        <a class="finance-grid-item" onclick="document.getElementById('recap-tab').click()">
          <div class="finance-icon-circle amber"><i class="bi bi-file-earmark-bar-graph"></i></div>
          <span>Stok Opname</span>
        </a>
        <a class="finance-grid-item" onclick="document.getElementById('sheet-tab').click()">
          <div class="finance-icon-circle teal"><i class="bi bi-table"></i></div>
          <span>Matriks Excel</span>
        </a>
        <a class="finance-grid-item" onclick="KoperasiModule.exportExcel()">
          <div class="finance-icon-circle rose"><i class="bi bi-file-earmark-spreadsheet-fill"></i></div>
          <span>Export Excel</span>
        </a>
        <a class="finance-grid-item" onclick="App.resetData()">
          <div class="finance-icon-circle purple"><i class="bi bi-arrow-clockwise"></i></div>
          <span>Reset Data</span>
        </a>
      </div>

      <!-- FILTER BULAN & TAHUN PILL BAR -->
      <div class="card card-custom p-3 mb-3 shadow-sm border-0 bg-white">
        <div class="d-flex align-items-center gap-2 overflow-auto pb-1">
          <span class="fw-bold text-muted extra-small text-nowrap"><i class="bi bi-calendar3 me-1 text-success"></i>Tahun:</span>
          ${this.getAvailableYears().map(y => `
            <button class="btn btn-xs ${y === this.selectedYear ? 'btn-success fw-bold' : 'btn-outline-secondary'} rounded-pill px-3 py-1"
                    onclick="KoperasiModule.selectYear('${y}')">${y}</button>
          `).join('')}
          <div class="vr mx-1"></div>
          <span class="fw-bold text-muted extra-small text-nowrap"><i class="bi bi-funnel me-1 text-success"></i>Bulan:</span>
          ${monthsList.map(m => `
            <button class="btn btn-xs ${m === this.selectedMonth ? 'btn-success fw-bold' : 'btn-light text-dark'} rounded-pill px-3 py-1 text-nowrap"
                    onclick="KoperasiModule.selectMonth('${m}')">${m}</button>
          `).join('')}
        </div>
      </div>

      <!-- Tabs Nav -->
      <div class="finance-segmented-nav-container">
        <ul class="nav finance-segmented-nav" id="kopTab" role="tablist">
          <li class="nav-item">
            <button class="nav-link active" id="sheet-tab" data-bs-toggle="tab" data-bs-target="#sheet-pane">
              <i class="bi bi-table me-1 text-success"></i>Laporan Matriks Koperasi
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" id="rec-tab" data-bs-toggle="tab" data-bs-target="#rec-pane">
              <i class="bi bi-plus-circle me-1 text-success"></i>I. Penerimaan Susu
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" id="out-tab" data-bs-toggle="tab" data-bs-target="#out-pane">
              <i class="bi bi-dash-circle me-1 text-primary"></i>II. Pengeluaran Susu
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" id="recap-tab" data-bs-toggle="tab" data-bs-target="#recap-pane">
              <i class="bi bi-file-earmark-bar-graph me-1 text-warning"></i>III. Stok Opname
            </button>
          </li>
        </ul>
      </div>

      <div class="tab-content">
        <!-- TAB MAIN: EXCEL MATRIX REPORT -->
        <div class="tab-pane fade show active" id="sheet-pane">

          <!-- JUDUL LAPORAN EXCEL KOPERASI -->
          <div class="card card-custom p-4 mb-4 shadow-sm border-0 bg-white text-center">
            <h4 class="fw-bold text-dark mb-1">LAPORAN PENERIMAAN DAN PENGELUARAN SUSU</h4>
            <h5 class="fw-bold text-success mb-2">KOPERASI AGRIBISNIS DANA MULYA PACET</h5>
            <span class="badge bg-dark align-self-center px-4 py-2 fs-6 rounded-pill">PERIODE ${this.selectedMonth} ${this.selectedYear}</span>
          </div>

          <!-- MATRIX TABEL 1: LAPORAN PENERIMAAN SUSU -->
          <div class="card card-custom p-4 mb-4 shadow-sm border-0">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="fw-bold mb-0 text-dark"><i class="bi bi-box-arrow-in-down text-success me-2"></i>LAPORAN PENERIMAAN SUSU KOPERASI</h5>
              <span class="badge bg-success-subtle text-success border border-success-subtle">Matriks Penerimaan</span>
            </div>
            <div class="table-responsive">
              <table class="table table-bordered table-hover align-middle mb-0" style="font-size: 0.85rem;">
                <thead class="table-success text-dark fw-bold text-center align-middle">
                  <tr>
                    <th rowspan="2" style="width: 45px;">NO</th>
                    <th colspan="3">DARI ANGGOTA (KELOMPOK)</th>
                    <th colspan="3">DARI NON ANGGOTA (WILAYAH)</th>
                    <th colspan="2">JUMLAH</th>
                    <th rowspan="2" style="width: 130px;">KETERANGAN</th>
                  </tr>
                  <tr>
                    <th>KELOMPOK</th>
                    <th style="width: 110px;">KG</th>
                    <th style="width: 140px;">RP</th>
                    <th>WILAYAH</th>
                    <th style="width: 110px;">KG</th>
                    <th style="width: 140px;">RP</th>
                    <th style="width: 110px;">KG</th>
                    <th style="width: 140px;">RP</th>
                  </tr>
                  <tr style="background-color: #343a40 !important; color: white !important; height: 8px;">
                    <th colspan="10" style="padding: 2px; background-color: #343a40 !important;"></th>
                  </tr>
                </thead>
                <tbody>
                  ${(() => {
                    const maxRows = Math.max(mData.penerimaan_anggota.length, mData.penerimaan_non_anggota.length);
                    let rowsHtml = '';
                    for (let i = 0; i < maxRows; i++) {
                      const a = mData.penerimaan_anggota[i] || {};
                      const na = mData.penerimaan_non_anggota[i] || {};
                      const rowKgSum = (Number(a.kg) || 0) + (Number(na.kg) || 0);
                      const rowRpSum = (Number(a.rp) || 0) + (Number(na.rp) || 0);
                      rowsHtml += `
                        <tr>
                          <td class="text-center fw-bold">${i + 1}</td>
                          <td class="fw-semibold text-dark">${a.kelompok || ''}</td>
                          <td class="text-end fw-bold text-success">${a.kg ? Math.round(Number(a.kg)).toLocaleString('id-ID') : ''}</td>
                          <td class="text-end">${a.rp ? 'Rp ' + Math.round(Number(a.rp)).toLocaleString('id-ID') : ''}</td>
                          <td class="fw-semibold text-dark">${na.wilayah || ''}</td>
                          <td class="text-end fw-bold text-primary">${na.kg ? Math.round(Number(na.kg)).toLocaleString('id-ID') : ''}</td>
                          <td class="text-end">${na.rp ? 'Rp ' + Math.round(Number(na.rp)).toLocaleString('id-ID') : ''}</td>
                          <td class="text-end fw-bold text-dark">${rowKgSum ? Math.round(Number(rowKgSum)).toLocaleString('id-ID') : ''}</td>
                          <td class="text-end fw-bold text-dark">${rowRpSum ? 'Rp ' + Math.round(Number(rowRpSum)).toLocaleString('id-ID') : ''}</td>
                          <td></td>
                        </tr>
                      `;
                    }
                    return rowsHtml;
                  })()}
                </tbody>
                <tfoot class="fw-bold">
                  <tr class="table-light">
                    <td colspan="2" class="text-center text-dark fw-bold">JUMLAH I (ANGGOTA)</td>
                    <td class="text-end text-success fw-bold">${Math.round(totAnggotaKg).toLocaleString('id-ID')}</td>
                    <td class="text-end text-success fw-bold">${totAnggotaRp ? 'Rp ' + Math.round(totAnggotaRp).toLocaleString('id-ID') : ''}</td>
                    <td class="text-center text-dark fw-bold">JUMLAH II (NON-ANGGOTA)</td>
                    <td class="text-end text-primary fw-bold">${Math.round(totNonAnggotaKg).toLocaleString('id-ID')}</td>
                    <td class="text-end text-primary fw-bold">${totNonAnggotaRp ? 'Rp ' + Math.round(totNonAnggotaRp).toLocaleString('id-ID') : ''}</td>
                    <td colspan="2"></td>
                    <td></td>
                  </tr>
                  <tr class="table-success">
                    <td colspan="2" class="text-center text-dark fs-6 fw-bold">TOTAL I + II</td>
                    <td class="text-end text-dark fs-6 fw-bold">${Math.round(totalPenerimaanKg).toLocaleString('id-ID')}</td>
                    <td class="text-end text-dark fs-6 fw-bold" colspan="4">Rp ${Math.round(totalPenerimaanRp).toLocaleString('id-ID')}</td>
                    <td colspan="2"></td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <!-- MATRIX TABEL 2: LAPORAN PENGELUARAN SUSU -->
          <div class="card card-custom p-4 mb-4 shadow-sm border-0">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="fw-bold mb-0 text-dark"><i class="bi bi-box-arrow-up-right text-primary me-2"></i>LAPORAN PENGELUARAN SUSU KOPERASI</h5>
              <span class="badge bg-primary-subtle text-primary border border-primary-subtle">Matriks Pengeluaran</span>
            </div>
            <div class="table-responsive">
              <table class="table table-bordered table-hover align-middle mb-0" style="font-size: 0.85rem;">
                <thead class="table-primary text-dark fw-bold text-center align-middle">
                  <tr>
                    <th rowspan="2" style="width: 45px;">NO</th>
                    <th colspan="4">UNTUK PENJUALAN</th>
                    <th colspan="2">UNTUK LAIN - LAIN (DIPERGUNAKAN KARENA)</th>
                    <th rowspan="2" style="width: 100px;">TOTAL KG</th>
                    <th rowspan="2" style="width: 120px;">KETERANGAN</th>
                  </tr>
                  <tr>
                    <th>PERUSAHAAN / KOMUNAL</th>
                    <th>PER ORANGAN</th>
                    <th style="width: 100px;">KG</th>
                    <th style="width: 140px;">RP</th>
                    <th>KARENA</th>
                    <th style="width: 90px;">KG</th>
                  </tr>
                </thead>
                <tbody>
                  ${(() => {
                    const allPenjualan = [
                      ...mData.pengeluaran_perusahaan.map(p => ({ jenis: 'perusahaan', nama: p.nama, kg: p.kg, rp: p.rp })),
                      ...mData.pengeluaran_perorangan.map(p => ({ jenis: 'perorangan', nama: p.nama, kg: p.kg, rp: p.rp }))
                    ];
                    const maxRows = Math.max(allPenjualan.length, mData.pengeluaran_lain_lain.length);
                    let rowsHtml = '';
                    for (let i = 0; i < maxRows; i++) {
                      const p = allPenjualan[i] || {};
                      const l = mData.pengeluaran_lain_lain[i] || {};
                      const isPerusahaan = p.jenis === 'perusahaan';
                      rowsHtml += `
                        <tr>
                          <td class="text-center fw-bold">${i + 1}</td>
                          <td class="fw-bold text-dark">${isPerusahaan ? p.nama : ''}</td>
                          <td class="fw-semibold text-dark">${!isPerusahaan ? (p.nama || '') : ''}</td>
                          <td class="text-end fw-bold text-primary">${p.kg ? Math.round(Number(p.kg)).toLocaleString('id-ID') : ''}</td>
                          <td class="text-end">${p.rp ? 'Rp ' + Math.round(Number(p.rp)).toLocaleString('id-ID') : ''}</td>
                          <td class="fw-semibold text-danger">${l.karena || ''}</td>
                          <td class="text-end fw-bold text-danger">${l.kg ? Math.round(Number(l.kg)).toLocaleString('id-ID') : ''}</td>
                          <td></td>
                          <td>${l.keterangan || ''}</td>
                        </tr>
                      `;
                    }
                    return rowsHtml;
                  })()}
                </tbody>
                <tfoot class="table-light fw-bold">
                  <tr>
                    <td colspan="3" class="text-center text-dark">JUMLAH PENJUALAN</td>
                    <td class="text-end text-primary">${Math.round(totalPenjualanKg).toLocaleString('id-ID')}</td>
                    <td class="text-end text-primary">Rp ${Math.round(totalPenjualanRp).toLocaleString('id-ID')}</td>
                    <td class="text-center text-dark">JUMLAH LAIN-LAIN</td>
                    <td class="text-end text-danger">${Math.round(totLainKg).toLocaleString('id-ID')}</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr class="table-primary">
                    <td colspan="3" class="text-center text-dark fs-6 fw-bold">TOTAL PENGELUARAN</td>
                    <td class="text-end text-dark fs-6 fw-bold" colspan="2">${Math.round(totalPengeluaranKg).toLocaleString('id-ID')} KG</td>
                    <td colspan="4"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

        </div>

        <!-- TAB 2: I. PENERIMAAN SUSU INPUT -->
        <div class="tab-pane fade" id="rec-pane">
          <div class="card card-custom p-4 mb-4 shadow-sm border-0">
            <h5 class="fw-bold mb-3"><i class="bi bi-plus-circle-fill text-success me-2"></i>Input Transaksi Penerimaan Susu</h5>
            <form id="formKopRec" onsubmit="KoperasiModule.handleSaveRec(event)">
              <div class="row g-3">
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Tanggal</label>
                  <input type="date" class="form-control" name="tanggal" required value="${new Date().toISOString().substring(0,10)}">
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Kategori Sumber</label>
                  <select class="form-select" name="kategori_sumber" id="recKategori" onchange="KoperasiModule.toggleRecKategori()" required>
                    <option value="ANGGOTA">ANGGOTA (Kelompok)</option>
                    <option value="NON_ANGGOTA">NON ANGGOTA (Wilayah)</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Nama Kelompok / Wilayah</label>
                  <input type="text" class="form-control" name="nama_sumber" required placeholder="misal: Cembor / Mojosari">
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Jumlah (KG)</label>
                  <input type="number" step="0.1" class="form-control" id="rec_kg" name="jumlah_kg" required placeholder="0.0" oninput="KoperasiModule.hitungRec()">
                </div>
                <div class="col-md-3" id="groupHargaRec" style="display:none;">
                  <label class="form-label small fw-bold">Harga per KG (Rp)</label>
                  <input type="number" class="form-control" id="rec_harga" name="harga_per_kg" placeholder="7500" oninput="KoperasiModule.hitungRec()">
                </div>
                <div class="col-md-3 d-flex align-items-end">
                  <button type="submit" class="btn btn-success w-100 fw-bold"><i class="bi bi-save me-1"></i>Simpan Penerimaan</button>
                </div>
              </div>

              <!-- HASIL HITUNG OTOMATIS PENERIMAAN -->
              <div class="mt-4 p-3 rounded-3 border" style="background: linear-gradient(135deg, #e8fdf0 0%, #f0fff8 100%);">
                <div class="d-flex align-items-center gap-2 mb-3">
                  <i class="bi bi-calculator-fill text-success fs-5"></i>
                  <span class="fw-bold text-dark">Hasil Operasi Hitung Otomatis — Penerimaan</span>
                  <span class="badge bg-success-subtle text-success border border-success-subtle small ms-1">Real-time</span>
                </div>
                <div class="row g-3">
                  <div class="col-md-4">
                    <div class="p-3 bg-white rounded-3 border shadow-sm text-center">
                      <div class="text-muted small fw-bold mb-1"><i class="bi bi-box-arrow-in-down me-1"></i>VOLUME KG</div>
                      <div class="fs-4 fw-bold text-success" id="rec_res_kg">— KG</div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="p-3 bg-white rounded-3 border shadow-sm text-center">
                      <div class="text-muted small fw-bold mb-1"><i class="bi bi-tag me-1"></i>HARGA / KG</div>
                      <div class="fs-4 fw-bold text-dark" id="rec_res_harga">Rp —</div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="p-3 bg-success text-white rounded-3 shadow-sm text-center">
                      <div class="small fw-bold mb-1 opacity-75"><i class="bi bi-currency-exchange me-1"></i>TOTAL RUPIAH</div>
                      <div class="fs-4 fw-bold" id="rec_res_rp">Rp —</div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div class="card card-custom p-4 shadow-sm border-0">
            <h5 class="fw-bold mb-3"><i class="bi bi-list-check text-success me-2"></i>Daftar Transaksi Penerimaan (Database)</h5>
            <div class="table-responsive">
              <table class="table table-bordered table-hover align-middle">
                <thead class="table-success text-dark fw-bold">
                  <tr>
                    <th>ID Transaksi</th>
                    <th>Tanggal</th>
                    <th>Kategori</th>
                    <th>Nama Sumber</th>
                    <th>Jumlah (KG)</th>
                    <th>Harga / KG</th>
                    <th>Total (Rp)</th>
                    <th>Petugas</th>
                  </tr>
                </thead>
                <tbody>
                  ${allPenerimaan.length === 0 ? '<tr><td colspan="8" class="text-center text-muted py-4">Belum ada transaksi penerimaan baru di database.</td></tr>' : ''}
                  ${allPenerimaan.map(r => `
                    <tr>
                      <td class="fw-bold text-secondary">${r.transaction_id}</td>
                      <td>${r.tanggal}</td>
                      <td><span class="badge ${r.kategori_sumber === 'ANGGOTA' ? 'bg-success' : 'bg-info'}">${r.kategori_sumber}</span></td>
                      <td class="fw-semibold">${r.nama_sumber}</td>
                      <td class="fw-bold text-success">${Math.round(Number(r.jumlah_kg)).toLocaleString('id-ID')} KG</td>
                      <td>Rp ${Math.round(Number(r.harga_per_kg || 0)).toLocaleString('id-ID')}</td>
                      <td class="fw-bold">Rp ${Math.round(Number(r.total_rupiah || 0)).toLocaleString('id-ID')}</td>
                      <td class="small text-muted">${r.created_by || 'Admin'}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- TAB 3: II. PENGELUARAN SUSU INPUT -->
        <div class="tab-pane fade" id="out-pane">
          <div class="card card-custom p-4 mb-4 shadow-sm border-0">
            <h5 class="fw-bold mb-3"><i class="bi bi-dash-circle-fill text-primary me-2"></i>Input Transaksi Pengeluaran / Penjualan Susu</h5>
            <form id="formKopOut" onsubmit="KoperasiModule.handleSaveOut(event)">
              <div class="row g-3">
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Tanggal</label>
                  <input type="date" class="form-control" name="tanggal" required value="${new Date().toISOString().substring(0,10)}">
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Kategori Tujuan</label>
                  <select class="form-select" name="kategori_tujuan" id="outKategori" onchange="KoperasiModule.toggleOutKategori()" required>
                    <option value="PENJUALAN">PENJUALAN (Komersial)</option>
                    <option value="LAIN_LAIN">LAIN-LAIN (Non-Komersial)</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Nama Tujuan / Jenis</label>
                  <input type="text" class="form-control" name="nama_tujuan" required placeholder="misal: Nestle / Pecah Rusak">
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Jumlah (KG)</label>
                  <input type="number" step="0.1" class="form-control" id="out_kg" name="jumlah_kg" required placeholder="0.0" oninput="KoperasiModule.hitungOut()">
                </div>
                <div class="col-md-3" id="groupHargaOut">
                  <label class="form-label small fw-bold">Harga per KG (Rp)</label>
                  <input type="number" class="form-control" id="out_harga" name="harga_per_kg" placeholder="7200" oninput="KoperasiModule.hitungOut()">
                </div>
                <div class="col-md-3 d-flex align-items-end">
                  <button type="submit" class="btn btn-primary w-100 fw-bold"><i class="bi bi-save me-1"></i>Simpan Pengeluaran</button>
                </div>
              </div>

              <!-- HASIL HITUNG OTOMATIS PENGELUARAN -->
              <div class="mt-4 p-3 rounded-3 border" style="background: linear-gradient(135deg, #eaf2ff 0%, #f0f5ff 100%);">
                <div class="d-flex align-items-center gap-2 mb-3">
                  <i class="bi bi-calculator-fill text-primary fs-5"></i>
                  <span class="fw-bold text-dark">Hasil Operasi Hitung Otomatis — Pengeluaran</span>
                  <span class="badge bg-primary-subtle text-primary border border-primary-subtle small ms-1">Real-time</span>
                </div>
                <div class="row g-3">
                  <div class="col-md-4">
                    <div class="p-3 bg-white rounded-3 border shadow-sm text-center">
                      <div class="text-muted small fw-bold mb-1"><i class="bi bi-box-arrow-up-right me-1"></i>VOLUME KG</div>
                      <div class="fs-4 fw-bold text-primary" id="out_res_kg">— KG</div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="p-3 bg-white rounded-3 border shadow-sm text-center">
                      <div class="text-muted small fw-bold mb-1"><i class="bi bi-tag me-1"></i>HARGA / KG</div>
                      <div class="fs-4 fw-bold text-dark" id="out_res_harga">Rp —</div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="p-3 bg-primary text-white rounded-3 shadow-sm text-center">
                      <div class="small fw-bold mb-1 opacity-75"><i class="bi bi-currency-exchange me-1"></i>TOTAL RUPIAH</div>
                      <div class="fs-4 fw-bold" id="out_res_rp">Rp —</div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div class="card card-custom p-4 shadow-sm border-0">
            <h5 class="fw-bold mb-3"><i class="bi bi-list-check text-primary me-2"></i>Daftar Transaksi Pengeluaran (Database)</h5>
            <div class="table-responsive">
              <table class="table table-bordered table-hover align-middle">
                <thead class="table-primary text-dark fw-bold">
                  <tr>
                    <th>ID Transaksi</th>
                    <th>Tanggal</th>
                    <th>Kategori</th>
                    <th>Tujuan</th>
                    <th>Jumlah (KG)</th>
                    <th>Harga / KG</th>
                    <th>Total (Rp)</th>
                    <th>Petugas</th>
                  </tr>
                </thead>
                <tbody>
                  ${allPengeluaran.length === 0 ? '<tr><td colspan="8" class="text-center text-muted py-4">Belum ada transaksi pengeluaran baru di database.</td></tr>' : ''}
                  ${allPengeluaran.map(r => `
                    <tr>
                      <td class="fw-bold text-secondary">${r.transaction_id}</td>
                      <td>${r.tanggal}</td>
                      <td><span class="badge ${r.kategori_tujuan === 'PENJUALAN' ? 'bg-primary' : 'bg-warning text-dark'}">${r.kategori_tujuan}</span></td>
                      <td class="fw-semibold">${r.nama_tujuan}</td>
                      <td class="fw-bold text-primary">${Math.round(Number(r.jumlah_kg)).toLocaleString('id-ID')} KG</td>
                      <td>Rp ${Math.round(Number(r.harga_per_kg || 0)).toLocaleString('id-ID')}</td>
                      <td class="fw-bold">Rp ${Math.round(Number(r.total_rupiah || 0)).toLocaleString('id-ID')}</td>
                      <td class="small text-muted">${r.created_by || 'Admin'}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- TAB 4: III. REKAP PEMBELIAN & PENJUALAN & STOK OPNAME -->
        <div class="tab-pane fade" id="recap-pane">
          <div class="card card-custom p-4 mb-4 shadow-sm border-0">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="fw-bold mb-0 text-dark"><i class="bi bi-file-earmark-spreadsheet text-warning me-2"></i>LAPORAN PEMBELIAN DAN PENJUALAN SUSU (REKAP KOPERASI)</h5>
              <span class="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle">Rekap Pembelian & Penjualan</span>
            </div>
            
            <div class="table-responsive mb-4">
              <table class="table table-bordered align-middle mb-0" style="font-size: 0.85rem;">
                <thead class="table-warning text-dark fw-bold text-center align-middle">
                  <tr>
                    <th colspan="3">PENERIMAAN</th>
                    <th colspan="4">PENGELUARAN</th>
                  </tr>
                  <tr>
                    <th>DARI</th>
                    <th style="width: 110px;">KG</th>
                    <th style="width: 140px;">RP</th>
                    <th style="width: 40px;">NO</th>
                    <th>UNTUK PENJUALAN PADA</th>
                    <th style="width: 110px;">LITER</th>
                    <th style="width: 140px;">RP</th>
                  </tr>
                </thead>
                         ${(() => {
                    const rk = mData.rekap_sheet3 || {};
                    const penList = rk.penerimaan || [
                      { dari: "ANGGOTA DANA MULYA", kg: totAnggotaKg, rp: 0 },
                      ...mData.penerimaan_non_anggota.map(na => ({ dari: na.wilayah, kg: na.kg, rp: 0 }))
                    ];
                    const pengList = [
                      ...(rk.penjualan || mData.pengeluaran_perusahaan.map((p, i) => ({ no: i + 1, untuk: p.nama, liter: Math.round(p.kg / 1.025), rp: 0 }))),
                      { isHeader: true, title: "LAIN-LAIN" },
                      ...(rk.lain_lain || mData.pengeluaran_lain_lain.map((l, i) => ({ no: i + 1, untuk: l.karena, liter: Math.round(l.kg / 1.025), rp: 0 })))
                    ];
                    const maxR = Math.max(penList.length, pengList.length);
                    let h = '';
                    for (let i = 0; i < maxR; i++) {
                      const p1 = penList[i] || {};
                      const p2 = pengList[i] || {};
                      h += `
                        <tr>
                          <td class="fw-semibold text-dark">${p1.dari || ''}</td>
                          <td class="text-end fw-bold text-success">${p1.kg ? Math.round(Number(p1.kg)).toLocaleString('id-ID') : ''}</td>
                          <td class="text-end">${p1.rp ? 'Rp ' + Math.round(Number(p1.rp)).toLocaleString('id-ID') : ''}</td>
                          ${p2.isHeader ? `<td colspan="4" class="table-secondary fw-bold text-center">LAIN-LAIN</td>` : `
                            <td class="text-center fw-bold">${p2.no || ''}</td>
                            <td class="fw-semibold text-dark">${p2.untuk || ''}</td>
                            <td class="text-end fw-bold text-primary">${p2.liter ? Math.round(Number(p2.liter)).toLocaleString('id-ID') : ''}</td>
                            <td class="text-end">${p2.rp ? 'Rp ' + Math.round(Number(p2.rp)).toLocaleString('id-ID') : ''}</td>
                          `}
                        </tr>
                      `;
                    }
                    return h;
                  })()}
                </tbody>
                <tfoot class="table-light fw-bold">
                  <tr>
                    <td class="text-center text-dark">JUMLAH KG</td>
                    <td class="text-end text-success fs-6">${Math.round(mData.rekap_sheet3?.tot_pen_kg || totalPenerimaanKg).toLocaleString('id-ID')}</td>
                    <td class="text-end"></td>
                    <td colspan="2" class="text-center text-dark">TOTAL PENGELUARAN LITER</td>
                    <td class="text-end text-primary fs-6" colspan="2">${Math.round(mData.rekap_sheet3?.tot_out_ltr || (totalPengeluaranKg / 1.025)).toLocaleString('id-ID')} Ltr</td>
                  </tr>
                </tfoot>          </tfoot>
              </table>
            </div>

            <!-- CARD REKAPITULASI STOK SUSU KOPERASI -->
            <div class="p-4 rounded-3 border bg-light">
              <h6 class="fw-bold text-dark mb-3"><i class="bi bi-box-seam me-2 text-success"></i>KETERANGAN & STOK REKAP KOPERASI</h6>
              <div class="row g-3 text-center">
                <div class="col-md-2">
                  <div class="p-3 bg-white rounded border">
                    <span class="d-block text-muted small fw-bold">STOK SUSU TGL LALU</span>
                    <span class="fs-5 fw-bold text-dark">${Math.round(stokRekap.stok_awal || 0).toLocaleString('id-ID')} Ltr</span>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="p-3 bg-white rounded border">
                    <span class="d-block text-muted small fw-bold">PENERIMAAN BULAN INI</span>
                    <span class="fs-5 fw-bold text-success">${Math.round(stokRekap.penerimaan || 0).toLocaleString('id-ID')} Ltr</span>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="p-3 bg-white rounded border">
                    <span class="d-block text-muted small fw-bold">PERSEDIAAN</span>
                    <span class="fs-5 fw-bold text-primary">${Math.round(stokRekap.persediaan || 0).toLocaleString('id-ID')} Ltr</span>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="p-3 bg-white rounded border">
                    <span class="d-block text-muted small fw-bold">PENGELUARAN</span>
                    <span class="fs-5 fw-bold text-danger">${Math.round(stokRekap.pengeluaran || 0).toLocaleString('id-ID')} Ltr</span>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="p-3 bg-success text-white rounded shadow-sm">
                    <span class="d-block small fw-bold">STOK SUSU AKHIR</span>
                    <span class="fs-5 fw-bold">${Math.round(stokRekap.stok_akhir || 0).toLocaleString('id-ID')} Ltr</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    `;
  },

  selectYear: function(year) {
    this.selectedYear = year;
    App.render();
  },

  selectMonth: function(month) {
    this.selectedMonth = month;
    App.render();
  },

  toggleRecKategori: function() {
    const val = document.getElementById("recKategori").value;
    document.getElementById("groupHargaRec").style.display = val === "NON_ANGGOTA" ? "block" : "none";
  },

  toggleOutKategori: function() {
    const val = document.getElementById("outKategori").value;
    document.getElementById("groupHargaOut").style.display = val === "PENJUALAN" ? "block" : "none";
  },

  hitungRec: function() {
    const kg = parseFloat(document.getElementById('rec_kg')?.value) || 0;
    const harga = parseFloat(document.getElementById('rec_harga')?.value) || 0;
    const totalRp = kg * harga;

    const elKg = document.getElementById('rec_res_kg');
    const elHarga = document.getElementById('rec_res_harga');
    const elRp = document.getElementById('rec_res_rp');

    if (elKg) elKg.textContent = kg > 0 ? Math.round(kg).toLocaleString('id-ID') + ' KG' : '— KG';
    if (elHarga) elHarga.textContent = harga > 0 ? 'Rp ' + Math.round(harga).toLocaleString('id-ID') : 'Rp —';
    if (elRp) elRp.textContent = kg > 0 && harga > 0 ? 'Rp ' + Math.round(totalRp).toLocaleString('id-ID') : 'Rp —';
  },

  hitungOut: function() {
    const kg = parseFloat(document.getElementById('out_kg')?.value) || 0;
    const harga = parseFloat(document.getElementById('out_harga')?.value) || 0;
    const totalRp = kg * harga;

    const elKg = document.getElementById('out_res_kg');
    const elHarga = document.getElementById('out_res_harga');
    const elRp = document.getElementById('out_res_rp');

    if (elKg) elKg.textContent = kg > 0 ? Math.round(kg).toLocaleString('id-ID') + ' KG' : '— KG';
    if (elHarga) elHarga.textContent = harga > 0 ? 'Rp ' + Math.round(harga).toLocaleString('id-ID') : 'Rp —';
    if (elRp) elRp.textContent = kg > 0 && harga > 0 ? 'Rp ' + Math.round(totalRp).toLocaleString('id-ID') : 'Rp —';
  },

  handleSaveRec: async function(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Menyimpan...`;

    const data = {
      tanggal: form.tanggal.value,
      kategori_sumber: form.kategori_sumber.value,
      nama_sumber: form.nama_sumber.value,
      jumlah_kg: form.jumlah_kg.value,
      harga_per_kg: form.harga_per_kg ? form.harga_per_kg.value : 0,
      keterangan: form.keterangan ? form.keterangan.value : ""
    };

    const res = await ApiClient.post("createKoperasiPenerimaan", data);
    btn.disabled = false;
    btn.innerHTML = `<i class="bi bi-save me-1"></i>Simpan Penerimaan`;

    if (res.success) {
      showToast("Transaksi Penerimaan berhasil disimpan!", "success");
      form.reset();
      this.hitungRec();
      App.render();
    } else {
      alert("Gagal: " + res.message);
    }
  },

  handleSaveOut: async function(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Menyimpan...`;

    const data = {
      tanggal: form.tanggal.value,
      kategori_tujuan: form.kategori_tujuan.value,
      nama_tujuan: form.nama_tujuan.value,
      jumlah_kg: form.jumlah_kg.value,
      harga_per_kg: form.harga_per_kg ? form.harga_per_kg.value : 0,
      keterangan: form.keterangan ? form.keterangan.value : ""
    };

    const res = await ApiClient.post("createKoperasiPengeluaran", data);
    btn.disabled = false;
    btn.innerHTML = `<i class="bi bi-save me-1"></i>Simpan Pengeluaran`;

    if (res.success) {
      showToast("Transaksi Pengeluaran berhasil disimpan!", "success");
      form.reset();
      this.hitungOut();
      App.render();
    } else {
      alert("Gagal: " + res.message);
    }
  },

  exportExcel: async function() {
    const mData = this.getMonthData();
    const wb = XLSX.utils.book_new();

    // Sheet 1: Penerimaan
    const recWSData = [
      ["NO", "DARI ANGGOTA (KELOMPOK)", "KG", "RP", "DARI NON ANGGOTA (WILAYAH)", "KG", "RP"],
      ...(() => {
        const maxR = Math.max(mData.penerimaan_anggota.length, mData.penerimaan_non_anggota.length);
        const rows = [];
        for (let i = 0; i < maxR; i++) {
          const a = mData.penerimaan_anggota[i] || {};
          const na = mData.penerimaan_non_anggota[i] || {};
          rows.push([i + 1, a.kelompok || "", a.kg || "", a.rp || "", na.wilayah || "", na.kg || "", na.rp || ""]);
        }
        return rows;
      })()
    ];
    const wsRec = XLSX.utils.aoa_to_sheet(recWSData);
    XLSX.utils.book_append_sheet(wb, wsRec, "Penerimaan Susu");

    // Sheet 2: Pengeluaran
    const allPenjualan = [
      ...mData.pengeluaran_perusahaan.map(p => ({ nama: p.nama, kg: p.kg, rp: p.rp })),
      ...mData.pengeluaran_perorangan.map(p => ({ nama: p.nama, kg: p.kg, rp: p.rp }))
    ];
    const outWSData = [
      ["NO", "UNTUK PENJUALAN", "KG", "RP", "UNTUK LAIN-LAIN (KARENA)", "KG"],
      ...(() => {
        const maxR = Math.max(allPenjualan.length, mData.pengeluaran_lain_lain.length);
        const rows = [];
        for (let i = 0; i < maxR; i++) {
          const p = allPenjualan[i] || {};
          const l = mData.pengeluaran_lain_lain[i] || {};
          rows.push([i + 1, p.nama || "", p.kg || "", p.rp || "", l.karena || "", l.kg || ""]);
        }
        return rows;
      })()
    ];
    const wsOut = XLSX.utils.aoa_to_sheet(outWSData);
    XLSX.utils.book_append_sheet(wb, wsOut, "Pengeluaran Susu");

    XLSX.writeFile(wb, `LAPORAN_KOPERASI_DANAMULYA_${this.selectedMonth}_${this.selectedYear}.xlsx`);
    showToast("File Excel Koperasi (.xlsx) berhasil di-download!", "success");
  }
};
