import os
import re

logistik_path = r"c:\Users\HP\Desktop\KKN SIE ACARA\Proker UMKM\Koperasidanamulya\js\logistik.js"

with open(logistik_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Remove duplicate filter bar (lines 1358 to 1376 approximately)
# Look for consecutive ma-filter-bar blocks
filter_bar_pattern = re.compile(
    r'(<!-- ═+ \s+ FILTER BAR \(EXACT SCREENSHOT MATCH\) \s+ ═+ -->\s*<div class="ma-filter-bar">.*?</div>\s*)(<!-- ═+ \s+ FILTER BAR \(COMPACT — DROPDOWN \+ MONTH PILLS\) \s+ ═+ -->\s*<div class="ma-filter-bar">.*?</div>\s*)',
    re.DOTALL
)

def replace_filter_bar(match):
    # Keep only the first filter bar block
    return match.group(1)

new_content = filter_bar_pattern.sub(replace_filter_bar, content)

# 2. Fix NON-RASIO icon inline style in Step 1
new_content = new_content.replace(
    '<div class="ma-selection-icon" style="background:#fef3c7;color:#b45309;"><i class="bi bi-person-badge-fill"></i></div>',
    '<div class="ma-selection-icon non-rasio-icon"><i class="bi bi-person-badge-fill"></i></div>'
)

# 3. Fix double date & time icons in Step 2
# Replace the date wrap
new_content = new_content.replace(
    '''              <div class="ma-input-icon-wrap">
                <i class="bi bi-calendar-event ma-input-icon"></i>
                <input type="date" class="ma-input" name="tanggal_pengambilan" id="tx_tanggal"
                  value="${new Date().toISOString().slice(0, 10)}"
                  onchange="LogistikModule.onTanggalPengambilanChange(this.value)" required>
              </div>''',
    '''              <div class="ma-input-icon-wrap">
                <input type="date" class="ma-input" name="tanggal_pengambilan" id="tx_tanggal"
                  value="${new Date().toISOString().slice(0, 10)}"
                  onchange="LogistikModule.onTanggalPengambilanChange(this.value)" required>
              </div>'''
)

# Replace the time wrap
new_content = new_content.replace(
    '''              <div class="ma-input-icon-wrap">
                <i class="bi bi-clock ma-input-icon"></i>
                <input type="time" class="ma-input" name="waktu_pengambilan" id="tx_waktu"
                  value="${new Date().toTimeString().slice(0, 5)}" required>
              </div>''',
    '''              <div class="ma-input-icon-wrap">
                <input type="time" class="ma-input" name="waktu_pengambilan" id="tx_waktu"
                  value="${new Date().toTimeString().slice(0, 5)}" required>
              </div>'''
)

# 4. Replace Step 3 (Input Pakan) list with clean HTML Table
old_pakan_section = '''        <div class="ma-feed-list">
          <!-- Row: MF A20 RATIO -->
          <div class="ma-feed-row">
            <div class="ma-feed-info">
              <div class="ma-feed-name">
                MF A20 RATIO
                <span class="ma-feed-badge">Jatah Anggota</span>
              </div>
              <div class="ma-feed-price">Rp 4.200 / kg</div>
            </div>
            <div class="ma-stepper">
              <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_mf_a20_ratio', -1)">−</button>
              <input type="number" step="0.1" class="ma-stepper-input" id="tx_qty_mf_a20_ratio" value="" placeholder="0" oninput="LogistikModule.calcMultiTxPreview()">
              <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_mf_a20_ratio', 1)">+</button>
            </div>
          </div>
          <!-- Row: MF A18 AGGT SUB -->
          <div class="ma-feed-row">
            <div class="ma-feed-info">
              <div class="ma-feed-name">MF A18 AGGT SUB</div>
              <div class="ma-feed-price">Rp 3.900 / kg</div>
            </div>
            <div class="ma-stepper">
              <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_mf_a18_sub', -1)">−</button>
              <input type="number" step="0.1" class="ma-stepper-input" id="tx_qty_mf_a18_sub" value="" placeholder="0" oninput="LogistikModule.calcMultiTxPreview()">
              <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_mf_a18_sub', 1)">+</button>
            </div>
          </div>
          <!-- Row: MAGNESIUM -->
          <div class="ma-feed-row">
            <div class="ma-feed-info">
              <div class="ma-feed-name">MAGNESIUM</div>
              <div class="ma-feed-price">Rp 30.000 / kg</div>
            </div>
            <div class="ma-stepper">
              <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_magnesium', -1)">−</button>
              <input type="number" step="0.1" class="ma-stepper-input" id="tx_qty_magnesium" value="" placeholder="0" oninput="LogistikModule.calcMultiTxPreview()">
              <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_magnesium', 1)">+</button>
            </div>
          </div>
          <!-- Row: DCP -->
          <div class="ma-feed-row">
            <div class="ma-feed-info">
              <div class="ma-feed-name">DCP</div>
              <div class="ma-feed-price">Rp 25.000 / kg</div>
            </div>
            <div class="ma-stepper">
              <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_dcp', -1)">−</button>
              <input type="number" step="0.1" class="ma-stepper-input" id="tx_qty_dcp" value="" placeholder="0" oninput="LogistikModule.calcMultiTxPreview()">
              <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_dcp', 1)">+</button>
            </div>
          </div>
          <!-- Row: MF A20 NON RATIO -->
          <div class="ma-feed-row">
            <div class="ma-feed-info">
              <div class="ma-feed-name">
                MF A20 NON RATIO
                <span class="ma-feed-badge amber">Non-Anggota</span>
              </div>
              <div class="ma-feed-price">Rp 4.500 / kg</div>
            </div>
            <div class="ma-stepper">
              <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_mf_a20_non', -1)">−</button>
              <input type="number" step="0.1" class="ma-stepper-input" id="tx_qty_mf_a20_non" value="" placeholder="0" oninput="LogistikModule.calcMultiTxPreview()">
              <button type="button" class="ma-stepper-btn" onclick="LogistikModule.stepperChange('tx_qty_mf_a20_non', 1)">+</button>
            </div>
          </div>
        </div>'''

new_pakan_table = '''        <div class="table-responsive" style="overflow-x:auto;margin-top:10px;">
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
        </div>'''

new_content = new_content.replace(old_pakan_section, new_pakan_table)

with open(logistik_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Successfully updated logistik.js!")
