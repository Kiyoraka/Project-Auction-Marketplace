/* =========================================================
   AuctionHub — Settings page logic
   Tab switching, API key show/hide, save to localStorage,
   restore saved values on load.
   ========================================================= */

const SETTINGS_KEY = "auctionhub_settings";

function initSettingsPage() {
  /* Default email reflects logged-in user */
  if (typeof currentUser === "function") {
    const email = currentUser();
    const profileEmail = document.getElementById("profile-email");
    if (profileEmail) profileEmail.value = email;
  }

  /* Tab switching */
  const tabs = document.getElementById("settings-tabs");
  if (tabs) {
    tabs.addEventListener("click", function (e) {
      const tab = e.target.closest(".tab");
      if (!tab) return;
      const target = tab.getAttribute("data-tab");
      tabs.querySelectorAll(".tab").forEach(t => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      document.querySelectorAll(".tab-pane").forEach(function (pane) {
        pane.classList.toggle("hidden", pane.getAttribute("data-pane") !== target);
      });
    });
  }

  /* API key show/hide toggle */
  const toggleBtn = document.getElementById("toggle-key");
  const keyInput  = document.getElementById("stripe-key");
  if (toggleBtn && keyInput) {
    toggleBtn.addEventListener("click", function () {
      const isPassword = keyInput.type === "password";
      keyInput.type = isPassword ? "text" : "password";
      toggleBtn.textContent = isPassword ? "Hide" : "Show";
    });
  }

  /* Restore saved settings if any */
  restoreSettings();

  /* Save handler */
  const saveBtn = document.getElementById("save-payment");
  if (saveBtn) {
    saveBtn.addEventListener("click", function () {
      const settings = collectPaymentSettings();
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      showToast("Settings saved.", "success");
    });
  }
}

function collectPaymentSettings() {
  const provider = document.querySelector('input[name="provider"]:checked');
  return {
    provider: provider ? provider.value : "stripe",
    apiKey: (document.getElementById("stripe-key") || {}).value || "",
    savedAt: Date.now()
  };
}

function restoreSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return;
    const s = JSON.parse(raw);
    if (s.provider) {
      const radio = document.querySelector('input[name="provider"][value="' + s.provider + '"]');
      if (radio) radio.checked = true;
    }
    if (s.apiKey) {
      const k = document.getElementById("stripe-key");
      if (k) k.value = s.apiKey;
    }
  } catch (e) {
    /* Ignore corrupted settings */
  }
}
