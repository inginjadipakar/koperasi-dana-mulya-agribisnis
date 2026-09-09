/**
 * ============================================================
 * LOGISTIK.JS — MODUL VISUAL & INTERAKTIF DIVISI LOGISTIK
 * PRESISE 100% TERDIRI DARI 4 SEKSI EXCEL LENGKAP & BERURUTAN:
 * I. PERALATAN DAN PERLENGKAPAN TERNAK
 * II. PENJUALAN MAKANAN TERNAK (3 FORM INPUT PER KOTAK: KG, HARGA, RP)
 * III. PEMBELIAN MAKANAN TERNAK
 * IV. STOK MAKANAN TERNAK (DATA PRESISE DARI SHEET EXCEL)
 * ============================================================
 */

const LogistikModule = {
  selectedYear: (new Date().getFullYear()).toString(),
  // FIX LOG-B12: Inisialisasi dinamis dari bulan kalender saat ini agar tampilan dan filter
  // tidak terkunci di JUNI sehingga transaksi yang baru disimpan langsung terlihat.
  selectedMonth: (["JAN","FEB","MAR","APRIL","MEI","JUNI","JULI","AGU","SEP","OKT","NOV","DES"])[new Date().getMonth()] || "JAN",
  
  getLocalDateStr: function(d) {
    const dateObj = d || new Date();
    const yr = dateObj.getFullYear();
    const mo = String(dateObj.getMonth() + 1).padStart(2, '0');
    const da = String(dateObj.getDate()).padStart(2, '0');
    return `${yr}-${mo}-${da}`;
  },

  cleanFeed: function(s) {
    return (s || '').toLowerCase()
      .replace(/mf\./g, 'mix feed')
      .replace(/\bmf\b/g, 'mix feed')
      .replace(/[^a-z0-9]/g, '');
  },

  // FIX LOG-B64: Sanitasi numerik aman (toleran koma desimal Indonesia '10,5' dan pemisah ribuan)
  parseNum: function(val) {
    if (val === undefined || val === null || val === "") return 0;
    if (typeof val === "number") return isNaN(val) ? 0 : val;
    let s = String(val).trim();
    if (!s) return 0;
    if (s.includes(".") && s.includes(",")) {
      s = s.replace(/\./g, "").replace(/,/g, ".");
    } else if (s.includes(",")) {
      s = s.replace(/,/g, ".");
    }
    const n = parseFloat(s);
    return isNaN(n) ? 0 : n;
  },

  isExactFeedMatch: function(a, b) {
    if (!a || !b) return false;
    return this.cleanFeed(a) === this.cleanFeed(b);
  },

  isSec4FeedMatch: function(sec4Nama, targetNama) {
    if (!sec4Nama || !targetNama) return false;
    const c4 = this.cleanFeed(sec4Nama);
    const ct = this.cleanFeed(targetNama);
    if (c4 === ct) return true;
    // FIX LOG-B39: Komutatif — satu sisi adalah token kanonik, sisi lain mengandung token tersebut
    if (c4 === 'mixfeeda18' && ct.includes('mixfeeda18')) return true;
    if (ct === 'mixfeeda18' && c4.includes('mixfeeda18')) return true;
    if (c4 === 'mixfeeda20' && ct.includes('mixfeeda20')) return true;
    if (ct === 'mixfeeda20' && c4.includes('mixfeeda20')) return true;
    return false;
  },

  getAvailableYears: function() {
    const current = (new Date().getFullYear()).toString();
    const set = new Set(["2026", current]);
    try {
      const txs = this.getTransactions();
      txs.forEach(t => {
        const yr = (t.timestamp || '').slice(0, 4);
        if (yr && yr.length === 4 && !isNaN(parseInt(yr, 10))) {
          set.add(yr);
        }
      });
    } catch (e) {}
    return Array.from(set).sort();
  },

  defaultFullData: {
  "JAN": {
    "sec1": [
      {
            "no": 1,
            "nama": "MILK CAN",
            "stok_awal_unit": 6.0,
            "stok_awal_harga": 650000.0,
            "stok_awal_rp": 3900000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 6.0,
            "stok_akhir_rp": 3900000.0
      },
      {
            "no": 2,
            "nama": "SARINGAN MILK CAN",
            "stok_awal_unit": 24.0,
            "stok_awal_harga": 130000.0,
            "stok_awal_rp": 3120000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 24.0,
            "stok_akhir_rp": 3120000.0
      },
      {
            "no": 3,
            "nama": "TIMBA PERAH",
            "stok_awal_unit": 32.0,
            "stok_awal_harga": 125000.0,
            "stok_awal_rp": 4000000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 32.0,
            "stok_akhir_rp": 4000000.0
      },
      {
            "no": 4,
            "nama": "BRANGUS SAPI",
            "stok_awal_unit": 85.0,
            "stok_awal_harga": 15000.0,
            "stok_awal_rp": 1275000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 85.0,
            "stok_akhir_rp": 1275000.0
      },
      {
            "no": 5,
            "nama": "ALAT CELUP",
            "stok_awal_unit": 175.0,
            "stok_awal_harga": 50000.0,
            "stok_awal_rp": 8750000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 175.0,
            "stok_akhir_rp": 8750000.0
      }
],
    "sec2": [
      {
        "no": 1,
        "nama": "MF. A18 AGGT SUB",
        "tunai_kg": 0,
        "tunai_harga": 0,
        "tunai_rp": 0,
        "pot_kg": 4150,
        "pot_harga": 3900,
        "pot_rp": 16185000,
        "piu_kg": 2250,
        "piu_harga": 3900,
        "piu_rp": 8775000,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 6400,
        "total_rp": 24960000
      },
      {
        "no": 2,
        "nama": "MAGNESIUM",
        "tunai_kg": 7,
        "tunai_harga": 30000,
        "tunai_rp": 210000,
        "pot_kg": 8,
        "pot_harga": 30000,
        "pot_rp": 240000,
        "piu_kg": 0,
        "piu_harga": 0,
        "piu_rp": 0,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 15,
        "total_rp": 450000
      },
      {
        "no": 3,
        "nama": "DCP",
        "tunai_kg": 15,
        "tunai_harga": 25000,
        "tunai_rp": 375000,
        "pot_kg": 0,
        "pot_harga": 25000,
        "pot_rp": 0,
        "piu_kg": 0,
        "piu_harga": 0,
        "piu_rp": 0,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 15,
        "total_rp": 375000
      },
      {
        "no": 4,
        "nama": "MF A20 SUB",
        "tunai_kg": 23500,
        "tunai_harga": 4000,
        "tunai_rp": 94000000,
        "pot_kg": 20850,
        "pot_harga": 4000,
        "pot_rp": 83400000,
        "piu_kg": 11150,
        "piu_harga": 4000,
        "piu_rp": 44600000,
        "bunt_kg": 500,
        "bunt_harga": 4000,
        "bunt_rp": 2000000,
        "total_kg": 56000,
        "total_rp": 224000000
      },
      {
        "no": 5,
        "nama": "MF A20 NON SUB",
        "tunai_kg": 2150,
        "tunai_harga": 4200,
        "tunai_rp": 9030000,
        "pot_kg": 0,
        "pot_harga": 0,
        "pot_rp": 0,
        "piu_kg": 0,
        "piu_harga": 0,
        "piu_rp": 0,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 2150,
        "total_rp": 9030000
      },
      {
        "no": 6,
        "nama": "MF A20 NON ANGG",
        "tunai_kg": 950,
        "tunai_harga": 4400,
        "tunai_rp": 4180000,
        "pot_kg": 0,
        "pot_harga": 0,
        "pot_rp": 0,
        "piu_kg": 0,
        "piu_harga": 0,
        "piu_rp": 0,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 950,
        "total_rp": 4180000
      }
    ],
    "sec3": [
      {
        "no": 1,
        "nama": "MF. A18 AGGT SUB",
        "kg": 0,
        "harga": 0,
        "rp": 0
      },
      {
        "no": 2,
        "nama": "MAGNESIUM",
        "kg": 56,
        "harga": 25000,
        "rp": 1400000
      },
      {
        "no": 3,
        "nama": "DCP",
        "kg": 300,
        "harga": 22000,
        "rp": 6600000
      },
      {
        "no": 4,
        "nama": "MIX FEED A20 TUNAI",
        "kg": 32000,
        "harga": 4200,
        "rp": 134400000
      },
      {
        "no": 5,
        "nama": "MIX FEED A20 NESTLE",
        "kg": 40000,
        "harga": 3960,
        "rp": 158400000
      }
    ],
    "sec4": [
      {
        "no": 1,
        "nama": "MIX FEED A18",
        "stok_awal": 7850,
        "pembelian": 0,
        "siap_jual": 7850,
        "penjualan": 6400,
        "susut": 100,
        "stok_akhir": 1350,
        "harga": 3900,
        "jumlah_rp": 5265000
      },
      {
        "no": 2,
        "nama": "MAGNESIUM",
        "stok_awal": 0,
        "pembelian": 56,
        "siap_jual": 56,
        "penjualan": 15,
        "susut": 0,
        "stok_akhir": 41,
        "harga": 30000,
        "jumlah_rp": 1230000
      },
      {
        "no": 3,
        "nama": "DCP",
        "stok_awal": 18,
        "pembelian": 300,
        "siap_jual": 318,
        "penjualan": 15,
        "susut": 0,
        "stok_akhir": 303,
        "harga": 25000,
        "jumlah_rp": 7575000
      },
      {
        "no": 4,
        "nama": "MIX FEED A20",
        "stok_awal": 36500,
        "pembelian": 72000,
        "siap_jual": 108500,
        "penjualan": 59100,
        "susut": 350,
        "stok_akhir": 49050,
        "harga": 4000,
        "jumlah_rp": 196200000
      }
    ]
  },
  "FEB": {
    "sec1": [
      {
            "no": 1,
            "nama": "MILK CAN",
            "stok_awal_unit": 6.0,
            "stok_awal_harga": 650000.0,
            "stok_awal_rp": 3900000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 6.0,
            "stok_akhir_rp": 3900000.0
      },
      {
            "no": 2,
            "nama": "SARINGAN MILK CAN",
            "stok_awal_unit": 24.0,
            "stok_awal_harga": 130000.0,
            "stok_awal_rp": 3120000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 24.0,
            "stok_akhir_rp": 3120000.0
      },
      {
            "no": 3,
            "nama": "TIMBA PERAH",
            "stok_awal_unit": 32.0,
            "stok_awal_harga": 125000.0,
            "stok_awal_rp": 4000000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 32.0,
            "stok_akhir_rp": 4000000.0
      },
      {
            "no": 4,
            "nama": "BRANGUS SAPI",
            "stok_awal_unit": 85.0,
            "stok_awal_harga": 15000.0,
            "stok_awal_rp": 1275000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 85.0,
            "stok_akhir_rp": 1275000.0
      },
      {
            "no": 5,
            "nama": "ALAT CELUP",
            "stok_awal_unit": 175.0,
            "stok_awal_harga": 50000.0,
            "stok_awal_rp": 8750000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 175.0,
            "stok_akhir_rp": 8750000.0
      }
],
    "sec2": [
      {
        "no": 1,
        "nama": "MF. A18 AGGT SUB",
        "tunai_kg": 0,
        "tunai_harga": 0,
        "tunai_rp": 0,
        "pot_kg": 1350,
        "pot_harga": 3900,
        "pot_rp": 5265000,
        "piu_kg": 0,
        "piu_harga": 3900,
        "piu_rp": 0,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 1350,
        "total_rp": 5265000
      },
      {
        "no": 2,
        "nama": "MAGNESIUM",
        "tunai_kg": 6,
        "tunai_harga": 30000,
        "tunai_rp": 180000,
        "pot_kg": 0,
        "pot_harga": 30000,
        "pot_rp": 0,
        "piu_kg": 0,
        "piu_harga": 0,
        "piu_rp": 0,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 6,
        "total_rp": 180000
      },
      {
        "no": 3,
        "nama": "DCP",
        "tunai_kg": 60,
        "tunai_harga": 25000,
        "tunai_rp": 1500000,
        "pot_kg": 6,
        "pot_harga": 25000,
        "pot_rp": 150000,
        "piu_kg": 6,
        "piu_harga": 0,
        "piu_rp": 0,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 72,
        "total_rp": 1650000
      },
      {
        "no": 4,
        "nama": "MF A20 SUB",
        "tunai_kg": 17400,
        "tunai_harga": 4100,
        "tunai_rp": 71340000,
        "pot_kg": 25450,
        "pot_harga": 4100,
        "pot_rp": 104345000,
        "piu_kg": 13600,
        "piu_harga": 4100,
        "piu_rp": 55760000,
        "bunt_kg": 400,
        "bunt_harga": 4100,
        "bunt_rp": 1640000,
        "total_kg": 56850,
        "total_rp": 233085000
      },
      {
        "no": 5,
        "nama": "MF A20 NON SUB",
        "tunai_kg": 2050,
        "tunai_harga": 4200,
        "tunai_rp": 8610000,
        "pot_kg": 0,
        "pot_harga": 0,
        "pot_rp": 0,
        "piu_kg": 0,
        "piu_harga": 0,
        "piu_rp": 0,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 2050,
        "total_rp": 8610000
      },
      {
        "no": 6,
        "nama": "MF A20 NON ANGG",
        "tunai_kg": 900,
        "tunai_harga": 4400,
        "tunai_rp": 3960000,
        "pot_kg": 0,
        "pot_harga": 0,
        "pot_rp": 0,
        "piu_kg": 0,
        "piu_harga": 0,
        "piu_rp": 0,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 900,
        "total_rp": 3960000
      }
    ],
    "sec3": [
      {
        "no": 1,
        "nama": "MF. A18 AGGT SUB",
        "kg": 0,
        "harga": 0,
        "rp": 0
      },
      {
        "no": 2,
        "nama": "MAGNESIUM",
        "kg": 0,
        "harga": 25000,
        "rp": 0
      },
      {
        "no": 3,
        "nama": "DCP",
        "kg": 0,
        "harga": 22000,
        "rp": 0
      },
      {
        "no": 4,
        "nama": "MIX FEED A20 TUNAI",
        "kg": 16000,
        "harga": 4350,
        "rp": 69600000
      },
      {
        "no": 5,
        "nama": "MIX FEED A20 NESTLE",
        "kg": 48000,
        "harga": 4045,
        "rp": 194160000
      }
    ],
    "sec4": [
      {
        "no": 1,
        "nama": "MIX FEED A18",
        "stok_awal": 1350,
        "pembelian": 0,
        "siap_jual": 1350,
        "penjualan": 1350,
        "susut": 0,
        "stok_akhir": 0,
        "harga": 3900,
        "jumlah_rp": 0
      },
      {
        "no": 2,
        "nama": "MAGNESIUM",
        "stok_awal": 41,
        "pembelian": 0,
        "siap_jual": 41,
        "penjualan": 6,
        "susut": 0,
        "stok_akhir": 35,
        "harga": 30000,
        "jumlah_rp": 1050000
      },
      {
        "no": 3,
        "nama": "DCP",
        "stok_awal": 303,
        "pembelian": 0,
        "siap_jual": 303,
        "penjualan": 72,
        "susut": 0,
        "stok_akhir": 231,
        "harga": 25000,
        "jumlah_rp": 5775000
      },
      {
        "no": 4,
        "nama": "MIX FEED A20",
        "stok_awal": 49050,
        "pembelian": 64000,
        "siap_jual": 113050,
        "penjualan": 59800,
        "susut": 100,
        "stok_akhir": 53150,
        "harga": 4000,
        "jumlah_rp": 212600000
      }
    ]
  },
  "MAR": {
    "sec1": [
      {
            "no": 1,
            "nama": "MILK CAN",
            "stok_awal_unit": 6.0,
            "stok_awal_harga": 650000.0,
            "stok_awal_rp": 3900000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 6.0,
            "stok_akhir_rp": 3900000.0
      },
      {
            "no": 2,
            "nama": "SARINGAN MILK CAN",
            "stok_awal_unit": 24.0,
            "stok_awal_harga": 130000.0,
            "stok_awal_rp": 3120000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 24.0,
            "stok_akhir_rp": 3120000.0
      },
      {
            "no": 3,
            "nama": "TIMBA PERAH",
            "stok_awal_unit": 32.0,
            "stok_awal_harga": 125000.0,
            "stok_awal_rp": 4000000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 32.0,
            "stok_akhir_rp": 4000000.0
      },
      {
            "no": 4,
            "nama": "BRANGUS SAPI",
            "stok_awal_unit": 85.0,
            "stok_awal_harga": 15000.0,
            "stok_awal_rp": 1275000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 85.0,
            "stok_akhir_rp": 1275000.0
      },
      {
            "no": 5,
            "nama": "ALAT CELUP",
            "stok_awal_unit": 175.0,
            "stok_awal_harga": 50000.0,
            "stok_awal_rp": 8750000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 175.0,
            "stok_akhir_rp": 8750000.0
      }
],
    "sec2": [
      {
        "no": 1,
        "nama": "MF. A18 AGGT SUB",
        "tunai_kg": 0,
        "tunai_harga": 0,
        "tunai_rp": 0,
        "pot_kg": 0,
        "pot_harga": 3900,
        "pot_rp": 0,
        "piu_kg": 0,
        "piu_harga": 3900,
        "piu_rp": 0,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 0,
        "total_rp": 0
      },
      {
        "no": 2,
        "nama": "MAGNESIUM",
        "tunai_kg": 13,
        "tunai_harga": 30000,
        "tunai_rp": 390000,
        "pot_kg": 0,
        "pot_harga": 30000,
        "pot_rp": 0,
        "piu_kg": 0,
        "piu_harga": 0,
        "piu_rp": 0,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 13,
        "total_rp": 390000
      },
      {
        "no": 3,
        "nama": "DCP",
        "tunai_kg": 22,
        "tunai_harga": 25000,
        "tunai_rp": 550000,
        "pot_kg": 0,
        "pot_harga": 25000,
        "pot_rp": 0,
        "piu_kg": 0,
        "piu_harga": 0,
        "piu_rp": 0,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 22,
        "total_rp": 550000
      },
      {
        "no": 4,
        "nama": "MF A20 SUB",
        "tunai_kg": 20700,
        "tunai_harga": 4100,
        "tunai_rp": 84870000,
        "pot_kg": 27700,
        "pot_harga": 4100,
        "pot_rp": 113570000,
        "piu_kg": 13800,
        "piu_harga": 4100,
        "piu_rp": 56580000,
        "bunt_kg": 600,
        "bunt_harga": 4100,
        "bunt_rp": 2460000,
        "total_kg": 62200,
        "total_rp": 255020000
      },
      {
        "no": 5,
        "nama": "MF A20 NON SUB",
        "tunai_kg": 1750,
        "tunai_harga": 4200,
        "tunai_rp": 7350000,
        "pot_kg": 0,
        "pot_harga": 0,
        "pot_rp": 0,
        "piu_kg": 0,
        "piu_harga": 0,
        "piu_rp": 0,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 1750,
        "total_rp": 7350000
      },
      {
        "no": 6,
        "nama": "MF A20 NON ANGG",
        "tunai_kg": 650,
        "tunai_harga": 4400,
        "tunai_rp": 2860000,
        "pot_kg": 0,
        "pot_harga": 0,
        "pot_rp": 0,
        "piu_kg": 0,
        "piu_harga": 0,
        "piu_rp": 0,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 650,
        "total_rp": 2860000
      }
    ],
    "sec3": [
      {
        "no": 1,
        "nama": "MF. A18 AGGT SUB",
        "kg": 0,
        "harga": 0,
        "rp": 0
      },
      {
        "no": 2,
        "nama": "MAGNESIUM",
        "kg": 0,
        "harga": 25000,
        "rp": 0
      },
      {
        "no": 3,
        "nama": "DCP",
        "kg": 0,
        "harga": 22000,
        "rp": 0
      },
      {
        "no": 4,
        "nama": "MIX FEED A20 TUNAI",
        "kg": 16000,
        "harga": 4350,
        "rp": 69600000
      },
      {
        "no": 5,
        "nama": "MIX FEED A20 NESTLE",
        "kg": 32000,
        "harga": 4190,
        "rp": 134080000
      }
    ],
    "sec4": [
      {
        "no": 1,
        "nama": "MIX FEED A18",
        "stok_awal": 0,
        "pembelian": 0,
        "siap_jual": 0,
        "penjualan": 0,
        "susut": 0,
        "stok_akhir": 0,
        "harga": 3900,
        "jumlah_rp": 0
      },
      {
        "no": 2,
        "nama": "MAGNESIUM",
        "stok_awal": 35,
        "pembelian": 0,
        "siap_jual": 35,
        "penjualan": 13,
        "susut": 0,
        "stok_akhir": 22,
        "harga": 30000,
        "jumlah_rp": 660000
      },
      {
        "no": 3,
        "nama": "DCP",
        "stok_awal": 231,
        "pembelian": 0,
        "siap_jual": 231,
        "penjualan": 22,
        "susut": 0,
        "stok_akhir": 209,
        "harga": 25000,
        "jumlah_rp": 5225000
      },
      {
        "no": 4,
        "nama": "MIX FEED A20",
        "stok_awal": 53150,
        "pembelian": 48000,
        "siap_jual": 101150,
        "penjualan": 64600,
        "susut": 100,
        "stok_akhir": 36450,
        "harga": 4000,
        "jumlah_rp": 145800000
      }
    ]
  },
  "APRIL": {
    "sec1": [
      {
            "no": 1,
            "nama": "MILK CAN",
            "stok_awal_unit": 6.0,
            "stok_awal_harga": 650000.0,
            "stok_awal_rp": 3900000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 6.0,
            "stok_akhir_rp": 3900000.0
      },
      {
            "no": 2,
            "nama": "SARINGAN MILK CAN",
            "stok_awal_unit": 24.0,
            "stok_awal_harga": 130000.0,
            "stok_awal_rp": 3120000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 24.0,
            "stok_akhir_rp": 3120000.0
      },
      {
            "no": 3,
            "nama": "TIMBA PERAH",
            "stok_awal_unit": 32.0,
            "stok_awal_harga": 125000.0,
            "stok_awal_rp": 4000000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 32.0,
            "stok_akhir_rp": 4000000.0
      },
      {
            "no": 4,
            "nama": "BRANGUS SAPI",
            "stok_awal_unit": 85.0,
            "stok_awal_harga": 15000.0,
            "stok_awal_rp": 1275000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 85.0,
            "stok_akhir_rp": 1275000.0
      },
      {
            "no": 5,
            "nama": "ALAT CELUP",
            "stok_awal_unit": 175.0,
            "stok_awal_harga": 50000.0,
            "stok_awal_rp": 8750000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 175.0,
            "stok_akhir_rp": 8750000.0
      }
],
    "sec2": [
      {
        "no": 1,
        "nama": "MF. A18 AGGT SUB",
        "tunai_kg": 0,
        "tunai_harga": 0,
        "tunai_rp": 0,
        "pot_kg": 0,
        "pot_harga": 3900,
        "pot_rp": 0,
        "piu_kg": 0,
        "piu_harga": 3900,
        "piu_rp": 0,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 0,
        "total_rp": 0
      },
      {
        "no": 2,
        "nama": "MAGNESIUM",
        "tunai_kg": 0,
        "tunai_harga": 30000,
        "tunai_rp": 0,
        "pot_kg": 0,
        "pot_harga": 30000,
        "pot_rp": 0,
        "piu_kg": 0,
        "piu_harga": 0,
        "piu_rp": 0,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 0,
        "total_rp": 0
      },
      {
        "no": 3,
        "nama": "DCP",
        "tunai_kg": 0,
        "tunai_harga": 25000,
        "tunai_rp": 0,
        "pot_kg": 6,
        "pot_harga": 25000,
        "pot_rp": 150000,
        "piu_kg": 0,
        "piu_harga": 0,
        "piu_rp": 0,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 6,
        "total_rp": 150000
      },
      {
        "no": 4,
        "nama": "MF A20 SUB",
        "tunai_kg": 21000,
        "tunai_harga": 4100,
        "tunai_rp": 86100000,
        "pot_kg": 27900,
        "pot_harga": 4100,
        "pot_rp": 114390000,
        "piu_kg": 13700,
        "piu_harga": 4100,
        "piu_rp": 56170000,
        "bunt_kg": 400,
        "bunt_harga": 4100,
        "bunt_rp": 1640000,
        "total_kg": 62600,
        "total_rp": 256660000
      },
      {
        "no": 5,
        "nama": "MF A20 NON SUB",
        "tunai_kg": 1800,
        "tunai_harga": 4200,
        "tunai_rp": 7560000,
        "pot_kg": 0,
        "pot_harga": 0,
        "pot_rp": 0,
        "piu_kg": 0,
        "piu_harga": 0,
        "piu_rp": 0,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 1800,
        "total_rp": 7560000
      },
      {
        "no": 6,
        "nama": "MF A20 NON ANGG",
        "tunai_kg": 700,
        "tunai_harga": 4400,
        "tunai_rp": 3080000,
        "pot_kg": 0,
        "pot_harga": 0,
        "pot_rp": 0,
        "piu_kg": 0,
        "piu_harga": 0,
        "piu_rp": 0,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 700,
        "total_rp": 3080000
      }
    ],
    "sec3": [
      {
        "no": 1,
        "nama": "MF. A18 AGGT SUB",
        "kg": 0,
        "harga": 0,
        "rp": 0
      },
      {
        "no": 2,
        "nama": "MAGNESIUM",
        "kg": 0,
        "harga": 25000,
        "rp": 0
      },
      {
        "no": 3,
        "nama": "DCP",
        "kg": 0,
        "harga": 22000,
        "rp": 0
      },
      {
        "no": 4,
        "nama": "MIX FEED A20 TUNAI",
        "kg": 24000,
        "harga": 4475,
        "rp": 107400000
      },
      {
        "no": 5,
        "nama": "MIX FEED A20 NESTLE",
        "kg": 40000,
        "harga": 4340,
        "rp": 173600000
      }
    ],
    "sec4": [
      {
        "no": 1,
        "nama": "MIX FEED A18",
        "stok_awal": 0,
        "pembelian": 0,
        "siap_jual": 0,
        "penjualan": 0,
        "susut": 0,
        "stok_akhir": 0,
        "harga": 3900,
        "jumlah_rp": 0
      },
      {
        "no": 2,
        "nama": "MAGNESIUM",
        "stok_awal": 22,
        "pembelian": 0,
        "siap_jual": 22,
        "penjualan": 0,
        "susut": 0,
        "stok_akhir": 22,
        "harga": 30000,
        "jumlah_rp": 660000
      },
      {
        "no": 3,
        "nama": "DCP",
        "stok_awal": 209,
        "pembelian": 0,
        "siap_jual": 209,
        "penjualan": 6,
        "susut": 0,
        "stok_akhir": 203,
        "harga": 25000,
        "jumlah_rp": 5075000
      },
      {
        "no": 4,
        "nama": "MIX FEED A20",
        "stok_awal": 36450,
        "pembelian": 64000,
        "siap_jual": 100450,
        "penjualan": 65100,
        "susut": 250,
        "stok_akhir": 35100,
        "harga": 4100,
        "jumlah_rp": 143910000
      }
    ]
  },
  "MEI": {
    "sec1": [
      {
            "no": 1,
            "nama": "MILK CAN",
            "stok_awal_unit": 6.0,
            "stok_awal_harga": 650000.0,
            "stok_awal_rp": 3900000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 1.0,
            "penjualan_harga": 650000.0,
            "penjualan_rp": 650000.0,
            "stok_akhir_unit": 5.0,
            "stok_akhir_rp": 3250000.0
      },
      {
            "no": 2,
            "nama": "SARINGAN MILK CAN",
            "stok_awal_unit": 24.0,
            "stok_awal_harga": 130000.0,
            "stok_awal_rp": 3120000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 24.0,
            "stok_akhir_rp": 3120000.0
      },
      {
            "no": 3,
            "nama": "TIMBA PERAH",
            "stok_awal_unit": 32.0,
            "stok_awal_harga": 125000.0,
            "stok_awal_rp": 4000000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 32.0,
            "stok_akhir_rp": 4000000.0
      },
      {
            "no": 4,
            "nama": "BRANGUS SAPI",
            "stok_awal_unit": 85.0,
            "stok_awal_harga": 15000.0,
            "stok_awal_rp": 1275000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 85.0,
            "stok_akhir_rp": 1275000.0
      },
      {
            "no": 5,
            "nama": "ALAT CELUP",
            "stok_awal_unit": 175.0,
            "stok_awal_harga": 50000.0,
            "stok_awal_rp": 8750000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 175.0,
            "stok_akhir_rp": 8750000.0
      }
],
    "sec2": [
      {
        "no": 1,
        "nama": "MF. A18 AGGT SUB",
        "tunai_kg": 0,
        "tunai_harga": 0,
        "tunai_rp": 0,
        "pot_kg": 0,
        "pot_harga": 0,
        "pot_rp": 0,
        "piu_kg": 0,
        "piu_harga": 0,
        "piu_rp": 0,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 0,
        "total_rp": 0
      },
      {
        "no": 2,
        "nama": "MAGNESIUM",
        "tunai_kg": 22,
        "tunai_harga": 35000,
        "tunai_rp": 770000,
        "pot_kg": 0,
        "pot_harga": 35000,
        "pot_rp": 0,
        "piu_kg": 0,
        "piu_harga": 0,
        "piu_rp": 0,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 22,
        "total_rp": 770000
      },
      {
        "no": 3,
        "nama": "DCP",
        "tunai_kg": 70,
        "tunai_harga": 25000,
        "tunai_rp": 1750000,
        "pot_kg": 0,
        "pot_harga": 25000,
        "pot_rp": 0,
        "piu_kg": 0,
        "piu_harga": 0,
        "piu_rp": 0,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 70,
        "total_rp": 1750000
      },
      {
        "no": 4,
        "nama": "MF A20 RATIO",
        "tunai_kg": 16000,
        "tunai_harga": 4200,
        "tunai_rp": 67200000,
        "pot_kg": 28850,
        "pot_harga": 4200,
        "pot_rp": 121170000,
        "piu_kg": 14800,
        "piu_harga": 4200,
        "piu_rp": 62160000,
        "bunt_kg": 600,
        "bunt_harga": 4200,
        "bunt_rp": 2520000,
        "total_kg": 59650,
        "total_rp": 250530000
      },
      {
        "no": 5,
        "nama": "MF A20 NON RATIO",
        "tunai_kg": 8800,
        "tunai_harga": 4500,
        "tunai_rp": 39600000,
        "pot_kg": 0,
        "pot_harga": 0,
        "pot_rp": 0,
        "piu_kg": 0,
        "piu_harga": 0,
        "piu_rp": 0,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 8800,
        "total_rp": 39600000
      }
    ],
    "sec3": [
      {
        "no": 1,
        "nama": "MF. A18 AGGT SUB",
        "kg": 0,
        "harga": 0,
        "rp": 0
      },
      {
        "no": 2,
        "nama": "MAGNESIUM",
        "kg": 75,
        "harga": 30000,
        "rp": 2250000
      },
      {
        "no": 3,
        "nama": "DCP",
        "kg": 0,
        "harga": 22000,
        "rp": 0
      },
      {
        "no": 4,
        "nama": "MIX FEED A20 TUNAI",
        "kg": 24000,
        "harga": 4475,
        "rp": 107400000
      },
      {
        "no": 5,
        "nama": "MIX FEED A20 NESTLE",
        "kg": 40000,
        "harga": 4320,
        "rp": 172800000
      }
    ],
    "sec4": [
      {
        "no": 1,
        "nama": "MIX FEED A18",
        "stok_awal": 0,
        "pembelian": 0,
        "siap_jual": 0,
        "penjualan": 0,
        "susut": 0,
        "stok_akhir": 0,
        "harga": 3900,
        "jumlah_rp": 0
      },
      {
        "no": 2,
        "nama": "MAGNESIUM",
        "stok_awal": 22,
        "pembelian": 75,
        "siap_jual": 97,
        "penjualan": 22,
        "susut": 0,
        "stok_akhir": 75,
        "harga": 30000,
        "jumlah_rp": 2250000
      },
      {
        "no": 3,
        "nama": "DCP",
        "stok_awal": 203,
        "pembelian": 0,
        "siap_jual": 203,
        "penjualan": 70,
        "susut": 0,
        "stok_akhir": 133,
        "harga": 25000,
        "jumlah_rp": 3325000
      },
      {
        "no": 4,
        "nama": "MIX FEED A20",
        "stok_awal": 35100,
        "pembelian": 64000,
        "siap_jual": 99100,
        "penjualan": 68450,
        "susut": 200,
        "stok_akhir": 30450,
        "harga": 4100,
        "jumlah_rp": 124845000
      }
    ]
  },
  "JUNI": {
    "sec1": [
      {
            "no": 1,
            "nama": "MILK CAN",
            "stok_awal_unit": 6.0,
            "stok_awal_harga": 650000.0,
            "stok_awal_rp": 3900000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 1.0,
            "penjualan_harga": 650000.0,
            "penjualan_rp": 650000.0,
            "stok_akhir_unit": 5.0,
            "stok_akhir_rp": 3250000.0
      },
      {
            "no": 2,
            "nama": "SARINGAN MILK CAN",
            "stok_awal_unit": 24.0,
            "stok_awal_harga": 130000.0,
            "stok_awal_rp": 3120000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 24.0,
            "stok_akhir_rp": 3120000.0
      },
      {
            "no": 3,
            "nama": "TIMBA PERAH",
            "stok_awal_unit": 32.0,
            "stok_awal_harga": 125000.0,
            "stok_awal_rp": 4000000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 32.0,
            "stok_akhir_rp": 4000000.0
      },
      {
            "no": 4,
            "nama": "BRANGUS SAPI",
            "stok_awal_unit": 85.0,
            "stok_awal_harga": 15000.0,
            "stok_awal_rp": 1275000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 85.0,
            "stok_akhir_rp": 1275000.0
      },
      {
            "no": 5,
            "nama": "ALAT CELUP",
            "stok_awal_unit": 175.0,
            "stok_awal_harga": 50000.0,
            "stok_awal_rp": 8750000.0,
            "pembelian_unit": 0.0,
            "pembelian_harga": 0.0,
            "pembelian_rp": 0.0,
            "penjualan_unit": 0.0,
            "penjualan_harga": 0.0,
            "penjualan_rp": 0.0,
            "stok_akhir_unit": 175.0,
            "stok_akhir_rp": 8750000.0
      }
],
    "sec2": [
      {
        "no": 1,
        "nama": "MF. A18 AGGT SUB",
        "tunai_kg": 0,
        "tunai_harga": 0,
        "tunai_rp": 0,
        "pot_kg": 0,
        "pot_harga": 0,
        "pot_rp": 0,
        "piu_kg": 0,
        "piu_harga": 0,
        "piu_rp": 0,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 0,
        "total_rp": 0
      },
      {
        "no": 2,
        "nama": "MAGNESIUM",
        "tunai_kg": 0,
        "tunai_harga": 35000,
        "tunai_rp": 0,
        "pot_kg": 6,
        "pot_harga": 35000,
        "pot_rp": 210000,
        "piu_kg": 0,
        "piu_harga": 0,
        "piu_rp": 0,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 6,
        "total_rp": 210000
      },
      {
        "no": 3,
        "nama": "DCP",
        "tunai_kg": 10,
        "tunai_harga": 25000,
        "tunai_rp": 250000,
        "pot_kg": 8,
        "pot_harga": 25000,
        "pot_rp": 200000,
        "piu_kg": 0,
        "piu_harga": 0,
        "piu_rp": 0,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 18,
        "total_rp": 450000
      },
      {
        "no": 4,
        "nama": "MF A20 RATIO",
        "tunai_kg": 19400,
        "tunai_harga": 4200,
        "tunai_rp": 81480000,
        "pot_kg": 26400,
        "pot_harga": 4200,
        "pot_rp": 110880000,
        "piu_kg": 11550,
        "piu_harga": 4200,
        "piu_rp": 48510000,
        "bunt_kg": 500,
        "bunt_harga": 4200,
        "bunt_rp": 2100000,
        "total_kg": 57350,
        "total_rp": 240870000
      },
      {
        "no": 5,
        "nama": "MF A20 NON RATIO",
        "tunai_kg": 9050,
        "tunai_harga": 4500,
        "tunai_rp": 40725000,
        "pot_kg": 0,
        "pot_harga": 0,
        "pot_rp": 0,
        "piu_kg": 0,
        "piu_harga": 0,
        "piu_rp": 0,
        "bunt_kg": 0,
        "bunt_harga": 0,
        "bunt_rp": 0,
        "total_kg": 9050,
        "total_rp": 40725000
      }
    ],
    "sec3": [
      {
        "no": 1,
        "nama": "MF. A18 AGGT SUB",
        "kg": 0,
        "harga": 0,
        "rp": 0
      },
      {
        "no": 2,
        "nama": "MAGNESIUM",
        "kg": 0,
        "harga": 30000,
        "rp": 0
      },
      {
        "no": 3,
        "nama": "DCP",
        "kg": 0,
        "harga": 22000,
        "rp": 0
      },
      {
        "no": 4,
        "nama": "MIX FEED A20 TUNAI",
        "kg": 24000,
        "harga": 4475,
        "rp": 107400000
      },
      {
        "no": 5,
        "nama": "MIX FEED A20 NESTLE",
        "kg": 40000,
        "harga": 4360,
        "rp": 174400000
      }
    ],
    "sec4": [
      {
        "no": 1,
        "nama": "MIX FEED A18",
        "stok_awal": 0,
        "pembelian": 0,
        "siap_jual": 0,
        "penjualan": 0,
        "susut": 0,
        "stok_akhir": 0,
        "harga": 3900,
        "jumlah_rp": 0
      },
      {
        "no": 2,
        "nama": "MAGNESIUM",
        "stok_awal": 75,
        "pembelian": 0,
        "siap_jual": 75,
        "penjualan": 6,
        "susut": 0,
        "stok_akhir": 69,
        "harga": 30000,
        "jumlah_rp": 2070000
      },
      {
        "no": 3,
        "nama": "DCP",
        "stok_awal": 133,
        "pembelian": 0,
        "siap_jual": 133,
        "penjualan": 18,
        "susut": 0,
        "stok_akhir": 115,
        "harga": 25000,
        "jumlah_rp": 2875000
      },
      {
        "no": 4,
        "nama": "MIX FEED A20",
        "stok_awal": 30450,
        "pembelian": 64000,
        "siap_jual": 94450,
        "penjualan": 66400,
        "susut": 150,
        "stok_akhir": 27900,
        "harga": 4100,
        "jumlah_rp": 114390000
      }
    ]
  }
},

  getFullData: function() {
    // Purge old versions that contained trial dummy data for JULI, AGUSTUS, SEPTEMBER
    try {
      localStorage.removeItem("DANAMULYA_LOGISTIK_FULL_V10");
      localStorage.removeItem("DANAMULYA_LOGISTIK_FULL_V9");
    } catch (e) {}

    let data = null;
    const stored = localStorage.getItem("DANAMULYA_LOGISTIK_FULL_V12");
    if (stored) {
      try {
        data = JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse logistik full data from localStorage", e);
      }
    }
    if (!data) {
      data = JSON.parse(JSON.stringify(this.defaultFullData));
    }
    // FIX Bug L36: Pastikan properti sec1 selalu terdefinisi sebagai array pada seluruh bulan
    const monthsList = ["JAN", "FEB", "MAR", "APRIL", "MEI", "JUNI", "JULI", "AGU", "SEP", "OKT", "NOV", "DES"];
    monthsList.forEach(m => {
      if (data[m] && !Array.isArray(data[m].sec1)) {
        data[m].sec1 = [];
      }
    });
    return data;
  },

  saveFullData: function(data) {
    try {
      localStorage.setItem("DANAMULYA_LOGISTIK_FULL_V12", JSON.stringify(data));
    } catch (e) {
      console.error("Gagal menyimpan DANAMULYA_LOGISTIK_FULL_V12 ke localStorage:", e);
    }
  },

  render: async function() {
    if (!AuthManager.requireAuth("logistik", "LOGISTIK")) {
      return `<div class="alert alert-danger">Akses Ditolak. Anda tidak berhak mengakses Divisi Logistik.</div>`;
    }

    const allData = this.getFullData();
    const activeMonth = this.getActiveSaveMonth();
    this.syncMatrixFromTransactions(allData, activeMonth);
    const monthData = this.getMonthDataForView(allData);

    // Totals Sec I
    let totSec1StokAwalRp = monthData.sec1.reduce((a, b) => a + (Number(b.stok_awal_rp) || 0), 0);
    let totSec1PembelianRp = monthData.sec1.reduce((a, b) => a + (Number(b.pembelian_rp) || 0), 0);
    let totSec1PenjualanRp = monthData.sec1.reduce((a, b) => a + (Number(b.penjualan_rp) || 0), 0);
    let totSec1StokAkhirRp = monthData.sec1.reduce((a, b) => a + (Number(b.stok_akhir_rp) || 0), 0);

    // Totals Sec II
    let totSec2Kg = monthData.sec2.reduce((a, b) => a + (Number(b.total_kg) || 0), 0);
    let totSec2Rp = monthData.sec2.reduce((a, b) => a + (Number(b.total_rp) || 0), 0);
    let totTunaiKg = monthData.sec2.reduce((a, b) => a + (Number(b.tunai_kg) || 0), 0);
    let totTunaiRp = monthData.sec2.reduce((a, b) => a + (Number(b.tunai_rp) || 0), 0);
    let totPotKg = monthData.sec2.reduce((a, b) => a + (Number(b.pot_kg) || 0), 0);
    let totPotRp = monthData.sec2.reduce((a, b) => a + (Number(b.pot_rp) || 0), 0);
    let totPiuKg = monthData.sec2.reduce((a, b) => a + (Number(b.piu_kg) || 0), 0);
    let totPiuRp = monthData.sec2.reduce((a, b) => a + (Number(b.piu_rp) || 0), 0);
    let totBuntKg = monthData.sec2.reduce((a, b) => a + (Number(b.bunt_kg) || 0), 0);
    let totBuntRp = monthData.sec2.reduce((a, b) => a + (Number(b.bunt_rp) || 0), 0);

    // Totals Sec III
    let totSec3Kg = monthData.sec3.reduce((a, b) => a + (Number(b.kg) || 0), 0);
    let totSec3Rp = monthData.sec3.reduce((a, b) => a + (Number(b.rp) || 0), 0);

    // Totals Sec IV
    let totSec4StokAkhir = monthData.sec4.reduce((a, b) => a + (Number(b.stok_akhir) || 0), 0);
    let totSec4Rp = monthData.sec4.reduce((a, b) => a + (Number(b.jumlah_rp) || 0), 0);

    const monthsList = ["JAN", "FEB", "MAR", "APRIL", "MEI", "JUNI", "JULI", "AGU", "SEP", "OKT", "NOV", "DES"];

    const session = AuthManager.getSession();
    const peternakLabel = session ? session.namaLengkap : 'Petugas Logistik';
    const roleLabel = session ? session.role.toUpperCase() : 'LOGISTIK';

    return `
<div class="ma-page" id="maPage">

  <!-- ═══════════════════════════════════════════════════
       APP HEADER
       ═══════════════════════════════════════════════════ -->
  <header class="ma-header">
    <div class="ma-header-brand">
      <img src="images/logo.jpg" alt="Logo" class="ma-header-logo">
      <div>
        <div class="ma-header-title">Logistik</div>
        <div class="ma-header-subtitle">${peternakLabel} · ${roleLabel}</div>
      </div>
    </div>
    <div class="ma-header-actions">
      <button class="ma-header-icon-btn" title="Notifikasi">
        <i class="bi bi-bell-fill"></i>
        <span class="ma-header-notif-dot"></span>
      </button>
      <button class="ma-header-icon-btn" title="Profil" onclick="App.toggleSidebar()">
        <i class="bi bi-person-fill"></i>
      </button>
    </div>
  </header>

  <!-- ═══════════════════════════════════════════════════
       HERO SUMMARY CARD
       ═══════════════════════════════════════════════════ -->
  <div class="ma-hero-card">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">
      <div>
        <div class="ma-hero-label">Sistem Informasi Digital Danamulya</div>
        <div style="font-size:1rem;font-weight:800;color:#fff;letter-spacing:-0.01em;">Divisi Logistik Agribisnis</div>
      </div>
      <span class="ma-period-chip">
        <i class="bi bi-calendar3"></i>${this.selectedMonth} ${this.selectedYear}
      </span>
    </div>
    <div>
      <div class="ma-hero-label">TOTAL OMZET PENJUALAN PAKAN</div>
      <div class="ma-hero-amount">
        Rp ${totSec2Rp.toLocaleString('id-ID')}
        <span class="ma-hero-badge">${totSec2Kg.toLocaleString('id-ID')} KG</span>
      </div>
    </div>
    <div class="ma-hero-meta">
      <div class="ma-hero-meta-item">
        <span><i class="bi bi-cart3" style="color:rgba(255,255,255,0.4);"></i> Pembelian</span>
        <strong>Rp ${totSec3Rp.toLocaleString('id-ID')}</strong>
      </div>
      <div class="ma-hero-meta-divider"></div>
      <div class="ma-hero-meta-item">
        <span><i class="bi bi-box-seam" style="color:rgba(255,255,255,0.4);"></i> Stok</span>
        <strong>Rp ${totSec4Rp.toLocaleString('id-ID')}</strong>
      </div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════
       QUICK ACTIONS 4×2 GRID (EXACT SCREENSHOT MATCH)
       ═══════════════════════════════════════════════════ -->
  <div class="ma-actions-section">
    <div class="ma-actions-grid">
      <button class="ma-action-item" onclick="document.getElementById('maFormSection')?.scrollIntoView({behavior:'smooth'})">
        <div class="ma-action-icon emerald-bg"><i class="bi bi-plus-circle-fill"></i></div>
        <span class="ma-action-label">Input Transaksi</span>
      </button>
      <button class="ma-action-item" onclick="document.getElementById('maTxListSection')?.scrollIntoView({behavior:'smooth'})">
        <div class="ma-action-icon blue-bg"><i class="bi bi-cart3"></i></div>
        <span class="ma-action-label">Penjualan</span>
      </button>
      <button class="ma-action-item" onclick="document.getElementById('maSecondaryTabs')?.scrollIntoView({behavior:'smooth'}); setTimeout(()=>document.getElementById('ma-tab-peralatan')?.click(),100)">
        <div class="ma-action-icon orange-bg"><i class="bi bi-tools"></i></div>
        <span class="ma-action-label">Peralatan</span>
      </button>
      <button class="ma-action-item" onclick="document.getElementById('maSecondaryTabs')?.scrollIntoView({behavior:'smooth'}); setTimeout(()=>document.getElementById('ma-tab-pembelian')?.click(),100)">
        <div class="ma-action-icon teal-bg"><i class="bi bi-basket-fill"></i></div>
        <span class="ma-action-label">Pembelian</span>
      </button>
      <button class="ma-action-item" onclick="document.getElementById('maSecondaryTabs')?.scrollIntoView({behavior:'smooth'}); setTimeout(()=>document.getElementById('ma-tab-stok')?.click(),100)">
        <div class="ma-action-icon purple-bg"><i class="bi bi-box-seam-fill"></i></div>
        <span class="ma-action-label">Stok</span>
      </button>
      <button class="ma-action-item" onclick="LogistikModule.exportExcelRekapBulananCombined()">
        <div class="ma-action-icon rose-bg"><i class="bi bi-file-earmark-text-fill"></i></div>
        <span class="ma-action-label">Laporan</span>
      </button>
      <button class="ma-action-item" onclick="document.getElementById('maSecondaryTabs')?.scrollIntoView({behavior:'smooth'}); setTimeout(()=>document.getElementById('ma-tab-matrix')?.click(),100)">
        <div class="ma-action-icon sky-bg"><i class="bi bi-calendar3"></i></div>
        <span class="ma-action-label">Jadwal</span>
      </button>
      <button class="ma-action-item" onclick="if (confirm('PERINGATAN: Apakah Anda yakin ingin mereset seluruh database aplikasi ke data bawaan awal? Semua transaksi yang belum disinkronkan akan hilang.')) { App.resetData(); }">
        <div class="ma-action-icon yellow-bg"><i class="bi bi-arrow-counterclockwise"></i></div>
        <span class="ma-action-label">Reset Data</span>
      </button>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════
       FILTER BAR (EXACT SCREENSHOT MATCH)
       ═══════════════════════════════════════════════════ -->
  <div class="ma-filter-bar">
    <span style="font-size:0.72rem;font-weight:700;color:#94a3b8;white-space:nowrap;flex-shrink:0;">Tahun</span>
    <select class="ma-filter-select emerald" onchange="LogistikModule.selectYear(this.value)">
      ${this.getAvailableYears().map(y => `<option value="${y}" ${y === this.selectedYear ? 'selected' : ''}>${y}</option>`).join('')}
    </select>
    <span style="font-size:0.72rem;font-weight:700;color:#94a3b8;white-space:nowrap;flex-shrink:0;">Bulan</span>
    <select class="ma-filter-select" onchange="LogistikModule.selectMonth(this.value)">
      <option value="ALL" ${this.selectedMonth === 'ALL' ? 'selected' : ''}>Semua</option>
      ${monthsList.map(m => `<option value="${m}" ${m === this.selectedMonth ? 'selected' : ''}>${m}</option>`).join('')}
    </select>
  </div>

  <div class="ma-divider"></div>

  <!-- ═══════════════════════════════════════════════════
       FORM TRANSAKSI — 4 STEP SECTIONS
       ═══════════════════════════════════════════════════ -->
  <div id="maFormSection" class="ma-content" style="padding-top:10px;padding-bottom:6px;">

    <form id="formLogistikTx" onsubmit="LogistikModule.handleSaveLogistikTx(event)">

      <!-- STEP 1: KATEGORI PEMBELI -->
      <div class="ma-section" style="margin-bottom:10px;">
        <div class="ma-section-header">
          <div class="ma-step-badge">1</div>
          <span class="ma-section-title">Kategori Pembeli</span>
        </div>
        <div class="ma-section-body">
          <div class="ma-selection-grid">
            <div class="ma-selection-card selected" id="selCardRasio" onclick="LogistikModule.onFilterKategoriChange('RASIO')">
              <div class="ma-selection-icon"><i class="bi bi-people-fill"></i></div>
              <span class="ma-selection-name">RASIO</span>
              <span class="ma-selection-desc">Peternak Anggota Koperasi</span>
            </div>
            <div class="ma-selection-card non-rasio" id="selCardNonRasio" onclick="LogistikModule.onFilterKategoriChange('NON_RASIO')">
              <div class="ma-selection-icon non-rasio-icon"><i class="bi bi-person-badge-fill"></i></div>
              <span class="ma-selection-name">NON-RASIO</span>
              <span class="ma-selection-desc">Bukan Anggota Koperasi</span>
            </div>
          </div>
        </div>
      </div>

      <!-- STEP 2: NAMA PETERNAK + STATUS + TANGGAL + WAKTU -->
      <div class="ma-section" style="margin-bottom:10px;">
        <div class="ma-section-header">
          <div class="ma-step-badge">2</div>
          <span class="ma-section-title">Nama Peternak / Pembeli</span>
        </div>
        <div class="ma-section-body">
          <div class="ma-field">
            <select class="ma-select" id="tx_peternak_select" onchange="LogistikModule.onPeternakSelectChange(this.value)" required>
              <option value="">— Pilih Nama Peternak —</option>
              ${this.getMasterPeternak().filter(p => p.kategori === 'RASIO').map(p =>
                `<option value="${p.nama}">${p.nama}</option>`
              ).join('')}
              <option value="+ TAMBAH NAMA PETERNAK BARU">+ Tambah Peternak Baru...</option>
            </select>
          </div>

          <div class="ma-status-row">
            <div class="ma-status-chip success">
              <span>Status Keanggotaan</span>
              <span id="tx_status_label">ANGGOTA (RASIO)</span>
            </div>
            <div class="ma-status-chip primary">
              <span>Kode Peternak</span>
              <span id="tx_kode_badge">R-SERIES</span>
            </div>
          </div>

          <!-- Hidden: add new peternak box -->
          <div id="tx_new_peternak_box" class="ma-notice" style="display:none;margin-top:10px;">
            <i class="bi bi-person-plus-fill ma-notice-icon"></i>
            <div style="flex:1;">
              <strong style="display:block;margin-bottom:8px;">Tambah Peternak Baru</strong>
              <input type="text" class="ma-input" id="tx_nama_baru" placeholder="Nama lengkap peternak baru" style="margin-bottom:8px;">
              <select class="ma-select" id="tx_kategori_baru" onchange="LogistikModule.onKategoriBaruChange(this.value)">
                <option value="RASIO">RASIO (Anggota Koperasi)</option>
                <option value="NON_RASIO">NON-RASIO (Bukan Anggota)</option>
              </select>
            </div>
          </div>

          <div class="ma-input-row" style="margin-top:10px;">
            <div class="ma-field" style="margin:0;">
              <label class="ma-label"><i class="bi bi-calendar3" style="margin-right:4px;"></i>Tanggal</label>
              <div class="ma-input-icon-wrap">
                <input type="date" class="ma-input" name="tanggal_pengambilan" id="tx_tanggal"
                  value="${this.getLocalDateStr()}"
                  onchange="LogistikModule.onTanggalPengambilanChange(this.value)" required>
              </div>
            </div>
            <div class="ma-field" style="margin:0;">
              <label class="ma-label"><i class="bi bi-clock" style="margin-right:4px;"></i>Jam</label>
              <div class="ma-input-icon-wrap">
                <input type="time" class="ma-input" name="waktu_pengambilan" id="tx_waktu"
                  value="${new Date().toTimeString().slice(0, 5)}" required>
              </div>
            </div>
          </div>
        </div>
        <!-- Hidden fields -->
        <input type="hidden" name="kode_r_nr" id="tx_kode_r_nr" value="">
        <input type="hidden" name="kategori_pembeli" id="tx_kategori_pembeli" value="RASIO">
        <input type="hidden" name="nomor_anggota" id="tx_nomor_anggota" value="0">
      </div>

      <!-- STEP 3: INPUT PAKAN -->
      <div class="ma-section" style="margin-bottom:10px;" id="maPakanSection">
        <div class="ma-section-header">
          <div class="ma-step-badge">3</div>
          <span class="ma-section-title">Input Jumlah Jenis Pakan</span>
        </div>
        <div class="table-responsive" style="overflow-x:auto;margin-top:10px;">
          <table class="ma-feed-table" style="width:100%;border-collapse:collapse;">
            <thead>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.1);color:#94a3b8;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;">
                <th style="padding:10px 8px;text-align:left;">JENIS PAKAN</th>
                <th style="padding:10px 8px;text-align:right;">HARGA / KG</th>
                <th style="padding:10px 8px;text-align:center;width:130px;">JUMLAH (KG)</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                <td style="padding:10px 8px;">
                  <div style="font-weight:700;font-size:0.85rem;color:#f8fafc;">MF A20 RATIO</div>
                  <span class="ma-feed-badge" style="font-size:0.65rem;padding:2px 6px;border-radius:4px;background:rgba(16,185,129,0.15);color:#10b981;">Jatah Anggota</span>
                </td>
                <td style="padding:10px 8px;text-align:right;font-size:0.82rem;color:#94a3b8;font-weight:600;">Rp 4.200</td>
                <td style="padding:10px 8px;text-align:center;">
                  <div class="ma-stepper" style="display:inline-flex;align-items:center;background:rgba(255,255,255,0.06);border-radius:8px;padding:2px;">
                    <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_mf_a20_ratio', -1)" style="width:28px;height:28px;border:none;background:transparent;color:#fff;font-weight:bold;cursor:pointer;">−</button>
                    <input type="number" step="0.1" class="ma-stepper-input" id="tx_qty_mf_a20_ratio" value="" placeholder="0" oninput="LogistikModule.calcMultiTxPreview()" style="width:44px;text-align:center;background:transparent;border:none;color:#fff;font-weight:bold;">
                    <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_mf_a20_ratio', 1)" style="width:28px;height:28px;border:none;background:transparent;color:#fff;font-weight:bold;cursor:pointer;">+</button>
                  </div>
                </td>
              </tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                <td style="padding:10px 8px;">
                  <div style="font-weight:700;font-size:0.85rem;color:#f8fafc;">MF A18 AGGT SUB</div>
                </td>
                <td style="padding:10px 8px;text-align:right;font-size:0.82rem;color:#94a3b8;font-weight:600;">Rp 3.900</td>
                <td style="padding:10px 8px;text-align:center;">
                  <div class="ma-stepper" style="display:inline-flex;align-items:center;background:rgba(255,255,255,0.06);border-radius:8px;padding:2px;">
                    <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_mf_a18_sub', -1)" style="width:28px;height:28px;border:none;background:transparent;color:#fff;font-weight:bold;cursor:pointer;">−</button>
                    <input type="number" step="0.1" class="ma-stepper-input" id="tx_qty_mf_a18_sub" value="" placeholder="0" oninput="LogistikModule.calcMultiTxPreview()" style="width:44px;text-align:center;background:transparent;border:none;color:#fff;font-weight:bold;">
                    <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_mf_a18_sub', 1)" style="width:28px;height:28px;border:none;background:transparent;color:#fff;font-weight:bold;cursor:pointer;">+</button>
                  </div>
                </td>
              </tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                <td style="padding:10px 8px;">
                  <div style="font-weight:700;font-size:0.85rem;color:#f8fafc;">MAGNESIUM</div>
                </td>
                <td style="padding:10px 8px;text-align:right;font-size:0.82rem;color:#94a3b8;font-weight:600;">Rp 30.000</td>
                <td style="padding:10px 8px;text-align:center;">
                  <div class="ma-stepper" style="display:inline-flex;align-items:center;background:rgba(255,255,255,0.06);border-radius:8px;padding:2px;">
                    <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_magnesium', -1)" style="width:28px;height:28px;border:none;background:transparent;color:#fff;font-weight:bold;cursor:pointer;">−</button>
                    <input type="number" step="0.1" class="ma-stepper-input" id="tx_qty_magnesium" value="" placeholder="0" oninput="LogistikModule.calcMultiTxPreview()" style="width:44px;text-align:center;background:transparent;border:none;color:#fff;font-weight:bold;">
                    <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_magnesium', 1)" style="width:28px;height:28px;border:none;background:transparent;color:#fff;font-weight:bold;cursor:pointer;">+</button>
                  </div>
                </td>
              </tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                <td style="padding:10px 8px;">
                  <div style="font-weight:700;font-size:0.85rem;color:#f8fafc;">DCP</div>
                </td>
                <td style="padding:10px 8px;text-align:right;font-size:0.82rem;color:#94a3b8;font-weight:600;">Rp 25.000</td>
                <td style="padding:10px 8px;text-align:center;">
                  <div class="ma-stepper" style="display:inline-flex;align-items:center;background:rgba(255,255,255,0.06);border-radius:8px;padding:2px;">
                    <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_dcp', -1)" style="width:28px;height:28px;border:none;background:transparent;color:#fff;font-weight:bold;cursor:pointer;">−</button>
                    <input type="number" step="0.1" class="ma-stepper-input" id="tx_qty_dcp" value="" placeholder="0" oninput="LogistikModule.calcMultiTxPreview()" style="width:44px;text-align:center;background:transparent;border:none;color:#fff;font-weight:bold;">
                    <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_dcp', 1)" style="width:28px;height:28px;border:none;background:transparent;color:#fff;font-weight:bold;cursor:pointer;">+</button>
                  </div>
                </td>
              </tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                <td style="padding:10px 8px;">
                  <div style="font-weight:700;font-size:0.85rem;color:#f8fafc;">MF A20 NON RATIO</div>
                  <span class="ma-feed-badge amber" style="font-size:0.65rem;padding:2px 6px;border-radius:4px;background:rgba(245,158,11,0.15);color:#f59e0b;">Non-Anggota</span>
                </td>
                <td style="padding:10px 8px;text-align:right;font-size:0.82rem;color:#94a3b8;font-weight:600;">Rp 4.500</td>
                <td style="padding:10px 8px;text-align:center;">
                  <div class="ma-stepper" style="display:inline-flex;align-items:center;background:rgba(255,255,255,0.06);border-radius:8px;padding:2px;">
                    <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_mf_a20_non', -1)" style="width:28px;height:28px;border:none;background:transparent;color:#fff;font-weight:bold;cursor:pointer;">−</button>
                    <input type="number" step="0.1" class="ma-stepper-input" id="tx_qty_mf_a20_non" value="" placeholder="0" oninput="LogistikModule.calcMultiTxPreview()" style="width:44px;text-align:center;background:transparent;border:none;color:#fff;font-weight:bold;">
                    <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_mf_a20_non', 1)" style="width:28px;height:28px;border:none;background:transparent;color:#fff;font-weight:bold;cursor:pointer;">+</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button type="button" class="ma-add-feed-btn" onclick="LogistikModule.maShowTab('matrix'); document.getElementById('ma-pane-matrix')?.scrollIntoView({behavior:'smooth'});">
          <i class="bi bi-gear-wide-connected"></i> Kelola / Tambah Pakan di Matriks
        </button>
      </div>

      <!-- STEP 4: PEMBAYARAN + SUMMARY + CTA -->
      <div class="ma-section" style="margin-bottom:10px;" id="maPaymentSection">
        <div class="ma-section-header">
          <div class="ma-step-badge">4</div>
          <span class="ma-section-title">Jadwal Penagihan / Metode Pembayaran</span>
        </div>
        <div class="ma-section-body">
          <div class="ma-field">
            <select class="ma-select" name="jadwal_penagihan" id="tx_jadwal_penagihan"
              onchange="LogistikModule.onJadwalSelectChange(this.value)" required>
              <option id="opt_p1" value="P1">Potongan Rutin P1 (Tgl 1-10 | Tagih Tgl 5)</option>
              <option id="opt_p2" value="P2">Potongan Rutin P2 (Tgl 11-20 | Tagih Tgl 15)</option>
              <option id="opt_p3" value="P3">Potongan Rutin P3 (Tgl 21-Akhir | Tagih Tgl 25)</option>
              <option id="opt_tunai" value="TUNAI">TUNAI (Uang Rupiah)</option>
              <option id="opt_prog_bunting" value="PROGRAM_BUNTING">Program Bunting (Inseminasi Buatan)</option>
              <option id="opt_piutang" value="PIUTANG">PIUTANG (Tunggakan Susu Lewat P3)</option>
            </select>
            <input type="hidden" name="metode_pembayaran" id="tx_metode_pembayaran" value="POTONGAN_RUTIN">
          </div>

          <!-- NON-RASIO notice -->
          <div id="tx_non_rasio_notice" class="ma-notice" style="display:none;margin-bottom:10px;">
            <i class="bi bi-exclamation-triangle-fill ma-notice-icon"></i>
            <div>
              <strong>Perhatian Non-Rasio:</strong> Pembayaran <strong>WAJIB TUNAI</strong>. Tidak dapat menggunakan Potongan Susu.
            </div>
          </div>

          <!-- Summary bar -->
          <div class="ma-summary-bar">
            <div class="ma-summary-row">
              <div class="ma-summary-item">
                <span class="ma-summary-label">Volume Pakan</span>
                <span class="ma-summary-value" id="tx_total_kg_preview">0 KG</span>
              </div>
              <div class="ma-summary-item">
                <span class="ma-summary-label">Total Nominal</span>
                <span class="ma-summary-value emerald" id="tx_total_rp_preview">Rp 0</span>
              </div>
            </div>
            <button type="submit" class="ma-btn-primary">
              <i class="bi bi-check-circle-fill"></i>Simpan Transaksi
            </button>
          </div>
        </div>
      </div>

    </form>
  </div>

  <div class="ma-divider"></div>

  <!-- ═══════════════════════════════════════════════════
       TABEL PENJUALAN PAKAN — TRANSACTION LIST
       ═══════════════════════════════════════════════════ -->
  <div id="maTxListSection">
    <div class="ma-tx-section-header">
      <div>
        <div class="ma-tx-section-title">
          <i class="bi bi-file-earmark-excel-fill" style="color:#16a34a;margin-right:6px;"></i>Tabel Form Penjualan Pakan
        </div>
        <div class="ma-text-muted" style="margin-top:3px;">Cetak atau unduh laporan penjualan harian</div>
      </div>
      <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
        <span class="ma-tx-count-badge">
          <i class="bi bi-receipt" style="margin-right:4px;"></i>${this.getTransactionsByMonth().length} Transaksi
        </span>
        <div class="ma-tx-actions">
          <button class="ma-btn-secondary" onclick="LogistikModule.exportExcelPenjualanPakanHarian()">
            <i class="bi bi-file-earmark-excel"></i>Download Excel
          </button>
          <button class="ma-btn-secondary" onclick="LogistikModule.printPenjualanPakanHarian()">
            <i class="bi bi-printer"></i>Cetak
          </button>
        </div>
      </div>
    </div>

    <!-- Search -->
    <div class="ma-tx-search">
      <div class="ma-input-icon-wrap">
        <i class="bi bi-search ma-input-icon"></i>
        <input type="search" class="ma-input" style="padding-left:38px;background:#f4f5f7;"
          placeholder="Cari nama / pakan..."
          oninput="LogistikModule.filterTxTable()" id="searchTxInput">
      </div>
    </div>

    <!-- Mobile Card List -->
    <div class="ma-tx-list" id="printableFormPenjualanPakan">
      ${(() => {
        const monthTxs = this.getTransactionsByMonth();
        if (monthTxs.length === 0) {
          return `
            <div class="ma-empty-state">
              <i class="bi bi-inbox ma-empty-icon"></i>
              <span class="ma-empty-title">Belum Ada Transaksi</span>
              <span class="ma-empty-desc">Belum ada catatan penjualan di bulan ${this.selectedMonth} ${this.selectedYear}.</span>
              <button class="ma-btn-primary" style="max-width:200px;margin:0 auto;" onclick="document.getElementById('maFormSection')?.scrollIntoView({behavior:'smooth'})">
                <i class="bi bi-plus-circle-fill"></i>Input Transaksi
              </button>
            </div>
          `;
        }
        return monthTxs.map(tx => {
          const dtParts = (tx.timestamp || '').split('T');
          const tgl = dtParts[0] ? dtParts[0].split('-').reverse().join(' / ') : '';
          const wkt = (dtParts[1] || '').substring(0, 5);
          const totalRp = (Number(tx.jumlah_sak_kg || 0) * Number(tx.harga_satuan || 0));
          const kodeDisplay = tx.kode_r_nr || (tx.kategori_pembeli === 'RASIO' ? 'R-' + tx.nomor_anggota : 'NR-0');
          const initial = (tx.nama_peternak || 'P').trim().charAt(0).toUpperCase();
          const isNonRasio = tx.kategori_pembeli === 'NON_RASIO';
          const isBunting = tx.is_program_bunting || tx.metode_pembayaran === 'PROGRAM_BUNTING';
          const isPiutang = tx.metode_pembayaran === 'PIUTANG';
          const isTunai = tx.metode_pembayaran === 'TUNAI';
          let badgeClass = 'p1';
          let badgeText = tx.jadwal_penagihan || 'P1';
          if (isPiutang)      { badgeClass = 'piutang'; badgeText = 'PIUTANG'; }
          else if (isBunting) { badgeClass = 'bunting'; badgeText = 'BUNTING'; }
          else if (isTunai)   { badgeClass = 'tunai';   badgeText = 'TUNAI'; }
          else if (tx.jadwal_penagihan === 'P2') badgeClass = 'p2';
          else if (tx.jadwal_penagihan === 'P3') badgeClass = 'p3';
          return `
            <div class="ma-tx-card">
              <div class="ma-tx-avatar ${isNonRasio ? 'non-rasio' : ''}">${initial}</div>
              <div class="ma-tx-card-body">
                <div class="ma-tx-name">${tx.nama_peternak || 'Peternak'}</div>
                <div class="ma-tx-meta">
                  <span style="margin-right:6px;padding:1px 5px;border:1px solid #e8eaed;border-radius:4px;font-size:0.65rem;font-weight:700;">${kodeDisplay}</span>
                  ${tx.jenis_pakan || ''} · ${Number(tx.jumlah_sak_kg || 0).toLocaleString('id-ID')} KG
                </div>
                <div class="ma-tx-meta" style="margin-top:3px;">
                  <i class="bi bi-clock" style="margin-right:3px;"></i>${tgl} · ${wkt}
                </div>
              </div>
              <div class="ma-tx-card-right">
                <div class="ma-tx-amount">Rp ${totalRp.toLocaleString('id-ID')}</div>
                <span class="ma-tx-badge ${badgeClass}">${badgeText}</span>
                <button class="ma-tx-del-btn" title="Hapus transaksi" onclick="LogistikModule.deleteLogistikTx('${tx.id}')">
                  <i class="bi bi-trash3"></i>
                </button>
              </div>
            </div>
          `;
        }).join('');
      })()}
    </div>
  </div>

  <div class="ma-divider" style="height:12px;"></div>

  <!-- ═══════════════════════════════════════════════════
       SECONDARY TABS: Peralatan / Matrix / Pembelian / Stok
       ═══════════════════════════════════════════════════ -->
  <div id="maSecondaryTabs">
    <div class="ma-tabs-header">
      <button class="ma-tab-btn active" id="ma-tab-matrix" onclick="LogistikModule.maShowTab('matrix', this)">
        <i class="bi bi-grid-3x3-gap-fill" style="margin-right:5px;color:#10b981;"></i>II. Penjualan Pakan
      </button>
      <button class="ma-tab-btn" id="ma-tab-peralatan" onclick="LogistikModule.maShowTab('peralatan', this)">
        <i class="bi bi-tools" style="margin-right:5px;color:#f59e0b;"></i>I. Peralatan
      </button>
      <button class="ma-tab-btn" id="ma-tab-pembelian" onclick="LogistikModule.maShowTab('pembelian', this)">
        <i class="bi bi-cart-plus" style="margin-right:5px;color:#3b82f6;"></i>III. Pembelian
      </button>
      <button class="ma-tab-btn" id="ma-tab-stok" onclick="LogistikModule.maShowTab('stok', this)">
        <i class="bi bi-box-seam" style="margin-right:5px;color:#8b5cf6;"></i>IV. Stok
      </button>
    </div>

    <!-- TAB CONTENT: Matrix Penjualan (II) -->
    <div id="ma-pane-matrix" class="ma-content">
      <div class="ma-card">
        <div class="ma-card-header">
          <div class="ma-card-title">
            <i class="bi bi-journal-check" style="color:#16a34a;margin-right:6px;"></i>
            II. Penjualan Makanan Ternak — ${this.selectedMonth} ${this.selectedYear}
          </div>
          <button class="ma-btn-secondary" onclick="LogistikModule.exportExcelSec2()">
            <i class="bi bi-file-earmark-excel"></i> Excel
          </button>
        </div>
        <!-- Form Penyesuaian Manual Seksi II -->
        <form id="formLogSec2" onsubmit="LogistikModule.handleSaveSec2(event)" style="margin-bottom:14px;">
          <div class="ma-field"><label class="ma-label">Pilih Nama Pakan</label>
            <select class="ma-select" name="nama_pakan" id="sec2SelectPakan" onchange="LogistikModule.onSelectSec2Pakan(this.value)" required>
              ${monthData.sec2.map(it => `<option value="${it.nama}">${it.no}. ${it.nama}</option>`).join('')}
              <option value="+ TAMBAH PAKAN BARU">+ Tambah Pakan Baru...</option>
            </select>
          </div>
          <div id="sec2ColBaru" style="display:none;" class="ma-field">
            <label class="ma-label">Nama Pakan Baru</label>
            <input type="text" class="ma-input" name="nama_pakan_custom" placeholder="PAKAN KHUSUS">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;">
            <div class="ma-field" style="margin:0;"><label class="ma-label">Tunai (KG)</label><input type="number" step="0.1" class="ma-input" name="tunai_kg" id="sec2_tunai_kg" placeholder="0" oninput="LogistikModule.calcSec2Preview()"></div>
            <div class="ma-field" style="margin:0;"><label class="ma-label">Harga Tunai/KG</label><input type="number" class="ma-input" name="tunai_harga" id="sec2_tunai_harga" placeholder="0" oninput="LogistikModule.calcSec2Preview()"></div>
            <div class="ma-field" style="margin:0;"><label class="ma-label">Potongan Rutin (KG)</label><input type="number" step="0.1" class="ma-input" name="pot_kg" id="sec2_pot_kg" placeholder="0" oninput="LogistikModule.calcSec2Preview()"></div>
            <div class="ma-field" style="margin:0;"><label class="ma-label">Harga Potongan/KG</label><input type="number" class="ma-input" name="pot_harga" id="sec2_pot_harga" placeholder="0" oninput="LogistikModule.calcSec2Preview()"></div>
            <div class="ma-field" style="margin:0;"><label class="ma-label">Piutang (KG)</label><input type="number" step="0.1" class="ma-input" name="piu_kg" id="sec2_piu_kg" placeholder="0" oninput="LogistikModule.calcSec2Preview()"></div>
            <div class="ma-field" style="margin:0;"><label class="ma-label">Harga Piutang/KG</label><input type="number" class="ma-input" name="piu_harga" id="sec2_piu_harga" placeholder="0" oninput="LogistikModule.calcSec2Preview()"></div>
            <div class="ma-field" style="margin:0;"><label class="ma-label">Bunting (KG)</label><input type="number" step="0.1" class="ma-input" name="bunt_kg" id="sec2_bunt_kg" placeholder="0" oninput="LogistikModule.calcSec2Preview()"></div>
            <div class="ma-field" style="margin:0;"><label class="ma-label">Harga Bunting/KG</label><input type="number" class="ma-input" name="bunt_harga" id="sec2_bunt_harga" placeholder="0" oninput="LogistikModule.calcSec2Preview()"></div>
          </div>
          <input type="hidden" id="sec2_tunai_rp_input">
          <input type="hidden" id="sec2_pot_rp_input">
          <input type="hidden" id="sec2_piu_rp_input">
          <input type="hidden" id="sec2_bunt_rp_input">
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px;">
            <span class="badge bg-primary px-2 py-1" id="sec2PreviewKg">JUMLAH TOTAL KG: 0 KG</span>
            <span class="badge bg-success px-2 py-1" id="sec2PreviewRp">JUMLAH TOTAL RP: Rp 0</span>
          </div>
          <button type="submit" class="ma-btn-primary"><i class="bi bi-save"></i> Simpan Penyesuaian Penjualan</button>
        </form>
        <div style="overflow-x:auto;">
          <table class="table table-bordered table-hover align-middle text-center mb-0" style="font-size:0.8rem;">
            <thead class="table-light fw-bold">
              <tr>
                <th rowspan="2" class="align-middle">NO</th>
                <th rowspan="2" class="align-middle text-start">NAMA PAKAN</th>
                <th colspan="3" class="bg-success bg-opacity-10">TUNAI</th>
                <th colspan="3" class="bg-info bg-opacity-10">POTONGAN</th>
                <th colspan="3" class="bg-danger bg-opacity-10">PIUTANG</th>
                <th colspan="3" class="bg-warning bg-opacity-10">BUNTING</th>
                <th colspan="2">JUMLAH</th>
              </tr>
              <tr>
                <th class="bg-success bg-opacity-10">KG</th><th class="bg-success bg-opacity-10">HARGA</th><th class="bg-success bg-opacity-10">RP</th>
                <th class="bg-info bg-opacity-10">KG</th><th class="bg-info bg-opacity-10">HARGA</th><th class="bg-info bg-opacity-10">RP</th>
                <th class="bg-danger bg-opacity-10">KG</th><th class="bg-danger bg-opacity-10">HARGA</th><th class="bg-danger bg-opacity-10">RP</th>
                <th class="bg-warning bg-opacity-10">KG</th><th class="bg-warning bg-opacity-10">HARGA</th><th class="bg-warning bg-opacity-10">RP</th>
                <th>KG</th><th>RP</th>
              </tr>
            </thead>
            <tbody>
              ${monthData.sec2.map(it => `
                <tr>
                  <td class="fw-bold">${it.no}</td>
                  <td class="text-start fw-bold">${it.nama}</td>
                  <td>${it.tunai_kg > 0 ? Number(it.tunai_kg).toLocaleString('id-ID') : '-'}</td>
                  <td>${it.tunai_harga > 0 ? Number(it.tunai_harga).toLocaleString('id-ID') : '-'}</td>
                  <td class="text-success fw-semibold">${it.tunai_rp > 0 ? Number(it.tunai_rp).toLocaleString('id-ID') : '-'}</td>
                  <td>${it.pot_kg > 0 ? Number(it.pot_kg).toLocaleString('id-ID') : '-'}</td>
                  <td>${it.pot_harga > 0 ? Number(it.pot_harga).toLocaleString('id-ID') : '-'}</td>
                  <td class="text-primary fw-semibold">${it.pot_rp > 0 ? Number(it.pot_rp).toLocaleString('id-ID') : '-'}</td>
                  <td>${it.piu_kg > 0 ? Number(it.piu_kg).toLocaleString('id-ID') : '-'}</td>
                  <td>${it.piu_harga > 0 ? Number(it.piu_harga).toLocaleString('id-ID') : '-'}</td>
                  <td class="text-danger fw-semibold">${it.piu_rp > 0 ? Number(it.piu_rp).toLocaleString('id-ID') : '-'}</td>
                  <td>${it.bunt_kg > 0 ? Number(it.bunt_kg).toLocaleString('id-ID') : '-'}</td>
                  <td>${it.bunt_harga > 0 ? Number(it.bunt_harga).toLocaleString('id-ID') : '-'}</td>
                  <td class="fw-semibold">${it.bunt_rp > 0 ? Number(it.bunt_rp).toLocaleString('id-ID') : '-'}</td>
                  <td class="fw-bold">${it.total_kg > 0 ? Number(it.total_kg).toLocaleString('id-ID') : '-'}</td>
                  <td class="fw-bold">${it.total_rp > 0 ? Number(it.total_rp).toLocaleString('id-ID') : '-'}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot class="table-light fw-bold">
              <tr>
                <td colspan="2">TOTAL</td>
                <td class="text-success">${totTunaiKg.toLocaleString('id-ID')}</td><td>-</td><td class="text-success">${totTunaiRp.toLocaleString('id-ID')}</td>
                <td class="text-primary">${totPotKg.toLocaleString('id-ID')}</td><td>-</td><td class="text-primary">${totPotRp.toLocaleString('id-ID')}</td>
                <td class="text-danger">${totPiuKg.toLocaleString('id-ID')}</td><td>-</td><td class="text-danger">${totPiuRp.toLocaleString('id-ID')}</td>
                <td>${totBuntKg.toLocaleString('id-ID')}</td><td>-</td><td>${totBuntRp.toLocaleString('id-ID')}</td>
                <td class="text-emerald fs-6">${totSec2Kg.toLocaleString('id-ID')}</td>
                <td class="text-emerald fs-6">${totSec2Rp.toLocaleString('id-ID')}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB CONTENT: I. Peralatan -->
    <div id="ma-pane-peralatan" class="ma-content" style="display:none;">
      <div class="ma-card">
        <div class="ma-card-header">
          <div class="ma-card-title"><i class="bi bi-tools" style="color:#f59e0b;margin-right:6px;"></i>I. Peralatan Ternak — ${this.selectedMonth} ${this.selectedYear}</div>
          <button class="ma-btn-secondary" onclick="LogistikModule.exportExcelSec1()"><i class="bi bi-file-earmark-excel"></i> Excel</button>
        </div>
        <form id="formLogSec1" onsubmit="LogistikModule.handleSaveSec1(event)" style="margin-bottom:14px;">
          <div class="ma-field"><label class="ma-label">Pilih Nama Alat</label>
            <select class="ma-select" name="nama_alat" id="sec1SelectAlat" onchange="LogistikModule.onSelectSec1Alat(this.value)" required>
              ${monthData.sec1.map(it => `<option value="${it.nama}">${it.no}. ${it.nama}</option>`).join('')}
              <option value="+ TAMBAH ALAT BARU">+ Tambah Alat Baru...</option>
            </select>
          </div>
          <div id="sec1ColBaru" style="display:none;" class="ma-field">
            <label class="ma-label">Nama Alat Baru</label>
            <input type="text" class="ma-input" name="nama_alat_custom" placeholder="MESIN PERAH PORTABEL">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;">
            <div class="ma-field" style="margin:0;"><label class="ma-label">Unit Beli</label><input type="number" class="ma-input" name="pembelian_unit" id="sec1_pembelian_unit" placeholder="0" oninput="LogistikModule.calcSec1Preview()"></div>
            <div class="ma-field" style="margin:0;"><label class="ma-label">Harga Beli/Unit</label><input type="number" class="ma-input" name="pembelian_harga" id="sec1_pembelian_harga" placeholder="0" oninput="LogistikModule.calcSec1Preview()"></div>
            <div class="ma-field" style="margin:0;"><label class="ma-label">Unit Jual</label><input type="number" class="ma-input" name="penjualan_unit" id="sec1_penjualan_unit" placeholder="0" oninput="LogistikModule.calcSec1Preview()"></div>
            <div class="ma-field" style="margin:0;"><label class="ma-label">Harga Jual/Unit</label><input type="number" class="ma-input" name="penjualan_harga" id="sec1_penjualan_harga" placeholder="0" oninput="LogistikModule.calcSec1Preview()"></div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px;">
            <span class="badge bg-secondary px-2 py-1" id="sec1PreviewStokAwal">STOK AWAL: 0</span>
            <span class="badge bg-info px-2 py-1" id="sec1_pembelian_rp_input">BELI: Rp 0</span>
            <span class="badge bg-warning text-dark px-2 py-1" id="sec1_penjualan_rp_input">JUAL: Rp 0</span>
            <span class="badge bg-primary px-2 py-1" id="sec1PreviewStokAkhirUnit">STOK AKHIR: 0</span>
            <span class="badge bg-success px-2 py-1" id="sec1PreviewStokAkhirRp">Rp 0</span>
          </div>
          <button type="submit" class="ma-btn-primary"><i class="bi bi-save"></i> Simpan Peralatan</button>
        </form>
        <div style="overflow-x:auto;">
          <table class="table table-bordered table-hover align-middle text-center mb-0" style="font-size:0.78rem;">
            <thead class="table-primary fw-bold">
              <tr>
                <th>NO</th><th class="text-start">NAMA ALAT</th>
                <th>STOK AWAL (UNIT)</th><th>HARGA</th><th>RP</th>
                <th>BELI (UNIT)</th><th>HARGA</th><th>RP</th>
                <th>JUAL (UNIT)</th><th>HARGA</th><th>RP</th>
                <th>STOK AKHIR (UNIT)</th><th>RP</th>
              </tr>
            </thead>
            <tbody>
              ${monthData.sec1.map(it => `
                <tr>
                  <td>${it.no}</td><td class="text-start fw-bold">${it.nama}</td>
                  <td>${it.stok_awal_unit || 0}</td>
                  <td>${it.stok_awal_harga ? Number(it.stok_awal_harga).toLocaleString('id-ID') : '-'}</td>
                  <td class="text-primary">${it.stok_awal_rp ? Number(it.stok_awal_rp).toLocaleString('id-ID') : '-'}</td>
                  <td>${it.pembelian_unit || ''}</td>
                  <td>${it.pembelian_harga ? Number(it.pembelian_harga).toLocaleString('id-ID') : ''}</td>
                  <td>${it.pembelian_rp ? Number(it.pembelian_rp).toLocaleString('id-ID') : '-'}</td>
                  <td>${it.penjualan_unit || ''}</td>
                  <td>${it.penjualan_harga ? Number(it.penjualan_harga).toLocaleString('id-ID') : ''}</td>
                  <td>${it.penjualan_rp ? Number(it.penjualan_rp).toLocaleString('id-ID') : '-'}</td>
                  <td class="fw-bold">${it.stok_akhir_unit || 0}</td>
                  <td class="text-primary fw-bold">${it.stok_akhir_rp ? Number(it.stok_akhir_rp).toLocaleString('id-ID') : '-'}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot class="table-light fw-bold">
              <tr>
                <td colspan="4" class="text-end">TOTAL</td>
                <td class="text-primary">${totSec1StokAwalRp.toLocaleString('id-ID')}</td>
                <td></td><td></td>
                <td>${totSec1PembelianRp > 0 ? totSec1PembelianRp.toLocaleString('id-ID') : '-'}</td>
                <td></td><td></td>
                <td>${totSec1PenjualanRp > 0 ? totSec1PenjualanRp.toLocaleString('id-ID') : '-'}</td>
                <td></td>
                <td class="text-primary">${totSec1StokAkhirRp.toLocaleString('id-ID')}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB CONTENT: III. Pembelian -->
    <div id="ma-pane-pembelian" class="ma-content" style="display:none;">
      <div class="ma-card">
        <div class="ma-card-header">
          <div class="ma-card-title"><i class="bi bi-cart-plus-fill" style="color:#3b82f6;margin-right:6px;"></i>III. Pembelian Pakan — ${this.selectedMonth} ${this.selectedYear}</div>
          <button class="ma-btn-secondary" onclick="LogistikModule.exportExcelSec3()"><i class="bi bi-file-earmark-excel"></i> Excel</button>
        </div>
        <form id="formLogSec3" onsubmit="LogistikModule.handleSaveSec3(event)" style="margin-bottom:14px;">
          <div class="ma-field"><label class="ma-label">Nama Pakan</label>
            <!-- FIX LOG-B15 & LOG-B19: Dropdown pakan dengan fallback pakan standar & opsi tambah pakan baru -->
            <select class="ma-select" name="nama_pakan" id="sec3SelectPakan" onchange="LogistikModule.onSelectSec3Pakan(this.value)" required>
              ${(() => {
                // FIX LOG-B53: Gabungkan pakan standar + yang sudah ada agar semua tetap tampil
                const standardFeeds = ["MIX FEED A20", "MIX FEED A18", "MAGNESIUM", "DCP", "MF A20 NON RATIO"];
                const existingFeeds = (monthData.sec3 || []).map(it => it.nama);
                const allFeeds = Array.from(new Set([...standardFeeds, ...existingFeeds]));
                return allFeeds.map((name, idx) => `<option value="${name}">${idx + 1}. ${name}</option>`).join('');
              })()}
              <option value="+ TAMBAH PAKAN BARU">+ Tambah Pakan Baru...</option>
            </select>
          </div>
          <div id="sec3ColBaru" style="display:none;" class="ma-field">
            <label class="ma-label">Nama Pakan Baru</label>
            <input type="text" class="ma-input" name="nama_pakan_custom" placeholder="KONSENTRAT BOOSTER">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;">
            <div class="ma-field" style="margin:0;"><label class="ma-label">Volume (KG)</label><input type="number" step="0.1" class="ma-input" name="kg" id="sec3_kg" placeholder="0" oninput="LogistikModule.calcSec3Preview()"></div>
            <div class="ma-field" style="margin:0;"><label class="ma-label">Harga/KG (Rp)</label><input type="number" class="ma-input" name="harga" id="sec3_harga" placeholder="4000" oninput="LogistikModule.calcSec3Preview()"></div>
          </div>
          <div style="margin-bottom:10px;">
            <span class="badge bg-primary px-3 py-2" id="sec3PreviewRp">Total: Rp 0</span>
            <input type="text" class="form-control form-control-sm mt-1 fw-bold bg-white text-primary" id="sec3_rp_input" readonly value="Rp 0" style="display:none;">
          </div>
          <button type="submit" class="ma-btn-primary"><i class="bi bi-save"></i> Simpan Pembelian</button>
        </form>
        <div style="overflow-x:auto;">
          <table class="table table-bordered table-hover align-middle text-center mb-0" style="font-size:0.82rem;">
            <thead class="table-primary fw-bold"><tr><th>NO</th><th class="text-start">NAMA PAKAN</th><th>KG</th><th>HARGA/KG</th><th>TOTAL RP</th></tr></thead>
            <tbody>
              ${monthData.sec3.map(it => `
                <tr>
                  <td>${it.no}</td>
                  <td class="text-start fw-bold">${it.nama}</td>
                  <td class="fw-bold text-primary">${it.kg > 0 ? Number(it.kg).toLocaleString('id-ID') : '-'}</td>
                  <td>${it.harga > 0 ? Number(it.harga).toLocaleString('id-ID') : '-'}</td>
                  <td class="fw-bold text-emerald">${it.rp > 0 ? Number(it.rp).toLocaleString('id-ID') : '-'}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot class="table-light fw-bold">
              <tr>
                <td colspan="2" class="text-end">TOTAL</td>
                <td class="text-primary">${totSec3Kg.toLocaleString('id-ID')} KG</td>
                <td>-</td>
                <td class="text-emerald">Rp ${totSec3Rp.toLocaleString('id-ID')}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB CONTENT: IV. Stok -->
    <div id="ma-pane-stok" class="ma-content" style="display:none;">
      <div class="ma-card">
        <div class="ma-card-header">
          <div class="ma-card-title"><i class="bi bi-box-seam-fill" style="color:#8b5cf6;margin-right:6px;"></i>IV. Stok Makanan Ternak — ${this.selectedMonth} ${this.selectedYear}</div>
          <button class="ma-btn-secondary" onclick="LogistikModule.exportExcelSec4()"><i class="bi bi-file-earmark-excel"></i> Excel</button>
        </div>
        <form id="formLogSec4" onsubmit="LogistikModule.handleSaveSec4(event)" style="margin-bottom:14px;">
          <!-- FIX LOG-B50: Tambahkan opsi 'Tambah Pakan Baru' ke Seksi IV -->
          <div class="ma-field">
            <label class="ma-label">Nama Pakan</label>
            <select class="ma-select" name="nama_pakan" id="sec4SelectPakan" onchange="LogistikModule.onSelectSec4Pakan(this.value)" required>
              ${monthData.sec4.map(it => `<option value="${it.nama}">${it.no}. ${it.nama}</option>`).join('')}
              <option value="+ TAMBAH PAKAN BARU">+ Tambah Pakan Baru...</option>
            </select>
          </div>
          <div id="sec4ColBaru" style="display:none;" class="ma-field">
            <label class="ma-label">Nama Pakan Baru (Stok)</label>
            <input type="text" class="ma-input" name="nama_pakan_custom" placeholder="KONSENTRAT BOOSTER">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;">
            <div class="ma-field" style="margin:0;"><label class="ma-label">Stok Awal (KG)</label><input type="number" step="0.1" class="ma-input" name="stok_awal" id="sec4_stok_awal" placeholder="0" oninput="LogistikModule.calcSec4Preview()"></div>
            <div class="ma-field" style="margin:0;"><label class="ma-label">Susut (KG)</label><input type="number" step="0.1" class="ma-input" name="susut" id="sec4_susut" placeholder="0" oninput="LogistikModule.calcSec4Preview()"></div>
            <div class="ma-field" style="margin:0;"><label class="ma-label">Harga/KG (Rp)</label><input type="number" class="ma-input" name="harga" id="sec4_harga" placeholder="4000" oninput="LogistikModule.calcSec4Preview()"></div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px;">
            <span class="badge bg-secondary px-2 py-1" id="sec4PreviewStokAwal">STOK AWAL: 0 KG</span>
            <span class="badge bg-info px-2 py-1" id="sec4PreviewSiapJual">SIAP JUAL: 0 KG</span>
            <span class="badge bg-primary px-2 py-1" id="sec4PreviewStokAkhir">ESTIMASI STOK AKHIR: 0 KG</span>
            <span class="badge bg-success px-2 py-1" id="sec4PreviewRp">Rp 0</span>
          </div>
          <button type="submit" class="ma-btn-primary"><i class="bi bi-save"></i> Simpan Stok</button>
        </form>
        <div style="overflow-x:auto;">
          <table class="table table-bordered align-middle text-center mb-0" style="font-size:0.8rem;">
            <thead class="table-primary fw-bold"><tr>
              <th>NO</th><th class="text-start">NAMA PAKAN</th>
              <th>STOK AWAL</th><th>PEMBELIAN</th><th>SIAP JUAL</th>
              <th>PENJUALAN</th><th>SUSUT</th><th class="bg-light">STOK AKHIR</th><th>HARGA</th><th>JUMLAH RP</th>
            </tr></thead>
            <tbody>
              ${monthData.sec4.map(it => `
                <tr>
                  <td>${it.no}</td><td class="text-start fw-bold">${it.nama}</td>
                  <td>${it.stok_awal > 0 ? Number(it.stok_awal).toLocaleString('id-ID') : '-'}</td>
                  <td>${it.pembelian > 0 ? Number(it.pembelian).toLocaleString('id-ID') : '-'}</td>
                  <td class="text-primary fw-semibold">${it.siap_jual > 0 ? Number(it.siap_jual).toLocaleString('id-ID') : '-'}</td>
                  <td class="text-success fw-semibold">${it.penjualan > 0 ? Number(it.penjualan).toLocaleString('id-ID') : '-'}</td>
                  <td class="text-danger">${it.susut > 0 ? Number(it.susut).toLocaleString('id-ID') : '0'}</td>
                  <td class="fw-bold bg-light">${it.stok_akhir > 0 ? Number(it.stok_akhir).toLocaleString('id-ID') : '0'}</td>
                  <td>${it.harga > 0 ? Number(it.harga).toLocaleString('id-ID') : '-'}</td>
                  <td class="fw-bold">${it.jumlah_rp > 0 ? Number(it.jumlah_rp).toLocaleString('id-ID') : '-'}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot class="table-light fw-bold">
              <tr>
                <td colspan="7" class="text-end">TOTAL:</td>
                <td class="text-primary">${totSec4StokAkhir.toLocaleString('id-ID')} KG</td>
                <td>-</td>
                <td class="text-emerald">Rp ${totSec4Rp.toLocaleString('id-ID')}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>

    <!-- MOBILE BOTTOM NAVIGATION BAR -->
  <nav class="ma-bottom-nav">
    <button class="ma-bottom-tab" onclick="location.hash='#dashboard'">
      <i class="bi bi-house-door"></i>
      <span>Beranda</span>
    </button>
    <button class="ma-bottom-tab active" onclick="document.getElementById('maFormSection')?.scrollIntoView({behavior:'smooth'})">
      <i class="bi bi-file-earmark-text"></i>
      <span>Transaksi</span>
    </button>
    <button class="ma-bottom-tab" onclick="location.hash='#excel'">
      <i class="bi bi-grid-3x3-gap"></i>
      <span>Excel</span>
    </button>
    <button class="ma-bottom-tab logout" onclick="AuthModule.logout()">
      <i class="bi bi-box-arrow-right"></i>
      <span>Keluar</span>
    </button>
  </nav>

  <div style="height: 70px;"></div>
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

  /* ── STEPPER HELPER (± button for pakan quantity) ───── */
  stepperChange: function(inputId, delta) {
    const el = document.getElementById(inputId);
    if (!el || el.disabled) return;
    let val = parseFloat(el.value) || 0;
    val = Math.max(0, Math.round((val + delta) * 10) / 10);
    el.value = val || '';
    this.calcMultiTxPreview();
  },

  /* ── SECONDARY TAB SWITCHER ────────────────────────── */
  maShowTab: function(tabName, btnEl) {
    const panes = ['matrix', 'peralatan', 'pembelian', 'stok'];
    panes.forEach(p => {
      const pane = document.getElementById('ma-pane-' + p);
      const btn = document.getElementById('ma-tab-' + p);
      if (pane) pane.style.display = p === tabName ? 'block' : 'none';
      if (btn)  btn.classList.toggle('active', p === tabName);
    });
  },

  calcSec2Preview: function() {
    // FIX LOG-B63 & LOG-B64: Sanitasi numerik aman agar pemisah ribuan/titik/koma tidak menghasilkan NaN
    const tKg = this.parseNum(document.getElementById("sec2_tunai_kg")?.value);
    const tH = this.parseNum(document.getElementById("sec2_tunai_harga")?.value);
    const tRp = tKg * tH;

    const pKg = this.parseNum(document.getElementById("sec2_pot_kg")?.value);
    const pH = this.parseNum(document.getElementById("sec2_pot_harga")?.value);
    const pRp = pKg * pH;

    const iuKg = this.parseNum(document.getElementById("sec2_piu_kg")?.value);
    const iuH = this.parseNum(document.getElementById("sec2_piu_harga")?.value);
    const iuRp = iuKg * iuH;

    const bKg = this.parseNum(document.getElementById("sec2_bunt_kg")?.value);
    const bH = this.parseNum(document.getElementById("sec2_bunt_harga")?.value);
    const bRp = bKg * bH;

    // Update Form Input Field ke-3 (Total Rp Otomatis) tiap kotak
    const inputTRp = document.getElementById("sec2_tunai_rp_input");
    const inputPRp = document.getElementById("sec2_pot_rp_input");
    const inputIuRp = document.getElementById("sec2_piu_rp_input");
    const inputBRp = document.getElementById("sec2_bunt_rp_input");

    if (inputTRp) inputTRp.value = "Rp " + tRp.toLocaleString("id-ID");
    if (inputPRp) inputPRp.value = "Rp " + pRp.toLocaleString("id-ID");
    if (inputIuRp) inputIuRp.value = "Rp " + iuRp.toLocaleString("id-ID");
    if (inputBRp) inputBRp.value = "Rp " + bRp.toLocaleString("id-ID");

    // Total Keseluruhan (KG + KG dan RP + RP)
    const totKg = tKg + pKg + iuKg + bKg;
    const totRp = tRp + pRp + iuRp + bRp;

    const elKg = document.getElementById("sec2PreviewKg");
    const elRp = document.getElementById("sec2PreviewRp");
    if (elKg) elKg.innerText = "JUMLAH TOTAL KG: " + totKg.toLocaleString("id-ID") + " KG";
    if (elRp) elRp.innerText = "JUMLAH TOTAL RP: Rp " + totRp.toLocaleString("id-ID");
  },

  calcSec3Preview: function() {
    // FIX LOG-B64: Gunakan parseNum aman dari koma desimal Indonesia
    const kg = this.parseNum(document.getElementById("sec3_kg")?.value);
    const harga = this.parseNum(document.getElementById("sec3_harga")?.value);
    const totRp = kg * harga;

    const inputRp = document.getElementById("sec3_rp_input");
    if (inputRp) inputRp.value = "Rp " + totRp.toLocaleString("id-ID");

    const elRp = document.getElementById("sec3PreviewRp");
    if (elRp) elRp.innerText = "TOTAL RP: Rp " + totRp.toLocaleString("id-ID");
  },

  // FIX LOG-B15: Pre-fill form Seksi III saat pakan dipilih dari dropdown
  onSelectSec3Pakan: function(val) {
    const colNew = document.getElementById("sec3ColBaru");
    if (colNew) colNew.style.display = (val === "+ TAMBAH PAKAN BARU") ? "block" : "none";
    const allData = this.getFullData();
    const targetMonth = this.getActiveSaveMonth();
    const monthData = this.ensureMonthData(allData, targetMonth);
    const item = monthData.sec3.find(it => (it.nama || '').toLowerCase() === (val || '').toLowerCase());
    if (item) {
      if (document.getElementById("sec3_kg")) document.getElementById("sec3_kg").value = item.kg > 0 ? item.kg : "";
      if (document.getElementById("sec3_harga")) document.getElementById("sec3_harga").value = item.harga > 0 ? item.harga : "";
    } else {
      if (document.getElementById("sec3_kg")) document.getElementById("sec3_kg").value = "";
      if (document.getElementById("sec3_harga")) document.getElementById("sec3_harga").value = "";
    }
    this.calcSec3Preview();
  },

  calcSec4Preview: function() {
    const namaPakan = document.getElementById("sec4SelectPakan")?.value || "";
    const stokAwalInput = document.getElementById("sec4_stok_awal")?.value;
    // FIX LOG-B64: Gunakan parseNum toleran koma
    const susut = this.parseNum(document.getElementById("sec4_susut")?.value);
    const harga = this.parseNum(document.getElementById("sec4_harga")?.value);

    // FIX Bug L10 & L16: Sync transaksi ke memory dan gunakan targetMonth aktif
    // agar form preview tetap valid meskipun selectedMonth === "ALL".
    const allData = this.getFullData();
    const targetMonth = this.getActiveSaveMonth();
    this.syncMatrixFromTransactions(allData, targetMonth);
    const sec4Items = this.ensureMonthData(allData, targetMonth).sec4 || [];
    const item = sec4Items.find(it => this.isSec4FeedMatch(it.nama, namaPakan) || it.nama === namaPakan) || {};

    const stokAwal = (stokAwalInput !== undefined && stokAwalInput !== "") ? this.parseNum(stokAwalInput) : this.parseNum(item.stok_awal);
    const pembelian = this.parseNum(item.pembelian);
    const penjualan = this.parseNum(item.penjualan);

    const siapJual = stokAwal + pembelian;
    const stokAkhir = Math.max(0, siapJual - penjualan - susut);
    const totRp = stokAkhir * harga;

    const elSa = document.getElementById("sec4PreviewStokAwal");
    const elSiap = document.getElementById("sec4PreviewSiapJual");
    const elAkhir = document.getElementById("sec4PreviewStokAkhir");
    const elRp = document.getElementById("sec4PreviewRp");

    if (elSa) elSa.innerText = "STOK AWAL: " + stokAwal.toLocaleString("id-ID") + " KG";
    if (elSiap) elSiap.innerText = "SIAP JUAL: " + siapJual.toLocaleString("id-ID") + " KG";
    if (elAkhir) elAkhir.innerText = "ESTIMASI STOK AKHIR: " + stokAkhir.toLocaleString("id-ID") + " KG";
    if (elRp) elRp.innerText = "ESTIMASI RP: Rp " + totRp.toLocaleString("id-ID");
  },

  onSelectSec2Pakan: function(val) {
    const colNew = document.getElementById("sec2ColBaru");
    if (colNew) colNew.style.display = (val === "+ TAMBAH PAKAN BARU") ? "block" : "none";
    const allData = this.getFullData();
    // FIX Bug L16: Gunakan ensureMonthData dengan getActiveSaveMonth agar tidak kosong saat "ALL"
    const targetMonth = this.getActiveSaveMonth();
    const monthData = this.ensureMonthData(allData, targetMonth);
    const item = monthData.sec2.find(it => it.nama === val);
    // FIX LOG-B25: Guard null check agar tidak melempar TypeError jika elemen tidak ada di DOM
    const setVal = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
    if (item) {
      setVal("sec2_tunai_kg", item.tunai_kg || "");
      setVal("sec2_tunai_harga", item.tunai_harga || "");
      setVal("sec2_pot_kg", item.pot_kg || "");
      setVal("sec2_pot_harga", item.pot_harga || "");
      setVal("sec2_piu_kg", item.piu_kg || "");
      setVal("sec2_piu_harga", item.piu_harga || "");
      setVal("sec2_bunt_kg", item.bunt_kg || "");
      setVal("sec2_bunt_harga", item.bunt_harga || "");
    } else {
      setVal("sec2_tunai_kg", "");
      setVal("sec2_tunai_harga", "");
      setVal("sec2_pot_kg", "");
      setVal("sec2_pot_harga", "");
      setVal("sec2_piu_kg", "");
      setVal("sec2_piu_harga", "");
      setVal("sec2_bunt_kg", "");
      setVal("sec2_bunt_harga", "");
    }
    this.calcSec2Preview();
  },

  onSelectSec4Pakan: function(val) {
    // FIX LOG-B50: Tampilkan input nama pakan baru jika opsi '+ TAMBAH PAKAN BARU' dipilih
    const colBaru = document.getElementById("sec4ColBaru");
    if (colBaru) colBaru.style.display = (val === "+ TAMBAH PAKAN BARU") ? "block" : "none";

    if (val === "+ TAMBAH PAKAN BARU") {
      // Kosongkan field agar pengguna isi sendiri
      if (document.getElementById("sec4_stok_awal")) document.getElementById("sec4_stok_awal").value = "";
      if (document.getElementById("sec4_susut")) document.getElementById("sec4_susut").value = "";
      if (document.getElementById("sec4_harga")) document.getElementById("sec4_harga").value = "";
      // FIX LOG-B59: Perbarui preview agar badge tidak tertinggal angka dari pakan sebelumnya
      this.calcSec4Preview();
      return;
    }

    const allData = this.getFullData();
    // FIX Bug L16: Gunakan ensureMonthData dengan getActiveSaveMonth agar tidak kosong saat "ALL"
    const targetMonth = this.getActiveSaveMonth();
    // FIX LOG-B44: Sinkronkan matrix dahulu agar stok_awal sudah up-to-date sebelum dibaca
    this.syncMatrixFromTransactions(allData, targetMonth);
    const sec4Items = this.ensureMonthData(allData, targetMonth).sec4 || [];
    const item = sec4Items.find(it => this.isSec4FeedMatch(it.nama, val) || it.nama === val);
    if (item) {
      if (document.getElementById("sec4_stok_awal")) document.getElementById("sec4_stok_awal").value = item.stok_awal || "0";
      if (document.getElementById("sec4_susut")) document.getElementById("sec4_susut").value = item.susut || "0";
      if (document.getElementById("sec4_harga")) document.getElementById("sec4_harga").value = item.harga || "";
    }
    this.calcSec4Preview();
  },

  handleSaveSec2: async function(e) {
    e.preventDefault();
    const form = e.target;
    let namaPakan = form.nama_pakan.value;
    if (namaPakan === "+ TAMBAH PAKAN BARU") {
      namaPakan = form.nama_pakan_custom?.value.trim() || "PAKAN BARU";
    }
    const tKg = this.parseNum(form.tunai_kg?.value);
    const tH = this.parseNum(form.tunai_harga?.value);
    const pKg = this.parseNum(form.pot_kg?.value);
    const pH = this.parseNum(form.pot_harga?.value);
    const iuKg = this.parseNum(form.piu_kg?.value);
    const iuH = this.parseNum(form.piu_harga?.value);
    const bKg = this.parseNum(form.bunt_kg?.value);
    const bH = this.parseNum(form.bunt_harga?.value);

    const targetMonth = this.getActiveSaveMonth();
    const allData = this.getFullData();
    const monthData = this.ensureMonthData(allData, targetMonth);
    const items = monthData.sec2;
    let item = items.find(it => it.nama.toLowerCase() === namaPakan.toLowerCase());

    if (!item) {
      item = { no: items.length + 1, nama: namaPakan, tunai_kg: 0, tunai_harga: 0, tunai_rp: 0, pot_kg: 0, pot_harga: 0, pot_rp: 0, piu_kg: 0, piu_harga: 0, piu_rp: 0, bunt_kg: 0, bunt_harga: 0, bunt_rp: 0, total_kg: 0, total_rp: 0 };
      items.push(item);
    }

    item.tunai_kg = tKg; item.tunai_harga = tH; item.tunai_rp = tKg * tH;
    item.pot_kg = pKg; item.pot_harga = pH; item.pot_rp = pKg * pH;
    item.piu_kg = iuKg; item.piu_harga = iuH; item.piu_rp = iuKg * iuH;
    item.bunt_kg = bKg; item.bunt_harga = bH; item.bunt_rp = bKg * bH;
    item.total_kg = tKg + pKg + iuKg + bKg;
    item.total_rp = item.tunai_rp + item.pot_rp + item.piu_rp + item.bunt_rp;
    // FIX Bug L8: Tandai item ini sebagai manual override agar syncMatrixFromTransactions
    // tidak menimpa nilai yang sudah diinput manual via form Sec2.
    item._manual = true;

    // FIX Bug L30: Sinkronkan ke seluruh matriks/carryover sebelum disimpan agar tidak hilang
    this.syncMatrixFromTransactions(allData, targetMonth);
    this.saveFullData(allData);
    showToast("Data Penjualan Pakan berhasil disimpan!", "success");
    App.render();
  },

  handleSaveSec3: async function(e) {
    e.preventDefault();
    const form = e.target;
    let namaPakan = form.nama_pakan.value;
    // FIX LOG-B19: Dukung input nama pakan baru jika dipilih opsi '+ TAMBAH PAKAN BARU'
    if (namaPakan === "+ TAMBAH PAKAN BARU") {
      namaPakan = form.nama_pakan_custom?.value.trim() || "PAKAN BARU";
    }
    const kg = this.parseNum(form.kg?.value);
    const harga = this.parseNum(form.harga?.value);

    const targetMonth = this.getActiveSaveMonth();
    const allData = this.getFullData();
    const monthData = this.ensureMonthData(allData, targetMonth);
    const items = monthData.sec3;
    let item = items.find(it => it.nama.toLowerCase() === namaPakan.toLowerCase());

    if (!item) {
      item = { no: items.length + 1, nama: namaPakan, kg: 0, harga: 0, rp: 0 };
      items.push(item);
    }

    item.kg = kg;
    item.harga = harga;
    item.rp = kg * harga;

    // FIX LOG-B11: Sinkronkan catatan pembelian pakan ke database LocalBridgeEngine DANAMULYA_DB
    try {
      const rawDb = localStorage.getItem("DANAMULYA_DB");
      if (rawDb) {
        const db = JSON.parse(rawDb);
        if (!db.LOGISTIK_PAKAN_PEMBELIAN) db.LOGISTIK_PAKAN_PEMBELIAN = [];
        const existingIdx = db.LOGISTIK_PAKAN_PEMBELIAN.findIndex(p => p.bulan === targetMonth && (p.nama_pakan || '').toLowerCase() === namaPakan.toLowerCase());

        // FIX LOG-B54: Gunakan tanggal di bulan target, bukan new Date() hari ini
        const monthMap = { JAN:1, FEB:2, MAR:3, APRIL:4, MEI:5, JUNI:6, JULI:7, AGU:8, SEP:9, OKT:10, NOV:11, DES:12 };
        const txMonthNum = monthMap[targetMonth] || new Date().getMonth() + 1;
        const txYear = parseInt(this.selectedYear || new Date().getFullYear(), 10);
        const txMonthStr = String(txMonthNum).padStart(2, "0");
        const tanggalTarget = `${txYear}-${txMonthStr}-01`;

        const trxId = existingIdx >= 0
          ? (db.LOGISTIK_PAKAN_PEMBELIAN[existingIdx].transaction_id || db.LOGISTIK_PAKAN_PEMBELIAN[existingIdx].purchase_id || ("PUR-LOG-" + Date.now().toString(36).toUpperCase()))
          : ("PUR-LOG-" + Date.now().toString(36).toUpperCase());

        const record = {
          // FIX LOG-B55: Simpan transaction_id agar API dapat match lewat field yang tepat
          transaction_id: trxId,
          purchase_id: trxId,
          tanggal: tanggalTarget, // FIX LOG-B54
          bulan: targetMonth,
          nama_pakan: namaPakan,
          jumlah_kg: kg,
          harga_per_kg: harga,
          total_rupiah: kg * harga,
          keterangan: "Input Manual Seksi III (" + targetMonth + ")"
        };
        if (existingIdx >= 0) {
          db.LOGISTIK_PAKAN_PEMBELIAN[existingIdx] = record;
        } else {
          db.LOGISTIK_PAKAN_PEMBELIAN.push(record);
        }
        localStorage.setItem("DANAMULYA_DB", JSON.stringify(db));
      }
    } catch (eDb) {
      console.warn("Gagal sinkronisasi pembelian ke LocalBridge DB:", eDb);
    }

    // FIX Bug L30: Sinkronkan pembelian ke Seksi IV dan carryover stok sebelum disimpan
    this.syncMatrixFromTransactions(allData, targetMonth);
    this.saveFullData(allData);
    showToast("Data Pembelian Pakan berhasil disimpan!", "success");
    App.render();
  },

  handleSaveSec4: async function(e) {
    e.preventDefault();
    const form = e.target;
    // FIX LOG-B50: Dukung input nama pakan baru di Seksi IV
    let namaPakan = form.nama_pakan.value;
    if (namaPakan === "+ TAMBAH PAKAN BARU") {
      namaPakan = (form.nama_pakan_custom?.value || "").trim().toUpperCase() || "PAKAN BARU";
    }
    const stokAwalVal = form.stok_awal ? form.stok_awal.value : "";
    const susut = this.parseNum(form.susut?.value);
    const harga = this.parseNum(form.harga?.value);

    const targetMonth = this.getActiveSaveMonth();
    const allData = this.getFullData();
    const monthData = this.ensureMonthData(allData, targetMonth);
    const sec4Items = monthData.sec4;
    // FIX Bug L29: Pencocokan eksak / agregasi untuk Seksi IV, hindari .includes() yang ambigu
    let item = sec4Items.find(it => this.isSec4FeedMatch(it.nama, namaPakan) || it.nama.trim().toLowerCase() === namaPakan.trim().toLowerCase());

    if (!item) {
      item = { no: sec4Items.length + 1, nama: namaPakan, stok_awal: 0, pembelian: 0, siap_jual: 0, penjualan: 0, susut: 0, stok_akhir: 0, harga: 0, jumlah_rp: 0 };
      sec4Items.push(item);
    }

    if (stokAwalVal !== "") {
      item.stok_awal = this.parseNum(stokAwalVal);
      item._manual_stok_awal = true;
    }
    item.susut = susut;
    item.harga = harga;
    item.siap_jual = (item.stok_awal || 0) + (item.pembelian || 0);
    item.stok_akhir = Math.max(0, item.siap_jual - (item.penjualan || 0) - item.susut);
    item.jumlah_rp = item.stok_akhir * item.harga;

    // FIX Bug L30: Sinkronkan carryover stok ke bulan-bulan berikutnya sebelum disimpan
    this.syncMatrixFromTransactions(allData, targetMonth);
    this.saveFullData(allData);
    showToast("Data Stok Pakan berhasil diperbarui!", "success");
    App.render();
  },

  getTransactions: function() {
    const stored = localStorage.getItem("DANAMULYA_LOGISTIK_TX_V1");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse logistik transactions", e);
      }
    }
    // Default kosong — data demo di bulan Juni, jangan tampil di bulan lain
    const defaultTx = [];
    localStorage.setItem("DANAMULYA_LOGISTIK_TX_V1", JSON.stringify(defaultTx));
    return defaultTx;
  },

  saveTransactions: function(txs) {
    // FIX LOG-B58: Guard QuotaExceededError agar form tidak macet diam-diam
    try {
      localStorage.setItem("DANAMULYA_LOGISTIK_TX_V1", JSON.stringify(txs));
    } catch (e) {
      console.error("[LOG-B58] saveTransactions: QuotaExceededError atau storage diblokir.", e);
      if (typeof showToast === 'function') showToast("Penyimpanan gagal: storage penuh atau diblokir!", "danger");
    }
  },

  getActiveSaveMonth: function() {
    // FIX Bug L3: Jangan hardcode fallback ke 'JUNI'.
    // Gunakan nama bulan saat ini dari tanggal sistem jika selectedMonth tidak valid.
    if (this.selectedMonth && this.selectedMonth !== "ALL") return this.selectedMonth;
    const monthNames = ["JAN","FEB","MAR","APRIL","MEI","JUNI","JULI","AGU","SEP","OKT","NOV","DES"];
    return monthNames[new Date().getMonth()] || "JUNI";
  },

  ensureMonthData: function(allData, monthKey) {
    if (!monthKey || monthKey === "ALL") {
      monthKey = this.getActiveSaveMonth();
    }
    // FIX Bug L20: Template pakan default untuk bulan baru (Juli - Desember)
    // agar tabel tidak kosong dan pewarisan stok awal dari bulan sebelumnya dapat berjalan.
    // FIX LOG-B18: Template Seksi I (Peralatan) untuk bulan baru agar konsisten dengan Excel
    const defaultSec1 = [
      { no: 1, nama: "MILK CAN", stok_awal_unit: 5, stok_awal_harga: 650000, stok_awal_rp: 3250000, pembelian_unit: 0, pembelian_harga: 0, pembelian_rp: 0, penjualan_unit: 0, penjualan_harga: 0, penjualan_rp: 0, stok_akhir_unit: 5, stok_akhir_rp: 3250000 },
      { no: 2, nama: "SARINGAN MILK CAN", stok_awal_unit: 24, stok_awal_harga: 130000, stok_awal_rp: 3120000, pembelian_unit: 0, pembelian_harga: 0, pembelian_rp: 0, penjualan_unit: 0, penjualan_harga: 0, penjualan_rp: 0, stok_akhir_unit: 24, stok_akhir_rp: 3120000 },
      { no: 3, nama: "TIMBA PERAH", stok_awal_unit: 32, stok_awal_harga: 125000, stok_awal_rp: 4000000, pembelian_unit: 0, pembelian_harga: 0, pembelian_rp: 0, penjualan_unit: 0, penjualan_harga: 0, penjualan_rp: 0, stok_akhir_unit: 32, stok_akhir_rp: 4000000 },
      { no: 4, nama: "BRANGUS SAPI", stok_awal_unit: 85, stok_awal_harga: 15000, stok_awal_rp: 1275000, pembelian_unit: 0, pembelian_harga: 0, pembelian_rp: 0, penjualan_unit: 0, penjualan_harga: 0, penjualan_rp: 0, stok_akhir_unit: 85, stok_akhir_rp: 1275000 },
      { no: 5, nama: "ALAT CELUP", stok_awal_unit: 175, stok_awal_harga: 50000, stok_awal_rp: 8750000, pembelian_unit: 0, pembelian_harga: 0, pembelian_rp: 0, penjualan_unit: 0, penjualan_harga: 0, penjualan_rp: 0, stok_akhir_unit: 175, stok_akhir_rp: 8750000 }
    ];
    const defaultSec2 = [
      { no: 1, nama: "MF. A18 AGGT SUB", tunai_kg: 0, tunai_harga: 3900, tunai_rp: 0, pot_kg: 0, pot_harga: 3900, pot_rp: 0, piu_kg: 0, piu_harga: 3900, piu_rp: 0, bunt_kg: 0, bunt_harga: 3900, bunt_rp: 0, total_kg: 0, total_rp: 0 },
      { no: 2, nama: "MAGNESIUM", tunai_kg: 0, tunai_harga: 30000, tunai_rp: 0, pot_kg: 0, pot_harga: 30000, pot_rp: 0, piu_kg: 0, piu_harga: 30000, piu_rp: 0, bunt_kg: 0, bunt_harga: 30000, bunt_rp: 0, total_kg: 0, total_rp: 0 },
      { no: 3, nama: "DCP", tunai_kg: 0, tunai_harga: 25000, tunai_rp: 0, pot_kg: 0, pot_harga: 25000, pot_rp: 0, piu_kg: 0, piu_harga: 25000, piu_rp: 0, bunt_kg: 0, bunt_harga: 25000, bunt_rp: 0, total_kg: 0, total_rp: 0 },
      { no: 4, nama: "MF A20 NON SUB", tunai_kg: 0, tunai_harga: 4500, tunai_rp: 0, pot_kg: 0, pot_harga: 4500, pot_rp: 0, piu_kg: 0, piu_harga: 4500, piu_rp: 0, bunt_kg: 0, bunt_harga: 4500, bunt_rp: 0, total_kg: 0, total_rp: 0 },
      { no: 5, nama: "MF A20 SUB", tunai_kg: 0, tunai_harga: 4200, tunai_rp: 0, pot_kg: 0, pot_harga: 4200, pot_rp: 0, piu_kg: 0, piu_harga: 4200, piu_rp: 0, bunt_kg: 0, bunt_harga: 4200, bunt_rp: 0, total_kg: 0, total_rp: 0 },
      { no: 6, nama: "MF A20 RATIO", tunai_kg: 0, tunai_harga: 4200, tunai_rp: 0, pot_kg: 0, pot_harga: 4200, pot_rp: 0, piu_kg: 0, piu_harga: 4200, piu_rp: 0, bunt_kg: 0, bunt_harga: 4200, bunt_rp: 0, total_kg: 0, total_rp: 0 },
      { no: 7, nama: "MF A20 NON RATIO", tunai_kg: 0, tunai_harga: 4500, tunai_rp: 0, pot_kg: 0, pot_harga: 4500, pot_rp: 0, piu_kg: 0, piu_harga: 4500, piu_rp: 0, bunt_kg: 0, bunt_harga: 4500, bunt_rp: 0, total_kg: 0, total_rp: 0 },
      { no: 8, nama: "MF A20 NON ANGG", tunai_kg: 0, tunai_harga: 4500, tunai_rp: 0, pot_kg: 0, pot_harga: 4500, pot_rp: 0, piu_kg: 0, piu_harga: 4500, piu_rp: 0, bunt_kg: 0, bunt_harga: 4500, bunt_rp: 0, total_kg: 0, total_rp: 0 }
    ];
    const defaultSec4 = [
      { no: 1, nama: "MIX FEED A18", stok_awal: 0, pembelian: 0, siap_jual: 0, penjualan: 0, susut: 0, stok_akhir: 0, harga: 3900, jumlah_rp: 0 },
      { no: 2, nama: "MAGNESIUM", stok_awal: 0, pembelian: 0, siap_jual: 0, penjualan: 0, susut: 0, stok_akhir: 0, harga: 30000, jumlah_rp: 0 },
      { no: 3, nama: "DCP", stok_awal: 0, pembelian: 0, siap_jual: 0, penjualan: 0, susut: 0, stok_akhir: 0, harga: 25000, jumlah_rp: 0 },
      { no: 4, nama: "MIX FEED A20", stok_awal: 0, pembelian: 0, siap_jual: 0, penjualan: 0, susut: 0, stok_akhir: 0, harga: 4200, jumlah_rp: 0 }
    ];

    if (!allData[monthKey]) {
      if (this.defaultFullData[monthKey]) {
        allData[monthKey] = JSON.parse(JSON.stringify(this.defaultFullData[monthKey]));
      } else {
        allData[monthKey] = {
          sec1: JSON.parse(JSON.stringify(defaultSec1)),
          sec2: JSON.parse(JSON.stringify(defaultSec2)),
          sec3: [],
          sec4: JSON.parse(JSON.stringify(defaultSec4))
        };
      }
    }
    if (!allData[monthKey].sec1 || allData[monthKey].sec1.length === 0) {
      allData[monthKey].sec1 = JSON.parse(JSON.stringify(defaultSec1));
    }
    if (!allData[monthKey].sec2 || allData[monthKey].sec2.length === 0) {
      allData[monthKey].sec2 = JSON.parse(JSON.stringify(defaultSec2));
    }
    if (!allData[monthKey].sec3) allData[monthKey].sec3 = [];
    if (!allData[monthKey].sec4 || allData[monthKey].sec4.length === 0) {
      allData[monthKey].sec4 = JSON.parse(JSON.stringify(defaultSec4));
    }
    return allData[monthKey];
  },

  getMonthDataForView: function(allData, targetMonth) {
    const activeMonth = targetMonth || this.selectedMonth;
    if (activeMonth !== "ALL") {
      return this.ensureMonthData(allData, activeMonth);
    }
    const monthsList = ["JAN", "FEB", "MAR", "APRIL", "MEI", "JUNI", "JULI", "AGU", "SEP", "OKT", "NOV", "DES"];
    const aggSec1Map = {};
    const aggSec2Map = {};
    const aggSec3Map = {};
    const aggSec4Map = {};
    monthsList.forEach((mKey, idx) => {
      const md = allData[mKey];
      if (!md) return;

      if (md.sec1 && Array.isArray(md.sec1)) {
        md.sec1.forEach(it => {
          const key = (it.nama || "").trim().toUpperCase();
          if (!aggSec1Map[key]) {
            aggSec1Map[key] = {
              no: Object.keys(aggSec1Map).length + 1,
              nama: it.nama,
              stok_awal_unit: Number(it.stok_awal_unit) || 0,
              stok_awal_harga: Number(it.stok_awal_harga) || 0,
              stok_awal_rp: Number(it.stok_awal_rp) || 0,
              pembelian_unit: 0,
              pembelian_harga: it.pembelian_harga || 0,
              pembelian_rp: 0,
              penjualan_unit: 0,
              penjualan_harga: it.penjualan_harga || 0,
              penjualan_rp: 0,
              stok_akhir_unit: Number(it.stok_akhir_unit) || 0,
              stok_akhir_rp: Number(it.stok_akhir_rp) || 0
            };
          }
          const agg = aggSec1Map[key];
          agg.pembelian_unit += (Number(it.pembelian_unit) || 0);
          agg.pembelian_rp += (Number(it.pembelian_rp) || 0);
          if (it.pembelian_harga) agg.pembelian_harga = it.pembelian_harga;

          agg.penjualan_unit += (Number(it.penjualan_unit) || 0);
          agg.penjualan_rp += (Number(it.penjualan_rp) || 0);
          if (it.penjualan_harga) agg.penjualan_harga = it.penjualan_harga;

          agg.stok_akhir_unit = Number(it.stok_akhir_unit) || 0;
          agg.stok_akhir_rp = Number(it.stok_akhir_rp) || 0;
        });
      }

      if (md.sec2 && Array.isArray(md.sec2)) {
        md.sec2.forEach(it => {
          // FIX LOG-B61: Normalisasi key nama pakan agar konsisten dan tidak terpecah ganda
          const key = (it.nama || "").trim().toUpperCase();
          if (!aggSec2Map[key]) {
            aggSec2Map[key] = {
              no: Object.keys(aggSec2Map).length + 1,
              nama: it.nama,
              tunai_kg: 0, tunai_harga: it.tunai_harga || 0, tunai_rp: 0,
              pot_kg: 0, pot_harga: it.pot_harga || 0, pot_rp: 0,
              piu_kg: 0, piu_harga: it.piu_harga || 0, piu_rp: 0,
              bunt_kg: 0, bunt_harga: it.bunt_harga || 0, bunt_rp: 0,
              total_kg: 0, total_rp: 0
            };
          }
          const agg = aggSec2Map[key];
          agg.tunai_kg += (Number(it.tunai_kg) || 0);
          agg.tunai_rp += (Number(it.tunai_rp) || 0);
          agg.pot_kg += (Number(it.pot_kg) || 0);
          agg.pot_rp += (Number(it.pot_rp) || 0);
          agg.piu_kg += (Number(it.piu_kg) || 0);
          agg.piu_rp += (Number(it.piu_rp) || 0);
          agg.bunt_kg += (Number(it.bunt_kg) || 0);
          agg.bunt_rp += (Number(it.bunt_rp) || 0);
          agg.total_kg += (Number(it.total_kg) || 0);
          agg.total_rp += (Number(it.total_rp) || 0);
          if (it.tunai_harga) agg.tunai_harga = it.tunai_harga;
          if (it.pot_harga) agg.pot_harga = it.pot_harga;
          if (it.piu_harga) agg.piu_harga = it.piu_harga;
          if (it.bunt_harga) agg.bunt_harga = it.bunt_harga;
        });
      }

      if (md.sec3 && Array.isArray(md.sec3)) {
        md.sec3.forEach(it => {
          // FIX LOG-B61: Normalisasi key nama pakan
          const key = (it.nama || "").trim().toUpperCase();
          if (!aggSec3Map[key]) {
            aggSec3Map[key] = { no: Object.keys(aggSec3Map).length + 1, nama: it.nama, kg: 0, harga: it.harga || 0, rp: 0 };
          }
          const agg = aggSec3Map[key];
          agg.kg += (Number(it.kg) || 0);
          agg.rp += (Number(it.rp) || 0);
          if (it.harga) agg.harga = it.harga;
        });
      }

      if (md.sec4 && Array.isArray(md.sec4)) {
        md.sec4.forEach(it => {
          // FIX LOG-B61: Normalisasi key nama pakan
          const key = (it.nama || "").trim().toUpperCase();
          if (!aggSec4Map[key]) {
            aggSec4Map[key] = {
              no: Object.keys(aggSec4Map).length + 1,
              nama: it.nama,
              stok_awal: Number(it.stok_awal) || 0,
              pembelian: 0,
              siap_jual: 0,
              penjualan: 0,
              susut: 0,
              stok_akhir: Number(it.stok_akhir) || 0,
              harga: it.harga || 0,
              jumlah_rp: 0
            };
          }
          const agg = aggSec4Map[key];
          agg.pembelian += (Number(it.pembelian) || 0);
          agg.penjualan += (Number(it.penjualan) || 0);
          agg.susut += (Number(it.susut) || 0);
          agg.stok_akhir = Number(it.stok_akhir) || 0;
          if (it.harga) agg.harga = it.harga;
        });
      }
    });

    const aggSec1List = Object.values(aggSec1Map).map(it => {
      // FIX LOG-B32: Hitung stok akhir tahunan sesuai neraca fisik: Stok Awal + Beli - Jual
      it.stok_akhir_unit = Math.max(0, (it.stok_awal_unit || 0) + (it.pembelian_unit || 0) - (it.penjualan_unit || 0));
      const hg = it.stok_awal_harga || it.pembelian_harga || it.penjualan_harga || 0;
      it.stok_akhir_rp = it.stok_akhir_unit * hg;
      return it;
    });

    const aggSec4List = Object.values(aggSec4Map).map(it => {
      // FIX LOG-B32: Hitung stok akhir tahunan sesuai neraca fisik: Siap Jual - Jual - Susut
      it.siap_jual = (it.stok_awal || 0) + (it.pembelian || 0);
      it.stok_akhir = Math.max(0, it.siap_jual - (it.penjualan || 0) - (it.susut || 0));
      it.jumlah_rp = it.stok_akhir * (it.harga || 0);
      return it;
    });

    return {
      sec1: aggSec1List,
      sec2: Object.values(aggSec2Map),
      sec3: Object.values(aggSec3Map),
      sec4: aggSec4List
    };
  },

  syncMatrixFromTransactions: function(allData, monthKey) {
    const monthsList = ["JAN", "FEB", "MAR", "APRIL", "MEI", "JUNI", "JULI", "AGU", "SEP", "OKT", "NOV", "DES"];
    const monthMap = { JAN:1, FEB:2, MAR:3, APRIL:4, MEI:5, JUNI:6, JULI:7, AGU:8, SEP:9, OKT:10, NOV:11, DES:12 };

    // FIX Bug L15: Normalisasi pakan yang presisi untuk menghindari collision substring
    const cleanFeed = s => this.cleanFeed(s);
    const isExactFeedMatch = (a, b) => this.isExactFeedMatch(a, b);
    const isSec4FeedMatch = (sec4Nama, targetNama) => this.isSec4FeedMatch(sec4Nama, targetNama);

    const allTxs = this.getTransactions();

    // FIX Bug L2: Tentukan tahun target dari selectedYear (default tahun ini)
    const targetYear = parseInt(this.selectedYear || new Date().getFullYear(), 10);

    monthsList.forEach((mKey, idx) => {
      const monthData = this.ensureMonthData(allData, mKey);
      const monthNum = monthMap[mKey];

      // 1. Filter transactions for this specific month AND year
      const txs = allTxs.filter(tx => {
        const tgl = (tx.timestamp || '').split('T')[0] || '';
        if (!tgl) return false;
        const parts = tgl.split('-');
        // FIX Bug L2: Cek tahun juga agar tidak tercampur lintas tahun
        const txYear  = parseInt(parts[0], 10);
        const txMonth = parseInt(parts[1], 10);
        return txYear === targetYear && txMonth === monthNum;
      });

      // 2 & 3. FIX LOG-B1: Sinkronisasi presisi Seksi II (Penjualan) dan Seksi IV (Stok)
      const hasExcelBaseline = (targetYear === 2026 && this.defaultFullData[mKey]);

      if (txs.length > 0) {
        // Ada transaksi harian untuk bulan & tahun ini: reset sec2 & sec4 lalu akumulasikan
        // FIX LOG-B52: Pre-compute feed names yang ada di tx bulan ini untuk menentukan mana yang perlu di-reset
        const txFeedNames = new Set(txs.map(tx => (tx.jenis_pakan || '').trim().toLowerCase()));

        if (monthData.sec2 && Array.isArray(monthData.sec2)) {
          monthData.sec2.forEach(it => {
            // FIX LOG-B52: Jika ada tx nyata untuk pakan ini, hapus _manual lock dan reset
            // Jika tidak ada tx untuk pakan ini bulan ini, pertahankan nilai _manual
            const hasTx = [...txFeedNames].some(txF => isExactFeedMatch(it.nama, txF));
            if (it._manual && !hasTx) return; // pertahankan manual jika tidak ada tx bulan ini
            if (it._manual) delete it._manual; // cabut lock jika ada tx nyata
            it.tunai_kg = 0; it.tunai_rp = 0;
            it.pot_kg = 0; it.pot_rp = 0;
            it.piu_kg = 0; it.piu_rp = 0;
            it.bunt_kg = 0; it.bunt_rp = 0;
            it.total_kg = 0; it.total_rp = 0;
          });
        }
        if (monthData.sec4 && Array.isArray(monthData.sec4)) {
          monthData.sec4.forEach(it => { it.penjualan = 0; });
        }

        // Akumulasikan transaksi harian
        txs.forEach(tx => {
          const feedName = (tx.jenis_pakan || '').trim();
          const qty = Number(tx.jumlah_sak_kg || 0);
          const price = Number(tx.harga_satuan || 0);
          const rp = Number(tx.total_rp || qty * price);
          const metode = tx.metode_pembayaran || 'POTONGAN_RUTIN';

          let sec2Item = monthData.sec2.find(it => isExactFeedMatch(it.nama, feedName));
          if (!sec2Item && feedName) {
            sec2Item = { no: monthData.sec2.length + 1, nama: tx.jenis_pakan, tunai_kg: 0, tunai_harga: price, tunai_rp: 0, pot_kg: 0, pot_harga: price, pot_rp: 0, piu_kg: 0, piu_harga: price, piu_rp: 0, bunt_kg: 0, bunt_harga: price, bunt_rp: 0, total_kg: 0, total_rp: 0 };
            monthData.sec2.push(sec2Item);
          }

          if (sec2Item) {
            if (metode === 'TUNAI') {
              sec2Item.tunai_kg += qty;
              sec2Item.tunai_harga = price || sec2Item.tunai_harga;
              sec2Item.tunai_rp += rp;
            } else if (metode === 'POTONGAN_RUTIN') {
              sec2Item.pot_kg += qty;
              sec2Item.pot_harga = price || sec2Item.pot_harga;
              sec2Item.pot_rp += rp;
            } else if (metode === 'PIUTANG') {
              sec2Item.piu_kg += qty;
              sec2Item.piu_harga = price || sec2Item.piu_harga;
              sec2Item.piu_rp += rp;
            } else if (metode === 'PROGRAM_BUNTING') {
              sec2Item.bunt_kg += qty;
              sec2Item.bunt_harga = price || sec2Item.bunt_harga;
              sec2Item.bunt_rp += rp;
            }
          }

          let sec4Item = monthData.sec4.find(it => isSec4FeedMatch(it.nama, feedName));
          if (sec4Item) {
            sec4Item.penjualan = (sec4Item.penjualan || 0) + qty;
          }
        });
      } else {
        // Tidak ada transaksi harian untuk bulan & tahun ini:
        if (hasExcelBaseline) {
          // Kembalikan ke baseline Excel defaultFullData jika tidak di-override manual
          const baseSec2 = this.defaultFullData[mKey].sec2 || [];
          if (monthData.sec2 && Array.isArray(monthData.sec2)) {
            monthData.sec2.forEach(it => {
              if (it._manual) return;
              const def = baseSec2.find(d => isExactFeedMatch(d.nama, it.nama));
              if (def) {
                it.tunai_kg = def.tunai_kg || 0; it.tunai_harga = def.tunai_harga || 0; it.tunai_rp = def.tunai_rp || 0;
                it.pot_kg = def.pot_kg || 0; it.pot_harga = def.pot_harga || 0; it.pot_rp = def.pot_rp || 0;
                it.piu_kg = def.piu_kg || 0; it.piu_harga = def.piu_harga || 0; it.piu_rp = def.piu_rp || 0;
                it.bunt_kg = def.bunt_kg || 0; it.bunt_harga = def.bunt_harga || 0; it.bunt_rp = def.bunt_rp || 0;
                it.total_kg = def.total_kg || 0; it.total_rp = def.total_rp || 0;
              } else {
                it.tunai_kg = 0; it.tunai_rp = 0; it.pot_kg = 0; it.pot_rp = 0;
                it.piu_kg = 0; it.piu_rp = 0; it.bunt_kg = 0; it.bunt_rp = 0;
                it.total_kg = 0; it.total_rp = 0;
              }
            });
          }
          const baseSec4 = this.defaultFullData[mKey].sec4 || [];
          if (monthData.sec4 && Array.isArray(monthData.sec4)) {
            monthData.sec4.forEach(it => {
              const def4 = baseSec4.find(d => isSec4FeedMatch(d.nama, it.nama));
              it.penjualan = def4 ? (def4.penjualan || 0) : 0;
            });
          }
        } else {
          // Bulan tanpa baseline Excel (JULI-DES atau tahun selain 2026): reset ke 0
          if (monthData.sec2 && Array.isArray(monthData.sec2)) {
            monthData.sec2.forEach(it => {
              if (it._manual) return;
              it.tunai_kg = 0; it.tunai_rp = 0; it.pot_kg = 0; it.pot_rp = 0;
              it.piu_kg = 0; it.piu_rp = 0; it.bunt_kg = 0; it.bunt_rp = 0;
              it.total_kg = 0; it.total_rp = 0;
            });
          }
          if (monthData.sec4 && Array.isArray(monthData.sec4)) {
            monthData.sec4.forEach(it => { it.penjualan = 0; });
          }
        }
      }

      // Sync pembelian dari sec3 ke sec4
      if (monthData.sec4 && Array.isArray(monthData.sec4)) {
        monthData.sec4.forEach(it => {
          if (monthData.sec3 && Array.isArray(monthData.sec3)) {
            const matchedSec3 = monthData.sec3.filter(s3 => isSec4FeedMatch(it.nama, s3.nama));
            const totPemKg = matchedSec3.reduce((sum, s3) => sum + (Number(s3.kg) || 0), 0);
            it.pembelian = totPemKg;
          }
        });
        // FIX LOG-B33: Jika ada pakan di sec3 yang belum terdaftar di sec4, tambahkan agar stok terlacak
        if (monthData.sec3 && Array.isArray(monthData.sec3)) {
          monthData.sec3.forEach(s3 => {
            if (!s3.nama || !s3.nama.trim()) return;
            const exists = monthData.sec4.some(s4 => isSec4FeedMatch(s4.nama, s3.nama));
            if (!exists) {
              const pemKg = Number(s3.kg) || 0;
              const hrg = Number(s3.harga) || 0;
              monthData.sec4.push({
                no: monthData.sec4.length + 1,
                nama: s3.nama.trim(),
                stok_awal: 0,
                pembelian: pemKg,
                siap_jual: pemKg,
                penjualan: 0,
                susut: 0,
                stok_akhir: pemKg,
                harga: hrg,
                jumlah_rp: pemKg * hrg
              });
            }
          });
        }
      }

      // 5. Update totals for sec2
      if (monthData.sec2) {
        monthData.sec2.forEach(it => {
          it.total_kg = (it.tunai_kg || 0) + (it.pot_kg || 0) + (it.piu_kg || 0) + (it.bunt_kg || 0);
          it.total_rp = (it.tunai_rp || 0) + (it.pot_rp || 0) + (it.piu_rp || 0) + (it.bunt_rp || 0);
        });
      }

      // FIX LOG-B26: Sinkronkan penjualan dari sec2 ke sec4 secara deterministik
      // agar input manual via handleSaveSec2 tidak hilang saat txs.length === 0,
      // dan volume penjualan di Seksi II dan Seksi IV selalu 100% konsisten
      if (monthData.sec4 && Array.isArray(monthData.sec4)) {
        monthData.sec4.forEach(it => {
          if (monthData.sec2 && Array.isArray(monthData.sec2)) {
            const matchedSec2 = monthData.sec2.filter(s2 => isSec4FeedMatch(it.nama, s2.nama));
            const totPenKg = matchedSec2.reduce((sum, s2) => sum + (Number(s2.total_kg) || 0), 0);
            it.penjualan = totPenKg;
          }
        });
      }

      // 6. Carryover stok_akhir from previous month into stok_awal of current month
      if (idx > 0) {
        const prevMKey = monthsList[idx - 1];
        const prevMonthData = allData[prevMKey];

        // FIX Bug L37 & LOG-B18: Carryover stok akhir Seksi I (Peralatan) dan teruskan item yang belum ada di bulan berjalan
        if (prevMonthData && prevMonthData.sec1) {
          if (!monthData.sec1) monthData.sec1 = [];
          prevMonthData.sec1.forEach(prevSec1 => {
            let currSec1 = monthData.sec1.find(p => (p.nama || '').toLowerCase().trim() === (prevSec1.nama || '').toLowerCase().trim());
            if (!currSec1) {
              currSec1 = {
                no: monthData.sec1.length + 1,
                nama: prevSec1.nama,
                stok_awal_unit: prevSec1.stok_akhir_unit || 0,
                stok_awal_harga: prevSec1.stok_awal_harga || prevSec1.pembelian_harga || 0,
                stok_awal_rp: (prevSec1.stok_akhir_unit || 0) * (prevSec1.stok_awal_harga || prevSec1.pembelian_harga || 0),
                pembelian_unit: 0,
                pembelian_harga: 0,
                pembelian_rp: 0,
                penjualan_unit: 0,
                penjualan_harga: 0,
                penjualan_rp: 0,
                stok_akhir_unit: prevSec1.stok_akhir_unit || 0,
                stok_akhir_rp: (prevSec1.stok_akhir_unit || 0) * (prevSec1.stok_awal_harga || prevSec1.pembelian_harga || 0)
              };
              monthData.sec1.push(currSec1);
            } else if (!currSec1._manual) {
              currSec1.stok_awal_unit = prevSec1.stok_akhir_unit || 0;
              currSec1.stok_awal_harga = prevSec1.stok_awal_harga || prevSec1.pembelian_harga || currSec1.stok_awal_harga || 0;
              currSec1.stok_awal_rp = currSec1.stok_awal_unit * currSec1.stok_awal_harga;
            }
          });
        }

        // Carryover Seksi IV (Stok Makanan Ternak)
        // FIX LOG-B42: Loop dari prevMonthData.sec4 (bukan currSec4) agar pakan kustom ikut di-carry
        if (prevMonthData && prevMonthData.sec4 && monthData.sec4) {
          // Step A: Update stok_awal pakan yang sudah ada di bulan ini
          monthData.sec4.forEach(currSec4 => {
            if (currSec4._manual_stok_awal) return;
            const prevSec4 = prevMonthData.sec4.find(p => isSec4FeedMatch(p.nama, currSec4.nama));
            if (prevSec4) {
              currSec4.stok_awal = prevSec4.stok_akhir || 0;
            }
          });
          // Step B: Daftarkan pakan kustom dari bulan lalu yang belum ada di bulan ini
          prevMonthData.sec4.forEach(prevSec4 => {
            if ((prevSec4.stok_akhir || 0) <= 0) return; // skip jika stok habis
            const alreadyExists = monthData.sec4.some(c => isSec4FeedMatch(c.nama, prevSec4.nama));
            if (!alreadyExists) {
              // Tambahkan entri baru dengan stok_awal = stok_akhir bulan lalu
              monthData.sec4.push({
                no: monthData.sec4.length + 1,
                nama: prevSec4.nama,
                stok_awal: prevSec4.stok_akhir || 0,
                pembelian: 0,
                siap_jual: prevSec4.stok_akhir || 0,
                penjualan: 0,
                susut: 0,
                stok_akhir: prevSec4.stok_akhir || 0,
                harga: prevSec4.harga || 0,
                jumlah_rp: (prevSec4.stok_akhir || 0) * (prevSec4.harga || 0)
              });
            }
          });
        }
      }

      // 7. Update sec1 totals (stok_akhir_unit, stok_akhir_rp)
      if (monthData.sec1) {
        monthData.sec1.forEach(it => {
          const saU = Number(it.stok_awal_unit || 0);
          const pemU = Number(it.pembelian_unit || 0);
          const penU = Number(it.penjualan_unit || 0);
          it.stok_akhir_unit = Math.max(0, saU + pemU - penU);
          const hg = Number(it.stok_awal_harga || it.pembelian_harga || it.penjualan_harga || 0);
          it.stok_akhir_rp = it.stok_akhir_unit * hg;
        });
      }

      // 8. Update sec4 totals (siap_jual, stok_akhir, jumlah_rp)
      if (monthData.sec4) {
        monthData.sec4.forEach(it => {
          it.siap_jual = (it.stok_awal || 0) + (it.pembelian || 0);
          it.stok_akhir = Math.max(0, it.siap_jual - (it.penjualan || 0) - (it.susut || 0));
          it.jumlah_rp = it.stok_akhir * (it.harga || 0);
        });
      }
    });
  },

  getTransactionsByMonth: function() {
    const monthMap = { JAN:1, FEB:2, MAR:3, APRIL:4, MEI:5, JUNI:6, JULI:7, AGU:8, SEP:9, OKT:10, NOV:11, DES:12 };
    const all = this.getTransactions();
    // FIX Bug L35: Saring transaksi tahun target meskipun selectedMonth === "ALL"
    const targetYear = parseInt(this.selectedYear || new Date().getFullYear(), 10);
    if (this.selectedMonth === 'ALL') {
      return all.filter(tx => {
        const tgl = (tx.timestamp || '').split('T')[0] || '';
        if (!tgl) return true;
        const txYear = parseInt(tgl.split('-')[0], 10);
        return isNaN(txYear) || txYear === targetYear;
      });
    }
    const targetMonth = monthMap[this.selectedMonth];
    if (!targetMonth) return all;
    // FIX Bug L6: Tambah filter tahun agar transaksi lintas tahun tidak tampil
    // di bulan yang sama pada tahun berbeda (misal Jan 2025 muncul di Jan 2026)
    return all.filter(tx => {
      const tgl = (tx.timestamp || '').split('T')[0] || '';
      if (!tgl) return false;
      const parts = tgl.split('-');
      const txYear  = parseInt(parts[0], 10);
      const txMonth = parseInt(parts[1], 10);
      return txYear === targetYear && txMonth === targetMonth;
    });
  },

  getMasterPeternak: function() {
    const stored = localStorage.getItem("DANAMULYA_MASTER_PETERNAK_V4");
    if (stored) {
      try {
        const parsedStored = JSON.parse(stored);
        // FIX Bug L7: Guard sebelumnya >= 50 menyebabkan data peternak < 50 orang
        // selalu ter-reset ke default. Ganti ke > 0 agar data apapun yang tersimpan dipakai.
        if (Array.isArray(parsedStored) && parsedStored.length > 0) {
          return parsedStored;
        }
      } catch (e) {
        console.error("Failed to parse master peternak", e);
      }
    }
    const defaultMaster = (typeof getInitialMasterPeternakList === 'function') ? getInitialMasterPeternakList() : [];
    localStorage.setItem("DANAMULYA_MASTER_PETERNAK_V4", JSON.stringify(defaultMaster));
    return defaultMaster;
  },

  saveMasterPeternak: function(list) {
    // FIX LOG-B58: Guard QuotaExceededError pada penyimpanan master peternak
    try {
      localStorage.setItem("DANAMULYA_MASTER_PETERNAK_V4", JSON.stringify(list));
    } catch (e) {
      console.error("[LOG-B58] saveMasterPeternak: QuotaExceededError atau storage diblokir.", e);
      if (typeof showToast === 'function') showToast("Penyimpanan master peternak gagal: storage penuh!", "danger");
    }
  },

  onFilterKategoriChange: function(kat) {
    const btnRasio = document.getElementById("seg_btn_rasio");
    const btnNonRasio = document.getElementById("seg_btn_non_rasio");
    const cardRasio = document.getElementById("selCardRasio");
    const cardNonRasio = document.getElementById("selCardNonRasio");

    if (btnRasio && btnNonRasio) {
      if (kat === "RASIO") {
        btnRasio.classList.add("active-rasio");
        btnNonRasio.classList.remove("active-non-rasio");
      } else {
        btnNonRasio.classList.add("active-non-rasio");
        btnRasio.classList.remove("active-rasio");
      }
    }

    if (cardRasio && cardNonRasio) {
      if (kat === "RASIO") {
        cardRasio.classList.add("selected");
        cardNonRasio.classList.remove("selected");
      } else {
        cardNonRasio.classList.add("selected");
        cardRasio.classList.remove("selected");
      }
    }

    const selectEl = document.getElementById("tx_peternak_select");
    if (!selectEl) return;
    const master = this.getMasterPeternak();
    const filtered = master.filter(m => m.kategori === kat);
    
    let html = '<option value="">-- Pilih Nama ' + (kat === 'RASIO' ? 'Peternak Anggota' : 'Pembeli Non-Anggota') + ' --</option>';
    filtered.forEach(p => {
      html += `<option value="${p.nama}">${p.nama}</option>`;
    });
    html += '<option value="+ TAMBAH NAMA PETERNAK BARU">+ Tambah Nama ' + (kat === 'RASIO' ? 'Peternak' : 'Pembeli') + ' Baru...</option>';
    
    selectEl.innerHTML = html;
    selectEl.value = "";
    
    const elKodeDisplay = document.getElementById("tx_kode_display");
    const elKodeBadge = document.getElementById("tx_kode_badge");
    const elStatusLabel = document.getElementById("tx_status_label");
    const elKodeInput = document.getElementById("tx_kode_r_nr");
    const elKategoriInput = document.getElementById("tx_kategori_pembeli");
    const elNoAnggotaInput = document.getElementById("tx_nomor_anggota");

    if (elKodeDisplay) elKodeDisplay.innerText = "KODE: " + (kat === "NON_RASIO" ? "NR-0" : "-");
    if (elKodeBadge) {
      elKodeBadge.innerText = kat === "NON_RASIO" ? "NR-SERIES" : "R-SERIES";
      elKodeBadge.className = kat === "NON_RASIO" ? "badge bg-amber rounded-pill px-3 py-2" : "badge bg-emerald rounded-pill px-3 py-2";
    }
    if (elStatusLabel) {
      elStatusLabel.innerText = kat === "NON_RASIO" ? "NON-ANGGOTA (NON-RASIO)" : "ANGGOTA (RASIO)";
    }
    if (elKodeInput) elKodeInput.value = kat === "NON_RASIO" ? "NR-0" : "";
    if (elKategoriInput) elKategoriInput.value = kat;
    if (elNoAnggotaInput) elNoAnggotaInput.value = "0";

    this.onKategoriPembeliChange(kat);
  },

  generateNextKodePeternak: function(kategori) {
    if (kategori === "NON_RASIO") return "NR-0";
    const master = this.getMasterPeternak();
    const rasioItems = master.filter(m => m.kategori === "RASIO");
    // FIX Bug L9: Mulai dari 0 agar nomor urut benar.
    // FIX LOG-B13: Gunakan regex strip karakter non-digit agar format 'R-50' tidak menghasilkan NaN
    let maxNum = 0;
    rasioItems.forEach(m => {
      const rawNum = String(m.nomor_anggota || m.kode || "").replace(/[^0-9]/g, "");
      const num = parseInt(rawNum || "0", 10);
      if (!isNaN(num) && num > maxNum) maxNum = num;
    });
    const nextNum = maxNum + 1;
    return `R-${nextNum}`;
  },

  onPeternakSelectChange: function(val) {
    const boxBaru = document.getElementById("tx_new_peternak_box");
    if (boxBaru) boxBaru.style.display = "none";

    const elKodeDisplay = document.getElementById("tx_kode_display");
    const elKodeBadge = document.getElementById("tx_kode_badge");
    const elStatusLabel = document.getElementById("tx_status_label");
    const elKodeInput = document.getElementById("tx_kode_r_nr");
    const elKategoriInput = document.getElementById("tx_kategori_pembeli");
    const elNoAnggotaInput = document.getElementById("tx_nomor_anggota");

    if (val === "+ TAMBAH NAMA PETERNAK BARU") {
      this.openAddPeternakModal();
    } else if (val) {
      const master = this.getMasterPeternak();
      const item = master.find(m => m.nama === val);
      if (item) {
        if (elKodeDisplay) elKodeDisplay.innerText = "KODE: " + item.kode;
        // FIX Bug L23: Update badge kode peternak dan status label dengan presisi
        if (elKodeBadge) {
          elKodeBadge.innerText = item.kode;
          elKodeBadge.className = item.kategori === "NON_RASIO" ? "badge bg-amber rounded-pill px-3 py-2" : "badge bg-emerald rounded-pill px-3 py-2";
        }
        if (elStatusLabel) {
          elStatusLabel.innerText = item.kategori === "NON_RASIO" ? "NON-ANGGOTA (NON-RASIO)" : "ANGGOTA (RASIO)";
        }
        if (elKodeInput) elKodeInput.value = item.kode;
        if (elKategoriInput) elKategoriInput.value = item.kategori;
        if (elNoAnggotaInput) elNoAnggotaInput.value = item.nomor_anggota;
        this.onKategoriPembeliChange(item.kategori);
      }
    } else {
      // Reset ke nilai default saat pilihan dikosongkan
      const currentKat = elKategoriInput?.value || "RASIO";
      if (elKodeDisplay) elKodeDisplay.innerText = "KODE: -";
      if (elKodeBadge) elKodeBadge.innerText = currentKat === "NON_RASIO" ? "NR-SERIES" : "R-SERIES";
      if (elStatusLabel) elStatusLabel.innerText = currentKat === "NON_RASIO" ? "NON-ANGGOTA (NON-RASIO)" : "ANGGOTA (RASIO)";
      if (elKodeInput) elKodeInput.value = currentKat === "NON_RASIO" ? "NR-0" : "";
      if (elNoAnggotaInput) elNoAnggotaInput.value = "0";
    }
  },

  openAddPeternakModal: function() {
    const currentKat = document.getElementById("tx_kategori_pembeli")?.value || "RASIO";
    
    if (typeof Swal !== "undefined") {
      Swal.fire({
        title: '<i class="bi bi-person-plus-fill text-emerald me-2"></i>Form Pendaftaran Peternak Baru',
        html: `
          <div class="text-start mb-3">
            <label class="form-label extra-small fw-bold text-muted text-uppercase mb-1">Nama Lengkap Peternak / Pembeli Baru</label>
            <input id="swal_input_nama" class="form-control form-control-lg fw-bold border-secondary-subtle" placeholder="Contoh: PAK SUGENG">
          </div>
          <div class="text-start mb-3">
            <label class="form-label extra-small fw-bold text-muted text-uppercase mb-1">Kategori Keanggotaan</label>
            <select id="swal_input_kategori" class="form-select form-select-lg fw-bold">
              <option value="RASIO" ${currentKat === 'RASIO' ? 'selected' : ''}>RASIO (Peternak Anggota Koperasi)</option>
              <option value="NON_RASIO" ${currentKat === 'NON_RASIO' ? 'selected' : ''}>NON-RASIO (Bukan Anggota Koperasi)</option>
            </select>
          </div>
          <div class="text-start">
            <label class="form-label extra-small fw-bold text-muted text-uppercase mb-1">Alamat / Dusun</label>
            <input id="swal_input_alamat" class="form-control fw-semibold" placeholder="Contoh: CLAKET">
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: '<i class="bi bi-check-circle-fill me-1"></i> Simpan & Daftarkan',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#10b981',
        cancelButtonColor: '#64748b',
        focusConfirm: false,
        preConfirm: () => {
          const nama = document.getElementById('swal_input_nama').value.trim();
          const kategori = document.getElementById('swal_input_kategori').value;
          const alamat = document.getElementById('swal_input_alamat').value.trim();
          if (!nama) {
            Swal.showValidationMessage('Nama peternak wajib diisi!');
            return false;
          }
          return { nama, kategori, alamat };
        }
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          const { nama, kategori, alamat } = result.value;
          const kode = this.generateNextKodePeternak(kategori);
          const noAnggota = kategori === "NON_RASIO" ? "0" : kode.replace("R-", "");
          
          const newPeternak = {
            // FIX LOG-B36: Gunakan ID unik base-36 + random suffix anti-collision
            id: "P-" + Date.now().toString(36).toUpperCase() + "-" + Math.floor(1000 + Math.random() * 9000),
            kode: kode,
            nomor_anggota: noAnggota,
            nama: nama,
            alamat: alamat,
            kategori: kategori
          };

          const master = this.getMasterPeternak();
          master.push(newPeternak);
          this.saveMasterPeternak(master);

          // Refresh dropdown & select the new peternak
          this.onFilterKategoriChange(kategori);
          const selectEl = document.getElementById("tx_peternak_select");
          if (selectEl) {
            selectEl.value = nama;
            this.onPeternakSelectChange(nama);
          }

          showToast(`Peternak "${nama}" (${kode}) Berhasil Didaftarkan!`, "success");
        } else {
          const selectEl = document.getElementById("tx_peternak_select");
          if (selectEl) selectEl.value = "";
        }
      });
    } else {
      const nama = prompt("Masukkan Nama Peternak Baru:");
      if (nama && nama.trim()) {
        const kode = this.generateNextKodePeternak(currentKat);
        const noAnggota = currentKat === "NON_RASIO" ? "0" : kode.replace("R-", "");
        const master = this.getMasterPeternak();
        master.push({ id: "P-" + Date.now().toString(36).toUpperCase() + "-" + Math.floor(1000 + Math.random() * 9000), kode, nomor_anggota: noAnggota, nama: nama.trim(), kategori: currentKat });
        this.saveMasterPeternak(master);
        this.onFilterKategoriChange(currentKat);
        const selectEl = document.getElementById("tx_peternak_select");
        if (selectEl) {
          selectEl.value = nama.trim();
          this.onPeternakSelectChange(nama.trim());
        }
      } else {
        const selectEl = document.getElementById("tx_peternak_select");
        if (selectEl) selectEl.value = "";
      }
    }
  },

  onKategoriBaruChange: function(val) {
    const elKodeDisplay = document.getElementById("tx_kode_display");
    const elKodeInput = document.getElementById("tx_kode_r_nr");
    const elKategoriInput = document.getElementById("tx_kategori_pembeli");
    const elNoAnggotaInput = document.getElementById("tx_nomor_anggota");

    const newKode = this.generateNextKodePeternak(val);
    const noAnggota = val === "NON_RASIO" ? "0" : newKode.replace("R-", "");

    if (elKodeDisplay) elKodeDisplay.innerText = "KODE OTOMATIS: " + newKode;
    if (elKodeInput) elKodeInput.value = newKode;
    if (elKategoriInput) elKategoriInput.value = val;
    if (elNoAnggotaInput) elNoAnggotaInput.value = noAnggota;
    this.onKategoriPembeliChange(val);
  },

  calcMultiTxPreview: function() {
    const feedItems = [
      { id: "mf_a20_ratio", price: 4200 },
      { id: "mf_a18_sub", price: 3900 },
      { id: "magnesium", price: 30000 },
      { id: "dcp", price: 25000 },
      { id: "mf_a20_non", price: 4500 }
    ];

    let totalKg = 0;
    let totalRp = 0;

    feedItems.forEach(item => {
      // FIX LOG-B64: Gunakan parseNum aman koma/titik desimal
      const qty = this.parseNum(document.getElementById(`tx_qty_${item.id}`)?.value);
      totalKg += qty;
      totalRp += (qty * item.price);
    });

    const elKg = document.getElementById("tx_total_kg_preview");
    const elRp = document.getElementById("tx_total_rp_preview");

    if (elKg) elKg.innerText = totalKg.toLocaleString("id-ID") + " KG";
    if (elRp) elRp.innerText = "Rp " + totalRp.toLocaleString("id-ID");
  },

  onKategoriPembeliChange: function(val) {
    const elJadwal = document.getElementById("tx_jadwal_penagihan");
    const elMetode = document.getElementById("tx_metode_pembayaran");
    const elNonRasioNotice = document.getElementById("tx_non_rasio_notice");
    const optP1 = document.getElementById("opt_p1");
    const optP2 = document.getElementById("opt_p2");
    const optP3 = document.getElementById("opt_p3");
    const optPiu = document.getElementById("opt_piutang");
    const optBunt = document.getElementById("opt_prog_bunting");

    const inputRatio = document.getElementById("tx_qty_mf_a20_ratio");
    const inputSub = document.getElementById("tx_qty_mf_a18_sub");
    const inputNon = document.getElementById("tx_qty_mf_a20_non");

    if (val === "NON_RASIO") {
      if (elJadwal) elJadwal.value = "TUNAI";
      if (elMetode) elMetode.value = "TUNAI";
      if (optP1) optP1.disabled = true;
      if (optP2) optP2.disabled = true;
      if (optP3) optP3.disabled = true;
      if (optPiu) optPiu.disabled = true;
      if (optBunt) optBunt.disabled = true;
      if (elNonRasioNotice) elNonRasioNotice.style.display = "block";

      // Non-Anggota tidak boleh membeli pakan subsidi jatah anggota
      if (inputRatio) { inputRatio.value = ""; inputRatio.disabled = true; }
      if (inputSub) { inputSub.value = ""; inputSub.disabled = true; }
      if (inputNon) { inputNon.disabled = false; }
    } else {
      if (optP1) optP1.disabled = false;
      if (optP2) optP2.disabled = false;
      if (optP3) optP3.disabled = false;
      if (optPiu) optPiu.disabled = false;
      if (optBunt) optBunt.disabled = false;
      if (elNonRasioNotice) elNonRasioNotice.style.display = "none";
      // FIX Bug L27: Kembalikan jadwal ke P1 dan metode ke POTONGAN_RUTIN jika sebelumnya TUNAI dari non-rasio
      if (elJadwal && elJadwal.value === "TUNAI") {
        elJadwal.value = "P1";
        if (elMetode) elMetode.value = "POTONGAN_RUTIN";
      }
      this.onTanggalPengambilanChange(document.getElementById("tx_tanggal")?.value);

      // Anggota berhak pakan subsidi anggota, pakan non-anggota dinonaktifkan
      if (inputRatio) { inputRatio.disabled = false; }
      if (inputSub) { inputSub.disabled = false; }
      if (inputNon) { inputNon.value = ""; inputNon.disabled = true; }
    }
    this.calcMultiTxPreview();
  },

  onJadwalSelectChange: function(val) {
    const elMetode = document.getElementById("tx_metode_pembayaran");
    if (val === "TUNAI") {
      if (elMetode) elMetode.value = "TUNAI";
    } else if (val === "PROGRAM_BUNTING") {
      if (elMetode) elMetode.value = "PROGRAM_BUNTING";
    } else if (val === "PIUTANG") {
      if (elMetode) elMetode.value = "PIUTANG";
    } else {
      // P1, P2, P3
      if (elMetode) elMetode.value = "POTONGAN_RUTIN";
    }
  },

  onTanggalPengambilanChange: function(val) {
    if (!val) return;
    const kat = document.getElementById("tx_kategori_pembeli")?.value || "RASIO";
    if (kat === "NON_RASIO") return;

    // FIX LOG-B8: Hindari new Date(val).getDate() yang terpengaruh UTC timezone drift
    const day = parseInt((val || "").split("-")[2], 10);
    if (isNaN(day)) return;
    const elJadwal = document.getElementById("tx_jadwal_penagihan");
    if (!elJadwal) return;
    
    // Only auto update if currently set to P1, P2, or P3
    if (["P1", "P2", "P3"].includes(elJadwal.value)) {
      if (day >= 1 && day <= 10) {
        elJadwal.value = "P1";
      } else if (day >= 11 && day <= 20) {
        elJadwal.value = "P2";
      } else {
        elJadwal.value = "P3";
      }
      this.onJadwalSelectChange(elJadwal.value);
    }
  },

  checkBuntingLimit: function(noAnggota, year) {
    if (!noAnggota || noAnggota === "0") return 0;
    const targetYear = parseInt(year || this.selectedYear || new Date().getFullYear(), 10);
    const txs = this.getTransactions();
    // FIX LOG-B20: Sanitasi non-digit agar string awalan 'R-50' tidak menghasilkan NaN !== NaN
    const cleanNoAnggota = String(noAnggota || "").replace(/[^0-9]/g, "");
    // FIX LOG-B43: Jika setelah strip non-digit hasilnya kosong/'0', anggap bukan anggota → return 0
    if (!cleanNoAnggota || cleanNoAnggota === "0") return 0;
    const buntingTxs = txs.filter(t => {
      const cleanTargetNo = String(t.nomor_anggota || "").replace(/[^0-9]/g, "");
      if (!cleanTargetNo) return false; // guard: skip non-anggota yang memiliki nomor kosong
      if (cleanTargetNo !== cleanNoAnggota) return false;
      if (!t.is_program_bunting && t.metode_pembayaran !== "PROGRAM_BUNTING") return false;
      const tgl = (t.timestamp || '').split('T')[0] || '';
      if (!tgl) return true;
      const txYear = parseInt(tgl.split('-')[0], 10);
      return isNaN(txYear) || txYear === targetYear;
    });

    const uniqueTxIds = new Set();
    buntingTxs.forEach(t => {
      // FIX LOG-B21: Pisahkan penanganan ID dari form (TX-xxx-0) vs ID dari API (TRX-LOG-PAK-xxx)
      // agar transaksi API tidak saling menabrak (collision) pada string 'TRX-LOG'
      let baseId;
      const tid = String(t.id || "");
      if (tid.startsWith("TRX-LOG-")) {
        baseId = tid;
      } else {
        baseId = tid.split('-').slice(0, 2).join('-') || (t.timestamp || '').split('T')[0];
      }
      uniqueTxIds.add(baseId);
    });

    return uniqueTxIds.size;
  },

  handleSaveLogistikTx: function(e) {
    e.preventDefault();
    let namaPeternak = document.getElementById("tx_peternak_select")?.value || "";

    if (namaPeternak === "+ TAMBAH NAMA PETERNAK BARU") {
      namaPeternak = document.getElementById("tx_nama_baru")?.value.trim() || "";
      if (!namaPeternak) {
        showAlert("Nama Peternak Wajib", "Silakan masukkan nama peternak baru!", "warning");
        return;
      }
      const katBaru = document.getElementById("tx_kategori_baru")?.value || "RASIO";
      const kodeBaru = this.generateNextKodePeternak(katBaru);
      const noAnggotaBaru = katBaru === "NON_RASIO" ? "0" : kodeBaru.replace("R-", "");

      // Register into master
      const master = this.getMasterPeternak();
      master.push({
        // FIX LOG-B36: Gunakan ID unik base-36 + random suffix anti-collision
        id: "P-" + Date.now().toString(36).toUpperCase() + "-" + Math.floor(1000 + Math.random() * 9000),
        kode: kodeBaru,
        nomor_anggota: noAnggotaBaru,
        nama: namaPeternak,
        kategori: katBaru
      });
      this.saveMasterPeternak(master);

      document.getElementById("tx_kode_r_nr").value = kodeBaru;
      document.getElementById("tx_kategori_pembeli").value = katBaru;
      document.getElementById("tx_nomor_anggota").value = noAnggotaBaru;
    }

    if (!namaPeternak) {
      showAlert("Pilih Peternak", "Silakan pilih nama peternak / pembeli!", "warning");
      return;
    }

    const kodeRNR = document.getElementById("tx_kode_r_nr")?.value || "NR-0";
    const kategori = document.getElementById("tx_kategori_pembeli")?.value || "RASIO";
    const noAnggota = document.getElementById("tx_nomor_anggota")?.value || "0";
    const tgl = document.getElementById("tx_tanggal")?.value || new Date().toISOString().slice(0, 10);
    const wkt = document.getElementById("tx_waktu")?.value || new Date().toTimeString().slice(0, 5);
    const timestampStr = `${tgl}T${wkt}`;

    let jadwalVal = document.getElementById("tx_jadwal_penagihan")?.value || "P1";
    let metode = "POTONGAN_RUTIN";
    let jadwalPenagihan = "P1";
    let isPiutang = (jadwalVal === "PIUTANG");
    let isBunting = (jadwalVal === "PROGRAM_BUNTING");

    if (jadwalVal === "TUNAI") {
      metode = "TUNAI";
      jadwalPenagihan = "-";
    } else if (jadwalVal === "PROGRAM_BUNTING") {
      metode = "PROGRAM_BUNTING";
      isBunting = true;
      jadwalPenagihan = "P1";
    } else if (jadwalVal === "PIUTANG") {
      metode = "PIUTANG";
      isPiutang = true;
      jadwalPenagihan = "P3";
    } else {
      // P1, P2, P3
      metode = "POTONGAN_RUTIN";
      jadwalPenagihan = jadwalVal;
    }

    if (kategori === "NON_RASIO") {
      metode = "TUNAI";
      jadwalPenagihan = "-";
      isPiutang = false;
      isBunting = false;
    }

    if (isBunting) {
      // FIX Bug L34: Teruskan tahun riil dari tanggal form agar pengecekan batas jatah akurat per tahun transaksi
      const txYear = parseInt(tgl.split('-')[0], 10) || parseInt(this.selectedYear || new Date().getFullYear(), 10);
      const countBunting = this.checkBuntingLimit(noAnggota, txYear);
      if (countBunting >= 3) {
        showAlert("Batas Jatah Terlampaui!", `Peternak ${namaPeternak} (${kodeRNR}) sudah menggunakan Program Bunting sebanyak ${countBunting}x di tahun ${txYear} (Maksimal 3x)!`, "error");
        return;
      }
    }

    const feedConfigs = [
      { id: "mf_a20_ratio", name: "MF A20 RATIO", price: 4200 },
      { id: "mf_a18_sub", name: "MF. A18 AGGT SUB", price: 3900 },
      { id: "magnesium", name: "MAGNESIUM", price: 30000 },
      { id: "dcp", name: "DCP", price: 25000 },
      { id: "mf_a20_non", name: "MF A20 NON RATIO", price: 4500 }
    ];

    const selectedFeeds = [];
    feedConfigs.forEach(fc => {
      // FIX LOG-B64: Gunakan parseNum aman koma/titik desimal
      const qty = this.parseNum(document.getElementById(`tx_qty_${fc.id}`)?.value);
      if (qty > 0) {
        selectedFeeds.push({ name: fc.name, qty: qty, price: fc.price, total_rp: qty * fc.price });
      }
    });

    if (selectedFeeds.length === 0) {
      showAlert("Jumlah Pakan Kosong", "Silakan masukkan jumlah (Sak/KG) minimal untuk 1 jenis pakan!", "warning");
      return;
    }

    if (kategori === "NON_RASIO") {
      const hasSubsidized = selectedFeeds.some(f => f.name === "MF A20 RATIO" || f.name === "MF. A18 AGGT SUB");
      if (hasSubsidized) {
        showAlert("Pakan Khusus Anggota", "Pembeli Non-Rasio (Bukan Anggota) tidak dapat membeli pakan bersubsidi anggota. Silakan gunakan 'MF A20 NON RATIO'!", "warning");
        return;
      }
    } else {
      const hasNonMemberFeed = selectedFeeds.some(f => f.name === "MF A20 NON RATIO");
      if (hasNonMemberFeed) {
        showAlert("Pakan Non-Anggota", "Peternak anggota berhak mendapatkan harga jatah/subsidi anggota. Silakan gunakan 'MF A20 RATIO'!", "warning");
        return;
      }
    }

    const txs = this.getTransactions();
    // FIX LOG-B30: Ekstrak targetMonth langsung dari tanggal form transaksi (tgl)
    const txParts = tgl.split('-');
    const txMonthNum = parseInt(txParts[1], 10);
    const monthsList = ["JAN","FEB","MAR","APRIL","MEI","JUNI","JULI","AGU","SEP","OKT","NOV","DES"];
    const targetMonth = monthsList[txMonthNum - 1] || this.getActiveSaveMonth();
    const allData = this.getFullData();
    // FIX LOG-B17: Hapus deklarasi sec2Items dan sec4Items yang tidak terpakai (dead code)
    this.ensureMonthData(allData, targetMonth);

    // FIX Bug L4: Gunakan ID yang lebih unik (base-36 timestamp + index)
    // untuk menghindari collision pada slice(-5) saat loop cepat
    const baseTxId = Date.now().toString(36).toUpperCase();
    selectedFeeds.forEach((sf, index) => {
      const txId = "TX-" + baseTxId + "-" + index;
      const newTx = {
        id: txId,
        timestamp: timestampStr,
        kategori_pembeli: kategori,
        nomor_anggota: noAnggota,
        kode_r_nr: kodeRNR,
        nama_peternak: namaPeternak,
        jenis_pakan: sf.name,
        jumlah_sak_kg: sf.qty,
        harga_satuan: sf.price,
        total_rp: sf.total_rp,
        metode_pembayaran: metode,
        jadwal_penagihan: jadwalPenagihan,
        is_piutang: isPiutang,
        is_program_bunting: isBunting,
        keterangan: ""
      };
      txs.unshift(newTx);

    });

    this.saveTransactions(txs);

    // FIX Bug L15: Gunakan syncMatrixFromTransactions agar sec2 & sec4
    // disinkronkan secara otomatis & akurat menggunakan pencocokan pakan yang tepat
    this.syncMatrixFromTransactions(allData, targetMonth);
    this.saveFullData(allData);

    // FIX LOG-B14: Sinkronkan setiap transaksi baru ke DANAMULYA_DB.LOGISTIK_PAKAN_PENJUALAN
    // agar API getLogistikPenjualan dan rekap backend membaca data yang konsisten
    try {
      const rawDb = localStorage.getItem("DANAMULYA_DB");
      if (rawDb) {
        const db = JSON.parse(rawDb);
        if (!db.LOGISTIK_PAKAN_PENJUALAN) db.LOGISTIK_PAKAN_PENJUALAN = [];
        selectedFeeds.forEach((sf, index) => {
          const txId = "TX-" + baseTxId + "-" + index;
          // Hindari duplikasi jika sudah ada record dengan transaction_id yang sama
          const alreadyExists = db.LOGISTIK_PAKAN_PENJUALAN.some(r => r.transaction_id === txId);
          if (!alreadyExists) {
            db.LOGISTIK_PAKAN_PENJUALAN.push({
              transaction_id: txId,
              tanggal: tgl,
              nama_pakan: sf.name,
              nama_peternak: namaPeternak,
              kategori_pembeli: kategori,
              kode_r_nr: kodeRNR,
              nomor_anggota: noAnggota,
              jumlah_kg: sf.qty,
              harga_per_kg: sf.price,
              total_rupiah: sf.total_rp,
              metode_pembayaran: metode,
              jenis_pembayaran: metode, // FIX LOG-B51: Apps Script logistik.gs membaca jenis_pembayaran
              jadwal_penagihan: jadwalPenagihan,
              is_piutang: isPiutang,
              is_program_bunting: isBunting,
              created_by: "LOGISTIK_UI",
              created_at: new Date().toISOString()
            });
          }
        });
        localStorage.setItem("DANAMULYA_DB", JSON.stringify(db));
      }
    } catch (eDbSync) {
      console.warn("FIX LOG-B14: Gagal sinkronisasi ke DANAMULYA_DB.LOGISTIK_PAKAN_PENJUALAN:", eDbSync);
    }

    // FIX LOG-B12: Setelah simpan, perbarui selectedMonth dan selectedYear ke bulan transaksi
    // agar tampilan langsung berpindah ke bulan yang sesuai dan transaksi baru tampil di list
    {
      const txParts = tgl.split('-');
      const txMonthNum = parseInt(txParts[1], 10);
      const monthsList = ["JAN","FEB","MAR","APRIL","MEI","JUNI","JULI","AGU","SEP","OKT","NOV","DES"];
      if (monthsList[txMonthNum - 1]) this.selectedMonth = monthsList[txMonthNum - 1];
      if (txParts[0]) this.selectedYear = txParts[0];
    }

    // Reset form setelah simpan
    const formEl = document.getElementById('formLogistikTx');
    if (formEl) {
      // Reset semua qty pakan
      ['mf_a20_ratio','mf_a18_sub','magnesium','dcp','mf_a20_non'].forEach(id => {
        const el = document.getElementById('tx_qty_' + id);
        if (el) el.value = '';
      });
    }
    const previewKg = document.getElementById('tx_total_kg_preview');
    const previewRp = document.getElementById('tx_total_rp_preview');
    if (previewKg) previewKg.innerText = '0 KG';
    if (previewRp) previewRp.innerText = 'Rp 0';

    showToast(`Transaksi (${selectedFeeds.length} pakan) berhasil disimpan.`, "success");
    App.render();
  },

  deleteLogistikTx: function(txId) {
    if (confirm(`Apakah Anda yakin ingin menghapus transaksi ID ${txId}?`)) {
      let txs = this.getTransactions();
      // FIX LOG-B65: Filter dual-ID (id atau transaction_id) untuk kebal tabrakan identifier API
      txs = txs.filter(t => t.id !== txId && t.transaction_id !== txId);
      this.saveTransactions(txs);

      // FIX LOG-B2 & LOG-B65: Hapus juga transaksi dari LocalBridgeEngine database
      try {
        const rawDb = localStorage.getItem("DANAMULYA_DB");
        if (rawDb) {
          const db = JSON.parse(rawDb);
          if (db.LOGISTIK_PAKAN_PENJUALAN && Array.isArray(db.LOGISTIK_PAKAN_PENJUALAN)) {
            db.LOGISTIK_PAKAN_PENJUALAN = db.LOGISTIK_PAKAN_PENJUALAN.filter(t => t.transaction_id !== txId && t.id !== txId);
            localStorage.setItem("DANAMULYA_DB", JSON.stringify(db));
          }
        }
      } catch (eDb) {
        console.warn("Gagal menghapus transaksi dari LocalBridgeEngine DB:", eDb);
      }

      // FIX Bug L11 & LOG-B1: Setelah hapus transaksi, sync SEMUA bulan agar sec2/sec4 diperbarui seimbang
      const allData = this.getFullData();
      this.syncMatrixFromTransactions(allData, null);
      this.saveFullData(allData);

      showToast("Transaksi berhasil dihapus!", "info");
      App.render();
    }
  },

  filterTxTable: function() {
    // FIX Bug L21: Kontainer #printableFormPenjualanPakan menggunakan elemen div.ma-tx-card
    const q = (document.getElementById("searchTxInput")?.value || "").toLowerCase().trim();
    const container = document.getElementById("printableFormPenjualanPakan");
    if (!container) return;
    const cards = container.querySelectorAll(".ma-tx-card");
    cards.forEach(card => {
      const txt = card.innerText.toLowerCase();
      card.style.display = txt.includes(q) ? "" : "none";
    });
  },

  fmtNumExcel: function(val) {
    if (val === undefined || val === null || val === "" || val === "-") return "-";
    const n = Number(val);
    if (isNaN(n)) return val;
    return n.toLocaleString("id-ID");
  },

  fmtRpExcel: function(val) {
    if (val === undefined || val === null || val === "" || val === "-" || val === 0) return "-";
    const n = Number(val);
    if (isNaN(n)) return val;
    return n.toLocaleString("id-ID");
  },

  applySheetStyles: function(ws, mainHeaderHex, subHeaderHex, totalHex) {
    if (!ws || !ws["!ref"]) return;
    const range = XLSX.utils.decode_range(ws["!ref"]);
    const mBg = mainHeaderHex || "1B365D";  // Default Navy
    const sBg = subHeaderHex || "334155";   // Default Slate Blue
    const tBg = totalHex || "D1E7DD";       // Default Soft Green

    const borderThin = {
      top: { style: "thin", color: { rgb: "94A3B8" } },
      bottom: { style: "thin", color: { rgb: "94A3B8" } },
      left: { style: "thin", color: { rgb: "94A3B8" } },
      right: { style: "thin", color: { rgb: "94A3B8" } }
    };

    const borderHeader = {
      top: { style: "medium", color: { rgb: "0F172A" } },
      bottom: { style: "medium", color: { rgb: "0F172A" } },
      left: { style: "thin", color: { rgb: "CBD5E1" } },
      right: { style: "thin", color: { rgb: "CBD5E1" } }
    };

    const borderTotal = {
      top: { style: "medium", color: { rgb: "0F172A" } },
      bottom: { style: "double", color: { rgb: "0F172A" } },
      left: { style: "thin", color: { rgb: "94A3B8" } },
      right: { style: "thin", color: { rgb: "94A3B8" } }
    };

    const c2Val = String(ws[XLSX.utils.encode_cell({ r: 2, c: 2 })]?.v || "").toUpperCase();
    const hasSubHeaders = (c2Val === "UNIT" || c2Val === "KG" || c2Val === "SAK/KG");

    // FIX Bug L19: Cek apakah baris terakhir benar-benar baris total (mengandung teks TOTAL/JUMLAH).
    // Jika tidak ada (misal tabel Penjualan Harian tanpa tfoot), baris transaksi terakhir tidak diformat sebagai total.
    let hasTotalRow = false;
    for (let c = range.s.c; c <= Math.min(range.e.c, range.s.c + 3); c++) {
      const v = String(ws[XLSX.utils.encode_cell({ r: range.e.r, c })]?.v || "").toUpperCase();
      if (v.includes("JUMLAH") || v.includes("TOTAL")) {
        hasTotalRow = true;
        break;
      }
    }

    for (let R = range.s.r; R <= range.e.r; ++R) {
      const isTitleRow = (R === 0);
      const isHeaderRow1 = (R === 1);
      const isHeaderRow2 = (R === 2 && hasSubHeaders);
      const isTotalRow = hasTotalRow && (R === range.e.r);

      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[cellRef]) {
          ws[cellRef] = { t: "s", v: "" };
        }
        const cell = ws[cellRef];
        const valStr = String(cell.v || "").trim();

        if (isTitleRow) {
          cell.s = {
            fill: { fgColor: { rgb: "0F172A" } },
            font: { name: "Calibri", sz: 13, bold: true, color: { rgb: "FFFFFF" } },
            alignment: { horizontal: "left", vertical: "center" },
            border: borderThin
          };
        } else if (isHeaderRow1) {
          cell.s = {
            fill: { fgColor: { rgb: mBg } },
            font: { name: "Calibri", sz: 11, bold: true, color: { rgb: "FFFFFF" } },
            alignment: { horizontal: "center", vertical: "center", wrapText: true },
            border: borderHeader
          };
        } else if (isHeaderRow2) {
          cell.s = {
            fill: { fgColor: { rgb: sBg } },
            font: { name: "Calibri", sz: 10, bold: true, color: { rgb: "FFFFFF" } },
            alignment: { horizontal: "center", vertical: "center", wrapText: true },
            border: borderHeader
          };
        } else if (isTotalRow) {
          cell.s = {
            fill: { fgColor: { rgb: tBg } },
            font: { name: "Calibri", sz: 11, bold: true, color: { rgb: "0F172A" } },
            alignment: { horizontal: (C <= 1 || valStr.includes("JUMLAH") || valStr.includes("TOTAL")) ? "left" : (valStr === "-" ? "center" : "right"), vertical: "center" },
            border: borderTotal
          };
        } else {
          // Data Row
          const isEven = (R % 2 === 0);
          const bg = isEven ? "F8FAFC" : "FFFFFF";
          let align = "left";
          if (C === 0 || valStr === "✓" || valStr === "-" || /^\d{4}-\d{2}-\d{2}$/.test(valStr) || /^\d{2}:\d{2}$/.test(valStr) || valStr === "P1" || valStr === "P2" || valStr === "P3") {
            align = "center";
          } else if (/^[\d\.]+$/.test(valStr) || (!isNaN(Number(valStr.replace(/\./g, ""))) && valStr !== "")) {
            align = "right";
          }

          cell.s = {
            fill: { fgColor: { rgb: bg } },
            font: { name: "Calibri", sz: 11, color: { rgb: "1E293B" } },
            alignment: { horizontal: align, vertical: "center" },
            border: borderThin
          };
        }
      }
    }
  },

  buildSheetFromHtml: function(htmlStr, colWidths, mainHeaderHex, subHeaderHex, totalHex) {
    const div = document.createElement("div");
    div.innerHTML = htmlStr;
    const table = div.querySelector("table");
    // FIX LOG-B49: raw:true mencegah SheetJS memparsing '4.200' (Rp ribuan) menjadi 4.2 desimal
    const ws = XLSX.utils.table_to_sheet(table, { raw: false, defval: '' });
    if (colWidths && Array.isArray(colWidths)) {
      ws["!cols"] = colWidths.map(w => ({ wch: w }));
    }
    this.applySheetStyles(ws, mainHeaderHex, subHeaderHex, totalHex);
    return ws;
  },

  buildHtmlSec1: function(monthData) {
    const sec1 = monthData.sec1 || [];
    let totSaUnit = 0, totSaRp = 0, totPemUnit = 0, totPemRp = 0, totPenUnit = 0, totPenRp = 0, totAkUnit = 0, totAkRp = 0;

    let rowsHtml = "";
    sec1.forEach(it => {
      const saU = Number(it.stok_awal_unit) || 0;
      const saH = Number(it.stok_awal_harga) || 0;
      const saRp = Number(it.stok_awal_rp) || (saU * saH);
      const pemU = Number(it.pembelian_unit) || 0;
      const pemH = Number(it.pembelian_harga) || 0;
      const pemRp = Number(it.pembelian_rp) || (pemU * pemH);
      const penU = Number(it.penjualan_unit) || 0;
      const penH = Number(it.penjualan_harga) || 0;
      const penRp = Number(it.penjualan_rp) || (penU * penH);
      // FIX LOG-B28: Pengecekan ketat agar stok akhir fisik 0 tidak tertimpa rumus fallback
      const akU = (it.stok_akhir_unit !== undefined && it.stok_akhir_unit !== null && !isNaN(Number(it.stok_akhir_unit))) ? Number(it.stok_akhir_unit) : Math.max(0, saU + pemU - penU);
      const akRp = (it.stok_akhir_rp !== undefined && it.stok_akhir_rp !== null && !isNaN(Number(it.stok_akhir_rp))) ? Number(it.stok_akhir_rp) : (akU * (saH || pemH || penH));

      totSaUnit += saU; totSaRp += saRp;
      totPemUnit += pemU; totPemRp += pemRp;
      totPenUnit += penU; totPenRp += penRp;
      totAkUnit += akU; totAkRp += akRp;

      rowsHtml += `
        <tr>
          <td>${it.no}</td>
          <td>${it.nama || ''}</td>
          <td>${this.fmtNumExcel(saU)}</td>
          <td>${this.fmtRpExcel(saH)}</td>
          <td>${this.fmtRpExcel(saRp)}</td>
          <td>${this.fmtNumExcel(pemU)}</td>
          <td>${this.fmtRpExcel(pemH)}</td>
          <td>${this.fmtRpExcel(pemRp)}</td>
          <td>${this.fmtNumExcel(penU)}</td>
          <td>${this.fmtRpExcel(penH)}</td>
          <td>${this.fmtRpExcel(penRp)}</td>
          <td>${this.fmtNumExcel(akU)}</td>
          <td>${this.fmtRpExcel(akRp)}</td>
        </tr>
      `;
    });

    return `
      <table>
        <thead>
          <tr>
            <th colspan="13" style="font-weight:bold; font-size:14pt;">I. INVENTARIS PERALATAN DAN PERLENGKAPAN TERNAK — PERIODE ${this.selectedMonth} ${this.selectedYear}</th>
          </tr>
          <tr>
            <th rowspan="2">NO</th>
            <th rowspan="2">NAMA ALAT</th>
            <th colspan="3">STOK AWAL</th>
            <th colspan="3">PEMBELIAN</th>
            <th colspan="3">PENJUALAN</th>
            <th colspan="2">STOK AKHIR</th>
          </tr>
          <tr>
            <th>UNIT</th>
            <th>HARGA</th>
            <th>RP</th>
            <th>UNIT</th>
            <th>HARGA</th>
            <th>RP</th>
            <th>UNIT</th>
            <th>HARGA</th>
            <th>RP</th>
            <th>UNIT</th>
            <th>RP</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="font-weight:bold;">JUMLAH TOTAL</td>
            <td style="font-weight:bold;">${this.fmtNumExcel(totSaUnit)}</td>
            <td>-</td>
            <td style="font-weight:bold;">${this.fmtRpExcel(totSaRp)}</td>
            <td style="font-weight:bold;">${this.fmtNumExcel(totPemUnit)}</td>
            <td>-</td>
            <td style="font-weight:bold;">${this.fmtRpExcel(totPemRp)}</td>
            <td style="font-weight:bold;">${this.fmtNumExcel(totPenUnit)}</td>
            <td>-</td>
            <td style="font-weight:bold;">${this.fmtRpExcel(totPenRp)}</td>
            <td style="font-weight:bold;">${this.fmtNumExcel(totAkUnit)}</td>
            <td style="font-weight:bold;">${this.fmtRpExcel(totAkRp)}</td>
          </tr>
        </tfoot>
      </table>
    `;
  },

  buildHtmlSec2: function(monthData) {
    const sec2 = monthData.sec2 || [];
    let tTKg = 0, tTRp = 0, tPKg = 0, tPRp = 0, tIKg = 0, tIRp = 0, tBKg = 0, tBRp = 0, tTotKg = 0, tTotRp = 0;

    let rowsHtml = "";
    sec2.forEach(it => {
      const tKg = Number(it.tunai_kg) || 0;
      const tH = tKg > 0 ? (Number(it.tunai_harga) || 0) : 0;
      const tRp = Number(it.tunai_rp) || 0;
      const pKg = Number(it.pot_kg) || 0;
      const pH = pKg > 0 ? (Number(it.pot_harga) || 0) : 0;
      const pRp = Number(it.pot_rp) || 0;
      const iKg = Number(it.piu_kg) || 0;
      const iH = iKg > 0 ? (Number(it.piu_harga) || 0) : 0;
      const iRp = Number(it.piu_rp) || 0;
      const bKg = Number(it.bunt_kg) || 0;
      const bH = bKg > 0 ? (Number(it.bunt_harga) || 0) : 0;
      const bRp = Number(it.bunt_rp) || 0;
      const totKg = Number(it.total_kg) || (tKg + pKg + iKg + bKg);
      const totRp = Number(it.total_rp) || (tRp + pRp + iRp + bRp);

      tTKg += tKg; tTRp += tRp;
      tPKg += pKg; tPRp += pRp;
      tIKg += iKg; tIRp += iRp;
      tBKg += bKg; tBRp += bRp;
      tTotKg += totKg; tTotRp += totRp;

      rowsHtml += `
        <tr>
          <td>${it.no}</td>
          <td>${it.nama || ''}</td>
          <td>${this.fmtNumExcel(tKg)}</td>
          <td>${this.fmtRpExcel(tH)}</td>
          <td>${this.fmtRpExcel(tRp)}</td>
          <td>${this.fmtNumExcel(pKg)}</td>
          <td>${this.fmtRpExcel(pH)}</td>
          <td>${this.fmtRpExcel(pRp)}</td>
          <td>${this.fmtNumExcel(iKg)}</td>
          <td>${this.fmtRpExcel(iH)}</td>
          <td>${this.fmtRpExcel(iRp)}</td>
          <td>${this.fmtNumExcel(bKg)}</td>
          <td>${this.fmtRpExcel(bH)}</td>
          <td>${this.fmtRpExcel(bRp)}</td>
          <td>${this.fmtNumExcel(totKg)}</td>
          <td>${this.fmtRpExcel(totRp)}</td>
        </tr>
      `;
    });

    return `
      <table>
        <thead>
          <tr>
            <th colspan="16" style="font-weight:bold; font-size:14pt;">II. PENJUALAN MAKANAN TERNAK (MATRIKS REKAP) — PERIODE ${this.selectedMonth} ${this.selectedYear}</th>
          </tr>
          <tr>
            <th rowspan="2">NO</th>
            <th rowspan="2">NAMA PAKAN</th>
            <th colspan="3">TUNAI</th>
            <th colspan="3">POTONGAN RUTIN (I&amp;II)</th>
            <th colspan="3">PIUTANG (III)</th>
            <th colspan="3">PROGRAM BUNTING</th>
            <th colspan="2">JUMLAH</th>
          </tr>
          <tr>
            <th>KG</th>
            <th>HARGA</th>
            <th>RP</th>
            <th>KG</th>
            <th>HARGA</th>
            <th>RP</th>
            <th>KG</th>
            <th>HARGA</th>
            <th>RP</th>
            <th>KG</th>
            <th>HARGA</th>
            <th>RP</th>
            <th>KG</th>
            <th>RP</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="font-weight:bold;">JUMLAH TOTAL</td>
            <td style="font-weight:bold;">${this.fmtNumExcel(tTKg)}</td>
            <td>-</td>
            <td style="font-weight:bold;">${this.fmtRpExcel(tTRp)}</td>
            <td style="font-weight:bold;">${this.fmtNumExcel(tPKg)}</td>
            <td>-</td>
            <td style="font-weight:bold;">${this.fmtRpExcel(tPRp)}</td>
            <td style="font-weight:bold;">${this.fmtNumExcel(tIKg)}</td>
            <td>-</td>
            <td style="font-weight:bold;">${this.fmtRpExcel(tIRp)}</td>
            <td style="font-weight:bold;">${this.fmtNumExcel(tBKg)}</td>
            <td>-</td>
            <td style="font-weight:bold;">${this.fmtRpExcel(tBRp)}</td>
            <td style="font-weight:bold;">${this.fmtNumExcel(tTotKg)}</td>
            <td style="font-weight:bold;">${this.fmtRpExcel(tTotRp)}</td>
          </tr>
        </tfoot>
      </table>
    `;
  },

  buildHtmlSec3: function(monthData) {
    const sec3 = monthData.sec3 || [];
    let totKg = 0, totRp = 0;

    let rowsHtml = "";
    sec3.forEach(it => {
      const kg = Number(it.kg) || 0;
      const hg = Number(it.harga) || 0;
      const rp = Number(it.rp) || (kg * hg);

      totKg += kg;
      totRp += rp;

      rowsHtml += `
        <tr>
          <td>${it.no}</td>
          <td>${it.nama || ''}</td>
          <td>${this.fmtNumExcel(kg)}</td>
          <td>${this.fmtRpExcel(hg)}</td>
          <td>${this.fmtRpExcel(rp)}</td>
        </tr>
      `;
    });

    return `
      <table>
        <thead>
          <tr>
            <th colspan="5" style="font-weight:bold; font-size:14pt;">III. PEMBELIAN MAKANAN TERNAK — PERIODE ${this.selectedMonth} ${this.selectedYear}</th>
          </tr>
          <tr>
            <th>NO</th>
            <th>NAMA PAKAN</th>
            <th>VOLUME (KG)</th>
            <th>HARGA BELI (RP)</th>
            <th>TOTAL (RP)</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="font-weight:bold;">JUMLAH TOTAL</td>
            <td style="font-weight:bold;">${this.fmtNumExcel(totKg)}</td>
            <td>-</td>
            <td style="font-weight:bold;">${this.fmtRpExcel(totRp)}</td>
          </tr>
        </tfoot>
      </table>
    `;
  },

  buildHtmlSec4: function(monthData) {
    const sec4 = monthData.sec4 || [];
    let totAk = 0, totRp = 0;

    let rowsHtml = "";
    sec4.forEach(it => {
      const sa = Number(it.stok_awal) || 0;
      const pem = Number(it.pembelian) || 0;
      const siap = Number(it.siap_jual) || (sa + pem);
      const pen = Number(it.penjualan) || 0;
      const sus = Number(it.susut) || 0;
      // FIX LOG-B28: Pengecekan ketat agar stok akhir 0 tidak tertimpa rumus fallback
      const ak = (it.stok_akhir !== undefined && it.stok_akhir !== null && !isNaN(Number(it.stok_akhir))) ? Number(it.stok_akhir) : Math.max(0, siap - pen - sus);
      const hg = Number(it.harga) || 0;
      const rp = (it.jumlah_rp !== undefined && it.jumlah_rp !== null && !isNaN(Number(it.jumlah_rp))) ? Number(it.jumlah_rp) : (ak * hg);

      totAk += ak;
      totRp += rp;

      rowsHtml += `
        <tr>
          <td>${it.no}</td>
          <td>${it.nama || ''}</td>
          <td>${this.fmtNumExcel(sa)}</td>
          <td>${this.fmtNumExcel(pem)}</td>
          <td>${this.fmtNumExcel(siap)}</td>
          <td>${this.fmtNumExcel(pen)}</td>
          <td>${this.fmtNumExcel(sus)}</td>
          <td>${this.fmtNumExcel(ak)}</td>
          <td>${this.fmtRpExcel(hg)}</td>
          <td>${this.fmtRpExcel(rp)}</td>
        </tr>
      `;
    });

    return `
      <table>
        <thead>
          <tr>
            <th colspan="10" style="font-weight:bold; font-size:14pt;">IV. STOK MAKANAN TERNAK — PERIODE ${this.selectedMonth} ${this.selectedYear}</th>
          </tr>
          <tr>
            <th>NO</th>
            <th>NAMA PAKAN</th>
            <th>STOK AWAL (KG)</th>
            <th>PEMBELIAN (KG)</th>
            <th>SIAP JUAL (KG)</th>
            <th>PENJUALAN (KG)</th>
            <th>SUSUT (KG)</th>
            <th>STOK AKHIR (KG)</th>
            <th>HARGA (RP)</th>
            <th>JUMLAH (RP)</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="7" style="font-weight:bold;">TOTAL JUMLAH KESELURUHAN (STOK AKHIR &amp; RP):</td>
            <td style="font-weight:bold;">${this.fmtNumExcel(totAk)}</td>
            <td>-</td>
            <td style="font-weight:bold;">${this.fmtRpExcel(totRp)}</td>
          </tr>
        </tfoot>
      </table>
    `;
  },

  buildHtmlPenjualanHarian: function(txs) {
    const todayStr = new Date().toISOString().slice(0, 10);
    let rowsHtml = "";
    let totalKg = 0;
    let totalRp = 0;

    txs.forEach(tx => {
      const kodeRNR = tx.kode_r_nr || (tx.kategori_pembeli === "RASIO" ? `R-${tx.nomor_anggota}` : `NR-0`);
      const dtParts = (tx.timestamp || "").split("T");
      const tgl = dtParts[0] || todayStr;
      // FIX LOG-B29: Format waktu tepat HH:mm agar cocok regex /^\d{2}:\d{2}$/ dan rata tengah di Excel
      const rawWkt = tx.waktu || dtParts[1] || "08:00";
      const wkt = rawWkt.length >= 5 ? rawWkt.substring(0, 5) : rawWkt;

      const isBunting = tx.is_program_bunting || tx.metode_pembayaran === "PROGRAM_BUNTING";
      const isPiutang = tx.metode_pembayaran === "PIUTANG";
      const isTunai = tx.metode_pembayaran === "TUNAI" || tx.jadwal_penagihan === "TUNAI";

      const qty = Number(tx.jumlah_sak_kg || 0);
      const hg = Number(tx.harga_satuan || 0);
      const rp = Number(tx.total_rp || (qty * hg));
      totalKg += qty;
      totalRp += rp;

      rowsHtml += `
        <tr>
          <td>${kodeRNR}</td>
          <td style="text-align:left;">${tx.nama_peternak || ''}</td>
          <td>${tx.jenis_pakan || ''}</td>
          <td>${this.fmtNumExcel(qty)}</td>
          <td>${this.fmtRpExcel(hg)}</td>
          <td style="font-weight:600;">${this.fmtRpExcel(rp)}</td>
          <td>${tgl}</td>
          <td>${wkt}</td>
          <td>${isTunai ? "✓" : ""}</td>
          <td>${(!isTunai && !isBunting && !isPiutang && tx.jadwal_penagihan === "P1") ? "✓" : ""}</td>
          <td>${(!isTunai && !isBunting && !isPiutang && tx.jadwal_penagihan === "P2") ? "✓" : ""}</td>
          <td>${(!isTunai && !isBunting && !isPiutang && tx.jadwal_penagihan === "P3") ? "✓" : ""}</td>
          <td>${isPiutang ? "✓" : ""}</td>
          <td>${isBunting ? "✓" : ""}</td>
        </tr>
      `;
    });

    return `
      <table>
        <thead>
          <tr>
            <th colspan="14" style="font-weight:bold; font-size:14pt;">FORM PENJUALAN PAKAN LOGISTIK — PERIODE ${this.selectedMonth} ${this.selectedYear}</th>
          </tr>
          <tr>
            <th>KODE R/NR</th>
            <th>Nama Peternak</th>
            <th>Nama Pakan</th>
            <th>Sak/KG</th>
            <th>Harga/KG</th>
            <th>Total (RP)</th>
            <th>Tanggal</th>
            <th>Waktu</th>
            <th>Tunai</th>
            <th>P1</th>
            <th>P2</th>
            <th>P3</th>
            <th>Piutang</th>
            <th>Program Bunting (IB)</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="font-weight:bold; text-align:left;">JUMLAH TOTAL (${txs.length} TRANSAKSI)</td>
            <td style="font-weight:bold;">${this.fmtNumExcel(totalKg)}</td>
            <td>-</td>
            <td style="font-weight:bold;">${this.fmtRpExcel(totalRp)}</td>
            <td colspan="8">-</td>
          </tr>
        </tfoot>
      </table>
    `;
  },

  exportExcelPenjualanPakanHarian: function() {
    if (typeof XLSX === "undefined") {
      showAlert("Error", "Library XLSX belum dimuat. Pastikan koneksi internet terhubung.", "error");
      return;
    }

    const txs = this.getTransactionsByMonth();
    const todayStr = new Date().toISOString().slice(0, 10);
    const htmlStr = this.buildHtmlPenjualanHarian(txs);
    // FIX LOG-B6: 14 kolom presisi termasuk kolom Tunai & Total (RP)
    const colWidths = [14, 24, 20, 10, 14, 16, 12, 10, 8, 6, 6, 6, 10, 24];
    const ws = this.buildSheetFromHtml(htmlStr, colWidths, "0F766E", "115E59", "CCFBF1");

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Penjualan ${this.selectedMonth} ${this.selectedYear}`);

    const fileName = `FORM_PENJUALAN_PAKAN_${this.selectedMonth}_${this.selectedYear}_${todayStr}.xlsx`;
    XLSX.writeFile(wb, fileName);
    showToast(`Excel penjualan harian berhasil diunduh.`, "success");
  },

  getPreparedMonthData: function() {
    if (typeof XLSX === "undefined") {
      showAlert("Error", "Library XLSX belum dimuat. Pastikan koneksi internet terhubung.", "error");
      return null;
    }
    const activeMonth = this.getActiveSaveMonth();
    const allData = this.getFullData();
    // Sinkronkan transaksi ke matriks sebelum export
    this.syncMatrixFromTransactions(allData, activeMonth);
    return this.getMonthDataForView(allData);
  },

  exportExcelSec1: function() {
    const monthData = this.getPreparedMonthData();
    if (!monthData) return;
    const htmlStr = this.buildHtmlSec1(monthData);
    const colWidths = [6, 28, 10, 14, 16, 10, 14, 16, 10, 14, 16, 12, 16];
    const ws = this.buildSheetFromHtml(htmlStr, colWidths, "1B365D", "334155", "D1E7DD");

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Seksi I - Inventaris");
    XLSX.writeFile(wb, `LOGISTIK_SEKSI_1_INVENTARIS_${this.selectedMonth}_${this.selectedYear}.xlsx`);
    showToast("Excel Seksi I berhasil diunduh.", "success");
  },

  exportExcelSec2: function() {
    const monthData = this.getPreparedMonthData();
    if (!monthData) return;
    const htmlStr = this.buildHtmlSec2(monthData);
    const colWidths = [6, 26, 10, 12, 15, 10, 12, 15, 10, 12, 15, 10, 12, 15, 12, 16];
    const ws = this.buildSheetFromHtml(htmlStr, colWidths, "065F46", "047857", "D1E7DD");

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Seksi II - Penjualan");
    XLSX.writeFile(wb, `LOGISTIK_SEKSI_2_PENJUALAN_${this.selectedMonth}_${this.selectedYear}.xlsx`);
    showToast("Excel Seksi II berhasil diunduh.", "success");
  },

  exportExcelSec3: function() {
    const monthData = this.getPreparedMonthData();
    if (!monthData) return;
    const htmlStr = this.buildHtmlSec3(monthData);
    const colWidths = [6, 30, 16, 16, 20];
    const ws = this.buildSheetFromHtml(htmlStr, colWidths, "1E40AF", "1E3A8A", "DBEAFE");

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Seksi III - Pembelian");
    XLSX.writeFile(wb, `LOGISTIK_SEKSI_3_PEMBELIAN_${this.selectedMonth}_${this.selectedYear}.xlsx`);
    showToast("Excel Seksi III berhasil diunduh.", "success");
  },

  exportExcelSec4: function() {
    const monthData = this.getPreparedMonthData();
    if (!monthData) return;
    const htmlStr = this.buildHtmlSec4(monthData);
    const colWidths = [6, 28, 16, 16, 16, 16, 14, 16, 14, 20];
    const ws = this.buildSheetFromHtml(htmlStr, colWidths, "3730A3", "312E81", "E0E7FF");

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Seksi IV - Stok Pakan");
    XLSX.writeFile(wb, `LOGISTIK_SEKSI_4_STOK_${this.selectedMonth}_${this.selectedYear}.xlsx`);
    showToast("Excel Seksi IV berhasil diunduh.", "success");
  },

  exportExcelRekapBulananCombined: function() {
    const monthData = this.getPreparedMonthData();
    if (!monthData) return;

    const wb = XLSX.utils.book_new();

    // --- SHEET 1: SEKSI I ---
    const ws1 = this.buildSheetFromHtml(
      this.buildHtmlSec1(monthData),
      [6, 28, 10, 14, 16, 10, 14, 16, 10, 14, 16, 12, 16],
      "1B365D", "334155", "D1E7DD"
    );
    XLSX.utils.book_append_sheet(wb, ws1, "I. Inventaris Peralatan");

    // --- SHEET 2: SEKSI II ---
    const ws2 = this.buildSheetFromHtml(
      this.buildHtmlSec2(monthData),
      [6, 26, 10, 12, 15, 10, 12, 15, 10, 12, 15, 10, 12, 15, 12, 16],
      "065F46", "047857", "D1E7DD"
    );
    XLSX.utils.book_append_sheet(wb, ws2, "II. Penjualan Pakan");

    // --- SHEET 3: SEKSI III ---
    const ws3 = this.buildSheetFromHtml(
      this.buildHtmlSec3(monthData),
      [6, 30, 16, 16, 20],
      "1E40AF", "1E3A8A", "DBEAFE"
    );
    XLSX.utils.book_append_sheet(wb, ws3, "III. Pembelian Pakan");

    // --- SHEET 4: SEKSI IV ---
    const ws4 = this.buildSheetFromHtml(
      this.buildHtmlSec4(monthData),
      [6, 28, 16, 16, 16, 16, 14, 16, 14, 20],
      "3730A3", "312E81", "E0E7FF"
    );
    XLSX.utils.book_append_sheet(wb, ws4, "IV. Stok Pakan");

    // --- SHEET 5: TRANSAKSI HARIAN ---
    const txs = this.getTransactionsByMonth();
    // FIX LOG-B7: 14 kolom presisi selaras dengan tabel form penjualan harian
    const ws5 = this.buildSheetFromHtml(
      this.buildHtmlPenjualanHarian(txs),
      [14, 24, 20, 10, 14, 16, 12, 10, 8, 6, 6, 6, 10, 24],
      "0F766E", "115E59", "CCFBF1"
    );
    XLSX.utils.book_append_sheet(wb, ws5, "Form Penjualan Harian");

    const fileName = `LAPORAN_REKAP_LOGISTIK_GABUNGAN_${this.selectedMonth}_${this.selectedYear}.xlsx`;
    XLSX.writeFile(wb, fileName);
    showToast(`Rekap bulanan berhasil diunduh.`, "success");
  },

  printPenjualanPakanHarian: function() {
    // FIX Bug L22: Cetak tabel resmi buildHtmlPenjualanHarian, bukan printEl.innerHTML (kartu mobile ber-icon sampah)
    const txs = this.getTransactionsByMonth();
    const tableHtml = this.buildHtmlPenjualanHarian(txs);
    const win = window.open("", "_blank");
    if (!win) {
      showAlert("Popup Diblokir", "Izinkan popup di browser Anda untuk mencetak laporan ini, lalu coba lagi.", "warning");
      return;
    }
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>FORM PENJUALAN PAKAN LOGISTIK — ${this.selectedMonth} ${this.selectedYear}</title>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; padding: 24px; color: #0f172a; background: #fff; }
            .print-header { text-align: center; margin-bottom: 18px; border-bottom: 2px solid #0f766e; padding-bottom: 12px; }
            .print-title { font-size: 16pt; font-weight: 800; color: #0f766e; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; }
            .print-subtitle { font-size: 10pt; color: #64748b; margin-top: 4px; }
            table { width: 100%; border-collapse: collapse; margin-top: 12px; }
            th, td { border: 1px solid #cbd5e1 !important; padding: 6px 8px; text-align: center; font-size: 9.5pt; color: #1e293b !important; }
            thead th { background-color: #0f766e !important; color: #ffffff !important; font-weight: 700; border-color: #0f766e !important; }
            tfoot td { background-color: #ccfbf1 !important; font-weight: 700; border-color: #99f6e4 !important; }
            tr:nth-child(even) td { background-color: #f8fafc; }
            .text-start { text-align: left !important; }
            @media print {
              @page { size: landscape; margin: 8mm; }
              body { padding: 0; }
            }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          <div class="print-header">
            <div class="print-title">KOPERASI AGRIBISNIS DANA MULYA PACET</div>
            <div class="print-subtitle">DIVISI LOGISTIK — FORM LAPORAN PENJUALAN PAKAN HARIAN (PERIODE: ${this.selectedMonth} ${this.selectedYear})</div>
          </div>
          ${tableHtml}
        </body>
      </html>
    `);
    win.document.close();
  },

  onSelectSec1Alat: function(val) {
    const colNew = document.getElementById("sec1ColBaru");
    if (colNew) colNew.style.display = (val === "+ TAMBAH ALAT BARU") ? "block" : "none";
    const allData = this.getFullData();
    // FIX Bug L13: Gunakan ensureMonthData agar bulan yang belum ada
    // diinisialisasi terlebih dahulu, bukan fallback ke {} yang menyesatkan.
    const monthData = this.ensureMonthData(allData, this.selectedMonth);
    const items = monthData.sec1 || [];
    const item = items.find(it => it.nama === val);

    if (item) {
      if (document.getElementById("sec1_pembelian_unit")) document.getElementById("sec1_pembelian_unit").value = "";
      if (document.getElementById("sec1_pembelian_harga")) document.getElementById("sec1_pembelian_harga").value = item.pembelian_harga || item.stok_awal_harga || "";
      if (document.getElementById("sec1_penjualan_unit")) document.getElementById("sec1_penjualan_unit").value = "";
      if (document.getElementById("sec1_penjualan_harga")) document.getElementById("sec1_penjualan_harga").value = item.penjualan_harga || item.stok_awal_harga || "";
    } else {
      if (document.getElementById("sec1_pembelian_unit")) document.getElementById("sec1_pembelian_unit").value = "";
      if (document.getElementById("sec1_pembelian_harga")) document.getElementById("sec1_pembelian_harga").value = "";
      if (document.getElementById("sec1_penjualan_unit")) document.getElementById("sec1_penjualan_unit").value = "";
      if (document.getElementById("sec1_penjualan_harga")) document.getElementById("sec1_penjualan_harga").value = "";
    }
    this.calcSec1Preview();
  },

  calcSec1Preview: function() {
    const val = document.getElementById("sec1SelectAlat")?.value;
    const allData = this.getFullData();
    // FIX Bug L16: Gunakan targetMonth aktif agar form preview tidak kosong saat "ALL"
    const targetMonth = this.getActiveSaveMonth();
    const monthData = this.ensureMonthData(allData, targetMonth);
    const items = monthData.sec1 || [];
    const item = items.find(it => it.nama === val);

    const saUnit = this.parseNum(item?.stok_awal_unit);
    const saHarga = this.parseNum(item?.stok_awal_harga);

    // FIX LOG-B64: Gunakan parseNum toleran koma
    const pemUnit = this.parseNum(document.getElementById("sec1_pembelian_unit")?.value);
    const pemHarga = this.parseNum(document.getElementById("sec1_pembelian_harga")?.value);
    const pemRp = pemUnit * pemHarga;

    const penUnit = this.parseNum(document.getElementById("sec1_penjualan_unit")?.value);
    const penHarga = this.parseNum(document.getElementById("sec1_penjualan_harga")?.value);
    const penRp = penUnit * penHarga;

    const elPemRp = document.getElementById("sec1_pembelian_rp_input");
    const elPenRp = document.getElementById("sec1_penjualan_rp_input");
    const elSaBadge = document.getElementById("sec1PreviewStokAwal");

    if (elSaBadge) elSaBadge.innerText = "STOK AWAL: " + saUnit.toLocaleString("id-ID") + " UNIT";
    if (elPemRp) {
      if ("value" in elPemRp && elPemRp.tagName === "INPUT") elPemRp.value = "Rp " + pemRp.toLocaleString("id-ID");
      else elPemRp.innerText = "BELI: Rp " + pemRp.toLocaleString("id-ID");
    }
    if (elPenRp) {
      if ("value" in elPenRp && elPenRp.tagName === "INPUT") elPenRp.value = "Rp " + penRp.toLocaleString("id-ID");
      else elPenRp.innerText = "JUAL: Rp " + penRp.toLocaleString("id-ID");
    }

    const stokAkhirUnit = Math.max(0, saUnit + pemUnit - penUnit);
    const stokAkhirRp = stokAkhirUnit * (saHarga || pemHarga || penHarga);

    const elAkhirUnit = document.getElementById("sec1PreviewStokAkhirUnit");
    const elAkhirRp = document.getElementById("sec1PreviewStokAkhirRp");

    if (elAkhirUnit) elAkhirUnit.innerText = stokAkhirUnit.toLocaleString("id-ID") + " UNIT";
    if (elAkhirRp) elAkhirRp.innerText = "Rp " + stokAkhirRp.toLocaleString("id-ID");
  },

  handleSaveSec1: async function(e) {
    e.preventDefault();
    const form = e.target;
    let namaAlat = form.nama_alat.value;
    if (namaAlat === "+ TAMBAH ALAT BARU") {
      namaAlat = form.nama_alat_custom.value.trim() || "ALAT BARU";
    }

    const pemUnit = this.parseNum(form.pembelian_unit.value);
    const pemHarga = this.parseNum(form.pembelian_harga.value);
    const penUnit = this.parseNum(form.penjualan_unit.value);
    const penHarga = this.parseNum(form.penjualan_harga.value);

    const targetMonth = this.getActiveSaveMonth();
    const allData = this.getFullData();
    const monthData = this.ensureMonthData(allData, targetMonth);
    const sec1Items = monthData.sec1;
    let item = sec1Items.find(it => it.nama.toLowerCase() === namaAlat.toLowerCase());

    if (!item) {
      item = { no: sec1Items.length + 1, nama: namaAlat, stok_awal_unit: 0, stok_awal_harga: pemHarga || penHarga || 0, stok_awal_rp: 0, pembelian_unit: 0, pembelian_harga: 0, pembelian_rp: 0, penjualan_unit: 0, penjualan_harga: 0, penjualan_rp: 0, stok_akhir_unit: 0, stok_akhir_rp: 0 };
      sec1Items.push(item);
    }

    const saUnit = Number(item.stok_awal_unit || 0);
    const saHarga = Number(item.stok_awal_harga || pemHarga || 0);

    // FIX Bug L32: Tetapkan nilai secara presisi (bukan += akumulatif tak terkendali),
    // sehingga input typo bisa diperbaiki dan nilai 0 bisa di-reset dengan benar.
    item.pembelian_unit = pemUnit;
    item.pembelian_harga = pemHarga || saHarga;
    item.pembelian_rp = pemUnit * item.pembelian_harga;

    item.penjualan_unit = penUnit;
    item.penjualan_harga = penHarga || saHarga;
    item.penjualan_rp = penUnit * item.penjualan_harga;

    item.stok_akhir_unit = Math.max(0, saUnit + pemUnit - penUnit);
    item.stok_akhir_rp = item.stok_akhir_unit * (saHarga || item.pembelian_harga || item.penjualan_harga || 0);

    // Tandai manual override agar tidak tertimpa
    item._manual = true;

    // FIX Bug L1 & L37: Simpan dan sinkronkan carryover ke bulan-bulan berikutnya
    allData[targetMonth].sec1 = sec1Items;
    this.syncMatrixFromTransactions(allData, targetMonth);
    this.saveFullData(allData);
    showToast(`Data Inventaris Peralatan (${namaAlat}) Berhasil Disimpan!`, "success");
    App.render();
  }
};

window.LogistikModule = LogistikModule;

