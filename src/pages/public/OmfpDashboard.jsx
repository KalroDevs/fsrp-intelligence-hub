import React, { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { useNavigate } from "react-router-dom";

const OmfpDashboard = () => {
  const navigate = useNavigate();
  
  // State
  const [scope, setScope] = useState("county");
  const [selectedCounty, setSelectedCounty] = useState("Laikipia");
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Drawer State
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Chart Refs
  const reachChartRef = useRef(null);
  const valueChainRef = useRef(null);
  const agtechChartRef = useRef(null);
  const geographyChartRef = useRef(null);

  // Thematic Chart Refs
  const thematicAdvisoryRef = useRef(null);
  const thematicMarketRef = useRef(null);
  const thematicFinanceRef = useRef(null);
  const thematicDataRef = useRef(null);

  const chartInstances = useRef([]);

  // Table Data (Expanded to show pagination)
  const recentAdoptions = [
    { id: "OMFP-001", farmer: "Jane Wanjiku", county: "Nakuru", solution: "Digital Advisory", crop: "Maize", status: "Active", gender: "Female", phone: "+254 712 345 678", agritech: "Apollo Agriculture" },
    { id: "OMFP-002", farmer: "Peter Ochieng", county: "Kisumu", solution: "e-Voucher", crop: "Rice", status: "Redeemed", gender: "Male", phone: "+254 723 456 789", agritech: "Agri-Wallet" },
    { id: "OMFP-003", farmer: "Mary Atieno", county: "Siaya", solution: "Weather Insurance", crop: "Beans", status: "Active", gender: "Female", phone: "+254 734 567 890", agritech: "PULA Advisors" },
    { id: "OMFP-004", farmer: "David Kiprop", county: "Uasin Gishu", solution: "Market Linkage", crop: "Wheat", status: "Pending", gender: "Male", phone: "+254 745 678 901", agritech: "Twiga Foods" },
    { id: "OMFP-005", farmer: "Grace Muthoni", county: "Nyeri", solution: "Digital Advisory", crop: "Coffee", status: "Active", gender: "Female", phone: "+254 756 789 012", agritech: "iProcure" },
    { id: "OMFP-006", farmer: "Ali Hassan", county: "Garissa", solution: "Weather Insurance", crop: "Livestock", status: "Active", gender: "Male", phone: "+254 767 890 123", agritech: "Tulaa" },
    { id: "OMFP-007", farmer: "Sarah Chebet", county: "Bungoma", solution: "e-Voucher", crop: "Maize", status: "Redeemed", gender: "Female", phone: "+254 778 901 234", agritech: "Agri-Wallet" },
    { id: "OMFP-008", farmer: "James Mwangi", county: "Laikipia", solution: "Market Linkage", crop: "Livestock", status: "Pending", gender: "Male", phone: "+254 789 012 345", agritech: "Twiga Foods" },
    { id: "OMFP-009", farmer: "Agnes Wairimu", county: "Nakuru", solution: "Digital Advisory", crop: "Maize", status: "Active", gender: "Female", phone: "+254 790 123 456", agritech: "Apollo Agriculture" },
  ];

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = recentAdoptions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(recentAdoptions.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openDrawer = (farmer) => {
    setSelectedFarmer(farmer);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    Chart.defaults.font.family = "Inter, sans-serif";
    Chart.defaults.color = "#64748b";
    const charts = [];

    const createChart = (ref, config) => {
      if (ref.current) charts.push(new Chart(ref.current.getContext("2d"), config));
    };

    // 1. Farmer Reach Trajectory (Line)
    const reachCtx = reachChartRef.current?.getContext("2d");
    if (reachCtx) {
      const reachGradient = reachCtx.createLinearGradient(0, 0, 0, 250);
      reachGradient.addColorStop(0, "rgba(16, 185, 129, 0.3)");
      reachGradient.addColorStop(1, "rgba(16, 185, 129, 0)");
      createChart(reachChartRef, {
        type: "line",
        data: {
          labels: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"],
          datasets: [{ label: "Farmers Reached", data: [0, 160000, 250000, 400000, 600000, 800000, 1000000], borderColor: "#10b981", backgroundColor: reachGradient, fill: true, tension: 0.4, pointRadius: 3, pointBackgroundColor: "#10b981" }],
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: true, grid: { color: "#f1f5f9" }, ticks: { callback: (v) => (v === 0 ? "0" : v / 1000 + "k") } } } },
      });
    }

    // 2. Value Chain Distribution (Doughnut)
    createChart(valueChainRef, {
      type: "doughnut",
      data: {
        labels: ["Maize", "Dairy", "Livestock", "Rice", "Beans", "Others"],
        datasets: [{ data: [25, 20, 15, 10, 10, 20], backgroundColor: ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899", "#94a3b8"], borderWidth: 0, cutout: "70%" }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "right", labels: { boxWidth: 12, font: { size: 10 } } } } },
    });

    // 3. AgTech Partner Growth (Bar)
    createChart(agtechChartRef, {
      type: "bar",
      data: {
        labels: ["2019", "2020", "2023", "2024", "2025"],
        datasets: [{ label: "Active AgTechs", data: [14, 24, 27, 35, 42], backgroundColor: "#0ea5e9", borderRadius: 4, barPercentage: 0.6 }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: true, grid: { color: "#f1f5f9" } } } },
    });

    // 4. County Coverage (Stacked Bar) - FSRP Counties
    createChart(geographyChartRef, {
      type: "bar",
      data: {
        labels: ["Nakuru", "Uasin Gishu", "Trans Nzoia", "Laikipia", "Bungoma"],
        datasets: [
          { label: "Male", data: [45000, 35000, 30000, 25000, 20000], backgroundColor: "#3b82f6", barThickness: 16, borderRadius: { topLeft: 4, bottomLeft: 4 } },
          { label: "Female", data: [55000, 40000, 35000, 30000, 25000], backgroundColor: "#ec4899", barThickness: 16, borderRadius: { topRight: 4, bottomRight: 4 } },
        ],
      },
      options: { indexAxis: "y", responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { stacked: true, beginAtZero: true, max: 120000, grid: { color: "#f1f5f9" }, ticks: { stepSize: 20000, callback: (v) => (v === 0 ? "0" : v / 1000 + "k") } }, y: { stacked: true, grid: { display: false }, ticks: { color: "#334155", font: { weight: "500" } } } } },
    });

    // --- OMFP THEMATIC CHARTS ---

    createChart(thematicAdvisoryRef, {
      type: "bar",
      data: {
        labels: ["Nakuru", "Kisumu", "Uasin Gishu", "Nyeri", "Meru"],
        datasets: [{ label: "Farmers", data: [85000, 62000, 55000, 48000, 42000], backgroundColor: "#10b981", borderRadius: 4, barPercentage: 0.6 }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: true, grid: { color: "#f1f5f9" }, ticks: { callback: (v) => (v === 0 ? "0" : v / 1000 + "k") } } } },
    });

    createChart(thematicMarketRef, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [{ label: "Value", data: [120, 150, 180, 220, 280, 350], borderColor: "#f59e0b", backgroundColor: "rgba(245, 158, 11, 0.1)", fill: true, tension: 0.4, pointRadius: 2 }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: true, grid: { color: "#f1f5f9" }, ticks: { callback: (v) => (v === 0 ? "0" : v + "M") } } } },
    });

    createChart(thematicFinanceRef, {
      type: "doughnut",
      data: {
        labels: ["e-Vouchers", "Insurance", "Loans", "Savings"],
        datasets: [{ data: [45, 25, 20, 10], backgroundColor: ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b"], borderWidth: 0, cutout: "65%" }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { boxWidth: 10, font: { size: 9 } } } } },
    });

    createChart(thematicDataRef, {
      type: "polarArea",
      data: {
        labels: ["Weather", "Yield", "Pest", "Soil"],
        datasets: [{ data: [90, 70, 85, 60], backgroundColor: ["rgba(14, 165, 233, 0.7)", "rgba(16, 185, 129, 0.7)", "rgba(245, 158, 11, 0.7)", "rgba(139, 92, 246, 0.7)"], borderWidth: 0 }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "right", labels: { boxWidth: 10, font: { size: 10 } } } }, scales: { r: { grid: { color: "#f1f5f9" }, ticks: { display: false } } } },
    });

    chartInstances.current = charts;
    return () => chartInstances.current.forEach((c) => c.destroy());
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-800 font-sans flex flex-col relative overflow-hidden">
      
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-[#0f2e1e] text-white text-xs py-1.5 px-6 flex justify-between items-center flex-shrink-0 z-[60]">
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

      {/* 2. LOGO HEADER */}
      <div className="bg-white py-4 px-6 flex items-center flex-shrink-0 z-50 border-b border-gray-200">
        <div className="flex items-center mr-4">
          <img src="/images/fsrp_logo.jpg" alt="FSRP Logo" width={56} height={56} className="object-contain" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-[1.4rem] font-extrabold text-[#0a3622] leading-tight tracking-tight">FSRP Kenya Intelligence Hub</h1>
          <h2 className="text-[0.8rem] font-medium text-gray-500 tracking-wide mt-0.5">MINISTRY OF AGRICULTURE AND LIVESTOCK DEVELOPMENT</h2>
        </div>
      </div>

      {/* 3. MAIN NAVIGATION */}
      <nav className="bg-[#174a32] text-white flex-shrink-0 relative z-50 shadow-sm">
        <div className="px-6 flex items-center">
          <a href="#" className="flex items-center px-6 py-3.5 text-sm font-semibold border-b-4 border-gov-gold bg-[#123c28] transition-colors">
            <i className="fas fa-home mr-2 text-base"></i> Home
          </a>
          <button className="flex items-center px-6 py-3.5 text-sm font-semibold hover:bg-[#123c28] transition-colors h-full border-b-4 border-transparent hover:border-gov-gold">
            Technologies & Advisories <i className="fas fa-chevron-down ml-2 text-[10px]"></i>
          </button>
          <button className="flex items-center px-6 py-3.5 text-sm font-semibold hover:bg-[#123c28] transition-colors h-full border-b-4 border-transparent hover:border-gov-gold">
            Platforms & Services <i className="fas fa-chevron-down ml-2 text-[10px]"></i>
          </button>
          <button className="flex items-center px-6 py-3.5 text-sm font-semibold hover:bg-[#123c28] transition-colors h-full border-b-4 border-transparent hover:border-gov-gold">
            Beneficiary Registries <i className="fas fa-chevron-down ml-2 text-[10px]"></i>
          </button>
        </div>
      </nav>

      {/* DASHBOARD CONTENT */}
      <div className="flex flex-1 p-4 gap-4 max-w-[1600px] mx-auto w-full overflow-hidden">
        
        {/* Left Sidebar */}
        <aside className="w-[220px] dashboard-sidebar rounded-lg flex flex-col justify-between flex-shrink-0 shadow-sm overflow-hidden">
          <div className="py-4">
            <div className="px-5 py-3 mb-2">
              <h2 className="text-white text-lg font-bold tracking-wide">
                OMFP <span className="font-normal text-xs block text-gray-300">Dashboard</span>
              </h2>
            </div>
            <nav className="flex flex-col">
              <a href="#" className="nav-link-item flex items-center px-5 py-2.5 text-sm font-medium">
                <i className="fas fa-home w-6 text-center mr-2"></i> Home
              </a>
              <a href="#" className="nav-link-item active flex items-center px-5 py-2.5 text-sm font-medium border-l-4 border-[#f59e0b] bg-white/10 text-white">
                <i className="fas fa-users w-6 text-center mr-2"></i> OMFP
              </a>
              <a href="#" className="nav-link-item flex items-center px-5 py-2.5 text-sm font-medium">
                <i className="fas fa-handshake w-6 text-center mr-2"></i> List of Agritechs
              </a>
              <a href="#" className="nav-link-item flex items-center px-5 py-2.5 text-sm font-medium">
                <i className="fas fa-layer-group w-6 text-center mr-2"></i> Thematic Areas
              </a>
              <a href="#" className="nav-link-item flex items-center px-5 py-2.5 text-sm font-medium">
                <i className="fas fa-map-marked-alt w-6 text-center mr-2"></i> Counties
              </a>
            </nav>
          </div>
          
          <div className="p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-wider text-gray-400 mb-1 px-1 font-bold">Switch Dashboard</div>
            <button onClick={() => navigate('/cooperatives/home')} className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-300 bg-white/5 rounded-md hover:bg-white/10 transition border border-transparent">
              <i className="fas fa-building mr-2"></i> SACCO Dashboard
            </button>
            <button onClick={() => navigate('/beneficiaries/home')} className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-300 bg-white/5 rounded-md hover:bg-white/10 transition border border-transparent">
              <i className="fas fa-user-check mr-2"></i> Beneficiaries
            </button>
            <button className="w-full text-left px-3 py-2 text-xs font-bold text-white bg-[#d97706] rounded-md shadow-sm">
              <i className="fas fa-users mr-2"></i> OMFP Dashboard <i className="fas fa-check-circle ml-1 float-right mt-0.5"></i>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-4 overflow-y-auto pr-1 pb-6 relative">
          
          {/* Top Bar: Title & Filters */}
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-800">General Overview (OMFP)</h1>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-2">Current selection</span>
                <span className="text-orange-500 font-medium">{scope === "county" ? selectedCounty : "Kenya"}</span>
                <i className="fas fa-search ml-2 text-gray-400 cursor-pointer"></i>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 rounded-full p-1 border border-gray-200">
                <button onClick={() => setScope("county")} className={scope === "county" ? "px-6 py-1 text-xs font-bold rounded-full bg-[#174a32] text-white shadow-sm" : "px-6 py-1 text-xs font-bold rounded-full text-gray-600 hover:bg-gray-200"}>County</button>
                <button onClick={() => setScope("national")} className={scope === "national" ? "px-6 py-1 text-xs font-bold rounded-full bg-[#174a32] text-white shadow-sm" : "px-6 py-1 text-xs font-bold rounded-full text-gray-600 hover:bg-gray-200"}>National</button>
              </div>
              
              {/* Filter Dropdown */}
              <div className="relative">
                <div 
                  className="flex items-center bg-white border border-gray-300 rounded-full py-1.5 px-4 pr-10 text-sm cursor-pointer shadow-sm w-48 justify-between"
                  onClick={() => setFilterOpen(!filterOpen)}
                >
                  <span className="text-gray-700">{scope === "county" ? selectedCounty : "All Kenya"}</span>
                  <div className="flex items-center gap-2 absolute right-3 text-gray-400">
                    <i className="fas fa-sliders-h text-xs"></i>
                    <i className="fas fa-search text-sm"></i>
                  </div>
                </div>
                {filterOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                    <div className="p-2 space-y-1">
                      {["Laikipia", "Nakuru", "Uasin Gishu", "Trans Nzoia", "Kisumu"].map((county) => (
                        <div 
                          key={county} 
                          onClick={() => { setSelectedCounty(county); setScope("county"); setFilterOpen(false); }}
                          className={`px-3 py-1.5 text-sm rounded cursor-pointer ${selectedCounty === county ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                        >
                          {county} County
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
              { title: "Active AgTechs", value: "27" },
              { title: "Counties Covered", value: "13" },
              { title: "Digital Solutions", value: "12" },
              { title: "Adoption Rate", value: "43%" }
            ].map((kpi, idx) => (
              <div key={idx} className="kpi-card flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-gray-600">{kpi.title}</span>
                  <i className="fas fa-chart-line text-gray-400"></i>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-2">{kpi.value}</div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-green-500 flex items-center"><i className="fas fa-caret-up mr-1"></i> Upward Trend</span>
                  <i className="far fa-clock text-gray-400"></i>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-4">
            {[
              { title: "Total Reached", value: "400k+" },
              { title: "Total Sensitized", value: "1.2M" },
              { title: "Value Chains", value: "19" },
              { title: "Digitized Practices", value: "650" }
            ].map((kpi, idx) => (
              <div key={idx} className="kpi-card flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-gray-600">{kpi.title}</span>
                  <i className="fas fa-chart-pie text-gray-400"></i>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-2">{kpi.value}</div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-green-500 flex items-center"><i className="fas fa-caret-up mr-1"></i> On Track</span>
                  <i className="far fa-clock text-gray-400"></i>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="chart-card flex flex-col">
              <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                <h3 className="text-base font-semibold text-gray-800">Farmer Reach Trajectory</h3>
                <select className="custom-select text-xs border border-gray-300 rounded px-2 py-1 bg-white"><option>2019 - 2025</option></select>
              </div>
              <div className="h-[220px] w-full relative"><canvas ref={reachChartRef}></canvas></div>
            </div>

            <div className="chart-card flex flex-col">
              <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                <h3 className="text-base font-semibold text-gray-800">Value Chain Distribution</h3>
                <select className="custom-select text-xs border border-gray-300 rounded px-2 py-1 bg-white"><option>Current</option></select>
              </div>
              <div className="flex items-center justify-center h-[220px] w-full relative"><canvas ref={valueChainRef}></canvas></div>
            </div>
          </div>

          {/* Charts Row 2: Thematic Areas */}
          <div className="grid grid-cols-4 gap-4 mt-2">
            <div className="chart-card flex flex-col">
              <h3 className="text-sm font-semibold text-gray-800 mb-3 h-8">Advisory & Info</h3>
              <div className="h-[140px] w-full relative"><canvas ref={thematicAdvisoryRef}></canvas></div>
            </div>
            <div className="chart-card flex flex-col">
              <h3 className="text-sm font-semibold text-gray-800 mb-3 h-8">Market Linkages</h3>
              <div className="h-[140px] w-full relative"><canvas ref={thematicMarketRef}></canvas></div>
            </div>
            <div className="chart-card flex flex-col">
              <h3 className="text-sm font-semibold text-gray-800 mb-3 h-8">Financial Inclusion</h3>
              <div className="h-[140px] w-full relative"><canvas ref={thematicFinanceRef}></canvas></div>
            </div>
            <div className="chart-card flex flex-col">
              <h3 className="text-sm font-semibold text-gray-800 mb-3 h-8">Data Analytics</h3>
              <div className="h-[140px] w-full relative"><canvas ref={thematicDataRef}></canvas></div>
            </div>
          </div>

          {/* Charts Row 3 */}
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="chart-card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-gray-800">AgTech Growth</h3>
                <select className="custom-select text-xs border border-gray-300 rounded px-2 py-1 bg-white"><option>Active Partners</option></select>
              </div>
              <div className="h-[160px] w-full relative"><canvas ref={agtechChartRef}></canvas></div>
            </div>

            <div className="chart-card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-gray-800">Top FSRP Counties</h3>
                <div className="flex gap-3 text-[10px] text-gray-600">
                  <div className="flex items-center"><div className="w-2.5 h-2.5 bg-[#3b82f6] mr-1 rounded-sm"></div> Male</div>
                  <div className="flex items-center"><div className="w-2.5 h-2.5 bg-[#ec4899] mr-1 rounded-sm"></div> Female</div>
                </div>
              </div>
              <div className="h-[160px] w-full relative"><canvas ref={geographyChartRef}></canvas></div>
            </div>
          </div>

          {/* Search Table */}
          <div className="chart-card mt-2 mb-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Recent Farmer Onboardings</h2>
              <span className="text-[10px] text-gray-500 italic flex items-center"><i className="fas fa-info-circle mr-1"></i> Click on any row to view detailed farmer profile</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-200 mb-4">
              <div className="flex items-center space-x-3">
                <input type="text" placeholder="Search..." className="custom-select text-xs border border-gray-300 rounded-md pl-3 pr-8 py-1.5 w-48 bg-white focus:outline-none" />
                <select className="custom-select text-xs border border-gray-300 rounded-md px-3 py-1.5 bg-white"><option>All Counties</option></select>
                <select className="custom-select text-xs border border-gray-300 rounded-md px-3 py-1.5 bg-white"><option>All Statuses</option></select>
              </div>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-4 py-1.5 rounded-md flex items-center transition">Export CSV <i className="fas fa-download ml-2"></i></button>
            </div>
            
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-left border-collapse data-table text-sm">
                <thead>
                  <tr>
                    <th className="py-3 px-4">Farmer ID</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">County</th>
                    <th className="py-3 px-4">Agritech Partner</th>
                    <th className="py-3 px-4">Solution</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 font-medium">
                  {currentItems.map((row, idx) => (
                    <tr key={idx} onClick={() => openDrawer(row)}>
                      <td className="py-3 px-4 font-mono text-xs text-gray-500 flex items-center">{row.id} <i className="fas fa-chevron-right text-[10px] text-gray-300 ml-2"></i></td>
                      <td className="py-3 px-4 font-bold text-gray-900">{row.farmer}</td>
                      <td className="py-3 px-4">{row.county}</td>
                      <td className="py-3 px-4 font-semibold text-[#0ea5e9]">{row.agritech}</td>
                      <td className="py-3 px-4"><span className="bg-sky-50 text-sky-700 px-2 py-1 rounded text-xs font-semibold border border-sky-100">{row.solution}</span></td>
                      <td className="py-3 px-4 text-right">
                        <span className={`text-[11px] font-bold px-2 py-1 rounded ${
                          row.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 
                          row.status === 'Redeemed' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                        }`}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-500">
                Showing <span className="font-bold text-gray-800">{indexOfFirstItem + 1}</span> to <span className="font-bold text-gray-800">{Math.min(indexOfLastItem, recentAdoptions.length)}</span> of <span className="font-bold text-gray-800">{recentAdoptions.length}</span> entries
              </span>
              <div className="flex space-x-1">
                <button 
                  onClick={() => paginate(currentPage - 1)} 
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3 py-1 border rounded text-xs font-medium transition ${
                      currentPage === number 
                        ? 'bg-[#174a32] text-white border-[#174a32]' 
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {number}
                  </button>
                ))}

                <button 
                  onClick={() => paginate(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* RIGHT SIDE PANEL (DRAWER) */}
      <div className={`drawer-overlay ${drawerOpen ? "open" : ""}`} onClick={closeDrawer}></div>
      <div className={`side-drawer ${drawerOpen ? "open" : ""}`}>
        <div className="bg-[#174a32] text-white p-6 relative overflow-hidden flex-shrink-0">
          <button onClick={closeDrawer} className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-10"><i className="fas fa-times"></i></button>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white shadow-inner"><i className="fas fa-user text-lg"></i></div>
            <div>
              <span className="text-emerald-300 text-xs font-bold uppercase tracking-wider">{selectedFarmer?.id}</span>
              <h2 className="text-2xl font-bold tracking-tight">{selectedFarmer?.farmer}</h2>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-300 mt-2">
            <i className="fas fa-map-marker-alt mr-2 text-emerald-400"></i>
            <span>{selectedFarmer?.county} County</span>
            <span className="mx-2">•</span>
            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${selectedFarmer?.status === 'Active' ? 'bg-emerald-800 text-emerald-200' : 'bg-amber-800 text-amber-200'}`}>
              {selectedFarmer?.status}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Farmer Snapshot</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                <div className="text-[10px] text-gray-500 font-medium mb-1">Gender</div>
                <div className="text-sm font-bold text-gray-800">{selectedFarmer?.gender}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                <div className="text-[10px] text-gray-500 font-medium mb-1">Value Chain</div>
                <div className="text-sm font-bold text-gray-800">{selectedFarmer?.crop}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm col-span-2">
                <div className="text-[10px] text-gray-500 font-medium mb-1">Agritech Partner</div>
                <div className="text-sm font-bold text-sky-700">{selectedFarmer?.agritech}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm col-span-2">
                <div className="text-[10px] text-gray-500 font-medium mb-1">Solution Used</div>
                <div className="text-sm font-bold text-emerald-600">{selectedFarmer?.solution}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Contact Information</h3>
            <div className="flex items-center text-sm text-gray-700 mb-2">
              <i className="fas fa-phone-alt w-6 text-gray-400"></i> {selectedFarmer?.phone}
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <i className="fas fa-envelope w-6 text-gray-400"></i> {selectedFarmer?.farmer.replace(" ", ".").toLowerCase()}@example.com
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-white flex space-x-3 flex-shrink-0">
          <button className="flex-1 py-2.5 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition">Export Profile</button>
          <button className="flex-1 py-2.5 bg-[#174a32] rounded-lg text-sm font-bold text-white hover:bg-[#123c28] transition shadow-md">Send Message</button>
        </div>
      </div>

    </div>
  );
};

export default OmfpDashboard;