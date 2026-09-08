/**
 * TEST LIVE APPS SCRIPT WEB APP API ENDPOINT
 */
const https = require('https');

const scriptUrl = "https://script.google.com/macros/s/AKfycbyuPFBOh0az2YexJ99U-btJ3OxOPE3YHUn6_iw_xBfiqvaIrpP_grg9gmC5qppcu7ay/exec";

console.log("==================================================");
console.log(" 🌐 TESTING LIVE APPS SCRIPT WEB APP ENDPOINT");
console.log(" URL:", scriptUrl);
console.log("==================================================");

function fetchUrl(url, postData = null) {
  return new Promise((resolve, reject) => {
    const options = {
      method: postData ? 'POST' : 'GET',
      headers: postData ? { 'Content-Type': 'text/plain;charset=utf-8' } : {}
    };

    const req = https.request(url, options, (res) => {
      // Handle Google Apps Script 302 / 307 Redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location, postData).then(resolve).catch(reject);
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch (e) {
          resolve({ raw: data, status: res.statusCode });
        }
      });
    });

    req.on('error', err => reject(err));
    if (postData) req.write(JSON.stringify(postData));
    req.end();
  });
}

async function runTest() {
  try {
    // 1. GET Health Check
    console.log("\n--- [1] GET Health Check ---");
    const health = await fetchUrl(scriptUrl);
    console.log("Response:", JSON.stringify(health));

    // 2. POST Login Test
    console.log("\n--- [2] POST Login Test (admin) ---");
    const loginRes = await fetchUrl(scriptUrl, {
      action: "login",
      payload: { username: "admin", password: "admin123" }
    });
    console.log("Login Response:", JSON.stringify(loginRes));

    if (loginRes.success) {
      console.log("\n ✅ SUCCESS! Live Google Apps Script Backend is 100% OPERATIONAL & HEALTHY!");
    } else {
      console.log("\n ⚠️ Live API merespons tapi login gagal:", loginRes.message);
    }
  } catch (err) {
    console.error(" ❌ Error connecting to Live API:", err);
  }
}

runTest();
