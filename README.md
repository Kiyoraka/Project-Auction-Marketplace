# AuctionHub

Hardcoded vanilla-web auction marketplace prototype. Pure HTML5 + CSS3 + JavaScript ES6 — no framework, no build step, no backend. Designed as a clickable prototype + UI reference for the production build.

---

## Run

Open `index.html` directly in a browser, or serve from the project root:

```bash
# Any one of these works:
npx live-server .
python -m http.server 8000
php -S localhost:8000
```

Then visit `http://localhost:8000/`.

---

## Login (prototype)

| Field | Value |
|---|---|
| Email | `admin@gmail.com` |
| Password | `admin123` |

Session is stored in `localStorage` under `auctionhub_auth` and `auctionhub_user`.
Click logout in the admin sidebar (or clear localStorage in DevTools) to sign out.

---

## Page Map

### Public

| Path | What it is |
|---|---|
| `index.html` | Landing — sticky nav, hero, about, auction grid, contact, login modal, bid modal |

The landing **auto-flips** between desktop and mobile layouts at the **880px** breakpoint. On mobile it switches to **Design 5**: swipeable hero carousel of top 5 live auctions with page dots, simplified text-only nav, and a floating action button (purple gavel) bottom-right that smooth-scrolls to the auction section.

### Admin (login required)

| Path | What it is |
|---|---|
| `admin/dashboard.html` | Main — 4 stat cards + Recent Bids table + Ending Soon list |
| `admin/analytics.html` | Bids-over-time line chart + Top Categories bar + Win Rate donut (Chart.js) |
| `admin/products.html` | Product catalog — filterable table + Add Product modal + delete |
| `admin/auctions.html` | Live / Scheduled / Ended tabs + clickable rows + detail modal with bid history + End Early action |
| `admin/orders.html` | Six status tabs + searchable table + detail modal with buyer info + status timeline |
| `admin/settings.html` | Profile / Payment Gateway (default) / Notifications / Site tabs |

Each admin page uses the same shell (240px sidebar + topbar + page body). On mobile, the sidebar becomes an off-canvas drawer triggered by the hamburger button.

---

## Features

**Landing**
- Single-page anchor scroll (`#home #about #auction #contact`)
- Auction grid renders dynamically from `data.js`, filter chips toggle visibility (All / Live / Ending Soon / New)
- **Login modal** opens from the [Login] nav button or by attempting any action that requires auth
- **Bid modal** opens from any "Place Bid" button or auction card click — guest form (name + phone + address + bid amount), validates amount > current bid, mutates auction in-memory, shows success toast
- Contact form fakes submit with a success toast
- Real-time countdown timers on auction cards (re-paint every 60s)

**Mobile (Design 5)**
- Hero carousel: swipeable (touch), page dots, snap-back if drag is below threshold
- FAB bottom-right smooth-scrolls to `#auction`
- Auto-flip on resize: CSS media queries handle visibility, JS resize listener re-snaps carousel position

**Admin**
- Inline route guard — direct access to any admin page redirects to `index.html` if no session
- Sidebar duplicated per page (no JS includes — pure static)
- All stats, tables, and lists render from `data.js` — no API calls
- Settings persist to `localStorage` under `auctionhub_settings`
- Charts via Chart.js 4.4.1 (CDN)
- Avatars via i.pravatar.cc / placeholder images via picsum.photos

---

## Stack

- HTML5, CSS3, JavaScript ES6 (classic scripts, no modules)
- Chart.js 4.4.1 via jsDelivr CDN (analytics page only)
- Inter + JetBrains Mono via Google Fonts
- Inline SVG icons (Lucide-style) — no icon font dependency

---

## Design Tokens

Defined in `assets/css/shared.css` as CSS custom properties:

| Token | Value |
|---|---|
| `--primary` | `#7C3AED` |
| `--primary-dark` | `#6D28D9` |
| `--text` | `#0F172A` |
| `--bg` | `#F8FAFC` |
| `--surface` | `#FFFFFF` |
| `--success` | `#10B981` |
| `--warning` | `#F59E0B` |
| `--danger` | `#EF4444` |
| Body font | Inter, system-ui |
| Mono font | JetBrains Mono (prices, IDs, timers) |

---

## File Structure

```
auction-marketplace/
├── index.html                  Landing + login modal + bid modal
├── admin/
│   ├── dashboard.html          Main overview
│   ├── analytics.html          Charts (Chart.js)
│   ├── products.html           Filterable table + Add modal
│   ├── auctions.html           Tabs + detail modal
│   ├── orders.html             Tabs + timeline detail
│   └── settings.html           4 tabs incl. Payment Gateway
├── assets/
│   ├── css/
│   │   ├── shared.css          Reset + tokens + buttons + utilities
│   │   ├── landing.css         Public-site styles + mobile carousel + FAB
│   │   └── admin.css           Sidebar + topbar + tables + cards + tabs
│   └── js/
│       ├── auth.js             Hardcoded login + route guard + logout
│       ├── data.js             Mock PRODUCTS/AUCTIONS/BIDS/ORDERS/USERS/STATS + helpers
│       ├── landing.js          Grid render + filters + modals + bid + carousel + FAB
│       ├── admin.js            Shell bootstrap + dashboard renderers + helpers
│       ├── analytics.js        Chart.js initializers (line/bar/donut)
│       └── settings.js         Tab switching + persistence
└── README.md                   This file
```

---

## Browser Support

Modern evergreens (Chrome, Firefox, Safari, Edge) at any release from the last 2 years. Uses CSS custom properties, `aspect-ratio`, `backdrop-filter`, classic `<script>` tags (no modules required).

Tested at 1280px, 1440px desktop and 375px mobile widths. Auto-flip between desktop/mobile fires at the 880px breakpoint without page reload.

---

## Status

Prototype complete. All landing + admin surfaces implemented. Mock data in `data.js` is the only source of truth — connecting to a real backend means swapping the data layer and replacing in-memory mutations (bid placement, product CRUD, settings save) with API calls.
