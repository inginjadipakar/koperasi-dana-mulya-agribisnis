/**
 * ============================================================
 * DEPOT.JS — MODUL VISUAL & INTERAKTIF DIVISI DEPOT SUSU
 * PRESISE 100% TERDIRI DARI LAPORAN PENERIMAAN & PENGELUARAN EXCEL
 * 1:1 SINKRON DENGAN SHEET EXCEL (JANUARI - JULI 2026)
 * ============================================================
 */

const DepotModule = {
  selectedYear: (new Date().getFullYear()).toString(),
  selectedMonth: (["JAN", "FEB", "MAR", "APR", "MEI", "JUNI", "JULI", "AGU", "SEP", "OKT", "NOV", "DES"])[new Date().getMonth()] || "SEP",
  
  getAvailableYears: function() {
    const current = (new Date().getFullYear()).toString();
    const set = new Set(["2026", current]);
    return Array.from(set).sort();
  },

  // ============================================================
  // MASTER AGEN LIST — persisted in localStorage
  // ============================================================
  DEFAULT_AGEN: [
    "HERU","JAINAL","YULI","NINDRI","ISA","USMAN",
    "GRESIK","KARYAWAN","SUDAR","FX. MUNIR","PURI",
    "PAK MUL SAMPURNA","UMUM"
  ],

  getAgenList: function() {
    try {
      const stored = localStorage.getItem('depot_agen_list');
      const extra = stored ? JSON.parse(stored) : [];
      // Merge defaults + custom, deduplicate, sort
      const all = [...new Set([...this.DEFAULT_AGEN, ...extra])];
      return all.sort((a, b) => {
        // Keep defaults in original order first, custom names at end
        const ia = this.DEFAULT_AGEN.indexOf(a);
        const ib = this.DEFAULT_AGEN.indexOf(b);
        if (ia !== -1 && ib !== -1) return ia - ib;
        if (ia !== -1) return -1;
        if (ib !== -1) return 1;
        return a.localeCompare(b);
      });
    } catch(e) {
      return [...this.DEFAULT_AGEN];
    }
  },

  saveAgenToLocal: function(nama) {
    try {
      const stored = localStorage.getItem('depot_agen_list');
      const extra = stored ? JSON.parse(stored) : [];
      const namaUpper = nama.trim().toUpperCase();
      if (!this.DEFAULT_AGEN.includes(namaUpper) && !extra.includes(namaUpper)) {
        extra.push(namaUpper);
        localStorage.setItem('depot_agen_list', JSON.stringify(extra));
        return true; // newly added
      }
      return false; // already exists
    } catch(e) {
      return false;
    }
  },

  removeCustomAgen: function(nama) {
    try {
      const stored = localStorage.getItem('depot_agen_list');
      const extra = stored ? JSON.parse(stored) : [];
      const namaUpper = nama.trim().toUpperCase();
      const filtered = extra.filter(a => a !== namaUpper);
      localStorage.setItem('depot_agen_list', JSON.stringify(filtered));
    } catch(e) {}
  },

  syncAgenListFromBackend: async function() {
    try {
      if (typeof ApiClient !== 'undefined' && ApiClient.post) {
        const res = await ApiClient.post('getDepotAgenList', {});
        if (res && res.success && Array.isArray(res.data)) {
          res.data.forEach(nama => {
            if (nama && nama.trim()) {
              this.saveAgenToLocal(nama);
            }
          });
          this.refreshAgenDropdown();
        }
      }
    } catch(e) {}
  },


  addAgenAndRefresh: async function() {
    const input = document.getElementById('input_agen_baru');
    if (!input || !input.value.trim()) {
      showToast('Masukkan nama agen terlebih dahulu!', 'warning');
      return;
    }
    const nama = input.value.trim().toUpperCase();

    // Validate not duplicate
    const existing = this.getAgenList();
    if (existing.includes(nama)) {
      showToast(`Agen "${nama}" sudah ada dalam daftar!`, 'warning');
      return;
    }

    // Save to localStorage immediately
    this.saveAgenToLocal(nama);

    // Sync to backend Spreadsheet (non-blocking)
    ApiClient.post("addDepotAgen", { nama_agen: nama }).then(res => {
      if (res && res.success) {
        showToast(`Agen "${nama}" berhasil disimpan ke Spreadsheet!`, 'success');
      }
    }).catch(() => {});

    // Refresh the dropdown without full page re-render
    this.refreshAgenDropdown();
    input.value = '';
    showToast(`Agen "${nama}" ditambahkan ke daftar!`, 'success');
  },

  refreshAgenDropdown: function() {
    const select = document.getElementById('sal_agen_nama');
    if (!select) return;
    const currentVal = select.value;
    const list = this.getAgenList();
    select.innerHTML = '<option value="">-- Pilih Agen --</option>' +
      list.map(a => `<option value="${a}"${a === currentVal ? ' selected' : ''}>${a}</option>`).join('');
  },

  defaultFullData: {
  "JAN": {
    "pembelian": [
      {
        "asal": "PROCESSING",
        "kg": 36144.0,
        "liter": 35262.44,
        "harga_per_kg": 9000,
        "total_rp": 325296000.0
      }
    ],
    "penjualan": [
      {
        "nama": "HERU",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 9270.0,
        "rp": 101970000.0
      },
      {
        "nama": "JAINAL",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 3386.0,
        "rp": 37246000.0
      },
      {
        "nama": "YULI",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 830.0,
        "rp": 9130000.0
      },
      {
        "nama": "NINDRI",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 1524.0,
        "rp": 15240000.0
      },
      {
        "nama": "ISA",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 455.0,
        "rp": 4550000.0
      },
      {
        "nama": "USMAN",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 2800.0,
        "rp": 28000000.0
      },
      {
        "nama": "GRESIK",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 1175.0,
        "rp": 11750000.0
      },
      {
        "nama": "KARYAWAN",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 343.9,
        "rp": 3439000.0
      },
      {
        "nama": "SUDAR",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 169.0,
        "rp": 1859000.0
      },
      {
        "nama": "FX. MUNIR",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 16.0,
        "rp": 160000.0
      },
      {
        "nama": "PURI",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 1910.0,
        "rp": 19100000.0
      },
      {
        "nama": "PAK MUL SAMPURNA",
        "harga": 12000.0,
        "qty": 0.0,
        "liter": 75.0,
        "rp": 900000.0
      },
      {
        "nama": "UMUM",
        "harga": 12000.0,
        "qty": 0.0,
        "liter": 10106.0,
        "rp": 82230000.0
      },
      {
        "nama": "BOTOL",
        "harga": 8000.0,
        "qty": 2950.0,
        "liter": 1075.0,
        "rp": 23600000.0
      },
      {
        "nama": "GELAS",
        "harga": 6000.0,
        "qty": 889.0,
        "liter": 297.0,
        "rp": 5334000.0
      }
    ],
    "lain_lain": [
      {
        "keterangan": "sosial susu botol",
        "qty": 20.0,
        "liter": 7.0
      },
      {
        "keterangan": "sosial susu liter koramil 503 bulan desember",
        "qty": 0.0,
        "liter": 120.0
      },
      {
        "keterangan": "Susut",
        "qty": 0.0,
        "liter": 630.0
      },
      {
        "keterangan": "susu rusak botol",
        "qty": 160.0,
        "liter": 54.0
      },
      {
        "keterangan": "susu bonus agen",
        "qty": 0.0,
        "liter": 543.0
      }
    ],
    "operasional": [
      {
        "no": 1,
        "nama": "lemburan nataru",
        "rp": 750000.0
      },
      {
        "no": 2,
        "nama": "stiker",
        "rp": 1560000.0
      },
      {
        "no": 3,
        "nama": "kresek,esense",
        "rp": 575000.0
      },
      {
        "no": 4,
        "nama": "galon",
        "rp": 60000.0
      },
      {
        "no": 5,
        "nama": "sepatu isa yoga",
        "rp": 200000.0
      },
      {
        "no": 6,
        "nama": "gula",
        "rp": 2114000.0
      },
      {
        "no": 7,
        "nama": "sampah",
        "rp": 50000.0
      },
      {
        "no": 8,
        "nama": "plastik",
        "rp": 450000.0
      },
      {
        "no": 9,
        "nama": "belanja",
        "rp": 530000.0
      },
      {
        "no": 10,
        "nama": "belanja kresek",
        "rp": 1567000.0
      },
      {
        "no": 11,
        "nama": "botol",
        "rp": 8900000.0
      },
      {
        "no": 12,
        "nama": "lpg",
        "rp": 126000.0
      },
      {
        "no": 13,
        "nama": "wifi",
        "rp": 150000.0
      },
      {
        "no": 14,
        "nama": "tatakan kompor",
        "rp": 63000.0
      },
      {
        "no": 15,
        "nama": "service frezer",
        "rp": 250000.0
      }
    ],
    "stok": {
      "stok_awal": 124.0,
      "penerimaan": 35262.439024390245,
      "persediaan": 35386.439024390245,
      "pengeluaran": 34785.9,
      "stok_akhir": 600.0,
      "nb": "nb : 500liter, 270botol"
    }
  },
  "FEB": {
    "pembelian": [
      {
        "asal": "PROCESSING",
        "kg": 24930.0,
        "liter": 24321.95,
        "harga_per_kg": 9000,
        "total_rp": 224370000.0
      }
    ],
    "penjualan": [
      {
        "nama": "HERU",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 6540.0,
        "rp": 71940000.0
      },
      {
        "nama": "JAINAL",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 2164.0,
        "rp": 23804000.0
      },
      {
        "nama": "YULI",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 590.0,
        "rp": 6490000.0
      },
      {
        "nama": "NINDRI",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 843.0,
        "rp": 8430000.0
      },
      {
        "nama": "ISA",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 140.0,
        "rp": 1400000.0
      },
      {
        "nama": "USMAN",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 1775.0,
        "rp": 17750000.0
      },
      {
        "nama": "GRESIK",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 960.0,
        "rp": 9600000.0
      },
      {
        "nama": "KARYAWAN",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 375.9,
        "rp": 3759000.0
      },
      {
        "nama": "SUDAR",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 144.0,
        "rp": 1584000.0
      },
      {
        "nama": "FX. MUNIR",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 5.0,
        "rp": 50000.0
      },
      {
        "nama": "PURI",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 1890.0,
        "rp": 18900000.0
      },
      {
        "nama": "PAK MUL SAMPURNA",
        "harga": 12000.0,
        "qty": 0.0,
        "liter": 102.0,
        "rp": 1224000.0
      },
      {
        "nama": "UMUM",
        "harga": 12000.0,
        "qty": 0.0,
        "liter": 7424.0,
        "rp": 70205000.0
      },
      {
        "nama": "BOTOL",
        "harga": 8000.0,
        "qty": 1954.0,
        "liter": 605.0,
        "rp": 15632000.0
      },
      {
        "nama": "GELAS",
        "harga": 6000.0,
        "qty": 541.0,
        "liter": 181.0,
        "rp": 3246000.0
      }
    ],
    "lain_lain": [
      {
        "keterangan": "sosial susu botol",
        "qty": 15.0,
        "liter": 5.0
      },
      {
        "keterangan": "sosial susu liter",
        "qty": 0.0,
        "liter": 50.0
      },
      {
        "keterangan": "Susut",
        "qty": 0.0,
        "liter": 528.0
      },
      {
        "keterangan": "susu bonus agen",
        "qty": 0.0,
        "liter": 420.0
      }
    ],
    "operasional": [
      {
        "no": 1,
        "nama": "plastik",
        "rp": 1300000.0
      },
      {
        "no": 2,
        "nama": "sampah",
        "rp": 50000.0
      },
      {
        "no": 3,
        "nama": "lpg",
        "rp": 205000.0
      },
      {
        "no": 4,
        "nama": "gula",
        "rp": 975000.0
      },
      {
        "no": 5,
        "nama": "stiker",
        "rp": 520000.0
      },
      {
        "no": 6,
        "nama": "thermal",
        "rp": 525000.0
      },
      {
        "no": 7,
        "nama": "print",
        "rp": 12000.0
      },
      {
        "no": 8,
        "nama": "lemburan",
        "rp": 500000.0
      },
      {
        "no": 9,
        "nama": "wifi",
        "rp": 150000.0
      },
      {
        "no": 10,
        "nama": "kresek",
        "rp": 465000.0
      }
    ],
    "stok": {
      "stok_awal": 600.0,
      "penerimaan": 24321.951219512197,
      "persediaan": 24921.951219512197,
      "pengeluaran": 24741.9,
      "stok_akhir": 180.0,
      "nb": "nb sisa 100liter,dan 256 botol"
    }
  },
  "MAR": {
    "pembelian": [
      {
        "asal": "PROCESSING",
        "kg": 25952.0,
        "liter": 25319.02,
        "harga_per_kg": 9000,
        "total_rp": 233568000.0
      }
    ],
    "penjualan": [
      {
        "nama": "HERU",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 6180.0,
        "rp": 67980000.0
      },
      {
        "nama": "JAINAL",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 2560.0,
        "rp": 28160000.0
      },
      {
        "nama": "YULI",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 550.0,
        "rp": 6050000.0
      },
      {
        "nama": "NINDRI",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 1055.0,
        "rp": 10550000.0
      },
      {
        "nama": "ISA",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 438.0,
        "rp": 4380000.0
      },
      {
        "nama": "USMAN",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 2100.0,
        "rp": 21000000.0
      },
      {
        "nama": "GRESIK",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 742.0,
        "rp": 7420000.0
      },
      {
        "nama": "KARYAWAN",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 416.2,
        "rp": 4162000.0
      },
      {
        "nama": "SUDAR",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 138.0,
        "rp": 1518000.0
      },
      {
        "nama": "FX. MUNIR",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 23.0,
        "rp": 230000.0
      },
      {
        "nama": "PURI",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 830.0,
        "rp": 8300000.0
      },
      {
        "nama": "PAK MUL SAMPURNA",
        "harga": 12000.0,
        "qty": 0.0,
        "liter": 78.0,
        "rp": 936000.0
      },
      {
        "nama": "UMUM",
        "harga": 12000.0,
        "qty": 0.0,
        "liter": 8533.0,
        "rp": 75210000.0
      },
      {
        "nama": "BOTOL",
        "harga": 8000.0,
        "qty": 3092.0,
        "liter": 1027.0,
        "rp": 24736000.0
      },
      {
        "nama": "GELAS",
        "harga": 6000.0,
        "qty": 408.0,
        "liter": 182.0,
        "rp": 2448000.0
      }
    ],
    "lain_lain": [
      {
        "keterangan": "sosial susu botol",
        "qty": 15.0,
        "liter": 5.0
      },
      {
        "keterangan": "sosial susu liter",
        "qty": 0.0,
        "liter": 10.0
      },
      {
        "keterangan": "Susut",
        "qty": 0.0,
        "liter": 215.8
      },
      {
        "keterangan": "susu rusak",
        "qty": 20.0,
        "liter": 10.0
      },
      {
        "keterangan": "susu bonus agen",
        "qty": 0.0,
        "liter": 220.0
      }
    ],
    "operasional": [
      {
        "no": 1,
        "nama": "sampah",
        "rp": 50000.0
      },
      {
        "no": 2,
        "nama": "stiker",
        "rp": 1300000.0
      },
      {
        "no": 3,
        "nama": "lpg",
        "rp": 189000.0
      },
      {
        "no": 4,
        "nama": "plastik susu",
        "rp": 1720000.0
      },
      {
        "no": 5,
        "nama": "gula",
        "rp": 1125000.0
      },
      {
        "no": 6,
        "nama": "kresek",
        "rp": 1280000.0
      },
      {
        "no": 7,
        "nama": "wifi",
        "rp": 150000.0
      },
      {
        "no": 8,
        "nama": "galon",
        "rp": 20000.0
      },
      {
        "no": 9,
        "nama": "esense",
        "rp": 480000.0
      },
      {
        "no": 10,
        "nama": "sabun",
        "rp": 164000.0
      },
      {
        "no": 11,
        "nama": "lemburan hari raya 5orang",
        "rp": 2500000.0
      }
    ],
    "stok": {
      "stok_awal": 180.0,
      "penerimaan": 25319.024390243903,
      "persediaan": 25499.024390243903,
      "pengeluaran": 25313.0,
      "stok_akhir": 186.0,
      "nb": "nb : liter 160,botol 86"
    }
  },
  "APRIL": {
    "pembelian": [
      {
        "asal": "PROCESSING",
        "kg": 35180.0,
        "liter": 34321.95,
        "harga_per_kg": 9000,
        "total_rp": 316620000.0
      }
    ],
    "penjualan": [
      {
        "nama": "HERU",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 9010.0,
        "rp": 99110000.0
      },
      {
        "nama": "JAINAL",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 3590.0,
        "rp": 39490000.0
      },
      {
        "nama": "YULI",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 934.0,
        "rp": 10274000.0
      },
      {
        "nama": "NINDRI",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 1513.0,
        "rp": 15130000.0
      },
      {
        "nama": "ISA",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 550.0,
        "rp": 5500000.0
      },
      {
        "nama": "USMAN",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 3325.0,
        "rp": 33250000.0
      },
      {
        "nama": "GRESIK",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 1140.0,
        "rp": 11400000.0
      },
      {
        "nama": "KARYAWAN",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 323.8,
        "rp": 3238000.0
      },
      {
        "nama": "SUDAR",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 158.0,
        "rp": 1738000.0
      },
      {
        "nama": "FX. MUNIR",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 5.0,
        "rp": 50000.0
      },
      {
        "nama": "PURI",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 2580.0,
        "rp": 25800000.0
      },
      {
        "nama": "PAK MUL SAMPURNA",
        "harga": 12000.0,
        "qty": 0.0,
        "liter": 135.0,
        "rp": 1620000.0
      },
      {
        "nama": "UMUM",
        "harga": 12000.0,
        "qty": 0.0,
        "liter": 8841.0,
        "rp": 83991000.0
      },
      {
        "nama": "BOTOL",
        "harga": 8000.0,
        "qty": 2301.0,
        "liter": 715.0,
        "rp": 18408000.0
      },
      {
        "nama": "GELAS",
        "harga": 6000.0,
        "qty": 689.0,
        "liter": 253.0,
        "rp": 4134000.0
      }
    ],
    "lain_lain": [
      {
        "keterangan": "sosial susu botol",
        "qty": 20.0,
        "liter": 6.0
      },
      {
        "keterangan": "sosial susu liter",
        "qty": 15.0,
        "liter": 15.0
      },
      {
        "keterangan": "Susut",
        "qty": 0.0,
        "liter": 525.0
      },
      {
        "keterangan": "susu rusak botol",
        "qty": 10.0,
        "liter": 3.0
      },
      {
        "keterangan": "susu bonus agen",
        "qty": 0.0,
        "liter": 530.2
      }
    ],
    "operasional": [
      {
        "no": 1,
        "nama": "stiker",
        "rp": 1300000.0
      },
      {
        "no": 2,
        "nama": "sampah",
        "rp": 50000.0
      },
      {
        "no": 3,
        "nama": "lpg",
        "rp": 324000.0
      },
      {
        "no": 4,
        "nama": "gula",
        "rp": 1950000.0
      },
      {
        "no": 5,
        "nama": "plastik,kasak,sedotan",
        "rp": 1701000.0
      },
      {
        "no": 6,
        "nama": "kresek",
        "rp": 270000.0
      },
      {
        "no": 7,
        "nama": "wifi",
        "rp": 150000.0
      },
      {
        "no": 8,
        "nama": "galon",
        "rp": 21000.0
      },
      {
        "no": 9,
        "nama": "lemburan",
        "rp": 250000.0
      }
    ],
    "stok": {
      "stok_awal": 186.0,
      "penerimaan": 34321.9512195122,
      "persediaan": 34507.9512195122,
      "pengeluaran": 34152.0,
      "stok_akhir": 356.0,
      "nb": "nb : sisa botol 320,sisa liter 260"
    }
  },
  "MEI": {
    "pembelian": [
      {
        "asal": "PROCESSING",
        "kg": 41052.0,
        "liter": 40050.73,
        "harga_per_kg": 9000,
        "total_rp": 369468000.0
      }
    ],
    "penjualan": [
      {
        "nama": "HERU",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 10740.0,
        "rp": 118140000.0
      },
      {
        "nama": "JAINAL",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 4560.0,
        "rp": 50160000.0
      },
      {
        "nama": "YULI",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 1000.0,
        "rp": 11000000.0
      },
      {
        "nama": "NINDRI",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 2042.0,
        "rp": 20420000.0
      },
      {
        "nama": "ISA",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 650.0,
        "rp": 6500000.0
      },
      {
        "nama": "USMAN",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 3640.0,
        "rp": 36400000.0
      },
      {
        "nama": "GRESIK",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 960.0,
        "rp": 9600000.0
      },
      {
        "nama": "KARYAWAN",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 252.6,
        "rp": 2526000.0
      },
      {
        "nama": "SUDAR",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 142.0,
        "rp": 1562000.0
      },
      {
        "nama": "PURI",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 2545.0,
        "rp": 25450000.0
      },
      {
        "nama": "PAK MUL SAMPURNA",
        "harga": 12000.0,
        "qty": 0.0,
        "liter": 100.0,
        "rp": 1200000.0
      },
      {
        "nama": "UMUM",
        "harga": 12000.0,
        "qty": 0.0,
        "liter": 10713.0,
        "rp": 96419000.0
      },
      {
        "nama": "BOTOL",
        "harga": 8000.0,
        "qty": 3085.0,
        "liter": 926.0,
        "rp": 24680000.0
      },
      {
        "nama": "GELAS",
        "harga": 6000.0,
        "qty": 973.0,
        "liter": 295.0,
        "rp": 5838000.0
      }
    ],
    "lain_lain": [
      {
        "keterangan": "sosial susu botol",
        "qty": 50.0,
        "liter": 13.0
      },
      {
        "keterangan": "sosial susu liter",
        "qty": 0.0,
        "liter": 15.0
      },
      {
        "keterangan": "Susut",
        "qty": 0.0,
        "liter": 657.7
      },
      {
        "keterangan": "susu rusak",
        "qty": 30.0,
        "liter": 8.0
      },
      {
        "keterangan": "susu bonus agen",
        "qty": 0.0,
        "liter": 697.7
      }
    ],
    "operasional": [
      {
        "no": 1,
        "nama": "sampah",
        "rp": 50000.0
      },
      {
        "no": 2,
        "nama": "wifi",
        "rp": 150000.0
      },
      {
        "no": 3,
        "nama": "lpg",
        "rp": 360000.0
      },
      {
        "no": 4,
        "nama": "gula",
        "rp": 1650000.0
      },
      {
        "no": 5,
        "nama": "kresek",
        "rp": 2320000.0
      },
      {
        "no": 6,
        "nama": "plastik",
        "rp": 2265000.0
      },
      {
        "no": 7,
        "nama": "lemburan",
        "rp": 1050000.0
      },
      {
        "no": 8,
        "nama": "galon",
        "rp": 66000.0
      },
      {
        "no": 9,
        "nama": "stiker",
        "rp": 1040000.0
      },
      {
        "no": 10,
        "nama": "esense",
        "rp": 843000.0
      },
      {
        "no": 11,
        "nama": "slang regulator",
        "rp": 205000.0
      },
      {
        "no": 12,
        "nama": "gelas",
        "rp": 180000.0
      }
    ],
    "stok": {
      "stok_awal": 356.0,
      "penerimaan": 40050.73170731708,
      "persediaan": 40406.73170731708,
      "pengeluaran": 39957.0,
      "stok_akhir": 450.0,
      "nb": "nb: sisa liter 420, botol 120"
    }
  },
  "JUNI": {
    "pembelian": [
      {
        "asal": "PROCESSING",
        "kg": 39675.0,
        "liter": 38708.0,
        "harga_per_kg": 9000,
        "total_rp": 357075000.0
      }
    ],
    "penjualan": [
      {
        "nama": "HERU",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 9245.0,
        "rp": 101695000.0
      },
      {
        "nama": "JAINAL",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 4290.0,
        "rp": 47190000.0
      },
      {
        "nama": "USMAN",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 4455.0,
        "rp": 44550000.0
      },
      {
        "nama": "NINDRI",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 2232.0,
        "rp": 22320000.0
      },
      {
        "nama": "ISA",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 720.0,
        "rp": 7200000.0
      },
      {
        "nama": "YULI",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 790.0,
        "rp": 8690000.0
      },
      {
        "nama": "PURI",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 2256.0,
        "rp": 22560000.0
      },
      {
        "nama": "GRESIK",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 1650.0,
        "rp": 16500000.0
      },
      {
        "nama": "SUDAR",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 174.0,
        "rp": 1914000.0
      },
      {
        "nama": "PAK MUL SAMPORNA",
        "harga": 12000.0,
        "qty": 0.0,
        "liter": 100.0,
        "rp": 1200000.0
      },
      {
        "nama": "KARYAWAN",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 403.1,
        "rp": 4031000.0
      },
      {
        "nama": "UMUM",
        "harga": 12000.0,
        "qty": 0.0,
        "liter": 7510.5,
        "rp": 90126000.0
      },
      {
        "nama": "GELAS",
        "harga": 6000.0,
        "qty": 953.0,
        "liter": 317.67,
        "rp": 5718000.0
      },
      {
        "nama": "BOTOL",
        "harga": 8000.0,
        "qty": 3257.0,
        "liter": 814.25,
        "rp": 26056000.0
      }
    ],
    "lain_lain": [
      {
        "keterangan": "SUSUT MASAK",
        "qty": 0.0,
        "liter": 250.0
      },
      {
        "keterangan": "SUSUT LITER",
        "qty": 0.0,
        "liter": 2768.0
      },
      {
        "keterangan": "SUSU SOSIAL",
        "qty": 0.0,
        "liter": 20.0
      },
      {
        "keterangan": "SUSU BONUS AGEN",
        "qty": 0.0,
        "liter": 1120.0
      }
    ],
    "operasional": [
      {
        "no": 1,
        "nama": "sampah",
        "rp": 50000.0
      },
      {
        "no": 2,
        "nama": "wifi",
        "rp": 150000.0
      },
      {
        "no": 3,
        "nama": "lpg",
        "rp": 240000.0
      },
      {
        "no": 4,
        "nama": "gula",
        "rp": 1465000.0
      },
      {
        "no": 5,
        "nama": "kresek",
        "rp": 1926000.0
      },
      {
        "no": 6,
        "nama": "plastik",
        "rp": 2235000.0
      },
      {
        "no": 7,
        "nama": "lemburan",
        "rp": 500000.0
      },
      {
        "no": 8,
        "nama": "galon",
        "rp": 66000.0
      },
      {
        "no": 9,
        "nama": "kopi",
        "rp": 66000.0
      },
      {
        "no": 10,
        "nama": "botol",
        "rp": 8170000.0
      },
      {
        "no": 11,
        "nama": "beli wd",
        "rp": 60000.0
      },
      {
        "no": 12,
        "nama": "beli tang",
        "rp": 30000.0
      },
      {
        "no": 13,
        "nama": "tabung lpg",
        "rp": 195000.0
      }
    ],
    "stok": {
      "stok_awal": 450.0,
      "penerimaan": 38708.0,
      "persediaan": 39158.0,
      "pengeluaran": 34957.51666666666,
      "stok_akhir": 4200.48,
      "nb": "Sisa botol: 120, sisa liter: 420"
    }
  },
  "JULI": {
    "pembelian": [
      {
        "asal": "PROCESSING",
        "kg": 38030.0,
        "liter": 37103.0,
        "harga_per_kg": 9000,
        "total_rp": 342270000.0
      }
    ],
    "penjualan": [
      {
        "nama": "HERU",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 9080.0,
        "rp": 99880000.0
      },
      {
        "nama": "JAINAL",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 3690.0,
        "rp": 40590000.0
      },
      {
        "nama": "USMAN",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 4414.0,
        "rp": 44140000.0
      },
      {
        "nama": "NINDRI",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 2790.0,
        "rp": 27900000.0
      },
      {
        "nama": "ISA",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 575.0,
        "rp": 5750000.0
      },
      {
        "nama": "YULI",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 700.0,
        "rp": 7700000.0
      },
      {
        "nama": "PURI",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 1320.0,
        "rp": 13200000.0
      },
      {
        "nama": "GRESIK",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 300.0,
        "rp": 3000000.0
      },
      {
        "nama": "SUDAR",
        "harga": 11000.0,
        "qty": 0.0,
        "liter": 181.0,
        "rp": 1991000.0
      },
      {
        "nama": "PAK MUL SAMPORNA",
        "harga": 12000.0,
        "qty": 0.0,
        "liter": 128.0,
        "rp": 1536000.0
      },
      {
        "nama": "KARYAWAN",
        "harga": 10000.0,
        "qty": 0.0,
        "liter": 357.8,
        "rp": 3578000.0
      },
      {
        "nama": "UMUM",
        "harga": 12000.0,
        "qty": 0.0,
        "liter": 7164.81,
        "rp": 85977720.0
      },
      {
        "nama": "GELAS",
        "harga": 7565.0,
        "qty": 728.0,
        "liter": 242.67,
        "rp": 5507320.0
      },
      {
        "nama": "BOTOL",
        "harga": 8000.0,
        "qty": 2814.0,
        "liter": 703.5,
        "rp": 22512000.0
      }
    ],
    "lain_lain": [
      {
        "keterangan": "BOTOL RUSAK",
        "qty": 80.0,
        "liter": 20.0
      },
      {
        "keterangan": "BOTOL SOSIAL POLSEK",
        "qty": 25.0,
        "liter": 6.25
      },
      {
        "keterangan": "SUSUT MASAK",
        "qty": 0.0,
        "liter": 250.0
      },
      {
        "keterangan": "SUSUT LITER",
        "qty": 0.0,
        "liter": 1629.64
      },
      {
        "keterangan": "SUSU SOSIAL",
        "qty": 0.0,
        "liter": 80.0
      },
      {
        "keterangan": "SUSU BONUS AGEN",
        "qty": 0.0,
        "liter": 1978.46
      }
    ],
    "operasional": [
      {
        "no": 1,
        "nama": "sampah",
        "rp": 50000.0
      },
      {
        "no": 2,
        "nama": "service cooling",
        "rp": 200000.0
      },
      {
        "no": 3,
        "nama": "kresek ,plastik",
        "rp": 1517000.0
      },
      {
        "no": 4,
        "nama": "galon",
        "rp": 44000.0
      },
      {
        "no": 5,
        "nama": "gula",
        "rp": 1700000.0
      },
      {
        "no": 6,
        "nama": "print menu",
        "rp": 38000.0
      },
      {
        "no": 7,
        "nama": "lpg",
        "rp": 240000.0
      },
      {
        "no": 8,
        "nama": "gelas ukur",
        "rp": 78000.0
      },
      {
        "no": 9,
        "nama": "tes pen",
        "rp": 30000.0
      },
      {
        "no": 10,
        "nama": "kresek",
        "rp": 375000.0
      },
      {
        "no": 11,
        "nama": "sabun",
        "rp": 99000.0
      },
      {
        "no": 12,
        "nama": "garam",
        "rp": 40000.0
      },
      {
        "no": 13,
        "nama": "esen,tisu",
        "rp": 523000.0
      },
      {
        "no": 14,
        "nama": "plastik",
        "rp": 1500000.0
      },
      {
        "no": 15,
        "nama": "karet",
        "rp": 23000.0
      },
      {
        "no": 16,
        "nama": "wifi",
        "rp": 150000.0
      }
    ],
    "stok": {
      "stok_awal": 42.0,
      "penerimaan": 37103.0,
      "persediaan": 37145.0,
      "pengeluaran": 31646.77666666667,
      "stok_akhir": 5498.22,
      "nb": "Sisa botol: 128, sisa liter: 10"
    }
  }
},

  getMonthData: function(monthCode) {
    const code = monthCode || this.selectedMonth;
    if (this.defaultFullData[code]) {
      return this.defaultFullData[code];
    }
    // Fallback to JUNI if available
    return this.defaultFullData["JUNI"] || {
      pembelian: [{ asal: "PROCESSING", kg: 39675, liter: 38708, harga_per_kg: 9000, total_rp: 357075000 }],
      penjualan: [
        { nama: "HERU", harga: 11000, qty: 0, liter: 9245, rp: 101695000 },
        { nama: "JAINAL", harga: 11000, qty: 0, liter: 4290, rp: 47190000 },
        { nama: "USMAN", harga: 10000, qty: 0, liter: 4455, rp: 44550000 },
        { nama: "NINDRI", harga: 10000, qty: 0, liter: 2232, rp: 22320000 },
        { nama: "ISA", harga: 10000, qty: 0, liter: 720, rp: 7200000 },
        { nama: "YULI", harga: 11000, qty: 0, liter: 790, rp: 8690000 },
        { nama: "PURI", harga: 10000, qty: 0, liter: 2256, rp: 22560000 },
        { nama: "GRESIK", harga: 10000, qty: 0, liter: 1650, rp: 16500000 },
        { nama: "SUDAR", harga: 11000, qty: 0, liter: 174, rp: 1914000 },
        { nama: "UMUM", harga: 12000, qty: 0, liter: 7511, rp: 90126000 },
        { nama: "GELAS", harga: 6000, qty: 953, liter: 318, rp: 5718000 },
        { nama: "BOTOL", harga: 8000, qty: 3257, liter: 814, rp: 26056000 }
      ],
      lain_lain: [
        { keterangan: "SUSUT MASAK", qty: 0, liter: 250 },
        { keterangan: "SUSUT LITER", qty: 0, liter: 2768 },
        { keterangan: "SUSU SOSIAL", qty: 0, liter: 20 },
        { keterangan: "SUSU BONUS AGEN", qty: 0, liter: 1120 }
      ],
      operasional: [
        { no: 1, nama: "sampah", rp: 50000 },
        { no: 2, nama: "wifi", rp: 150000 },
        { no: 3, nama: "lpg", rp: 240000 },
        { no: 4, nama: "gula", rp: 1465000 },
        { no: 5, nama: "kresek", rp: 1926000 },
        { no: 6, nama: "plastik", rp: 2235000 },
        { no: 7, nama: "lemburan", rp: 500000 },
        { no: 8, nama: "galon", rp: 66000 },
        { no: 9, nama: "kopi", rp: 66000 },
        { no: 10, nama: "botol", rp: 8170000 },
        { no: 11, nama: "beli wd", rp: 60000 },
        { no: 12, nama: "beli tang", rp: 30000 },
        { no: 13, nama: "tabung lpg", rp: 195000 }
      ],
      stok: { stok_awal: 450, penerimaan: 38708, persediaan: 39158, pengeluaran: 34958, stok_akhir: 4200 }
    };
  },

  getPembelianData: async function() {
    const res = await ApiClient.post("getDepotPembelian");
    if (res.success && res.data && res.data.length > 0) return res.data;
    const m = this.getMonthData();
    return m.pembelian;
  },

  getPenjualanData: async function() {
    const res = await ApiClient.post("getDepotPenjualan");
    if (res.success && res.data && res.data.length > 0) return res.data;
    const m = this.getMonthData();
    return m.penjualan;
  },

  render: async function() {
    if (!AuthManager.requireAuth("depot", "DEPOT")) {
      return `<div class="alert alert-danger">Akses Ditolak. Anda tidak berhak mengakses Divisi Depot Susu.</div>`;
    }

    // Auto-sync agent list from backend spreadsheet non-blocking
    this.syncAgenListFromBackend();

    const mData = this.getMonthData();
    const monthsList = ["JAN","FEB","MAR","APRIL","MEI","JUNI","JULI","AGU","SEP","OKT","NOV","DES"];

    // Calculations
    const totPurKg = mData.pembelian.reduce((a, b) => a + Number(b.kg || 0), 0);
    const totPurLtr = mData.pembelian.reduce((a, b) => a + Number(b.liter || 0), 0);
    const totPurRp = mData.pembelian.reduce((a, b) => a + Number(b.total_rp || 0), 0);

    const totSalLtr = mData.penjualan.reduce((a, b) => a + Number(b.liter || 0), 0);
    const totSalRp = mData.penjualan.reduce((a, b) => a + Number(b.rp || 0), 0);

    const totLainLtr = mData.lain_lain.reduce((a, b) => a + Number(b.liter || 0), 0);
    const totOpsRp = mData.operasional.reduce((a, b) => a + Number(b.rp || 0), 0);

    return `
      <!-- MOBILE HERO FINANCIAL HEADER CARD (DANA / LIVIN' / MYBCA STYLE) -->
      <div class="finance-hero-card mb-3" style="background: linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #0f172a 100%);">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <div class="finance-hero-greeting">
              <i class="bi bi-shield-check text-emerald me-1"></i>Sistem Informasi Digital Danamulya
            </div>
            <div class="finance-hero-name">
              Divisi Depot Susu
            </div>
          </div>
          <span class="badge bg-dark bg-opacity-40 text-white border border-white border-opacity-25 rounded-pill px-3 py-1 fw-semibold small d-inline-flex align-items-center">
            <i class="bi bi-calendar3 me-1 text-emerald"></i>${this.selectedMonth} ${this.selectedYear}
          </span>
        </div>

        <!-- BALANCE & SUMMARY CARDS -->
        <div class="finance-balance-box">
          <div class="d-flex justify-content-between align-items-center">
            <span class="finance-balance-label">Total Omset Penjualan Depot</span>
            <span class="badge bg-emerald text-white rounded-pill px-2 py-1 small fw-bold">
              ${Math.round(totSalLtr).toLocaleString('id-ID')} Ltr
            </span>
          </div>
          <div class="finance-balance-amount">
            Rp ${totSalRp.toLocaleString('id-ID')}
          </div>
          <div class="d-flex justify-content-between align-items-center mt-2 pt-2 border-top border-white border-opacity-10 text-white-50 extra-small">
            <span><i class="bi bi-cart-down me-1"></i>Pembelian: ${Math.round(totPurLtr).toLocaleString('id-ID')} Ltr (Rp ${totPurRp.toLocaleString('id-ID')})</span>
            <span><i class="bi bi-receipt me-1"></i>Biaya Ops: Rp ${totOpsRp.toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>

      <!-- 6-GRID SHORTCUT MENU (ALA DANA / LIVIN' / SHOPEEPAY) -->
      <div class="finance-grid-menu mb-3">
        <a class="finance-grid-item" onclick="document.getElementById('sheet-tab').click()">
          <div class="finance-icon-circle blue"><i class="bi bi-table"></i></div>
          <span>Laporan Bulanan</span>
        </a>
        <a class="finance-grid-item" onclick="document.getElementById('buy-tab').click()">
          <div class="finance-icon-circle emerald"><i class="bi bi-cart-down-fill"></i></div>
          <span>Pembelian</span>
        </a>
        <a class="finance-grid-item" onclick="document.getElementById('sale-tab').click()">
          <div class="finance-icon-circle amber"><i class="bi bi-shop"></i></div>
          <span>Penjualan</span>
        </a>
        <a class="finance-grid-item" onclick="document.getElementById('ops-tab').click()">
          <div class="finance-icon-circle rose"><i class="bi bi-receipt"></i></div>
          <span>Operasional</span>
        </a>
        <a class="finance-grid-item" onclick="DepotModule.exportExcel()">
          <div class="finance-icon-circle teal"><i class="bi bi-file-earmark-spreadsheet-fill"></i></div>
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
          <span class="fw-bold text-muted extra-small text-nowrap"><i class="bi bi-calendar3 me-1 text-primary"></i>Tahun:</span>
          ${this.getAvailableYears().map(y => `
            <button class="btn btn-xs ${y === this.selectedYear ? 'btn-primary fw-bold' : 'btn-outline-secondary'} rounded-pill px-3 py-1"
                    onclick="DepotModule.selectYear('${y}')">${y}</button>
          `).join('')}
          <div class="vr mx-1"></div>
          <span class="fw-bold text-muted extra-small text-nowrap"><i class="bi bi-funnel me-1 text-primary"></i>Bulan:</span>
          ${monthsList.map(m => `
            <button class="btn btn-xs ${m === this.selectedMonth ? 'btn-primary fw-bold' : 'btn-light text-dark'} rounded-pill px-3 py-1 text-nowrap"
                    onclick="DepotModule.selectMonth('${m}')">${m}</button>
          `).join('')}
        </div>
      </div>

      <!-- Nav Tabs -->
      <div class="finance-segmented-nav-container">
        <ul class="nav finance-segmented-nav" id="depTab" role="tablist">
          <li class="nav-item">
            <button class="nav-link active" id="sheet-tab" data-bs-toggle="tab" data-bs-target="#sheet-pane">
              <i class="bi bi-table me-1 text-primary"></i>Laporan Bulanan
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" id="pur-tab" data-bs-toggle="tab" data-bs-target="#pur-pane">
              <i class="bi bi-cart-down me-1 text-success"></i>I. Pembelian Processing
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" id="sal-tab" data-bs-toggle="tab" data-bs-target="#sal-pane">
              <i class="bi bi-shop me-1 text-info"></i>II. Penjualan Agen
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" id="ops-tab" data-bs-toggle="tab" data-bs-target="#ops-pane">
              <i class="bi bi-receipt me-1 text-warning"></i>III. Biaya Operasional
            </button>
          </li>
        </ul>
      </div>

      <div class="tab-content">
        <!-- TAB LAPORAN BULANAN -->
        <div class="tab-pane fade show active" id="sheet-pane">

          <!-- JUDUL LAPORAN EXCEL -->
          <div class="card card-custom p-4 mb-4 shadow-sm border-0 bg-white text-center">
            <h4 class="fw-bold text-dark mb-1">LAPORAN PENERIMAAN DAN PENGELUARAN DEPOT SUSU</h4>
            <h5 class="fw-bold text-primary mb-2">KOPERASI AGRIBISNIS DANA MULYA PACET</h5>
            <span class="badge bg-dark align-self-center px-4 py-2 fs-6 rounded-pill">PERIODE ${this.selectedMonth} ${this.selectedYear}</span>
          </div>

          <div class="row g-4 mb-4">
            <!-- TABEL 1: PEMBELIAN DARI PROCESSING -->
            <div class="col-lg-6">
              <div class="card card-custom p-4 shadow-sm border-0 h-100">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h5 class="fw-bold mb-0 text-dark"><i class="bi bi-cart-down text-primary me-2"></i>I. PEMBELIAN DARI PROCESSING</h5>
                  <span class="badge bg-primary">Faktor Densitas 1.025</span>
                </div>
                <div class="table-responsive">
                  <table class="table table-bordered table-hover align-middle mb-0" style="font-size: 0.85rem;">
                    <thead class="table-primary text-dark fw-bold text-center align-middle">
                      <tr>
                        <th>ASAL</th>
                        <th>KG</th>
                        <th>LITER</th>
                        <th>HARGA / KG</th>
                        <th>TOTAL (RP)</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${mData.pembelian.map(p => `
                        <tr>
                          <td class="fw-bold text-dark text-center">${p.asal}</td>
                          <td class="text-end fw-bold">${Math.round(p.kg).toLocaleString('id-ID')}</td>
                          <td class="text-end fw-bold text-primary">${Math.round(p.liter).toLocaleString('id-ID')}</td>
                          <td class="text-end">Rp ${Number(p.harga_per_kg).toLocaleString('id-ID')}</td>
                          <td class="text-end fw-bold text-success">Rp ${Number(p.total_rp).toLocaleString('id-ID')}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                    <tfoot class="table-light fw-bold">
                      <tr>
                        <td class="text-center text-dark">TOTAL PEMBELIAN</td>
                        <td class="text-end text-dark">${Math.round(totPurKg).toLocaleString('id-ID')}</td>
                        <td class="text-end text-primary">${Math.round(totPurLtr).toLocaleString('id-ID')}</td>
                        <td></td>
                        <td class="text-end text-success fs-6">Rp ${totPurRp.toLocaleString('id-ID')}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            <!-- TABEL 3: PENGELUARAN LAIN-LAIN -->
            <div class="col-lg-6">
              <div class="card card-custom p-4 shadow-sm border-0 h-100">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h5 class="fw-bold mb-0 text-dark"><i class="bi bi-arrow-right-circle text-warning me-2"></i>III. PENGELUARAN LAIN-LAIN</h5>
                  <span class="badge bg-warning text-dark">Susut / Sosial / Bonus</span>
                </div>
                <div class="table-responsive">
                  <table class="table table-bordered table-hover align-middle mb-0" style="font-size: 0.85rem;">
                    <thead class="table-warning text-dark fw-bold text-center align-middle">
                      <tr>
                        <th>NO</th>
                        <th>KETERANGAN</th>
                        <th>QTY (BOTOL)</th>
                        <th>VOLUME (LITER)</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${mData.lain_lain.length === 0 ? '<tr><td colspan="4" class="text-center text-muted py-3">Tidak ada pengeluaran lain-lain.</td></tr>' : ''}
                      ${mData.lain_lain.map((l, idx) => `
                        <tr>
                          <td class="text-center">${idx + 1}</td>
                          <td class="fw-semibold text-dark">${l.keterangan}</td>
                          <td class="text-center">${l.qty ? Math.round(l.qty).toLocaleString('id-ID') : '-'}</td>
                          <td class="text-end fw-bold text-danger">${Math.round(l.liter).toLocaleString('id-ID')} Ltr</td>
                        </tr>
                      `).join('')}
                    </tbody>
                    <tfoot class="table-light fw-bold">
                      <tr>
                        <td colspan="3" class="text-center text-dark">JUMLAH LAIN-LAIN:</td>
                        <td class="text-end text-danger fs-6">${Math.round(totLainLtr).toLocaleString('id-ID')} Ltr</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="row g-4 mb-4">
            <!-- TABEL 2: PENJUALAN AGEN & PRODUK KEMASAN -->
            <div class="col-lg-7">
              <div class="card card-custom p-4 shadow-sm border-0">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h5 class="fw-bold mb-0 text-dark"><i class="bi bi-shop text-success me-2"></i>II. PENJUALAN PADA AGEN & PRODUK</h5>
                  <span class="badge bg-success">Penjualan Agen & Produk</span>
                </div>
                <div class="table-responsive">
                  <table class="table table-bordered table-hover align-middle mb-0" style="font-size: 0.85rem;">
                    <thead class="table-success text-dark fw-bold text-center align-middle">
                      <tr>
                        <th>NO</th>
                        <th>NAMA AGEN / PRODUK</th>
                        <th>HARGA / LTR</th>
                        <th>QTY</th>
                        <th>VOLUME (LITER)</th>
                        <th>TOTAL OMSET (RP)</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${mData.penjualan.map((s, idx) => `
                        <tr class="${s.nama === 'GELAS' || s.nama === 'BOTOL' ? 'table-warning' : ''}">
                          <td class="text-center">${idx + 1}</td>
                          <td class="fw-bold text-dark">${s.nama}</td>
                          <td class="text-end">Rp ${Number(s.harga).toLocaleString('id-ID')}</td>
                          <td class="text-center">${s.qty ? Math.round(s.qty).toLocaleString('id-ID') : '-'}</td>
                          <td class="text-end fw-bold text-primary">${Math.round(s.liter).toLocaleString('id-ID')}</td>
                          <td class="text-end fw-bold text-success">Rp ${Number(s.rp).toLocaleString('id-ID')}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                    <tfoot class="table-light fw-bold">
                      <tr>
                        <td colspan="4" class="text-center text-dark">TOTAL PENJUALAN DEPOT:</td>
                        <td class="text-end text-primary fs-6">${Math.round(totSalLtr).toLocaleString('id-ID')} Ltr</td>
                        <td class="text-end text-success fs-6">Rp ${totSalRp.toLocaleString('id-ID')}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            <!-- TABEL 4: BIAYA OPERASIONAL DEPOT -->
            <div class="col-lg-5">
              <div class="card card-custom p-4 shadow-sm border-0">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h5 class="fw-bold mb-0 text-dark"><i class="bi bi-receipt text-warning me-2"></i>IV. BIAYA OPERASIONAL DEPOT</h5>
                  <span class="badge bg-warning text-dark">Biaya Operasional</span>
                </div>
                <div class="table-responsive">
                  <table class="table table-bordered table-hover align-middle mb-0" style="font-size: 0.85rem;">
                    <thead class="table-warning text-dark fw-bold text-center align-middle">
                      <tr>
                        <th style="width: 35px;">NO</th>
                        <th>NAMA BARANG / JENIS</th>
                        <th>JUMLAH</th>
                        <th>HARGA</th>
                        <th>TOTAL (RP)</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${mData.operasional.length === 0 ? '<tr><td colspan="5" class="text-center text-muted py-3">Tidak ada rincian biaya operasional.</td></tr>' : ''}
                      ${mData.operasional.map((o, idx) => `
                        <tr>
                          <td class="text-center fw-bold">${o.no || (idx + 1)}</td>
                          <td class="fw-semibold text-dark">${o.nama}</td>
                          <td class="text-center">${o.jumlah ? Number(o.jumlah).toLocaleString('id-ID') : '-'}</td>
                          <td class="text-end">${o.harga ? 'Rp ' + Number(o.harga).toLocaleString('id-ID') : '-'}</td>
                          <td class="text-end fw-bold text-danger">Rp ${Number(o.rp).toLocaleString('id-ID')}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                    <tfoot class="table-light fw-bold">
                      <tr>
                        <td colspan="4" class="text-center text-dark">TOTAL OPERASIONAL:</td>
                        <td class="text-end text-danger fs-6">Rp ${totOpsRp.toLocaleString('id-ID')}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- REKAPITULASI STOK SUSU -->
          <div class="card card-custom p-4 shadow-sm border-0 bg-white">
            <h5 class="fw-bold text-dark mb-3"><i class="bi bi-box-seam text-info me-2"></i>V. REKAPITULASI STOK SUSU DEPOT</h5>
            <div class="row g-3 text-center">
              <div class="col-md-2">
                <div class="p-3 bg-light rounded border">
                  <span class="d-block text-muted small fw-bold">STOK AWAL</span>
                  <span class="fs-5 fw-bold text-dark">${Math.round(mData.stok.stok_awal || 0).toLocaleString('id-ID')} Ltr</span>
                </div>
              </div>
              <div class="col-md-3">
                <div class="p-3 bg-light rounded border">
                  <span class="d-block text-muted small fw-bold">PENERIMAAN SUSU</span>
                  <span class="fs-5 fw-bold text-primary">${Math.round(mData.stok.penerimaan || 0).toLocaleString('id-ID')} Ltr</span>
                </div>
              </div>
              <div class="col-md-2">
                <div class="p-3 bg-light rounded border">
                  <span class="d-block text-muted small fw-bold">PERSEDIAAN</span>
                  <span class="fs-5 fw-bold text-success">${Math.round(mData.stok.persediaan || 0).toLocaleString('id-ID')} Ltr</span>
                </div>
              </div>
              <div class="col-md-3">
                <div class="p-3 bg-light rounded border">
                  <span class="d-block text-muted small fw-bold">PENGELUARAN</span>
                  <span class="fs-5 fw-bold text-danger">${Math.round(mData.stok.pengeluaran || 0).toLocaleString('id-ID')} Ltr</span>
                </div>
              </div>
              <div class="col-md-2">
                <div class="p-3 bg-primary text-white rounded shadow-sm">
                  <span class="d-block small fw-bold">STOK AKHIR / RIIL</span>
                  <span class="fs-5 fw-bold">${Math.round(mData.stok.stok_akhir || 0).toLocaleString('id-ID')} Ltr</span>
                </div>
              </div>
            </div>
            ${mData.stok.nb ? `
              <div class="mt-3 alert alert-secondary p-2 mb-0 small text-center fw-bold text-dark">
                <i class="bi bi-info-circle me-1"></i>Catatan Stok: ${mData.stok.nb}
              </div>
            ` : ''}
          </div>

        </div>

        <!-- TAB 1: PEMBELIAN INPUT -->
        <div class="tab-pane fade" id="pur-pane">
          <div class="card card-custom p-4 mb-4 shadow-sm border-0">
            <h5 class="fw-bold mb-3"><i class="bi bi-plus-circle-fill text-primary me-2"></i>Input / Update Pembelian Processing</h5>
            <form id="formPembelianDepot" onsubmit="DepotModule.handleSavePur(event)">
              <div class="row g-3">
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Tanggal</label>
                  <input type="date" class="form-control" name="tanggal" required value="${new Date().toISOString().substring(0,10)}">
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Harga per KG (Rp)</label>
                  <input type="number" class="form-control" id="pur_harga_kg" name="harga_per_kg" required placeholder="9000" value="9000"
                    oninput="DepotModule.hitungPembelian()">
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Jumlah KG Dibeli</label>
                  <input type="number" step="0.1" class="form-control" id="pur_jumlah_kg" name="jumlah_kg" required placeholder="misal: 39675"
                    oninput="DepotModule.hitungPembelian()">
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Faktor Densitas (Konstanta)</label>
                  <input type="text" class="form-control bg-light fw-bold text-center" id="pur_densitas" value="1.025" disabled>
                </div>
              </div>

              <!-- HASIL KALKULASI OTOMATIS -->
              <div class="mt-4 p-3 rounded-3 border" style="background: linear-gradient(135deg, #e8f4fd 0%, #f0f9ff 100%);" id="purCalcBox">
                <div class="d-flex align-items-center gap-2 mb-3">
                  <i class="bi bi-calculator-fill text-primary fs-5"></i>
                  <span class="fw-bold text-dark">Hasil Operasi Hitung Otomatis</span>
                  <span class="badge bg-primary-subtle text-primary border border-primary-subtle small ms-1">Real-time</span>
                </div>
                <div class="row g-3">
                  <div class="col-md-4">
                    <div class="p-3 bg-white rounded-3 border shadow-sm text-center">
                      <div class="text-muted small fw-bold mb-1"><i class="bi bi-box-seam me-1"></i>JUMLAH KG DIBELI</div>
                      <div class="fs-4 fw-bold text-dark" id="res_kg">— KG</div>
                      <div class="small text-muted">Input dari form</div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="p-3 bg-primary text-white rounded-3 shadow-sm text-center">
                      <div class="small fw-bold mb-1 opacity-75"><i class="bi bi-droplet-half me-1"></i>KONVERSI KE LITER</div>
                      <div class="fs-4 fw-bold" id="res_liter">— Ltr</div>
                      <div class="small opacity-75">KG ÷ Densitas 1.025</div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="p-3 bg-success text-white rounded-3 shadow-sm text-center">
                      <div class="small fw-bold mb-1 opacity-75"><i class="bi bi-currency-exchange me-1"></i>TOTAL PEMBELIAN (RP)</div>
                      <div class="fs-5 fw-bold" id="res_total_rp">Rp —</div>
                      <div class="small opacity-75">KG × Harga per KG</div>
                    </div>
                  </div>
                </div>
                <div class="mt-3 p-2 bg-white rounded border small text-muted">
                  <i class="bi bi-info-circle me-1 text-primary"></i>
                  <strong>Rumus:</strong> &nbsp;
                  Liter = KG ÷ 1.025 &nbsp;|&nbsp; Total Rp = KG × Harga/KG &nbsp;|&nbsp; Densitas Susu Segar = 1.025 (konstanta standar industri)
                </div>
              </div>

              <div class="col-md-12 d-flex justify-content-end mt-3">
                <button type="button" class="btn btn-outline-secondary me-2" onclick="document.getElementById('formPembelianDepot').reset(); DepotModule.hitungPembelian();">
                  <i class="bi bi-arrow-counterclockwise me-1"></i>Reset
                </button>
                <button type="submit" class="btn btn-primary fw-bold px-4"><i class="bi bi-save me-1"></i>Simpan Pembelian</button>
              </div>
            </form>
          </div>
        </div>

        <!-- TAB 2: PENJUALAN INPUT -->
        <div class="tab-pane fade" id="sal-pane">
          <div class="card card-custom p-4 mb-4 shadow-sm border-0">
            <h5 class="fw-bold mb-3"><i class="bi bi-plus-circle-fill text-success me-2"></i>Input / Update Penjualan Susu</h5>

            <!-- TOGGLE JENIS: AGEN / PRODUK -->
            <div class="mb-4">
              <label class="form-label small fw-bold text-dark">Pilih Jenis Penjualan:</label>
              <div class="d-flex gap-2">
                <button type="button" id="btnJenisAgen"
                  class="btn btn-success fw-bold px-4 rounded-pill shadow-sm"
                  onclick="DepotModule.setJenisPenjualan('agen')">
                  <i class="bi bi-people-fill me-2"></i>Penjualan Agen
                </button>
                <button type="button" id="btnJenisProduk"
                  class="btn btn-outline-secondary fw-bold px-4 rounded-pill"
                  onclick="DepotModule.setJenisPenjualan('produk')">
                  <i class="bi bi-box-seam me-2"></i>Penjualan Produk (Botol / Gelas)
                </button>
              </div>
              <div class="mt-2 small text-muted" id="sal_jenis_hint">
                <i class="bi bi-info-circle me-1 text-success"></i>
                Mode <strong>Agen</strong>: input volume liter langsung. Rupiah = Liter × Harga/Ltr.
              </div>
            </div>

            <!-- FORM AGEN -->
            <form id="formSalAgen" onsubmit="DepotModule.handleSaveSal(event, 'agen')">
              <div class="row g-3">
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Tanggal</label>
                  <input type="date" class="form-control" name="tanggal" required value="${new Date().toISOString().substring(0,10)}">
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold d-flex justify-content-between align-items-center">
                    <span>Nama Agen</span>
                    <span class="badge bg-primary-subtle text-primary border border-primary-subtle" style="font-size:0.68rem;">
                      ${this.getAgenList().length} Agen
                    </span>
                  </label>
                  <select class="form-select" id="sal_agen_nama" name="nama_agen" required onchange="DepotModule.hitungPenjualan('agen')">
                    <option value="">-- Pilih Agen --</option>
                    ${this.getAgenList().map(a => {
                      const isCustom = !this.DEFAULT_AGEN.includes(a);
                      return `<option value="${a}"${isCustom ? ' data-custom="1"' : ''}>${a}${isCustom ? ' ✦' : ''}</option>`;
                    }).join('')}
                  </select>
                  <!-- Tambah Agen Baru -->
                  <div class="mt-2">
                    <button type="button" class="btn btn-sm btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-1"
                      data-bs-toggle="collapse" data-bs-target="#panelAgenBaru">
                      <i class="bi bi-person-plus-fill"></i> Tambah Agen Baru
                    </button>
                    <div class="collapse mt-2" id="panelAgenBaru">
                      <div class="p-3 rounded-3 border bg-light">
                        <label class="form-label small fw-bold text-dark mb-1">
                          <i class="bi bi-pencil me-1 text-primary"></i>Nama Agen Baru
                        </label>
                        <div class="input-group input-group-sm">
                          <input type="text" id="input_agen_baru" class="form-control text-uppercase"
                            placeholder="Ketik nama agen baru..."
                            onkeydown="if(event.key==='Enter'){event.preventDefault();DepotModule.addAgenAndRefresh();}">
                          <button type="button" class="btn btn-success fw-bold px-3"
                            onclick="DepotModule.addAgenAndRefresh()">
                            <i class="bi bi-plus-lg me-1"></i>Tambah
                          </button>
                        </div>
                        <div class="mt-2 small text-muted">
                          <i class="bi bi-info-circle me-1 text-primary"></i>
                          Tekan <kbd>Enter</kbd> atau klik Tambah. Agen baru akan langsung tersimpan dan tersinkron ke Spreadsheet. Agen kustom ditandai <strong>✦</strong>.
                        </div>
                        <!-- Daftar agen kustom yang bisa dihapus -->
                        ${(() => {
                          const custom = this.getAgenList().filter(a => !this.DEFAULT_AGEN.includes(a));
                          if (custom.length === 0) return '';
                          return `<div class="mt-3">
                            <div class="small fw-bold text-muted mb-1">Agen Kustom (bisa dihapus):</div>
                            <div class="d-flex flex-wrap gap-1">
                              ${custom.map(a => `
                                <span class="badge bg-primary d-flex align-items-center gap-1 px-2 py-1" style="font-size:0.78rem;">
                                  ${a}
                                  <button type="button" class="btn-close btn-close-white ms-1" style="font-size:0.55rem;"
                                    onclick="DepotModule.removeCustomAgen('${a}'); App.render();" title="Hapus agen ini"></button>
                                </span>
                              `).join('')}
                            </div>
                          </div>`;
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Harga / Liter (Rp)</label>
                  <input type="number" class="form-control" id="sal_agen_harga" name="harga_per_liter" required
                    placeholder="11000" value="11000" oninput="DepotModule.hitungPenjualan('agen')">
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Jumlah Liter Terjual</label>
                  <input type="number" step="0.1" class="form-control" id="sal_agen_liter" name="jumlah_liter" required
                    placeholder="0.0" oninput="DepotModule.hitungPenjualan('agen')">
                </div>
              </div>


              <!-- HASIL HITUNG AGEN -->
              <div class="mt-4 p-3 rounded-3 border" style="background: linear-gradient(135deg, #e8fdf0 0%, #f0fff8 100%);">
                <div class="d-flex align-items-center gap-2 mb-3">
                  <i class="bi bi-calculator-fill text-success fs-5"></i>
                  <span class="fw-bold text-dark">Hasil Operasi Hitung Otomatis — Agen</span>
                  <span class="badge bg-success-subtle text-success border border-success-subtle small ms-1">Real-time</span>
                </div>
                <div class="row g-3">
                  <div class="col-md-4">
                    <div class="p-3 bg-white rounded-3 border shadow-sm text-center">
                      <div class="text-muted small fw-bold mb-1"><i class="bi bi-droplet me-1"></i>VOLUME TERJUAL</div>
                      <div class="fs-4 fw-bold text-primary" id="agen_res_liter">— Ltr</div>
                      <div class="small text-muted">Input dari form</div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="p-3 bg-white rounded-3 border shadow-sm text-center">
                      <div class="text-muted small fw-bold mb-1"><i class="bi bi-tag me-1"></i>HARGA PER LITER</div>
                      <div class="fs-4 fw-bold text-dark" id="agen_res_harga">Rp —</div>
                      <div class="small text-muted">Input dari form</div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="p-3 bg-success text-white rounded-3 shadow-sm text-center">
                      <div class="small fw-bold mb-1 opacity-75"><i class="bi bi-currency-exchange me-1"></i>TOTAL RUPIAH</div>
                      <div class="fs-4 fw-bold" id="agen_res_rp">Rp —</div>
                      <div class="small opacity-75">Liter × Harga/Ltr</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-end gap-2 mt-3">
                <button type="button" class="btn btn-outline-secondary" onclick="document.getElementById('formSalAgen').reset(); DepotModule.hitungPenjualan('agen');">
                  <i class="bi bi-arrow-counterclockwise me-1"></i>Reset
                </button>
                <button type="submit" class="btn btn-success fw-bold px-4"><i class="bi bi-save me-1"></i>Simpan Penjualan Agen</button>
              </div>
            </form>

            <!-- FORM PRODUK (hidden by default) -->
            <form id="formSalProduk" onsubmit="DepotModule.handleSaveSal(event, 'produk')" style="display:none;">
              <div class="row g-3">
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Tanggal</label>
                  <input type="date" class="form-control" name="tanggal" required value="${new Date().toISOString().substring(0,10)}">
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Jenis Produk</label>
                  <select class="form-select" id="sal_produk_nama" name="nama_agen" required onchange="DepotModule.setProdukDefaults()">
                    <option value="">-- Pilih Produk --</option>
                    <option value="BOTOL">BOTOL</option>
                    <option value="GELAS">GELAS</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Harga / Item (Rp)</label>
                  <input type="number" class="form-control" id="sal_produk_harga" name="harga_per_liter" required
                    placeholder="misal: 8000" oninput="DepotModule.hitungPenjualan('produk')">
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Jumlah Item Terjual</label>
                  <input type="number" class="form-control" id="sal_produk_item" name="jumlah_item" required
                    placeholder="misal: 2950" oninput="DepotModule.hitungPenjualan('produk')">
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold">
                    Faktor Per Liter
                    <span class="text-muted small fw-normal">(Item ÷ Faktor = Liter)</span>
                  </label>
                  <input type="number" step="0.01" class="form-control" id="sal_produk_per_liter" name="per_liter"
                    placeholder="misal: 3" value="3" oninput="DepotModule.hitungPenjualan('produk')">
                  <div class="form-text text-muted small">Botol ≈ 2.75 | Gelas ≈ 3</div>
                </div>
              </div>

              <!-- HASIL HITUNG PRODUK -->
              <div class="mt-4 p-3 rounded-3 border" style="background: linear-gradient(135deg, #fdf5e8 0%, #fffbf0 100%);">
                <div class="d-flex align-items-center gap-2 mb-3">
                  <i class="bi bi-calculator-fill text-warning fs-5"></i>
                  <span class="fw-bold text-dark">Hasil Operasi Hitung Otomatis — Produk</span>
                  <span class="badge bg-warning-subtle text-warning border border-warning-subtle small ms-1">Real-time</span>
                </div>
                <div class="row g-3">
                  <div class="col-md-3">
                    <div class="p-3 bg-white rounded-3 border shadow-sm text-center">
                      <div class="text-muted small fw-bold mb-1"><i class="bi bi-box-seam me-1"></i>JUMLAH ITEM</div>
                      <div class="fs-4 fw-bold text-dark" id="produk_res_item">— pcs</div>
                      <div class="small text-muted">Input dari form</div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="p-3 bg-white rounded-3 border shadow-sm text-center">
                      <div class="text-muted small fw-bold mb-1"><i class="bi bi-divide me-1"></i>FAKTOR / LITER</div>
                      <div class="fs-4 fw-bold text-dark" id="produk_res_faktor">÷ —</div>
                      <div class="small text-muted">Item per liter</div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="p-3 bg-primary text-white rounded-3 shadow-sm text-center">
                      <div class="small fw-bold mb-1 opacity-75"><i class="bi bi-droplet-half me-1"></i>KONVERSI LITER</div>
                      <div class="fs-4 fw-bold" id="produk_res_liter">— Ltr</div>
                      <div class="small opacity-75">Item ÷ Faktor</div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="p-3 bg-success text-white rounded-3 shadow-sm text-center">
                      <div class="small fw-bold mb-1 opacity-75"><i class="bi bi-currency-exchange me-1"></i>TOTAL RUPIAH</div>
                      <div class="fs-5 fw-bold" id="produk_res_rp">Rp —</div>
                      <div class="small opacity-75">Item × Harga/Item</div>
                    </div>
                  </div>
                </div>
                <div class="mt-3 p-2 bg-white rounded border small text-muted">
                  <i class="bi bi-info-circle me-1 text-warning"></i>
                  <strong>Rumus Produk:</strong> &nbsp;
                  Liter = Item ÷ Faktor &nbsp;|&nbsp; Total Rp = Item × Harga/Item
                </div>
              </div>

              <div class="d-flex justify-content-end gap-2 mt-3">
                <button type="button" class="btn btn-outline-secondary" onclick="document.getElementById('formSalProduk').reset(); DepotModule.hitungPenjualan('produk');">
                  <i class="bi bi-arrow-counterclockwise me-1"></i>Reset
                </button>
                <button type="submit" class="btn btn-warning fw-bold px-4 text-dark"><i class="bi bi-save me-1"></i>Simpan Penjualan Produk</button>
              </div>
            </form>

          </div>
        </div>

        <!-- TAB 3: OPERASIONAL INPUT -->
        <div class="tab-pane fade" id="ops-pane">
          <div class="card card-custom p-4 mb-4 shadow-sm border-0">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="fw-bold mb-0"><i class="bi bi-receipt text-warning me-2"></i>Input Biaya Operasional Depot</h5>
              <span class="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle">Biaya Operasional</span>
            </div>
            
            <form id="formOpsDepot" onsubmit="DepotModule.handleSaveOps(event)">
              <div class="row g-3">
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Tanggal</label>
                  <input type="date" class="form-control" name="tanggal" required value="${new Date().toISOString().substring(0,10)}">
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Nama Barang / Jenis</label>
                  <input type="text" class="form-control" id="ops_nama" name="nama_barang_jenis" required
                    placeholder="lemburan nataru / botol / gula / lpg / wifi">
                </div>
                <div class="col-md-2">
                  <label class="form-label small fw-bold">
                    Jumlah
                  </label>
                  <input type="number" class="form-control" id="ops_jumlah" name="jumlah"
                    placeholder="0" oninput="DepotModule.hitungOperasional()">
                </div>
                <div class="col-md-2">
                  <label class="form-label small fw-bold">
                    Harga
                  </label>
                  <input type="number" class="form-control" id="ops_harga" name="harga_satuan"
                    placeholder="0" oninput="DepotModule.hitungOperasional()">
                </div>
                <div class="col-md-2">
                  <label class="form-label small fw-bold text-danger">Total (Rp)</label>
                  <input type="number" class="form-control fw-bold border-danger" id="ops_total" name="nominal_biaya" required
                    placeholder="0" oninput="DepotModule.hitungOperasional(true)">
                </div>
              </div>

              <!-- HASIL HITUNG OPERASIONAL -->
              <div class="mt-4 p-3 rounded-3 border" style="background: linear-gradient(135deg, #fffcf0 0%, #fffbf0 100%);">
                <div class="d-flex align-items-center gap-2 mb-3">
                  <i class="bi bi-calculator-fill text-warning fs-5"></i>
                  <span class="fw-bold text-dark">Hasil Operasi Hitung Otomatis — Biaya Operasional</span>
                  <span class="badge bg-warning-subtle text-warning border border-warning-subtle small ms-1">Real-time</span>
                </div>
                <div class="row g-3">
                  <div class="col-md-4">
                    <div class="p-3 bg-white rounded-3 border shadow-sm text-center">
                      <div class="text-muted small fw-bold mb-1"><i class="bi bi-box-seam me-1"></i>JUMLAH (QTY)</div>
                      <div class="fs-4 fw-bold text-dark" id="ops_res_jumlah">—</div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="p-3 bg-white rounded-3 border shadow-sm text-center">
                      <div class="text-muted small fw-bold mb-1"><i class="bi bi-tag me-1"></i>HARGA SATUAN</div>
                      <div class="fs-4 fw-bold text-dark" id="ops_res_harga">Rp —</div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="p-3 bg-warning text-dark rounded-3 shadow-sm text-center">
                      <div class="small fw-bold mb-1 opacity-75"><i class="bi bi-currency-exchange me-1"></i>TOTAL BIAYA (RP)</div>
                      <div class="fs-4 fw-bold" id="ops_res_total">Rp —</div>
                      <div class="small opacity-75">Jumlah × Harga atau Input Langsung</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-end gap-2 mt-3">
                <button type="button" class="btn btn-outline-secondary" onclick="document.getElementById('formOpsDepot').reset(); DepotModule.hitungOperasional();">
                  <i class="bi bi-arrow-counterclockwise me-1"></i>Reset
                </button>
                <button type="submit" class="btn btn-warning text-dark fw-bold px-4"><i class="bi bi-save me-1"></i>Simpan Biaya Operasional</button>
              </div>
            </form>

            <!-- TABEL DAFTAR BIAYA OPERASIONAL (SESUAI EXCEL 1:1) -->
            <div class="mt-4 pt-3 border-top">
              <h6 class="fw-bold text-dark mb-3"><i class="bi bi-table me-2 text-warning"></i>Biaya Operasional Periode ${this.selectedMonth} ${this.selectedYear}</h6>
              <div class="table-responsive">
                <table class="table table-bordered table-hover align-middle mb-0" style="font-size: 0.85rem;">
                  <thead class="table-warning text-dark fw-bold text-center align-middle">
                    <tr>
                      <th style="width: 45px;">NO</th>
                      <th>NAMA BARANG / JENIS</th>
                      <th style="width: 120px;">JUMLAH</th>
                      <th style="width: 150px;">HARGA</th>
                      <th style="width: 180px;">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${mData.operasional.length === 0 ? '<tr><td colspan="5" class="text-center text-muted py-3">Belum ada rincian biaya operasional untuk periode ini.</td></tr>' : ''}
                    ${mData.operasional.map((o, idx) => `
                      <tr>
                        <td class="text-center fw-bold">${o.no || (idx + 1)}</td>
                        <td class="fw-semibold text-dark">${o.nama}</td>
                        <td class="text-center">${o.jumlah ? Number(o.jumlah).toLocaleString('id-ID') : ''}</td>
                        <td class="text-end">${o.harga ? 'Rp ' + Number(o.harga).toLocaleString('id-ID') : ''}</td>
                        <td class="text-end fw-bold text-danger">Rp ${Number(o.rp).toLocaleString('id-ID')}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                  <tfoot class="table-light fw-bold">
                    <tr>
                      <td colspan="4" class="text-center text-dark">TOTAL</td>
                      <td class="text-end text-danger fs-6">Rp ${totOpsRp.toLocaleString('id-ID')}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

          </div>
        </div>

      </div>
    `;
  },

  hitungPembelian: function() {
    const kg = parseFloat(document.getElementById('pur_jumlah_kg')?.value) || 0;
    const harga = parseFloat(document.getElementById('pur_harga_kg')?.value) || 0;
    const densitas = 1.025;

    const liter = kg > 0 ? kg / densitas : 0;
    const totalRp = kg * harga;

    const elKg = document.getElementById('res_kg');
    const elLiter = document.getElementById('res_liter');
    const elRp = document.getElementById('res_total_rp');

    if (elKg) elKg.textContent = kg > 0 ? kg.toLocaleString('id-ID') + ' KG' : '— KG';
    if (elLiter) elLiter.textContent = kg > 0 ? Math.round(liter).toLocaleString('id-ID') + ' Ltr' : '— Ltr';
    if (elRp) elRp.textContent = kg > 0 ? 'Rp ' + totalRp.toLocaleString('id-ID') : 'Rp —';
  },

  setJenisPenjualan: function(jenis) {
    const formAgen = document.getElementById('formSalAgen');
    const formProduk = document.getElementById('formSalProduk');
    const btnAgen = document.getElementById('btnJenisAgen');
    const btnProduk = document.getElementById('btnJenisProduk');
    const hint = document.getElementById('sal_jenis_hint');

    if (jenis === 'agen') {
      if (formAgen) formAgen.style.display = '';
      if (formProduk) formProduk.style.display = 'none';
      if (btnAgen) { btnAgen.className = 'btn btn-success fw-bold px-4 rounded-pill shadow-sm'; }
      if (btnProduk) { btnProduk.className = 'btn btn-outline-secondary fw-bold px-4 rounded-pill'; }
      if (hint) hint.innerHTML = '<i class="bi bi-info-circle me-1 text-success"></i> Mode <strong>Agen</strong>: input volume liter langsung. Rupiah = Liter × Harga/Ltr.';
    } else {
      if (formAgen) formAgen.style.display = 'none';
      if (formProduk) formProduk.style.display = '';
      if (btnAgen) { btnAgen.className = 'btn btn-outline-secondary fw-bold px-4 rounded-pill'; }
      if (btnProduk) { btnProduk.className = 'btn btn-warning fw-bold px-4 rounded-pill shadow-sm text-dark'; }
      if (hint) hint.innerHTML = '<i class="bi bi-info-circle me-1 text-warning"></i> Mode <strong>Produk</strong>: input jumlah item (botol/gelas). Liter = Item ÷ Faktor. Rupiah = Item × Harga/Item.';
    }
  },

  setProdukDefaults: function() {
    const nama = document.getElementById('sal_produk_nama')?.value;
    const hargaEl = document.getElementById('sal_produk_harga');
    const faktorEl = document.getElementById('sal_produk_per_liter');

    if (nama === 'BOTOL') {
      if (hargaEl && !hargaEl.value) hargaEl.value = 8000;
      if (faktorEl) faktorEl.value = 2.75;
    } else if (nama === 'GELAS') {
      if (hargaEl && !hargaEl.value) hargaEl.value = 6000;
      if (faktorEl) faktorEl.value = 3;
    }
    this.hitungPenjualan('produk');
  },

  hitungPenjualan: function(jenis) {
    if (jenis === 'agen') {
      const liter = parseFloat(document.getElementById('sal_agen_liter')?.value) || 0;
      const harga = parseFloat(document.getElementById('sal_agen_harga')?.value) || 0;
      const totalRp = liter * harga;

      const elLiter = document.getElementById('agen_res_liter');
      const elHarga = document.getElementById('agen_res_harga');
      const elRp = document.getElementById('agen_res_rp');

      if (elLiter) elLiter.textContent = liter > 0 ? liter.toLocaleString('id-ID') + ' Ltr' : '— Ltr';
      if (elHarga) elHarga.textContent = harga > 0 ? 'Rp ' + harga.toLocaleString('id-ID') : 'Rp —';
      if (elRp) elRp.textContent = liter > 0 && harga > 0 ? 'Rp ' + totalRp.toLocaleString('id-ID') : 'Rp —';

    } else {
      const item = parseFloat(document.getElementById('sal_produk_item')?.value) || 0;
      const harga = parseFloat(document.getElementById('sal_produk_harga')?.value) || 0;
      const faktor = parseFloat(document.getElementById('sal_produk_per_liter')?.value) || 1;
      const liter = faktor > 0 ? item / faktor : 0;
      const totalRp = item * harga;

      const elItem = document.getElementById('produk_res_item');
      const elFaktor = document.getElementById('produk_res_faktor');
      const elLiter = document.getElementById('produk_res_liter');
      const elRp = document.getElementById('produk_res_rp');

      if (elItem) elItem.textContent = item > 0 ? item.toLocaleString('id-ID') + ' pcs' : '— pcs';
      if (elFaktor) elFaktor.textContent = faktor ? '÷ ' + faktor : '÷ —';
      if (elLiter) elLiter.textContent = item > 0 ? Math.round(liter).toLocaleString('id-ID') + ' Ltr' : '— Ltr';
      if (elRp) elRp.textContent = item > 0 && harga > 0 ? 'Rp ' + totalRp.toLocaleString('id-ID') : 'Rp —';
    }
  },

  hitungOperasional: function(isManualTotal = false) {
    const jumlah = parseFloat(document.getElementById('ops_jumlah')?.value) || 0;
    const harga = parseFloat(document.getElementById('ops_harga')?.value) || 0;
    const totalEl = document.getElementById('ops_total');
    let totalRp = parseFloat(totalEl?.value) || 0;

    if (!isManualTotal && jumlah > 0 && harga > 0) {
      totalRp = jumlah * harga;
      if (totalEl) totalEl.value = totalRp;
    }

    const elJumlah = document.getElementById('ops_res_jumlah');
    const elHarga = document.getElementById('ops_res_harga');
    const elTotal = document.getElementById('ops_res_total');

    if (elJumlah) elJumlah.textContent = jumlah > 0 ? jumlah.toLocaleString('id-ID') : '—';
    if (elHarga) elHarga.textContent = harga > 0 ? 'Rp ' + harga.toLocaleString('id-ID') : 'Rp —';
    if (elTotal) elTotal.textContent = totalRp > 0 ? 'Rp ' + totalRp.toLocaleString('id-ID') : 'Rp —';
  },

  selectYear: function(year) {
    this.selectedYear = year;
    App.render();
  },

  selectMonth: function(month) {
    this.selectedMonth = month;
    App.render();
  },

  handleSavePur: async function(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Menyimpan...`;

    const data = {
      tanggal: form.tanggal.value,
      harga_per_kg: form.harga_per_kg.value,
      jumlah_kg: form.jumlah_kg.value
    };

    const res = await ApiClient.post("createDepotPembelian", data);
    btn.disabled = false;
    btn.innerHTML = `<i class="bi bi-save me-1"></i>Simpan Pembelian`;

    if (res.success) {
      showToast("Pembelian Depot berhasil disimpan!", "success");
      form.reset();
      App.render();
    } else {
      alert("Gagal: " + res.message);
    }
  },

  handleSaveSal: async function(e, jenis) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Menyimpan...`;

    let data = {};

    if (jenis === 'produk') {
      const item = parseFloat(form.jumlah_item?.value) || 0;
      const harga = parseFloat(form.harga_per_liter?.value) || 0;
      const faktor = parseFloat(form.per_liter?.value) || 1;
      const liter = faktor > 0 ? item / faktor : 0;
      const rp = item * harga;

      data = {
        tanggal: form.tanggal.value,
        nama_agen: form.nama_agen.value,
        harga_per_liter: harga,
        jumlah_item: item,
        per_liter: faktor,
        jumlah_liter: liter,
        total_rp: rp,
        jenis: 'produk'
      };
    } else {
      const liter = parseFloat(form.jumlah_liter?.value) || 0;
      const harga = parseFloat(form.harga_per_liter?.value) || 0;
      const rp = liter * harga;

      data = {
        tanggal: form.tanggal.value,
        nama_agen: form.nama_agen.value,
        harga_per_liter: harga,
        jumlah_liter: liter,
        total_rp: rp,
        jenis: 'agen'
      };
    }

    const res = await ApiClient.post("createDepotPenjualan", data);
    btn.disabled = false;
    btn.innerHTML = jenis === 'produk'
      ? `<i class="bi bi-save me-1"></i>Simpan Penjualan Produk`
      : `<i class="bi bi-save me-1"></i>Simpan Penjualan Agen`;

    if (res.success) {
      if (jenis === 'agen' && data.nama_agen) {
        this.saveAgenToLocal(data.nama_agen);
      }
      showToast(
        jenis === 'produk'
          ? `Penjualan Produk (${data.nama_agen}) berhasil disimpan!`
          : `Penjualan Agen (${data.nama_agen}) berhasil disimpan!`,
        "success"
      );
      form.reset();
      if (jenis === 'agen') this.hitungPenjualan('agen');
      if (jenis === 'produk') this.hitungPenjualan('produk');
      App.render();
    } else {
      alert("Gagal: " + res.message);
    }
  },


  handleSaveOps: async function(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Menyimpan...`;

    const data = {
      tanggal: form.tanggal.value,
      nama_barang_jenis: form.nama_barang_jenis.value,
      jumlah: form.jumlah?.value || "",
      harga_satuan: form.harga_satuan?.value || "",
      nominal_biaya: form.nominal_biaya.value
    };

    const res = await ApiClient.post("createDepotOperasional", data);
    btn.disabled = false;
    btn.innerHTML = `<i class="bi bi-save me-1"></i>Simpan Biaya Operasional`;

    if (res.success) {
      showToast("Biaya Operasional berhasil disimpan!", "success");
      form.reset();
      this.hitungOperasional();
      App.render();
    } else {
      alert("Gagal: " + res.message);
    }
  },

  exportExcel: function() {
    const mData = this.getMonthData();
    const wb = XLSX.utils.book_new();

    // Sheet 1: Pembelian
    const purWSData = [
      ["ASAL", "KG", "LITER", "HARGA/KG", "TOTAL RP"],
      ...mData.pembelian.map(p => [p.asal, p.kg, p.liter, p.harga_per_kg, p.total_rp])
    ];
    const wsPur = XLSX.utils.aoa_to_sheet(purWSData);
    XLSX.utils.book_append_sheet(wb, wsPur, "Pembelian Processing");

    // Sheet 2: Penjualan
    const salWSData = [
      ["NO", "NAMA AGEN / PRODUK", "HARGA/LTR", "QTY", "VOLUME (LITER)", "TOTAL OMSET (RP)"],
      ...mData.penjualan.map((s, idx) => [idx + 1, s.nama, s.harga, s.qty || "", s.liter, s.rp])
    ];
    const wsSal = XLSX.utils.aoa_to_sheet(salWSData);
    XLSX.utils.book_append_sheet(wb, wsSal, "Penjualan Agen");

    // Sheet 3: Operasional
    const opsWSData = [
      ["NO", "NAMA BARANG/JENIS", "JUMLAH", "HARGA", "TOTAL"],
      ...mData.operasional.map((o, idx) => [o.no || (idx + 1), o.nama, o.jumlah || "", o.harga || "", o.rp])
    ];
    const wsOps = XLSX.utils.aoa_to_sheet(opsWSData);
    XLSX.utils.book_append_sheet(wb, wsOps, "Biaya Operasional");

    XLSX.writeFile(wb, `LAPORAN_DEPOT_SUSU_${this.selectedMonth}_${this.selectedYear}.xlsx`);
    showToast("File Excel Depot (.xlsx) berhasil di-download!", "success");
  }
};
