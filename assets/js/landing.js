/* =========================================================
   AuctionHub — Landing Interactivity
   Renders auction grid, handles filter chips, login modal,
   contact form, and login submit. Depends on data.js + auth.js.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  initAuctionGrid();
  initFilterChips();
  initLoginModal();
  initBidModal();
  initContactForm();
  initHeroCarousel();
  initFab();
  reflectAuthState();
});

/* ----------------------------------------------------------
   Auction grid rendering
   ---------------------------------------------------------- */

let activeFilter = "all";

function visibleAuctions() {
  const HOUR_MS = 60 * 60 * 1000;
  const ONE_DAY = 24 * HOUR_MS;
  return AUCTIONS.filter(a => {
    if (activeFilter === "all")    return a.status !== "ended";
    if (activeFilter === "live")   return a.status === "live";
    if (activeFilter === "new")    return (Date.now() - a.startsAt) < 2 * ONE_DAY;
    if (activeFilter === "ending") return a.status === "live" && (a.endsAt - Date.now()) < 12 * HOUR_MS;
    return true;
  });
}

function renderAuctionCard(a) {
  const product = findProduct(a.productId);
  if (!product) return "";

  const statusBadge =
    a.status === "live"
      ? '<span class="badge badge-success ac-status"><span class="badge-dot"></span>Live</span>'
      : a.status === "scheduled"
      ? '<span class="badge badge-info ac-status">Soon</span>'
      : '<span class="badge ac-status">Ended</span>';

  return [
    '<article class="auction-card" data-auction-id="' + a.id + '">',
      '<div class="ac-img" style="background-image:url(\'' + productImagePath(product.image) + '\')">',
        statusBadge,
      '</div>',
      '<div class="ac-body">',
        '<div class="ac-title" title="' + escapeHtml(product.name) + '">' + escapeHtml(product.name) + '</div>',
        '<div class="ac-cat">' + escapeHtml(product.category) + '</div>',
        '<div class="ac-meta">',
          '<div>',
            '<div class="ac-bid-label">Current bid</div>',
            '<div class="price ac-bid">' + formatRMFull(a.currentBid) + '</div>',
          '</div>',
          '<div class="ac-time">' + timeLeft(a.endsAt) + '</div>',
        '</div>',
        '<div class="ac-action">',
          '<button class="btn btn-primary" data-bid="' + a.id + '">' +
            (a.status === "live" ? "Place Bid" : a.status === "scheduled" ? "Watch" : "View") +
          '</button>',
        '</div>',
      '</div>',
    '</article>'
  ].join("");
}

function initAuctionGrid() {
  const grid = document.getElementById("auction-grid");
  if (!grid) return;

  function paint() {
    const list = visibleAuctions();
    if (list.length === 0) {
      grid.innerHTML = '<div class="empty-state">No auctions match this filter right now.</div>';
      return;
    }
    grid.innerHTML = list.map(renderAuctionCard).join("");
  }

  paint();

  /* Bid buttons / card click -> open guest bid form */
  grid.addEventListener("click", function (e) {
    const bidBtn = e.target.closest("[data-bid]");
    if (bidBtn) {
      openBidModal(bidBtn.getAttribute("data-bid"));
      return;
    }
    const card = e.target.closest(".auction-card");
    if (card) openBidModal(card.getAttribute("data-auction-id"));
  });

  /* Re-paint timers every minute so countdowns stay fresh */
  setInterval(paint, 60 * 1000);

  /* Expose for chip handler */
  window.__paintAuctionGrid = paint;
}

function initFilterChips() {
  const host = document.getElementById("filter-chips");
  if (!host) return;

  host.addEventListener("click", function (e) {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    host.querySelectorAll(".chip").forEach(c => c.classList.remove("is-active"));
    chip.classList.add("is-active");
    activeFilter = chip.getAttribute("data-filter");
    if (window.__paintAuctionGrid) window.__paintAuctionGrid();
  });
}

/* ----------------------------------------------------------
   Login Modal
   ---------------------------------------------------------- */

function openLoginModal() {
  /* If already authenticated, skip the modal and go straight in */
  if (isAuthenticated()) {
    location.href = "admin/dashboard.html";
    return;
  }
  const modal = document.getElementById("login-modal");
  if (!modal) return;
  modal.classList.add("is-open");
  document.body.style.overflow = "hidden";
  setTimeout(function () {
    const u = document.getElementById("li-username");
    if (u) u.focus();
  }, 50);
}

function closeLoginModal() {
  const modal = document.getElementById("login-modal");
  if (!modal) return;
  modal.classList.remove("is-open");
  document.body.style.overflow = "";
  const err = document.getElementById("li-error");
  if (err) { err.classList.add("hidden"); err.textContent = ""; }
}

function initLoginModal() {
  /* Open triggers */
  document.querySelectorAll("[data-open-login]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openLoginModal();
    });
  });

  /* Close button */
  document.querySelectorAll("[data-close-login]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      closeLoginModal();
    });
  });

  /* Backdrop click */
  document.querySelectorAll("[data-close-on-backdrop]").forEach(function (bd) {
    bd.addEventListener("click", function (e) {
      if (e.target === bd) closeLoginModal();
    });
  });

  /* Esc key */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLoginModal();
  });

  /* Form submit */
  const form = document.getElementById("login-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const username  = document.getElementById("li-username").value;
      const password  = document.getElementById("li-password").value;
      const remember  = document.getElementById("li-remember").checked;
      const errBox    = document.getElementById("li-error");

      const result = login(username, password, remember);
      if (!result.ok) {
        errBox.textContent = result.error;
        errBox.classList.remove("hidden");
        return;
      }
      errBox.classList.add("hidden");
      location.href = "admin/dashboard.html";
    });
  }
}

/* If already logged in on page load, change Login button to Dashboard */
function reflectAuthState() {
  if (!isAuthenticated()) return;
  document.querySelectorAll("[data-open-login]").forEach(function (btn) {
    btn.textContent = "Dashboard";
  });
}

/* ----------------------------------------------------------
   Bid Modal (guest bid form)
   ---------------------------------------------------------- */

let activeBidAuctionId = null;

function openBidModal(auctionId) {
  const auction = findAuction(auctionId);
  if (!auction) return;
  const product = findProduct(auction.productId);
  if (!product) return;

  activeBidAuctionId = auctionId;
  const minBid = auction.currentBid + 10;

  /* Populate context strip */
  const ctx = document.getElementById("bid-context");
  ctx.innerHTML = [
    '<div class="bid-context-img" style="background-image:url(\'' + productImagePath(product.image) + '\')"></div>',
    '<div class="bid-context-body">',
      '<div class="bid-context-title">' + escapeHtml(product.name) + '</div>',
      '<div class="bid-context-meta">',
        '<div>Current bid: <strong>' + formatRMFull(auction.currentBid) + '</strong></div>',
        '<div>Time left: <strong>' + timeLeft(auction.endsAt) + '</strong></div>',
      '</div>',
    '</div>'
  ].join("");

  /* Reset form, set min amount + help text */
  const form = document.getElementById("bid-form");
  form.reset();
  const amount = document.getElementById("bf-amount");
  amount.min = minBid;
  amount.value = minBid;
  document.getElementById("bf-amount-help").textContent = "Minimum bid: " + formatRMFull(minBid);

  const errBox = document.getElementById("bf-error");
  errBox.classList.add("hidden");
  errBox.textContent = "";

  /* Show modal */
  const modal = document.getElementById("bid-modal");
  modal.classList.add("is-open");
  document.body.style.overflow = "hidden";
  setTimeout(function () {
    document.getElementById("bf-name").focus();
  }, 50);
}

function closeBidModal() {
  const modal = document.getElementById("bid-modal");
  if (!modal) return;
  modal.classList.remove("is-open");
  document.body.style.overflow = "";
  activeBidAuctionId = null;
}

function initBidModal() {
  /* Close button(s) */
  document.querySelectorAll("[data-close-bid]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      closeBidModal();
    });
  });

  /* Backdrop click — already wired by modal-backdrop[data-close-on-backdrop] in initLoginModal,
     but bid-modal has its own backdrop, so wire it the same way */
  const bidBackdrop = document.getElementById("bid-modal");
  if (bidBackdrop) {
    bidBackdrop.addEventListener("click", function (e) {
      if (e.target === bidBackdrop) closeBidModal();
    });
  }

  /* Esc */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeBidModal();
  });

  /* Submit */
  const form = document.getElementById("bid-form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name    = document.getElementById("bf-name").value.trim();
    const phone   = document.getElementById("bf-phone").value.trim();
    const address = document.getElementById("bf-address").value.trim();
    const amount  = parseInt(document.getElementById("bf-amount").value, 10);
    const errBox  = document.getElementById("bf-error");

    if (!name || !phone || !address || !Number.isFinite(amount)) {
      errBox.textContent = "Please fill in every field.";
      errBox.classList.remove("hidden");
      return;
    }

    const auction = findAuction(activeBidAuctionId);
    if (!auction) { closeBidModal(); return; }

    if (amount <= auction.currentBid) {
      errBox.textContent = "Bid must be higher than the current bid (" + formatRMFull(auction.currentBid) + ").";
      errBox.classList.remove("hidden");
      return;
    }

    /* Apply the bid in-memory and re-paint */
    auction.currentBid = amount;
    auction.bidCount  += 1;
    if (window.__paintAuctionGrid) window.__paintAuctionGrid();

    closeBidModal();
    showToast("Bid placed at " + formatRMFull(amount) + ". We'll be in touch, " + name.split(" ")[0] + ".", "success");
  });
}

/* ----------------------------------------------------------
   Contact Form (fake submit -> toast)
   ---------------------------------------------------------- */

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    showToast("Message sent. We'll be in touch soon.", "success");
    form.reset();
  });
}

/* ----------------------------------------------------------
   Mobile Hero Carousel (Design 5)
   Renders ALWAYS (CSS controls visibility). Auto-flips
   between mobile (visible) and desktop (hidden) on resize.
   ---------------------------------------------------------- */

let carouselIndex = 0;
let carouselSlides = [];

function pickFeaturedAuctions() {
  /* Top 5 live auctions by current bid */
  return AUCTIONS
    .filter(a => a.status === "live")
    .sort((a, b) => b.currentBid - a.currentBid)
    .slice(0, 5);
}

function renderCarouselSlide(a, idx, total) {
  const product = findProduct(a.productId);
  if (!product) return "";
  return [
    '<div class="hc-slide" data-slide-index="' + idx + '">',
      '<div class="hc-card">',
        '<div class="hc-img" style="background-image:url(\'' + productImagePath(product.image) + '\')">',
          '<span class="badge badge-success hc-img-status"><span class="badge-dot"></span>Live</span>',
          '<span class="hc-img-counter">' + (idx + 1) + ' / ' + total + '</span>',
        '</div>',
        '<div class="hc-body">',
          '<div class="hc-cat">' + escapeHtml(product.category) + '</div>',
          '<h3 class="hc-title">' + escapeHtml(product.name) + '</h3>',
          '<div class="hc-meta">',
            '<div>',
              '<div class="hc-bid-label">Current bid</div>',
              '<div class="price hc-bid">' + formatRMFull(a.currentBid) + '</div>',
            '</div>',
            '<div class="hc-time">' + timeLeft(a.endsAt) + '</div>',
          '</div>',
          '<button class="btn btn-primary" data-bid="' + a.id + '">Place Bid</button>',
        '</div>',
      '</div>',
    '</div>'
  ].join("");
}

function initHeroCarousel() {
  const track = document.getElementById("hc-track");
  const dotsHost = document.getElementById("hc-dots");
  if (!track || !dotsHost) return;

  carouselSlides = pickFeaturedAuctions();
  if (carouselSlides.length === 0) return;

  /* Render slides */
  track.innerHTML = carouselSlides
    .map((a, i) => renderCarouselSlide(a, i, carouselSlides.length))
    .join("");

  /* Render dots */
  dotsHost.innerHTML = carouselSlides
    .map((_, i) => '<button class="hc-dot' + (i === 0 ? " is-active" : "") +
                   '" data-dot="' + i + '" aria-label="Go to slide ' + (i + 1) + '"></button>')
    .join("");

  /* Dot clicks */
  dotsHost.addEventListener("click", function (e) {
    const dot = e.target.closest(".hc-dot");
    if (!dot) return;
    goToSlide(parseInt(dot.getAttribute("data-dot"), 10));
  });

  /* Bid button on a slide -> open bid modal */
  track.addEventListener("click", function (e) {
    const bidBtn = e.target.closest("[data-bid]");
    if (bidBtn) openBidModal(bidBtn.getAttribute("data-bid"));
  });

  /* Touch swipe */
  let startX = 0;
  let dx = 0;
  let dragging = false;

  track.addEventListener("touchstart", function (e) {
    if (e.touches.length !== 1) return;
    startX = e.touches[0].clientX;
    dx = 0;
    dragging = true;
    track.style.transition = "none";
  }, { passive: true });

  track.addEventListener("touchmove", function (e) {
    if (!dragging) return;
    dx = e.touches[0].clientX - startX;
    const w = track.parentElement.clientWidth;
    const offset = -carouselIndex * w + dx;
    track.style.transform = "translateX(" + offset + "px)";
  }, { passive: true });

  track.addEventListener("touchend", function () {
    if (!dragging) return;
    dragging = false;
    track.style.transition = "";
    const threshold = track.parentElement.clientWidth * 0.18;
    if (dx <= -threshold && carouselIndex < carouselSlides.length - 1) {
      goToSlide(carouselIndex + 1);
    } else if (dx >= threshold && carouselIndex > 0) {
      goToSlide(carouselIndex - 1);
    } else {
      goToSlide(carouselIndex); /* snap back */
    }
  });

  /* Window resize: re-snap to current slide so widths stay aligned
     (handles desktop->mobile->desktop flips and orientation changes) */
  window.addEventListener("resize", debounce(function () {
    goToSlide(carouselIndex);
  }, 100));

  /* Initial position */
  goToSlide(0);
}

function goToSlide(i) {
  const track = document.getElementById("hc-track");
  if (!track || carouselSlides.length === 0) return;
  carouselIndex = Math.max(0, Math.min(i, carouselSlides.length - 1));
  const w = track.parentElement.clientWidth;
  track.style.transform = "translateX(" + (-carouselIndex * w) + "px)";

  /* Update dot active state */
  document.querySelectorAll(".hc-dot").forEach(function (dot, idx) {
    dot.classList.toggle("is-active", idx === carouselIndex);
  });
}

function debounce(fn, wait) {
  let t;
  return function () {
    const args = arguments;
    clearTimeout(t);
    t = setTimeout(function () { fn.apply(null, args); }, wait);
  };
}

/* ----------------------------------------------------------
   Floating Action Button (mobile)
   ---------------------------------------------------------- */

function initFab() {
  const fab = document.getElementById("fab");
  if (!fab) return;
  fab.addEventListener("click", function () {
    const target = document.getElementById("auction");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

/* ----------------------------------------------------------
   Toast helper
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

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
