/**
 * ============================================================
 * RECAP.GS — DYNAMIC DATE-RANGE AGGREGATION & REKAP PUSAT
 * ============================================================
 */

// --- 1. REKAP KOPERASI ---

function getKoperasiRecap(sessionId, startDate, endDate) {
  var auth = authorize(sessionId, null, DIVISIONS.KOPERASI);
  if (!auth.authorized) return auth;
  
  var sDate = formatDateISO(startDate);
  var eDate = formatDateISO(endDate);
  
  var ss = getStorageSpreadsheet();
  var recSheet = ss.getSheetByName(SHEET_NAMES.KOPERASI_PENERIMAAN);
  var outSheet = ss.getSheetByName(SHEET_NAMES.KOPERASI_PENGELUARAN);
  
  var recs = readSheetAsObjects(recSheet, TABLE_HEADERS.KOPERASI_PENERIMAAN).filter(function(r) {
    var rd = formatDateISO(r.tanggal); return rd >= sDate && rd <= eDate;
  });
  var outs = readSheetAsObjects(outSheet, TABLE_HEADERS.KOPERASI_PENGELUARAN).filter(function(r) {
    var rd = formatDateISO(r.tanggal); return rd >= sDate && rd <= eDate;
  });
  
  // Totals Penerimaan
  var totalPenerimaanKg = recs.reduce(function(acc, r) { return acc + parseNumber(r.jumlah_kg); }, 0);
  var totalPenerimaanRp = recs.reduce(function(acc, r) { return acc + parseNumber(r.total_rupiah); }, 0);
  var totalPenerimaanLiter = totalPenerimaanKg / MILK_DENSITY_FACTOR;
  
  // Totals Pengeluaran
  var totalPengeluaranKg = outs.reduce(function(acc, r) { return acc + parseNumber(r.jumlah_kg); }, 0);
  var totalPenjualanRp = outs.reduce(function(acc, r) { return acc + parseNumber(r.total_rupiah); }, 0);
  var totalPengeluaranLiter = totalPengeluaranKg / MILK_DENSITY_FACTOR;
  
  // Susut / Selisih Liter (Penerimaan vs Pengeluaran)
  var selisihLiter = totalPenerimaanLiter - totalPengeluaranLiter;
  
  return {
    success: true,
    code: "OK",
    data: {
      periode: { start: sDate, end: eDate },
      penerimaan: {
        total_kg: totalPenerimaanKg,
        total_liter: totalPenerimaanLiter,
        total_rupiah: totalPenerimaanRp
      },
      pengeluaran: {
        total_kg: totalPengeluaranKg,
        total_liter: totalPengeluaranLiter,
        total_penjualan_rupiah: totalPenjualanRp
      },
      neraca: {
        faktor_densitas: MILK_DENSITY_FACTOR,
        selisih_liter: selisihLiter
      }
    }
  };
}

// --- 2. REKAP DEPOT ---

function getDepotRecap(sessionId, startDate, endDate) {
  var auth = authorize(sessionId, null, DIVISIONS.DEPOT);
  if (!auth.authorized) return auth;
  
  var sDate = formatDateISO(startDate);
  var eDate = formatDateISO(endDate);
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var pSheet = ss.getSheetByName(SHEET_NAMES.DEPOT_PEMBELIAN);
  var sSheet = ss.getSheetByName(SHEET_NAMES.DEPOT_PENJUALAN);
  var oSheet = ss.getSheetByName(SHEET_NAMES.DEPOT_LAIN_LAIN);
  var opsSheet = ss.getSheetByName(SHEET_NAMES.DEPOT_OPERASIONAL);
  
  var purRecs = readSheetAsObjects(pSheet, TABLE_HEADERS.DEPOT_PEMBELIAN).filter(function(r) {
    var rd = formatDateISO(r.tanggal); return rd >= sDate && rd <= eDate;
  });
  var salRecs = readSheetAsObjects(sSheet, TABLE_HEADERS.DEPOT_PENJUALAN).filter(function(r) {
    var rd = formatDateISO(r.tanggal); return rd >= sDate && rd <= eDate;
  });
  var othRecs = readSheetAsObjects(oSheet, TABLE_HEADERS.DEPOT_LAIN_LAIN).filter(function(r) {
    var rd = formatDateISO(r.tanggal); return rd >= sDate && rd <= eDate;
  });
  var opsRecs = readSheetAsObjects(opsSheet, TABLE_HEADERS.DEPOT_OPERASIONAL).filter(function(r) {
    var rd = formatDateISO(r.tanggal); return rd >= sDate && rd <= eDate;
  });
  
  var totalPembelianKg = purRecs.reduce(function(acc, r) { return acc + parseNumber(r.jumlah_kg); }, 0);
  var totalPembelianLiter = purRecs.reduce(function(acc, r) { return acc + parseNumber(r.jumlah_liter); }, 0);
  var totalPembelianRp = purRecs.reduce(function(acc, r) { return acc + parseNumber(r.total_rupiah); }, 0);
  
  var totalPenjualanLiter = salRecs.reduce(function(acc, r) { return acc + parseNumber(r.jumlah_liter); }, 0);
  var totalPenjualanRp = salRecs.reduce(function(acc, r) { return acc + parseNumber(r.total_rupiah); }, 0);
  
  var totalLainLiter = othRecs.reduce(function(acc, r) { return acc + parseNumber(r.jumlah_liter); }, 0);
  var totalBiayaOperasionalRp = opsRecs.reduce(function(acc, r) { return acc + parseNumber(r.nominal_biaya); }, 0);
  
  return {
    success: true,
    code: "OK",
    data: {
      periode: { start: sDate, end: eDate },
      pembelian: {
        total_kg: totalPembelianKg,
        total_liter: totalPembelianLiter,
        total_rupiah: totalPembelianRp
      },
      penjualan: {
        total_liter: totalPenjualanLiter,
        total_rupiah: totalPenjualanRp
      },
      pengeluaran_lain_liter: totalLainLiter,
      biaya_operasional_rupiah: totalBiayaOperasionalRp,
      total_pengeluaran_liter: totalPenjualanLiter + totalLainLiter
    }
  };
}

// --- 3. REKAP PUSAT (ADMIN ONLY) ---

function getPusatRecap(sessionId, startDate, endDate) {
  var auth = authorize(sessionId, ROLES.ADMIN, DIVISIONS.ALL);
  if (!auth.authorized) return auth;
  
  var kopRecap = getKoperasiRecap(sessionId, startDate, endDate);
  var depRecap = getDepotRecap(sessionId, startDate, endDate);
  
  logAuditLog(auth.session.userId, auth.session.role, "GET_PUSAT_RECAP", DIVISIONS.ALL, null, "SUCCESS", startDate + " to " + endDate);
  
  return {
    success: true,
    code: "OK",
    data: {
      periode: { start: formatDateISO(startDate), end: formatDateISO(endDate) },
      koperasi: kopRecap.data,
      depot: depRecap.data,
      logistik: {
        status: "PENDING",
        message: "File Excel Logistik belum tersedia"
      }
    }
  };
}
