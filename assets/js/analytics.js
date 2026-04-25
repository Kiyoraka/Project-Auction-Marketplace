/* =========================================================
   AuctionHub — Analytics charts (Chart.js)
   Three charts: bids over time (line), top categories (bar),
   win rate (donut). Uses STATS from data.js.
   ========================================================= */

const PURPLE      = "#7C3AED";
const PURPLE_SOFT = "rgba(124, 58, 237, 0.12)";
const SUCCESS     = "#10B981";
const SUCCESS_BG  = "#D1FAE5";
const TEXT        = "#0F172A";
const TEXT_MUTED  = "#64748B";
const BORDER      = "#E2E8F0";

let chartBids, chartCats, chartWinrate;
let activeRange = 30;

function initAnalytics() {
  if (typeof Chart === "undefined" || typeof STATS === "undefined") return;

  Chart.defaults.font.family = "Inter, system-ui, sans-serif";
  Chart.defaults.color = TEXT_MUTED;
  Chart.defaults.borderColor = BORDER;

  drawBidsChart();
  drawCategoriesChart();
  drawWinRateChart();

  /* Range chip clicks */
  const chips = document.getElementById("range-chips");
  if (chips) {
    chips.addEventListener("click", function (e) {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      chips.querySelectorAll(".chip").forEach(c => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      activeRange = parseInt(chip.getAttribute("data-range"), 10);
      const lbl = document.getElementById("range-label");
      if (lbl) lbl.textContent = activeRange;
      drawBidsChart();
    });
  }
}

function drawBidsChart() {
  const ctx = document.getElementById("chart-bids");
  if (!ctx) return;

  /* Slice STATS.bidsOverTime to the active range (data has 30 points; for 90/365 we tile) */
  const source = STATS.bidsOverTime;
  let data = source.slice(-Math.min(activeRange, source.length));
  if (activeRange > source.length) {
    const reps = Math.ceil(activeRange / source.length);
    data = Array(reps).fill(source).flat().slice(-activeRange);
  }
  const labels = data.map((_, i) => "D" + (i + 1));

  if (chartBids) chartBids.destroy();
  chartBids = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Bids",
        data: data,
        borderColor: PURPLE,
        backgroundColor: PURPLE_SOFT,
        borderWidth: 2,
        fill: true,
        tension: 0.35,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: PURPLE,
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: TEXT,
          titleColor: "#fff",
          bodyColor: "#fff",
          borderColor: TEXT,
          borderWidth: 0,
          padding: 10,
          displayColors: false,
          callbacks: {
            title: (items) => items[0].label,
            label: (ctx) => ctx.parsed.y + " bids"
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            maxRotation: 0,
            autoSkip: true,
            maxTicksLimit: 8
          }
        },
        y: {
          beginAtZero: true,
          grid: { color: BORDER, drawBorder: false },
          ticks: { stepSize: Math.max(20, Math.ceil(Math.max(...data) / 6 / 10) * 10) }
        }
      }
    }
  });
}

function drawCategoriesChart() {
  const ctx = document.getElementById("chart-cats");
  if (!ctx) return;
  const cats = STATS.topCategories;
  if (chartCats) chartCats.destroy();
  chartCats = new Chart(ctx, {
    type: "bar",
    data: {
      labels: cats.map(c => c.name),
      datasets: [{
        label: "Bids",
        data: cats.map(c => c.count),
        backgroundColor: PURPLE,
        borderRadius: 6,
        barThickness: 22
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: "y",
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: TEXT,
          titleColor: "#fff",
          bodyColor: "#fff",
          padding: 10,
          displayColors: false,
          callbacks: { label: (ctx) => ctx.parsed.x + " bids" }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { color: BORDER, drawBorder: false },
          ticks: { precision: 0 }
        },
        y: {
          grid: { display: false },
          ticks: { font: { weight: "600" } }
        }
      }
    }
  });
}

function drawWinRateChart() {
  const ctx = document.getElementById("chart-winrate");
  if (!ctx) return;
  const wr = STATS.winRate;
  if (chartWinrate) chartWinrate.destroy();
  chartWinrate = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Won", "Lost"],
      datasets: [{
        data: [wr, 100 - wr],
        backgroundColor: [PURPLE, SUCCESS_BG],
        borderWidth: 0,
        cutout: "70%"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: TEXT,
          titleColor: "#fff",
          bodyColor: "#fff",
          padding: 10,
          callbacks: {
            label: (ctx) => ctx.label + ": " + ctx.parsed + "%"
          }
        }
      }
    },
    plugins: [{
      id: "centerText",
      afterDraw(chart) {
        const { ctx, chartArea } = chart;
        const cx = (chartArea.left + chartArea.right) / 2;
        const cy = (chartArea.top + chartArea.bottom) / 2;
        ctx.save();
        ctx.fillStyle = TEXT;
        ctx.font = "700 32px Inter, system-ui";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(wr + "%", cx, cy - 6);
        ctx.fillStyle = TEXT_MUTED;
        ctx.font = "500 12px Inter, system-ui";
        ctx.fillText("Win rate", cx, cy + 18);
        ctx.restore();
      }
    }]
  });
}
