# DOCS 05 — BACKEND SECURITY DESIGN (GOOGLE APPS SCRIPT)

> Project: Sistem Digital Koperasi Danamulya  
> Versi: 1.0  
> Core Principle: Backend Authorization First (Zero Trust Frontend)  

---

## 1. PRINCIPLE OF BACKEND SECURITY

1. **Frontend Tidak Dipercaya**: Menyembunyikan tombol UI atau menyembunyikan menu di browser **TIDAK DIANGGAP** sebagai mekanisme keamanan.
2. **Mandatory Token Verification**: Setiap API request dari web harus menyertakan Auth Token yang tervalidasi.
3. **Backend Access Control Pipeline**:

```
[REQUEST WEB] 
      ↓
[EXTRACT AUTH TOKEN]
      ↓
[VERIFIKASI TOKEN & AMBIL USER SESSION]
      ↓
[CEK ROLE & DIVISI USER]
      ↓
[IZINKAN AKSES] ── (Cocok) ──→ [EKSEKUSI APPS SCRIPT] → [GOOGLE SHEETS]
      │
  (Tidak Cocok)
      ↓
[DENIED & LOG TO AUDIT_LOG] ──→ [RETURN HTTP 403 / JSON DENIED]
```

---

## 2. MEKANISME AUTHENTICATION & PASSWORD HASHING

### A. Password Storage
- Password **TIDAK BOLEH** disimpan dalam bentuk plain-text (`123456`).
- Password menggunakan Hashing **Salted SHA-256** memanfaatkan `Utilities.computeDigest()` pada Google Apps Script:
  $$\text{Hash} = \text{SHA256}(\text{Password} + \text{Salt})$$

### B. Session Management
- Saat login sukses, backend membuat **Auth Token** berbasis UUID/Random String dengan `TTL` (Time To Live, misal 8 jam).
- Token disimpan di `PropertiesService` / `CacheService` milik Google Apps Script beserta metadata: `user_id`, `role`, `divisi`, `expires_at`.

---

## 3. ALUR ENFORCEMENT KEAMANAN BACKEND

```javascript
// Konsep Validasi Backend di Google Apps Script (doPost / doGet)
function handleRequest(e) {
  var requestData = JSON.parse(e.postData.contents);
  var action = requestData.action;
  var token = requestData.token;
  
  // 1. Verifikasi Session Token
  var session = verifyToken(token);
  if (!session.valid) {
    logAudit(null, "UNKNOWN", action, "FAILED", "Invalid Token");
    return responseError("401 Unauthorized", "Silakan login kembali.");
  }
  
  // 2. Enforce Access Control per Action
  var userRole = session.role;
  var userDivisi = session.divisi;
  
  if (!isAuthorized(userRole, userDivisi, action)) {
    logAudit(session.user_id, userRole, action, "DENIED", "Akses Ditolak ke Divisi Lain");
    return responseError("403 Forbidden", "Anda tidak memiliki hak akses ke data ini.");
  }
  
  // 3. Eksekusi Fungsi jika Lolos Security Check
  var result = executeAction(action, requestData, session);
  logAudit(session.user_id, userRole, action, "SUCCESS", "OK");
  return responseSuccess(result);
}
```

---

## 4. CEGAH DUPLICATE SUBMISSION & CONCURRENCY CONTROL

1. **Client-side Interception**: Tombol [SIMPAN] langsung di-disabled setelah diklik 1 kali, menampilkan spinner loading.
2. **Server-side LockService**: Backend Google Apps Script menggunakan `LockService.getScriptLock()` untuk menangani transaksi bersamaan agar ID Transaksi tidak bentrok dan tidak ter-input dua kali:
   ```javascript
   var lock = LockService.getScriptLock();
   try {
     lock.waitLock(10000); // Wait up to 10 seconds for lock
     // Process transaction write
   } finally {
     lock.releaseLock();
   }
   ```
3. **Idempotency Token**: Setiap request submit menyertakan `client_request_id` unik untuk mendeteksi re-transmission.
