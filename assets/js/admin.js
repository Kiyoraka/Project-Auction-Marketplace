/* =========================================================
   AuctionHub — Admin Shell + Render Helpers
   Provides sidebar/topbar wiring, user chip population,
   and reusable render functions for dashboard, products,
   auctions, orders, settings pages. Loaded after data.js.
   ========================================================= */

/* ----------------------------------------------------------
   Shell bootstrap (called by every admin page)
   ---------------------------------------------------------- */

function bootstrapAdminShell() {
  /* Populate user chip from localStorage */
  const email = (typeof currentUser === "function") ? currentUser() : "admin@gmail.com";
  const initial = (email[0] || "A").toUpperCase();
  setText("user-initial", initial);
  setText("user-email", email);
  setText("welcome-user", email.split("@")[0]);

  /* Mobile drawer toggle */
  const trigger = document.getElementById("menu-trigger");
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebar-backdrop");
  if (trigger && sidebar && backdrop) {
    trigger.addEventListener("click", function () {
      sidebar.classList.add("is-open");
      backdrop.classList.add("is-open");
    });
    backdrop.addEventListener("click", function () {
      sidebar.classList.remove("is-open");
      backdrop.classList.remove("is-open");
    });
  }

  /* Logout */
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      if (typeof logout === "function") logout();
      location.href = "../index.html";
    });
  }
}

/* ----------------------------------------------------------
   Dashboard renderers
   ---------------------------------------------------------- */

function renderDashboardStats() {
  if (typeof STATS === "undefined") return;
  setText("stat-live",    STATS.liveAuctions);
  setText("stat-bids",    STATS.todayBids);
  setText("stat-pending", STATS.pendingOrders);
  setText("stat-revenue", "RM " + STATS.monthlyRevenue.toLocaleString("en-MY"));
}

function renderRecentBids() {
  const tbody = document.getElementById("recent-bids-tbody");
  const mlist = document.getElementById("recent-bids-mlist");
  if (!tbody) return;
  const recent = BIDS.slice().sort((a, b) => b.placedAt - a.placedAt).slice(0, 6);
  tbody.innerHTML = recent.map(function (b) {
    const auction = findAuction(b.auctionId);
    const product = auction ? findProduct(auction.productId) : null;
    const user    = findUser(b.userId);
    if (!product || !user) return "";
    return [
      '<tr>',
        '<td><div class="item-cell">',
          '<div class="item-thumb" style="background-image:url(\'' + productImagePath(product.image) + '\')"></div>',
          '<div>' + escapeHtmlAdmin(product.name) + '</div>',
        '</div></td>',
        '<td><div class="user-cell">',
          '<div class="user-avatar">' + (user.username[0] || "?").toUpperCase() + '</div>',
          '<div>' + escapeHtmlAdmin(user.username) + '</div>',
        '</div></td>',
        '<td class="num">' + formatRMFull(b.amount) + '</td>',
        '<td class="text-muted text-sm">' + timeAgo(b.placedAt) + '</td>',
      '</tr>'
    ].join("");
  }).join("");

  /* Mobile cards (parallel render) */
  if (mlist) {
    mlist.innerHTML = recent.map(function (b) {
      const auction = findAuction(b.auctionId);
      const product = auction ? findProduct(auction.productId) : null;
      const user    = findUser(b.userId);
      if (!product || !user) return "";
      return [
        '<div class="m-card">',
          '<div class="m-card-thumb" style="background-image:url(\'' + productImagePath(product.image) + '\')"></div>',
          '<div class="m-card-body">',
            '<div class="m-card-title">' + escapeHtmlAdmin(product.name) + '</div>',
            '<div class="m-card-meta">' + escapeHtmlAdmin(user.username) + ' · <span class="price">' + formatRMFull(b.amount) + '</span></div>',
            '<div class="m-card-meta">' + timeAgo(b.placedAt) + '</div>',
          '</div>',
        '</div>'
      ].join("");
    }).join("");
  }
}

function renderEndingSoon() {
  const host = document.getElementById("ending-soon-list");
  if (!host) return;
  const ending = AUCTIONS
    .filter(a => a.status === "live")
    .sort((a, b) => a.endsAt - b.endsAt)
    .slice(0, 6);
  host.innerHTML = ending.map(function (a) {
    const product = findProduct(a.productId);
    if (!product) return "";
    return [
      '<div class="es-item">',
        '<div class="es-thumb" style="background-image:url(\'' + productImagePath(product.image) + '\')"></div>',
        '<div class="es-body">',
          '<div class="es-title">' + escapeHtmlAdmin(product.name) + '</div>',
          '<div class="es-meta">' + escapeHtmlAdmin(product.category) + ' · ' + formatRMFull(a.currentBid) + '</div>',
        '</div>',
        '<div class="es-time">' + timeLeft(a.endsAt) + '</div>',
      '</div>'
    ].join("");
  }).join("");
}

/* ----------------------------------------------------------
   Generic table renderer (used by Products / Auctions / Orders)
   ---------------------------------------------------------- */

function renderTable(tbodyId, rows) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  tbody.innerHTML = rows.join("");
}

/* ----------------------------------------------------------
   Generic Modal
   ---------------------------------------------------------- */

function openModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.classList.add("is-open");
  document.body.style.overflow = "hidden";
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.classList.remove("is-open");
  document.body.style.overflow = "";
}
function bindModalCloseTriggers(id, dataAttr) {
  const m = document.getElementById(id);
  if (!m) return;
  document.querySelectorAll("[" + dataAttr + "]").forEach(function (b) {
    b.addEventListener("click", function () { closeModal(id); });
  });
  m.addEventListener("click", function (e) {
    if (e.target === m) closeModal(id);
  });
}

/* ----------------------------------------------------------
   Toast (admin pages have their own host since landing.js
   isn't loaded here)
   ---------------------------------------------------------- */

function showToast(message, kind) {
  const host = document.getElementById("toast-host") || document.body;
  const el = document.createElement("div");
  el.className = "toast" + (kind === "success" ? " toast-success" : kind === "danger" ? " toast-danger" : "");
  el.textContent = message;
  host.appendChild(el);
  setTimeout(function () {
    el.style.opacity = "0";
    el.style.transition = "opacity 200ms ease";
    setTimeout(function () { el.remove(); }, 220);
  }, 2800);
}

/* ----------------------------------------------------------
   Helpers
   ---------------------------------------------------------- */

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function escapeHtmlAdmin(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* Status pill helper for tables */
function statusPill(status) {
  if (status === "live")      return '<span class="pill pill-live"><span class="badge-dot"></span>Live</span>';
  if (status === "scheduled") return '<span class="pill pill-scheduled">Scheduled</span>';
  if (status === "ended")     return '<span class="pill pill-ended">Ended</span>';
  if (status === "awaiting_payment") return '<span class="badge badge-warning">Awaiting payment</span>';
  if (status === "paid")      return '<span class="badge badge-info">Paid</span>';
  if (status === "shipped")   return '<span class="badge badge-primary">Shipped</span>';
  if (status === "completed") return '<span class="badge badge-success">Completed</span>';
  if (status === "cancelled") return '<span class="badge badge-danger">Cancelled</span>';
  return '<span class="badge">' + escapeHtmlAdmin(status) + '</span>';
}
