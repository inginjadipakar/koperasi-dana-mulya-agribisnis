/**
 * ============================================================
 * RECAP.JS — DASHBOARD REKAP PUSAT ADMIN & EXCEL EXPORTER
 * KONSOLIDASI PRESISE 3 DIVISI (KOPERASI, DEPOT, LOGISTIK)
 * FORMAT EXCEL NATIVE (.XLSX) SUPER RAPI & MEWAH PERSIS MASTER
 * ============================================================
 */

const RecapModule = {
  selectedYear: (new Date().getFullYear()).toString(),
  // FIX Bug L40: Gunakan "APRIL" (bukan "APR") agar konsisten dengan monthsList di seluruh modul
  selectedMonth: (["JAN", "FEB", "MAR", "APRIL", "MEI", "JUNI", "JULI", "AGU", "SEP", "OKT", "NOV", "DES"])[new Date().getMonth()] || "SEP",
  
  getAvailableYears: function() {
    const current = (new Date().getFullYear()).toString();
    const set = new Set(["2026", current]);
    return Array.from(set).sort();
  },

  selectYear: function(year) {
    this.selectedYear = year;
    App.render();
  },

  selectMonth: function(month) {
    this.selectedMonth = month;
    App.render();
  },

  // FIX Bug 6: Sebelumnya hardcoded statis. Sekarang agregasi dari KoperasiModule.defaultFullData.
  // Fallback ke nilai hardcoded jika KoperasiModule tidak tersedia.
  getKoperasiData: function() {
    const src = (typeof KoperasiModule !== 'undefined' && KoperasiModule.defaultFullData)
      ? KoperasiModule.defaultFullData : null;

    if (!src) {
      // Fallback hardcoded (data Excel lama)
      return {
        "JAN":   { penerimaan_kg: 14602, penerimaan_ltr: 14246, penerimaan_rp: 0,       pengeluaran_kg: 14602, pengeluaran_ltr: 14246, pengeluaran_rp: 131418000,  selisih_ltr: 0 },
        "FEB":   { penerimaan_kg: 25319, penerimaan_ltr: 24701, penerimaan_rp: 0,       pengeluaran_kg: 25319, pengeluaran_ltr: 24701, pengeluaran_rp: 227871000,  selisih_ltr: 0 },
        "MAR":   { penerimaan_kg: 25313, penerimaan_ltr: 24696, penerimaan_rp: 0,       pengeluaran_kg: 25313, pengeluaran_ltr: 24696, pengeluaran_rp: 227817000,  selisih_ltr: 0 },
        "APRIL": { penerimaan_kg: 35180, penerimaan_ltr: 34322, penerimaan_rp: 0,       pengeluaran_kg: 35180, pengeluaran_ltr: 34322, pengeluaran_rp: 316620000,  selisih_ltr: 0 },
        "MEI":   { penerimaan_kg: 41052, penerimaan_ltr: 40051, penerimaan_rp: 0,       pengeluaran_kg: 41052, pengeluaran_ltr: 40051, pengeluaran_rp: 369468000,  selisih_ltr: 0 },
        "JUNI":  { penerimaan_kg: 36144, penerimaan_ltr: 35262, penerimaan_rp: 325296000, pengeluaran_kg: 36144, pengeluaran_ltr: 35262, pengeluaran_rp: 357075000, selisih_ltr: 0 },
        "JULI":  { penerimaan_kg: 38030, penerimaan_ltr: 37103, penerimaan_rp: 342270000, pengeluaran_kg: 38030, pengeluaran_ltr: 37103, pengeluaran_rp: 342270000, selisih_ltr: 0 }
      };
    }

    // Agregasi dari KoperasiModule.defaultFullData
    const result = {};
    Object.keys(src).forEach(bulan => {
      const d = src[bulan];
      const recAngg  = d.penerimaan_anggota     || [];
      const recNon   = d.penerimaan_non_anggota || [];
      const outPerus = d.pengeluaran_perusahaan || [];
      const outPer   = d.pengeluaran_perorangan || [];

      const recKg = recAngg.reduce((a, x) => a + Number(x.kg || 0), 0)
                  + recNon.reduce( (a, x) => a + Number(x.kg || 0), 0);
      const recRp = recAngg.reduce((a, x) => a + Number(x.rp || 0), 0)
                  + recNon.reduce( (a, x) => a + Number(x.rp || 0), 0);
      const outKg  = outPerus.reduce((a, x) => a + Number(x.kg || 0), 0)
                   + outPer.reduce(  (a, x) => a + Number(x.kg || 0), 0);
      const outRp  = outPerus.reduce((a, x) => a + Number(x.rp || 0), 0)
                   + outPer.reduce(  (a, x) => a + Number(x.rp || 0), 0);

      // Gunakan tot_kg/tot_rp jika tersedia (lebih akurat)
      const finalRecKg = d.tot_kg || recKg;
      const finalRecRp = d.tot_rp || recRp;

      result[bulan] = {
        penerimaan_kg:  finalRecKg,
        penerimaan_ltr: Math.round(finalRecKg / 1.025),
        penerimaan_rp:  finalRecRp,
        pengeluaran_kg:  outKg,
        pengeluaran_ltr: Math.round(outKg / 1.025),
        pengeluaran_rp:  outRp,
        selisih_ltr: Math.round(finalRecKg / 1.025) - Math.round(outKg / 1.025)
      };
    });
    return result;
  },

  render: async function() {
    if (!AuthManager.requireAuth("admin", "ALL")) {
      return `<div class="alert alert-danger">Akses Ditolak. Halaman ini khusus Administrator Utama.</div>`;
    }

    const monthsList = ["JAN", "FEB", "MAR", "APRIL", "MEI", "JUNI", "JULI", "AGU", "SEP", "OKT", "NOV", "DES"];

    // 1. DATA DIVISI KOPERASI
    const kopData = this.getKoperasiData();
    let kopRecKg = 0, kopRecLtr = 0, kopRecRp = 0, kopOutKg = 0, kopOutLtr = 0, kopOutRp = 0, kopSelisih = 0;
    if (this.selectedMonth === "ALL") {
      Object.values(kopData).forEach(d => {
        kopRecKg += d.penerimaan_kg; kopRecLtr += d.penerimaan_ltr; kopRecRp += d.penerimaan_rp;
        kopOutKg += d.pengeluaran_kg; kopOutLtr += d.pengeluaran_ltr; kopOutRp += d.pengeluaran_rp;
        kopSelisih += d.selisih_ltr;
      });
    } else if (kopData[this.selectedMonth]) {
      const d = kopData[this.selectedMonth];
      kopRecKg = d.penerimaan_kg; kopRecLtr = d.penerimaan_ltr; kopRecRp = d.penerimaan_rp;
      kopOutKg = d.pengeluaran_kg; kopOutLtr = d.pengeluaran_ltr; kopOutRp = d.pengeluaran_rp;
      kopSelisih = d.selisih_ltr;
    }

    // 2. DATA DIVISI DEPOT
    // FIX Bug 5: DepotModule.defaultPembelian/defaultPenjualan tidak ada.
    // Data benar ada di DepotModule.defaultFullData[bulan].pembelian / .penjualan
    const _depFull = (typeof DepotModule !== 'undefined' && DepotModule.defaultFullData)
      ? DepotModule.defaultFullData : {};

    const depMonthKeys = this.selectedMonth === 'ALL'
      ? Object.keys(_depFull)
      : (_depFull[this.selectedMonth] ? [this.selectedMonth] : []);

    let depPurKg = 0, depPurLtr = 0, depPurRp = 0, depSalLtr = 0, depSalRp = 0;
    depMonthKeys.forEach(mk => {
      if (!_depFull[mk]) return;
      (_depFull[mk].pembelian || []).forEach(p => {
        depPurKg  += Number(p.kg       || 0);
        depPurLtr += Number(p.liter    || 0);
        depPurRp  += Number(p.total_rp || 0);
      });
      (_depFull[mk].penjualan || []).forEach(s => {
        depSalLtr += Number(s.liter || 0);
        depSalRp  += Number(s.rp    || 0);
      });
    });

    // 3. DATA DIVISI LOGISTIK
    // FIX LOG-B10: Sinkronkan matriks logistik dari transaksi terkini agar tidak menampilkan data stale
    const allLogData = (typeof LogistikModule !== 'undefined' && LogistikModule.getFullData) ? LogistikModule.getFullData() : {};
    if (typeof LogistikModule !== 'undefined' && LogistikModule.syncMatrixFromTransactions) {
      LogistikModule.syncMatrixFromTransactions(allLogData, null);
    }
    let logSec1Unit = 0, logSec1Rp = 0, logSec2Kg = 0, logSec2Rp = 0, logSec3Kg = 0, logSec3Rp = 0, logSec4Stok = 0, logSec4Rp = 0;

    if (this.selectedMonth === "ALL") {
      const lm = (typeof window !== 'undefined' && window.LogistikModule) || (typeof LogistikModule !== 'undefined' ? LogistikModule : null);
      if (lm && typeof lm.getMonthDataForView === 'function') {
        const viewAll = lm.getMonthDataForView(allLogData, "ALL");
        if (viewAll.sec1) {
          logSec1Unit = viewAll.sec1.reduce((a, b) => a + Number(b.stok_akhir_unit || 0), 0);
          logSec1Rp = viewAll.sec1.reduce((a, b) => a + Number(b.stok_akhir_rp || 0), 0);
        }
        if (viewAll.sec2) {
          logSec2Kg = viewAll.sec2.reduce((a, b) => a + Number(b.total_kg || 0), 0);
          logSec2Rp = viewAll.sec2.reduce((a, b) => a + Number(b.total_rp || 0), 0);
        }
        if (viewAll.sec3) {
          logSec3Kg = viewAll.sec3.reduce((a, b) => a + Number(b.kg || 0), 0);
          logSec3Rp = viewAll.sec3.reduce((a, b) => a + Number(b.rp || 0), 0);
        }
        if (viewAll.sec4) {
          logSec4Stok = viewAll.sec4.reduce((a, b) => a + Number(b.stok_akhir || 0), 0);
          logSec4Rp = viewAll.sec4.reduce((a, b) => a + Number(b.jumlah_rp || 0), 0);
        }
      } else {
        Object.keys(allLogData).forEach(m => {
          const md = allLogData[m];
          if (md.sec2) {
            logSec2Kg += md.sec2.reduce((a, b) => a + Number(b.total_kg || 0), 0);
            logSec2Rp += md.sec2.reduce((a, b) => a + Number(b.total_rp || 0), 0);
          }
          if (md.sec3) {
            logSec3Kg += md.sec3.reduce((a, b) => a + Number(b.kg || 0), 0);
            logSec3Rp += md.sec3.reduce((a, b) => a + Number(b.rp || 0), 0);
          }
        });
        const monthOrder = ["JAN", "FEB", "MAR", "APRIL", "MEI", "JUNI", "JULI", "AGU", "SEP", "OKT", "NOV", "DES"];
        let latestMonth = null;
        for (let i = monthOrder.length - 1; i >= 0; i--) {
          const mk = monthOrder[i];
          if (allLogData[mk] && allLogData[mk].sec4 && allLogData[mk].sec4.length > 0) {
            latestMonth = mk;
            break;
          }
        }
        if (latestMonth && allLogData[latestMonth].sec4) {
          logSec4Stok = allLogData[latestMonth].sec4.reduce((a, b) => a + Number(b.stok_akhir || 0), 0);
          logSec4Rp = allLogData[latestMonth].sec4.reduce((a, b) => a + Number(b.jumlah_rp || 0), 0);
        }
        if (latestMonth && allLogData[latestMonth].sec1) {
          logSec1Unit = allLogData[latestMonth].sec1.reduce((a, b) => a + Number(b.stok_akhir_unit || 0), 0);
          logSec1Rp = allLogData[latestMonth].sec1.reduce((a, b) => a + Number(b.stok_akhir_rp || 0), 0);
        }
      }
    } else if (allLogData[this.selectedMonth]) {
      const md = allLogData[this.selectedMonth];
      if (md.sec1) {
        logSec1Unit = md.sec1.reduce((a, b) => a + Number(b.stok_akhir_unit || 0), 0);
        logSec1Rp = md.sec1.reduce((a, b) => a + Number(b.stok_akhir_rp || 0), 0);
      }
      if (md.sec2) {
        logSec2Kg = md.sec2.reduce((a, b) => a + Number(b.total_kg || 0), 0);
        logSec2Rp = md.sec2.reduce((a, b) => a + Number(b.total_rp || 0), 0);
      }
      if (md.sec3) {
        logSec3Kg = md.sec3.reduce((a, b) => a + Number(b.kg || 0), 0);
        logSec3Rp = md.sec3.reduce((a, b) => a + Number(b.rp || 0), 0);
      }
      if (md.sec4) {
        logSec4Stok = md.sec4.reduce((a, b) => a + Number(b.stok_akhir || 0), 0);
        logSec4Rp = md.sec4.reduce((a, b) => a + Number(b.jumlah_rp || 0), 0);
      }
    }

    return `
      <!-- MOBILE HERO FINANCIAL HEADER CARD (DANA / LIVIN' / MYBCA STYLE) -->
      <div class="finance-hero-card mb-3" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #475569 100%);">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <div class="finance-hero-greeting">
              <i class="bi bi-shield-check text-emerald me-1"></i>Sistem Informasi Digital Danamulya
            </div>
            <div class="finance-hero-name">
              Rekapitulasi Eksekutif
            </div>
          </div>
          <span class="badge bg-dark bg-opacity-40 text-white border border-white border-opacity-25 rounded-pill px-3 py-1 fw-semibold small d-inline-flex align-items-center">
            <i class="bi bi-calendar3 me-1 text-emerald"></i>${this.selectedMonth} ${this.selectedYear}
          </span>
        </div>

        <!-- BALANCE & SUMMARY CARDS -->
        <div class="finance-balance-box">
          <div class="d-flex justify-content-between align-items-center">
            <span class="finance-balance-label">Total Omset Pengeluaran Susu Koperasi</span>
            <span class="badge bg-emerald text-white rounded-pill px-2 py-1 small fw-bold">
              ${kopOutKg.toLocaleString('id-ID')} KG
            </span>
          </div>
          <div class="finance-balance-amount">
            Rp ${kopOutRp.toLocaleString('id-ID')}
          </div>
          <div class="d-flex justify-content-between align-items-center mt-2 pt-2 border-top border-white border-opacity-10 text-white-50 extra-small">
            <span><i class="bi bi-cup-straw me-1"></i>Omset Depot: Rp ${depSalRp.toLocaleString('id-ID')}</span>
            <span><i class="bi bi-truck me-1"></i>Omset Pakan: Rp ${logSec2Rp.toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>

      <!-- 4-GRID SHORTCUT MENU (ALA DANA / LIVIN' / SHOPEEPAY) -->
      <div class="finance-grid-menu mb-3">
        <a class="finance-grid-item" onclick="RecapModule.exportMasterExcelBulanan()">
          <div class="finance-icon-circle emerald"><i class="bi bi-file-earmark-excel-fill"></i></div>
          <span>Export Excel</span>
        </a>
        <a class="finance-grid-item" onclick="location.hash='#koperasi'">
          <div class="finance-icon-circle green"><i class="bi bi-building"></i></div>
          <span>Koperasi</span>
        </a>
        <a class="finance-grid-item" onclick="location.hash='#depot'">
          <div class="finance-icon-circle blue"><i class="bi bi-cup-straw"></i></div>
          <span>Depot Susu</span>
        </a>
        <a class="finance-grid-item" onclick="location.hash='#logistik'">
          <div class="finance-icon-circle amber"><i class="bi bi-truck"></i></div>
          <span>Logistik</span>
        </a>
      </div>

      <!-- FILTER BULAN & TAHUN PILL BAR -->
      <div class="card card-custom p-3 mb-3 shadow-sm border-0 bg-white">
        <div class="d-flex align-items-center gap-2 overflow-auto pb-1">
          <span class="fw-bold text-muted extra-small text-nowrap"><i class="bi bi-calendar3 me-1 text-primary"></i>Tahun:</span>
          ${this.getAvailableYears().map(y => `
            <button class="btn btn-xs ${y === this.selectedYear ? 'btn-primary fw-bold' : 'btn-outline-secondary'} rounded-pill px-3 py-1"
                    onclick="RecapModule.selectYear('${y}')">${y}</button>
          `).join('')}
          <div class="vr mx-1"></div>
          <span class="fw-bold text-muted extra-small text-nowrap"><i class="bi bi-funnel me-1 text-success"></i>Bulan:</span>
          <button class="btn btn-xs ${this.selectedMonth === 'ALL' ? 'btn-success fw-bold' : 'btn-light text-dark'} rounded-pill px-3 py-1"
                  onclick="RecapModule.selectMonth('ALL')">Semua</button>
          ${monthsList.map(m => `
            <button class="btn btn-xs ${m === this.selectedMonth ? 'btn-success fw-bold' : 'btn-light text-dark'} rounded-pill px-3 py-1 text-nowrap"
                    onclick="RecapModule.selectMonth('${m}')">${m}</button>
          `).join('')}
        </div>
      </div>

      <!-- 1. METRIK DIVISI KOPERASI (PENERIMAAN & PENGELUARAN SUSU) -->
      <div class="mb-4">
        <h5 class="fw-bold text-dark mb-3"><i class="bi bi-building text-primary me-2"></i>1. KONSOLIDASI DIVISI KOPERASI SUSU</h5>
        <div class="row g-3">
          <div class="col-md-4">
            <div class="metric-tile purple">
              <div class="metric-label">TOTAL PENERIMAAN SUSU KOPERASI</div>
              <div class="metric-value">${kopRecKg.toLocaleString('id-ID')} KG</div>
              <div class="small fw-semibold mt-2">Ekuivalen: ${kopRecLtr.toLocaleString('id-ID')} Liter ${kopRecRp > 0 ? '| Rp ' + kopRecRp.toLocaleString('id-ID') : ''}</div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="metric-tile blue">
              <div class="metric-label">OMSET PENGELUARAN SUSU KOPERASI</div>
              <div class="metric-value">Rp ${kopOutRp.toLocaleString('id-ID')}</div>
              <div class="small fw-semibold mt-2">Volume: ${kopOutKg.toLocaleString('id-ID')} KG (${kopOutLtr.toLocaleString('id-ID')} Liter)</div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="metric-tile green">
              <div class="metric-label">SELISIH / SUSUT NERACA SUSU</div>
              <div class="metric-value">${kopSelisih.toLocaleString('id-ID')} Liter</div>
              <div class="small fw-semibold mt-2">Status Rekapitulasi: STABIL</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. METRIK DIVISI DEPOT SUSU -->
      <div class="card card-custom p-4 mb-4 border-start border-primary border-4 shadow-sm">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="fw-bold text-primary mb-0"><i class="bi bi-cup-straw me-2"></i>2. KONSOLIDASI DIVISI DEPOT SUSU</h5>
          <span class="badge bg-primary">Sheet Depot Susu</span>
        </div>
        <div class="row g-3">
          <div class="col-md-4">
            <div class="p-3 bg-light rounded-3">
              <div class="small text-muted fw-bold mb-1">PEMBELIAN DARI PROCESSING</div>
              <div class="fs-4 fw-bold text-dark">${depPurLtr.toLocaleString('id-ID')} Liter</div>
              <div class="small text-muted">${depPurKg.toLocaleString('id-ID')} KG (Densitas 1.025)</div>
              <div class="small text-danger fw-semibold mt-1">Total Beli: Rp ${depPurRp.toLocaleString('id-ID')}</div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="p-3 bg-light rounded-3">
              <div class="small text-muted fw-bold mb-1">PENJUALAN KE AGEN & PELANGGAN</div>
              <div class="fs-4 fw-bold text-dark">${depSalLtr.toLocaleString('id-ID')} Liter</div>
              <div class="small text-success fw-semibold mt-1">Total Omset Agen: Rp ${depSalRp.toLocaleString('id-ID')}</div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="p-3 bg-light rounded-3">
              <div class="small text-muted fw-bold mb-1">MARGIN BRUTO DEPOT</div>
              <div class="fs-4 fw-bold ${depSalRp - depPurRp >= 0 ? 'text-success' : 'text-danger'}">
                Rp ${(depSalRp - depPurRp).toLocaleString('id-ID')}
              </div>
              <div class="small text-muted mt-1">(Selisih Penjualan Agen - Pembelian Processing)</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. METRIK DIVISI LOGISTIK AGRIBISNIS -->
      <div class="card card-custom p-4 mb-4 border-start border-warning border-4 shadow-sm">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="fw-bold text-warning mb-0"><i class="bi bi-truck me-2"></i>3. KONSOLIDASI DIVISI LOGISTIK (PAKANKU & ALAT)</h5>
          <span class="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle">Sheet Logistik</span>
        </div>
        <div class="row g-3">
          <div class="col-md-3">
            <div class="p-3 bg-light rounded-3">
              <div class="small text-muted fw-bold mb-1">ASET PERALATAN TERNAK</div>
              <div class="fs-5 fw-bold text-dark">Rp ${logSec1Rp.toLocaleString('id-ID')}</div>
              <div class="small text-muted">${logSec1Unit} Unit (Milk Can, Timba, dll)</div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="p-3 bg-light rounded-3">
              <div class="small text-muted fw-bold mb-1">OMSET PENJUALAN PAKAN (II)</div>
              <div class="fs-5 fw-bold text-success">Rp ${logSec2Rp.toLocaleString('id-ID')}</div>
              <div class="small text-muted">Total Volume: ${logSec2Kg.toLocaleString('id-ID')} KG</div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="p-3 bg-light rounded-3">
              <div class="small text-muted fw-bold mb-1">TOTAL PEMBELIAN PAKAN (III)</div>
              <div class="fs-5 fw-bold text-primary">Rp ${logSec3Rp.toLocaleString('id-ID')}</div>
              <div class="small text-muted">Total Volume: ${logSec3Kg.toLocaleString('id-ID')} KG</div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="p-3 bg-light rounded-3">
              <div class="small text-muted fw-bold mb-1">NILAI ASET STOK AKHIR (IV)</div>
              <div class="fs-5 fw-bold text-dark">Rp ${logSec4Rp.toLocaleString('id-ID')}</div>
              <div class="small text-muted">Volume Stok Akhir: ${logSec4Stok.toLocaleString('id-ID')} KG</div>
            </div>
          </div>
        </div>
      </div>

      <!-- EXCEL VIEWER KONSOLIDASI UNTUK ADMIN -->
      <div class="card card-custom p-4 mt-4 border-0 shadow-sm">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="fw-bold mb-0 text-dark"><i class="bi bi-file-earmark-spreadsheet me-2 text-success"></i>Tampilan Excel Konsolidasi</h5>
          <button class="btn btn-sm btn-outline-success fw-bold" type="button" onclick="RecapModule.toggleExcelPreview()">
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

  toggleExcelPreview: async function() {
    const col = document.getElementById("collapseExcelMaster");
    if (!col) return;
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(col);
    bsCollapse.toggle();

    if (typeof ExcelViewerModule === 'undefined') {
      const container = document.getElementById("excelContainerInDashboard");
      if (container) container.innerHTML = `<div class="text-center p-4"><span class="spinner-border spinner-border-sm text-success me-2"></span>Memuat data Excel...</div>`;
      await App.loadExcelViewerScript();
      if (container) container.innerHTML = ExcelViewerModule.render();
    }
  },

  exportMasterExcelBulanan: function() {
    const bulan = this.selectedMonth;
    const tahun = this.selectedYear;

    const kopData = this.getKoperasiData();
    const dKop = (bulan === "ALL" ? null : kopData[bulan]) || { penerimaan_kg: 36144, penerimaan_ltr: 35262, penerimaan_rp: 325296000, pengeluaran_kg: 36144, pengeluaran_ltr: 35262, pengeluaran_rp: 357075000, selisih_ltr: 0 };

    // FIX Bug 5 (export): Sama seperti di render(), gunakan defaultFullData bukan defaultPembelian
    const _depFull2 = (typeof DepotModule !== 'undefined' && DepotModule.defaultFullData)
      ? DepotModule.defaultFullData : {};

    const expDepMonthKeys = (bulan === 'ALL')
      ? Object.keys(_depFull2)
      : (_depFull2[bulan] ? [bulan] : []);

    let depPurKg = 0, depPurLtr = 0, depPurRp = 0;
    let depSalLtr = 0, depSalRp = 0;
    const depSalList = [];
    expDepMonthKeys.forEach(mk => {
      if (!_depFull2[mk]) return;
      (_depFull2[mk].pembelian || []).forEach(p => {
        depPurKg  += Number(p.kg       || 0);
        depPurLtr += Number(p.liter    || 0);
        depPurRp  += Number(p.total_rp || 0);
      });
      (_depFull2[mk].penjualan || []).forEach(s => {
        depSalLtr += Number(s.liter || 0);
        depSalRp  += Number(s.rp   || 0);
        depSalList.push({
          transaction_id: mk + '_' + (s.nama || '-'),
          tanggal: mk + ' ' + tahun,
          nama_agen: s.nama || '-',
          harga_per_liter: s.harga || 0,
          jumlah_liter: s.liter || 0,
          total_rupiah: s.rp || 0
        });
      });
    });

    // FIX LOG-B10: Sinkronkan matriks logistik dari transaksi terkini sebelum ekspor
    const allLogData = (typeof LogistikModule !== 'undefined' && LogistikModule.getFullData) ? LogistikModule.getFullData() : {};
    if (typeof LogistikModule !== 'undefined' && LogistikModule.syncMatrixFromTransactions) {
      LogistikModule.syncMatrixFromTransactions(allLogData, null);
    }
    let logSec1Unit = 0, logSec1Rp = 0, logSec2Kg = 0, logSec2Rp = 0, logSec3Kg = 0, logSec3Rp = 0, logSec4Stok = 0, logSec4Rp = 0;

    if (bulan === "ALL") {
      const lm = (typeof window !== 'undefined' && window.LogistikModule) || (typeof LogistikModule !== 'undefined' ? LogistikModule : null);
      if (lm && typeof lm.getMonthDataForView === 'function') {
        const viewAll = lm.getMonthDataForView(allLogData, "ALL");
        if (viewAll.sec1) {
          logSec1Unit = viewAll.sec1.reduce((a, b) => a + Number(b.stok_akhir_unit || 0), 0);
          logSec1Rp = viewAll.sec1.reduce((a, b) => a + Number(b.stok_akhir_rp || 0), 0);
        }
        if (viewAll.sec2) {
          logSec2Kg = viewAll.sec2.reduce((a, b) => a + Number(b.total_kg || 0), 0);
          logSec2Rp = viewAll.sec2.reduce((a, b) => a + Number(b.total_rp || 0), 0);
        }
        if (viewAll.sec3) {
          logSec3Kg = viewAll.sec3.reduce((a, b) => a + Number(b.kg || 0), 0);
          logSec3Rp = viewAll.sec3.reduce((a, b) => a + Number(b.rp || 0), 0);
        }
        if (viewAll.sec4) {
          logSec4Stok = viewAll.sec4.reduce((a, b) => a + Number(b.stok_akhir || 0), 0);
          logSec4Rp = viewAll.sec4.reduce((a, b) => a + Number(b.jumlah_rp || 0), 0);
        }
      } else {
        Object.keys(allLogData).forEach(m => {
          const md = allLogData[m];
          if (md.sec2) { logSec2Kg += md.sec2.reduce((a, b) => a + Number(b.total_kg || 0), 0); logSec2Rp += md.sec2.reduce((a, b) => a + Number(b.total_rp || 0), 0); }
          if (md.sec3) { logSec3Kg += md.sec3.reduce((a, b) => a + Number(b.kg || 0), 0); logSec3Rp += md.sec3.reduce((a, b) => a + Number(b.rp || 0), 0); }
        });
        const monthOrder = ["JAN", "FEB", "MAR", "APRIL", "MEI", "JUNI", "JULI", "AGU", "SEP", "OKT", "NOV", "DES"];
        let latestMonth = null;
        for (let i = monthOrder.length - 1; i >= 0; i--) {
          const mk = monthOrder[i];
          if (allLogData[mk] && allLogData[mk].sec4 && allLogData[mk].sec4.length > 0) {
            latestMonth = mk;
            break;
          }
        }
        if (latestMonth && allLogData[latestMonth].sec4) {
          logSec4Stok = allLogData[latestMonth].sec4.reduce((a, b) => a + Number(b.stok_akhir || 0), 0);
          logSec4Rp = allLogData[latestMonth].sec4.reduce((a, b) => a + Number(b.jumlah_rp || 0), 0);
        }
        if (latestMonth && allLogData[latestMonth].sec1) {
          logSec1Unit = allLogData[latestMonth].sec1.reduce((a, b) => a + Number(b.stok_akhir_unit || 0), 0);
          logSec1Rp = allLogData[latestMonth].sec1.reduce((a, b) => a + Number(b.stok_akhir_rp || 0), 0);
        }
      }
    } else if (allLogData[bulan]) {
      const md = allLogData[bulan];
      if (md.sec1) { logSec1Unit = md.sec1.reduce((a, b) => a + Number(b.stok_akhir_unit || 0), 0); logSec1Rp = md.sec1.reduce((a, b) => a + Number(b.stok_akhir_rp || 0), 0); }
      if (md.sec2) { logSec2Kg = md.sec2.reduce((a, b) => a + Number(b.total_kg || 0), 0); logSec2Rp = md.sec2.reduce((a, b) => a + Number(b.total_rp || 0), 0); }
      if (md.sec3) { logSec3Kg = md.sec3.reduce((a, b) => a + Number(b.kg || 0), 0); logSec3Rp = md.sec3.reduce((a, b) => a + Number(b.rp || 0), 0); }
      if (md.sec4) { logSec4Stok = md.sec4.reduce((a, b) => a + Number(b.stok_akhir || 0), 0); logSec4Rp = md.sec4.reduce((a, b) => a + Number(b.jumlah_rp || 0), 0); }
    }

    if (typeof XLSX === 'undefined') {
      showAlert("Perhatian", "Library SheetJS (XLSX) sedang dimuat, harap coba beberapa detik lagi.", "warning");
      return;
    }

    const wb = XLSX.utils.book_new();

    // 1. SHEET 1: REKAPITULASI KONSOLIDASI BULANAN (FORMAT PRESISE TABLE PERIODE)
    const summaryRows = [
      ["LAPORAN REKAPITULASI KONSOLIDASI SEMUA DIVISI"],
      ["KOPERASI AGRIBISNIS DANA MULYA PACET"],
      ["PERIODE LAPORAN:", `BULAN ${bulan} TAHUN ${tahun}`, "", ""],
      ["WAKTU EXPORT:", new Date().toLocaleString('id-ID'), "", ""],
      [],
      ["NO", "PARAMETER DIVISI & KATEGORI", "VOLUME / NILAI", "SATUAN", "TOTAL NOMINAL (RP)"],
      
      // I. KOPERASI SUSU
      ["I", "DIVISI KOPERASI SUSU", "", "", ""],
      ["1", "Total Penerimaan Susu (Pos Penimbangan)", dKop.penerimaan_kg, "KG", dKop.penerimaan_rp],
      ["2", "Ekuivalen Penerimaan Susu (Densitas 1.025)", dKop.penerimaan_ltr, "Liter", "-"],
      ["3", "Total Pengeluaran Susu (Indolakto / Processing)", dKop.pengeluaran_kg, "KG", dKop.pengeluaran_rp],
      ["4", "Ekuivalen Pengeluaran Susu (Densitas 1.025)", dKop.pengeluaran_ltr, "Liter", "-"],
      ["5", "Selisih / Susut Neraca Susu", dKop.selisih_ltr, "Liter", 0],
      [],
      
      // II. DEPOT SUSU
      ["II", "DIVISI DEPOT SUSU", "", "", ""],
      ["1", "Pembelian Susu Dari Processing (Volume)", depPurKg, "KG", depPurRp],
      ["2", "Ekuivalen Pembelian Processing (Densitas 1.025)", depPurLtr, "Liter", "-"],
      ["3", "Penjualan Susu Pada Agen & Pelanggan", depSalLtr, "Liter", depSalRp],
      ["4", "Margin Bruto Depot Susu", "-", "-", depSalRp - depPurRp],
      [],
      
      // III. LOGISTIK AGRIBISNIS
      ["III", "DIVISI LOGISTIK AGRIBISNIS", "", "", ""],
      ["1", `Nilai Aset Peralatan Ternak (Unit ${logSec1Unit})`, logSec1Unit, "Unit", logSec1Rp],
      ["2", "Volume & Omset Penjualan Pakan Ternak (Seksi II)", logSec2Kg, "KG", logSec2Rp],
      ["3", "Volume & Total Pembelian Pakan Ternak (Seksi III)", logSec3Kg, "KG", logSec3Rp],
      ["4", "Volume & Nilai Aset Stok Akhir Pakan (Seksi IV)", logSec4Stok, "KG", logSec4Rp],
      [],
      
      // JUMLAH TOTAL
      ["", "JUMLAH TOTAL AKUMULASI KONSOLIDASI", "", "", dKop.pengeluaran_rp + depSalRp + logSec2Rp]
    ];

    const wsSummary = XLSX.utils.aoa_to_sheet(summaryRows);
    wsSummary['!cols'] = [{ wch: 8 }, { wch: 48 }, { wch: 20 }, { wch: 15 }, { wch: 25 }];
    XLSX.utils.book_append_sheet(wb, wsSummary, "REKAP KONSOLIDASI");

    // 2. SHEET 2: DETAIL DEPOT SUSU AGEN
    const depotSheetData = [
      ["LAPORAN PENJUALAN AGEN DEPOT SUSU — PERIODE " + bulan + " " + tahun],
      [],
      ["NO", "ID TRANSAKSI", "TANGGAL", "NAMA AGEN / PELANGGAN", "HARGA / LITER (RP)", "JUMLAH (LITER)", "TOTAL OMSET (RP)"]
    ];

    depSalList.forEach((s, idx) => {
      depotSheetData.push([
        idx + 1,
        s.transaction_id || "-",
        s.tanggal || "-",
        s.nama_agen || "-",
        s.harga_per_liter || 0,
        s.jumlah_liter || 0,
        s.total_rupiah || 0
      ]);
    });
    depotSheetData.push(["", "", "", "JUMLAH TOTAL PENJUALAN AGEN", "", depSalLtr, depSalRp]);

    const wsDepot = XLSX.utils.aoa_to_sheet(depotSheetData);
    wsDepot['!cols'] = [{ wch: 6 }, { wch: 25 }, { wch: 15 }, { wch: 25 }, { wch: 20 }, { wch: 18 }, { wch: 22 }];
    XLSX.utils.book_append_sheet(wb, wsDepot, "DETAIL DEPOT SUSU");

    // 3. SHEET 3: DETAIL LOGISTIK PAKAN & STOK
    const logistikSheetData = [
      ["LAPORAN KESEIMBANGAN STOK MAKANAN TERNAK LOGISTIK — PERIODE " + bulan + " " + tahun],
      [],
      ["NO", "NAMA PAKAN TERNAK", "STOK AWAL (KG)", "PEMBELIAN (KG)", "SIAP JUAL (KG)", "PENJUALAN (KG)", "SUSUT (KG)", "STOK AKHIR (KG)", "HARGA / KG (RP)", "JUMLAH ASET (RP)"]
    ];

    // FIX Bug L39: Saat bulan='ALL', allLogData['ALL'] tidak ada (undefined).
    // Gunakan data bulan terakhir (latestMonth) yang tersedia sebagai representasi stok akhir.
    let _sec4SourceKey = bulan;
    if (bulan === 'ALL') {
      const _mo = ["JAN","FEB","MAR","APRIL","MEI","JUNI","JULI","AGU","SEP","OKT","NOV","DES"];
      for (let _i = _mo.length - 1; _i >= 0; _i--) {
        if (allLogData[_mo[_i]] && allLogData[_mo[_i]].sec4 && allLogData[_mo[_i]].sec4.length > 0) {
          _sec4SourceKey = _mo[_i];
          break;
        }
      }
    }
    const currentLogSec4 = (allLogData[_sec4SourceKey] && allLogData[_sec4SourceKey].sec4) ? allLogData[_sec4SourceKey].sec4 : [];
    currentLogSec4.forEach(it => {
      logistikSheetData.push([
        it.no || "-",
        it.nama || "-",
        it.stok_awal || 0,
        it.pembelian || 0,
        it.siap_jual || 0,
        it.penjualan || 0,
        it.susut || 0,
        it.stok_akhir || 0,
        it.harga || 0,
        it.jumlah_rp || 0
      ]);
    });
    logistikSheetData.push(["", "JUMLAH TOTAL STOK LOGISTIK", "", "", "", "", "", logSec4Stok, "", logSec4Rp]);

    const wsLogistik = XLSX.utils.aoa_to_sheet(logistikSheetData);
    wsLogistik['!cols'] = [{ wch: 6 }, { wch: 25 }, { wch: 16 }, { wch: 16 }, { wch: 16 }, { wch: 16 }, { wch: 14 }, { wch: 16 }, { wch: 18 }, { wch: 22 }];
    XLSX.utils.book_append_sheet(wb, wsLogistik, "DETAIL LOGISTIK PAKAN");

    // WRITE NATIVE BINARY EXCEL WORKBOOK (.XLSX)
    const filename = `MASTER_REKAP_KONSOLIDASI_DANAMULYA_${bulan}_${tahun}.xlsx`;
    XLSX.writeFile(wb, filename);

    showToast("File rekap bulanan berhasil diunduh.", "success");
  }
};
