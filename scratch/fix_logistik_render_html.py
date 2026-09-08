import re

file_path = r"c:\Users\HP\Desktop\KKN SIE ACARA\Proker UMKM\Koperasidanamulya\js\logistik.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace Step 1, Step 2, Step 3, Step 4 & filter bar in render()
# First find render: function() start
render_match = re.search(r'render:\s*function\(\)\s*\{[\s\S]*?return\s*`', content)
if not render_match:
    print("Could not find render function start!")
    exit(1)

# Now construct the clean render template matching the user's screenshot 100%
clean_render_code = '''
  render: function() {
    const session = (typeof AuthModule !== 'undefined' && AuthModule.getSession) ? AuthModule.getSession() : null;
    const peternakLabel = session ? (session.nama || session.username || "Petugas Logistik") : "Petugas Logistik";
    const roleLabel = session ? (session.role || "Petugas Logistik").toUpperCase() : "LOGISTIK";

    const allData = this.getFullData();
    const monthData = allData[this.selectedMonth] || allData["JAN"] || { sec1: [], sec2: [], sec3: [], sec4: [] };
    const monthsList = ["JAN", "FEB", "MAR", "APR", "MEI", "JUNI", "JULI", "AGU", "SEP", "OKT", "NOV", "DES"];

    // Totals calculation
    let totSec2Kg = 0, totSec2Rp = 0;
    (monthData.sec2 || []).forEach(i => { totSec2Kg += Number(i.jumlah_kg || 0); totSec2Rp += Number(i.jumlah_rp || 0); });

    let totSec3Rp = 0;
    (monthData.sec3 || []).forEach(i => { totSec3Rp += Number(i.rp || 0); });

    let totSec4Rp = 0, totSec4StokAkhir = 0;
    (monthData.sec4 || []).forEach(i => { totSec4Rp += Number(i.jumlah_rp || 0); totSec4StokAkhir += Number(i.stok_akhir || 0); });

    return `
<div class="ma-page" id="maPage">

  <!-- APP HEADER -->
  <header class="ma-header">
    <div class="ma-header-brand">
      <img src="images/logo.jpg" alt="Logo" class="ma-header-logo">
      <div>
        <div class="ma-header-title">Logistik</div>
        <div class="ma-header-subtitle">${peternakLabel}</div>
      </div>
    </div>
    <div class="ma-header-actions">
      <button class="ma-header-icon-btn" title="Notifikasi">
        <i class="bi bi-bell"></i>
        <span class="ma-header-notif-dot"></span>
      </button>
      <button class="ma-header-icon-btn" title="Profil">
        <i class="bi bi-person"></i>
      </button>
    </div>
  </header>

  <!-- HERO SUMMARY CARD -->
  <div class="ma-hero-card">
    <div class="ma-hero-top">
      <span class="ma-hero-subtitle">Sistem Informasi Digital Danamulya</span>
      <span class="ma-period-chip"><i class="bi bi-calendar3"></i> ${this.selectedMonth} ${this.selectedYear}</span>
    </div>
    <div class="ma-hero-title">Divisi Logistik Agribisnis</div>
    <div class="ma-hero-label-row">
      <span class="ma-hero-label">TOTAL OMZET PENJUALAN PAKAN</span>
      <span class="ma-hero-badge">${totSec2Kg.toLocaleString('id-ID')} KG</span>
    </div>
    <div class="ma-hero-amount">Rp ${totSec2Rp.toLocaleString('id-ID')}</div>
    <div class="ma-hero-meta">
      <span><i class="bi bi-cart3"></i> Pembelian: Rp ${totSec3Rp.toLocaleString('id-ID')}</span>
      <span><i class="bi bi-box-seam"></i> Stok: Rp ${totSec4Rp.toLocaleString('id-ID')}</span>
    </div>
  </div>

  <!-- QUICK ACTIONS 4x2 GRID -->
  <div class="ma-actions-section">
    <div class="ma-actions-grid">
      <button class="ma-action-item" onclick="document.getElementById('maFormSection')?.scrollIntoView({behavior:'smooth'})">
        <div class="ma-action-icon emerald-bg"><i class="bi bi-plus-lg"></i></div>
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
        <div class="ma-action-icon teal-bg"><i class="bi bi-basket"></i></div>
        <span class="ma-action-label">Pembelian</span>
      </button>
      <button class="ma-action-item" onclick="document.getElementById('maSecondaryTabs')?.scrollIntoView({behavior:'smooth'}); setTimeout(()=>document.getElementById('ma-tab-stok')?.click(),100)">
        <div class="ma-action-icon purple-bg"><i class="bi bi-box-seam"></i></div>
        <span class="ma-action-label">Stok</span>
      </button>
      <button class="ma-action-item" onclick="LogistikModule.exportExcelRekapBulananCombined()">
        <div class="ma-action-icon rose-bg"><i class="bi bi-file-earmark-text"></i></div>
        <span class="ma-action-label">Laporan</span>
      </button>
      <button class="ma-action-item" onclick="document.getElementById('maSecondaryTabs')?.scrollIntoView({behavior:'smooth'}); setTimeout(()=>document.getElementById('ma-tab-matrix')?.click(),100)">
        <div class="ma-action-icon sky-bg"><i class="bi bi-calendar-event"></i></div>
        <span class="ma-action-label">Jadwal</span>
      </button>
      <button class="ma-action-item" onclick="App.resetData()">
        <div class="ma-action-icon yellow-bg"><i class="bi bi-gear"></i></div>
        <span class="ma-action-label">Pengaturan</span>
      </button>
    </div>
  </div>

  <!-- SINGLE FILTER BAR (SINGLE — NO DUPLICATES) -->
  <div class="ma-filter-bar">
    <span style="font-size:0.75rem;font-weight:700;color:#94a3b8;">Tahun</span>
    <select class="ma-filter-select emerald" onchange="LogistikModule.selectYear(this.value)">
      ${this.getAvailableYears().map(y => `<option value="${y}" ${y === this.selectedYear ? 'selected' : ''}>${y}</option>`).join('')}
    </select>
    <span style="font-size:0.75rem;font-weight:700;color:#94a3b8;">Bulan</span>
    <select class="ma-filter-select" onchange="LogistikModule.selectMonth(this.value)">
      <option value="ALL" ${this.selectedMonth === 'ALL' ? 'selected' : ''}>Semua</option>
      ${monthsList.map(m => `<option value="${m}" ${m === this.selectedMonth ? 'selected' : ''}>${m}</option>`).join('')}
    </select>
    <div style="width:1px;height:18px;background:#20324a;flex-shrink:0;"></div>
    ${monthsList.slice(0, 4).map(m => `
      <button class="ma-month-pill ${m === this.selectedMonth ? 'active' : ''}" onclick="LogistikModule.selectMonth('${m}')">${m}</button>
    `).join('')}
    <button class="ma-filter-icon-btn" title="Filter Lanjutan"><i class="bi bi-sliders2"></i></button>
  </div>

  <!-- FORM TRANSAKSI -->
  <div id="maFormSection" style="padding: 0 var(--ma-gutter);">
    <form id="formLogistikTx" onsubmit="LogistikModule.handleSaveLogistikTx(event)">

      <!-- STEP 1: KATEGORI PEMBELI -->
      <div class="ma-section">
        <div class="ma-section-header">
          <div class="ma-step-badge">1</div>
          <span class="ma-section-title">Kategori Pembeli</span>
        </div>
        <div class="ma-section-body">
          <div class="ma-selection-grid">
            <div class="ma-selection-card selected" id="selCardRasio" onclick="LogistikModule.onFilterKategoriChange('RASIO')">
              <div class="ma-selection-icon"><i class="bi bi-people-fill"></i></div>
              <span class="ma-selection-name">RASIO</span>
              <span class="ma-selection-desc">(Peternak Anggota Koperasi)</span>
            </div>
            <div class="ma-selection-card non-rasio" id="selCardNonRasio" onclick="LogistikModule.onFilterKategoriChange('NON_RASIO')">
              <div class="ma-selection-icon"><i class="bi bi-person-badge"></i></div>
              <span class="ma-selection-name">NON-RASIO</span>
              <span class="ma-selection-desc">(Bukan Anggota Koperasi)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- STEP 2: NAMA PETERNAK / PEMBELI -->
      <div class="ma-section">
        <div class="ma-section-header">
          <div class="ma-step-badge">2</div>
          <span class="ma-section-title">Nama Peternak / Pembeli</span>
        </div>
        <div class="ma-section-body">
          <div style="display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;margin-bottom:12px;">
            <div style="flex:1;min-width:180px;">
              <select class="ma-select" id="tx_peternak_select" onchange="LogistikModule.onPeternakSelectChange(this.value)" required>
                <option value="">-- Pilih Nama Peternak --</option>
                ${this.getMasterPeternak().filter(p => p.kategori === 'RASIO').map(p =>
                  `<option value="${p.nama}">${p.nama}</option>`
                ).join('')}
                <option value="+ TAMBAH NAMA PETERNAK BARU">+ Tambah Peternak Baru...</option>
              </select>
            </div>
            <div style="display:flex;gap:8px;align-items:center;flex-shrink:0;">
              <div class="ma-status-row">
                <span class="ma-status-label">STATUS KETERIMAAN</span>
                <span class="ma-status-badge" id="tx_status_label">SUKSES</span>
              </div>
              <div class="ma-status-row" style="margin-left:8px;">
                <span class="ma-status-label">KODE PETERNAK</span>
                <span class="ma-status-badge" id="tx_kode_badge_ma">R-SERIES</span>
              </div>
            </div>
          </div>

          <!-- Hidden: add new peternak box -->
          <div id="tx_new_peternak_box" style="display:none;margin-bottom:12px;padding:12px;background:#17263b;border-radius:10px;border:1px solid #20324a;">
            <div style="font-weight:700;font-size:0.8rem;margin-bottom:6px;">Tambah Peternak Baru</div>
            <input type="text" class="ma-input" id="tx_nama_baru" placeholder="Nama lengkap peternak baru" style="margin-bottom:8px;">
            <select class="ma-select" id="tx_kategori_baru" onchange="LogistikModule.onKategoriBaruChange(this.value)">
              <option value="RASIO">RASIO (Anggota Koperasi)</option>
              <option value="NON_RASIO">NON-RASIO (Bukan Anggota)</option>
            </select>
          </div>

          <!-- Date & Time Row (Clean Labels, Single Native Picker) -->
          <div class="ma-input-row">
            <div class="ma-field">
              <label class="ma-label"><i class="bi bi-calendar-event me-1"></i>Tanggal</label>
              <input type="date" class="ma-input" name="tanggal_pengambilan" id="tx_tanggal"
                value="${new Date().toISOString().slice(0, 10)}"
                onchange="LogistikModule.onTanggalPengambilanChange(this.value)" required>
            </div>
            <div class="ma-field">
              <label class="ma-label"><i class="bi bi-clock me-1"></i>Jam</label>
              <input type="time" class="ma-input" name="waktu_pengambilan" id="tx_waktu"
                value="${new Date().toTimeString().slice(0, 5)}" required>
            </div>
          </div>
        </div>

        <input type="hidden" name="kode_r_nr" id="tx_kode_r_nr" value="">
        <input type="hidden" name="kategori_pembeli" id="tx_kategori_pembeli" value="RASIO">
        <input type="hidden" name="nomor_anggota" id="tx_nomor_anggota" value="0">
      </div>

      <!-- STEP 3: PAKAN TABLE (EXACT 3-COLUMN TABLE MATCHING SCREENSHOT) -->
      <div class="ma-section" id="maPakanSection">
        <div class="ma-section-header">
          <div class="ma-step-badge">3</div>
          <span class="ma-section-title">Input Jumlah Jenis Pakan</span>
        </div>
        <div class="ma-section-body" style="padding:0;">
          <table class="ma-feed-table">
            <thead>
              <tr>
                <th style="text-align:left;padding-left:14px;">JENIS PAKAN</th>
                <th style="width:90px;text-align:center;">HARGA / KG</th>
                <th style="width:115px;text-align:center;padding-right:14px;">JUMLAH (SAK / KG)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding-left:14px;">
                  <span class="ma-feed-name">MF A20 RATIO</span>
                  <span class="ma-feed-tag">Jatah Anggota</span>
                </td>
                <td style="text-align:center;" class="ma-feed-price">Rp 4.200</td>
                <td style="padding-right:14px;">
                  <div class="ma-stepper">
                    <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_mf_a20_ratio', -1)">−</button>
                    <input type="number" step="0.1" class="ma-stepper-input" id="tx_qty_mf_a20_ratio" value="" placeholder="0" oninput="LogistikModule.calcMultiTxPreview()">
                    <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_mf_a20_ratio', 1)">+</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding-left:14px;">
                  <span class="ma-feed-name">MF A18 AGGT SUB</span>
                </td>
                <td style="text-align:center;" class="ma-feed-price">Rp 3.900</td>
                <td style="padding-right:14px;">
                  <div class="ma-stepper">
                    <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_mf_a18_sub', -1)">−</button>
                    <input type="number" step="0.1" class="ma-stepper-input" id="tx_qty_mf_a18_sub" value="" placeholder="0" oninput="LogistikModule.calcMultiTxPreview()">
                    <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_mf_a18_sub', 1)">+</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding-left:14px;">
                  <span class="ma-feed-name">MAGNESIUM</span>
                </td>
                <td style="text-align:center;" class="ma-feed-price">Rp 30.000</td>
                <td style="padding-right:14px;">
                  <div class="ma-stepper">
                    <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_magnesium', -1)">−</button>
                    <input type="number" step="0.1" class="ma-stepper-input" id="tx_qty_magnesium" value="" placeholder="0" oninput="LogistikModule.calcMultiTxPreview()">
                    <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_magnesium', 1)">+</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding-left:14px;">
                  <span class="ma-feed-name">DCP</span>
                </td>
                <td style="text-align:center;" class="ma-feed-price">Rp 25.000</td>
                <td style="padding-right:14px;">
                  <div class="ma-stepper">
                    <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_dcp', -1)">−</button>
                    <input type="number" step="0.1" class="ma-stepper-input" id="tx_qty_dcp" value="" placeholder="0" oninput="LogistikModule.calcMultiTxPreview()">
                    <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_dcp', 1)">+</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding-left:14px;">
                  <span class="ma-feed-name">MF A20 NON RATIO</span>
                  <span class="ma-feed-tag" style="background:#78350f;color:#fef3c7;">Non-Anggota</span>
                </td>
                <td style="text-align:center;" class="ma-feed-price">Rp 4.500</td>
                <td style="padding-right:14px;">
                  <div class="ma-stepper">
                    <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_mf_a20_non', -1)">−</button>
                    <input type="number" step="0.1" class="ma-stepper-input" id="tx_qty_mf_a20_non" value="" placeholder="0" oninput="LogistikModule.calcMultiTxPreview()">
                    <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_mf_a20_non', 1)">+</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <a class="ma-add-feed-link"><i class="bi bi-arrow-right me-1"></i>Tambah Jenis Pakan</a>
        </div>
      </div>

      <!-- STEP 4: METODE PEMBAYARAN + SUMMARY + CTA -->
      <div class="ma-section" id="maPaymentSection">
        <div class="ma-section-header">
          <div class="ma-step-badge">4</div>
          <span class="ma-section-title">Jadwal Penagihan / Metode Pembayaran</span>
        </div>
        <div class="ma-section-body">
          <div class="ma-field">
            <select class="ma-select" name="jadwal_penagihan" id="tx_jadwal_penagihan"
              onchange="LogistikModule.onJadwalSelectChange(this.value)" required>
              <option value="P1">Potongan Rutin P1 (Tgl 1-10) | Tagih Tgl 5</option>
              <option value="P2">Potongan Rutin P2 (Tgl 11-20) | Tagih Tgl 15</option>
              <option value="P3">Potongan Rutin P3 (Tgl 21-Akhir) | Tagih Tgl 25</option>
              <option value="TUNAI">TUNAI (Uang Rupiah)</option>
              <option value="PROGRAM_BUNTING">Program Bunting (Inseminasi Buatan)</option>
              <option value="PIUTANG">PIUTANG (Tunggakan Susu Lewat P3)</option>
            </select>
            <input type="hidden" name="metode_pembayaran" id="tx_metode_pembayaran" value="POTONGAN_RUTIN">
          </div>

          <div id="tx_non_rasio_notice" style="display:none;margin-bottom:10px;padding:8px 12px;background:#78350f;border-radius:8px;color:#fef3c7;font-size:0.75rem;">
            <strong>Perhatian Non-Rasio:</strong> Pembayaran WAJIB TUNAI.
          </div>

          <div class="ma-summary-box">
            <div class="ma-summary-col">
              <div class="ma-summary-col-label">VOLUME PAKAN</div>
              <div class="ma-summary-col-val" id="tx_total_kg_preview">0 KG</div>
            </div>
            <div class="ma-summary-col">
              <div class="ma-summary-col-label">TOTAL NOMINAL</div>
              <div class="ma-summary-col-val" style="color:#10b981;" id="tx_total_rp_preview">Rp 0</div>
            </div>
          </div>

          <button type="submit" class="ma-btn-primary">
            <i class="bi bi-floppy-fill me-1"></i>Simpan Transaksi
          </button>
        </div>
      </div>

    </form>
  </div>

  <!-- TABEL FORM PENJUALAN PAKAN -->
  <div id="maTxListSection" style="margin-top:14px;">
    <div style="padding: 0 var(--ma-gutter);margin-bottom:10px;">
      <div class="ma-tx-header">
        <div class="ma-tx-title-wrap">
          <div class="ma-tx-title"><i class="bi bi-file-earmark-spreadsheet text-success me-1"></i>Tabel Form Penjualan Pakan</div>
          <div class="ma-tx-subtitle">Cetak atau unduh laporan penjualan harian</div>
        </div>
        <span class="ma-tx-badge"><i class="bi bi-receipt me-1"></i>${this.getTransactionsByMonth().length} Transaksi</span>
      </div>

      <div class="ma-tx-action-bar">
        <button type="button" class="ma-btn-excel" onclick="LogistikModule.exportExcelPenjualanPakanHarian()">
          <i class="bi bi-file-earmark-excel"></i>Download Excel
        </button>
        <button type="button" class="ma-btn-print" onclick="LogistikModule.printPenjualanPakanHarian()">
          <i class="bi bi-printer"></i>Cetak
        </button>
        <input type="search" class="ma-search-input" placeholder="Cari nama / pakan..." oninput="LogistikModule.filterTxTable()" id="searchTxInput">
      </div>
    </div>

    <!-- Mobile Card List (HORIZONTAL FLEX CARDS MATCHING SCREENSHOT 100%) -->
    <div class="ma-tx-list" id="printableFormPenjualanPakan">
      ${(() => {
        const monthTxs = this.getTransactionsByMonth();
        if (monthTxs.length === 0) {
          return `
            <div style="text-align:center;padding:24px;color:#94a3b8;">
              <i class="bi bi-inbox fs-2 d-block mb-2"></i>
              <div style="font-weight:700;font-size:0.9rem;">Belum Ada Transaksi</div>
              <div style="font-size:0.75rem;margin-top:4px;">Belum ada catatan penjualan di bulan ${this.selectedMonth} ${this.selectedYear}.</div>
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
                  <span style="padding:1px 5px;background:#17263b;border:1px solid #20324a;border-radius:4px;font-size:0.65rem;font-weight:700;">${kodeDisplay}</span>
                  <span>${tx.jenis_pakan || ''} · ${Number(tx.jumlah_sak_kg || 0).toLocaleString('id-ID')} KG</span>
                </div>
                <div class="ma-tx-meta" style="margin-top:2px;">
                  <i class="bi bi-clock"></i><span>${tgl} · ${wkt}</span>
                </div>
              </div>
              <div class="ma-tx-card-right">
                <div class="ma-tx-amount">Rp ${totalRp.toLocaleString('id-ID')}</div>
                <div style="display:flex;gap:4px;align-items:center;">
                  <span class="ma-tx-badge">${badgeText}</span>
                  <button type="button" class="ma-tx-del-btn" title="Hapus" onclick="LogistikModule.deleteLogistikTx('${tx.id}')">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('');
      })()}
    </div>
  </div>

  <div style="height: 16px;"></div>

  <!-- SECONDARY TABS: Peralatan / Matrix / Pembelian / Stok -->
  <div id="maSecondaryTabs">
    <div class="ma-tabs-header">
      <button class="ma-tab-btn active" id="ma-tab-matrix" onclick="LogistikModule.maShowTab('matrix', this)">
        <i class="bi bi-grid-3x3-gap-fill me-1" style="color:#10b981;"></i>II. Penjualan Pakan
      </button>
      <button class="ma-tab-btn" id="ma-tab-peralatan" onclick="LogistikModule.maShowTab('peralatan', this)">
        <i class="bi bi-tools me-1" style="color:#f59e0b;"></i>I. Peralatan
      </button>
      <button class="ma-tab-btn" id="ma-tab-pembelian" onclick="LogistikModule.maShowTab('pembelian', this)">
        <i class="bi bi-cart-plus me-1" style="color:#3b82f6;"></i>III. Pembelian
      </button>
      <button class="ma-tab-btn" id="ma-tab-stok" onclick="LogistikModule.maShowTab('stok', this)">
        <i class="bi bi-box-seam me-1" style="color:#8b5cf6;"></i>IV. Stok
      </button>
    </div>

    <!-- TAB CONTENT: Matrix Penjualan (II) -->
    <div id="ma-pane-matrix" class="ma-content">
      <div class="ma-card">
        <div class="ma-card-header">
          <div class="ma-card-title">
            <i class="bi bi-journal-check me-1" style="color:#10b981;"></i>
            II. Penjualan Makanan Ternak — ${this.selectedMonth} ${this.selectedYear}
          </div>
          <button class="ma-btn-secondary" onclick="LogistikModule.exportExcelSec2()">
            <i class="bi bi-file-earmark-excel me-1"></i>Excel
          </button>
        </div>
        <div style="overflow-x:auto;">
          <table class="table table-bordered align-middle text-center mb-0" style="font-size:0.75rem;">
            <thead>
              <tr>
                <th rowspan="2" class="align-middle">NO</th>
                <th rowspan="2" class="align-middle text-start">NAMA PAKAN</th>
                <th colspan="3">TUNAI</th>
                <th colspan="3">POTONGAN</th>
                <th colspan="3">PIUTANG</th>
                <th colspan="3">BUNTING</th>
                <th colspan="2">JUMLAH</th>
              </tr>
              <tr>
                <th>KG</th><th>HARGA</th><th>RP</th>
                <th>KG</th><th>HARGA</th><th>RP</th>
                <th>KG</th><th>HARGA</th><th>RP</th>
                <th>KG</th><th>HARGA</th><th>RP</th>
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
                  <td>${it.bun_kg > 0 ? Number(it.bun_kg).toLocaleString('id-ID') : '-'}</td>
                  <td>${it.bun_harga > 0 ? Number(it.bun_harga).toLocaleString('id-ID') : '-'}</td>
                  <td class="text-warning fw-semibold">${it.bun_rp > 0 ? Number(it.bun_rp).toLocaleString('id-ID') : '-'}</td>
                  <td class="fw-bold text-light">${it.jumlah_kg > 0 ? Number(it.jumlah_kg).toLocaleString('id-ID') : '-'}</td>
                  <td class="fw-bold text-success">${it.jumlah_rp > 0 ? Number(it.jumlah_rp).toLocaleString('id-ID') : '-'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB CONTENT: Peralatan (I) -->
    <div id="ma-pane-peralatan" class="ma-content" style="display:none;">
      <div class="ma-card">
        <div class="ma-card-header">
          <div class="ma-card-title"><i class="bi bi-tools me-1" style="color:#f59e0b;"></i>I. Inventaris Peralatan Ternak</div>
          <button class="ma-btn-secondary" onclick="LogistikModule.exportExcelSec1()"><i class="bi bi-file-earmark-excel me-1"></i>Excel</button>
        </div>
        <div style="overflow-x:auto;">
          <table class="table table-bordered align-middle text-center mb-0" style="font-size:0.75rem;">
            <thead>
              <tr>
                <th rowspan="2">NO</th>
                <th rowspan="2" class="text-start">NAMA ALAT</th>
                <th colspan="3">STOK AWAL</th>
                <th colspan="3">PEMBELIAN</th>
                <th colspan="3">PENJUALAN</th>
                <th colspan="2">STOK AKHIR</th>
              </tr>
              <tr>
                <th>UNIT</th><th>HARGA</th><th>RP</th>
                <th>UNIT</th><th>HARGA</th><th>RP</th>
                <th>UNIT</th><th>HARGA</th><th>RP</th>
                <th>UNIT</th><th>RP</th>
              </tr>
            </thead>
            <tbody>
              ${monthData.sec1.map(it => `
                <tr>
                  <td>${it.no}</td>
                  <td class="text-start fw-bold">${it.nama}</td>
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
                  <td class="fw-bold text-success">${it.stok_akhir_rp ? Number(it.stok_akhir_rp).toLocaleString('id-ID') : '-'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB CONTENT: Pembelian Pakan (III) -->
    <div id="ma-pane-pembelian" class="ma-content" style="display:none;">
      <div class="ma-card">
        <div class="ma-card-header">
          <div class="ma-card-title"><i class="bi bi-cart-plus me-1" style="color:#3b82f6;"></i>III. Pembelian Makanan Ternak</div>
          <button class="ma-btn-secondary" onclick="LogistikModule.exportExcelSec3()"><i class="bi bi-file-earmark-excel me-1"></i>Excel</button>
        </div>
        <div style="overflow-x:auto;">
          <table class="table table-bordered align-middle text-center mb-0" style="font-size:0.75rem;">
            <thead>
              <tr>
                <th>NO</th><th class="text-start">NAMA ALAT / PAKAN</th>
                <th>TANGGAL</th><th>UNIT / SAK</th><th>KG</th><th>HARGA/KG</th><th>TOTAL RP</th>
              </tr>
            </thead>
            <tbody>
              ${monthData.sec3.map(it => `
                <tr>
                  <td>${it.no}</td><td class="text-start fw-bold">${it.nama}</td>
                  <td>${it.tanggal || '-'}</td><td>${it.unit_sak || '-'}</td>
                  <td>${it.kg > 0 ? Number(it.kg).toLocaleString('id-ID') : '-'}</td>
                  <td>${it.harga > 0 ? Number(it.harga).toLocaleString('id-ID') : '-'}</td>
                  <td class="fw-bold text-success">${it.rp > 0 ? Number(it.rp).toLocaleString('id-ID') : '-'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB CONTENT: Stok Pakan (IV) -->
    <div id="ma-pane-stok" class="ma-content" style="display:none;">
      <div class="ma-card">
        <div class="ma-card-header">
          <div class="ma-card-title"><i class="bi bi-box-seam me-1" style="color:#8b5cf6;"></i>IV. Stok Makanan Ternak</div>
          <button class="ma-btn-secondary" onclick="LogistikModule.exportExcelSec4()"><i class="bi bi-file-earmark-excel me-1"></i>Excel</button>
        </div>
        <div style="overflow-x:auto;">
          <table class="table table-bordered align-middle text-center mb-0" style="font-size:0.75rem;">
            <thead>
              <tr>
                <th>NO</th><th class="text-start">NAMA PAKAN</th>
                <th>STOK AWAL</th><th>PEMBELIAN</th><th>SIAP JUAL</th>
                <th>PENJUALAN</th><th>SUSUT</th><th>STOK AKHIR</th><th>HARGA</th><th>JUMLAH RP</th>
              </tr>
            </thead>
            <tbody>
              ${monthData.sec4.map(it => `
                <tr>
                  <td>${it.no}</td><td class="text-start fw-bold">${it.nama}</td>
                  <td>${it.stok_awal > 0 ? Number(it.stok_awal).toLocaleString('id-ID') : '-'}</td>
                  <td>${it.pembelian > 0 ? Number(it.pembelian).toLocaleString('id-ID') : '-'}</td>
                  <td class="text-primary">${it.siap_jual > 0 ? Number(it.siap_jual).toLocaleString('id-ID') : '-'}</td>
                  <td class="text-success">${it.penjualan > 0 ? Number(it.penjualan).toLocaleString('id-ID') : '-'}</td>
                  <td class="text-danger">${it.susut > 0 ? Number(it.susut).toLocaleString('id-ID') : '0'}</td>
                  <td class="fw-bold">${it.stok_akhir > 0 ? Number(it.stok_akhir).toLocaleString('id-ID') : '0'}</td>
                  <td>${it.harga > 0 ? Number(it.harga).toLocaleString('id-ID') : '-'}</td>
                  <td class="fw-bold text-success">${it.jumlah_rp > 0 ? Number(it.jumlah_rp).toLocaleString('id-ID') : '-'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- MOBILE BOTTOM NAVIGATION BAR -->
  <nav class="ma-bottom-nav">
    <button type="button" class="ma-bottom-tab" onclick="location.hash='#dashboard'">
      <i class="bi bi-house-door"></i>
      <span>Beranda</span>
    </button>
    <button type="button" class="ma-bottom-tab active" onclick="document.getElementById('maFormSection')?.scrollIntoView({behavior:'smooth'})">
      <i class="bi bi-file-earmark-text"></i>
      <span>Transaksi</span>
    </button>
    <button type="button" class="ma-bottom-tab" onclick="location.hash='#excel'">
      <i class="bi bi-grid-3x3-gap"></i>
      <span>Excel</span>
    </button>
    <button type="button" class="ma-bottom-tab logout" onclick="AuthModule.logout()">
      <i class="bi bi-box-arrow-right"></i>
      <span>Keluar</span>
    </button>
  </nav>

  <div style="height: 70px;"></div>
</div>
    `;
  },
'''

# Now replace the render function in content
old_render_match = re.search(r'render:\s*function\(\)\s*\{[\s\S]*?selectYear:\s*function', content)
if old_render_match:
    content = content[:old_render_match.start()] + clean_render_code.strip() + "\n\n  selectYear: function" + content[old_render_match.end():]
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Replaced render function cleanly!")
else:
    print("Could not match old_render_match!")
