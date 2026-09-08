import openpyxl, json

def clean_num(val):
    if val is None:
        return 0
    if isinstance(val, (int, float)):
        return round(val, 2)
    try:
        s = str(val).replace('.', '').replace(',', '.').strip()
        return round(float(s), 2)
    except:
        return 0

wb_pen = openpyxl.load_workbook('LAPORAN BULANAN PENERIMAAN SUSU 2026.xlsx', data_only=True)
wb_peng = openpyxl.load_workbook('LAPORAN PENGGURUS 2026.xlsx', data_only=True)
wb_rek = openpyxl.load_workbook('LAPORAN PENERIMAAN DAN PENGELUARAN SUSU 2026.xlsx', data_only=True)

months = [
    ('JAN', 'Januari', 'Januari', 'Januari'),
    ('FEB', 'februari', 'februari', 'Februari'),
    ('MAR', 'maret', 'maret', 'Maret'),
    ('APRIL', 'April', 'April', 'April'),
    ('MEI', 'MEI', 'MEI', 'Mei'),
    ('JUNI', 'JUNI', 'JUNI', 'Juni'),
    ('JULI', 'JULI', 'JULI', 'juli.')
]

all_data = {}

for code, s_pen, s_peng, s_rek in months:
    m_data = {
        'penerimaan_anggota': [],
        'penerimaan_non_anggota': [],
        'pengeluaran_perusahaan': [],
        'pengeluaran_perorangan': [],
        'pengeluaran_lain_lain': [],
        'stok_rekap': {'stok_awal': 0, 'penerimaan': 0, 'persediaan': 0, 'pengeluaran': 0, 'stok_akhir': 0}
    }
    
    # Penerimaan
    ws_p = wb_pen[s_pen]
    for r in range(9, 20):
        kel = ws_p.cell(row=r, column=2).value
        kg = ws_p.cell(row=r, column=3).value
        rp = ws_p.cell(row=r, column=4).value
        
        wil = ws_p.cell(row=r, column=5).value
        w_kg = ws_p.cell(row=r, column=6).value
        w_rp = ws_p.cell(row=r, column=7).value
        
        if kel and str(kel).strip() and not str(kel).startswith('JUMLAH') and not str(kel).startswith('TOTAL'):
            m_data['penerimaan_anggota'].append({
                'kelompok': str(kel).strip(),
                'kg': clean_num(kg),
                'rp': clean_num(rp)
            })
            
        if wil and str(wil).strip() and not str(wil).startswith('JUMLAH') and not str(wil).startswith('TOTAL'):
            m_data['penerimaan_non_anggota'].append({
                'wilayah': str(wil).strip(),
                'kg': clean_num(w_kg),
                'rp': clean_num(w_rp)
            })

    # Pengeluaran
    ws_g = wb_peng[s_peng]
    for r in range(9, 30):
        perus = ws_g.cell(row=r, column=2).value
        peror = ws_g.cell(row=r, column=3).value
        kg = ws_g.cell(row=r, column=4).value
        hrg = ws_g.cell(row=r, column=5).value
        rp = ws_g.cell(row=r, column=6).value
        
        karena = ws_g.cell(row=r, column=7).value
        l_kg = ws_g.cell(row=r, column=8).value
        
        if perus and str(perus).strip() in ['NESTLE', 'LOKAL', 'AGEN']:
            m_data['pengeluaran_perusahaan'].append({
                'nama': str(perus).strip(),
                'kg': clean_num(kg),
                'rp': clean_num(rp)
            })
        elif peror and str(peror).strip() and not str(peror).startswith('JUMLAH') and not str(peror).startswith('TOTAL') and 'PACET' not in str(peror):
            m_data['pengeluaran_perorangan'].append({
                'nama': str(peror).strip(),
                'kg': clean_num(kg),
                'harga': clean_num(hrg),
                'rp': clean_num(rp)
            })
            
        if karena and str(karena).strip() and not str(karena).startswith('JUMLAH') and str(karena).strip() in ['PECAH / RUSAK', 'PECAH/RUSAK', 'SOSIAL / SUMBANGAN', 'SOSIAL/SUMBANGAN', 'KARYAWAN']:
            m_data['pengeluaran_lain_lain'].append({
                'karena': str(karena).strip(),
                'kg': clean_num(l_kg),
                'keterangan': str(karena).strip()
            })

    # Rekap Sheet
    if s_rek in wb_rek.sheetnames:
        ws_r = wb_rek[s_rek]
        # read stok awal, penerimaan, persediaan, pengeluaran, stok akhir
        # usually stored around rows 15-25
        stok_awal = clean_num(ws_r.cell(row=13, column=3).value or ws_r.cell(row=14, column=3).value or ws_r.cell(row=15, column=3).value)
        pen_liter = clean_num(ws_r.cell(row=14, column=3).value or ws_r.cell(row=15, column=3).value or ws_r.cell(row=16, column=3).value)
        
        # calculate tot_pen_kg
        tot_pen_kg = sum(x['kg'] for x in m_data['penerimaan_anggota']) + sum(x['kg'] for x in m_data['penerimaan_non_anggota'])
        tot_peng_kg = sum(x['kg'] for x in m_data['pengeluaran_perusahaan']) + sum(x['kg'] for x in m_data['pengeluaran_perorangan']) + sum(x['kg'] for x in m_data['pengeluaran_lain_lain'])
        
        m_data['stok_rekap'] = {
            'stok_awal': round(stok_awal, 2),
            'penerimaan': round(tot_pen_kg / 1.025, 2),
            'persediaan': round(stok_awal + (tot_pen_kg / 1.025), 2),
            'pengeluaran': round(tot_peng_kg / 1.025, 2),
            'stok_akhir': round((stok_awal + (tot_pen_kg / 1.025)) - (tot_peng_kg / 1.025), 2)
        }
        
    all_data[code] = m_data

with open('scratch/koperasi_full_data.json', 'w') as f:
    json.dump(all_data, f, indent=2)

print("SUCCESSFULLY DUMPED ALL 7 MONTHS TO scratch/koperasi_full_data.json")
