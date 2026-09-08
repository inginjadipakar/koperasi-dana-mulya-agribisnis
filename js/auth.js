/**
 * ============================================================
 * AUTH.JS — MANAJER OTENTIKASI & HAK AKSES FRONTEND
 * ============================================================
 */

const AuthManager = {
  getSession: function() {
    try {
      const raw = sessionStorage.getItem("CURRENT_SESSION");
      if (!raw) return null;
      const sess = JSON.parse(raw);
      if (Date.now() > sess.expiresAt) {
        this.logout();
        return null;
      }
      return sess;
    } catch (e) {
      return null;
    }
  },

  isLoggedIn: function() {
    return this.getSession() !== null;
  },

  login: async function(username, password) {
    const res = await ApiClient.post("login", { username: username, password: password });
    if (res.success && res.data) {
      sessionStorage.setItem("CURRENT_SESSION", JSON.stringify(res.data));
    }
    return res;
  },

  logout: function() {
    sessionStorage.removeItem("CURRENT_SESSION");
    window.location.hash = "#login";
    App.render();
  },

  requireAuth: function(requiredRole, requiredDivision) {
    const session = this.getSession();
    if (!session) {
      window.location.hash = "#login";
      return false;
    }
    if (session.role === "admin") return true; // Admin bypass
    if (requiredRole && session.role !== requiredRole) return false;
    if (requiredDivision && requiredDivision !== "ALL" && session.divisi !== requiredDivision) return false;
    return true;
  }
};
