/* =========================================================
   AuctionHub — Mock Data
   Single source of truth for all hardcoded prototype data.
   Loaded as a classic <script> before any consumer script.
   ========================================================= */

const CATEGORIES = ["Watches", "Art", "Furniture", "Collectibles", "Jewelry"];

const USERS = [
  { id: "u1", username: "jane",   email: "jane@example.com",   avatar: "https://i.pravatar.cc/64?img=47" },
  { id: "u2", username: "ali",    email: "ali@example.com",    avatar: "https://i.pravatar.cc/64?img=12" },
  { id: "u3", username: "tan",    email: "tan@example.com",    avatar: "https://i.pravatar.cc/64?img=33" },
  { id: "u4", username: "lee",    email: "lee@example.com",    avatar: "https://i.pravatar.cc/64?img=58" },
  { id: "u5", username: "sam",    email: "sam@example.com",    avatar: "https://i.pravatar.cc/64?img=68" }
];

const PRODUCTS = [
  { id: "p1",  name: "Rolex GMT-Master II",       category: "Watches",      image: "https://picsum.photos/seed/p1/400/300",  description: "Classic dual-time pilot watch, immaculate condition.",     stock: 1, status: "Listed", startingBid: 500 },
  { id: "p2",  name: "Ming Dynasty Vase",         category: "Art",          image: "https://picsum.photos/seed/p2/400/300",  description: "Authenticated Ming era ceramic, museum-grade.",            stock: 1, status: "Draft",  startingBid: 100 },
  { id: "p3",  name: "Antique Oak Chair Set",     category: "Furniture",    image: "https://picsum.photos/seed/p3/400/300",  description: "Set of four 19th-century English oak dining chairs.",       stock: 4, status: "Listed", startingBid: 50 },
  { id: "p4",  name: "1911 Liberty Coin Set",     category: "Collectibles", image: "https://picsum.photos/seed/p4/400/300",  description: "Complete 1911 Liberty Head silver coin collection.",        stock: 1, status: "Sold",   startingBid: 200 },
  { id: "p5",  name: "Patek Philippe Calatrava",  category: "Watches",      image: "https://picsum.photos/seed/p5/400/300",  description: "Reference 5196 in 18k rose gold with original papers.",     stock: 1, status: "Listed", startingBid: 8000 },
  { id: "p6",  name: "Banksy Original Print",     category: "Art",          image: "https://picsum.photos/seed/p6/400/300",  description: "Signed limited edition print, 64/100, with COA.",           stock: 1, status: "Listed", startingBid: 3500 },
  { id: "p7",  name: "Mid-Century Lounge Chair",  category: "Furniture",    image: "https://picsum.photos/seed/p7/400/300",  description: "Original 1958 Eames lounge chair in walnut and leather.",   stock: 1, status: "Listed", startingBid: 1200 },
  { id: "p8",  name: "Charizard 1st Edition",     category: "Collectibles", image: "https://picsum.photos/seed/p8/400/300",  description: "PSA 9 grade, holographic, 1st edition shadowless.",         stock: 1, status: "Listed", startingBid: 2200 },
  { id: "p9",  name: "Cartier Tank Solo",         category: "Watches",      image: "https://picsum.photos/seed/p9/400/300",  description: "Steel case, leather strap, 2019 model with box.",           stock: 1, status: "Listed", startingBid: 1800 },
  { id: "p10", name: "Picasso Signed Sketch",     category: "Art",          image: "https://picsum.photos/seed/p10/400/300", description: "Pencil sketch, signed lower right, period frame.",           stock: 1, status: "Draft",  startingBid: 12000 },
  { id: "p11", name: "Eames Walnut Stool",        category: "Furniture",    image: "https://picsum.photos/seed/p11/400/300", description: "Iconic time-life walnut stool, original Herman Miller.",    stock: 2, status: "Listed", startingBid: 600 },
  { id: "p12", name: "Marvel Comic Stash 1980s",  category: "Collectibles", image: "https://picsum.photos/seed/p12/400/300", description: "Lot of 24 issues, X-Men, Spider-Man, condition VG-NM.",     stock: 1, status: "Listed", startingBid: 350 },
  { id: "p13", name: "Omega Seamaster Diver",     category: "Watches",      image: "https://picsum.photos/seed/p13/400/300", description: "300m diver, 2021, full set with extended warranty.",         stock: 1, status: "Listed", startingBid: 2400 },
  { id: "p14", name: "Monet Watercolor Study",    category: "Art",          image: "https://picsum.photos/seed/p14/400/300", description: "Attributed watercolor, provenance documented.",              stock: 1, status: "Listed", startingBid: 6500 },
  { id: "p15", name: "Persian Heritage Rug",      category: "Furniture",    image: "https://picsum.photos/seed/p15/400/300", description: "Hand-knotted Tabriz, 200 x 300 cm, 1960s.",                  stock: 1, status: "Listed", startingBid: 900 },
  { id: "p16", name: "Star Wars Vintage Figures", category: "Collectibles", image: "https://picsum.photos/seed/p16/400/300", description: "12-figure 1977-1985 set, all with original weapons.",        stock: 1, status: "Listed", startingBid: 480 },
  { id: "p17", name: "Tudor Black Bay 58",        category: "Watches",      image: "https://picsum.photos/seed/p17/400/300", description: "Burgundy bezel, fabric strap, 2022 unworn.",                 stock: 1, status: "Listed", startingBid: 2900 },
  { id: "p18", name: "Tiffany Sapphire Ring",     category: "Jewelry",      image: "https://picsum.photos/seed/p18/400/300", description: "Platinum band, 2.1ct Ceylon sapphire, certified.",           stock: 1, status: "Listed", startingBid: 4200 },
  { id: "p19", name: "Antique Brass Telescope",   category: "Collectibles", image: "https://picsum.photos/seed/p19/400/300", description: "Victorian-era 4-draw telescope, leather wrapped.",           stock: 1, status: "Sold",   startingBid: 320 },
  { id: "p20", name: "Cartier Love Bracelet",     category: "Jewelry",      image: "https://picsum.photos/seed/p20/400/300", description: "18k rose gold, size 17, with screwdriver and box.",          stock: 1, status: "Listed", startingBid: 5400 }
];

const NOW = Date.now();
const HOUR = 60 * 60 * 1000;
const DAY  = 24 * HOUR;

const AUCTIONS = [
  /* Live */
  { id: "a1",  productId: "p1",  currentBid: 1240, bidCount: 18, startsAt: NOW - 2*DAY,  endsAt: NOW + 2*HOUR + 14*60*1000, status: "live" },
  { id: "a2",  productId: "p2",  currentBid: 240,  bidCount:  7, startsAt: NOW - 1*DAY,  endsAt: NOW + 45*60*1000,           status: "live" },
  { id: "a3",  productId: "p3",  currentBid: 90,   bidCount:  4, startsAt: NOW - 3*DAY,  endsAt: NOW + 6*HOUR,               status: "live" },
  { id: "a4",  productId: "p6",  currentBid: 4800, bidCount: 22, startsAt: NOW - 4*DAY,  endsAt: NOW + 1*DAY + 4*HOUR,       status: "live" },
  { id: "a5",  productId: "p8",  currentBid: 3100, bidCount: 14, startsAt: NOW - 2*DAY,  endsAt: NOW + 3*HOUR,               status: "live" },
  { id: "a6",  productId: "p11", currentBid: 720,  bidCount:  9, startsAt: NOW - 1*DAY,  endsAt: NOW + 18*HOUR,              status: "live" },
  { id: "a7",  productId: "p13", currentBid: 2950, bidCount: 11, startsAt: NOW - 5*DAY,  endsAt: NOW + 12*HOUR,              status: "live" },
  { id: "a8",  productId: "p17", currentBid: 3400, bidCount: 16, startsAt: NOW - 2*DAY,  endsAt: NOW + 9*HOUR,               status: "live" },
  /* Scheduled */
  { id: "a9",  productId: "p5",  currentBid: 8000, bidCount:  0, startsAt: NOW + 2*DAY,  endsAt: NOW + 5*DAY,                status: "scheduled" },
  { id: "a10", productId: "p10", currentBid: 12000,bidCount:  0, startsAt: NOW + 3*DAY,  endsAt: NOW + 7*DAY,                status: "scheduled" },
  { id: "a11", productId: "p14", currentBid: 6500, bidCount:  0, startsAt: NOW + 1*DAY,  endsAt: NOW + 4*DAY,                status: "scheduled" },
  { id: "a12", productId: "p18", currentBid: 4200, bidCount:  0, startsAt: NOW + 5*DAY,  endsAt: NOW + 9*DAY,                status: "scheduled" },
  /* Ended */
  { id: "a13", productId: "p4",  currentBid: 450,  bidCount: 12, startsAt: NOW - 7*DAY,  endsAt: NOW - 1*DAY,                status: "ended" },
  { id: "a14", productId: "p19", currentBid: 380,  bidCount:  6, startsAt: NOW - 8*DAY,  endsAt: NOW - 2*DAY,                status: "ended" },
  { id: "a15", productId: "p9",  currentBid: 2050, bidCount: 13, startsAt: NOW - 6*DAY,  endsAt: NOW - 3*HOUR,               status: "ended" }
];

const BIDS = [
  /* Recent bids on live auctions (newest first via placedAt) */
  { id: "b1",  auctionId: "a2",  userId: "u1", amount: 240,  placedAt: NOW -  2*60*1000 },
  { id: "b2",  auctionId: "a1",  userId: "u2", amount: 1240, placedAt: NOW -  5*60*1000 },
  { id: "b3",  auctionId: "a3",  userId: "u3", amount: 90,   placedAt: NOW - 12*60*1000 },
  { id: "b4",  auctionId: "a4",  userId: "u4", amount: 4800, placedAt: NOW - 18*60*1000 },
  { id: "b5",  auctionId: "a5",  userId: "u5", amount: 3100, placedAt: NOW - 25*60*1000 },
  { id: "b6",  auctionId: "a1",  userId: "u3", amount: 1200, placedAt: NOW - 30*60*1000 },
  { id: "b7",  auctionId: "a8",  userId: "u1", amount: 3400, placedAt: NOW - 42*60*1000 },
  { id: "b8",  auctionId: "a7",  userId: "u2", amount: 2950, placedAt: NOW - 1*HOUR },
  { id: "b9",  auctionId: "a6",  userId: "u4", amount: 720,  placedAt: NOW - 1*HOUR - 20*60*1000 },
  { id: "b10", auctionId: "a4",  userId: "u5", amount: 4500, placedAt: NOW - 2*HOUR },
  /* Earlier bids */
  { id: "b11", auctionId: "a1",  userId: "u4", amount: 1100, placedAt: NOW - 3*HOUR },
  { id: "b12", auctionId: "a2",  userId: "u3", amount: 220,  placedAt: NOW - 4*HOUR },
  { id: "b13", auctionId: "a5",  userId: "u1", amount: 2900, placedAt: NOW - 5*HOUR },
  { id: "b14", auctionId: "a8",  userId: "u3", amount: 3200, placedAt: NOW - 6*HOUR },
  { id: "b15", auctionId: "a6",  userId: "u2", amount: 680,  placedAt: NOW - 8*HOUR },
  /* Ended-auction bids (winners) */
  { id: "b16", auctionId: "a13", userId: "u1", amount: 450,  placedAt: NOW - 1*DAY - 1*HOUR },
  { id: "b17", auctionId: "a14", userId: "u3", amount: 380,  placedAt: NOW - 2*DAY - 2*HOUR },
  { id: "b18", auctionId: "a15", userId: "u2", amount: 2050, placedAt: NOW - 3*HOUR - 30*60*1000 }
];

const ORDERS = [
  {
    id: "1043", auctionId: "a15", winnerId: "u2", total: 2050, status: "awaiting_payment",
    createdAt: NOW - 3*HOUR,
    timeline: [{ at: NOW - 3*HOUR, label: "Auction won" }]
  },
  {
    id: "1042", auctionId: "a13", winnerId: "u1", total: 450,  status: "paid",
    createdAt: NOW - 1*DAY - 1*HOUR,
    timeline: [
      { at: NOW - 1*DAY - 1*HOUR,        label: "Auction won" },
      { at: NOW - 1*DAY - 30*60*1000,    label: "Payment received" }
    ]
  },
  {
    id: "1041", auctionId: "a14", winnerId: "u3", total: 380,  status: "shipped",
    createdAt: NOW - 2*DAY - 2*HOUR,
    timeline: [
      { at: NOW - 2*DAY - 2*HOUR, label: "Auction won" },
      { at: NOW - 2*DAY - 1*HOUR, label: "Payment received" },
      { at: NOW - 1*DAY,          label: "Shipped via Pos Laju (TR4423899MY)" }
    ]
  },
  {
    id: "1040", auctionId: "a13", winnerId: "u4", total: 1200, status: "completed",
    createdAt: NOW - 5*DAY,
    timeline: [
      { at: NOW - 5*DAY, label: "Auction won" },
      { at: NOW - 5*DAY + 2*HOUR, label: "Payment received" },
      { at: NOW - 4*DAY, label: "Shipped" },
      { at: NOW - 2*DAY, label: "Delivered, transaction complete" }
    ]
  },
  {
    id: "1039", auctionId: "a14", winnerId: "u5", total: 880,  status: "completed",
    createdAt: NOW - 6*DAY,
    timeline: [
      { at: NOW - 6*DAY, label: "Auction won" },
      { at: NOW - 6*DAY + 4*HOUR, label: "Payment received" },
      { at: NOW - 5*DAY, label: "Shipped" },
      { at: NOW - 3*DAY, label: "Delivered" }
    ]
  },
  {
    id: "1038", auctionId: "a15", winnerId: "u2", total: 360,  status: "cancelled",
    createdAt: NOW - 7*DAY,
    timeline: [
      { at: NOW - 7*DAY,         label: "Auction won" },
      { at: NOW - 7*DAY + 1*DAY, label: "Cancelled by buyer (refund issued)" }
    ]
  },
  {
    id: "1037", auctionId: "a13", winnerId: "u1", total: 1450, status: "completed",
    createdAt: NOW - 9*DAY,
    timeline: [
      { at: NOW - 9*DAY, label: "Auction won" },
      { at: NOW - 9*DAY + 6*HOUR, label: "Payment received" },
      { at: NOW - 8*DAY, label: "Shipped" },
      { at: NOW - 6*DAY, label: "Delivered" }
    ]
  },
  {
    id: "1036", auctionId: "a14", winnerId: "u3", total: 290,  status: "completed",
    createdAt: NOW - 10*DAY,
    timeline: [
      { at: NOW - 10*DAY, label: "Auction won" },
      { at: NOW - 10*DAY + 3*HOUR, label: "Payment received" },
      { at: NOW - 9*DAY, label: "Shipped" },
      { at: NOW - 7*DAY, label: "Delivered" }
    ]
  },
  {
    id: "1035", auctionId: "a15", winnerId: "u4", total: 740,  status: "shipped",
    createdAt: NOW - 4*DAY,
    timeline: [
      { at: NOW - 4*DAY, label: "Auction won" },
      { at: NOW - 4*DAY + 5*HOUR, label: "Payment received" },
      { at: NOW - 3*DAY, label: "Shipped" }
    ]
  },
  {
    id: "1034", auctionId: "a13", winnerId: "u5", total: 510,  status: "paid",
    createdAt: NOW - 1*DAY - 4*HOUR,
    timeline: [
      { at: NOW - 1*DAY - 4*HOUR, label: "Auction won" },
      { at: NOW - 1*DAY - 2*HOUR, label: "Payment received" }
    ]
  }
];

/* Hardcoded display stats for the Main Dashboard cards
   (independent of array sizes — these are the prototype's headline numbers) */
const STATS = {
  liveAuctions:   12,
  todayBids:      148,
  pendingOrders:  7,
  monthlyRevenue: 23000,

  /* 30-day bid counts for the Analytics line chart */
  bidsOverTime: [
    42, 51, 38, 60, 55, 49, 67, 72, 58, 65,
    71, 80, 76, 68, 84, 91, 79, 86, 95, 88,
    102,98, 110,118,107,124,131,119,135,148
  ],

  /* Top categories for horizontal bar chart */
  topCategories: [
    { name: "Watches",      count: 412 },
    { name: "Art",          count: 286 },
    { name: "Furniture",    count: 174 },
    { name: "Collectibles", count: 138 },
    { name: "Jewelry",      count:  92 }
  ],

  /* Win rate for donut chart */
  winRate: 73
};

/* ---------- Lookup helpers ---------- */
function findProduct(id)  { return PRODUCTS.find(p => p.id === id); }
function findUser(id)     { return USERS.find(u => u.id === id); }
function findAuction(id)  { return AUCTIONS.find(a => a.id === id); }
function findOrder(id)    { return ORDERS.find(o => o.id === id); }
function bidsForAuction(auctionId) {
  return BIDS.filter(b => b.auctionId === auctionId).sort((a,b) => b.placedAt - a.placedAt);
}

/* ---------- Format helpers ---------- */
function formatRM(n) {
  if (n >= 1000) return "RM " + (n/1000).toFixed(n % 1000 === 0 ? 0 : 1) + "k";
  return "RM " + n;
}
function formatRMFull(n) {
  return "RM " + n.toLocaleString("en-MY");
}
function timeLeft(endsAt) {
  const ms = endsAt - Date.now();
  if (ms <= 0) return "Ended";
  const d = Math.floor(ms / DAY);
  const h = Math.floor((ms % DAY) / HOUR);
  const m = Math.floor((ms % HOUR) / (60*1000));
  if (d > 0) return d + "d " + h + "h";
  if (h > 0) return h + "h " + m + "m";
  return m + "m";
}
function timeAgo(when) {
  const ms = Date.now() - when;
  const m = Math.floor(ms / (60*1000));
  if (m < 1)   return "just now";
  if (m < 60)  return m + "m ago";
  const h = Math.floor(m / 60);
  if (h < 24)  return h + "h ago";
  const d = Math.floor(h / 24);
  return d + "d ago";
}
