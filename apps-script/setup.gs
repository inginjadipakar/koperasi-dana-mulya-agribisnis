/**
 * ============================================================
 * SETUP.GS — SCRIPT INISIALISASI SPREADSHEET KOPERASI DANAMULYA
 * ============================================================
 * 
 * CARA PENGGUNAAN:
 *   1. Buka Google Apps Script project ini.
 *   2. Pilih fungsi "setupSpreadsheet" di dropdown atas.
 *   3. Klik tombol ▶ Run.
 *   4. Izinkan akses saat diminta (otorisasi OAuth).
 *   5. Cek log di menu View > Logs untuk hasil inisialisasi.
 *
 * PENTING:
 *   - Jalankan hanya SEKALI pada spreadsheet baru/kosong.
 *   - Jika sheet sudah ada dengan data, script akan SKIP (tidak overwrite).
 *   - Setelah selesai, salin Spreadsheet ID dan tempel ke SPREADSHEET_ID di config.gs.
 *
 * ============================================================
 */

// ─────────────────────────────────────────────────────────────
// FUNGSI UTAMA: Jalankan fungsi ini dari Google Apps Script Editor
// ─────────────────────────────────────────────────────────────

function setupSpreadsheet() {
  Logger.log("========================================================");
  Logger.log("  INISIALISASI SISTEM DIGITAL KOPERASI DANAMULYA");
  Logger.log("========================================================");

  var ss;
  try {
    ss = SpreadsheetApp.getActiveSpreadsheet();
    Logger.log("✓ Menggunakan spreadsheet aktif: " + ss.getName());
    Logger.log("  Spreadsheet ID: " + ss.getId());
  } catch (e) {
    Logger.log("✗ ERROR: Jalankan script ini dari dalam Google Sheets (menu Ekstensi > Apps Script).");
    Logger.log("  Detail error: " + e.message);
    return;
  }

  Logger.log("");
  Logger.log("--- Fase 1: Inisialisasi Semua Sheet & Header ---");

  // Buat semua sheet dengan urutan yang benar
  _initSheet(ss, "USERS",                TABLE_HEADERS.USERS);
  _initSheet(ss, "KOPERASI_PENERIMAAN",  TABLE_HEADERS.KOPERASI_PENERIMAAN);
  _initSheet(ss, "KOPERASI_PENGELUARAN", TABLE_HEADERS.KOPERASI_PENGELUARAN);
  _initSheet(ss, "DEPOT_PEMBELIAN",      TABLE_HEADERS.DEPOT_PEMBELIAN);
  _initSheet(ss, "DEPOT_PENJUALAN",      TABLE_HEADERS.DEPOT_PENJUALAN);
  _initSheet(ss, "DEPOT_LAIN_LAIN",      TABLE_HEADERS.DEPOT_LAIN_LAIN);
  _initSheet(ss, "DEPOT_OPERASIONAL",    TABLE_HEADERS.DEPOT_OPERASIONAL);
  _initSheet(ss, "DEPOT_STOK_OPNAME",    TABLE_HEADERS.DEPOT_STOK_OPNAME);
  _initSheet(ss, "LOGISTIK_TRANSACTIONS",TABLE_HEADERS.LOGISTIK_TRANSACTIONS);
  _initSheet(ss, "AUDIT_LOG",            TABLE_HEADERS.AUDIT_LOG);

  Logger.log("");
  Logger.log("--- Fase 2: Seed Data Pengguna Awal ---");

  _seedUsersIfEmpty(ss);

  Logger.log("");
  Logger.log("--- Fase 3: Hapus Sheet Default (Sheet1) ---");

  _removeDefaultSheet(ss);

  Logger.log("");
  Logger.log("--- Fase 4: Pemformatan Tampilan Header ---");

  _formatAllHeaders(ss);

  Logger.log("");
  Logger.log("========================================================");
  Logger.log("  ✅ SETUP SELESAI!");
  Logger.log("  Spreadsheet ID: " + ss.getId());
  Logger.log("  URL: " + ss.getUrl());
  Logger.log("");
  Logger.log("  LANGKAH BERIKUTNYA:");
  Logger.log("  1. Salin Spreadsheet ID di atas.");
  Logger.log("  2. Tempel ke variabel SPREADSHEET_ID di file config.gs.");
  Logger.log("  3. Deploy Apps Script sebagai Web App (Deploy > New Deployment).");
  Logger.log("========================================================");
}


// ─────────────────────────────────────────────────────────────
// HELPER: Inisialisasi satu sheet dengan header
// ─────────────────────────────────────────────────────────────

function _initSheet(ss, sheetName, headers) {
  var sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    // Sheet belum ada → buat baru
    sheet = ss.insertSheet(sheetName);
    Logger.log("  [BUAT BARU] Sheet '" + sheetName + "' berhasil dibuat.");
  } else {
    // Sheet sudah ada
    var lastRow = sheet.getLastRow();
    if (lastRow >= 1) {
      // Cek apakah baris pertama sudah ada header yang cocok
      var existingFirstCell = sheet.getRange(1, 1).getValue();
      if (String(existingFirstCell).trim() !== "" && existingFirstCell === headers[0]) {
        Logger.log("  [SKIP]     Sheet '" + sheetName + "' sudah memiliki header. Dilewati.");
        return;
      }
    }
    Logger.log("  [UPDATE]   Sheet '" + sheetName + "' ditemukan, menulis header...");
  }

  // Tulis header di baris pertama
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  Logger.log("  [OK]       Header sheet '" + sheetName + "' (" + headers.length + " kolom) ditulis.");
}


// ─────────────────────────────────────────────────────────────
// HELPER: Seed data pengguna awal ke sheet USERS
// ─────────────────────────────────────────────────────────────

function _seedUsersIfEmpty(ss) {
  var sheet = ss.getSheetByName("USERS");
  if (!sheet) {
    Logger.log("  [ERROR] Sheet USERS tidak ditemukan. Seed dibatalkan.");
    return;
  }

  var lastRow = sheet.getLastRow();
  if (lastRow >= 2) {
    Logger.log("  [SKIP] Sheet USERS sudah memiliki " + (lastRow - 1) + " baris data. Seed dilewati.");
    return;
  }

  Logger.log("  Sheet USERS masih kosong. Membuat akun pengguna awal...");

  // Definisi akun awal
  // Format: [username, password_plain, nama_lengkap, role, divisi]
  var initialUsers = [
    ["admin",      "admin123",      "Administrator Sistem",    "admin",    "ALL"],
    ["koperasi01", "koperasi123",   "Petugas Koperasi I",      "koperasi", "KOPERASI"],
    ["koperasi02", "koperasi456",   "Petugas Koperasi II",     "koperasi", "KOPERASI"],
    ["depot01",    "depot123",      "Petugas Depot Susu I",    "depot",    "DEPOT"],
    ["depot02",    "depot456",      "Petugas Depot Susu II",   "depot",    "DEPOT"],
    ["logistik01", "logistik123",   "Petugas Logistik I",      "logistik", "LOGISTIK"]
  ];

  var now = new Date().toISOString();
  var rows = [];

  for (var i = 0; i < initialUsers.length; i++) {
    var u = initialUsers[i];
    var userId    = "USR-00" + (i + 1);
    var username  = u[0];
    var password  = u[1];
    var namaLengkap = u[2];
    var role      = u[3];
    var divisi    = u[4];

    // Generate salt & hash (menggunakan fungsi dari auth.gs)
    var salt = _generateSetupSalt(userId);
    var hash = _hashPasswordSetup(password, salt);

    rows.push([
      userId,       // user_id
      username,     // username
      hash,         // password_hash
      salt,         // password_salt
      namaLengkap,  // nama_lengkap
      role,         // role
      divisi,       // divisi
      "ACTIVE",     // status
      now           // created_at
    ]);

    Logger.log("  [USER] '" + username + "' (" + role + ") → salt: " + salt.substring(0, 8) + "...");
  }

  // Tulis semua baris sekaligus (batch write, lebih efisien)
  sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);

  Logger.log("  ✓ " + rows.length + " akun pengguna berhasil ditambahkan ke sheet USERS.");
  Logger.log("");
  Logger.log("  ┌─────────────────────────────────────────────────┐");
  Logger.log("  │  AKUN LOGIN DEMO SISTEM DANAMULYA               │");
  Logger.log("  ├─────────────┬──────────────┬────────────────────┤");
  Logger.log("  │ Username    │ Password     │ Role               │");
  Logger.log("  ├─────────────┼──────────────┼────────────────────┤");
  Logger.log("  │ admin       │ admin123     │ Admin (Semua)       │");
  Logger.log("  │ koperasi01  │ koperasi123  │ Divisi Koperasi     │");
  Logger.log("  │ koperasi02  │ koperasi456  │ Divisi Koperasi     │");
  Logger.log("  │ depot01     │ depot123     │ Divisi Depot Susu   │");
  Logger.log("  │ depot02     │ depot456     │ Divisi Depot Susu   │");
  Logger.log("  │ logistik01  │ logistik123  │ Divisi Logistik     │");
  Logger.log("  └─────────────┴──────────────┴────────────────────┘");
  Logger.log("  ⚠ PENTING: Segera ganti password semua akun setelah sistem live!");
}


// ─────────────────────────────────────────────────────────────
// HELPER: Hapus sheet default 'Sheet1' yang dibuat Google otomatis
// ─────────────────────────────────────────────────────────────

function _removeDefaultSheet(ss) {
  var defaultSheet = ss.getSheetByName("Sheet1");
  if (!defaultSheet) {
    defaultSheet = ss.getSheetByName("Lembar1"); // nama default bahasa Indonesia
  }

  if (defaultSheet) {
    try {
      ss.deleteSheet(defaultSheet);
      Logger.log("  ✓ Sheet default dihapus.");
    } catch (e) {
      Logger.log("  [SKIP] Sheet default tidak bisa dihapus (mungkin satu-satunya sheet): " + e.message);
    }
  } else {
    Logger.log("  [SKIP] Tidak ada sheet default ditemukan.");
  }
}


// ─────────────────────────────────────────────────────────────
// HELPER: Format visual header semua sheet (bold, freeze, warna)
// ─────────────────────────────────────────────────────────────

function _formatAllHeaders(ss) {
  var sheetNames = Object.keys(SHEET_NAMES).map(function(k) { return SHEET_NAMES[k]; });

  // Warna header berbeda per divisi
  var headerColors = {
    "USERS":                  { bg: "#1a237e", fg: "#ffffff" }, // Biru gelap — Admin
    "KOPERASI_PENERIMAAN":    { bg: "#1b5e20", fg: "#ffffff" }, // Hijau gelap — Koperasi
    "KOPERASI_PENGELUARAN":   { bg: "#1b5e20", fg: "#ffffff" },
    "DEPOT_PEMBELIAN":        { bg: "#e65100", fg: "#ffffff" }, // Oranye — Depot
    "DEPOT_PENJUALAN":        { bg: "#e65100", fg: "#ffffff" },
    "DEPOT_LAIN_LAIN":        { bg: "#bf360c", fg: "#ffffff" }, // Oranye gelap
    "DEPOT_OPERASIONAL":      { bg: "#bf360c", fg: "#ffffff" },
    "DEPOT_STOK_OPNAME":      { bg: "#4a148c", fg: "#ffffff" }, // Ungu — Stok
    "LOGISTIK_TRANSACTIONS":  { bg: "#37474f", fg: "#ffffff" }, // Abu-abu — Logistik
    "AUDIT_LOG":              { bg: "#212121", fg: "#ffeb3b" }  // Hitam + kuning — Audit
  };

  for (var i = 0; i < sheetNames.length; i++) {
    var name = sheetNames[i];
    var sheet = ss.getSheetByName(name);
    if (!sheet) continue;

    var lastCol = sheet.getLastColumn();
    if (lastCol < 1) continue;

    var headerRange = sheet.getRange(1, 1, 1, lastCol);
    var color = headerColors[name] || { bg: "#455a64", fg: "#ffffff" };

    // Format: bold, background color, text color, freeze row
    headerRange.setFontWeight("bold");
    headerRange.setBackground(color.bg);
    headerRange.setFontColor(color.fg);
    headerRange.setHorizontalAlignment("center");
    headerRange.setFontSize(10);

    // Freeze header row & auto-resize columns
    sheet.setFrozenRows(1);

    try {
      sheet.autoResizeColumns(1, lastCol);
    } catch (e) {
      // autoResizeColumns kadang gagal jika tidak ada data — ok to skip
    }
  }

  Logger.log("  ✓ Semua header sheet telah diformat (bold, warna, freeze baris 1).");
}


// ─────────────────────────────────────────────────────────────
// HELPER INTERNAL: Hash password untuk setup (duplikat dari auth.gs)
// Dipisah agar setup.gs bisa dijalankan secara standalone jika perlu.
// ─────────────────────────────────────────────────────────────

function _hashPasswordSetup(password, salt) {
  var rawBytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    password + salt,
    Utilities.Charset.UTF_8
  );
  var txt = "";
  for (var i = 0; i < rawBytes.length; i++) {
    var byteVal = rawBytes[i];
    if (byteVal < 0) byteVal += 256;
    var byteStr = byteVal.toString(16);
    if (byteStr.length === 1) byteStr = "0" + byteStr;
    txt += byteStr;
  }
  return txt;
}

function _generateSetupSalt(prefix) {
  var dateStr = Utilities.formatDate(new Date(), "GMT+7", "yyyyMMddHHmmss");
  var rnd = Math.floor(Math.random() * 999999);
  return (prefix || "SALT") + dateStr + rnd;
}


// ─────────────────────────────────────────────────────────────
// FUNGSI BANTUAN: Reset satu sheet (hapus data, pertahankan header)
// Jalankan manual jika ingin clear data testing
// ─────────────────────────────────────────────────────────────

function clearSheetDataOnly(sheetName) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    Logger.log("Sheet '" + sheetName + "' tidak ditemukan.");
    return;
  }

  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    Logger.log("Sheet '" + sheetName + "' sudah kosong (tidak ada data di bawah header).");
    return;
  }

  sheet.deleteRows(2, lastRow - 1);
  Logger.log("✓ Sheet '" + sheetName + "' berhasil dikosongkan (header dipertahankan).");
}


// ─────────────────────────────────────────────────────────────
// FUNGSI BANTUAN: Reset HANYA sheet USERS & seed ulang akun awal
// Berguna jika akun admin terkunci atau lupa password
// ─────────────────────────────────────────────────────────────

function resetAndReseedUsers() {
  var confirmation = Browser.inputBox(
    "⚠ KONFIRMASI RESET",
    "Ketik RESET untuk mengkonfirmasi. Aksi ini akan menghapus SEMUA akun dan membuat ulang akun default.",
    Browser.Buttons.OK_CANCEL
  );

  if (confirmation !== "RESET") {
    Logger.log("Reset dibatalkan oleh pengguna.");
    return;
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  clearSheetDataOnly("USERS");
  _seedUsersIfEmpty(ss);
  Logger.log("✓ Sheet USERS berhasil di-reset dan akun default telah dibuat ulang.");
}


// ─────────────────────────────────────────────────────────────
// FUNGSI BANTUAN: Tampilkan Spreadsheet ID di Logger
// ─────────────────────────────────────────────────────────────

function printSpreadsheetInfo() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log("Nama Spreadsheet : " + ss.getName());
  Logger.log("Spreadsheet ID   : " + ss.getId());
  Logger.log("URL              : " + ss.getUrl());
  Logger.log("");
  Logger.log("Salin ID di atas dan tempel ke variabel SPREADSHEET_ID di config.gs");
}
