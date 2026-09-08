import json

with open('scratch/logistik_db.json', encoding='utf-8') as f:
    logistik_db = json.load(f)

js_content = '''/**
 * ============================================================
 * LOGISTIK.JS — MODUL VISUAL & INTERAKTIF DIVISI LOGISTIK
 * PRESISE 100% SESUAI STRUKTUR & TABEL EXCEL ASLI
 * FORM INPUT MATCHING 1:1 KOLOM SHEET EXCEL
 * ============================================================
 */

const LogistikModule = {
  selectedYear: "2026",
  selectedMonth: "JUNI",
  availableYears: ["2026"],

  defaultMonthlyData: ''' + json.dumps(logistik_db, indent=2) + ''',

  getMonthlyData: function() {
    const stored = localStorage.getItem("DANAMULYA_LOGISTIK_MATRIX_V3");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse logistik matrix from localStorage", e);
      }
    }
    return JSON.parse(JSON.stringify(this.defaultMonthlyData));
  },

  saveMonthlyData: function(data) {
    localStorage.setItem("DANAMULYA_LOGISTIK_MATRIX_V3", JSON.stringify(data));
  },

  render: async function() {
    if (!AuthManager.requireAuth("logistik", "LOGISTIK")) {
      return `<div class="alert alert-danger">Akses Ditolak. Anda tidak berhak mengakses Divisi Logistik.</div>`;
    }

    const allMonthly = this.getMonthlyData();
    
    // Pastikan bulan aktif tersedia di objek data
    if (!allMonthly[this.selectedMonth]) {
      allMonthly[this.selectedMonth] = {
        items: [
          { no: 1, nama: "MF. A18 AGGT SUB", tunai_kg: 0, tunai_harga: 0, tunai_rp: 0, pot_kg: 0, pot_harga: 0, pot_rp: 0, piu_kg: 0, piu_harga: 0, piu_rp: 0, bunt_kg: 0, bunt_harga: 0, bunt_rp: 0, total_kg: 0, total_rp: 0 },
          { no: 2, nama: "MAGNESIUM", tunai_kg: 0, tunai_harga: 35000, tunai_rp: 0, pot_kg: 0, pot_harga: 35000, pot_rp: 0, piu_kg: 0, piu_harga: 0, piu_rp: 0, bunt_kg: 0, bunt_harga: 0, bunt_rp: 0, total_kg: 0, total_rp: 0 },
          { no: 3, nama: "DCP", tunai_kg: 0, tunai_harga: 25000, tunai_rp: 0, pot_kg: 0, pot_harga: 25000, pot_rp: 0, piu_kg: 0, piu_harga: 0, piu_rp: 0, bunt_kg: 0, bunt_harga: 0, bunt_rp: 0, total_kg: 0, total_rp: 0 },
          { no: 4, nama: "MF A20 RATIO", tunai_kg: 0, tunai_harga: 4200, tunai_rp: 0, pot_kg: 0, pot_harga: 4200, pot_rp: 0, piu_kg: 0, piu_harga: 4200, piu_rp: 0, bunt_kg: 0, bunt_harga: 4200, bunt_rp: 0, total_kg: 0, total_rp: 0 },
          { no: 5, nama: "MF A20 NON RATIO", tunai_kg: 0, tunai_harga: 4500, tunai_rp: 0, pot_kg: 0, pot_harga: 0, pot_rp: 0, piu_kg: 0, piu_harga: 0, piu_rp: 0, bunt_kg: 0, bunt_harga: 0, bunt_rp: 0, total_kg: 0, total_rp: 0 }
        ]
      };
    }

    const monthData = allMonthly[this.selectedMonth] || { items: [] };

    // Hitung total dari data matriks sheet
    let totTunaiKg = monthData.items.reduce((a, b) => a + (Number(b.tunai_kg) || 0), 0);
    let totTunaiRp = monthData.items.reduce((a, b) => a + (Number(b.tunai_rp) || 0), 0);
    let totPotKg = monthData.items.reduce((a, b) => a + (Number(b.pot_kg) || 0), 0);
    let totPotRp = monthData.items.reduce((a, b) => a + (Number(b.pot_rp) || 0), 0);
    let totPiuKg = monthData.items.reduce((a, b) => a + (Number(b.piu_kg) || 0), 0);
    let totPiuRp = monthData.items.reduce((a, b) => a + (Number(b.piu_rp) || 0), 0);
    let totBuntKg = monthData.items.reduce((a, b) => a + (Number(b.bunt_kg) || 0), 0);
    let totBuntRp = monthData.items.reduce((a, b) => a + (Number(b.bunt_rp) || 0), 0);

    const displayVol = totTunaiKg + totPotKg + totPiuKg + totBuntKg;
    const displayOmset = totTunaiRp + totPotRp + totPiuRp + totBuntRp;

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
            <span class="small text-muted">Form penginputan di bawah disusun 1:1 mengikuti sub-kolom kategori (KG & HARGA) pada sheet Excel!</span>
          </div>
        </div>
        <span class="badge bg-primary px-3 py-2 rounded-pill fw-bold">PERIODE ${this.selectedMonth} ${this.selectedYear}</span>
      </div>

      <!-- METRIK KPI HASIL SUM PEMBAYARAN LOGISTIK -->
      <div class="row g-3 mb-4">
        <div class="col-md-3 col-sm-6">
          <div class="metric-tile">
            <div class="metric-icon green"><i class="bi bi-box-seam"></i></div>
            <div>
              <div class="metric-value">${displayVol.toLocaleString('id-ID')} KG</div>
              <div class="metric-label">Total Volume Penjualan Pakan</div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="metric-tile">
            <div class="metric-icon purple"><i class="bi bi-graph-up-arrow"></i></div>
            <div>
              <div class="metric-value">Rp ${displayOmset.toLocaleString('id-ID')}</div>
              <div class="metric-label">Total Omset Penjualan Pakan</div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="metric-tile">
            <div class="metric-icon blue"><i class="bi bi-cash"></i></div>
            <div>
              <div class="metric-value">Rp ${totTunaiRp.toLocaleString('id-ID')}</div>
              <div class="metric-label">Penjualan Tunai (${totTunaiKg.toLocaleString('id-ID')} KG)</div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="metric-tile">
            <div class="metric-icon amber"><i class="bi bi-exclamation-circle"></i></div>
            <div>
              <div class="metric-value">Rp ${totPiuRp.toLocaleString('id-ID')}</div>
              <div class="metric-label">Piutang (III) (${totPiuKg.toLocaleString('id-ID')} KG)</div>
            </div>
          </div>
        </div>
      </div>

      <!-- TABS NAVIGASI -->
      <ul class="nav nav-tabs mb-4" id="logTab" role="tablist">
        <li class="nav-item">
          <button class="nav-link active fw-bold" id="log-pen-tab" data-bs-toggle="tab" data-bs-target="#log-pen-pane">
            <i class="bi bi-table me-1 text-success"></i>II. Penjualan Makanan Ternak (${this.selectedMonth} ${this.selectedYear})
          </button>
        </li>
        <li class="nav-item">
          <button class="nav-link fw-bold" id="log-eq-tab" data-bs-toggle="tab" data-bs-target="#log-eq-pane">
            <i class="bi bi-tools me-1 text-warning"></i>I. Peralatan & Perlengkapan Ternak
          </button>
        </li>
      </ul>

      <div class="tab-content">
        <!-- TAB 1: FORM INPUT PRESISE EXCEL DI ATAS, TABEL EXCEL 1:1 DI BAWAH -->
        <div class="tab-pane fade show active" id="log-pen-pane">
          
          <!-- FORM INPUT PRESISE METODE MATRIX EXCEL — POSISI ATAS -->
          <div class="card card-custom p-4 mb-4 shadow-sm border-0">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="fw-bold mb-0 text-dark">
                <i class="bi bi-pencil-square text-success me-2"></i>Input / Update Penjualan Pakan Sheet — Periode ${this.selectedMonth} ${this.selectedYear}
              </h5>
              <span class="badge bg-success">Struktur Form 1:1 Sheet Excel</span>
            </div>
            
            <form id="formLogSheet" onsubmit="LogistikModule.handleSaveSheetMatrix(event)">
              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label class="form-label small fw-bold">1. Pilih Jenis Pakan Yang Ingin Di-Input / Diperbarui</label>
                  <select class="form-select fw-bold text-dark" name="nama_pakan" id="selectNamaPakan" onchange="LogistikModule.onSelectPakan(this.value)" required>
                    ${monthData.items.map(it => `
                      <option value="${it.nama}">${it.no}. ${it.nama}</option>
                    `).join('')}
                    <option value="+ TAMBAH PAKAN BARU">+ Tambah Jenis Pakan Baru...</option>
                  </select>
                </div>
                <div class="col-md-6" id="colPakanBaru" style="display:none;">
                  <label class="form-label small fw-bold">Nama Pakan Baru</label>
                  <input type="text" class="form-control" name="nama_pakan_custom" placeholder="misal: MINERAL TERNAK">
                </div>
              </div>

              <!-- INPUT SUB-KOLOM DENGAN STRUKTUR SAMA DENGAN HEADER SHEET EXCEL -->
              <div class="row g-3">
                <!-- TUNAI -->
                <div class="col-md-3">
                  <div class="p-3 border rounded bg-success bg-opacity-10 h-100">
                    <h6 class="fw-bold text-success mb-2"><i class="bi bi-cash me-1"></i>TUNAI</h6>
                    <div class="mb-2">
                      <label class="form-label extra-small text-muted fw-bold mb-1">Volume (KG)</label>
                      <input type="number" step="0.1" class="form-control form-control-sm" name="tunai_kg" id="input_tunai_kg" placeholder="0" oninput="LogistikModule.calcPreview()">
                    </div>
                    <div>
                      <label class="form-label extra-small text-muted fw-bold mb-1">Harga / KG (Rp)</label>
                      <input type="number" class="form-control form-control-sm" name="tunai_harga" id="input_tunai_harga" placeholder="0" oninput="LogistikModule.calcPreview()">
                    </div>
                  </div>
                </div>

                <!-- POTONGAN RUTIN (I&II) -->
                <div class="col-md-3">
                  <div class="p-3 border rounded bg-info bg-opacity-10 h-100">
                    <h6 class="fw-bold text-primary mb-2"><i class="bi bi-receipt me-1"></i>POTONGAN RUTIN (I&II)</h6>
                    <div class="mb-2">
                      <label class="form-label extra-small text-muted fw-bold mb-1">Volume (KG)</label>
                      <input type="number" step="0.1" class="form-control form-control-sm" name="pot_kg" id="input_pot_kg" placeholder="0" oninput="LogistikModule.calcPreview()">
                    </div>
                    <div>
                      <label class="form-label extra-small text-muted fw-bold mb-1">Harga / KG (Rp)</label>
                      <input type="number" class="form-control form-control-sm" name="pot_harga" id="input_pot_harga" placeholder="0" oninput="LogistikModule.calcPreview()">
                    </div>
                  </div>
                </div>

                <!-- PIUTANG (III) -->
                <div class="col-md-3">
                  <div class="p-3 border rounded bg-danger bg-opacity-10 h-100">
                    <h6 class="fw-bold text-danger mb-2"><i class="bi bi-exclamation-circle me-1"></i>PIUTANG (III)</h6>
                    <div class="mb-2">
                      <label class="form-label extra-small text-muted fw-bold mb-1">Volume (KG)</label>
                      <input type="number" step="0.1" class="form-control form-control-sm" name="piu_kg" id="input_piu_kg" placeholder="0" oninput="LogistikModule.calcPreview()">
                    </div>
                    <div>
                      <label class="form-label extra-small text-muted fw-bold mb-1">Harga / KG (Rp)</label>
                      <input type="number" class="form-control form-control-sm" name="piu_harga" id="input_piu_harga" placeholder="0" oninput="LogistikModule.calcPreview()">
                    </div>
                  </div>
                </div>

                <!-- PROGRAM BUNTING -->
                <div class="col-md-3">
                  <div class="p-3 border rounded bg-warning bg-opacity-10 h-100">
                    <h6 class="fw-bold text-dark mb-2"><i class="bi bi-heart-pulse me-1"></i>PROGRAM BUNTING</h6>
                    <div class="mb-2">
                      <label class="form-label extra-small text-muted fw-bold mb-1">Volume (KG)</label>
                      <input type="number" step="0.1" class="form-control form-control-sm" name="bunt_kg" id="input_bunt_kg" placeholder="0" oninput="LogistikModule.calcPreview()">
                    </div>
                    <div>
                      <label class="form-label extra-small text-muted fw-bold mb-1">Harga / KG (Rp)</label>
                      <input type="number" class="form-control form-control-sm" name="bunt_harga" id="input_bunt_harga" placeholder="0" oninput="LogistikModule.calcPreview()">
                    </div>
                  </div>
                </div>
              </div>

              <!-- PREVIEW RINGKASAN JUMLAH & TOMBOL SIMPAN -->
              <div class="d-flex justify-content-between align-items-center mt-3 pt-3 border-top flex-wrap gap-2">
                <div class="d-flex gap-3 align-items-center">
                  <span class="fw-bold text-dark small">Kalkulasi Otomatis Kolom JUMLAH:</span>
                  <span class="badge bg-secondary px-3 py-2 fs-6" id="previewTotalKg">JUMLAH KG: 0 KG</span>
                  <span class="badge bg-success px-3 py-2 fs-6" id="previewTotalRp">JUMLAH RP: Rp 0</span>
                </div>
                <button type="submit" class="btn btn-success fw-bold px-4 py-2 shadow-sm">
                  <i class="bi bi-save me-2"></i>Simpan Ke Sheet Logistik (${this.selectedMonth} ${this.selectedYear})
                </button>
              </div>
            </form>
          </div>

          <!-- TABEL PERSIS EXCEL 1:1 II. PENJUALAN MAKANAN TERNAK -->
          <div class="card card-custom p-4 mb-4 shadow-sm border-0">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="fw-bold mb-0 text-dark"><i class="bi bi-journal-check text-success me-2"></i>II. PENJUALAN MAKANAN TERNAK — Sheet Periode ${this.selectedMonth} ${this.selectedYear}</h5>
              <span class="badge bg-success">Data Resmi Ter-Update</span>
            </div>
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
                    <th class="bg-success bg-opacity-10">KG</th>
                    <th class="bg-success bg-opacity-10">HARGA</th>
                    <th class="bg-success bg-opacity-10">RP</th>
                    <th class="bg-info bg-opacity-10">KG</th>
                    <th class="bg-info bg-opacity-10">HARGA</th>
                    <th class="bg-info bg-opacity-10">RP</th>
                    <th class="bg-danger bg-opacity-10">KG</th>
                    <th class="bg-danger bg-opacity-10">HARGA</th>
                    <th class="bg-danger bg-opacity-10">RP</th>
                    <th class="bg-warning bg-opacity-10">KG</th>
                    <th class="bg-warning bg-opacity-10">HARGA</th>
                    <th class="bg-warning bg-opacity-10">RP</th>
                    <th class="bg-secondary bg-opacity-10">KG</th>
                    <th class="bg-secondary bg-opacity-10">RP</th>
                  </tr>
                </thead>
                <tbody>
                  ${monthData.items.length === 0 ? '<tr><td colspan="17" class="text-center text-muted py-4">Belum ada catatan di periode ini. Silakan input transaksi di atas.</td></tr>' : ''}
                  ${monthData.items.map(it => `
                    <tr>
                      <td class="fw-bold">${it.no}</td>
                      <td class="text-start fw-bold text-dark">${it.nama}</td>
                      
                      <!-- TUNAI -->
                      <td>${it.tunai_kg > 0 ? Number(it.tunai_kg).toLocaleString('id-ID') : '-'}</td>
                      <td>${it.tunai_harga > 0 ? Number(it.tunai_harga).toLocaleString('id-ID') : '-'}</td>
                      <td class="fw-semibold ${it.tunai_rp > 0 ? 'text-success' : 'text-muted'}">${it.tunai_rp > 0 ? Number(it.tunai_rp).toLocaleString('id-ID') : '-'}</td>
                      
                      <!-- POTONGAN RUTIN -->
                      <td>${it.pot_kg > 0 ? Number(it.pot_kg).toLocaleString('id-ID') : '-'}</td>
                      <td>${it.pot_harga > 0 ? Number(it.pot_harga).toLocaleString('id-ID') : '-'}</td>
                      <td class="fw-semibold ${it.pot_rp > 0 ? 'text-primary' : 'text-muted'}">${it.pot_rp > 0 ? Number(it.pot_rp).toLocaleString('id-ID') : '-'}</td>
                      
                      <!-- PIUTANG -->
                      <td>${it.piu_kg > 0 ? Number(it.piu_kg).toLocaleString('id-ID') : '-'}</td>
                      <td>${it.piu_harga > 0 ? Number(it.piu_harga).toLocaleString('id-ID') : '-'}</td>
                      <td class="fw-semibold ${it.piu_rp > 0 ? 'text-danger' : 'text-muted'}">${it.piu_rp > 0 ? Number(it.piu_rp).toLocaleString('id-ID') : '-'}</td>
                      
                      <!-- PROGRAM BUNTING -->
                      <td>${it.bunt_kg > 0 ? Number(it.bunt_kg).toLocaleString('id-ID') : '-'}</td>
                      <td>${it.bunt_harga > 0 ? Number(it.bunt_harga).toLocaleString('id-ID') : '-'}</td>
                      <td class="fw-semibold ${it.bunt_rp > 0 ? 'text-warning text-dark' : 'text-muted'}">${it.bunt_rp > 0 ? Number(it.bunt_rp).toLocaleString('id-ID') : '-'}</td>
                      
                      <!-- JUMLAH -->
                      <td class="fw-bold text-dark">${it.total_kg > 0 ? Number(it.total_kg).toLocaleString('id-ID') : '-'}</td>
                      <td class="fw-bold text-dark">${it.total_rp > 0 ? Number(it.total_rp).toLocaleString('id-ID') : '-'}</td>
                    </tr>
                  `).join('')}
                </tbody>
                <tfoot class="table-light fw-bold">
                  <tr class="bg-secondary bg-opacity-10">
                    <td colspan="2" class="text-center">JUMLAH TOTAL</td>
                    <td class="text-success">${totTunaiKg.toLocaleString('id-ID')}</td>
                    <td>-</td>
                    <td class="text-success">${totTunaiRp.toLocaleString('id-ID')}</td>
                    <td class="text-primary">${totPotKg.toLocaleString('id-ID')}</td>
                    <td>-</td>
                    <td class="text-primary">${totPotRp.toLocaleString('id-ID')}</td>
                    <td class="text-danger">${totPiuKg.toLocaleString('id-ID')}</td>
                    <td>-</td>
                    <td class="text-danger">${totPiuRp.toLocaleString('id-ID')}</td>
                    <td class="text-dark">${totBuntKg.toLocaleString('id-ID')}</td>
                    <td>-</td>
                    <td class="text-dark">${totBuntRp.toLocaleString('id-ID')}</td>
                    <td class="text-dark fs-6">${displayVol.toLocaleString('id-ID')}</td>
                    <td class="text-dark fs-6">${displayOmset.toLocaleString('id-ID')}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

        </div>

        <!-- TAB 2: INVENTARIS PERALATAN TERNAK -->
        <div class="tab-pane fade" id="log-eq-pane">
          <div class="card card-custom p-4 shadow-sm border-0 mb-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="fw-bold mb-0 text-dark"><i class="bi bi-tools text-primary me-2"></i>I. PERALATAN DAN PERLENGKAPAN TERNAK</h5>
              <span class="badge bg-success">Data Resmi 2026</span>
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
        alert(`Tahun Laporan Baru (${yr}) Berhasil Ditambahkan!
Anda dapat memilih tahun ${yr} dan menginput data baru untuk tahun tersebut.`);
        App.render();
      } else {
        this.selectYear(yr);
      }
    }
  },

  onSelectPakan: function(val) {
    const colNew = document.getElementById("colPakanBaru");
    if (colNew) colNew.style.display = (val === "+ TAMBAH PAKAN BARU") ? "block" : "none";
    
    // Auto fill existing values if available
    const allMonthly = this.getMonthlyData();
    const monthData = allMonthly[this.selectedMonth] || { items: [] };
    const item = monthData.items.find(it => it.nama === val);

    if (item) {
      document.getElementById("input_tunai_kg").value = item.tunai_kg || "";
      document.getElementById("input_tunai_harga").value = item.tunai_harga || "";
      document.getElementById("input_pot_kg").value = item.pot_kg || "";
      document.getElementById("input_pot_harga").value = item.pot_harga || "";
      document.getElementById("input_piu_kg").value = item.piu_kg || "";
      document.getElementById("input_piu_harga").value = item.piu_harga || "";
      document.getElementById("input_bunt_kg").value = item.bunt_kg || "";
      document.getElementById("input_bunt_harga").value = item.bunt_harga || "";
    } else {
      document.getElementById("input_tunai_kg").value = "";
      document.getElementById("input_tunai_harga").value = "";
      document.getElementById("input_pot_kg").value = "";
      document.getElementById("input_pot_harga").value = "";
      document.getElementById("input_piu_kg").value = "";
      document.getElementById("input_piu_harga").value = "";
      document.getElementById("input_bunt_kg").value = "";
      document.getElementById("input_bunt_harga").value = "";
    }
    this.calcPreview();
  },

  calcPreview: function() {
    const tKg = Number(document.getElementById("input_tunai_kg")?.value || 0);
    const tH = Number(document.getElementById("input_tunai_harga")?.value || 0);
    const tRp = tKg * tH;

    const pKg = Number(document.getElementById("input_pot_kg")?.value || 0);
    const pH = Number(document.getElementById("input_pot_harga")?.value || 0);
    const pRp = pKg * pH;

    const iuKg = Number(document.getElementById("input_piu_kg")?.value || 0);
    const iuH = Number(document.getElementById("input_piu_harga")?.value || 0);
    const iuRp = iuKg * iuH;

    const bKg = Number(document.getElementById("input_bunt_kg")?.value || 0);
    const bH = Number(document.getElementById("input_bunt_harga")?.value || 0);
    const bRp = bKg * bH;

    const totKg = tKg + pKg + iuKg + bKg;
    const totRp = tRp + pRp + iuRp + bRp;

    const elKg = document.getElementById("previewTotalKg");
    const elRp = document.getElementById("previewTotalRp");

    if (elKg) elKg.innerText = "JUMLAH KG: " + totKg.toLocaleString("id-ID") + " KG";
    if (elRp) elRp.innerText = "JUMLAH RP: Rp " + totRp.toLocaleString("id-ID");
  },

  handleSaveSheetMatrix: async function(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Menyimpan ke Sheet...`;

    let namaPakan = form.nama_pakan.value;
    if (namaPakan === "+ TAMBAH PAKAN BARU") {
      namaPakan = form.nama_pakan_custom.value.trim() || "PAKAN BARU";
    }

    const tKg = Number(form.tunai_kg.value || 0);
    const tH = Number(form.tunai_harga.value || 0);
    const tRp = tKg * tH;

    const pKg = Number(form.pot_kg.value || 0);
    const pH = Number(form.pot_harga.value || 0);
    const pRp = pKg * pH;

    const iuKg = Number(form.piu_kg.value || 0);
    const iuH = Number(form.piu_harga.value || 0);
    const iuRp = iuKg * iuH;

    const bKg = Number(form.bunt_kg.value || 0);
    const bH = Number(form.bunt_harga.value || 0);
    const bRp = bKg * bH;

    const totalKg = tKg + pKg + iuKg + bKg;
    const totalRp = tRp + pRp + iuRp + bRp;

    const allMonthly = this.getMonthlyData();
    if (!allMonthly[this.selectedMonth]) {
      allMonthly[this.selectedMonth] = { items: [] };
    }

    let items = allMonthly[this.selectedMonth].items || [];
    let item = items.find(it => it.nama.toLowerCase() === namaPakan.toLowerCase());

    if (!item) {
      item = {
        no: items.length + 1,
        nama: namaPakan,
        tunai_kg: 0, tunai_harga: 0, tunai_rp: 0,
        pot_kg: 0, pot_harga: 0, pot_rp: 0,
        piu_kg: 0, piu_harga: 0, piu_rp: 0,
        bunt_kg: 0, bunt_harga: 0, bunt_rp: 0,
        total_kg: 0, total_rp: 0
      };
      items.push(item);
    }

    item.tunai_kg = tKg; item.tunai_harga = tH; item.tunai_rp = tRp;
    item.pot_kg = pKg; item.pot_harga = pH; item.pot_rp = pRp;
    item.piu_kg = iuKg; item.piu_harga = iuH; item.piu_rp = iuRp;
    item.bunt_kg = bKg; item.bunt_harga = bH; item.bunt_rp = bRp;
    item.total_kg = totalKg; item.total_rp = totalRp;

    allMonthly[this.selectedMonth].items = items;
    this.saveMonthlyData(allMonthly);

    btn.disabled = false;
    btn.innerHTML = `<i class="bi bi-save me-2"></i>Simpan Ke Sheet Logistik`;
    alert(`Data Pakan "${namaPakan}" Berhasil Disimpan ke Sheet ${this.selectedMonth} ${this.selectedYear}!`);
    App.render();
  }
};
'''

with open('js/logistik.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print('Successfully created build_logistik_sheet_form.py and updated js/logistik.js!')
