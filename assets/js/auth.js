/* =========================================================
   AuctionHub — Auth (hardcoded prototype)
   Mock credentials checked client-side, session persisted in
   localStorage. Loaded as a classic <script>.
   ========================================================= */

const AUTH_KEY      = "auctionhub_auth";
const AUTH_USER_KEY = "auctionhub_user";

/* Hardcoded credentials — prototype only */
const VALID_USERS = [
  { username: "admin", password: "admin" }
];

function isAuthenticated() {
  return localStorage.getItem(AUTH_KEY) === "true";
}

function currentUser() {
  return localStorage.getItem(AUTH_USER_KEY) || "admin";
}

/**
 * Attempt login with the given credentials.
 * Returns { ok: true } or { ok: false, error: string }.
 */
function login(username, password, remember) {
  username = (username || "").trim();
  password = (password || "").trim();

  if (!username || !password) {
    return { ok: false, error: "Please enter username and password." };
  }

  const match = VALID_USERS.find(u => u.username === username && u.password === password);
  if (!match) {
    return { ok: false, error: "Wrong username or password." };
  }

  localStorage.setItem(AUTH_KEY, "true");
  localStorage.setItem(AUTH_USER_KEY, username);
  if (remember) localStorage.setItem("auctionhub_remember", "true");

  return { ok: true };
}

function logout() {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem("auctionhub_remember");
}

/**
 * Route guard for admin pages. Call inline at the top of every
 * admin/*.html before any other script runs. If not authenticated,
 * redirects to the landing page (where the login modal lives).
 */
function guardAdmin() {
  if (!isAuthenticated()) {
    location.replace("../index.html");
  }
}

/**
 * Wire up a logout button by id. Clears session and redirects.
 */
function bindLogout(buttonId) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    logout();
    location.href = "../index.html";
  });
}
