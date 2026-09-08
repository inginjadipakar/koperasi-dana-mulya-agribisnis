#!/usr/bin/env python3
import json
from pathlib import Path
import openpyxl

PROJECT_ROOT = Path(r"c:\Users\HP\Desktop\KKN SIE ACARA\Proker UMKM\Koperasidanamulya")

EXCEL_FILES = [
    "LAPORAN PENGGURUS 2026.xlsx",
    "LAPORAN BULANAN 2026 DEPOT SUSU.xlsx",
    "LAPORAN BULANAN PENERIMAAN SUSU 2026.xlsx",
    "LAPORAN PENERIMAAN DAN PENGELUARAN SUSU 2026.xlsx",
    "2026-LAP LOGISTIK.xlsx"
]

all_data = {}

for filename in EXCEL_FILES:
    filepath = PROJECT_ROOT / filename
    if not filepath.exists():
        print("Not found:", filename)
        continue
    
    print("Exporting with Merged Cells 1:1:", filename)
    wb = openpyxl.load_workbook(filepath, data_only=True)
    all_data[filename] = {}
    
    for sheet_name in wb.sheetnames:
        ws = wb[sheet_name]
        max_r = ws.max_row
        max_c = ws.max_column
        
        if max_r == 0 or max_c == 0:
            continue
            
        # Build merge map
        merge_info = {} # (r, c) -> {'cs': colspan, 'rs': rowspan, 'skip': bool}
        for rng in ws.merged_cells.ranges:
            min_r, min_c, max_r_rng, max_c_rng = rng.min_row, rng.min_col, rng.max_row, rng.max_col
            cs = max_c_rng - min_c + 1
            rs = max_r_rng - min_r + 1
            
            for r in range(min_r, max_r_rng + 1):
                for c in range(min_c, max_c_rng + 1):
                    if r == min_r and c == min_c:
                        merge_info[(r, c)] = {'cs': cs, 'rs': rs, 'skip': False}
                    else:
                        merge_info[(r, c)] = {'cs': 1, 'rs': 1, 'skip': True}

        # Build sheet rows matrix
        sheet_rows = []
        for r in range(1, max_r + 1):
            row_cells = []
            has_data = False
            for c in range(1, max_c + 1):
                info = merge_info.get((r, c), {'cs': 1, 'rs': 1, 'skip': False})
                val = ws.cell(row=r, column=c).value
                val_str = "" if val is None else str(val).strip()
                
                if val_str != "":
                    has_data = True
                    
                cell_obj = {
                    'v': val_str,
                    'cs': info['cs'],
                    'rs': info['rs'],
                    'skip': info['skip']
                }
                row_cells.append(cell_obj)
            
            # Keep row if it has data or is part of a merge range
            if has_data or any(c['cs'] > 1 or c['rs'] > 1 for c in row_cells):
                sheet_rows.append(row_cells)
                
        all_data[filename][sheet_name] = sheet_rows

json_str = json.dumps(all_data, ensure_ascii=False, separators=(',', ':'))

viewer_code = """/**
 * ============================================================
 * EXCEL_VIEWER.JS — VIEWER DATA EXCEL ASLI KOPERASI DANAMULYA
 * (SUPPORT MERGED CELLS 1:1 PERSIS LAYOUT ASLI EXCEL)
 * ============================================================
 */

window.ORIGINAL_EXCEL_DATA = """ + json_str + """;

const ExcelViewerModule = {
  activeFile: null,
  activeSheet: null,

  getFileLabel: function(fname) {
    if (fname.includes("PENGGURUS")) return "REKAP PUSAT PENGURUS 2026";
    if (fname.includes("DEPOT")) return "LAPORAN BULANAN DEPOT SUSU 2026";
    if (fname.includes("PENERIMAAN DAN PENGELUARAN")) return "LAPORAN PENERIMAAN DAN PENGELUARAN SUSU 2026";
    if (fname.includes("PENERIMAAN SUSU")) return "LAPORAN BULANAN PENERIMAAN SUSU 2026";
    if (fname.includes("LOGISTIK")) return "LAPORAN LOGISTIK 2026";
    return fname.replace('.xlsx', '');
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
      return allFiles.filter(f => !f.toUpperCase().includes("DEPOT") && !f.toUpperCase().includes("LOGISTIK") && !f.toUpperCase().includes("PENGGURUS"));
    } else if (role === "logistik") {
      return allFiles.filter(f => f.toUpperCase().includes("LOGISTIK"));
    }
    return allFiles;
  },

  render: function() {
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
          <p class="text-muted small mb-0">Tampilan 1:1 persis sesuai format, penulisan & merged cells dari file Excel resmi</p>
        </div>
        <a href="./${encodeURIComponent(this.activeFile)}" download="${this.activeFile}" class="btn btn-lime shadow-sm">
          <i class="bi bi-download me-2"></i>Download File Excel
        </a>
      </div>

      <!-- Tab File Excel -->
      <div class="card shadow-sm border-0 mb-3 bg-white p-3 rounded-4">
        <div class="d-flex gap-2 flex-wrap align-items-center">
          <span class="fw-bold small text-muted me-2"><i class="bi bi-folder2-open me-1"></i>Pilih File:</span>
          ${files.map(f => `
            <button class="btn btn-sm ${f === this.activeFile ? 'btn-lime shadow-sm' : 'btn-light text-dark border-0'} rounded-pill text-nowrap px-3"
                    onclick="ExcelViewerModule.switchFile('${f}')">
              ${this.getFileLabel(f)}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Tab Sheet -->
      <div class="d-flex gap-2 align-items-center mb-3 overflow-auto pb-2 border-bottom">
        <span class="small fw-bold text-muted me-2 text-nowrap"><i class="bi bi-layers me-1"></i>Pilih Sheet:</span>
        ${sheets.map(s => `
          <button class="btn btn-sm ${s === this.activeSheet ? 'btn-dark fw-bold' : 'btn-light text-dark'} rounded-pill text-nowrap px-3"
                  onclick="ExcelViewerModule.switchSheet('${s}')">
            ${s}
          </button>
        `).join('')}
      </div>

      <!-- Grid Tabel Data Excel (Layout 1:1 Persis Merged Cells Excel Asli) -->
      <div class="card shadow-sm border-0 rounded-3 overflow-hidden">
        <div style="overflow: auto; max-height: calc(100vh - 220px);">
          <table class="table table-bordered table-sm align-middle mb-0" style="font-size:0.83rem; min-width:850px; border-collapse: collapse;">
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
          <span><i class="bi bi-table me-1"></i>Menampilkan Sheet <strong>${this.activeSheet}</strong> (${rows.length} Baris Data Matrix)</span>
          <span>File: <strong>${this.activeFile}</strong></span>
        </div>
      </div>
    `;
  },

  buildHeaderCols: function(rows) {
    if (!rows || rows.length === 0) return '<th class="text-center text-white bg-success">A</th>';
    const maxCols = Math.max(...rows.map(r => r.length));
    let out = '';
    for (let i = 0; i < maxCols; i++) {
      const letter = i < 26 ? String.fromCharCode(65 + i) : 'A' + String.fromCharCode(65 + i - 26);
      out += `<th class="text-center text-white border-end fw-bold" style="min-width:110px; background-color: #064e3b !important;">${letter}</th>`;
    }
    return out;
  },

  buildRows: function(rows) {
    if (!rows || rows.length === 0) {
      return `<tr><td colspan="30" class="text-center text-muted p-4"><i class="bi bi-inbox me-2"></i>Sheet ini kosong</td></tr>`;
    }

    return rows.map((row, rIdx) => {
      let cells = `<td class="text-center text-muted border-end bg-light fw-semibold" style="width:45px;">${rIdx + 1}</td>`;
      
      row.forEach((cell) => {
        if (cell.skip) return; // Skip merged covered cells!
        
        const val = cell.v || '';
        const csAttr = cell.cs > 1 ? ` colspan="${cell.cs}"` : '';
        const rsAttr = cell.rs > 1 ? ` rowspan="${cell.rs}"` : '';
        
        // Formatting styles
        const upper = val.toUpperCase();
        const isHeader = upper.includes("LAPORAN") || upper.includes("KOPERASI") || upper.includes("PERIODE") || upper.includes("UNTUK PENJUALAN") || upper.includes("NO.") || upper.includes("NO");
        const isTotal = upper.startsWith("TOTAL") || upper.startsWith("JUMLAH");
        
        let cellClass = "";
        if (isHeader) cellClass = "table-success fw-bold text-center";
        else if (isTotal) cellClass = "table-warning fw-bold";
        else if (cell.cs > 1 || cell.rs > 1) cellClass = "fw-semibold text-center";

        cells += `<td${csAttr}${rsAttr} class="${cellClass}">${this.fmtCell(val)}</td>`;
      });

      return `<tr>${cells}</tr>`;
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
    if (typeof App !== "undefined" && App.applySidebarState) App.applySidebarState();
  },

  switchSheet: function(sheetName) {
    this.activeSheet = sheetName;
    const el = document.getElementById('mainContent');
    if (el) el.innerHTML = this.render();
    if (typeof App !== "undefined" && App.applySidebarState) App.applySidebarState();
  }
};
"""

target_file = PROJECT_ROOT / "js" / "excel_viewer.js"
target_file.write_text(viewer_code, encoding="utf-8")
print(f"Exported 1:1 Merged Cells layout! Saved to {target_file}. Size: {target_file.stat().st_size} bytes")
