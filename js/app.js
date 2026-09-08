
// GLOBAL MODERN POPUP & TOAST HELPERS (SWEETALERT2 INTEGRATION)
window.showToast = function(title, icon = 'success') {
  if (typeof Swal !== 'undefined') {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: icon,
      title: title,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  } else {
    alert(title);
  }
};

window.showAlert = function(title, text = '', icon = 'info') {
  if (typeof Swal !== 'undefined') {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      confirmButtonColor: '#0d6efd',
      confirmButtonText: 'Tutup',
      customClass: { popup: 'rounded-4 shadow' }
    });
  } else {
    alert(title + (text ? "\n" + text : ""));
  }
};

/**
 * ============================================================
 * APP.JS — MANAJER APLIKASI WEB DANAMULYA (SPA ROUTER)
 * ============================================================
 */

const App = {
  isSidebarHidden: localStorage.getItem("sidebar_hidden") === "true",

  applySidebarState: function() {
    const sidebar = document.getElementById("mainSidebar");
    const expandBtn = document.getElementById("sidebarExpandBtn");
    if (window.innerWidth <= 768) {
      if (sidebar) sidebar.style.display = "none";
      if (expandBtn) expandBtn.style.display = "none";
      return;
    }
    if (sidebar) sidebar.style.display = this.isSidebarHidden ? "none" : "block";
    if (expandBtn) expandBtn.style.display = this.isSidebarHidden ? "block" : "none";
  },

  toggleSidebar: function() {
    if (window.innerWidth <= 768) return;
    this.isSidebarHidden = !this.isSidebarHidden;
    localStorage.setItem("sidebar_hidden", this.isSidebarHidden ? "true" : "false");
    this.applySidebarState();
  },

  init: function() {
    window.addEventListener("hashchange", () => this.render());
    window.addEventListener("resize", () => this.applySidebarState());
    localStorage.removeItem("mobile_view_mode");
    document.body.classList.remove("mobile-mode-active");
    const bar = document.getElementById("mobileViewToggleBar");
    if (bar) bar.remove();
    this.render();
  },

  render: async function() {
    const mainContent = document.getElementById("mainContent");
    const navbar = document.getElementById("mainNavbar");
    const sidebar = document.getElementById("mainSidebar");
    const expandBtn = document.getElementById("sidebarExpandBtn");
    const session = AuthManager.getSession();

    const hash = window.location.hash || (session ? "#logistik" : "#login");

    // Route LOGIN Page
    if (hash === "#login" || !session) {
      navbar.style.display = "none";
      sidebar.style.display = "none";
      if (expandBtn) expandBtn.style.display = "none";
      this.renderMobileBottomNav(null, hash);
      mainContent.innerHTML = this.renderLoginView();
      return;
    }

    if (window.innerWidth <= 768) {
      navbar.style.display = "none";
      sidebar.style.display = "none";
      if (expandBtn) expandBtn.style.display = "none";
      this.renderMobileBottomNav(session, hash);
    } else {
      navbar.style.display = "flex";
      this.applySidebarState();
      this.renderUserInfo(session);
      this.renderSidebar(session, hash);
      const bottomNav = document.getElementById("mobileBottomNav");
      if (bottomNav) bottomNav.style.display = "none";
    }


    // Route Views
    try {
      if (hash === "#dashboard" || hash === "#logistik") {
        mainContent.innerHTML = await LogistikModule.render();
      } else if (hash === "#koperasi") {
        mainContent.innerHTML = await KoperasiModule.render();
      } else if (hash === "#depot") {
        mainContent.innerHTML = await DepotModule.render();
      } else if (hash === "#recap") {
        mainContent.innerHTML = await RecapModule.render();
      } else if (hash === "#excel") {
        mainContent.innerHTML = `<div class="text-center p-5"><div class="spinner-border text-success"></div><div class="mt-2 text-muted fw-bold">Memuat Master Excel...</div></div>`;
        await App.loadExcelViewerScript();
        mainContent.innerHTML = ExcelViewerModule.render();
      } else {
        mainContent.innerHTML = await LogistikModule.render();
      }
    } catch (err) {
      console.error("Render error:", err);
      mainContent.innerHTML = `<div class="alert alert-danger">Terjadi kesalahan rendering halaman: ${err.message}</div>`;
    }
  },


  loadExcelViewerScript: function() {
    return new Promise((resolve) => {
      if (window.ExcelViewerModule) return resolve();
      const s = document.createElement("script");
      s.src = "js/excel_viewer.js";
      s.onload = () => resolve();
      s.onerror = () => resolve();
      document.body.appendChild(s);
    });
  },

  getNavItems: function(session) {
    if (!session) return [];
    const role = (session.role || '').toLowerCase();
    let base = [];
    if (role === 'admin') {
      base = [
        { hash: "#logistik", label: "Logistik", icon: "bi-truck" },
        { hash: "#koperasi", label: "Koperasi", icon: "bi-building" },
        { hash: "#depot", label: "Depot", icon: "bi-cup-straw" },
        { hash: "#recap", label: "Rekap", icon: "bi-shield-check" },
        { hash: "#excel", label: "Excel", icon: "bi-file-earmark-excel-fill" }
      ];
    } else if (role === 'koperasi') {
      base = [
        { hash: "#koperasi", label: "Koperasi", icon: "bi-building" },
        { hash: "#excel", label: "Excel", icon: "bi-file-earmark-excel-fill" }
      ];
    } else if (role === 'depot') {
      base = [
        { hash: "#depot", label: "Depot", icon: "bi-cup-straw" },
        { hash: "#excel", label: "Excel", icon: "bi-file-earmark-excel-fill" }
      ];
    } else {
      base = [
        { hash: "#logistik", label: "Logistik", icon: "bi-truck" },
        { hash: "#excel", label: "Excel", icon: "bi-file-earmark-excel-fill" }
      ];
    }
    // Append Logout button for mobile navigation
    base.push({ isLogout: true, label: "Keluar", icon: "bi-box-arrow-right text-danger" });
    return base;
  },

  renderUserInfo: function(session) {
    const el = document.getElementById("navUserInfo");
    if (el) {
      el.innerHTML = `
        <div class="d-flex align-items-center gap-2 bg-white px-3 py-2 rounded-pill shadow-sm border">
          <img src="images/logo.jpg" class="rounded-circle" style="width: 28px; height: 28px; object-fit: cover;">
          <div class="lh-1 me-2">
            <div class="fw-bold text-dark small mb-0">${session.namaLengkap}</div>
            <div class="text-muted" style="font-size: 0.7rem;">${session.role.toUpperCase()}</div>
          </div>
          <button onclick="AuthManager.logout()" class="btn btn-sm btn-light rounded-circle p-1 ms-1 text-danger" title="Logout">
            <i class="bi bi-power fs-6"></i>
          </button>
        </div>
      `;
    }
  },

  closeMobileSidebar: function() {
    if (window.innerWidth <= 768) {
      this.isSidebarHidden = true;
      localStorage.setItem("sidebar_hidden", "true");
      this.applySidebarState();
    }
  },

  renderMobileBottomNav: function(session, currentHash) {
    const bottomNav = document.getElementById("mobileBottomNav");
    if (!bottomNav) return;

    if (!session || currentHash === "#login") {
      bottomNav.style.display = "none";
      return;
    }

    const items = this.getNavItems(session);
    bottomNav.style.display = "flex";

    bottomNav.innerHTML = items.map(item => {
      if (item.isLogout) {
        return `
          <a href="javascript:void(0)" onclick="AuthManager.logout()" class="mobile-bottom-nav-item text-danger">
            <i class="bi ${item.icon}"></i>
            <span class="text-danger fw-bold">${item.label}</span>
          </a>
        `;
      }
      const isActive = (currentHash === item.hash || (currentHash === '' && item.hash === '#logistik') || (currentHash === '#dashboard' && item.hash === '#logistik'));
      return `
        <a href="${item.hash}" class="mobile-bottom-nav-item ${isActive ? 'active' : ''}">
          <i class="bi ${item.icon}"></i>
          <span>${item.label}</span>
          ${isActive ? '<span class="nav-dot"></span>' : ''}
        </a>
      `;
    }).join('');
  },

  renderSidebar: function(session, currentHash) {
    const nav = document.getElementById("sidebarNav");
    if (!nav) return;

    const items = this.getNavItems(session).filter(i => !i.isLogout);

    nav.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom d-md-none">
        <div class="fw-bold text-dark fs-6 d-flex align-items-center gap-2">
          <img src="images/logo.jpg" class="rounded-circle" style="width: 28px; height: 28px; object-fit: cover;">
          <span>Menu Danamulya</span>
        </div>
        <button class="btn btn-light btn-sm rounded-circle shadow-sm" onclick="App.toggleSidebar()" title="Tutup Menu">
          <i class="bi bi-x-lg fs-6 text-dark"></i>
        </button>
      </div>

      <div class="d-flex flex-column gap-1 mb-auto">
        ${items.map(item => {
          const isActive = (currentHash === item.hash || (currentHash === '' && item.hash === '#logistik') || (currentHash === '#dashboard' && item.hash === '#logistik'));
          return `
            <a href="${item.hash}" onclick="App.closeMobileSidebar()" class="nav-link ${isActive ? 'active' : ''}">
              <i class="bi ${item.icon} fs-5"></i>
              <span>${item.label}</span>
            </a>
          `;
        }).join('')}
      </div>
      
      <div class="sidebar-profile d-flex align-items-center justify-content-between mt-4">
        <div class="d-flex align-items-center gap-2">
          <img src="images/logo.jpg" class="sidebar-profile-img" alt="Avatar">
          <div class="lh-1">
            <div class="fw-bold text-dark small mb-1">${session.namaLengkap}</div>
            <div class="text-muted small" style="font-size:0.75rem;">${session.role.toUpperCase()}</div>
          </div>
        </div>
        <button onclick="AuthManager.logout()" class="btn btn-sm btn-link text-danger p-0 text-decoration-none" title="Log Out">
          <i class="bi bi-box-arrow-right fs-5"></i>
        </button>
      </div>
    `;
  },

  renderLoginView: function() {
    return `
      <div class="login-wrapper">
        <div class="mobile-top-spacer d-md-none"></div>
        <div class="login-card shadow-lg">
          <div class="d-md-none mx-auto bg-secondary bg-opacity-25 rounded-pill mb-3" style="width: 44px; height: 5px;"></div>
          <div class="text-center mb-3">
            <img src="images/logo.jpg" alt="Logo Koperasi Danamulya" class="rounded-circle shadow-sm mb-2" style="width: 60px; height: 60px; object-fit: cover; border: 2px solid rgba(37, 99, 235, 0.2);">
            <h5 class="fw-bold text-dark mb-1">Sistem Digital Danamulya</h5>
            <p class="text-muted small mb-0" style="font-size: 0.78rem;">Koperasi Agribisnis Dana Mulya — Proker KKN</p>
          </div>

          <form onsubmit="App.handleLogin(event)" id="loginForm">
            <div class="mb-2">
              <label class="form-label small fw-bold text-muted mb-1">Username</label>
              <div class="input-group input-group-sm">
                <span class="input-group-text bg-light border-end-0"><i class="bi bi-person text-secondary"></i></span>
                <input type="text" class="form-control border-start-0 ps-0" name="username" id="loginUsername" required placeholder="admin / koperasi01" value="admin">
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label small fw-bold text-muted mb-1">Password</label>
              <div class="input-group input-group-sm">
                <span class="input-group-text bg-light border-end-0"><i class="bi bi-key text-secondary"></i></span>
                <input type="password" class="form-control border-start-0 ps-0" name="password" id="loginPassword" required placeholder="••••••••" value="admin123">
              </div>
            </div>
            <button type="submit" class="btn btn-blue-primary btn-md w-100 fw-bold shadow-sm mb-3" style="padding: 10px;">
              <i class="bi bi-box-arrow-in-right me-2"></i>Masuk Sistem
            </button>
          </form>

          <div class="p-2 bg-light rounded-3 small">
            <div class="fw-bold text-dark mb-2" style="font-size: 0.75rem;"><i class="bi bi-shield-lock me-1 text-primary"></i>Pilih Akun Demo (1-Klik Isi):</div>
            <div class="d-flex gap-1 flex-wrap mb-2">
              <button type="button" class="btn btn-xs btn-outline-success fw-bold flex-fill" style="font-size: 0.72rem; padding: 4px 6px;" onclick="App.fillDemo('admin', 'admin123')">
                <i class="bi bi-speedometer2 me-1"></i>Admin
              </button>
              <button type="button" class="btn btn-xs btn-outline-primary fw-bold flex-fill" style="font-size: 0.72rem; padding: 4px 6px;" onclick="App.fillDemo('koperasi01', 'koperasi123')">
                <i class="bi bi-building me-1"></i>Koperasi
              </button>
              <button type="button" class="btn btn-xs btn-outline-warning text-dark fw-bold flex-fill" style="font-size: 0.72rem; padding: 4px 6px;" onclick="App.fillDemo('depot01', 'depot123')">
                <i class="bi bi-cup-straw me-1"></i>Depot
              </button>
              <button type="button" class="btn btn-xs btn-outline-info text-dark fw-bold flex-fill" style="font-size: 0.72rem; padding: 4px 6px;" onclick="App.fillDemo('logistik01', 'logistik123')">
                <i class="bi bi-truck me-1"></i>Logistik
              </button>
            </div>
            <div class="text-center border-top pt-2 mt-2">
              <button type="button" class="btn btn-link btn-sm text-secondary text-decoration-none p-0" style="font-size: 0.73rem;" onclick="App.resetData()">
                <i class="bi bi-arrow-clockwise me-1"></i>Muat Ulang Data Contoh (Jan–Juli 2026)
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  resetData: function() {
    localStorage.removeItem("DANAMULYA_DB");
    localStorage.removeItem("DANAMULYA_DB_VERSION");
    if (typeof LocalBridgeEngine !== "undefined") {
      LocalBridgeEngine.initStorage();
    }
    showToast("Data resmi 2026 berhasil dimuat ulang.", "success");
    this.render();
  },

  fillDemo: function(user, pass) {
    const uInput = document.getElementById("loginUsername");
    const pInput = document.getElementById("loginPassword");
    if (uInput) uInput.value = user;
    if (pInput) pInput.value = pass;
  },

  handleLogin: async function(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Memverifikasi...`;

    const res = await AuthManager.login(form.username.value, form.password.value);
    btn.disabled = false;
    btn.innerHTML = `<i class="bi bi-box-arrow-in-right me-2"></i>Masuk Sistem`;

    if (res.success) {
      window.location.hash = "#dashboard";
      this.render();
    } else {
      showAlert("Gagal Login", res.message, "error");
    }
  },

  renderExcelView: function() {
    const embedUrl = "https://docs.google.com/spreadsheets/d/12bnmGQlS_Fj8s3YB4mJWiePusSzn_MZ2ehKtFrinyxY/preview";
    const editUrl = "https://docs.google.com/spreadsheets/d/12bnmGQlS_Fj8s3YB4mJWiePusSzn_MZ2ehKtFrinyxY/edit";
    return `
      <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <div>
          <h4 class="fw-bold mb-1"><i class="bi bi-file-spreadsheet text-success me-2"></i>Live Spreadsheet Excel Storage</h4>
          <p class="text-muted small mb-0">Tampilan Lembar Kerja Spreadsheet Koperasi Agribisnis Dana Mulya Secara Real-Time</p>
        </div>
        <div class="d-flex gap-2">
          <a href="${editUrl}" target="_blank" class="btn btn-sm btn-outline-success fw-bold">
            <i class="bi bi-box-arrow-up-right me-1"></i>Buka Full Google Sheets Tab Baru
          </a>
        </div>
      </div>

      <div class="card shadow-sm border-0 rounded-3 overflow-hidden" style="height: calc(100vh - 160px); min-height: 520px;">
        <iframe src="${embedUrl}" style="width: 100%; height: 100%; border: none;"></iframe>
      </div>
    `;
  },

  downloadFileWithMonth: function(e, fileName, sheetName) {
    if (e) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
    }
    const fName = fileName || "2026-LAP LOGISTIK.xlsx";
    const sName = (sheetName || "AGUSTUS").toUpperCase();
    const fileBase = fName.replace(/\.[^/.]+$/, "");
    const ext = fName.includes(".") ? fName.substring(fName.lastIndexOf(".")) : ".xlsx";
    const targetFileName = `${fileBase} - ${sName}${ext}`;

    fetch(fName)
      .then(res => {
        if (!res.ok) throw new Error("File fetch failed");
        return res.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = targetFileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }, 300);
      })
      .catch(() => {
        const a = document.createElement("a");
        a.href = fName;
        a.download = targetFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });

    return false;
  }
};

// Initialize App on DOM Load
document.addEventListener("DOMContentLoaded", () => App.init());
