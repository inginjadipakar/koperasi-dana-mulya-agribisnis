/**
 * ============================================================
 * VALIDATION.GS — SANITASI & VALIDASI UNTRUSTED INPUT
 * ============================================================
 */

function validateRequiredFields(inputObj, requiredFieldNames) {
  if (!inputObj || typeof inputObj !== "object") {
    return { valid: false, error: "Payload data tidak ditemukan" };
  }
  
  for (var i = 0; i < requiredFieldNames.length; i++) {
    var field = requiredFieldNames[i];
    var val = inputObj[field];
    if (val === undefined || val === null || String(val).trim() === "") {
      return { valid: false, error: "Field mandatory '" + field + "' tidak boleh kosong." };
    }
  }
  return { valid: true };
}

function validatePositiveNumber(val, fieldName) {
  var num = parseNumber(val);
  if (isNaN(num) || num <= 0) {
    return { valid: false, error: "Field '" + fieldName + "' harus berupa angka positif (> 0)." };
  }
  return { valid: true, value: num };
}

function validateNonNegativeNumber(val, fieldName) {
  var num = parseNumber(val);
  if (isNaN(num) || num < 0) {
    return { valid: false, error: "Field '" + fieldName + "' harus berupa angka valid (>= 0)." };
  }
  return { valid: true, value: num };
}

function validateDateFormat(dateStr) {
  if (!dateStr) return { valid: false, error: "Tanggal wajib diisi." };
  var parsed = new Date(dateStr);
  if (isNaN(parsed.getTime())) {
    return { valid: false, error: "Format tanggal tidak valid (gunakan YYYY-MM-DD)." };
  }
  return { valid: true, value: formatDateISO(parsed) };
}
