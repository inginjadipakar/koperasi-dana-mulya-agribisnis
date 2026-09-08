import re

# 1. Update css/mobile-app.css
css_path = r"c:\Users\HP\Desktop\KKN SIE ACARA\Proker UMKM\Koperasidanamulya\css\mobile-app.css"
with open(css_path, "r", encoding="utf-8") as f:
    css_content = f.read()

# Add/replace explicit fixes for selection cards, feed table, tx cards, and date inputs
custom_css_fixes = '''
/* ── CRITICAL UI FIXES ──────────────────────────────────────── */

/* Selection Cards Fix */
.ma-selection-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.ma-selection-card {
  border: 1.5px solid var(--ma-border);
  border-radius: 14px;
  padding: 12px;
  cursor: pointer;
  background: var(--ma-navy-input);
  transition: all 0.2s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 88px;
}
.ma-selection-icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  margin-bottom: 6px;
  background: rgba(255, 255, 255, 0.06);
  color: var(--ma-text-secondary);
}
.ma-selection-card.selected {
  border-color: var(--ma-emerald);
  background: #a7f3d0 !important;
  color: #064e3b !important;
}
.ma-selection-card.selected .ma-selection-icon {
  background: rgba(6, 78, 59, 0.15);
  color: #064e3b;
}
.ma-selection-card.non-rasio:not(.selected) .ma-selection-icon {
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
}
.ma-selection-name {
  font-size: 0.85rem;
  font-weight: 800;
  display: block;
}
.ma-selection-desc {
  font-size: 0.66rem;
  display: block;
  margin-top: 2px;
}

/* Feed Table Fix (Horizontal Row Alignment) */
.ma-feed-table {
  width: 100%;
  border-collapse: collapse;
}
.ma-feed-table th {
  font-size: 0.66rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 8px;
  border-bottom: 1px solid var(--ma-border);
  background: rgba(0, 0, 0, 0.2);
}
.ma-feed-table td {
  padding: 10px 8px;
  border-bottom: 1px solid var(--ma-border-lt);
  font-size: 0.8rem;
  vertical-align: middle;
}
.ma-feed-table tr:last-child td {
  border-bottom: none;
}

/* Transaction Card Fix (Horizontal Flex Row) */
.ma-tx-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 var(--ma-gutter);
}
.ma-tx-card {
  background: var(--ma-navy-card);
  border: 1px solid var(--ma-border);
  border-radius: 14px;
  padding: 12px 14px;
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: 10px;
}
.ma-tx-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1rem;
  flex-shrink: 0;
}
.ma-tx-avatar.non-rasio {
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
  border-color: rgba(245, 158, 11, 0.3);
}
.ma-tx-card-body {
  flex: 1;
  min-width: 0;
}
.ma-tx-name {
  font-size: 0.88rem;
  font-weight: 800;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ma-tx-meta {
  font-size: 0.72rem;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 2px;
}
.ma-tx-card-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
}
.ma-tx-amount {
  font-size: 0.9rem;
  font-weight: 800;
  color: #ffffff;
}
.ma-tx-del-btn {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  border-radius: 8px;
  padding: 3px 8px;
  font-size: 0.8rem;
  cursor: pointer;
}
'''

with open(css_path, "w", encoding="utf-8") as f:
    f.write(css_content + "\n" + custom_css_fixes)

print("Updated mobile-app.css with layout fixes!")
