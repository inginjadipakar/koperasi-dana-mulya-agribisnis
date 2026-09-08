#!/usr/bin/env python3
import json
from pathlib import Path

PROJECT_ROOT = Path(r"c:\Users\HP\Desktop\KKN SIE ACARA\Proker UMKM\Koperasidanamulya")
data_js = (PROJECT_ROOT / "js" / "excel_data.js").read_text(encoding="utf-8")
json_str = data_js.replace("const ORIGINAL_EXCEL_DATA = ", "").rstrip().rstrip(";")

viewer_code = """/**
 * ============================================================
 * EXCEL_VIEWER.JS — VIEWER DATA EXCEL ASLI KOPERASI DANAMULYA
 * ============================================================
 */

window.ORIGINAL_EXCEL_DATA = """ + json_str + """;

const ExcelViewerModule = {
  activeFile: null,
  activeSheet: null,

  getFileLabel: function(fname) {
    if (fname.includes("DEPOT")) return "<i class='bi bi-cup-straw me-1'></i>Depot Susu 2026";
    if (fname.includes("PENERIMAAN DAN PENGELUARAN")) return "<i class='bi bi-arrow-left-right me-1'></i>Penerimaan & Pengeluaran";
    if (fname.includes("PENERIMAAN SUSU")) return "<i class='bi bi-building-down me-1'></i>Penerimaan Susu";
    if (fname.includes("PENGGURUS")) return "<i class='bi bi-people me-1'></i>Laporan Pengurus";
    return "<i class='bi bi-file-spreadsheet me-1'></i>" + fname.replace('.xlsx', '');
  },

  getAllowedFiles: function() {
    const data = window.ORIGINAL_EXCEL_DATA || {};
    const allFiles = Object.keys(data);
    const session = (typeof AuthManager !== "undefined") ? AuthManager.getSession() : null;
    const role = session ? session.role : "admin";

    if (role === "admin") {
      return allFiles;
    } else if (role === "depot") {
      return allFiles.filter(f => f.toUpperCase().includes("DEPOT"));
    } else if (role === "koperasi") {
      return allFiles.filter(f => !f.toUpperCase().includes("DEPOT") && !f.toUpperCase().includes("LOGISTIK"));
    } else if (role === "logistik") {
      return allFiles.filter(f => f.toUpperCase().includes("LOGISTIK"));
    }
    return allFiles;
  },

  render: function(customRole) {
    const data = window.ORIGINAL_EXCEL_DATA || {};
    const files = this.getAllowedFiles();
    
    if (files.length === 0) {
      return `
        <div class="alert alert-warning d-flex align-items-center gap-2">
          <i class="bi bi-exclamation-triangle-fill fs-4"></i>
          <div>Tidak ada file Excel yang diizinkan untuk divisi Anda.</div>
        </div>`;
    }

    if (!this.activeFile || !files.includes(this.activeFile)) {
      this.activeFile = files[0];
    }

    const currentFileData = data[this.activeFile] || {};
    const sheets = Object.keys(currentFileData);

    if (!this.activeSheet || !currentFileData[this.activeSheet]) {
      this.activeSheet = sheets[0] || "";
    }

    const rows = currentFileData[this.activeSheet] || [];

    const session = (typeof AuthManager !== "undefined") ? AuthManager.getSession() : null;
    const roleName = session ? session.role.toUpperCase() : "ADMIN";

    return `
      <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <div>
          <h4 class="fw-bold mb-1 text-dark d-flex align-items-center gap-2 flex-wrap">
            <i class="bi bi-file-earmark-excel-fill text-success fs-3"></i>
            <span>Laporan Excel Asli Koperasi Danamulya 2026</span>
            <span class="badge bg-success text-white small" style="font-size: 0.75rem;"><i class="bi bi-shield-check me-1"></i>Hak Akses: DIVISI ${roleName}</span>
          </h4>
          <p class="text-muted small mb-0">Data otentik 1:1 dari file Excel resmi yang diizinkan untuk divisi Anda</p>
        </div>
        <a href="./${encodeURIComponent(this.activeFile)}" download="${this.activeFile}" class="btn btn-success fw-bold shadow-sm">
          <i class="bi bi-download me-2"></i>Download File Excel
        </a>
      </div>

      <!-- Tab File Excel -->
      <div class="card shadow-sm border-0 mb-3 bg-light p-2 rounded-3">
        <div class="d-flex gap-2 flex-wrap align-items-center">
          <span class="fw-bold small text-secondary me-2"><i class="bi bi-folder2-open me-1"></i>Pilih File:</span>
          ${files.map(f => `
            <button class="btn btn-sm ${f === this.activeFile ? 'btn-success fw-bold shadow-sm' : 'btn-white text-dark border'} text-nowrap"
                    onclick="ExcelViewerModule.switchFile('${f}')">
              ${this.getFileLabel(f)}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Tab Sheet -->
      <div class="d-flex gap-1 align-items-center mb-3 overflow-auto pb-2 border-bottom">
        <span class="small fw-bold text-secondary me-2 text-nowrap"><i class="bi bi-layers me-1"></i>Pilih Sheet:</span>
        ${sheets.map(s => `
          <button class="btn btn-sm ${s === this.activeSheet ? 'btn-dark fw-bold shadow-sm' : 'btn-outline-secondary'} text-nowrap px-3"
                  onclick="ExcelViewerModule.switchSheet('${s}')">
            ${s}
          </button>
        `).join('')}
      </div>

      <!-- Grid Tabel Data Excel -->
      <div class="card shadow-sm border-0 rounded-3 overflow-hidden">
        <div style="overflow: auto; max-height: calc(100vh - 220px);">
          <table class="table table-bordered table-sm table-hover align-middle mb-0" style="font-size:0.83rem; min-width:750px;">
            <thead class="table-success sticky-top" style="z-index:10;">
              <tr>
                <th class="text-center text-muted border-end bg-light" style="width:45px; min-width:45px;">#</th>
                ${this.buildHeaderCols(rows)}
              </tr>
            </thead>
            <tbody>
              ${this.buildRows(rows)}
            </tbody>
          </table>
        </div>
        <div class="card-footer bg-light d-flex justify-content-between align-items-center py-2 px-3 small text-muted">
          <span><i class="bi bi-table me-1"></i>Menampilkan Sheet <strong>${this.activeSheet}</strong> (${rows.length} Baris Data)</span>
          <span>File: <strong>${this.activeFile}</strong></span>
        </div>
      </div>
    `;
  },

  buildHeaderCols: function(rows) {
    if (!rows || rows.length === 0) return '<th class="text-center bg-light text-muted">A</th>';
    const maxCols = Math.max(...rows.map(r => r.length));
    let out = '';
    for (let i = 0; i < maxCols; i++) {
      const letter = i < 26 ? String.fromCharCode(65 + i) : 'A' + String.fromCharCode(65 + i - 26);
      out += `<th class="text-center bg-light border-end text-muted fw-bold" style="min-width:110px;">${letter}</th>`;
    }
    return out;
  },

  buildRows: function(rows) {
    if (!rows || rows.length === 0) {
      return `<tr><td colspan="30" class="text-center text-muted p-4"><i class="bi bi-inbox me-2"></i>Sheet ini kosong</td></tr>`;
    }

    const maxCols = Math.max(...rows.map(r => r.length));

    return rows.map((row, rIdx) => {
      const firstVal = String(row[0] || '').trim().toUpperCase();
      const isTitleRow = rIdx < 3 && row.filter(c => c && String(c).trim()).length <= 4;
      const isHeaderRow = row.some(c => {
        const v = String(c || '').toLowerCase().trim();
        return v === 'no' || v === 'harga' || v === 'kg' || v === 'liter' || v === 'rupiah' || v === 'tanggal' || v === 'nama' || v === 'total';
      });

      let rowStyle = '';
      if (isTitleRow) rowStyle = 'table-success fw-bold';
      else if (isHeaderRow) rowStyle = 'table-light fw-semibold';
      else if (firstVal.includes('TOTAL') || firstVal.includes('JUMLAH')) rowStyle = 'table-warning fw-bold';

      let cells = `<td class="text-center text-muted border-end bg-light fw-semibold" style="width:45px;">${rIdx + 1}</td>`;
      for (let c = 0; c < maxCols; c++) {
        const raw = (row[c] !== undefined && row[c] !== null) ? String(row[c]) : '';
        cells += `<td class="${rowStyle}">${this.fmtCell(raw)}</td>`;
      }
      return `<tr class="${rowStyle}">${cells}</tr>`;
    }).join('');
  },

  fmtCell: function(val) {
    if (!val || val === '(kosong)' || val.trim() === '') {
      return `<span class="text-muted opacity-25">-</span>`;
    }
    const cleanStr = val.trim();
    const num = parseFloat(cleanStr.replace(/,/g, ''));
    if (!isNaN(num) && /^[\\d.,\\s-]+$/.test(cleanStr) && !cleanStr.includes('/')) {
      if (Math.abs(num) >= 1000) {
        return `<span class="text-end d-block font-monospace">${num.toLocaleString('id-ID')}</span>`;
      }
      return `<span class="text-end d-block font-monospace">${cleanStr}</span>`;
    }
    return cleanStr;
  },

  switchFile: function(fileName) {
    this.activeFile = fileName;
    this.activeSheet = null;
    const el = document.getElementById('mainContent');
    if (el) el.innerHTML = this.render();
  },

  switchSheet: function(sheetName) {
    this.activeSheet = sheetName;
    const el = document.getElementById('mainContent');
    if (el) el.innerHTML = this.render();
  }
};
"""

target_file = PROJECT_ROOT / "js" / "excel_viewer.js"
target_file.write_text(viewer_code, encoding="utf-8")
print(f"Updated {target_file} successfully! Size: {target_file.stat().st_size} bytes")
