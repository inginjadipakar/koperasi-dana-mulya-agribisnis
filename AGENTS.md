# AGENTS.md — Panduan AI untuk Proyek Website UMKM Kripik

> File ini dibuat mengikuti standar OpenHands (https://github.com/OpenHands/OpenHands) agar semua AI agent (OpenHands, Claude, GitHub Copilot, dll.) dapat memahami dan bekerja dengan proyek ini secara konsisten.

## 🚀 Cara Menjalankan

```bash
# Install dependensi
npm install
# atau
pnpm install

# Jalankan server development (hot-reload)
npm run dev
# atau
pnpm dev

# Build untuk produksi
npm run build
```

---

## 🧠 Panduan untuk AI Agent

### Prinsip Utama
1. **Selalu baca file ini terlebih dahulu** sebelum mengerjakan tugas apapun.
2. **Titik awal pekerjaan UI** adalah folder `src/app/`.
3. **Entry point** aplikasi adalah `src/main.tsx`.
4. Proyek ini menggunakan **React 18** (bukan React 19) — perhatikan kompatibilitas API.
5. **shadcn/ui + Radix UI** digunakan untuk komponen UI yang accessible.
6. **MUI (Material UI)** juga tersedia sebagai alternatif komponen.

### Komponen UI yang Tersedia
Proyek ini memiliki komponen-komponen berikut yang siap pakai:

| Library | Komponen |
|---------|----------|
| **Radix UI** | Accordion, AlertDialog, Avatar, Checkbox, Dialog, DropdownMenu, HoverCard, Select, Slider, Switch, Tabs, Tooltip, dll. |
| **MUI** | Material Icons, seluruh komponen MUI |
| **shadcn/ui** | Komponen berbasis Radix + Tailwind |
| **Recharts** | Grafik dan chart |
| **Embla Carousel** | Slider/carousel |
| **React Hook Form** | Form handling |
| **Lucide React** | Icon library |
| **Motion (Framer)** | Animasi |
| **Sonner** | Toast notifications |
| **Vaul** | Drawer/bottom sheet |
| **cmdk** | Command palette |

### Aturan Penulisan Kode
- Gunakan **double quotes** untuk string JSX yang mengandung apostrof
- Pastikan semua **JSX tag tertutup** dengan benar
- **Export komponen** sebagai default export
- React 18 — gunakan `ReactDOM.createRoot()` (sudah ada di main.tsx)
- Styling utama: **Tailwind CSS v4** via utility class

### Styling
- Tema shadcn default ada di `default_shadcn_theme.css`
- Customisasi CSS ada di folder `src/styles/`
- Gunakan `tailwind-merge` (sudah include) untuk merge class Tailwind

---

## 📦 Dependensi Utama

| Paket | Versi | Kegunaan |
|-------|-------|----------|
| react + react-dom | 18.3.1 | Library UI (peer dependency) |
| vite | 6.3.5 | Build tool |
| tailwindcss | 4.1.12 | Utility CSS framework |
| @mui/material | 7.3.5 | Material UI components |
| lucide-react | 0.487.0 | Icon library |
| react-router | 7.13.0 | Routing |
| recharts | 2.15.2 | Chart library |
| motion | 12.23.24 | Animasi (Framer Motion) |

---

## 🤝 Kompatibilitas AI Agent

File ini kompatibel dengan:
- **OpenHands** (openhands.ai) — agen AI pengembang otomatis
- **Claude** (Anthropic) — baca via `CLAUDE.md` yang merujuk ke sini
- **GitHub Copilot** — konteks proyek dari file ini
- **Cursor / Windsurf / VS Code AI** — dapat membaca AGENTS.md secara langsung

---

*Diperbarui: 2026-08-20 | Standar: OpenHands AGENTS.md Convention*
