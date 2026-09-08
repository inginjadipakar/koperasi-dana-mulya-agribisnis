import re

file_path = r"c:\Users\HP\Desktop\KKN SIE ACARA\Proker UMKM\Koperasidanamulya\js\logistik.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace Quick Action Grid classes & icons
new_render_top = '''
  <!-- ═══════════════════════════════════════════════════
       QUICK ACTIONS 4×2 GRID (ALA SREENSHOT)
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
      <button class="ma-action-item" onclick="App.resetData()">
        <div class="ma-action-icon yellow-bg"><i class="bi bi-gear-fill"></i></div>
        <span class="ma-action-label">Pengaturan</span>
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
    <div style="width:1px;height:20px;background:#20324a;flex-shrink:0;"></div>
    ${monthsList.slice(0, 4).map(m => `
      <button class="ma-month-pill ${m === this.selectedMonth ? 'active' : ''}" onclick="LogistikModule.selectMonth('${m}')">${m}</button>
    `).join('')}
    <button class="ma-filter-icon-btn" title="Filter Lanjutan"><i class="bi bi-sliders2"></i></button>
  </div>
'''

print("Updating HTML in logistik.js...")
