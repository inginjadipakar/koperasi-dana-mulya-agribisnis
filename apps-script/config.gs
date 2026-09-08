/**
 * ============================================================
 * CONFIG.GS — KONFIGURASI GLOBAL SISTEM DANAMULYA
 * ============================================================
 */

// Constant Bisnis (GOLDEN REFERENCE EXCEL)
var MILK_DENSITY_FACTOR = 1.025; // 1.025 KG per Liter susu murni

// ID Spreadsheet Storage Produksi (Kosongkan agar menggunakan Spreadsheet aktif tempat Apps Script ini terpasang)
var SPREADSHEET_ID = ""; 

function getStorageSpreadsheet() {
  if (SPREADSHEET_ID && SPREADSHEET_ID.trim() !== "") {
    try {
      return SpreadsheetApp.openById(SPREADSHEET_ID.trim());
    } catch (err) {
      return SpreadsheetApp.getActiveSpreadsheet();
    }
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

// Masa berlaku session token (misal: 8 jam dalam milidetik)
var SESSION_TTL_MS = 8 * 60 * 60 * 1000;

// Listing Nama Sheet Storage
var SHEET_NAMES = {
  USERS: "USERS",
  KOPERASI_PENERIMAAN: "KOPERASI_PENERIMAAN",
  KOPERASI_PENGELUARAN: "KOPERASI_PENGELUARAN",
  DEPOT_PEMBELIAN: "DEPOT_PEMBELIAN",
  DEPOT_PENJUALAN: "DEPOT_PENJUALAN",
  DEPOT_LAIN_LAIN: "DEPOT_LAIN_LAIN",
  DEPOT_OPERASIONAL: "DEPOT_OPERASIONAL",
  DEPOT_STOK_OPNAME: "DEPOT_STOK_OPNAME",
  LOGISTIK_TRANSACTIONS: "LOGISTIK_TRANSACTIONS",
  DEPOT_AGEN: "DEPOT_AGEN",
  AUDIT_LOG: "AUDIT_LOG"
};

// Hierarchy Roles & Divisions
var ROLES = {
  KOPERASI: "koperasi",
  DEPOT: "depot",
  LOGISTIK: "logistik",
  ADMIN: "admin"
};

var DIVISIONS = {
  KOPERASI: "KOPERASI",
  DEPOT: "DEPOT",
  LOGISTIK: "LOGISTIK",
  ALL: "ALL"
};

// Header Definitions for Table Initialization (Safe Mode)
var TABLE_HEADERS = {
  USERS: [
    "user_id", "username", "password_hash", "password_salt", 
    "nama_lengkap", "role", "divisi", "status", "created_at"
  ],
  KOPERASI_PENERIMAAN: [
    "transaction_id", "tanggal", "kategori_sumber", "nama_sumber", 
    "jumlah_kg", "harga_per_kg", "total_rupiah", "keterangan", 
    "created_by", "created_at"
  ],
  KOPERASI_PENGELUARAN: [
    "transaction_id", "tanggal", "kategori_tujuan", "nama_tujuan", 
    "jumlah_kg", "harga_per_kg", "total_rupiah", "keterangan", 
    "created_by", "created_at"
  ],
  DEPOT_PEMBELIAN: [
    "transaction_id", "tanggal", "harga_per_kg", "jumlah_kg", 
    "faktor_densitas", "jumlah_liter", "total_rupiah", "keterangan", 
    "created_by", "created_at"
  ],
  DEPOT_PENJUALAN: [
    "transaction_id", "tanggal", "nama_agen", "harga_per_liter", 
    "jumlah_liter", "total_rupiah", "keterangan", "created_by", "created_at"
  ],
  DEPOT_LAIN_LAIN: [
    "transaction_id", "tanggal", "jenis_pengeluaran", "jumlah_item", 
    "jumlah_liter", "keterangan", "created_by", "created_at"
  ],
  DEPOT_OPERASIONAL: [
    "transaction_id", "tanggal", "nama_barang_jenis", "jumlah", 
    "harga_satuan", "nominal_biaya", "keterangan", "created_by", "created_at"
  ],
  DEPOT_STOK_OPNAME: [
    "opname_id", "periode", "stok_awal_liter", "pembelian_liter", 
    "pengeluaran_liter", "stok_teoretis_liter", "stok_riil_liter", 
    "selisih_liter", "catatan_sisa_botol", "created_by", "created_at"
  ],
  LOGISTIK_TRANSACTIONS: [
    "transaction_id", "status_note", "created_at"
  ],
  DEPOT_AGEN: [
    "agen_id", "nama_agen", "created_by", "created_at"
  ],
  AUDIT_LOG: [
    "log_id", "timestamp", "user_id", "role", "action", 
    "divisi", "transaction_id", "status", "client_info"
  ]
};
