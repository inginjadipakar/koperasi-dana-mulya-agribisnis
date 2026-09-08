import json

with open('scratch/logistik_4sec_db.json', encoding='utf-8') as f:
    logistik_db = json.load(f)

js_content = """/**
 * ============================================================
 * LOGISTIK.JS — MODUL VISUAL & INTERAKTIF DIVISI LOGISTIK
 * PRESISE 100% TERDIRI DARI 4 SEKSI EXCEL LENGKAP & BERURUTAN:
 * I. PERALATAN DAN PERLENGKAPAN TERNAK
 * II. PENJUALAN MAKANAN TERNAK (LENGKAP LIVE JUMLAH OTOMATIS)
 * III. PEMBELIAN MAKANAN TERNAK (LENGKAP LIVE JUMLAH OTOMATIS)
 * IV. STOK MAKANAN TERNAK (LENGKAP LIVE JUMLAH OTOMATIS)
 * ============================================================
 */

const LogistikModule = {
  selectedYear: "2026",
  selectedMonth: "JUNI",
  availableYears: ["2026"],

  defaultFullData: """ + json.dumps(logistik_db, indent=2) + """,

  getFullData: function() {
    const stored = localStorage.getItem("DANAMULYA_LOGISTIK_FULL_V7");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse logistik full data from localStorage", e);
      }
    }
    return JSON.parse(JSON.stringify(this.defaultFullData));
  },

  saveFullData: function(data) {
    localStorage.setItem("DANAMULYA_LOGISTIK_FULL_V7", JSON.stringify(data));
  },

  render: async function() {
    if (!AuthManager.requireAuth("logistik", "LOGISTIK")) {
      return `<div class="alert alert-danger">Akses Ditolak. Anda tidak berhak mengakses Divisi Logistik.</div>`;
    }

    const allData = this.getFullData();
    if (!allData[this.selectedMonth]) {
      allData[this.selectedMonth] = {
        sec2: [
          { no: 1, nama: "MF. A18 AGGT SUB", tunai_kg: 0, tunai_harga: 0, tunai_rp: 0, pot_kg: 0, pot_harga: 0, pot_rp: 0, piu_kg: 0, piu_harga: 0, piu_rp: 0, bunt_kg: 0, bunt_harga: 0, bunt_rp: 0, total_kg: 0, total_rp: 0 },
          { no: 2, nama: "MAGNESIUM", tunai_kg: 0, tunai_harga: 35000, tunai_rp: 0, pot_kg: 0, pot_harga: 35000, pot_rp: 0, piu_kg: 0, piu_harga: 0, piu_rp: 0, bunt_kg: 0, bunt_harga: 0, bunt_rp: 0, total_kg: 0, total_rp: 0 },
          { no: 3, nama: "DCP", tunai_kg: 0, tunai_harga: 25000, tunai_rp: 0, pot_kg: 0, pot_harga: 25000, pot_rp: 0, piu_kg: 0, piu_harga: 0, piu_rp: 0, bunt_kg: 0, bunt_harga: 0, bunt_rp: 0, total_kg: 0, total_rp: 0 },
          { no: 4, nama: "MF A20 RATIO", tunai_kg: 0, tunai_harga: 4200, tunai_rp: 0, pot_kg: 0, pot_harga: 4200, pot_rp: 0, piu_kg: 0, piu_harga: 4200, piu_rp: 0, bunt_kg: 0, bunt_harga: 4200, bunt_rp: 0, total_kg: 0, total_rp: 0 },
          { no: 5, nama: "MF A20 NON RATIO", tunai_kg: 0, tunai_harga: 4500, tunai_rp: 0, pot_kg: 0, pot_harga: 0, pot_rp: 0, piu_kg: 0, piu_harga: 0, piu_rp: 0, bunt_kg: 0, bunt_harga: 0, bunt_rp: 0, total_kg: 0, total_rp: 0 }
        ],
        sec3: [
          { no: 1, nama: "MF. A18 AGGT SUB", kg: 0, harga: 0, rp: 0 },
          { no: 2, nama: "MAGNESIUM", kg: 0, harga: 30000, rp: 0 },
          { no: 3, nama: "DCP", kg: 0, harga: 22000, rp: 0 },
          { no: 4, nama: "MIX FEED A20 TUNAI", kg: 0, harga: 4475, rp: 0 },
          { no: 5, nama: "MIX FEED A20 NESTLE", kg: 0, harga: 4360, rp: 0 }
        ],
        sec4: [
          { no: 1, nama: "MIX FEED A18", stok_awal: 0, pembelian: 0, siap_jual: 0, penjualan: 0, susut: 0, stok_akhir: 0, harga: 3900, jumlah_rp: 0 },
          { no: 2, nama: "MAGNESIUM", stok_awal: 75, pembelian: 0, siap_jual: 75, penjualan: 6, susut: 0, stok_akhir: 69, harga: 30000, jumlah_rp: 2070000 },
          { no: 3, nama: "DCP", stok_awal: 133, pembelian: 0, siap_jual: 133, penjualan: 18, susut: 0, stok_akhir: 115, harga: 25000, jumlah_rp: 2875000 },
          { no: 4, nama: "MIX FEED A20", stok_awal: 30450, pembelian: 64000, siap_jual: 94450, penjualan: 66400, susut: 150, stok_akhir: 27900, harga: 4000, jumlah_rp: 111600000 }
        ]
      };
    }

    const monthData = allData[this.selectedMonth];

    // Totals Sec II
    let totSec2Kg = monthData.sec2.reduce((a, b) => a + (Number(b.total_kg) || 0), 0);
    let totSec2Rp = monthData.sec2.reduce((a, b) => a + (Number(b.total_rp) || 0), 0);
    let totTunaiKg = monthData.sec2.reduce((a, b) => a + (Number(b.tunai_kg) || 0), 0);
    let totTunaiRp = monthData.sec2.reduce((a, b) => a + (Number(b.tunai_rp) || 0), 0);
    let totPiuKg = monthData.sec2.reduce((a, b) => a + (Number(b.piu_kg) || 0), 0);
    let totPiuRp = monthData.sec2.reduce((a, b) => a + (Number(b.piu_rp) || 0), 0);

    // Totals Sec III
    let totSec3Kg = monthData.sec3.reduce((a, b) => a + (Number(b.kg) || 0), 0);
    let totSec3Rp = monthData.sec3.reduce((a, b) => a + (Number(b.rp) || 0), 0);

    // Totals Sec IV
    let totSec4StokAkhir = monthData.sec4.reduce((a, b) => a + (Number(b.stok_akhir) || 0), 0);
    let totSec4Rp = monthData.sec4.reduce((a, b) => a + (Number(b.jumlah_rp) || 0), 0);

    const monthsList = ["JAN", "FEB", "MAR", "APRIL", "MEI", "JUNI", "JULI", "AGU", "SEP", "OKT", "NOV", "DES"];

    return `
      <!-- HEADER DIVISI LOGISTIK & AKSI -->
      <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <div>
          <h3 class="fw-bold mb-1"><i class="bi bi-truck text-warning me-2"></i>Divisi Logistik Agribisnis Dana Mulya</h3>
          <p class="text-muted mb-0">Manajemen Inventaris Peralatan Ternak & Penjualan Makanan Ternak (Pakan)</p>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-primary fw-bold shadow-sm" onclick="LogistikModule.promptAddYear()">
            <i class="bi bi-plus-lg me-1"></i>Buat / Tambah Tahun Baru
          </button>
          <a href="2026-LAP LOGISTIK.xlsx" download="2026-LAP LOGISTIK.xlsx" class="btn btn-warning fw-bold text-dark shadow-sm">
            <i class="bi bi-file-earmark-excel me-2"></i>Download Master Excel (.xlsx)
          </a>
        </div>
      </div>

      <!-- FILTER KUSTOM TAHUN & BULAN INTERAKTIF -->
      <div class="card card-custom p-3 mb-4 shadow-sm border-0 bg-white">
        <div class="row g-3 align-items-center">
          <div class="col-md-3">
            <div class="d-flex align-items-center gap-2">
              <span class="fw-bold text-muted small text-nowrap"><i class="bi bi-calendar-event me-1 text-primary"></i>Pilih Tahun:</span>
              <div class="d-flex gap-1 flex-wrap">
                ${this.availableYears.map(y => `
                  <button class="btn btn-sm ${y === this.selectedYear ? 'btn-primary fw-bold' : 'btn-outline-secondary'} rounded-pill px-3"
                          onclick="LogistikModule.selectYear('${y}')">${y}</button>
                `).join('')}
              </div>
            </div>
          </div>
          <div class="col-md-9">
            <div class="d-flex align-items-center gap-2 overflow-auto pb-1">
              <span class="fw-bold text-muted small text-nowrap"><i class="bi bi-funnel me-1 text-success"></i>Pilih Bulan:</span>
              <button class="btn btn-sm ${this.selectedMonth === 'ALL' ? 'btn-success fw-bold' : 'btn-light text-dark'} rounded-pill px-3"
                      onclick="LogistikModule.selectMonth('ALL')">Semua Bulan</button>
              ${monthsList.map(m => `
                <button class="btn btn-sm ${m === this.selectedMonth ? 'btn-success fw-bold' : 'btn-light text-dark'} rounded-pill px-3"
                        onclick="LogistikModule.selectMonth('${m}')">${m}</button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- STATUS PERIODE AKTIF -->
      <div class="alert alert-primary d-flex align-items-center justify-content-between p-3 mb-4 shadow-sm border-0">
        <div class="d-flex align-items-center gap-2">
          <i class="bi bi-info-circle-fill fs-5 text-primary me-2"></i>
          <div>
            <strong class="d-block">Menampilkan Data Periode: ${this.selectedMonth === 'ALL' ? 'Seluruh Bulan' : 'Bulan ' + this.selectedMonth} Tahun ${this.selectedYear}</strong>
            <span class="small text-muted">Seluruh 4 Seksi (I, II, III, IV) disusun berurutan lengkap dengan kalkulasi jumlah otomatis real-time!</span>
          </div>
        </div>
        <span class="badge bg-primary px-3 py-2 rounded-pill fw-bold">PERIODE ${this.selectedMonth} ${this.selectedYear}</span>
      </div>

      <!-- METRIK KPI HASIL SUM PEMBAYARAN LOGISTIK -->
      <div class="row g-3 mb-4">
        <div class="col-md-3 col-sm-6">
          <div class="metric-tile">
            <div class="metric-icon green"><i class="bi bi-cart-dash"></i></div>
            <div>
              <div class="metric-value">Rp ${totSec2Rp.toLocaleString('id-ID')}</div>
              <div class="metric-label">II. Omset Penjualan (${totSec2Kg.toLocaleString('id-ID')} KG)</div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="metric-tile">
            <div class="metric-icon blue"><i class="bi bi-cart-plus"></i></div>
            <div>
              <div class="metric-value">Rp ${totSec3Rp.toLocaleString('id-ID')}</div>
              <div class="metric-label">III. Total Pembelian (${totSec3Kg.toLocaleString('id-ID')} KG)</div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="metric-tile">
            <div class="metric-icon purple"><i class="bi bi-box-seam"></i></div>
            <div>
              <div class="metric-value">Rp ${totSec4Rp.toLocaleString('id-ID')}</div>
              <div class="metric-label">IV. Nilai Aset Stok Akhir (${totSec4StokAkhir.toLocaleString('id-ID')} KG)</div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="metric-tile">
            <div class="metric-icon amber"><i class="bi bi-exclamation-circle"></i></div>
            <div>
              <div class="metric-value">Rp ${totPiuRp.toLocaleString('id-ID')}</div>
              <div class="metric-label">Piutang Penjualan Pakan</div>
            </div>
          </div>
        </div>
      </div>

      <!-- TABS NAVIGASI 4 SEKSI BERURUTAN (I, II, III, IV) -->
      <ul class="nav nav-tabs mb-4" id="logTab" role="tablist">
        <li class="nav-item">
          <button class="nav-link active fw-bold" id="sec1-tab" data-bs-toggle="tab" data-bs-target="#sec1-pane">
            <i class="bi bi-tools me-1 text-warning"></i>I. Peralatan & Perlengkapan Ternak
          </button>
        </li>
        <li class="nav-item">
          <button class="nav-link fw-bold" id="sec2-tab" data-bs-toggle="tab" data-bs-target="#sec2-pane">
            <i class="bi bi-cart-dash me-1 text-success"></i>II. Penjualan Makanan Ternak (${this.selectedMonth} ${this.selectedYear})
          </button>
        </li>
        <li class="nav-item">
          <button class="nav-link fw-bold" id="sec3-tab" data-bs-toggle="tab" data-bs-target="#sec3-pane">
            <i class="bi bi-cart-plus me-1 text-primary"></i>III. Pembelian Makanan Ternak (${this.selectedMonth} ${this.selectedYear})
          </button>
        </li>
        <li class="nav-item">
          <button class="nav-link fw-bold" id="sec4-tab" data-bs-toggle="tab" data-bs-target="#sec4-pane">
            <i class="bi bi-box-seam me-1 text-info"></i>IV. Stok Makanan Ternak (${this.selectedMonth} ${this.selectedYear})
          </button>
        </li>
      </ul>

      <div class="tab-content">
        <!-- TAB I: INVENTARIS PERALATAN TERNAK -->
        <div class="tab-pane fade show active" id="sec1-pane">
          <div class="card card-custom p-4 shadow-sm border-0 mb-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="fw-bold mb-0 text-dark"><i class="bi bi-tools text-primary me-2"></i>I. PERALATAN DAN PERLENGKAPAN TERNAK</h5>
              <span class="badge bg-success">Data Resmi Terverifikasi</span>
            </div>
            <div class="table-responsive">
              <table class="table table-hover table-striped align-middle mb-0" style="font-size: 0.9rem;">
                <thead class="table-dark">
                  <tr>
                    <th>No</th>
                    <th>Nama Alat / Perlengkapan</th>
                    <th class="text-center">Stok Awal (Unit)</th>
                    <th class="text-end">Harga Satuan (Rp)</th>
                    <th class="text-end">Total Nilai Aset (Rp)</th>
                    <th class="text-center">Status Gudang</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td class="fw-bold text-dark">MILK CAN (Alumunium 15L/20L)</td>
                    <td class="text-center fw-bold">6</td>
                    <td class="text-end">Rp 650.000</td>
                    <td class="text-end fw-bold text-primary">Rp 3.900.000</td>
                    <td class="text-center"><span class="badge bg-success">Tersedia</span></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td class="fw-bold text-dark">SARINGAN MILK CAN</td>
                    <td class="text-center fw-bold">24</td>
                    <td class="text-end">Rp 130.000</td>
                    <td class="text-end fw-bold text-primary">Rp 3.120.000</td>
                    <td class="text-center"><span class="badge bg-success">Tersedia</span></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td class="fw-bold text-dark">TIMBA PERAH SUSU</td>
                    <td class="text-center fw-bold">32</td>
                    <td class="text-end">Rp 125.000</td>
                    <td class="text-end fw-bold text-primary">Rp 4.000.000</td>
                    <td class="text-center"><span class="badge bg-success">Tersedia</span></td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td class="fw-bold text-dark">BRANGUS SAPI</td>
                    <td class="text-center fw-bold">85</td>
                    <td class="text-end">Rp 15.000</td>
                    <td class="text-end fw-bold text-primary">Rp 1.275.000</td>
                    <td class="text-center"><span class="badge bg-success">Tersedia</span></td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td class="fw-bold text-dark">ALAT CELUP TEAT DIP</td>
                    <td class="text-center fw-bold">175</td>
                    <td class="text-end">Rp 50.000</td>
                    <td class="text-end fw-bold text-primary">Rp 8.750.000</td>
                    <td class="text-center"><span class="badge bg-success">Tersedia</span></td>
                  </tr>
                </tbody>
                <tfoot class="table-light fw-bold">
                  <tr>
                    <td colspan="2" class="text-end">TOTAL NILAI ASET PERALATAN:</td>
                    <td class="text-center text-primary">322 Unit</td>
                    <td></td>
                    <td class="text-end text-primary fs-6">Rp 21.045.000</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <!-- TAB II: PENJUALAN MAKANAN TERNAK -->
        <div class="tab-pane fade" id="sec2-pane">
          <!-- FORM MATRIX SUB-KOLOM (POSISI ATAS) -->
          <div class="card card-custom p-4 mb-4 shadow-sm border-0">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="fw-bold mb-0 text-dark">
                <i class="bi bi-pencil-square text-success me-2"></i>Input / Update Penjualan Pakan Sheet — Periode ${this.selectedMonth} ${this.selectedYear}
              </h5>
              <span class="badge bg-success">Struktur Form 1:1 Sheet Excel</span>
            </div>
            
            <form id="formLogSec2" onsubmit="LogistikModule.handleSaveSec2(event)">
              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label class="form-label small fw-bold">Pilih Jenis Pakan</label>
                  <select class="form-select fw-bold text-dark" name="nama_pakan" id="sec2SelectPakan" onchange="LogistikModule.onSelectSec2Pakan(this.value)" required>
                    ${monthData.sec2.map(it => `
                      <option value="${it.nama}">${it.no}. ${it.nama}</option>
                    `).join('')}
                    <option value="+ TAMBAH PAKAN BARU">+ Tambah Jenis Pakan Baru...</option>
                  </select>
                </div>
                <div class="col-md-6" id="sec2ColBaru" style="display:none;">
                  <label class="form-label small fw-bold">Nama Pakan Baru</label>
                  <input type="text" class="form-control" name="nama_pakan_custom" placeholder="Nama Pakan Baru">
                </div>
              </div>

              <!-- 4 KATEGORI PEMBAYARAN -->
              <div class="row g-3">
                <div class="col-md-3">
                  <div class="p-3 border rounded bg-success bg-opacity-10 h-100">
                    <h6 class="fw-bold text-success mb-2">TUNAI</h6>
                    <div class="mb-2"><label class="form-label extra-small text-muted fw-bold mb-1">Volume (KG)</label><input type="number" step="0.1" class="form-control form-control-sm" name="tunai_kg" id="sec2_tunai_kg" oninput="LogistikModule.calcSec2Preview()"></div>
                    <div><label class="form-label extra-small text-muted fw-bold mb-1">Harga / KG (Rp)</label><input type="number" class="form-control form-control-sm" name="tunai_harga" id="sec2_tunai_harga" oninput="LogistikModule.calcSec2Preview()"></div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="p-3 border rounded bg-info bg-opacity-10 h-100">
                    <h6 class="fw-bold text-primary mb-2">POTONGAN RUTIN (I&II)</h6>
                    <div class="mb-2"><label class="form-label extra-small text-muted fw-bold mb-1">Volume (KG)</label><input type="number" step="0.1" class="form-control form-control-sm" name="pot_kg" id="sec2_pot_kg" oninput="LogistikModule.calcSec2Preview()"></div>
                    <div><label class="form-label extra-small text-muted fw-bold mb-1">Harga / KG (Rp)</label><input type="number" class="form-control form-control-sm" name="pot_harga" id="sec2_pot_harga" oninput="LogistikModule.calcSec2Preview()"></div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="p-3 border rounded bg-danger bg-opacity-10 h-100">
                    <h6 class="fw-bold text-danger mb-2">PIUTANG (III)</h6>
                    <div class="mb-2"><label class="form-label extra-small text-muted fw-bold mb-1">Volume (KG)</label><input type="number" step="0.1" class="form-control form-control-sm" name="piu_kg" id="sec2_piu_kg" oninput="LogistikModule.calcSec2Preview()"></div>
                    <div><label class="form-label extra-small text-muted fw-bold mb-1">Harga / KG (Rp)</label><input type="number" class="form-control form-control-sm" name="piu_harga" id="sec2_piu_harga" oninput="LogistikModule.calcSec2Preview()"></div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="p-3 border rounded bg-warning bg-opacity-10 h-100">
                    <h6 class="fw-bold text-dark mb-2">PROGRAM BUNTING</h6>
                    <div class="mb-2"><label class="form-label extra-small text-muted fw-bold mb-1">Volume (KG)</label><input type="number" step="0.1" class="form-control form-control-sm" name="bunt_kg" id="sec2_bunt_kg" oninput="LogistikModule.calcSec2Preview()"></div>
                    <div><label class="form-label extra-small text-muted fw-bold mb-1">Harga / KG (Rp)</label><input type="number" class="form-control form-control-sm" name="bunt_harga" id="sec2_bunt_harga" oninput="LogistikModule.calcSec2Preview()"></div>
                  </div>
                </div>
              </div>

              <!-- PREVIEW BADGE JUMLAH OTOMATIS REAL-TIME -->
              <div class="d-flex justify-content-between align-items-center mt-3 pt-3 border-top flex-wrap gap-2">
                <div class="d-flex gap-3 align-items-center">
                  <span class="fw-bold text-dark small"><i class="bi bi-calculator text-success me-1"></i>Kalkulasi Otomatis (Live):</span>
                  <span class="badge bg-secondary px-3 py-2 fs-6" id="sec2PreviewKg">JUMLAH KG: 0 KG</span>
                  <span class="badge bg-success px-3 py-2 fs-6" id="sec2PreviewRp">JUMLAH RP: Rp 0</span>
                </div>
                <button type="submit" class="btn btn-success fw-bold px-4 py-2 shadow-sm"><i class="bi bi-save me-2"></i>Simpan Ke Sheet Penjualan (II)</button>
              </div>
            </form>
          </div>

          <!-- TABEL PERSIS EXCEL 1:1 II. PENJUALAN MAKANAN TERNAK -->
          <div class="card card-custom p-4 mb-4 shadow-sm border-0">
            <h5 class="fw-bold mb-3 text-dark"><i class="bi bi-journal-check text-success me-2"></i>II. PENJUALAN MAKANAN TERNAK — Sheet Periode ${this.selectedMonth} ${this.selectedYear}</h5>
            <div class="table-responsive">
              <table class="table table-hover table-bordered align-middle text-center mb-0" style="font-size: 0.83rem;">
                <thead class="bg-light text-dark fw-bold">
                  <tr>
                    <th rowspan="2" class="align-middle">NO</th>
                    <th rowspan="2" class="align-middle text-start">NAMA PAKAN</th>
                    <th colspan="3" class="bg-success bg-opacity-10">TUNAI</th>
                    <th colspan="3" class="bg-info bg-opacity-10">POTONGAN RUTIN (I&II)</th>
                    <th colspan="3" class="bg-danger bg-opacity-10">PIUTANG (III)</th>
                    <th colspan="3" class="bg-warning bg-opacity-10">PROGRAM BUNTING</th>
                    <th colspan="2" class="bg-secondary bg-opacity-10">JUMLAH</th>
                  </tr>
                  <tr>
                    <th class="bg-success bg-opacity-10">KG</th><th class="bg-success bg-opacity-10">HARGA</th><th class="bg-success bg-opacity-10">RP</th>
                    <th class="bg-info bg-opacity-10">KG</th><th class="bg-info bg-opacity-10">HARGA</th><th class="bg-info bg-opacity-10">RP</th>
                    <th class="bg-danger bg-opacity-10">KG</th><th class="bg-danger bg-opacity-10">HARGA</th><th class="bg-danger bg-opacity-10">RP</th>
                    <th class="bg-warning bg-opacity-10">KG</th><th class="bg-warning bg-opacity-10">HARGA</th><th class="bg-warning bg-opacity-10">RP</th>
                    <th class="bg-secondary bg-opacity-10">KG</th><th class="bg-secondary bg-opacity-10">RP</th>
                  </tr>
                </thead>
                <tbody>
                  ${monthData.sec2.map(it => `
                    <tr>
                      <td class="fw-bold">${it.no}</td>
                      <td class="text-start fw-bold text-dark">${it.nama}</td>
                      <td>${it.tunai_kg > 0 ? Number(it.tunai_kg).toLocaleString('id-ID') : '-'}</td>
                      <td>${it.tunai_harga > 0 ? Number(it.tunai_harga).toLocaleString('id-ID') : '-'}</td>
                      <td class="fw-semibold ${it.tunai_rp > 0 ? 'text-success' : 'text-muted'}">${it.tunai_rp > 0 ? Number(it.tunai_rp).toLocaleString('id-ID') : '-'}</td>
                      <td>${it.pot_kg > 0 ? Number(it.pot_kg).toLocaleString('id-ID') : '-'}</td>
                      <td>${it.pot_harga > 0 ? Number(it.pot_harga).toLocaleString('id-ID') : '-'}</td>
                      <td class="fw-semibold ${it.pot_rp > 0 ? 'text-primary' : 'text-muted'}">${it.pot_rp > 0 ? Number(it.pot_rp).toLocaleString('id-ID') : '-'}</td>
                      <td>${it.piu_kg > 0 ? Number(it.piu_kg).toLocaleString('id-ID') : '-'}</td>
                      <td>${it.piu_harga > 0 ? Number(it.piu_harga).toLocaleString('id-ID') : '-'}</td>
                      <td class="fw-semibold ${it.piu_rp > 0 ? 'text-danger' : 'text-muted'}">${it.piu_rp > 0 ? Number(it.piu_rp).toLocaleString('id-ID') : '-'}</td>
                      <td>${it.bunt_kg > 0 ? Number(it.bunt_kg).toLocaleString('id-ID') : '-'}</td>
                      <td>${it.bunt_harga > 0 ? Number(it.bunt_harga).toLocaleString('id-ID') : '-'}</td>
                      <td class="fw-semibold ${it.bunt_rp > 0 ? 'text-warning text-dark' : 'text-muted'}">${it.bunt_rp > 0 ? Number(it.bunt_rp).toLocaleString('id-ID') : '-'}</td>
                      <td class="fw-bold text-dark">${it.total_kg > 0 ? Number(it.total_kg).toLocaleString('id-ID') : '-'}</td>
                      <td class="fw-bold text-dark">${it.total_rp > 0 ? Number(it.total_rp).toLocaleString('id-ID') : '-'}</td>
                    </tr>
                  `).join('')}
                </tbody>
                <tfoot class="table-light fw-bold">
                  <tr class="bg-secondary bg-opacity-10">
                    <td colspan="2" class="text-center">JUMLAH TOTAL</td>
                    <td class="text-success">${totTunaiKg.toLocaleString('id-ID')}</td><td>-</td><td class="text-success">${totTunaiRp.toLocaleString('id-ID')}</td>
                    <td>-</td><td>-</td><td>-</td>
                    <td class="text-danger">${totPiuKg.toLocaleString('id-ID')}</td><td>-</td><td class="text-danger">${totPiuRp.toLocaleString('id-ID')}</td>
                    <td>-</td><td>-</td><td>-</td>
                    <td class="text-dark fs-6">${totSec2Kg.toLocaleString('id-ID')}</td>
                    <td class="text-dark fs-6">${totSec2Rp.toLocaleString('id-ID')}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <!-- TAB III: PEMBELIAN MAKANAN TERNAK -->
        <div class="tab-pane fade" id="sec3-pane">
          <!-- FORM SEC III -->
          <div class="card card-custom p-4 mb-4 shadow-sm border-0">
            <h5 class="fw-bold mb-3 text-dark"><i class="bi bi-cart-plus-fill text-primary me-2"></i>Input / Update III. Pembelian Makanan Ternak</h5>
            <form id="formLogSec3" onsubmit="LogistikModule.handleSaveSec3(event)">
              <div class="row g-3">
                <div class="col-md-4">
                  <label class="form-label small fw-bold">Nama Pakan</label>
                  <select class="form-select fw-bold" name="nama_pakan" required>
                    ${monthData.sec3.map(it => `<option value="${it.nama}">${it.no}. ${it.nama}</option>`).join('')}
                  </select>
                </div>
                <div class="col-md-4">
                  <label class="form-label small fw-bold">Volume Pembelian (KG)</label>
                  <input type="number" step="0.1" class="form-control" name="kg" id="sec3_kg" required placeholder="0.0" oninput="LogistikModule.calcSec3Preview()">
                </div>
                <div class="col-md-4">
                  <label class="form-label small fw-bold">Harga Beli per KG (Rp)</label>
                  <input type="number" class="form-control" name="harga" id="sec3_harga" required placeholder="4000" oninput="LogistikModule.calcSec3Preview()">
                </div>
              </div>

              <!-- PREVIEW BADGE JUMLAH OTOMATIS REAL-TIME -->
              <div class="d-flex justify-content-between align-items-center mt-3 pt-3 border-top flex-wrap gap-2">
                <div class="d-flex gap-3 align-items-center">
                  <span class="fw-bold text-dark small"><i class="bi bi-calculator text-primary me-1"></i>Kalkulasi Otomatis (Live):</span>
                  <span class="badge bg-primary px-3 py-2 fs-6" id="sec3PreviewRp">TOTAL RP: Rp 0</span>
                </div>
                <button type="submit" class="btn btn-primary fw-bold px-4 py-2 shadow-sm"><i class="bi bi-save me-2"></i>Simpan Ke Sheet Pembelian (III)</button>
              </div>
            </form>
          </div>

          <!-- TABEL PERSIS EXCEL 1:1 III. PEMBELIAN MAKANAN TERNAK -->
          <div class="card card-custom p-4 shadow-sm border-0">
            <h5 class="fw-bold mb-3 text-dark"><i class="bi bi-journal-plus text-primary me-2"></i>III. PEMBELIAN MAKANAN TERNAK — Periode ${this.selectedMonth} ${this.selectedYear}</h5>
            <div class="table-responsive">
              <table class="table table-hover table-bordered align-middle text-center mb-0" style="font-size: 0.9rem;">
                <thead class="table-primary text-dark fw-bold">
                  <tr>
                    <th style="width: 80px;">NO</th>
                    <th class="text-start">NAMA PAKAN</th>
                    <th class="text-end">KG</th>
                    <th class="text-end">HARGA</th>
                    <th class="text-end">RP</th>
                  </tr>
                </thead>
                <tbody>
                  ${monthData.sec3.map(it => `
                    <tr>
                      <td class="fw-bold">${it.no}</td>
                      <td class="text-start fw-bold text-dark">${it.nama}</td>
                      <td class="text-end fw-bold text-primary">${it.kg > 0 ? Number(it.kg).toLocaleString('id-ID') : '-'}</td>
                      <td class="text-end">${it.harga > 0 ? Number(it.harga).toLocaleString('id-ID') : '-'}</td>
                      <td class="text-end fw-bold text-dark">${it.rp > 0 ? Number(it.rp).toLocaleString('id-ID') : '-'}</td>
                    </tr>
                  `).join('')}
                </tbody>
                <tfoot class="table-light fw-bold">
                  <tr>
                    <td colspan="2" class="text-center">JUMLAH TOTAL</td>
                    <td class="text-end text-primary fs-6">${totSec3Kg.toLocaleString('id-ID')}</td>
                    <td>-</td>
                    <td class="text-end text-dark fs-6">Rp ${totSec3Rp.toLocaleString('id-ID')}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <!-- TAB IV: STOK MAKANAN TERNAK -->
        <div class="tab-pane fade" id="sec4-pane">
          <!-- FORM SEC IV -->
          <div class="card card-custom p-4 mb-4 shadow-sm border-0">
            <h5 class="fw-bold mb-3 text-dark"><i class="bi bi-box-seam-fill text-info me-2"></i>Input / Update IV. Stok Makanan Ternak & Susut</h5>
            <form id="formLogSec4" onsubmit="LogistikModule.handleSaveSec4(event)">
              <div class="row g-3">
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Nama Pakan</label>
                  <select class="form-select fw-bold" name="nama_pakan" id="sec4SelectPakan" onchange="LogistikModule.onSelectSec4Pakan(this.value)" required>
                    ${monthData.sec4.map(it => `<option value="${it.nama}">${it.no}. ${it.nama}</option>`).join('')}
                  </select>
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Stok Awal Gudang (KG)</label>
                  <input type="number" step="0.1" class="form-control" name="stok_awal" id="sec4_stok_awal" required placeholder="0" oninput="LogistikModule.calcSec4Preview()">
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Jumlah Susut (KG)</label>
                  <input type="number" step="0.1" class="form-control" name="susut" id="sec4_susut" required placeholder="0" oninput="LogistikModule.calcSec4Preview()">
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Harga Satuan Stok (Rp)</label>
                  <input type="number" class="form-control" name="harga" id="sec4_harga" required placeholder="4000" oninput="LogistikModule.calcSec4Preview()">
                </div>
              </div>

              <!-- PREVIEW BADGE JUMLAH OTOMATIS REAL-TIME -->
              <div class="d-flex justify-content-between align-items-center mt-3 pt-3 border-top flex-wrap gap-2">
                <div class="d-flex gap-3 align-items-center flex-wrap">
                  <span class="fw-bold text-dark small"><i class="bi bi-calculator text-info me-1"></i>Kalkulasi Otomatis (Live):</span>
                  <span class="badge bg-primary px-3 py-2 fs-6" id="sec4PreviewSiapJual">SIAP JUAL: 0 KG</span>
                  <span class="badge bg-info text-dark px-3 py-2 fs-6" id="sec4PreviewStokAkhir">ESTIMASI STOK AKHIR: 0 KG</span>
                  <span class="badge bg-dark px-3 py-2 fs-6" id="sec4PreviewRp">ESTIMASI RP: Rp 0</span>
                </div>
                <button type="submit" class="btn btn-info text-white fw-bold px-4 py-2 shadow-sm"><i class="bi bi-save me-2"></i>Simpan & Hitung Keseimbangan Stok (IV)</button>
              </div>
            </form>
          </div>

          <!-- TABEL PERSIS EXCEL 1:1 IV. STOK MAKANAN TERNAK -->
          <div class="card card-custom p-4 shadow-sm border-0">
            <h5 class="fw-bold mb-3 text-dark"><i class="bi bi-boxes text-info me-2"></i>IV. STOK MAKANAN TERNAK — Periode ${this.selectedMonth} ${this.selectedYear}</h5>
            <div class="table-responsive">
              <table class="table table-hover table-bordered align-middle text-center mb-0" style="font-size: 0.85rem;">
                <thead class="table-info text-dark fw-bold">
                  <tr>
                    <th>NO</th>
                    <th class="text-start">NAMA PAKAN</th>
                    <th>STOK AWAL</th>
                    <th>PEMBELIAN</th>
                    <th>SIAP JUAL</th>
                    <th>PENJUALAN</th>
                    <th>SUSUT</th>
                    <th>STOK AKHIR</th>
                    <th>HARGA</th>
                    <th>JUMLAH (RP)</th>
                  </tr>
                </thead>
                <tbody>
                  ${monthData.sec4.map(it => `
                    <tr>
                      <td class="fw-bold">${it.no}</td>
                      <td class="text-start fw-bold text-dark">${it.nama}</td>
                      <td>${it.stok_awal > 0 ? Number(it.stok_awal).toLocaleString('id-ID') : '-'}</td>
                      <td>${it.pembelian > 0 ? Number(it.pembelian).toLocaleString('id-ID') : '-'}</td>
                      <td class="fw-semibold text-primary">${it.siap_jual > 0 ? Number(it.siap_jual).toLocaleString('id-ID') : '-'}</td>
                      <td class="text-success fw-semibold">${it.penjualan > 0 ? Number(it.penjualan).toLocaleString('id-ID') : '-'}</td>
                      <td class="text-danger">${it.susut > 0 ? Number(it.susut).toLocaleString('id-ID') : '0'}</td>
                      <td class="fw-bold text-dark fs-6 bg-light">${it.stok_akhir > 0 ? Number(it.stok_akhir).toLocaleString('id-ID') : '0'}</td>
                      <td>${it.harga > 0 ? Number(it.harga).toLocaleString('id-ID') : '-'}</td>
                      <td class="fw-bold text-dark">${it.jumlah_rp > 0 ? Number(it.jumlah_rp).toLocaleString('id-ID') : '-'}</td>
                    </tr>
                  `).join('')}
                </tbody>
                <tfoot class="table-light fw-bold">
                  <tr>
                    <td colspan="7" class="text-end">TOTAL JUMLAH KESELURUHAN (STOK AKHIR & RP):</td>
                    <td class="text-center text-primary fs-6">${totSec4StokAkhir.toLocaleString('id-ID')} KG</td>
                    <td></td>
                    <td class="text-center text-dark fs-6">Rp ${totSec4Rp.toLocaleString('id-ID')}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

      </div>

      <!-- MASTER EXCEL VIEWER TAMPILAN 1:1 LOGISTIK -->
      <div class="card card-custom p-4 border-0 shadow-sm mt-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="fw-bold mb-0 text-dark"><i class="bi bi-file-earmark-spreadsheet me-2 text-warning"></i>TAMPILAN EXCEL ASLI LOGISTIK (2026-LAP LOGISTIK.xlsx)</h5>
          <button class="btn btn-sm btn-outline-warning text-dark fw-bold" type="button" onclick="RecapModule ? RecapModule.toggleExcelPreview() : App.loadExcelViewerScript()">
            <i class="bi bi-eye me-1"></i>Tampilkan / Sembunyikan Sheet Excel
          </button>
        </div>
        <div class="collapse" id="collapseExcelMaster">
          <div id="excelContainerInDashboard" class="p-2">
            ${(typeof ExcelViewerModule !== 'undefined') ? ExcelViewerModule.render() : '<div class="text-center text-muted py-3">Klik tombol di atas untuk memuat pratinjau Excel...</div>'}
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

  promptAddYear: function() {
    const inputYear = prompt("Masukkan Tahun Baru (misal: 2027):", (parseInt(this.selectedYear) + 1).toString());
    if (inputYear && inputYear.trim()) {
      const yr = inputYear.trim();
      if (!this.availableYears.includes(yr)) {
        this.availableYears.push(yr);
        this.selectedYear = yr;
        this.selectedMonth = "JAN";
        alert(`Tahun Laporan Baru (${yr}) Berhasil Ditambahkan!\nAnda dapat memilih tahun ${yr} dan menginput data baru untuk tahun tersebut.`);
        App.render();
      } else {
        this.selectYear(yr);
      }
    }
  },

  calcSec2Preview: function() {
    const tKg = Number(document.getElementById("sec2_tunai_kg")?.value || 0);
    const tH = Number(document.getElementById("sec2_tunai_harga")?.value || 0);
    const pKg = Number(document.getElementById("sec2_pot_kg")?.value || 0);
    const pH = Number(document.getElementById("sec2_pot_harga")?.value || 0);
    const iuKg = Number(document.getElementById("sec2_piu_kg")?.value || 0);
    const iuH = Number(document.getElementById("sec2_piu_harga")?.value || 0);
    const bKg = Number(document.getElementById("sec2_bunt_kg")?.value || 0);
    const bH = Number(document.getElementById("sec2_bunt_harga")?.value || 0);

    const totKg = tKg + pKg + iuKg + bKg;
    const totRp = (tKg * tH) + (pKg * pH) + (iuKg * iuH) + (bKg * bH);

    const elKg = document.getElementById("sec2PreviewKg");
    const elRp = document.getElementById("sec2PreviewRp");
    if (elKg) elKg.innerText = "JUMLAH KG: " + totKg.toLocaleString("id-ID") + " KG";
    if (elRp) elRp.innerText = "JUMLAH RP: Rp " + totRp.toLocaleString("id-ID");
  },

  calcSec3Preview: function() {
    const kg = Number(document.getElementById("sec3_kg")?.value || 0);
    const harga = Number(document.getElementById("sec3_harga")?.value || 0);
    const totRp = kg * harga;

    const elRp = document.getElementById("sec3PreviewRp");
    if (elRp) elRp.innerText = "TOTAL RP: Rp " + totRp.toLocaleString("id-ID");
  },

  calcSec4Preview: function() {
    const namaPakan = document.getElementById("sec4SelectPakan")?.value || "";
    const stokAwal = Number(document.getElementById("sec4_stok_awal")?.value || 0);
    const susut = Number(document.getElementById("sec4_susut")?.value || 0);
    const harga = Number(document.getElementById("sec4_harga")?.value || 0);

    const allData = this.getFullData();
    const sec4Items = allData[this.selectedMonth]?.sec4 || [];
    const item = sec4Items.find(it => it.nama === namaPakan) || {};

    const pembelian = Number(item.pembelian || 0);
    const penjualan = Number(item.penjualan || 0);

    const siapJual = stokAwal + pembelian;
    const stokAkhir = Math.max(0, siapJual - penjualan - susut);
    const totRp = stokAkhir * harga;

    const elSiap = document.getElementById("sec4PreviewSiapJual");
    const elAkhir = document.getElementById("sec4PreviewStokAkhir");
    const elRp = document.getElementById("sec4PreviewRp");

    if (elSiap) elSiap.innerText = "SIAP JUAL: " + siapJual.toLocaleString("id-ID") + " KG";
    if (elAkhir) elAkhir.innerText = "ESTIMASI STOK AKHIR: " + stokAkhir.toLocaleString("id-ID") + " KG";
    if (elRp) elRp.innerText = "ESTIMASI RP: Rp " + totRp.toLocaleString("id-ID");
  },

  onSelectSec2Pakan: function(val) {
    const colNew = document.getElementById("sec2ColBaru");
    if (colNew) colNew.style.display = (val === "+ TAMBAH PAKAN BARU") ? "block" : "none";
    const allData = this.getFullData();
    const monthData = allData[this.selectedMonth] || { sec2: [] };
    const item = monthData.sec2.find(it => it.nama === val);
    if (item) {
      document.getElementById("sec2_tunai_kg").value = item.tunai_kg || "";
      document.getElementById("sec2_tunai_harga").value = item.tunai_harga || "";
      document.getElementById("sec2_pot_kg").value = item.pot_kg || "";
      document.getElementById("sec2_pot_harga").value = item.pot_harga || "";
      document.getElementById("sec2_piu_kg").value = item.piu_kg || "";
      document.getElementById("sec2_piu_harga").value = item.piu_harga || "";
      document.getElementById("sec2_bunt_kg").value = item.bunt_kg || "";
      document.getElementById("sec2_bunt_harga").value = item.bunt_harga || "";
    } else {
      document.getElementById("sec2_tunai_kg").value = "";
      document.getElementById("sec2_tunai_harga").value = "";
      document.getElementById("sec2_pot_kg").value = "";
      document.getElementById("sec2_pot_harga").value = "";
      document.getElementById("sec2_piu_kg").value = "";
      document.getElementById("sec2_piu_harga").value = "";
      document.getElementById("sec2_bunt_kg").value = "";
      document.getElementById("sec2_bunt_harga").value = "";
    }
    this.calcSec2Preview();
  },

  onSelectSec4Pakan: function(val) {
    const allData = this.getFullData();
    const sec4Items = allData[this.selectedMonth]?.sec4 || [];
    const item = sec4Items.find(it => it.nama === val);
    if (item) {
      document.getElementById("sec4_stok_awal").value = item.stok_awal || "";
      document.getElementById("sec4_susut").value = item.susut || "0";
      document.getElementById("sec4_harga").value = item.harga || "";
    }
    this.calcSec4Preview();
  },

  handleSaveSec2: async function(e) {
    e.preventDefault();
    const form = e.target;
    let namaPakan = form.nama_pakan.value;
    if (namaPakan === "+ TAMBAH PAKAN BARU") {
      namaPakan = form.nama_pakan_custom.value.trim() || "PAKAN BARU";
    }
    const tKg = Number(form.tunai_kg.value || 0);
    const tH = Number(form.tunai_harga.value || 0);
    const pKg = Number(form.pot_kg.value || 0);
    const pH = Number(form.pot_harga.value || 0);
    const iuKg = Number(form.piu_kg.value || 0);
    const iuH = Number(form.piu_harga.value || 0);
    const bKg = Number(form.bunt_kg.value || 0);
    const bH = Number(form.bunt_harga.value || 0);

    const allData = this.getFullData();
    const items = allData[this.selectedMonth].sec2;
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

    this.saveFullData(allData);
    alert(`Data Penjualan "${namaPakan}" berhasil diperbarui pada Seksi II!`);
    App.render();
  },

  handleSaveSec3: async function(e) {
    e.preventDefault();
    const form = e.target;
    const namaPakan = form.nama_pakan.value;
    const kg = Number(form.kg.value || 0);
    const harga = Number(form.harga.value || 0);

    const allData = this.getFullData();
    const items = allData[this.selectedMonth].sec3;
    let item = items.find(it => it.nama.toLowerCase() === namaPakan.toLowerCase());

    if (!item) {
      item = { no: items.length + 1, nama: namaPakan, kg: 0, harga: 0, rp: 0 };
      items.push(item);
    }

    item.kg = kg;
    item.harga = harga;
    item.rp = kg * harga;

    this.saveFullData(allData);
    alert(`Data Pembelian "${namaPakan}" berhasil disimpan pada Seksi III!`);
    App.render();
  },

  handleSaveSec4: async function(e) {
    e.preventDefault();
    const form = e.target;
    const namaPakan = form.nama_pakan.value;
    const stok_awal = Number(form.stok_awal.value || 0);
    const susut = Number(form.susut.value || 0);
    const harga = Number(form.harga.value || 0);

    const allData = this.getFullData();
    const sec4Items = allData[this.selectedMonth].sec4;
    let item = sec4Items.find(it => it.nama.toLowerCase().includes(namaPakan.toLowerCase()) || namaPakan.toLowerCase().includes(it.nama.toLowerCase()));

    if (!item) {
      item = { no: sec4Items.length + 1, nama: namaPakan, stok_awal: 0, pembelian: 0, siap_jual: 0, penjualan: 0, susut: 0, stok_akhir: 0, harga: 0, jumlah_rp: 0 };
      sec4Items.push(item);
    }

    item.stok_awal = stok_awal;
    item.susut = susut;
    item.harga = harga;
    item.siap_jual = item.stok_awal + (item.pembelian || 0);
    item.stok_akhir = Math.max(0, item.siap_jual - (item.penjualan || 0) - item.susut);
    item.jumlah_rp = item.stok_akhir * item.harga;

    this.saveFullData(allData);
    alert(`Data Keseimbangan Stok "${namaPakan}" berhasil diperbarui pada Seksi IV!`);
    App.render();
  }
};
"""

with open('js/logistik.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print('DIRECTLY WROTE LIVE PREVIEW TO ALL SECTIONS SUCCESS!')
