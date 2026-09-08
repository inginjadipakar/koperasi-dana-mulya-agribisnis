/**
 * ============================================================
 * UTILS.GS — FUNGSI HELPER & UTILITAS SPREADSHEET
 * ============================================================
 */

// Helper untuk format JSON Response terstruktur
function buildResponse(success, code, message, data) {
  var payload = {
    success: success,
    code: code || (success ? "OK" : "ERROR"),
    message: message || "",
    data: data !== undefined ? data : null,
    timestamp: new Date().toISOString()
  };
  
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

// Generate Unique ID berbasis Prefix & Timestamp/Random
function generateUniqueId(prefix) {
  var dateStr = Utilities.formatDate(new Date(), "GMT+7", "yyyyMMdd");
  var randomNum = Math.floor(100000 + Math.random() * 900000);
  return (prefix || "ID") + "-" + dateStr + "-" + randomNum;
}

// Formatting ISO Date YYYY-MM-DD
function formatDateISO(dateObj) {
  if (!dateObj) return "";
  if (typeof dateObj === "string") return dateObj.substring(0, 10);
  return Utilities.formatDate(new Date(dateObj), "GMT+7", "yyyy-MM-dd");
}

// Parse Float aman (mencegah NaN)
function parseNumber(val) {
  if (val === null || val === undefined || val === "") return 0;
  var num = Number(val);
  return isNaN(num) ? 0 : num;
}

// Rounding Desimal untuk Presisi Matematis Susu & Rupiah
function roundDecimal(num, decimals) {
  var d = decimals !== undefined ? decimals : 4;
  var factor = Math.pow(10, d);
  return Math.round(parseNumber(num) * factor) / factor;
}

// Efficient Sheet Search (Batch Read)
function findRowIndexByValue(sheet, colIndexOneBased, searchVal) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return -1;
  
  var values = sheet.getRange(2, colIndexOneBased, lastRow - 1, 1).getValues();
  for (var i = 0; i < values.length; i++) {
    if (String(values[i][0]) === String(searchVal)) {
      return i + 2; // Return 1-based row index in sheet
    }
  }
  return -1;
}

// Efficient Sheet Data Reader (Batch Read to Objects with Optional Limit)
// MITIGASI TIMEOUT (6 MENIT): Jika data sangat besar, baca N baris terbaru dari bawah
function readSheetAsObjects(sheet, headerKeys, limit) {
  var lastRow = sheet.getLastRow();
  var lastCol = headerKeys.length;
  if (lastRow < 2) return [];
  
  var startRow = 2;
  var numRows = lastRow - 1;
  
  // Jika limit ditentukan dan data lebih banyak dari limit, baca data terbaru
  if (limit && limit > 0 && numRows > limit) {
    startRow = lastRow - limit + 1;
    numRows = limit;
  }
  
  var dataValues = sheet.getRange(startRow, 1, numRows, lastCol).getValues();
  var results = [];
  
  for (var r = 0; r < dataValues.length; r++) {
    var row = dataValues[r];
    var obj = {};
    var isEmpty = true;
    for (var c = 0; c < headerKeys.length; c++) {
      var val = row[c];
      if (val !== "" && val !== null && val !== undefined) isEmpty = false;
      obj[headerKeys[c]] = val;
    }
    if (!isEmpty) {
      results.push(obj);
    }
  }
  return results;
}

