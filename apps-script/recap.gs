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

  // FIX GS-B2: Guard null jika sheet tidak ditemukan (sheet terhapus atau belum dibuat)
  // agar tidak crash dengan TypeError di dalam readSheetAsObjects(null, ...).
  if (!recSheet || !outSheet) {
    return { success: false, code: "SHEET_NOT_FOUND", message: "Sheet Koperasi tidak ditemukan. Jalankan setup terlebih dahulu." };
  }
  
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
  
  // FIX Bug 2: Gunakan getStorageSpreadsheet() konsisten dengan config.gs
  var ss = getStorageSpreadsheet();
  var pSheet = ss.getSheetByName(SHEET_NAMES.DEPOT_PEMBELIAN);
  var sSheet = ss.getSheetByName(SHEET_NAMES.DEPOT_PENJUALAN);
  var oSheet = ss.getSheetByName(SHEET_NAMES.DEPOT_LAIN_LAIN);
  var opsSheet = ss.getSheetByName(SHEET_NAMES.DEPOT_OPERASIONAL);
  
  // FIX GS-B2: Guard null jika sheet tidak ditemukan
  if (!pSheet || !sSheet || !oSheet || !opsSheet) {
    return { success: false, code: "SHEET_NOT_FOUND", message: "Satu atau lebih sheet Depot tidak ditemukan. Jalankan setup terlebih dahulu." };
  }

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
  
  // FIX Bug 7: Hindari triple authorize() dengan memanggil logika rekap secara langsung,
  // bukan melalui fungsi wrapper yang masing-masing memanggil authorize() lagi.
  var ss = getStorageSpreadsheet();
  var sDate = formatDateISO(startDate);
  var eDate = formatDateISO(endDate);
  
  // --- Koperasi ---
  var recSheet = ss.getSheetByName(SHEET_NAMES.KOPERASI_PENERIMAAN);
  var outSheet = ss.getSheetByName(SHEET_NAMES.KOPERASI_PENGELUARAN);
  // FIX GS-B2: Guard null sebelum readSheetAsObjects agar tidak crash
  if (!recSheet || !outSheet) {
    return { success: false, code: "SHEET_NOT_FOUND", message: "Sheet Koperasi tidak ditemukan di getPusatRecap." };
  }
  var recs = readSheetAsObjects(recSheet, TABLE_HEADERS.KOPERASI_PENERIMAAN).filter(function(r) {
    var rd = formatDateISO(r.tanggal); return rd >= sDate && rd <= eDate;
  });
  var outs = readSheetAsObjects(outSheet, TABLE_HEADERS.KOPERASI_PENGELUARAN).filter(function(r) {
    var rd = formatDateISO(r.tanggal); return rd >= sDate && rd <= eDate;
  });
  var kopPenerimaanKg = recs.reduce(function(a, r) { return a + parseNumber(r.jumlah_kg); }, 0);
  var kopPenerimaanRp = recs.reduce(function(a, r) { return a + parseNumber(r.total_rupiah); }, 0);
  var kopPengeluaranKg = outs.reduce(function(a, r) { return a + parseNumber(r.jumlah_kg); }, 0);
  var kopPenjualanRp = outs.reduce(function(a, r) { return a + parseNumber(r.total_rupiah); }, 0);
  
  // --- Depot ---
  var pSheet = ss.getSheetByName(SHEET_NAMES.DEPOT_PEMBELIAN);
  var sSheet = ss.getSheetByName(SHEET_NAMES.DEPOT_PENJUALAN);
  var oSheet = ss.getSheetByName(SHEET_NAMES.DEPOT_LAIN_LAIN);
  var opsSheet = ss.getSheetByName(SHEET_NAMES.DEPOT_OPERASIONAL);
  // FIX GS-B2: Guard null sebelum readSheetAsObjects agar tidak crash jika sheet Depot hilang
  if (!pSheet || !sSheet || !oSheet || !opsSheet) {
    return { success: false, code: "SHEET_NOT_FOUND", message: "Sheet Depot tidak ditemukan di getPusatRecap." };
  }
  var purRecs = readSheetAsObjects(pSheet, TABLE_HEADERS.DEPOT_PEMBELIAN).filter(function(r) {
    var rd = formatDateISO(r.tanggal); return rd >= sDate && rd <= eDate;
  });
  var salRecs = readSheetAsObjects(sSheet, TABLE_HEADERS.DEPOT_PENJUALAN).filter(function(r) {
    var rd = formatDateISO(r.tanggal); return rd >= sDate && rd <= eDate;
  });
  var lainRecs = readSheetAsObjects(oSheet, TABLE_HEADERS.DEPOT_LAIN_LAIN).filter(function(r) {
    var rd = formatDateISO(r.tanggal); return rd >= sDate && rd <= eDate;
  });
  var opsRecs = readSheetAsObjects(opsSheet, TABLE_HEADERS.DEPOT_OPERASIONAL).filter(function(r) {
    var rd = formatDateISO(r.tanggal); return rd >= sDate && rd <= eDate;
  });
  var depPembelianKg = purRecs.reduce(function(a, r) { return a + parseNumber(r.jumlah_kg); }, 0);
  var depPembelianLtr = purRecs.reduce(function(a, r) { return a + parseNumber(r.jumlah_liter); }, 0);
  var depPembelianRp = purRecs.reduce(function(a, r) { return a + parseNumber(r.total_rupiah); }, 0);
  var depPenjualanLtr = salRecs.reduce(function(a, r) { return a + parseNumber(r.jumlah_liter); }, 0);
  var depPenjualanRp = salRecs.reduce(function(a, r) { return a + parseNumber(r.total_rupiah); }, 0);
  var depLainLtr = lainRecs.reduce(function(a, r) { return a + parseNumber(r.jumlah_liter); }, 0);
  var depOpsRp = opsRecs.reduce(function(a, r) { return a + parseNumber(r.nominal_biaya); }, 0);
  
  // FIX GS-B4: Sertakan data logistik aktual dari getLogistikData (bukan hardcode PENDING).
  // Saat modul logistik diimplementasikan di logistik.gs, data akan otomatis ikut terbawa.
  // Kita panggil logika langsung tanpa authorize() ulang karena auth sudah dilakukan di atas.
  // FIX LOG-B16 & LOG-B24: Agregasi riil transaksi logistik dalam rentang tanggal sDate - eDate
  var logistikInfo = {
    status: "PENDING",
    total_transactions: 0,
    penjualan: { total_kg: 0, total_rupiah: 0 },
    pembelian: { total_kg: 0, total_rupiah: 0 },
    message: "File Excel Logistik belum tersedia"
  };
  try {
    var logistikSheet = ss.getSheetByName(SHEET_NAMES.LOGISTIK_TRANSACTIONS);
    if (logistikSheet) {
      var logistikRows = logistikSheet.getLastRow();
      var logistikRecords = readSheetAsObjects(logistikSheet, TABLE_HEADERS.LOGISTIK_TRANSACTIONS);
      var filteredLog = logistikRecords.filter(function(r) {
        var rd = formatDateISO(r.tanggal);
        return rd >= sDate && rd <= eDate;
      });
      var logSalKg = 0, logSalRp = 0, logPurKg = 0, logPurRp = 0;
      filteredLog.forEach(function(r) {
        var kg = parseNumber(r.jumlah_kg);
        var rp = parseNumber(r.total_rupiah);
        var kat = (r.kategori || "").toString().trim().toUpperCase();
        if (kat === "PENJUALAN") {
          logSalKg += kg;
          logSalRp += rp;
        } else if (kat === "PEMBELIAN") {
          logPurKg += kg;
          logPurRp += rp;
        }
      });
      logistikInfo = {
        status: "ACTIVE",
        total_transactions: filteredLog.length,
        penjualan: { total_kg: logSalKg, total_rupiah: logSalRp },
        pembelian: { total_kg: logPurKg, total_rupiah: logPurRp },
        message: filteredLog.length === 0
          ? "Modul Logistik aktif. Belum ada transaksi pada periode ini."
          : "Modul Logistik aktif — " + filteredLog.length + " transaksi teragregasi (" + sDate + " s/d " + eDate + ")."
      };
    }
  } catch (eLog) {
    Logger.log("getPusatRecap: gagal baca logistik sheet: " + eLog.toString());
  }

  logAuditLog(auth.session.userId, auth.session.role, "GET_PUSAT_RECAP", DIVISIONS.ALL, null, "SUCCESS", sDate + " to " + eDate);
  
  return {
    success: true,
    code: "OK",
    data: {
      periode: { start: sDate, end: eDate },
      koperasi: {
        penerimaan: { total_kg: kopPenerimaanKg, total_rupiah: kopPenerimaanRp },
        pengeluaran: { total_kg: kopPengeluaranKg, total_penjualan_rupiah: kopPenjualanRp }
      },
      depot: {
        pembelian: { total_kg: depPembelianKg, total_liter: depPembelianLtr, total_rupiah: depPembelianRp },
        penjualan: { total_liter: depPenjualanLtr, total_rupiah: depPenjualanRp },
        pengeluaran_lain_liter: depLainLtr,
        biaya_operasional_rupiah: depOpsRp
      },
      logistik: logistikInfo
    }
  };
}
