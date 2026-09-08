import json

# Read scratch/depot_full_final.json
with open('scratch/depot_full_final.json', 'r') as f:
    full_data = json.load(f)

full_data_json = json.dumps(full_data, indent=2)

js_content = f"""/**
 * ============================================================
 * DEPOT.JS — MODUL VISUAL & INTERAKTIF DIVISI DEPOT SUSU
 * PRESISE 100% TERDIRI DARI LAPORAN PENERIMAAN & PENGELUARAN EXCEL
 * 1:1 SINKRON DENGAN SHEET EXCEL (JANUARI - JULI 2026)
 * ============================================================
 */

const DepotModule = {{
  selectedYear: "2026",
  selectedMonth: "JUNI",
  availableYears: ["2026"],

  defaultFullData: {full_data_json},

  getMonthData: function(monthCode) {{
    const code = monthCode || this.selectedMonth;
    if (this.defaultFullData[code]) {{
      return this.defaultFullData[code];
    }}
    // Fallback to JUNI if available
    return this.defaultFullData["JUNI"] || {{
      pembelian: [{{ asal: "PROCESSING", kg: 39675, liter: 38708, harga_per_kg: 9000, total_rp: 357075000 }}],
      penjualan: [
        {{ nama: "HERU", harga: 11000, qty: 0, liter: 9245, rp: 101695000 }},
        {{ nama: "JAINAL", harga: 11000, qty: 0, liter: 4290, rp: 47190000 }},
        {{ nama: "USMAN", harga: 10000, qty: 0, liter: 4455, rp: 44550000 }},
        {{ nama: "NINDRI", harga: 10000, qty: 0, liter: 2232, rp: 22320000 }},
        {{ nama: "ISA", harga: 10000, qty: 0, liter: 720, rp: 7200000 }},
        {{ nama: "YULI", harga: 11000, qty: 0, liter: 790, rp: 8690000 }},
        {{ nama: "PURI", harga: 10000, qty: 0, liter: 2256, rp: 22560000 }},
        {{ nama: "GRESIK", harga: 10000, qty: 0, liter: 1650, rp: 16500000 }},
        {{ nama: "SUDAR", harga: 11000, qty: 0, liter: 174, rp: 1914000 }},
        {{ nama: "UMUM", harga: 12000, qty: 0, liter: 7511, rp: 90126000 }},
        {{ nama: "GELAS", harga: 6000, qty: 953, liter: 318, rp: 5718000 }},
        {{ nama: "BOTOL", harga: 8000, qty: 3257, liter: 814, rp: 26056000 }}
      ],
      lain_lain: [
        {{ keterangan: "SUSUT MASAK", qty: 0, liter: 250 }},
        {{ keterangan: "SUSUT LITER", qty: 0, liter: 2768 }},
        {{ keterangan: "SUSU SOSIAL", qty: 0, liter: 20 }},
        {{ keterangan: "SUSU BONUS AGEN", qty: 0, liter: 1120 }}
      ],
      operasional: [
        {{ no: 1, nama: "sampah", rp: 50000 }},
        {{ no: 2, nama: "wifi", rp: 150000 }},
        {{ no: 3, nama: "lpg", rp: 240000 }},
        {{ no: 4, nama: "gula", rp: 1465000 }},
        {{ no: 5, nama: "kresek", rp: 1926000 }},
        {{ no: 6, nama: "plastik", rp: 2235000 }},
        {{ no: 7, nama: "lemburan", rp: 500000 }},
        {{ no: 8, nama: "galon", rp: 66000 }},
        {{ no: 9, nama: "kopi", rp: 66000 }},
        {{ no: 10, nama: "botol", rp: 8170000 }},
        {{ no: 11, nama: "beli wd", rp: 60000 }},
        {{ no: 12, nama: "beli tang", rp: 30000 }},
        {{ no: 13, nama: "tabung lpg", rp: 195000 }}
      ],
      stok: {{ stok_awal: 450, penerimaan: 38708, persediaan: 39158, pengeluaran: 34958, stok_akhir: 4200 }}
    }};
  }},

  getPembelianData: async function() {{
    const res = await ApiClient.post("getDepotPembelian");
    if (res.success && res.data && res.data.length > 0) return res.data;
    const m = this.getMonthData();
    return m.pembelian;
  }},

  getPenjualanData: async function() {{
    const res = await ApiClient.post("getDepotPenjualan");
    if (res.success && res.data && res.data.length > 0) return res.data;
    const m = this.getMonthData();
    return m.penjualan;
  }},

  render: async function() {{
    if (!AuthManager.requireAuth("depot", "DEPOT")) {{
      return `<div class="alert alert-danger">Akses Ditolak. Anda tidak berhak mengakses Divisi Depot Susu.</div>`;
    }}

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
      <!-- HEADER DEPOT -->
      <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <div>
          <h3 class="fw-bold mb-1"><i class="bi bi-cup-straw text-primary me-2"></i>Divisi Depot Susu Danamulya</h3>
          <p class="text-muted mb-0">Laporan Penerimaan & Pengeluaran Depot Susu 100% Sinkron Sheet Excel</p>
        </div>
        <div class="d-flex gap-2">
          <button onclick="DepotModule.promptAddYear()" class="btn btn-outline-primary fw-bold shadow-sm">
            <i class="bi bi-plus-lg me-1"></i>Buat / Tambah Tahun Baru
          </button>
          <button onclick="DepotModule.exportExcel()" class="btn btn-primary fw-bold shadow-sm">
            <i class="bi bi-file-earmark-excel me-2"></i>Export Excel (.xlsx)
          </button>
        </div>
      </div>

      <!-- FILTER TAHUN & BULAN -->
      <div class="card card-custom p-3 mb-4 shadow-sm border-0 bg-white">
        <div class="row g-3 align-items-center">
          <div class="col-md-3">
            <div class="d-flex align-items-center gap-2">
              <span class="fw-bold text-muted small text-nowrap"><i class="bi bi-calendar-event me-1 text-primary"></i>Pilih Tahun:</span>
              <div class="d-flex gap-1 flex-wrap">
                ${{this.availableYears.map(y => `
                  <button class="btn btn-sm ${{y === this.selectedYear ? 'btn-primary fw-bold' : 'btn-outline-secondary'}} rounded-pill px-3"
                          onclick="DepotModule.selectYear('${{y}}')">${{y}}</button>
                `).join('')}}
              </div>
            </div>
          </div>
          <div class="col-md-9">
            <div class="d-flex align-items-center gap-2 overflow-auto pb-1">
              <span class="fw-bold text-muted small text-nowrap"><i class="bi bi-funnel me-1 text-primary"></i>Pilih Bulan Report:</span>
              ${{monthsList.map(m => `
                <button class="btn btn-sm ${{m === this.selectedMonth ? 'btn-primary fw-bold shadow-sm' : 'btn-light text-dark'}} rounded-pill px-3"
                        onclick="DepotModule.selectMonth('${{m}}')">${{m}}</button>
              `).join('')}}
            </div>
          </div>
        </div>
      </div>

      <!-- STATUS PERIODE AKTIF -->
      <div class="alert alert-primary d-flex align-items-center justify-content-between p-3 mb-4 shadow-sm border-0">
        <div class="d-flex align-items-center gap-2">
          <i class="bi bi-info-circle-fill fs-5 text-primary me-2"></i>
          <div>
            <strong class="d-block">Laporan Depot Susu Periode: Bulan ${{this.selectedMonth}} Tahun ${{this.selectedYear}}</strong>
            <span class="small text-muted">Data presisi dari file Excel 'LAPORAN BULANAN 2026 DEPOT SUSU.xlsx'</span>
          </div>
        </div>
        <span class="badge bg-primary px-3 py-2 rounded-pill fw-bold">PERIODE ${{this.selectedMonth}} ${{this.selectedYear}}</span>
      </div>

      <!-- Metrik Summary Tile -->
      <div class="row g-3 mb-4">
        <div class="col-md-3">
          <div class="metric-tile">
            <div class="metric-icon blue"><i class="bi bi-cart-down"></i></div>
            <div>
              <div class="metric-value">${{Math.round(totPurLtr).toLocaleString('id-ID')}} Ltr</div>
              <div class="metric-label">Pembelian Processing (${{Math.round(totPurKg).toLocaleString('id-ID')}} KG)</div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="metric-tile">
            <div class="metric-icon green"><i class="bi bi-shop"></i></div>
            <div>
              <div class="metric-value">${{Math.round(totSalLtr).toLocaleString('id-ID')}} Ltr</div>
              <div class="metric-label">Penjualan Agen & Produk</div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="metric-tile">
            <div class="metric-icon purple"><i class="bi bi-currency-dollar"></i></div>
            <div>
              <div class="metric-value">Rp ${{totSalRp.toLocaleString('id-ID')}}</div>
              <div class="metric-label">Total Omset Penjualan</div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="metric-tile">
            <div class="metric-icon amber"><i class="bi bi-receipt"></i></div>
            <div>
              <div class="metric-value">Rp ${{totOpsRp.toLocaleString('id-ID')}}</div>
              <div class="metric-label">Biaya Operasional</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Nav Tabs -->
      <ul class="nav nav-tabs mb-4" id="depTab" role="tablist">
        <li class="nav-item">
          <button class="nav-link active fw-bold" id="sheet-tab" data-bs-toggle="tab" data-bs-target="#sheet-pane">
            <i class="bi bi-table me-1 text-primary"></i>Laporan Sheet Excel Matrix (1:1)
          </button>
        </li>
        <li class="nav-item">
          <button class="nav-link fw-bold" id="pur-tab" data-bs-toggle="tab" data-bs-target="#pur-pane">
            <i class="bi bi-cart-down me-1 text-success"></i>I. Pembelian Processing
          </button>
        </li>
        <li class="nav-item">
          <button class="nav-link fw-bold" id="sal-tab" data-bs-toggle="tab" data-bs-target="#sal-pane">
            <i class="bi bi-shop me-1 text-info"></i>II. Penjualan Agen & Produk
          </button>
        </li>
        <li class="nav-item">
          <button class="nav-link fw-bold" id="ops-tab" data-bs-toggle="tab" data-bs-target="#ops-pane">
            <i class="bi bi-receipt me-1 text-warning"></i>III. Biaya Operasional
          </button>
        </li>
      </ul>

      <div class="tab-content">
        <!-- TAB MAIN: 1:1 EXCEL MATRIX REPORT -->
        <div class="tab-pane fade show active" id="sheet-pane">

          <!-- JUDUL LAPORAN EXCEL -->
          <div class="card card-custom p-4 mb-4 shadow-sm border-0 bg-white text-center">
            <h4 class="fw-bold text-dark mb-1">LAPORAN PENERIMAAN DAN PENGELUARAN DEPOT SUSU</h4>
            <h5 class="fw-bold text-primary mb-2">KOPERASI AGRIBISNIS DANA MULYA PACET</h5>
            <span class="badge bg-dark align-self-center px-4 py-2 fs-6 rounded-pill">PERIODE ${{this.selectedMonth}} ${{this.selectedYear}}</span>
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
                    <thead class="table-dark text-center align-middle">
                      <tr>
                        <th>ASAL</th>
                        <th>KG</th>
                        <th>LITER</th>
                        <th>HARGA / KG</th>
                        <th>TOTAL (RP)</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${{mData.pembelian.map(p => `
                        <tr>
                          <td class="fw-bold text-dark text-center">${{p.asal}}</td>
                          <td class="text-end fw-bold">${{Math.round(p.kg).toLocaleString('id-ID')}}</td>
                          <td class="text-end fw-bold text-primary">${{Math.round(p.liter).toLocaleString('id-ID')}}</td>
                          <td class="text-end">Rp ${{Number(p.harga_per_kg).toLocaleString('id-ID')}}</td>
                          <td class="text-end fw-bold text-success">Rp ${{Number(p.total_rp).toLocaleString('id-ID')}}</td>
                        </tr>
                      `).join('')}}
                    </tbody>
                    <tfoot class="table-light fw-bold">
                      <tr>
                        <td class="text-center text-dark">TOTAL PEMBELIAN</td>
                        <td class="text-end text-dark">${{Math.round(totPurKg).toLocaleString('id-ID')}}</td>
                        <td class="text-end text-primary">${{Math.round(totPurLtr).toLocaleString('id-ID')}}</td>
                        <td></td>
                        <td class="text-end text-success fs-6">Rp ${{totPurRp.toLocaleString('id-ID')}}</td>
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
                    <thead class="table-dark text-center align-middle">
                      <tr>
                        <th>NO</th>
                        <th>KETERANGAN</th>
                        <th>QTY (BOTOL)</th>
                        <th>VOLUME (LITER)</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${{mData.lain_lain.length === 0 ? '<tr><td colspan="4" class="text-center text-muted py-3">Tidak ada pengeluaran lain-lain.</td></tr>' : ''}}
                      ${{mData.lain_lain.map((l, idx) => `
                        <tr>
                          <td class="text-center">${{idx + 1}}</td>
                          <td class="fw-semibold text-dark">${{l.keterangan}}</td>
                          <td class="text-center">${{l.qty ? Math.round(l.qty).toLocaleString('id-ID') : '-'}}</td>
                          <td class="text-end fw-bold text-danger">${{Math.round(l.liter).toLocaleString('id-ID')}} Ltr</td>
                        </tr>
                      `).join('')}}
                    </tbody>
                    <tfoot class="table-light fw-bold">
                      <tr>
                        <td colspan="3" class="text-center text-dark">JUMLAH LAIN-LAIN:</td>
                        <td class="text-end text-danger fs-6">${{Math.round(totLainLtr).toLocaleString('id-ID')}} Ltr</td>
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
                  <span class="badge bg-success">Struktur Matrix Sheet Excel</span>
                </div>
                <div class="table-responsive">
                  <table class="table table-bordered table-hover align-middle mb-0" style="font-size: 0.85rem;">
                    <thead class="table-dark text-center align-middle">
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
                      ${{mData.penjualan.map((s, idx) => `
                        <tr class="${{s.nama === 'GELAS' || s.nama === 'BOTOL' ? 'table-warning' : ''}}">
                          <td class="text-center">${{idx + 1}}</td>
                          <td class="fw-bold text-dark">${{s.nama}}</td>
                          <td class="text-end">Rp ${{Number(s.harga).toLocaleString('id-ID')}}</td>
                          <td class="text-center">${{s.qty ? Math.round(s.qty).toLocaleString('id-ID') : '-'}}</td>
                          <td class="text-end fw-bold text-primary">${{Math.round(s.liter).toLocaleString('id-ID')}}</td>
                          <td class="text-end fw-bold text-success">Rp ${{Number(s.rp).toLocaleString('id-ID')}}</td>
                        </tr>
                      `).join('')}}
                    </tbody>
                    <tfoot class="table-light fw-bold">
                      <tr>
                        <td colspan="4" class="text-center text-dark">TOTAL PENJUALAN DEPOT:</td>
                        <td class="text-end text-primary fs-6">${{Math.round(totSalLtr).toLocaleString('id-ID')}} Ltr</td>
                        <td class="text-end text-success fs-6">Rp ${{totSalRp.toLocaleString('id-ID')}}</td>
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
                  <span class="badge bg-warning text-dark">Rekapitulasi Pengeluaran</span>
                </div>
                <div class="table-responsive">
                  <table class="table table-bordered table-hover align-middle mb-0" style="font-size: 0.85rem;">
                    <thead class="table-dark text-center align-middle">
                      <tr>
                        <th style="width: 40px;">NO</th>
                        <th>NAMA BARANG / BIAYA</th>
                        <th>NOMINAL BIAYA (RP)</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${{mData.operasional.length === 0 ? '<tr><td colspan="3" class="text-center text-muted py-3">Tidak ada rincian biaya operasional.</td></tr>' : ''}}
                      ${{mData.operasional.map(o => `
                        <tr>
                          <td class="text-center fw-bold">${{o.no}}</td>
                          <td class="fw-semibold text-dark">${{o.nama}}</td>
                          <td class="text-end fw-bold text-danger">Rp ${{Number(o.rp).toLocaleString('id-ID')}}</td>
                        </tr>
                      `).join('')}}
                    </tbody>
                    <tfoot class="table-light fw-bold">
                      <tr>
                        <td colspan="2" class="text-center text-dark">TOTAL OPERASIONAL:</td>
                        <td class="text-end text-danger fs-6">Rp ${{totOpsRp.toLocaleString('id-ID')}}</td>
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
                  <span class="fs-5 fw-bold text-dark">${{Math.round(mData.stok.stok_awal || 0).toLocaleString('id-ID')}} Ltr</span>
                </div>
              </div>
              <div class="col-md-3">
                <div class="p-3 bg-light rounded border">
                  <span class="d-block text-muted small fw-bold">PENERIMAAN SUSU</span>
                  <span class="fs-5 fw-bold text-primary">${{Math.round(mData.stok.penerimaan || 0).toLocaleString('id-ID')}} Ltr</span>
                </div>
              </div>
              <div class="col-md-2">
                <div class="p-3 bg-light rounded border">
                  <span class="d-block text-muted small fw-bold">PERSEDIAAN</span>
                  <span class="fs-5 fw-bold text-success">${{Math.round(mData.stok.persediaan || 0).toLocaleString('id-ID')}} Ltr</span>
                </div>
              </div>
              <div class="col-md-3">
                <div class="p-3 bg-light rounded border">
                  <span class="d-block text-muted small fw-bold">PENGELUARAN</span>
                  <span class="fs-5 fw-bold text-danger">${{Math.round(mData.stok.pengeluaran || 0).toLocaleString('id-ID')}} Ltr</span>
                </div>
              </div>
              <div class="col-md-2">
                <div class="p-3 bg-primary text-white rounded shadow-sm">
                  <span class="d-block small fw-bold">STOK AKHIR / RIIL</span>
                  <span class="fs-5 fw-bold">${{Math.round(mData.stok.stok_akhir || 0).toLocaleString('id-ID')}} Ltr</span>
                </div>
              </div>
            </div>
            ${{mData.stok.nb ? `
              <div class="mt-3 alert alert-secondary p-2 mb-0 small text-center fw-bold text-dark">
                <i class="bi bi-info-circle me-1"></i>Catatan Stok: ${{mData.stok.nb}}
              </div>
            ` : ''}}
          </div>

        </div>

        <!-- TAB 1: PEMBELIAN INPUT -->
        <div class="tab-pane fade" id="pur-pane">
          <div class="card card-custom p-4 mb-4 shadow-sm border-0">
            <h5 class="fw-bold mb-3"><i class="bi bi-plus-circle-fill text-primary me-2"></i>Input / Update Pembelian Processing</h5>
            <form onsubmit="DepotModule.handleSavePur(event)">
              <div class="row g-3">
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Tanggal</label>
                  <input type="date" class="form-control" name="tanggal" required value="${{new Date().toISOString().substring(0,10)}}">
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Harga per KG (Rp)</label>
                  <input type="number" class="form-control" name="harga_per_kg" required placeholder="9000" value="9000">
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Jumlah KG Dibeli</label>
                  <input type="number" step="0.1" class="form-control" name="jumlah_kg" required placeholder="misal: 39675">
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Faktor Densitas</label>
                  <input type="text" class="form-control" value="1.025 (Konstanta)" disabled>
                </div>
                <div class="col-md-12 d-flex justify-content-end">
                  <button type="submit" class="btn btn-primary fw-bold px-4"><i class="bi bi-save me-1"></i>Simpan Pembelian</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- TAB 2: PENJUALAN INPUT -->
        <div class="tab-pane fade" id="sal-pane">
          <div class="card card-custom p-4 mb-4 shadow-sm border-0">
            <h5 class="fw-bold mb-3"><i class="bi bi-plus-circle-fill text-success me-2"></i>Input / Update Penjualan Susu Agen</h5>
            <form onsubmit="DepotModule.handleSaveSal(event)">
              <div class="row g-3">
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Tanggal</label>
                  <input type="date" class="form-control" name="tanggal" required value="${{new Date().toISOString().substring(0,10)}}">
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Nama Agen / Produk</label>
                  <input type="text" class="form-control" name="nama_agen" required placeholder="HERU / JAINAL / GELAS / BOTOL">
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Harga per Liter (Rp)</label>
                  <input type="number" class="form-control" name="harga_per_liter" required placeholder="11000" value="11000">
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Jumlah Liter Terjual</label>
                  <input type="number" step="0.1" class="form-control" name="jumlah_liter" required placeholder="0.0">
                </div>
                <div class="col-md-12 d-flex justify-content-end">
                  <button type="submit" class="btn btn-success fw-bold px-4"><i class="bi bi-save me-1"></i>Simpan Penjualan</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- TAB 3: OPERASIONAL INPUT -->
        <div class="tab-pane fade" id="ops-pane">
          <div class="card card-custom p-4 mb-4 shadow-sm border-0">
            <h5 class="fw-bold mb-3"><i class="bi bi-receipt text-warning me-2"></i>Input Biaya Operasional Depot</h5>
            <form onsubmit="DepotModule.handleSaveOps(event)">
              <div class="row g-3">
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Tanggal</label>
                  <input type="date" class="form-control" name="tanggal" required value="${{new Date().toISOString().substring(0,10)}}">
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Nama Barang / Biaya</label>
                  <input type="text" class="form-control" name="nama_barang_jenis" required placeholder="Plastik / LPG / Gula">
                </div>
                <div class="col-md-3">
                  <label class="form-label small fw-bold">Nominal Biaya (Rp)</label>
                  <input type="number" class="form-control" name="nominal_biaya" required placeholder="0">
                </div>
                <div class="col-md-3 d-flex align-items-end">
                  <button type="submit" class="btn btn-warning text-white w-100 fw-bold"><i class="bi bi-save me-1"></i>Simpan Biaya Operasional</button>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
    `;
  }},

  selectYear: function(year) {{
    this.selectedYear = year;
    App.render();
  }},

  selectMonth: function(month) {{
    this.selectedMonth = month;
    App.render();
  }},

  promptAddYear: function() {{
    showPromptYear(this.selectedYear, (yr) => {{
      if (!this.availableYears.includes(yr)) {{
        this.availableYears.push(yr);
        this.selectedYear = yr;
        this.selectedMonth = "JUNI";
        showToast(`Tahun ${{yr}} Berhasil Ditambahkan!`, "success");
        App.render();
      }} else {{
        this.selectYear(yr);
      }}
    }});
  }},

  handleSavePur: async function(e) {{
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Menyimpan...`;

    const data = {{
      tanggal: form.tanggal.value,
      harga_per_kg: form.harga_per_kg.value,
      jumlah_kg: form.jumlah_kg.value
    }};

    const res = await ApiClient.post("createDepotPembelian", data);
    btn.disabled = false;
    btn.innerHTML = `<i class="bi bi-save me-1"></i>Simpan Pembelian`;

    if (res.success) {{
      showToast("Pembelian Depot berhasil disimpan!", "success");
      form.reset();
      App.render();
    }} else {{
      alert("Gagal: " + res.message);
    }}
  }},

  handleSaveSal: async function(e) {{
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Menyimpan...`;

    const data = {{
      tanggal: form.tanggal.value,
      nama_agen: form.nama_agen.value,
      harga_per_liter: form.harga_per_liter.value,
      jumlah_liter: form.jumlah_liter.value
    }};

    const res = await ApiClient.post("createDepotPenjualan", data);
    btn.disabled = false;
    btn.innerHTML = `<i class="bi bi-save me-1"></i>Simpan Penjualan`;

    if (res.success) {{
      showToast("Penjualan Agen berhasil disimpan!", "success");
      form.reset();
      App.render();
    }} else {{
      alert("Gagal: " + res.message);
    }}
  }},

  handleSaveOps: async function(e) {{
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Menyimpan...`;

    const data = {{
      tanggal: form.tanggal.value,
      nama_barang_jenis: form.nama_barang_jenis.value,
      nominal_biaya: form.nominal_biaya.value
    }};

    const res = await ApiClient.post("createDepotOperasional", data);
    btn.disabled = false;
    btn.innerHTML = `<i class="bi bi-save me-1"></i>Simpan Biaya Operasional`;

    if (res.success) {{
      showToast("Biaya Operasional berhasil disimpan!", "success");
      form.reset();
      App.render();
    }} else {{
      alert("Gagal: " + res.message);
    }}
  }},

  exportExcel: function() {{
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
      ["NO", "NAMA BARANG / BIAYA", "NOMINAL BIAYA (RP)"],
      ...mData.operasional.map(o => [o.no, o.nama, o.rp])
    ];
    const wsOps = XLSX.utils.aoa_to_sheet(opsWSData);
    XLSX.utils.book_append_sheet(wb, wsOps, "Biaya Operasional");

    XLSX.writeFile(wb, `LAPORAN_DEPOT_SUSU_${{this.selectedMonth}}_${{this.selectedYear}}.xlsx`);
    showToast("File Excel Depot (.xlsx) berhasil di-download!", "success");
  }}
}};
"""

with open('js/depot.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print('Updated js/depot.js with integer rounding successfully!')
