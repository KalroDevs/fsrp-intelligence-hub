import React, { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const SaccoDashboard = () => {
  // State
  const [scope, setScope] = useState("county");
  const [view, setView] = useState("sacco");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSacco, setActiveSacco] = useState(null);

  // Chart Refs
  const genderRef = useRef(null);
  const membershipRef = useRef(null);
  const depositsRef = useRef(null);
  const loanTypeRef = useRef(null);
  const drawerLoanRef = useRef(null);

  const mainCharts = useRef([]);
  const drawerChart = useRef(null);

  // Dummy Data for Table
  const saccoData = [
    { name: "Green Valley", regNo: "SAC/2026/01", county: "Laikipia", members: "1,240", male: "620", female: "620", shares: "KES 12.4M", deposits: "KES 8.9M" },
    { name: "Nyeri Pride", regNo: "SAC/2026/02", county: "Nyeri", members: "980", male: "490", female: "490", shares: "KES 9.8M", deposits: "KES 7.2M" },
    { name: "Lake View", regNo: "SAC/2026/03", county: "Nakuru", members: "1,150", male: "575", female: "575", shares: "KES 11.5M", deposits: "KES 8.1M" },
    { name: "Meru Rise", regNo: "SAC/2026/04", county: "Meru", members: "760", male: "380", female: "380", shares: "KES 7.6M", deposits: "KES 5.4M" },
  ];

  const openDrawer = (sacco) => {
    setActiveSacco(sacco);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  // Initialize Main Charts
  useEffect(() => {
    Chart.defaults.font.family = "Inter";
    Chart.defaults.color = "#94a3b8";

    // 1. Gender Distribution Chart
    const c1 = new Chart(genderRef.current.getContext("2d"), {
      type: "doughnut",
      data: {
        labels: ["Male", "Female"],
        datasets: [{ data: [50600, 48513], backgroundColor: ["#f59e0b", "#ea580c"], borderWidth: 0, cutout: "75%" }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } } },
    });

    // 2. Membership Retention Chart
    const c2 = new Chart(membershipRef.current.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          { label: "Retention", data: [400000, 450000, 420000, 480000, 500000, 520000, 510000, 580000, 600000, null, null, null], backgroundColor: "#fbbf24", borderWidth: 0, barPercentage: 0.6 },
          { label: "Previous", data: [null, null, null, null, null, null, null, null, 600000, 550000, 560000, 580000], backgroundColor: "#e2e8f0", borderWidth: 0, barPercentage: 0.6 },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10 } } },
          y: { beginAtZero: true, max: 1000000, grid: { color: "#f1f5f9" }, ticks: { stepSize: 200000, font: { size: 10 }, callback: (v) => (v === 0 ? "0" : v === 1000000 ? "1m" : v / 1000 + "k") } },
        },
      },
    });

    // 3. Deposits Chart (Area)
    const ctxDep = depositsRef.current.getContext("2d");
    const gradient = ctxDep.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, "rgba(249, 115, 22, 0.4)");
    gradient.addColorStop(1, "rgba(249, 115, 22, 0.0)");

    const c3 = new Chart(ctxDep, {
      type: "line",
      data: {
        labels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{ label: "Deposits", data: [60, 75, 70, 85, 110, 140, 120, 90, 100, 130, 145, 120, 80], borderColor: "#f97316", backgroundColor: gradient, borderWidth: 2, fill: true, tension: 0.4, pointRadius: 0, pointHoverRadius: 6 }],
      },
      options: {
        responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 9 } } },
          y: { beginAtZero: true, max: 160, grid: { color: "#f1f5f9" }, ticks: { stepSize: 20, font: { size: 9 }, callback: (v) => (v === 0 ? "0" : v === 160 ? "160M" : v + "M") } },
        },
      },
    });

    // 4. Loan Type by County
    const c4 = new Chart(loanTypeRef.current.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["Laikipia", "Kiambu", "Meru"],
        datasets: [
          { label: "Agricultural", data: [200, 120, 80], backgroundColor: "#2e8b57", barThickness: 20, borderRadius: { topLeft: 4, bottomLeft: 4 } },
          { label: "Farm Input", data: [150, 90, 60], backgroundColor: "#5f9ea0", barThickness: 20 },
          { label: "Personal", data: [100, 60, 40], backgroundColor: "#fbbf24", barThickness: 20 },
          { label: "Mortgage", data: [50, 30, 20], backgroundColor: "#334155", barThickness: 20, borderRadius: { topRight: 4, bottomRight: 4 } },
        ],
      },
      options: {
        indexAxis: "y", responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.x} KES M` } } },
        scales: {
          x: { stacked: true, beginAtZero: true, max: 500, grid: { color: "#f1f5f9" }, ticks: { stepSize: 100, font: { size: 10 } }, title: { display: true, text: "Loan value (KES M)", font: { size: 10 }, color: "#94a3b8", padding: { top: 10 } } },
          y: { stacked: true, grid: { display: false }, ticks: { font: { size: 11 }, color: "#334155" } },
        },
      },
    });

    mainCharts.current = [c1, c2, c3, c4];
    return () => mainCharts.current.forEach((c) => c.destroy());
  }, []);

  // Initialize Drawer Chart when opened
  useEffect(() => {
    if (drawerOpen && !drawerChart.current && drawerLoanRef.current) {
      drawerChart.current = new Chart(drawerLoanRef.current.getContext("2d"), {
        type: "doughnut",
        data: {
          labels: ["Agricultural", "Farm Input", "Personal", "Mortgage"],
          datasets: [{ data: [45, 30, 15, 10], backgroundColor: ["#2e8b57", "#5f9ea0", "#fbbf24", "#334155"], borderWidth: 0, cutout: "75%" }],
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } } },
      });
    }
  }, [drawerOpen]);

  const scopeBtnClass = (type) => `px-6 py-1 text-xs font-bold rounded-full transition-colors ${scope === type ? "bg-[#174a32] text-white shadow-sm" : "text-gray-600 hover:bg-gray-200"}`;

  return (
    <div className="text-gray-800 flex flex-col min-h-screen bg-[#f1f5f9] font-sans">
      
      {/* 1. TOP BAR */}
      <div className="bg-gov-bar text-white text-xs py-1.5 px-6 flex justify-between items-center flex-shrink-0 z-[60]">
        <div className="flex items-center space-x-6">
          <span className="flex items-center"><i className="fas fa-landmark mr-2 text-sm text-gray-300"></i> Official Government Portal</span>
          <span className="flex items-center"><i className="fas fa-shield-alt mr-2 text-sm text-gov-gold"></i> Secure Connection</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center border border-gray-600 rounded px-3 py-1 hover:bg-gray-800 transition"><i className="fas fa-eye mr-2"></i> High Contrast</button>
          <button className="flex items-center hover:text-gray-300 transition"><i className="fas fa-globe mr-1.5"></i> English <i className="fas fa-chevron-down ml-1 text-[10px]"></i></button>
          <button className="flex items-center hover:text-gray-300 transition"><i className="fas fa-question-circle mr-1.5"></i> Help Desk</button>
        </div>
      </div>

      {/* 2. LOGO */}
      <div className="bg-white py-4 px-6 flex items-center flex-shrink-0 z-50 shadow-sm border-b border-gray-200">
        <div className="flex items-center mr-4">
          <img
                src="/images/fsrp_logo.jpg"
                alt="FSRP Logo"
                height={60}
                width={70}
              />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">FSRP Kenya Intelligence Hub</h1>
          <h2 className="text-sm font-medium text-gray-500 tracking-wide mt-1">MINISTRY OF AGRICULTURE AND LIVESTOCK DEVELOPMENT</h2>
        </div>
      </div>

      {/* 3. MAIN NAVIGATION */}
      <nav className="bg-main-nav text-white flex-shrink-0 relative z-50 shadow-md">
        <div className="px-6 flex items-center">
          <a href="/" className="flex items-center px-6 py-4 text-sm font-semibold border-b-4 border-gov-gold bg-[#123c28] transition-colors">
            <i className="fas fa-home mr-2 text-lg"></i> Home
          </a>
          <button className="flex items-center px-6 py-4 text-sm font-semibold hover:bg-[#123c28] transition-colors h-full border-b-4 border-transparent hover:border-gov-gold">
            Technologies & Advisories <i className="fas fa-chevron-down ml-2 text-xs"></i>
          </button>
          <button className="flex items-center px-6 py-4 text-sm font-semibold hover:bg-[#123c28] transition-colors h-full border-b-4 border-transparent hover:border-gov-gold">
            Platforms & Services <i className="fas fa-chevron-down ml-2 text-xs"></i>
          </button>
          <button className="flex items-center px-6 py-4 text-sm font-semibold hover:bg-[#123c28] transition-colors h-full border-b-4 border-transparent hover:border-gov-gold">
            Beneficiary Registries <i className="fas fa-chevron-down ml-2 text-xs"></i>
          </button>
        </div>
      </nav>

      {/* DASHBOARD CONTENT */}
      <div className="flex flex-1 overflow-hidden p-4 gap-4 max-w-[1600px] mx-auto w-full">
        
        {/* Left Sidebar */}
        <aside className="w-56 dashboard-sidebar rounded-lg flex flex-col justify-between flex-shrink-0 shadow-sm overflow-hidden">
          <div className="py-4">
            <div className="px-6 py-4 mb-2">
              <h2 className="text-white text-xl font-bold tracking-wide">
                SACCOS <span className="font-normal text-sm block text-gray-300">Dashboard</span>
              </h2>
            </div>
            <nav className="flex flex-col">
              <a href="#" className="nav-link-item flex items-center px-6 py-3 text-sm font-medium"><i className="fas fa-home w-6 text-center mr-2"></i> Home</a>
              <a href="#" className="nav-link-item active flex items-center px-6 py-3 text-sm font-medium"><i className="fas fa-building w-6 text-center mr-2"></i> SACCOS</a>
              <a href="#" className="nav-link-item flex items-center px-6 py-3 text-sm font-medium"><i className="fas fa-file-invoice-dollar w-6 text-center mr-2"></i> SACCO Finance</a>
              <a href="#" className="nav-link-item flex items-center px-6 py-3 text-sm font-medium"><i className="fas fa-box-open w-6 text-center mr-2"></i> SACCO Products</a>
              <a href="#" className="nav-link-item flex items-center px-6 py-3 text-sm font-medium"><i className="fas fa-users w-6 text-center mr-2"></i> Users</a>
            </nav>
          </div>
          <div className="p-4 space-y-2">
            <div className="text-xs text-gray-400 mb-1 px-2">Currently Viewing</div>
            <button onClick={() => setView("fpo")} className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-md transition border ${view === "fpo" ? "text-white bg-emerald-600 border-emerald-600" : "text-gray-300 bg-white/5 border-transparent hover:bg-white/10"}`}>
              <i className="fas fa-users mr-2"></i> FPO Dashboard {view === "fpo" && <i className="fas fa-check-circle ml-1 float-right mt-0.5"></i>}
            </button>
            <button onClick={() => setView("sacco")} className={`w-full text-left px-3 py-2 text-xs font-bold rounded-md transition border ${view === "sacco" ? "text-white bg-[#d97706] border-[#d97706]" : "text-gray-300 bg-white/5 border-transparent hover:bg-white/10"}`}>
              <i className="fas fa-building mr-2"></i> SACCOs Dashboard {view === "sacco" && <i className="fas fa-check-circle ml-1 float-right mt-0.5"></i>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 pb-6 relative">
          
          {/* Top Filters */}
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-800">{view === "sacco" ? "General Overview (SACCOs)" : "General Overview (FPOs)"}</h1>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-2">Current selection</span>
                <span className="text-orange-500 font-medium">{scope === "county" ? "Laikipia" : "Kenya"}</span>
                <i className="fas fa-search ml-2 text-gray-400 cursor-pointer"></i>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 rounded-full p-1 border border-gray-200">
                <button onClick={() => setScope("county")} className={scopeBtnClass("county")}>County</button>
                <button onClick={() => setScope("national")} className={scopeBtnClass("national")}>National</button>
              </div>
              <div className="relative">
                <input type="text" readOnly value={scope === "county" ? "Laikipia" : "Kenya"} className="bg-white border border-gray-300 text-gray-700 rounded-full py-1.5 px-4 pr-16 text-sm focus:outline-none w-48 shadow-sm" />
                <i className="fas fa-sliders-h absolute right-8 top-2.5 text-gray-400 text-xs"></i>
                <i className="fas fa-search absolute right-3 top-2 text-gray-400 text-sm"></i>
              </div>
            </div>
          </div>

          {/* Compare Toggle */}
          <div className="flex justify-end -mb-2">
            <div className="flex items-center bg-orange-100 border border-orange-200 px-3 py-1.5 rounded-md cursor-pointer">
              <span className="text-xs font-bold text-orange-800 mr-2">Compare</span>
              <div className="w-8 h-4 bg-orange-500 rounded-full relative"><div className="w-3 h-3 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div></div>
            </div>
          </div>

          {/* KPI Rows */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { title: "Total SACCOs", value: "1,820" },
              { title: "Total Members", value: "68,220" },
              { title: "Integrated (Automated SACCOs)", value: "630" },
              { title: "Average PAR%", value: "16.9%" }
            ].map((kpi, i) => (
              <div key={i} className="kpi-card flex flex-col justify-between">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">{kpi.title}</span>
                  <i className="fas fa-chart-bar text-gray-400"></i>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-3">{kpi.value}</div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-green-500 flex items-center"><i className="fas fa-caret-up mr-1"></i> 956.9% vs prior month</span>
                  <i className="far fa-clock text-gray-400"></i>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-4">
            {[
              { title: "Deposits (Kes)", value: "12.7B" },
              { title: "Loan Portfolio", value: "2.7B" },
              { title: "Value of matching grant", value: "169m" },
              { title: "Savings", value: "320m" }
            ].map((kpi, i) => (
              <div key={i} className="kpi-card flex flex-col justify-between">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">{kpi.title}</span>
                  <i className="fas fa-chart-bar text-gray-400"></i>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-3">{kpi.value}</div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-green-500 flex items-center"><i className="fas fa-caret-up mr-1"></i> 956.9% vs prior month</span>
                  <i className="far fa-clock text-gray-400"></i>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="chart-card flex flex-col">
              <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                <h3 className="text-lg font-semibold text-gray-800">SACCOS Earnings</h3>
                <div className="flex items-center space-x-2">
                  <select className="custom-select text-xs border border-gray-300 rounded px-2 py-1 bg-white"><option>All</option></select>
                  <div className="bg-green-800 text-white text-[10px] px-2 py-1 rounded flex items-center">
                    <i className="fas fa-lock mr-1"></i> Financials <i className="fas fa-unlock ml-1 opacity-50"></i>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 items-center h-[250px]">
                <div className="w-3/5 h-full relative"><div className="map-container"></div></div>
                <div className="w-2/5 flex flex-col justify-center pl-4">
                  <h4 className="font-bold text-gray-800 mb-2 text-sm">Country<br/>Collection<br/>Map</h4>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center text-xs text-gray-500"><div className="w-8 h-2 bg-[#bfdbfe] mr-2"></div> &lt;50m</div>
                    <div className="flex items-center text-xs text-gray-500"><div className="w-8 h-2 bg-[#60a5fa] mr-2"></div> 50-99m</div>
                    <div className="flex items-center text-xs text-gray-500"><div className="w-8 h-2 bg-[#3b82f6] mr-2"></div> 100-199m</div>
                    <div className="flex items-center text-xs text-gray-500"><div className="w-8 h-2 bg-[#1e3a8a] mr-2"></div> 200m+</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="chart-card flex flex-col">
              <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                <h3 className="text-lg font-semibold text-gray-800">Gender distribution (SACCOs)</h3>
                <select className="custom-select border border-gray-300 rounded px-2 py-1 bg-white"><option>Sep 2026</option></select>
              </div>
              <div className="flex items-center justify-center h-[250px]">
                <div className="relative w-56 h-56">
                  <canvas ref={genderRef}></canvas>
                  <div className="absolute top-6 -left-6 bg-[#334155] text-white text-xs p-2 rounded shadow-lg w-24 z-10">
                    <div className="font-bold">50,600</div><div className="text-[10px] text-gray-300">Male<br/>Laikipia East</div>
                  </div>
                  <div className="absolute bottom-6 -right-6 bg-[#334155] text-white text-xs p-2 rounded shadow-lg w-24 text-right z-10">
                    <div className="font-bold">48,513</div><div className="text-[10px] text-gray-300">Female<br/>Laikipia East</div>
                  </div>
                </div>
                <div className="flex flex-col space-y-8 ml-10">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Male</div>
                    <div className="text-2xl font-bold text-gray-800">50,600</div>
                    <div className="text-xs text-green-500 mt-1"><i className="fas fa-caret-up"></i> 20% vs prior month</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Female</div>
                    <div className="text-2xl font-bold text-gray-800">48,513</div>
                    <div className="text-xs text-green-500 mt-1"><i className="fas fa-caret-up"></i> 10% vs prior month</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="chart-card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Membership <span className="text-sm font-normal text-gray-500">(Retention)</span></h3>
                <select className="custom-select text-xs border border-gray-300 rounded px-2 py-1 bg-white"><option>Laikipia</option></select>
              </div>
              <div className="flex space-x-2 mb-4">
                <button className="bg-gray-800 text-white text-xs px-3 py-1 rounded-full">Member retention</button>
                <button className="text-gray-500 text-xs px-3 py-1 rounded-full hover:bg-gray-100">Active members</button>
              </div>
              <div className="chart-container-md relative h-[220px] w-full"><canvas ref={membershipRef}></canvas></div>
            </div>

            <div className="chart-card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Deposits</h3>
                <div className="flex items-center space-x-2">
                  <select className="custom-select text-xs border border-gray-300 rounded px-2 py-1 bg-white"><option>Laikipia</option></select>
                  <select className="custom-select text-xs border border-gray-300 rounded px-2 py-1 bg-white"><option>Sep 2026</option></select>
                </div>
              </div>
              <div className="flex space-x-2 mb-4 items-center">
                <span className="text-xs text-gray-500 mr-2">Select sub-theme</span>
                <button className="bg-gray-800 text-white text-xs px-3 py-1 rounded-full">Deposits</button>
                <button className="text-gray-500 text-xs px-3 py-1 rounded-full border border-gray-200">Arrears</button>
              </div>
              <div className="chart-container-md relative h-[220px] w-full"><canvas ref={depositsRef}></canvas></div>
            </div>
          </div>

          {/* Charts Row 3 */}
          <div className="chart-card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Loan type by county</h3>
              <div className="flex items-center space-x-2">
                <select className="custom-select text-xs border border-gray-300 rounded px-2 py-1 bg-white"><option>Laikipia</option></select>
                <select className="custom-select text-xs border border-gray-300 rounded px-2 py-1 bg-white"><option>Sep 2026</option></select>
              </div>
            </div>
            <div className="flex space-x-4 mb-4 text-xs font-medium text-gray-600">
              <div className="flex items-center"><div className="w-3 h-3 bg-[#2e8b57] mr-1 rounded-sm"></div> Camel</div>
              <div className="flex items-center"><div className="w-3 h-3 bg-[#5f9ea0] mr-1 rounded-sm"></div> Sorghum</div>
              <div className="flex items-center"><div className="w-3 h-3 bg-[#fbbf24] mr-1 rounded-sm"></div> Beans</div>
              <div className="flex items-center"><div className="w-3 h-3 bg-[#334155] mr-1 rounded-sm"></div> Beef Cattle</div>
            </div>
            <div className="relative h-[200px] w-full"><canvas ref={loanTypeRef}></canvas></div>
          </div>

          {/* Search Table */}
          <div className="chart-card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Search SACCO's</h2>
              <span className="text-xs text-gray-500 italic flex items-center"><i className="fas fa-info-circle mr-1"></i> Click on any row to view detailed SACCO profile</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
              <div className="flex items-center space-x-4">
                <input type="text" placeholder="Search Sacco's" className="custom-select text-sm border border-gray-300 rounded-md pl-3 pr-8 py-1.5 w-48 bg-white focus:outline-none" />
                <select className="custom-select text-sm border border-gray-300 rounded-md px-3 py-1.5 bg-white"><option>Laikipia</option></select>
                <select className="custom-select text-sm border border-gray-300 rounded-md px-3 py-1.5 bg-white"><option>Sep 2026</option></select>
              </div>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-1.5 rounded-md flex items-center transition">Export CSV <i className="fas fa-download ml-2"></i></button>
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-left border-collapse data-table text-sm">
                <thead>
                  <tr>
                    <th className="py-3 px-4">SACCO Name</th>
                    <th className="py-3 px-4">Registration no.</th>
                    <th className="py-3 px-4">County</th>
                    <th className="py-3 px-4 text-right">Members</th>
                    <th className="py-3 px-4 text-right">Male</th>
                    <th className="py-3 px-4 text-right">Female</th>
                    <th className="py-3 px-4 text-right">Shares (Kes)</th>
                    <th className="py-3 px-4 text-right">Deposits (Kes)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 font-medium">
                  {saccoData.map((sacco, idx) => (
                    <tr key={idx} onClick={() => openDrawer(sacco)}>
                      <td className="py-3 px-4 font-bold text-gray-900 flex items-center">{sacco.name} <i className="fas fa-chevron-right text-xs text-gray-300 ml-2"></i></td>
                      <td className="py-3 px-4 text-xs">{sacco.regNo}</td>
                      <td className="py-3 px-4">{sacco.county}</td>
                      <td className="py-3 px-4 text-right">{sacco.members}</td>
                      <td className="py-3 px-4 text-right text-gray-500">{sacco.male}</td>
                      <td className="py-3 px-4 text-right text-gray-500">{sacco.female}</td>
                      <td className="py-3 px-4 text-right text-emerald-600">{sacco.shares}</td>
                      <td className="py-3 px-4 text-right text-emerald-600">{sacco.deposits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

      {/* DRAWER */}
      <div className={`drawer-overlay ${drawerOpen ? "open" : ""}`} onClick={closeDrawer}></div>
      <div className={`side-drawer ${drawerOpen ? "open" : ""}`}>
        <div className="bg-[#174a32] text-white p-6 relative overflow-hidden flex-shrink-0">
          <button onClick={closeDrawer} className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-10"><i className="fas fa-times"></i></button>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white shadow-inner"><i className="fas fa-building text-lg"></i></div>
            <div>
              <span className="text-emerald-300 text-xs font-bold uppercase tracking-wider">{activeSacco?.regNo}</span>
              <h2 className="text-2xl font-bold tracking-tight">{activeSacco?.name}</h2>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-300 mt-2">
            <i className="fas fa-map-marker-alt mr-2 text-emerald-400"></i>
            <span>{activeSacco?.county} County</span>
            <span className="mx-2">•</span>
            <span className="bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded text-xs">Active</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Financial Snapshot</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                <div className="text-[10px] text-gray-500 font-medium mb-1">Total Members</div>
                <div className="text-xl font-bold text-gray-800">{activeSacco?.members}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                <div className="text-[10px] text-gray-500 font-medium mb-1">Loan Portfolio</div>
                <div className="text-xl font-bold text-gray-800">KES 4.2M</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                <div className="text-[10px] text-gray-500 font-medium mb-1">Total Shares</div>
                <div className="text-xl font-bold text-emerald-600">{activeSacco?.shares}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                <div className="text-[10px] text-gray-500 font-medium mb-1">Total Deposits</div>
                <div className="text-xl font-bold text-emerald-600">{activeSacco?.deposits}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Membership Demographics</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Male</span>
              <span className="text-sm font-bold text-gray-900">{activeSacco?.male} (50%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4"><div className="bg-blue-500 h-2 rounded-full" style={{ width: "50%" }}></div></div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Female</span>
              <span className="text-sm font-bold text-gray-900">{activeSacco?.female} (50%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-pink-500 h-2 rounded-full" style={{ width: "50%" }}></div></div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Loan Portfolio Distribution</h3>
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 relative flex-shrink-0"><canvas ref={drawerLoanRef}></canvas></div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-center text-xs"><span className="flex items-center text-gray-600"><div className="w-2 h-2 rounded-full bg-[#2e8b57] mr-2"></div> Agricultural</span><span className="font-bold text-gray-800">45%</span></div>
                <div className="flex justify-between items-center text-xs"><span className="flex items-center text-gray-600"><div className="w-2 h-2 rounded-full bg-[#5f9ea0] mr-2"></div> Farm Input</span><span className="font-bold text-gray-800">30%</span></div>
                <div className="flex justify-between items-center text-xs"><span className="flex items-center text-gray-600"><div className="w-2 h-2 rounded-full bg-[#fbbf24] mr-2"></div> Personal</span><span className="font-bold text-gray-800">15%</span></div>
                <div className="flex justify-between items-center text-xs"><span className="flex items-center text-gray-600"><div className="w-2 h-2 rounded-full bg-[#334155] mr-2"></div> Mortgage</span><span className="font-bold text-gray-800">10%</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-white flex space-x-3 flex-shrink-0">
          <button className="flex-1 py-2.5 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition">View Full Report</button>
          <button className="flex-1 py-2.5 bg-[#174a32] rounded-lg text-sm font-bold text-white hover:bg-[#123c28] transition shadow-md">Contact SACCO</button>
        </div>
      </div>
    </div>
  );
};

export default SaccoDashboard;