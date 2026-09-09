/**
 * ============================================================
 * API.JS — WEB CLIENT UNTUK GOOGLE APPS SCRIPT BACKEND API
 * ============================================================
 */

const API_CONFIG = {
  // URL Google Apps Script Web App Produksi Danamulya
  SCRIPT_URL: localStorage.getItem("DANAMULYA_SCRIPT_URL") || "https://script.google.com/macros/s/AKfycbyuPFBOh0az2YexJ99U-btJ3OxOPE3YHUn6_iw_xBfiqvaIrpP_grg9gmC5qppcu7ay/exec",
  MODE: "REMOTE"
};

const ApiClient = {
  setScriptUrl: function(url) {
    if (url && url.trim().startsWith("http")) {
      localStorage.setItem("DANAMULYA_SCRIPT_URL", url.trim());
      API_CONFIG.SCRIPT_URL = url.trim();
      API_CONFIG.MODE = "REMOTE";
    } else {
      localStorage.removeItem("DANAMULYA_SCRIPT_URL");
      API_CONFIG.SCRIPT_URL = "";
      API_CONFIG.MODE = "LOCAL_BRIDGE";
    }
  },

  post: async function(action, payload = {}) {
    const session = AuthManager.getSession();
    const sessionId = session ? session.sessionId : null;
    
    const requestBody = {
      action: action,
      sessionId: sessionId,
      payload: payload,
      clientInfo: navigator.userAgent
    };

    // Mode REMOTE: panggil endpoint Google Apps Script
    if (API_CONFIG.MODE === "REMOTE" && API_CONFIG.SCRIPT_URL) {
      // MITIGASI TIMEOUT (15 Detik): Gunakan AbortController agar tidak hang tanpa batas
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      try {
        const res = await fetch(API_CONFIG.SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(requestBody),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        // MITIGASI SYNTAX ERROR: Cek teks respon sebelum JSON.parse
        const text = await res.text();
        if (text && text.trim().startsWith("{")) {
          const data = JSON.parse(text);
          return data;
        } else {
          console.warn("Respon server bukan format JSON (kemungkinan halaman HTML error Google):", text.substring(0, 150));
          throw new Error("Respon server bukan format JSON yang valid.");
        }
      } catch (err) {
        clearTimeout(timeoutId);
        console.warn("Gagal terhubung ke Apps Script Backend Remote (" + (err.name === 'AbortError' ? 'Koneksi Timeout 15s' : err.message) + "), alihkan ke Local Bridge Engine.");
        // Automatic Fallback to Local Bridge Engine so application is never blocked
        const fallbackRes = await ApiClient.executeLocalBridge(action, sessionId, payload);
        return fallbackRes;
      }
    }

    // Mode LOCAL_BRIDGE (Simulasi Eksekusi Backend Presisi jika belum terpasang URL)
    return await ApiClient.executeLocalBridge(action, sessionId, payload);
  },

  // Bridge pengujian langsung menggunakan logic backend terverifikasi
  executeLocalBridge: async function(action, sessionId, payload) {
    // Instant 0ms response for silky smooth UI navigation feel
    await new Promise(r => setTimeout(r, 0));
    
    // Simulate Local Storage Data if local mode
    return LocalBridgeEngine.dispatch(action, sessionId, payload);
  }
};

/**
 * Engine penanganan transaksi lokal browser yang menggunakan LOGIKA PERSIS
 * dengan Apps Script backend jika user belum memasukkan URL Google Apps Script.
 */
const LOCAL_BRIDGE_DB_VERSION = "2026_REAL_DATA_MATRIX_V5";

const LocalBridgeEngine = {
  initStorage: function() {
    if (!localStorage.getItem("DANAMULYA_DB") || localStorage.getItem("DANAMULYA_DB_VERSION") !== LOCAL_BRIDGE_DB_VERSION) {
      const db = {
        "USERS": [
                {
                        "user_id": "USR-ADMIN",
                        "username": "admin",
                        "password_hash": "admin123",
                        "role": "admin",
                        "divisi": "ALL",
                        "nama_lengkap": "Administrator Utama",
                        "status": "ACTIVE"
                },
                {
                        "user_id": "USR-KOP01",
                        "username": "koperasi01",
                        "password_hash": "koperasi123",
                        "role": "koperasi",
                        "divisi": "KOPERASI",
                        "nama_lengkap": "Petugas Koperasi",
                        "status": "ACTIVE"
                },
                {
                        "user_id": "USR-DEP01",
                        "username": "depot01",
                        "password_hash": "depot123",
                        "role": "depot",
                        "divisi": "DEPOT",
                        "nama_lengkap": "Petugas Depot Susu",
                        "status": "ACTIVE"
                },
                {
                        "user_id": "USR-LOG01",
                        "username": "logistik01",
                        "password_hash": "logistik123",
                        "role": "logistik",
                        "divisi": "LOGISTIK",
                        "nama_lengkap": "Petugas Logistik",
                        "status": "ACTIVE"
                }
        ],
        "KOPERASI_PENERIMAAN": [
                {
                        "transaction_id": "TRX-KOP-REC-0001",
                        "tanggal": "2026-01-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "CEMBOR",
                        "jumlah_kg": 14602.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0002",
                        "tanggal": "2026-01-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "CLAKET",
                        "jumlah_kg": 17884.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0003",
                        "tanggal": "2026-01-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "PRAMBON",
                        "jumlah_kg": 2443.0,
                        "harga_per_kg": 7000,
                        "total_rupiah": 17101000,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0004",
                        "tanggal": "2026-01-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "MLIGI",
                        "jumlah_kg": 3244.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0005",
                        "tanggal": "2026-01-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "KAMBENGAN",
                        "jumlah_kg": 2513.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0006",
                        "tanggal": "2026-01-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "KRIAN",
                        "jumlah_kg": 3930.0,
                        "harga_per_kg": 7200,
                        "total_rupiah": 28296000,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0007",
                        "tanggal": "2026-01-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "SOSO",
                        "jumlah_kg": 15352.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0008",
                        "tanggal": "2026-01-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "WONOAYU",
                        "jumlah_kg": 4184.0,
                        "harga_per_kg": 7000,
                        "total_rupiah": 29288000,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0009",
                        "tanggal": "2026-01-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "BARAAN",
                        "jumlah_kg": 8354.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0010",
                        "tanggal": "2026-01-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "PASINAN",
                        "jumlah_kg": 4056.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0011",
                        "tanggal": "2026-01-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "PACET / WARU GUNUNG",
                        "jumlah_kg": 19263.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0012",
                        "tanggal": "2026-01-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "KEMIRI / TRECEH",
                        "jumlah_kg": 2952.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0013",
                        "tanggal": "2026-02-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "CEMBOR",
                        "jumlah_kg": 13529.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0014",
                        "tanggal": "2026-02-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "CLAKET",
                        "jumlah_kg": 16087.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0015",
                        "tanggal": "2026-02-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "PRAMBON",
                        "jumlah_kg": 2289.0,
                        "harga_per_kg": 7000,
                        "total_rupiah": 16023000,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0016",
                        "tanggal": "2026-02-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "MLIGI",
                        "jumlah_kg": 2612.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0017",
                        "tanggal": "2026-02-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "KAMBENGAN",
                        "jumlah_kg": 2051.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0018",
                        "tanggal": "2026-02-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "KRIAN",
                        "jumlah_kg": 3275.0,
                        "harga_per_kg": 7200,
                        "total_rupiah": 23580000,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0019",
                        "tanggal": "2026-02-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "SOSO",
                        "jumlah_kg": 13515.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0020",
                        "tanggal": "2026-02-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "WONOAYU",
                        "jumlah_kg": 3659.0,
                        "harga_per_kg": 7000,
                        "total_rupiah": 25613000,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0021",
                        "tanggal": "2026-02-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "BARAAN",
                        "jumlah_kg": 7489.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0022",
                        "tanggal": "2026-02-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "PASINAN",
                        "jumlah_kg": 3501.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0023",
                        "tanggal": "2026-02-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "PACET / WARU GUNUNG",
                        "jumlah_kg": 15693.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0024",
                        "tanggal": "2026-02-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "KEMIRI / TRECEH",
                        "jumlah_kg": 2987.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0025",
                        "tanggal": "2026-03-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "CEMBOR",
                        "jumlah_kg": 14452.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0026",
                        "tanggal": "2026-03-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "CLAKET",
                        "jumlah_kg": 18258.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0027",
                        "tanggal": "2026-03-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "PRAMBON",
                        "jumlah_kg": 3455.0,
                        "harga_per_kg": 7200,
                        "total_rupiah": 24876000,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0028",
                        "tanggal": "2026-03-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "MLIGI",
                        "jumlah_kg": 3327.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0029",
                        "tanggal": "2026-03-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "KAMBENGAN",
                        "jumlah_kg": 2426.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0030",
                        "tanggal": "2026-03-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "KRIAN",
                        "jumlah_kg": 3530.0,
                        "harga_per_kg": 7500,
                        "total_rupiah": 26475000,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0031",
                        "tanggal": "2026-03-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "SOSO",
                        "jumlah_kg": 16417.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0032",
                        "tanggal": "2026-03-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "WONOAYU",
                        "jumlah_kg": 3916.0,
                        "harga_per_kg": 7500,
                        "total_rupiah": 29370000,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0033",
                        "tanggal": "2026-03-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "BARAAN",
                        "jumlah_kg": 9061.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0034",
                        "tanggal": "2026-03-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "PASINAN",
                        "jumlah_kg": 3651.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0035",
                        "tanggal": "2026-03-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "PACET / WARU GUNUNG",
                        "jumlah_kg": 17250.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0036",
                        "tanggal": "2026-03-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "KEMIRI / TRECEH",
                        "jumlah_kg": 2299.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0037",
                        "tanggal": "2026-04-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "CEMBOR",
                        "jumlah_kg": 13743.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0038",
                        "tanggal": "2026-04-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "MOJOSARI",
                        "jumlah_kg": 1600.0,
                        "harga_per_kg": 7200,
                        "total_rupiah": 11520000,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0039",
                        "tanggal": "2026-04-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "CLAKET",
                        "jumlah_kg": 17953.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0040",
                        "tanggal": "2026-04-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "PRAMBON",
                        "jumlah_kg": 1800.0,
                        "harga_per_kg": 7200,
                        "total_rupiah": 12960000,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0041",
                        "tanggal": "2026-04-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "MLIGI",
                        "jumlah_kg": 2633.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0042",
                        "tanggal": "2026-04-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "KAMBENGAN",
                        "jumlah_kg": 3015.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0043",
                        "tanggal": "2026-04-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "KRIAN",
                        "jumlah_kg": 2550.0,
                        "harga_per_kg": 7500,
                        "total_rupiah": 19125000,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0044",
                        "tanggal": "2026-04-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "SOSO",
                        "jumlah_kg": 15677.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0045",
                        "tanggal": "2026-04-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "BARAAN",
                        "jumlah_kg": 8373.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0046",
                        "tanggal": "2026-04-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "POJEJER",
                        "jumlah_kg": 1753.0,
                        "harga_per_kg": 8000,
                        "total_rupiah": 14024000,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0047",
                        "tanggal": "2026-04-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "PASINAN",
                        "jumlah_kg": 3856.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0048",
                        "tanggal": "2026-04-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "TANEN",
                        "jumlah_kg": 560.0,
                        "harga_per_kg": 8000,
                        "total_rupiah": 4480000,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0049",
                        "tanggal": "2026-04-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "PACET / WARU GUNUNG",
                        "jumlah_kg": 16499.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0050",
                        "tanggal": "2026-04-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "KEMIRI / TRECEH",
                        "jumlah_kg": 2487.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0051",
                        "tanggal": "2026-05-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "CEMBOR",
                        "jumlah_kg": 13515.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0052",
                        "tanggal": "2026-05-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "MOJOSARI",
                        "jumlah_kg": 1663.0,
                        "harga_per_kg": 7400,
                        "total_rupiah": 12306200,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0053",
                        "tanggal": "2026-05-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "CLAKET",
                        "jumlah_kg": 18936.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0054",
                        "tanggal": "2026-05-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "PRAMBON",
                        "jumlah_kg": 2150.0,
                        "harga_per_kg": 7400,
                        "total_rupiah": 15910000,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0055",
                        "tanggal": "2026-05-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "MLIGI",
                        "jumlah_kg": 2064.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0056",
                        "tanggal": "2026-05-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "KAMBENGAN",
                        "jumlah_kg": 3875.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0057",
                        "tanggal": "2026-05-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "KRIAN",
                        "jumlah_kg": 2590.0,
                        "harga_per_kg": 7500,
                        "total_rupiah": 19425000,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0058",
                        "tanggal": "2026-05-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "SOSO",
                        "jumlah_kg": 17543.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0059",
                        "tanggal": "2026-05-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "BARAAN",
                        "jumlah_kg": 9045.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0060",
                        "tanggal": "2026-05-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "POJEJER",
                        "jumlah_kg": 7779.0,
                        "harga_per_kg": 8000,
                        "total_rupiah": 62232000,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0061",
                        "tanggal": "2026-05-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "PASINAN",
                        "jumlah_kg": 3423.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0062",
                        "tanggal": "2026-05-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "TANEN",
                        "jumlah_kg": 1040.0,
                        "harga_per_kg": 8000,
                        "total_rupiah": 8320000,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0063",
                        "tanggal": "2026-05-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "PACET / WARU GUNUNG",
                        "jumlah_kg": 18986.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0064",
                        "tanggal": "2026-05-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "KEMIRI / TRECEH",
                        "jumlah_kg": 2311.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0065",
                        "tanggal": "2026-06-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "CEMBOR",
                        "jumlah_kg": 12464.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0066",
                        "tanggal": "2026-06-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "MOJOSARI",
                        "jumlah_kg": 1511.0,
                        "harga_per_kg": 7400,
                        "total_rupiah": 11181400,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0067",
                        "tanggal": "2026-06-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "CLAKET",
                        "jumlah_kg": 17410.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0068",
                        "tanggal": "2026-06-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "PRAMBON",
                        "jumlah_kg": 1830.0,
                        "harga_per_kg": 7400,
                        "total_rupiah": 13542000,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0069",
                        "tanggal": "2026-06-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "MLIGI",
                        "jumlah_kg": 1372.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0070",
                        "tanggal": "2026-06-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "KAMBENGAN",
                        "jumlah_kg": 3710.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0071",
                        "tanggal": "2026-06-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "KRIAN",
                        "jumlah_kg": 2190.0,
                        "harga_per_kg": 7500,
                        "total_rupiah": 16425000,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0072",
                        "tanggal": "2026-06-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "SOSO",
                        "jumlah_kg": 18266.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0073",
                        "tanggal": "2026-06-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "BARAAN",
                        "jumlah_kg": 9188.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0074",
                        "tanggal": "2026-06-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "POJEJER",
                        "jumlah_kg": 8606.0,
                        "harga_per_kg": 8000,
                        "total_rupiah": 68848000,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0075",
                        "tanggal": "2026-06-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "PASINAN",
                        "jumlah_kg": 3201.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0076",
                        "tanggal": "2026-06-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "TANEN",
                        "jumlah_kg": 1480.0,
                        "harga_per_kg": 8000,
                        "total_rupiah": 11840000,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0077",
                        "tanggal": "2026-06-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "PACET / WARU GUNUNG",
                        "jumlah_kg": 19364.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0078",
                        "tanggal": "2026-06-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "KEMIRI / TRECEH",
                        "jumlah_kg": 2901.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0079",
                        "tanggal": "2026-07-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "CEMBOR",
                        "jumlah_kg": 13700.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0080",
                        "tanggal": "2026-07-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "MOJOSARI",
                        "jumlah_kg": 1752.0,
                        "harga_per_kg": 7400,
                        "total_rupiah": 12964800,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0081",
                        "tanggal": "2026-07-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "CLAKET",
                        "jumlah_kg": 18131.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0082",
                        "tanggal": "2026-07-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "PRAMBON",
                        "jumlah_kg": 1785.0,
                        "harga_per_kg": 7400,
                        "total_rupiah": 13209000,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0083",
                        "tanggal": "2026-07-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "MLIGI",
                        "jumlah_kg": 1386.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0084",
                        "tanggal": "2026-07-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "KAMBENGAN",
                        "jumlah_kg": 3824.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0085",
                        "tanggal": "2026-07-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "KRIAN",
                        "jumlah_kg": 2390.0,
                        "harga_per_kg": 7500,
                        "total_rupiah": 17925000,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0086",
                        "tanggal": "2026-07-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "SOSO",
                        "jumlah_kg": 20693.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0087",
                        "tanggal": "2026-07-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "BARAAN",
                        "jumlah_kg": 9680.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0088",
                        "tanggal": "2026-07-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "POJEJER",
                        "jumlah_kg": 8155.0,
                        "harga_per_kg": 8000,
                        "total_rupiah": 65240000,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0089",
                        "tanggal": "2026-07-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "PASINAN",
                        "jumlah_kg": 3778.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0090",
                        "tanggal": "2026-07-15",
                        "kategori_sumber": "NON_ANGGOTA",
                        "nama_sumber": "TANEN",
                        "jumlah_kg": 2800.0,
                        "harga_per_kg": 8000,
                        "total_rupiah": 22400000,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0091",
                        "tanggal": "2026-07-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "PACET / WARU GUNUNG",
                        "jumlah_kg": 21210.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-REC-0092",
                        "tanggal": "2026-07-15",
                        "kategori_sumber": "ANGGOTA",
                        "nama_sumber": "KEMIRI / TRECEH",
                        "jumlah_kg": 3880.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 0,
                        "created_by": "USR-KOP01"
                }
        ],
        "KOPERASI_PENGELUARAN": [
                {
                        "transaction_id": "TRX-KOP-OUT-0001",
                        "tanggal": "2026-01-15",
                        "kategori_tujuan": "PENJUALAN",
                        "nama_tujuan": "NESTLE",
                        "jumlah_kg": 53340.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 386362127,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-OUT-0002",
                        "tanggal": "2026-04-15",
                        "kategori_tujuan": "PENJUALAN",
                        "nama_tujuan": "NESTLE",
                        "jumlah_kg": 48800.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 379319013,
                        "created_by": "USR-KOP01"
                },
                {
                        "transaction_id": "TRX-KOP-OUT-0003",
                        "tanggal": "2026-07-15",
                        "kategori_tujuan": "PENJUALAN",
                        "nama_tujuan": "NESTLE",
                        "jumlah_kg": 66140.0,
                        "harga_per_kg": 0,
                        "total_rupiah": 549287783,
                        "created_by": "USR-KOP01"
                }
        ],
        "DEPOT_PEMBELIAN": [
                {
                                "transaction_id": "TRX-DEP-PUR-2026-04",
                                "tanggal": "2026-04-30",
                                "harga_per_kg": 9000,
                                "jumlah_kg": 35180,
                                "faktor_densitas": 1.025,
                                "jumlah_liter": 34322,
                                "total_rupiah": 316620000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-PUR-2026-05",
                                "tanggal": "2026-05-31",
                                "harga_per_kg": 9000,
                                "jumlah_kg": 41052,
                                "faktor_densitas": 1.025,
                                "jumlah_liter": 40051,
                                "total_rupiah": 369468000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-PUR-2026-06",
                                "tanggal": "2026-06-30",
                                "harga_per_kg": 9000,
                                "jumlah_kg": 39675,
                                "faktor_densitas": 1.025,
                                "jumlah_liter": 38708,
                                "total_rupiah": 357075000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-PUR-2026-07",
                                "tanggal": "2026-07-31",
                                "harga_per_kg": 9000,
                                "jumlah_kg": 38030,
                                "faktor_densitas": 1.025,
                                "jumlah_liter": 37103,
                                "total_rupiah": 342270000,
                                "created_by": "USR-DEP01"
                }
],
        "DEPOT_PENJUALAN": [
                {
                                "transaction_id": "TRX-DEP-SAL-04-01",
                                "tanggal": "2026-04-30",
                                "nama_agen": "HERU",
                                "harga_per_liter": 11000,
                                "jumlah_liter": 9010,
                                "total_rupiah": 99110000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-04-02",
                                "tanggal": "2026-04-30",
                                "nama_agen": "JAINAL",
                                "harga_per_liter": 11000,
                                "jumlah_liter": 3590,
                                "total_rupiah": 39490000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-04-03",
                                "tanggal": "2026-04-30",
                                "nama_agen": "YULI",
                                "harga_per_liter": 11000,
                                "jumlah_liter": 934,
                                "total_rupiah": 10274000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-04-04",
                                "tanggal": "2026-04-30",
                                "nama_agen": "NINDRI",
                                "harga_per_liter": 10000,
                                "jumlah_liter": 1513,
                                "total_rupiah": 15130000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-04-05",
                                "tanggal": "2026-04-30",
                                "nama_agen": "ISA",
                                "harga_per_liter": 10000,
                                "jumlah_liter": 550,
                                "total_rupiah": 5500000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-04-06",
                                "tanggal": "2026-04-30",
                                "nama_agen": "USMAN",
                                "harga_per_liter": 10000,
                                "jumlah_liter": 3325,
                                "total_rupiah": 33250000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-04-07",
                                "tanggal": "2026-04-30",
                                "nama_agen": "GRESIK",
                                "harga_per_liter": 10000,
                                "jumlah_liter": 1140,
                                "total_rupiah": 11400000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-04-08",
                                "tanggal": "2026-04-30",
                                "nama_agen": "PURI",
                                "harga_per_liter": 10000,
                                "jumlah_liter": 2580,
                                "total_rupiah": 25800000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-04-09",
                                "tanggal": "2026-04-30",
                                "nama_agen": "SUDAR",
                                "harga_per_liter": 11000,
                                "jumlah_liter": 158,
                                "total_rupiah": 1738000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-04-10",
                                "tanggal": "2026-04-30",
                                "nama_agen": "UMUM",
                                "harga_per_liter": 12000,
                                "jumlah_liter": 8841,
                                "total_rupiah": 83991000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-05-01",
                                "tanggal": "2026-05-31",
                                "nama_agen": "HERU",
                                "harga_per_liter": 11000,
                                "jumlah_liter": 10740,
                                "total_rupiah": 118140000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-05-02",
                                "tanggal": "2026-05-31",
                                "nama_agen": "JAINAL",
                                "harga_per_liter": 11000,
                                "jumlah_liter": 4560,
                                "total_rupiah": 50160000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-05-03",
                                "tanggal": "2026-05-31",
                                "nama_agen": "YULI",
                                "harga_per_liter": 11000,
                                "jumlah_liter": 1000,
                                "total_rupiah": 11000000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-05-04",
                                "tanggal": "2026-05-31",
                                "nama_agen": "NINDRI",
                                "harga_per_liter": 10000,
                                "jumlah_liter": 2042,
                                "total_rupiah": 20420000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-05-05",
                                "tanggal": "2026-05-31",
                                "nama_agen": "ISA",
                                "harga_per_liter": 10000,
                                "jumlah_liter": 650,
                                "total_rupiah": 6500000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-05-06",
                                "tanggal": "2026-05-31",
                                "nama_agen": "USMAN",
                                "harga_per_liter": 10000,
                                "jumlah_liter": 3640,
                                "total_rupiah": 36400000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-05-07",
                                "tanggal": "2026-05-31",
                                "nama_agen": "GRESIK",
                                "harga_per_liter": 10000,
                                "jumlah_liter": 960,
                                "total_rupiah": 9600000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-05-08",
                                "tanggal": "2026-05-31",
                                "nama_agen": "PURI",
                                "harga_per_liter": 10000,
                                "jumlah_liter": 2545,
                                "total_rupiah": 25450000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-05-09",
                                "tanggal": "2026-05-31",
                                "nama_agen": "SUDAR",
                                "harga_per_liter": 11000,
                                "jumlah_liter": 142,
                                "total_rupiah": 1562000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-06-01",
                                "tanggal": "2026-06-30",
                                "nama_agen": "HERU",
                                "harga_per_liter": 11000,
                                "jumlah_liter": 9245,
                                "total_rupiah": 101695000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-06-02",
                                "tanggal": "2026-06-30",
                                "nama_agen": "JAINAL",
                                "harga_per_liter": 11000,
                                "jumlah_liter": 4290,
                                "total_rupiah": 47190000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-06-03",
                                "tanggal": "2026-06-30",
                                "nama_agen": "USMAN",
                                "harga_per_liter": 10000,
                                "jumlah_liter": 4455,
                                "total_rupiah": 44550000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-06-04",
                                "tanggal": "2026-06-30",
                                "nama_agen": "NINDRI",
                                "harga_per_liter": 10000,
                                "jumlah_liter": 2232,
                                "total_rupiah": 22320000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-06-05",
                                "tanggal": "2026-06-30",
                                "nama_agen": "ISA",
                                "harga_per_liter": 10000,
                                "jumlah_liter": 720,
                                "total_rupiah": 7200000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-06-06",
                                "tanggal": "2026-06-30",
                                "nama_agen": "YULI",
                                "harga_per_liter": 11000,
                                "jumlah_liter": 790,
                                "total_rupiah": 8690000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-06-07",
                                "tanggal": "2026-06-30",
                                "nama_agen": "PURI",
                                "harga_per_liter": 10000,
                                "jumlah_liter": 2256,
                                "total_rupiah": 22560000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-06-08",
                                "tanggal": "2026-06-30",
                                "nama_agen": "GRESIK",
                                "harga_per_liter": 10000,
                                "jumlah_liter": 1650,
                                "total_rupiah": 16500000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-06-09",
                                "tanggal": "2026-06-30",
                                "nama_agen": "SUDAR",
                                "harga_per_liter": 11000,
                                "jumlah_liter": 174,
                                "total_rupiah": 1914000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-06-10",
                                "tanggal": "2026-06-30",
                                "nama_agen": "UMUM",
                                "harga_per_liter": 12000,
                                "jumlah_liter": 7511,
                                "total_rupiah": 90126000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-07-01",
                                "tanggal": "2026-07-31",
                                "nama_agen": "HERU",
                                "harga_per_liter": 11000,
                                "jumlah_liter": 9080,
                                "total_rupiah": 99880000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-07-02",
                                "tanggal": "2026-07-31",
                                "nama_agen": "JAINAL",
                                "harga_per_liter": 11000,
                                "jumlah_liter": 3690,
                                "total_rupiah": 40590000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-07-03",
                                "tanggal": "2026-07-31",
                                "nama_agen": "USMAN",
                                "harga_per_liter": 10000,
                                "jumlah_liter": 4414,
                                "total_rupiah": 44140000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-07-04",
                                "tanggal": "2026-07-31",
                                "nama_agen": "NINDRI",
                                "harga_per_liter": 10000,
                                "jumlah_liter": 2790,
                                "total_rupiah": 27900000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-07-05",
                                "tanggal": "2026-07-31",
                                "nama_agen": "ISA",
                                "harga_per_liter": 10000,
                                "jumlah_liter": 575,
                                "total_rupiah": 5750000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-07-06",
                                "tanggal": "2026-07-31",
                                "nama_agen": "YULI",
                                "harga_per_liter": 11000,
                                "jumlah_liter": 700,
                                "total_rupiah": 7700000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-07-07",
                                "tanggal": "2026-07-31",
                                "nama_agen": "PURI",
                                "harga_per_liter": 10000,
                                "jumlah_liter": 1320,
                                "total_rupiah": 13200000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-07-08",
                                "tanggal": "2026-07-31",
                                "nama_agen": "GRESIK",
                                "harga_per_liter": 10000,
                                "jumlah_liter": 300,
                                "total_rupiah": 3000000,
                                "created_by": "USR-DEP01"
                },
                {
                                "transaction_id": "TRX-DEP-SAL-07-09",
                                "tanggal": "2026-07-31",
                                "nama_agen": "SUDAR",
                                "harga_per_liter": 11000,
                                "jumlah_liter": 181,
                                "total_rupiah": 1991000,
                                "created_by": "USR-DEP01"
                }
],
        "DEPOT_OPERASIONAL": [
                {
                        "transaction_id": "TRX-DEP-OPS-0001",
                        "tanggal": "2026-01-15",
                        "nama_barang_jenis": "lemburan nataru",
                        "nominal_biaya": 750000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0002",
                        "tanggal": "2026-01-15",
                        "nama_barang_jenis": "stiker",
                        "nominal_biaya": 1560000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0003",
                        "tanggal": "2026-01-15",
                        "nama_barang_jenis": "kresek,esense",
                        "nominal_biaya": 575000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0004",
                        "tanggal": "2026-01-15",
                        "nama_barang_jenis": "galon",
                        "nominal_biaya": 60000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0005",
                        "tanggal": "2026-01-15",
                        "nama_barang_jenis": "sepatu isa yoga",
                        "nominal_biaya": 200000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0006",
                        "tanggal": "2026-01-15",
                        "nama_barang_jenis": "gula",
                        "nominal_biaya": 2114000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0007",
                        "tanggal": "2026-01-15",
                        "nama_barang_jenis": "sampah",
                        "nominal_biaya": 50000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0008",
                        "tanggal": "2026-01-15",
                        "nama_barang_jenis": "plastik",
                        "nominal_biaya": 450000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0009",
                        "tanggal": "2026-01-15",
                        "nama_barang_jenis": "belanja",
                        "nominal_biaya": 530000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0010",
                        "tanggal": "2026-01-15",
                        "nama_barang_jenis": "belanja kresek",
                        "nominal_biaya": 1567000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0011",
                        "tanggal": "2026-01-15",
                        "nama_barang_jenis": "botol",
                        "nominal_biaya": 8900000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0012",
                        "tanggal": "2026-01-15",
                        "nama_barang_jenis": "lpg",
                        "nominal_biaya": 126000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0013",
                        "tanggal": "2026-01-15",
                        "nama_barang_jenis": "wifi",
                        "nominal_biaya": 150000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0014",
                        "tanggal": "2026-01-15",
                        "nama_barang_jenis": "tatakan kompor",
                        "nominal_biaya": 63000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0015",
                        "tanggal": "2026-01-15",
                        "nama_barang_jenis": "service frezer",
                        "nominal_biaya": 250000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0016",
                        "tanggal": "2026-02-15",
                        "nama_barang_jenis": "plastik",
                        "nominal_biaya": 1300000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0017",
                        "tanggal": "2026-02-15",
                        "nama_barang_jenis": "sampah",
                        "nominal_biaya": 50000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0018",
                        "tanggal": "2026-02-15",
                        "nama_barang_jenis": "lpg",
                        "nominal_biaya": 205000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0019",
                        "tanggal": "2026-02-15",
                        "nama_barang_jenis": "gula",
                        "nominal_biaya": 975000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0020",
                        "tanggal": "2026-02-15",
                        "nama_barang_jenis": "stiker",
                        "nominal_biaya": 520000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0021",
                        "tanggal": "2026-02-15",
                        "nama_barang_jenis": "thermal",
                        "nominal_biaya": 525000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0022",
                        "tanggal": "2026-02-15",
                        "nama_barang_jenis": "print",
                        "nominal_biaya": 12000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0023",
                        "tanggal": "2026-02-15",
                        "nama_barang_jenis": "lemburan",
                        "nominal_biaya": 500000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0024",
                        "tanggal": "2026-02-15",
                        "nama_barang_jenis": "wifi",
                        "nominal_biaya": 150000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0025",
                        "tanggal": "2026-02-15",
                        "nama_barang_jenis": "kresek",
                        "nominal_biaya": 465000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0026",
                        "tanggal": "2026-03-15",
                        "nama_barang_jenis": "sampah",
                        "nominal_biaya": 50000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0027",
                        "tanggal": "2026-03-15",
                        "nama_barang_jenis": "stiker",
                        "nominal_biaya": 1300000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0028",
                        "tanggal": "2026-03-15",
                        "nama_barang_jenis": "lpg",
                        "nominal_biaya": 189000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0029",
                        "tanggal": "2026-03-15",
                        "nama_barang_jenis": "plastik susu",
                        "nominal_biaya": 1720000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0030",
                        "tanggal": "2026-03-15",
                        "nama_barang_jenis": "gula",
                        "nominal_biaya": 1125000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0031",
                        "tanggal": "2026-03-15",
                        "nama_barang_jenis": "kresek",
                        "nominal_biaya": 1280000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0032",
                        "tanggal": "2026-03-15",
                        "nama_barang_jenis": "wifi",
                        "nominal_biaya": 150000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0033",
                        "tanggal": "2026-03-15",
                        "nama_barang_jenis": "galon",
                        "nominal_biaya": 20000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0034",
                        "tanggal": "2026-03-15",
                        "nama_barang_jenis": "esense",
                        "nominal_biaya": 480000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0035",
                        "tanggal": "2026-03-15",
                        "nama_barang_jenis": "sabun",
                        "nominal_biaya": 164000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0036",
                        "tanggal": "2026-03-15",
                        "nama_barang_jenis": "lemburan hari raya 5orang",
                        "nominal_biaya": 2500000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0037",
                        "tanggal": "2026-04-15",
                        "nama_barang_jenis": "stiker",
                        "nominal_biaya": 1300000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0038",
                        "tanggal": "2026-04-15",
                        "nama_barang_jenis": "sampah",
                        "nominal_biaya": 50000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0039",
                        "tanggal": "2026-04-15",
                        "nama_barang_jenis": "lpg",
                        "nominal_biaya": 324000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0040",
                        "tanggal": "2026-04-15",
                        "nama_barang_jenis": "gula",
                        "nominal_biaya": 1950000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0041",
                        "tanggal": "2026-04-15",
                        "nama_barang_jenis": "plastik,kasak,sedotan",
                        "nominal_biaya": 1701000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0042",
                        "tanggal": "2026-04-15",
                        "nama_barang_jenis": "kresek",
                        "nominal_biaya": 270000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0043",
                        "tanggal": "2026-04-15",
                        "nama_barang_jenis": "wifi",
                        "nominal_biaya": 150000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0044",
                        "tanggal": "2026-04-15",
                        "nama_barang_jenis": "galon",
                        "nominal_biaya": 21000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0045",
                        "tanggal": "2026-04-15",
                        "nama_barang_jenis": "lemburan",
                        "nominal_biaya": 250000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0046",
                        "tanggal": "2026-05-15",
                        "nama_barang_jenis": "sampah",
                        "nominal_biaya": 50000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0047",
                        "tanggal": "2026-05-15",
                        "nama_barang_jenis": "wifi",
                        "nominal_biaya": 150000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0048",
                        "tanggal": "2026-05-15",
                        "nama_barang_jenis": "lpg",
                        "nominal_biaya": 360000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0049",
                        "tanggal": "2026-05-15",
                        "nama_barang_jenis": "gula",
                        "nominal_biaya": 1650000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0050",
                        "tanggal": "2026-05-15",
                        "nama_barang_jenis": "kresek",
                        "nominal_biaya": 2320000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0051",
                        "tanggal": "2026-05-15",
                        "nama_barang_jenis": "plastik",
                        "nominal_biaya": 2265000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0052",
                        "tanggal": "2026-05-15",
                        "nama_barang_jenis": "lemburan",
                        "nominal_biaya": 1050000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0053",
                        "tanggal": "2026-05-15",
                        "nama_barang_jenis": "galon",
                        "nominal_biaya": 66000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0054",
                        "tanggal": "2026-05-15",
                        "nama_barang_jenis": "stiker",
                        "nominal_biaya": 1040000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0055",
                        "tanggal": "2026-05-15",
                        "nama_barang_jenis": "esense",
                        "nominal_biaya": 843000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0056",
                        "tanggal": "2026-05-15",
                        "nama_barang_jenis": "slang regulator",
                        "nominal_biaya": 205000,
                        "created_by": "USR-DEP01"
                },
                {
                        "transaction_id": "TRX-DEP-OPS-0057",
                        "tanggal": "2026-05-15",
                        "nama_barang_jenis": "gelas",
                        "nominal_biaya": 180000,
                        "created_by": "USR-DEP01"
                }
        ],
        "DEPOT_STOK_OPNAME": [],
        "LOGISTIK_PAKAN_PENJUALAN": [],
        "LOGISTIK_PAKAN_PEMBELIAN": [],
        "AUDIT_LOG": []
};
      localStorage.setItem("DANAMULYA_DB", JSON.stringify(db));
      localStorage.setItem("DANAMULYA_DB_VERSION", LOCAL_BRIDGE_DB_VERSION);
    }
  },
  getDB: function() {
    this.initStorage();
    const db = JSON.parse(localStorage.getItem("DANAMULYA_DB"));
    if (db) {
      if (!db.LOGISTIK_PAKAN_PENJUALAN) db.LOGISTIK_PAKAN_PENJUALAN = [];
      if (!db.LOGISTIK_PAKAN_PEMBELIAN) db.LOGISTIK_PAKAN_PEMBELIAN = [];
    }
    return db;
  },

  saveDB: function(db) {
    localStorage.setItem("DANAMULYA_DB", JSON.stringify(db));
  },

  dispatch: function(action, sessionId, payload) {
    const db = this.getDB();
    
    // Login
    if (action === "login") {
      const user = db.USERS.find(u => u.username.toLowerCase() === (payload.username || "").toLowerCase());
      if (!user || user.password_hash !== payload.password) {
        return { success: false, code: "INVALID_CREDENTIALS", message: "Username atau password salah." };
      }
      const sess = {
        sessionId: "SESS-" + Date.now(),
        userId: user.user_id,
        username: user.username,
        namaLengkap: user.nama_lengkap,
        role: user.role,
        divisi: user.divisi,
        expiresAt: Date.now() + (8 * 3600 * 1000)
      };
      sessionStorage.setItem("CURRENT_SESSION", JSON.stringify(sess));
      return { success: true, code: "LOGIN_SUCCESS", message: "Login berhasil", data: sess };
    }

    // Auth Check
    const sess = JSON.parse(sessionStorage.getItem("CURRENT_SESSION") || "null");
    if (!sess) return { success: false, code: "UNAUTHENTICATED", message: "Sesi telah berakhir. Silakan login." };

    // Action Routing
    switch (action) {
      case "createKoperasiPenerimaan":
        if (sess.role !== "koperasi" && sess.role !== "admin") return { success: false, code: "FORBIDDEN_DIVISION", message: "Akses ditolak." };
        const trx1 = "TRX-KOP-REC-" + Date.now();
        const rec1 = {
          transaction_id: trx1,
          tanggal: payload.tanggal,
          kategori_sumber: payload.kategori_sumber,
          nama_sumber: payload.nama_sumber,
          jumlah_kg: Number(payload.jumlah_kg),
          harga_per_kg: Number(payload.harga_per_kg || 0),
          total_rupiah: payload.kategori_sumber === "NON_ANGGOTA" ? (Number(payload.jumlah_kg) * Number(payload.harga_per_kg)) : 0,
          keterangan: payload.keterangan || "",
          created_by: sess.userId,
          created_at: new Date().toISOString()
        };
        db.KOPERASI_PENERIMAAN.push(rec1);
        this.saveDB(db);
        return { success: true, code: "CREATED", message: "Penerimaan Koperasi disimpan.", data: rec1 };

      case "getKoperasiPenerimaan":
        if (sess.divisi !== "KOPERASI" && sess.role !== "admin") return { success: false, code: "FORBIDDEN_DIVISION", message: "Anda tidak berhak mengakses data Divisi KOPERASI." };
        return { success: true, code: "OK", data: db.KOPERASI_PENERIMAAN };

      case "createKoperasiPengeluaran":
        if (sess.role !== "koperasi" && sess.role !== "admin") return { success: false, code: "FORBIDDEN_DIVISION", message: "Akses ditolak." };
        const trx2 = "TRX-KOP-OUT-" + Date.now();
        const rec2 = {
          transaction_id: trx2,
          tanggal: payload.tanggal,
          kategori_tujuan: payload.kategori_tujuan,
          nama_tujuan: payload.nama_tujuan,
          jumlah_kg: Number(payload.jumlah_kg),
          harga_per_kg: Number(payload.harga_per_kg || 0),
          total_rupiah: payload.kategori_tujuan === "PENJUALAN" ? (Number(payload.jumlah_kg) * Number(payload.harga_per_kg)) : 0,
          keterangan: payload.keterangan || "",
          created_by: sess.userId,
          created_at: new Date().toISOString()
        };
        db.KOPERASI_PENGELUARAN.push(rec2);
        this.saveDB(db);
        return { success: true, code: "CREATED", message: "Pengeluaran Koperasi disimpan.", data: rec2 };

      case "getKoperasiPengeluaran":
        if (sess.divisi !== "KOPERASI" && sess.role !== "admin") return { success: false, code: "FORBIDDEN_DIVISION", message: "Anda tidak berhak mengakses data Divisi KOPERASI." };
        return { success: true, code: "OK", data: db.KOPERASI_PENGELUARAN };

      case "createDepotPembelian":
        if (sess.role !== "depot" && sess.role !== "admin") return { success: false, code: "FORBIDDEN_DIVISION", message: "Akses ditolak." };
        const trx3 = "TRX-DEP-PUR-" + Date.now();
        const kg3 = Number(payload.jumlah_kg);
        const harga3 = Number(payload.harga_per_kg);
        const rec3 = {
          transaction_id: trx3,
          tanggal: payload.tanggal,
          harga_per_kg: harga3,
          jumlah_kg: kg3,
          faktor_densitas: 1.025,
          jumlah_liter: Math.round((kg3 / 1.025) * 10000) / 10000,
          total_rupiah: Math.round(kg3 * harga3),
          keterangan: payload.keterangan || "",
          created_by: sess.userId,
          created_at: new Date().toISOString()
        };
        db.DEPOT_PEMBELIAN.push(rec3);
        this.saveDB(db);
        return { success: true, code: "CREATED", message: "Pembelian Depot disimpan.", data: rec3 };

      case "getDepotPembelian":
        if (sess.divisi !== "DEPOT" && sess.role !== "admin") return { success: false, code: "FORBIDDEN_DIVISION", message: "Anda tidak berhak mengakses data Divisi DEPOT." };
        return { success: true, code: "OK", data: db.DEPOT_PEMBELIAN };

      case "createDepotPenjualan":
        if (sess.role !== "depot" && sess.role !== "admin") return { success: false, code: "FORBIDDEN_DIVISION", message: "Akses ditolak." };
        const trx4 = "TRX-DEP-SAL-" + Date.now();
        const ltr4 = Number(payload.jumlah_liter);
        const hrg4 = Number(payload.harga_per_liter);
        const rec4 = {
          transaction_id: trx4,
          tanggal: payload.tanggal,
          nama_agen: payload.nama_agen,
          harga_per_liter: hrg4,
          jumlah_liter: ltr4,
          total_rupiah: Math.round(ltr4 * hrg4),
          keterangan: payload.keterangan || "",
          created_by: sess.userId,
          created_at: new Date().toISOString()
        };
        db.DEPOT_PENJUALAN.push(rec4);
        this.saveDB(db);
        return { success: true, code: "CREATED", message: "Penjualan Depot disimpan.", data: rec4 };

      case "getDepotPenjualan":
        if (sess.divisi !== "DEPOT" && sess.role !== "admin") return { success: false, code: "FORBIDDEN_DIVISION", message: "Anda tidak berhak mengakses data Divisi DEPOT." };
        return { success: true, code: "OK", data: db.DEPOT_PENJUALAN };

      case "createDepotOperasional":
        if (sess.role !== "depot" && sess.role !== "admin") return { success: false, code: "FORBIDDEN_DIVISION", message: "Akses ditolak." };
        const trx5 = "TRX-DEP-OPS-" + Date.now();
        const rec5 = {
          transaction_id: trx5,
          tanggal: payload.tanggal,
          nama_barang_jenis: payload.nama_barang_jenis,
          nominal_biaya: Number(payload.nominal_biaya),
          keterangan: payload.keterangan || "",
          created_by: sess.userId,
          created_at: new Date().toISOString()
        };
        db.DEPOT_OPERASIONAL.push(rec5);
        this.saveDB(db);
        return { success: true, code: "CREATED", message: "Biaya Operasional Depot disimpan.", data: rec5 };

      case "getDepotOperasional":
        if (sess.divisi !== "DEPOT" && sess.role !== "admin") return { success: false, code: "FORBIDDEN_DIVISION", message: "Anda tidak berhak mengakses data Divisi DEPOT." };
        return { success: true, code: "OK", data: db.DEPOT_OPERASIONAL };

      case "getLogistikData":
        if (sess.divisi !== "LOGISTIK" && sess.role !== "admin") return { success: false, code: "FORBIDDEN_DIVISION", message: "Anda tidak berhak mengakses data Divisi LOGISTIK." };
        let fullLogData = null;
        try {
          const rawFull = localStorage.getItem("DANAMULYA_LOGISTIK_FULL_V12");
          if (rawFull) fullLogData = JSON.parse(rawFull);
        } catch (eFull) {}
        return {
          success: true,
          code: "OK",
          data: {
            status: "ACTIVE",
            fullDataAvailable: !!fullLogData,
            totalPenjualanRecords: (db.LOGISTIK_PAKAN_PENJUALAN || []).length,
            totalPembelianRecords: (db.LOGISTIK_PAKAN_PEMBELIAN || []).length
          }
        };

      case "getLogistikPenjualan":
        if (sess.divisi !== "LOGISTIK" && sess.role !== "admin") return { success: false, code: "FORBIDDEN_DIVISION", message: "Anda tidak berhak mengakses data Divisi LOGISTIK." };
        // Gabungkan transaksi dari database lokal dan modul UI
        const bridgePenjualan = db.LOGISTIK_PAKAN_PENJUALAN || [];
        const mergedPenjualan = [...bridgePenjualan];
        try {
          const rawTxs = localStorage.getItem("DANAMULYA_LOGISTIK_TX_V1");
          if (rawTxs) {
            const txs = JSON.parse(rawTxs);
            txs.forEach(t => {
              if (!mergedPenjualan.some(m => m.transaction_id === t.id)) {
                mergedPenjualan.push({
                  transaction_id: t.id,
                  tanggal: (t.timestamp || "").split("T")[0] || "",
                  nama_pakan: t.jenis_pakan || "",
                  nama_peternak: t.nama_peternak || "",
                  jenis_pembayaran: t.metode_pembayaran || "TUNAI",
                  jumlah_kg: Number(t.jumlah_sak_kg || 0),
                  harga_per_kg: Number(t.harga_satuan || 0),
                  total_rupiah: Number(t.total_rp || 0),
                  keterangan: t.keterangan || "",
                  created_by: "LOGISTIK_MODULE",
                  created_at: t.timestamp || new Date().toISOString()
                });
              }
            });
          }
        } catch (eMerge) {
          console.warn("Gagal menggabungkan transaksi DANAMULYA_LOGISTIK_TX_V1:", eMerge);
        }
        return { success: true, code: "OK", data: mergedPenjualan };

      // FIX LOG-B22: Dukung aksi resmi createLogistikTransaction agar selaras dengan Code.gs
      case "createLogistikTransaction":
      case "createLogistikPenjualan":
        if (sess.role !== "logistik" && sess.role !== "admin") return { success: false, code: "FORBIDDEN_DIVISION", message: "Akses ditolak." };
        // FIX API-B4: Validasi data ketat agar nilai NaN/rusak tidak masuk ke DB
        if (!payload.tanggal) return { success: false, code: "VALIDATION_ERROR", message: "Tanggal transaksi wajib diisi." };
        if (!payload.nama_pakan || !payload.nama_pakan.trim()) return { success: false, code: "VALIDATION_ERROR", message: "Nama pakan wajib diisi." };
        const qtyPenj = Number(payload.jumlah_kg);
        const hargaPenj = Number(payload.harga_per_kg || 0);
        if (isNaN(qtyPenj) || qtyPenj <= 0) return { success: false, code: "VALIDATION_ERROR", message: "Jumlah pakan (KG) harus berupa angka positif." };
        if (isNaN(hargaPenj) || hargaPenj < 0) return { success: false, code: "VALIDATION_ERROR", message: "Harga per KG harus berupa angka non-negatif." };

        const trxLogP1 = "TRX-LOG-PAK-" + Date.now();
        const recLogP1 = {
          transaction_id: trxLogP1,
          tanggal: payload.tanggal,
          nama_pakan: payload.nama_pakan.trim(),
          nama_peternak: (payload.nama_peternak || "").trim(),
          jenis_pembayaran: payload.jenis_pembayaran || "TUNAI",
          jumlah_kg: qtyPenj,
          harga_per_kg: hargaPenj,
          total_rupiah: qtyPenj * hargaPenj,
          keterangan: payload.keterangan || "",
          created_by: sess.userId,
          created_at: new Date().toISOString()
        };
        if (!db.LOGISTIK_PAKAN_PENJUALAN) db.LOGISTIK_PAKAN_PENJUALAN = [];
        db.LOGISTIK_PAKAN_PENJUALAN.push(recLogP1);
        this.saveDB(db);

        // FIX API-B2: Sinkronisasi dua arah ke DANAMULYA_LOGISTIK_TX_V1 agar modul UI Logistik otomatis terisi
        try {
          const rawTxs = localStorage.getItem("DANAMULYA_LOGISTIK_TX_V1");
          const txs = rawTxs ? JSON.parse(rawTxs) : [];
          txs.unshift({
            id: trxLogP1,
            timestamp: payload.tanggal + "T" + (payload.waktu || "12:00"),
            kategori_pembeli: payload.kategori || "RASIO",
            nomor_anggota: payload.nomor_anggota || "0",
            kode_r_nr: payload.kode_r_nr || "NR-0",
            nama_peternak: (payload.nama_peternak || "Umum").trim(),
            jenis_pakan: payload.nama_pakan.trim(),
            jumlah_sak_kg: qtyPenj,
            harga_satuan: hargaPenj,
            total_rp: qtyPenj * hargaPenj,
            metode_pembayaran: payload.jenis_pembayaran || "TUNAI",
            jadwal_penagihan: payload.jadwal_penagihan || "-",
            is_piutang: payload.jenis_pembayaran === "PIUTANG",
            is_program_bunting: payload.jenis_pembayaran === "PROGRAM_BUNTING",
            keterangan: payload.keterangan || ""
          });
          localStorage.setItem("DANAMULYA_LOGISTIK_TX_V1", JSON.stringify(txs));
        } catch (eSync) {
          console.warn("Sinkronisasi ke DANAMULYA_LOGISTIK_TX_V1 gagal:", eSync);
        }

        // FIX LOG-B34: Sinkronkan penjualan pakan ke DANAMULYA_LOGISTIK_FULL_V12 (Seksi II & Seksi IV UI)
        try {
          const rawFull = localStorage.getItem("DANAMULYA_LOGISTIK_FULL_V12");
          if (rawFull) {
            const allLog = JSON.parse(rawFull);
            const txMonthNum = parseInt(payload.tanggal.split("-")[1], 10);
            const monthsList = ["JAN","FEB","MAR","APRIL","MEI","JUNI","JULI","AGU","SEP","OKT","NOV","DES"];
            const mKey = monthsList[txMonthNum - 1] || "JAN";
            if (allLog[mKey]) {
              if (!allLog[mKey].sec2) allLog[mKey].sec2 = [];
              const cleanFeed = (s) => (s || '').toLowerCase().replace(/mf\./g, 'mix feed').replace(/\bmf\b/g, 'mix feed').replace(/[^a-z0-9]/g, '');
              const targetClean = cleanFeed(payload.nama_pakan);
              let s2Item = allLog[mKey].sec2.find(it => {
                const itClean = cleanFeed(it.nama);
                // FIX LOG-B57: Pencocokan kommutatif agar 'MIX FEED A20' cocok dengan 'MIX FEED A20 TUNAI'
                return itClean === targetClean ||
                  (targetClean.includes(itClean) && itClean.length >= 4) ||
                  (itClean.includes(targetClean) && targetClean.length >= 4);
              });
              if (!s2Item) {
                s2Item = {
                  no: allLog[mKey].sec2.length + 1,
                  nama: payload.nama_pakan.trim(),
                  tunai_kg: 0, tunai_harga: hargaPenj, tunai_rp: 0,
                  pot_kg: 0, pot_harga: hargaPenj, pot_rp: 0,
                  piu_kg: 0, piu_harga: hargaPenj, piu_rp: 0,
                  bunt_kg: 0, bunt_harga: hargaPenj, bunt_rp: 0,
                  total_kg: 0, total_rp: 0
                };
                allLog[mKey].sec2.push(s2Item);
              }
              const payMethod = payload.jenis_pembayaran || "TUNAI";
              if (payMethod === "TUNAI") {
                s2Item.tunai_kg = (s2Item.tunai_kg || 0) + qtyPenj;
                s2Item.tunai_harga = hargaPenj || s2Item.tunai_harga;
                s2Item.tunai_rp = (s2Item.tunai_rp || 0) + (qtyPenj * hargaPenj);
              } else if (payMethod === "PIUTANG") {
                s2Item.piu_kg = (s2Item.piu_kg || 0) + qtyPenj;
                s2Item.piu_harga = hargaPenj || s2Item.piu_harga;
                s2Item.piu_rp = (s2Item.piu_rp || 0) + (qtyPenj * hargaPenj);
              } else if (payMethod === "PROGRAM_BUNTING") {
                s2Item.bunt_kg = (s2Item.bunt_kg || 0) + qtyPenj;
                s2Item.bunt_harga = hargaPenj || s2Item.bunt_harga;
                s2Item.bunt_rp = (s2Item.bunt_rp || 0) + (qtyPenj * hargaPenj);
              } else {
                s2Item.pot_kg = (s2Item.pot_kg || 0) + qtyPenj;
                s2Item.pot_harga = hargaPenj || s2Item.pot_harga;
                s2Item.pot_rp = (s2Item.pot_rp || 0) + (qtyPenj * hargaPenj);
              }
              s2Item.total_kg = (s2Item.tunai_kg || 0) + (s2Item.pot_kg || 0) + (s2Item.piu_kg || 0) + (s2Item.bunt_kg || 0);
              s2Item.total_rp = (s2Item.tunai_rp || 0) + (s2Item.pot_rp || 0) + (s2Item.piu_rp || 0) + (s2Item.bunt_rp || 0);

              // Update Seksi IV
              if (allLog[mKey].sec4) {
                const s4Item = allLog[mKey].sec4.find(it => {
                  const itClean = cleanFeed(it.nama);
                  return itClean === targetClean || (itClean === 'mixfeeda18' && targetClean.includes('mixfeeda18')) || (itClean === 'mixfeeda20' && targetClean.includes('mixfeeda20'));
                });
                if (s4Item) {
                  s4Item.penjualan = (s4Item.penjualan || 0) + qtyPenj;
                  s4Item.stok_akhir = Math.max(0, (s4Item.siap_jual || 0) - s4Item.penjualan - (s4Item.susut || 0));
                  s4Item.jumlah_rp = s4Item.stok_akhir * (s4Item.harga || 0);
                }
              }
              localStorage.setItem("DANAMULYA_LOGISTIK_FULL_V12", JSON.stringify(allLog));
            }
          }
        } catch (eSyncFull) {
          console.warn("Gagal sinkronisasi penjualan ke DANAMULYA_LOGISTIK_FULL_V12:", eSyncFull);
        }

        return { success: true, code: "CREATED", message: "Transaksi Penjualan Pakan berhasil disimpan.", data: recLogP1 };

      case "getLogistikPembelian":
        if (sess.divisi !== "LOGISTIK" && sess.role !== "admin") return { success: false, code: "FORBIDDEN_DIVISION", message: "Anda tidak berhak mengakses data Divisi LOGISTIK." };
        return { success: true, code: "OK", data: db.LOGISTIK_PAKAN_PEMBELIAN || [] };

      case "createLogistikPembelian":
        if (sess.role !== "logistik" && sess.role !== "admin") return { success: false, code: "FORBIDDEN_DIVISION", message: "Akses ditolak." };
        // FIX API-B4: Validasi data ketat agar nilai NaN/rusak tidak masuk ke DB
        if (!payload.tanggal) return { success: false, code: "VALIDATION_ERROR", message: "Tanggal transaksi wajib diisi." };
        if (!payload.nama_pakan || !payload.nama_pakan.trim()) return { success: false, code: "VALIDATION_ERROR", message: "Nama pakan wajib diisi." };
        const qtyPem = Number(payload.jumlah_kg);
        const hargaPem = Number(payload.harga_per_kg || 0);
        if (isNaN(qtyPem) || qtyPem <= 0) return { success: false, code: "VALIDATION_ERROR", message: "Jumlah pakan (KG) harus berupa angka positif." };
        if (isNaN(hargaPem) || hargaPem < 0) return { success: false, code: "VALIDATION_ERROR", message: "Harga per KG harus berupa angka non-negatif." };

        const trxLogP2 = "TRX-LOG-PEM-" + Date.now();
        const recLogP2 = {
          transaction_id: trxLogP2,
          tanggal: payload.tanggal,
          nama_pakan: payload.nama_pakan.trim(),
          jumlah_kg: qtyPem,
          harga_per_kg: hargaPem,
          total_rupiah: qtyPem * hargaPem,
          keterangan: payload.keterangan || "",
          created_by: sess.userId,
          created_at: new Date().toISOString()
        };
        if (!db.LOGISTIK_PAKAN_PEMBELIAN) db.LOGISTIK_PAKAN_PEMBELIAN = [];
        db.LOGISTIK_PAKAN_PEMBELIAN.push(recLogP2);
        this.saveDB(db);

        // FIX LOG-B23: Sinkronkan pembelian pakan ke DANAMULYA_LOGISTIK_FULL_V12 (Seksi III & Seksi IV UI)
        try {
          const rawFull = localStorage.getItem("DANAMULYA_LOGISTIK_FULL_V12");
          if (rawFull) {
            const allLog = JSON.parse(rawFull);
            const txMonthNum = parseInt(payload.tanggal.split("-")[1], 10);
            const monthsList = ["JAN","FEB","MAR","APRIL","MEI","JUNI","JULI","AGU","SEP","OKT","NOV","DES"];
            const mKey = monthsList[txMonthNum - 1] || "JAN";
            if (allLog[mKey]) {
              if (!allLog[mKey].sec3) allLog[mKey].sec3 = [];
              const s3Idx = allLog[mKey].sec3.findIndex(it => (it.nama || '').toLowerCase() === payload.nama_pakan.trim().toLowerCase());
              if (s3Idx >= 0) {
                allLog[mKey].sec3[s3Idx].kg = (allLog[mKey].sec3[s3Idx].kg || 0) + qtyPem;
                allLog[mKey].sec3[s3Idx].harga = hargaPem || allLog[mKey].sec3[s3Idx].harga;
                allLog[mKey].sec3[s3Idx].rp = (allLog[mKey].sec3[s3Idx].kg || 0) * allLog[mKey].sec3[s3Idx].harga;
              } else {
                allLog[mKey].sec3.push({
                  no: allLog[mKey].sec3.length + 1,
                  nama: payload.nama_pakan.trim(),
                  kg: qtyPem,
                  harga: hargaPem,
                  rp: qtyPem * hargaPem
                });
              }
              // FIX LOG-B27: Perbaiki pencocokan nama pakan dua arah (bidirectional feed matching)
              // agar pakan spesifik seperti 'MIX FEED A20 TUNAI' dapat mencocokkan 'MIX FEED A20' di Seksi IV
              if (allLog[mKey].sec4) {
                const cleanFeed = (s) => (s || '').toLowerCase().replace(/mf\./g, 'mix feed').replace(/\bmf\b/g, 'mix feed').replace(/[^a-z0-9]/g, '');
                const targetClean = cleanFeed(payload.nama_pakan);
                const s4Item = allLog[mKey].sec4.find(it => {
                  const itClean = cleanFeed(it.nama);
                  if (itClean === targetClean) return true;
                  // FIX LOG-B60: Pencocokan komutatif dua arah agar pakan bervariasi tetap cocok
                  if (itClean.includes('mixfeeda18') && targetClean.includes('mixfeeda18')) return true;
                  if (itClean.includes('mixfeeda20') && targetClean.includes('mixfeeda20')) return true;
                  return false;
                });
                if (s4Item) {
                  s4Item.pembelian = (s4Item.pembelian || 0) + qtyPem;
                  s4Item.siap_jual = (s4Item.stok_awal || 0) + s4Item.pembelian;
                  s4Item.stok_akhir = Math.max(0, s4Item.siap_jual - (s4Item.penjualan || 0) - (s4Item.susut || 0));
                  s4Item.jumlah_rp = s4Item.stok_akhir * (s4Item.harga || 0);
                } else {
                  // FIX LOG-B56: Auto-register pakan baru ke Seksi IV jika belum ada
                  if (!allLog[mKey].sec4) allLog[mKey].sec4 = [];
                  allLog[mKey].sec4.push({
                    no: allLog[mKey].sec4.length + 1,
                    nama: payload.nama_pakan.trim(),
                    stok_awal: 0,
                    pembelian: qtyPem,
                    siap_jual: qtyPem,
                    penjualan: 0,
                    susut: 0,
                    stok_akhir: qtyPem,
                    harga: hargaPem,
                    jumlah_rp: qtyPem * hargaPem
                  });
                }
              }
              localStorage.setItem("DANAMULYA_LOGISTIK_FULL_V12", JSON.stringify(allLog));
            }
          }
        } catch (eSyncFull) {
          console.warn("Gagal sinkronisasi pembelian ke DANAMULYA_LOGISTIK_FULL_V12:", eSyncFull);
        }

        return { success: true, code: "CREATED", message: "Transaksi Pembelian Pakan berhasil disimpan.", data: recLogP2 };

      // FIX LOG-B35 & LOG-B62: Tambah route deleteLogistikTransaction, deleteLogistikPenjualan & deleteLogistikPembelian
      case "deleteLogistikTransaction":
      case "deleteLogistikPenjualan":
      case "deleteLogistikPembelian":
        if (sess.role !== "logistik" && sess.role !== "admin") return { success: false, code: "FORBIDDEN_DIVISION", message: "Akses ditolak." };
        const delTxId = (payload && typeof payload === "object") ? (payload.transaction_id || payload.id) : payload;
        if (!delTxId) return { success: false, code: "VALIDATION_ERROR", message: "ID transaksi wajib diisi." };

        let dbChanged = false;
        if (db.LOGISTIK_PAKAN_PENJUALAN && Array.isArray(db.LOGISTIK_PAKAN_PENJUALAN)) {
          const prevLen = db.LOGISTIK_PAKAN_PENJUALAN.length;
          db.LOGISTIK_PAKAN_PENJUALAN = db.LOGISTIK_PAKAN_PENJUALAN.filter(t => t.transaction_id !== delTxId && t.id !== delTxId);
          if (db.LOGISTIK_PAKAN_PENJUALAN.length !== prevLen) dbChanged = true;
        }

        // FIX LOG-B62: Hapus juga dari LOGISTIK_PAKAN_PEMBELIAN jika merupakan transaksi pembelian
        if (db.LOGISTIK_PAKAN_PEMBELIAN && Array.isArray(db.LOGISTIK_PAKAN_PEMBELIAN)) {
          const prevLen = db.LOGISTIK_PAKAN_PEMBELIAN.length;
          db.LOGISTIK_PAKAN_PEMBELIAN = db.LOGISTIK_PAKAN_PEMBELIAN.filter(t => t.transaction_id !== delTxId && t.purchase_id !== delTxId && t.id !== delTxId);
          if (db.LOGISTIK_PAKAN_PEMBELIAN.length !== prevLen) dbChanged = true;
        }

        if (dbChanged) {
          this.saveDB(db);
        }

        // Hapus juga dari DANAMULYA_LOGISTIK_TX_V1
        try {
          const rawTxs = localStorage.getItem("DANAMULYA_LOGISTIK_TX_V1");
          if (rawTxs) {
            let txs = JSON.parse(rawTxs);
            txs = txs.filter(t => t.id !== delTxId && t.transaction_id !== delTxId);
            localStorage.setItem("DANAMULYA_LOGISTIK_TX_V1", JSON.stringify(txs));
          }
        } catch (eDel) {}

        // FIX LOG-B45: Sync DANAMULYA_LOGISTIK_FULL_V12 setelah hapus transaksi
        try {
          if (typeof window !== 'undefined' && window.LogistikModule && typeof window.LogistikModule.getFullData === 'function') {
            const allLog = window.LogistikModule.getFullData();
            window.LogistikModule.syncMatrixFromTransactions(allLog, null);
            window.LogistikModule.saveFullData(allLog);
          } else {
            // Fallback: hapus entri dari FULL_V12 secara langsung
            const rawFull = localStorage.getItem("DANAMULYA_LOGISTIK_FULL_V12");
            if (rawFull) {
              const allLog = JSON.parse(rawFull);
              Object.keys(allLog).forEach(mKey => {
                if (allLog[mKey] && allLog[mKey].sec2) {
                  // Re-tally sec2 dari TX yang tersisa saja (bukan hapus 1 row)
                  // Tandai agar syncMatrixFromTransactions di render berikutnya menghitung ulang
                  allLog[mKey]._needs_sync = true;
                }
              });
              localStorage.setItem("DANAMULYA_LOGISTIK_FULL_V12", JSON.stringify(allLog));
            }
          }
        } catch (eSyncDel) {
          console.warn("[LOG-B45] Gagal sinkronisasi FULL_V12 setelah hapus:", eSyncDel);
        }

        return { success: true, code: "DELETED", message: "Transaksi Logistik (" + delTxId + ") berhasil dihapus.", data: { transaction_id: delTxId } };

      case "getPusatRecap":
        if (sess.role !== "admin") return { success: false, code: "FORBIDDEN_ROLE", message: "Khusus Role Admin Utama." };
        // Aggregasi Koperasi + Depot
        const totKopRecKg = db.KOPERASI_PENERIMAAN.reduce((a, b) => a + (b.jumlah_kg || 0), 0);
        const totKopRecRp = db.KOPERASI_PENERIMAAN.reduce((a, b) => a + (b.total_rupiah || 0), 0);
        const totKopOutKg = db.KOPERASI_PENGELUARAN.reduce((a, b) => a + (b.jumlah_kg || 0), 0);
        const totKopOutRp = db.KOPERASI_PENGELUARAN.reduce((a, b) => a + (b.total_rupiah || 0), 0);

        const totDepPurKg = db.DEPOT_PEMBELIAN.reduce((a, b) => a + (b.jumlah_kg || 0), 0);
        const totDepPurLtr = db.DEPOT_PEMBELIAN.reduce((a, b) => a + (b.jumlah_liter || 0), 0);
        const totDepPurRp = db.DEPOT_PEMBELIAN.reduce((a, b) => a + (b.total_rupiah || 0), 0);

        const totDepSalLtr = db.DEPOT_PENJUALAN.reduce((a, b) => a + (b.jumlah_liter || 0), 0);
        const totDepSalRp = db.DEPOT_PENJUALAN.reduce((a, b) => a + (b.total_rupiah || 0), 0);
        const totDepOpsRp = db.DEPOT_OPERASIONAL.reduce((a, b) => a + (b.nominal_biaya || 0), 0);

        // FIX API-B3: Aggregasi riil Divisi Logistik (bukan hardcoded PENDING)
        let totLogSalKg = (db.LOGISTIK_PAKAN_PENJUALAN || []).reduce((a, b) => a + (b.jumlah_kg || 0), 0);
        let totLogSalRp = (db.LOGISTIK_PAKAN_PENJUALAN || []).reduce((a, b) => a + (b.total_rupiah || 0), 0);
        let totLogPurKg = (db.LOGISTIK_PAKAN_PEMBELIAN || []).reduce((a, b) => a + (b.jumlah_kg || 0), 0);
        let totLogPurRp = (db.LOGISTIK_PAKAN_PEMBELIAN || []).reduce((a, b) => a + (b.total_rupiah || 0), 0);
        let totLogStokRp = 0;

        try {
          const rawFull = localStorage.getItem("DANAMULYA_LOGISTIK_FULL_V12");
          if (rawFull) {
            const allLog = JSON.parse(rawFull);
            let sec2Kg = 0, sec2Rp = 0, sec3Kg = 0, sec3Rp = 0;
            Object.keys(allLog).forEach(m => {
              const md = allLog[m];
              if (md && md.sec2) {
                sec2Kg += md.sec2.reduce((a, b) => a + Number(b.total_kg || 0), 0);
                sec2Rp += md.sec2.reduce((a, b) => a + Number(b.total_rp || 0), 0);
              }
              if (md && md.sec3) {
                sec3Kg += md.sec3.reduce((a, b) => a + Number(b.kg || 0), 0);
                sec3Rp += md.sec3.reduce((a, b) => a + Number(b.rp || 0), 0);
              }
            });
            if (sec2Kg > 0 || sec2Rp > 0) {
              totLogSalKg = sec2Kg;
              totLogSalRp = sec2Rp;
            }
            if (sec3Kg > 0 || sec3Rp > 0) {
              totLogPurKg = sec3Kg;
              totLogPurRp = sec3Rp;
            }
            const monthOrder = ["JAN", "FEB", "MAR", "APRIL", "MEI", "JUNI", "JULI", "AGU", "SEP", "OKT", "NOV", "DES"];
            for (let i = monthOrder.length - 1; i >= 0; i--) {
              const mk = monthOrder[i];
              if (allLog[mk] && allLog[mk].sec4 && allLog[mk].sec4.length > 0) {
                totLogStokRp = allLog[mk].sec4.reduce((a, b) => a + Number(b.jumlah_rp || 0), 0);
                break;
              }
            }
          }
        } catch (eRecapLog) {
          console.warn("Gagal agregasi DANAMULYA_LOGISTIK_FULL_V12:", eRecapLog);
        }

        return {
          success: true,
          code: "OK",
          data: {
            periode: { start: payload.startDate || "2026-01-01", end: payload.endDate || "2026-12-31" },
            koperasi: {
              penerimaan: { total_kg: totKopRecKg, total_liter: Math.round(totKopRecKg / 1.025), total_rupiah: totKopRecRp },
              pengeluaran: { total_kg: totKopOutKg, total_liter: Math.round(totKopOutKg / 1.025), total_penjualan_rupiah: totKopOutRp },
              neraca: { faktor_densitas: 1.025, selisih_liter: Math.round((totKopRecKg - totKopOutKg) / 1.025) }
            },
            depot: {
              pembelian: { total_kg: totDepPurKg, total_liter: totDepPurLtr, total_rupiah: totDepPurRp },
              penjualan: { total_liter: totDepSalLtr, total_rupiah: totDepSalRp },
              biaya_operasional_rupiah: totDepOpsRp
            },
            logistik: {
              status: "ACTIVE",
              penjualan: { total_kg: totLogSalKg, total_rupiah: totLogSalRp },
              pembelian: { total_kg: totLogPurKg, total_rupiah: totLogPurRp },
              nilai_persediaan_stok_rupiah: totLogStokRp
            }
          }
        };

      default:
        return { success: false, code: "INVALID_ACTION", message: "Aksi tidak dikenali." };
    }
  }
};
