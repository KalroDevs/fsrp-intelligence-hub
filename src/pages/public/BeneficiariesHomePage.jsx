import React, { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import "./beneficiaries-home.css";

const BeneficiariesHomePage = ({ lang = "en", onLangChange }) => {
  const [scope, setScope] = useState("national");
  const [view, setView] = useState("sacco");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeBeneficiary, setActiveBeneficiary] = useState(null);

  // Chart refs
  const genderRef = useRef(null);
  const trainingRef = useRef(null);
  const grantsRef = useRef(null);
  const typeRef = useRef(null);
  const chartInstances = useRef([]);

  const beneficiaries = [
    { name: "John Doe", id: "FSRP-2023-001", county: "Laikipia", type: "Smallholder Farmer", grant: "Ksh 25,000", trainings: "4", status: "Active" },
    { name: "Laikipia Youth Agri-Group", id: "FSRP-2023-045", county: "Laikipia", type: "Youth Group", grant: "Ksh 150,000", trainings: "12", status: "Active" },
    { name: "Mary Wanjiku", id: "FSRP-2023-112", county: "Garissa", type: "Smallholder Farmer", grant: "Ksh 30,000", trainings: "3", status: "Active" },
    { name: "Baringo Pastoralist Co-op", id: "FSRP-2023-089", county: "Baringo", type: "Cooperative", grant: "Ksh 450,000", trainings: "25", status: "Pending" },
  ];

  const openDrawer = (b) => { setActiveBeneficiary(b); setDrawerOpen(true); };
  const closeDrawer = () => setDrawerOpen(false);

  useEffect(() => {
    Chart.defaults.font.family = "Inter";
    Chart.defaults.color = "#94a3b8";

    const genderChart = new Chart(genderRef.current.getContext("2d"), {
      type: "doughnut",
      data: {
        labels: ["Female", "Male"],
        datasets: [{ data: [52, 48], backgroundColor: ["#ec4899", "#3b82f6"], borderWidth: 0, cutout: "75%" }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } } },
    });

    const trainingChart = new Chart(trainingRef.current.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["Q1", "Q2", "Q3", "Q4", "Q1", "Q2", "Q3", "Q4"],
        datasets: [{ label: "Farmers Trained", data: [15000, 22000, 28000, 35000, 40000, 45000, 52000, 60000], backgroundColor: "#10b981", borderWidth: 0, barPercentage: 0.6 }],
      },
      options: {
        responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
        scales: { x: { grid: { display: false }, ticks: { font: { size: 10 } } }, y: { beginAtZero: true, grid: { color: "#f1f5f9" }, ticks: { stepSize: 20000, font: { size: 10 }, callback: (v) => (v === 0 ? "0" : v / 1000 + "k") } } },
      },
    });

    const grantsCtx = grantsRef.current.getContext("2d");
    const gradient = grantsCtx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, "rgba(16, 185, 129, 0.4)");
    gradient.addColorStop(1, "rgba(16, 185, 129, 0.0)");
    const grantsChart = new Chart(grantsCtx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{ label: "Beneficiaries Reached (Thousands)", data: [100, 150, 160, 180, 185, 186, 186, 195, 197, 200, 210, 211], borderColor: "#10b981", backgroundColor: gradient, borderWidth: 2, fill: true, tension: 0.4, pointRadius: 0, pointHoverRadius: 6 }],
      },
      options: {
        responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
        scales: { x: { grid: { display: false }, ticks: { font: { size: 9 } } }, y: { beginAtZero: true, max: 150, grid: { color: "#f1f5f9" }, ticks: { stepSize: 30, font: { size: 9 }, callback: (v) => (v === 0 ? "0" : v + "M") } } },
      },
    });

    const typeChart = new Chart(typeRef.current.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["Laikipia", "Garissa", "Baringo"],
        datasets: [
          { label: "Smallholder Farmers", data: [45000, 60000, 35000], backgroundColor: "#2e8b57", barThickness: 20, borderRadius: { topLeft: 4, bottomLeft: 4 } },
          { label: "Pastoralists", data: [15000, 10000, 25000], backgroundColor: "#5f9ea0", barThickness: 20 },
          { label: "Agro-preneurs", data: [8000, 15000, 5000], backgroundColor: "#fbbf24", barThickness: 20 },
          { label: "Vulnerable Groups", data: [12000, 5000, 15000], backgroundColor: "#334155", barThickness: 20, borderRadius: { topRight: 4, bottomRight: 4 } },
        ],
      },
      options: {
        indexAxis: "y", responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.x.toLocaleString()}` } } },
        scales: { x: { stacked: true, beginAtZero: true, max: 100000, grid: { color: "#f1f5f9" }, ticks: { stepSize: 25000, font: { size: 10 } }, title: { display: true, text: "Number of Beneficiaries", font: { size: 10 }, color: "#94a3b8", padding: { top: 10 } } }, y: { stacked: true, grid: { display: false }, ticks: { font: { size: 11 }, color: "#334155" } } },
      },
    });

    chartInstances.current = [genderChart, trainingChart, grantsChart, typeChart];
    return () => chartInstances.current.forEach((c) => c.destroy());
  }, []);

  const isPending = activeBeneficiary?.status?.toLowerCase() === "pending";
  const scopeSearchValue = scope === "county" ? "Laikipia" : "Kenya";

  return (
    <div className="flex flex-col min-h-screen bg-[#f1f5f9] text-gray-800 font-sans">
      
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
      <div className="bg-white py-4 px-6 flex items-center flex-shrink-0 z-50 border-b border-gray-200">
        <div className="flex items-center mr-4">
             <img
                src="/images/fsrp_logo.jpg"
                alt="FSRP Logo"
                height={60}
                width={70}
              />
        </div>
        <div className="flex flex-col">
          <h1 className="text-[1.4rem] font-extrabold text-[#0a3622] leading-tight tracking-tight">FSRP Kenya Intelligence Hub</h1>
          <h2 className="text-[0.8rem] font-medium text-gray-500 tracking-wide mt-0.5">MINISTRY OF AGRICULTURE AND LIVESTOCK DEVELOPMENT</h2>
        </div>
      </div>

      {/* 3. NAVIGATION */}
      <nav className="bg-main-nav text-white flex-shrink-0 relative z-50 shadow-sm">
        <div className="px-6 flex items-center">
          <a href="/" className="flex items-center px-6 py-3.5 text-sm font-semibold border-b-4 border-gov-gold bg-[#123c28] transition-colors">
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
      <div className="flex flex-1 p-4 gap-4 max-w-[1600px] mx-auto w-full">
        
        {/* SIDEBAR */}
        <aside className="w-[220px] dashboard-sidebar rounded-lg flex flex-col justify-between flex-shrink-0 shadow-sm overflow-hidden">
          <div className="py-4">
            <div className="px-5 py-3 mb-2">
              <h2 className="text-white text-lg font-bold tracking-wide">
                Beneficiaries <span className="font-normal text-xs block text-gray-300">Dashboard</span>
              </h2>
            </div>
            <nav className="flex flex-col">
              <a href="#" className="nav-link-item flex items-center px-5 py-2.5 text-sm font-medium"><i className="fas fa-home w-6 text-center mr-2"></i> Home</a>
              <a href="#" className="nav-link-item active flex items-center px-5 py-2.5 text-sm font-medium"><i className="fas fa-users w-6 text-center mr-2"></i> Beneficiaries</a>
              <a href="#" className="nav-link-item flex items-center px-5 py-2.5 text-sm font-medium"><i className="fas fa-hand-holding-usd w-6 text-center mr-2"></i> Grants & Funding</a>
              <a href="#" className="nav-link-item flex items-center px-5 py-2.5 text-sm font-medium"><i className="fas fa-chalkboard-teacher w-6 text-center mr-2"></i> Trainings</a>
              <a href="#" className="nav-link-item flex items-center px-5 py-2.5 text-sm font-medium"><i className="fas fa-file-alt w-6 text-center mr-2"></i> Reports</a>
            </nav>
          </div>
          <div className="p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-wider text-gray-400 mb-2 px-1 font-bold">Currently Viewing</div>
            <button onClick={() => setView("fpo")} className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-md transition border ${view === "fpo" ? "text-white bg-[#10b981] border-[#10b981]" : "text-gray-300 bg-white/5 border-transparent hover:bg-white/10"}`}>
              <i className="fas fa-building mr-2"></i> FPO Dashboard {view === "fpo" && <i className="fas fa-check-circle ml-1 float-right mt-0.5"></i>}
            </button>
            <button onClick={() => setView("sacco")} className={`w-full text-left px-3 py-2 text-xs font-bold rounded-md transition border ${view === "sacco" ? "text-white bg-[#d97706] border-[#d97706]" : "text-gray-300 bg-white/5 border-transparent hover:bg-white/10"}`}>
              <i className="fas fa-users mr-2"></i> Beneficiary Dashboard {view === "sacco" && <i className="fas fa-check-circle ml-1 float-right mt-0.5"></i>}
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col gap-4 overflow-y-auto pr-1">
          
          {/* Top Row */}
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-800">{view === "sacco" ? "Beneficiaries Overview" : "FPO General Overview"}</h1>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-2">Current selection</span>
                <span className="text-orange-500 font-medium">{scope === "county" ? "Laikipia" : "Turkana"}</span>
                <i className="fas fa-search ml-2 text-gray-400 cursor-pointer"></i>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 rounded-full p-1 border border-gray-200">
                <button onClick={() => setScope("county")} className={scope === "county" ? "px-6 py-1 text-xs font-bold rounded-full bg-[#174a32] text-white shadow-sm" : "px-6 py-1 text-xs font-bold rounded-full text-gray-600 hover:bg-gray-200"}>County</button>
                <button onClick={() => setScope("national")} className={scope === "national" ? "px-6 py-1 text-xs font-bold rounded-full bg-[#174a32] text-white shadow-sm" : "px-6 py-1 text-xs font-bold rounded-full text-gray-600 hover:bg-gray-200"}>National</button>
              </div>
              <div className="relative">
                <input type="text" value={scopeSearchValue} readOnly className="bg-white border border-gray-300 text-gray-700 rounded-full py-1.5 px-4 pr-16 text-sm focus:outline-none w-48 shadow-sm" />
                <i className="fas fa-sliders-h absolute right-8 top-2.5 text-gray-400 text-xs"></i>
                <i className="fas fa-search absolute right-3 top-2 text-gray-400 text-sm"></i>
              </div>
            </div>
          </div>

          <div className="flex justify-end -mb-2">
            <div className="flex items-center bg-orange-100 border border-orange-200 px-3 py-1.5 rounded-md cursor-pointer">
              <span className="text-xs font-bold text-orange-800 mr-2">Compare</span>
              <div className="w-8 h-4 bg-orange-500 rounded-full relative"><div className="w-3 h-3 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div></div>
            </div>
          </div>

          {/* KPI Cards Row 1 */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { title: "Total Registered Farmers", value: "1,245,600", change: "12.4% vs prior quarter", icon: "fa-users" },
              { title: "Active Beneficiary Groups", value: "15,340", change: "5.2% vs prior month", icon: "fa-people-group" },
              { title: "Total Grants Disbursed", value: "Ksh 1.2B", change: "8.7% vs prior FY", icon: "fa-hand-holding-usd" },
              { title: "Avg. Grant per Farmer", value: "Ksh 12,500", change: "3.1% vs prior month", icon: "fa-chart-pie" }
            ].map((kpi, idx) => (
              <div key={idx} className="kpi-card flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-gray-600">{kpi.title}</span>
                  <i className={`fas ${kpi.icon} text-gray-400`}></i>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-2">{kpi.value}</div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-green-500 flex items-center"><i className="fas fa-caret-up mr-1"></i> {kpi.change}</span>
                  <i className="far fa-clock text-gray-400"></i>
                </div>
              </div>
            ))}
          </div>

          {/* KPI Cards Row 2 */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { title: "Farmers Trained (TIMPs)", value: "345,200", change: "15.3% vs prior quarter", icon: "fa-chalkboard-teacher" },
              { title: "Female Beneficiaries", value: "52%", change: "2.1% vs prior FY", icon: "fa-female" },
              { title: "Youth Beneficiaries (<35 yrs)", value: "28%", change: "4.5% vs prior FY", icon: "fa-user-graduate" },
              { title: "Active FSRP Counties", value: "32", change: "Fully Operational", icon: "fa-map-marked-alt", noUp: true }
            ].map((kpi, idx) => (
              <div key={idx} className="kpi-card flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-gray-600">{kpi.title}</span>
                  <i className={`fas ${kpi.icon} text-gray-400`}></i>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-2">{kpi.value}</div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className={kpi.noUp ? "text-gray-500" : "text-green-500 flex items-center"}>
                    {!kpi.noUp && <i className="fas fa-caret-up mr-1"></i>} {kpi.change}
                  </span>
                  <i className="far fa-clock text-gray-400"></i>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="chart-card flex flex-col">
              <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                <h3 className="text-base font-semibold text-gray-800">Beneficiary Distribution Map</h3>
                <select className="custom-select text-xs border border-gray-300 rounded px-2 py-1 bg-white"><option>FSRP Counties</option></select>
              </div>
              <div className="flex flex-1 items-center h-[220px]">
                <div className="w-3/5 h-full relative"><div className="map-container"></div></div>
                <div className="w-2/5 flex flex-col justify-center pl-4">
                  <h4 className="font-bold text-gray-800 mb-2 text-sm">Beneficiary<br />Density</h4>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center text-xs text-gray-500"><div className="w-6 h-2 bg-[#bfdbfe] mr-2"></div> &lt; 10k</div>
                    <div className="flex items-center text-xs text-gray-500"><div className="w-6 h-2 bg-[#60a5fa] mr-2"></div> 10k - 50k</div>
                    <div className="flex items-center text-xs text-gray-500"><div className="w-6 h-2 bg-[#3b82f6] mr-2"></div> 50k - 100k</div>
                    <div className="flex items-center text-xs text-gray-500"><div className="w-6 h-2 bg-[#1e3a8a] mr-2"></div> 100k+</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="chart-card flex flex-col">
              <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                <h3 className="text-base font-semibold text-gray-800">Demographic Breakdown</h3>
                <select className="custom-select text-xs border border-gray-300 rounded px-2 py-1 bg-white"><option>FY 2025/26</option></select>
              </div>
              <div className="flex items-center justify-center h-[220px]">
                <div className="relative w-40 h-40">
                  <canvas ref={genderRef}></canvas>
                  <div className="absolute top-0 -left-8 bg-[#334155] text-white text-[10px] p-2 rounded shadow-lg w-20 z-10">
                    <div className="font-bold text-xs">52%</div><div className="text-[9px] text-gray-300">Female</div>
                  </div>
                  <div className="absolute bottom-0 -right-8 bg-[#334155] text-white text-[10px] p-2 rounded shadow-lg w-20 text-right z-10">
                    <div className="font-bold text-xs">48%</div><div className="text-[9px] text-gray-300">Male</div>
                  </div>
                </div>
                <div className="flex flex-col space-y-6 ml-12">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Female Beneficiaries</div>
                    <div className="text-xl font-bold text-gray-800">647,712</div>
                    <div className="text-[10px] text-green-500 mt-1"><i className="fas fa-caret-up"></i> 5% vs prior year</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Male Beneficiaries</div>
                    <div className="text-xl font-bold text-gray-800">597,888</div>
                    <div className="text-[10px] text-green-500 mt-1"><i className="fas fa-caret-up"></i> 3% vs prior year</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="chart-card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-gray-800">Training Rollout <span className="text-xs font-normal text-gray-500">(TIMPs)</span></h3>
                <select className="custom-select text-xs border border-gray-300 rounded px-2 py-1 bg-white"><option>Laikipia</option></select>
              </div>
              <div className="flex space-x-2 mb-4">
                <button className="bg-gray-800 text-white text-[10px] px-3 py-1 rounded-full">Farmers Trained</button>
                <button className="text-gray-500 text-[10px] px-3 py-1 rounded-full hover:bg-gray-100">Cohorts Completed</button>
              </div>
              <div className="chart-container-md"><canvas ref={trainingRef}></canvas></div>
            </div>
            
            <div className="chart-card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-gray-800">Beneficiary Reach</h3>
                <div className="flex items-center space-x-2">
                  <select className="custom-select text-xs border border-gray-300 rounded px-2 py-1 bg-white"><option>Laikipia</option></select>
                  <select className="custom-select text-xs border border-gray-300 rounded px-2 py-1 bg-white"><option>2025/26</option></select>
                </div>
              </div>
              <div className="flex space-x-2 mb-4 items-center">
                <span className="text-[10px] text-gray-500 mr-2">View</span>
                <button className="bg-gray-800 text-white text-[10px] px-3 py-1 rounded-full">Target</button>
                <button className="text-gray-500 text-[10px] px-3 py-1 rounded-full border border-gray-200">Reached</button>
              </div>
              <div className="chart-container-md"><canvas ref={grantsRef}></canvas></div>
            </div>
          </div>

          {/* Charts Row 3 */}
          <div className="chart-card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-semibold text-gray-800">Beneficiary Types by County</h3>
              <select className="custom-select text-xs border border-gray-300 rounded px-2 py-1 bg-white"><option>Top 3 Counties</option></select>
            </div>
            <div className="flex space-x-4 mb-4 text-[10px] font-medium text-gray-600">
              <div className="flex items-center"><div className="w-3 h-3 bg-[#2e8b57] mr-1 rounded-sm"></div> Smallholder Farmers</div>
              <div className="flex items-center"><div className="w-3 h-3 bg-[#5f9ea0] mr-1 rounded-sm"></div> Pastoralists</div>
              <div className="flex items-center"><div className="w-3 h-3 bg-[#fbbf24] mr-1 rounded-sm"></div> Agro-preneurs</div>
              <div className="flex items-center"><div className="w-3 h-3 bg-[#334155] mr-1 rounded-sm"></div> Vulnerable Groups</div>
            </div>
            <div className="relative h-[160px] w-full"><canvas ref={typeRef}></canvas></div>
          </div>

          {/* Data Table */}
          <div className="chart-card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Search Beneficiaries</h2>
              <span className="text-[10px] text-gray-500 italic flex items-center"><i className="fas fa-info-circle mr-1"></i> Click on any row to view detailed beneficiary profile</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-200 mb-4">
              <div className="flex items-center space-x-3">
                <input type="text" placeholder="Search Name / ID..." className="custom-select text-xs border border-gray-300 rounded-md pl-3 pr-8 py-1.5 w-48 bg-white focus:outline-none" />
                <select className="custom-select text-xs border border-gray-300 rounded-md px-3 py-1.5 bg-white"><option>Laikipia</option></select>
                <select className="custom-select text-xs border border-gray-300 rounded-md px-3 py-1.5 bg-white"><option>All Types</option></select>
              </div>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-4 py-1.5 rounded-md flex items-center transition">Export List <i className="fas fa-download ml-2"></i></button>
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-left border-collapse data-table text-sm">
                <thead>
                  <tr>
                    <th className="py-3 px-4">Beneficiary Name / Group</th>
                    <th className="py-3 px-4">ID Number</th>
                    <th className="py-3 px-4">County</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4 text-right">Grant Received (Kes)</th>
                    <th className="py-3 px-4 text-right">Trainings Attended</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 font-medium">
                  {beneficiaries.map((b) => (
                    <tr key={b.id} onClick={() => openDrawer(b)}>
                      <td className="py-3 px-4 font-bold text-gray-900 flex items-center">{b.name} <i className="fas fa-chevron-right text-[10px] text-gray-300 ml-2"></i></td>
                      <td className="py-3 px-4 text-xs">{b.id}</td>
                      <td className="py-3 px-4">{b.county}</td>
                      <td className="py-3 px-4">{b.type}</td>
                      <td className="py-3 px-4 text-right text-emerald-600">{b.grant}</td>
                      <td className="py-3 px-4 text-right">{b.trainings}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={b.status === "Pending" ? "bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs" : "bg-green-100 text-green-700 px-2 py-1 rounded text-xs"}>{b.status}</span>
                      </td>
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
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white shadow-inner"><i className="fas fa-user text-lg"></i></div>
            <div>
              <span className="text-emerald-300 text-xs font-bold uppercase tracking-wider">{activeBeneficiary?.id}</span>
              <h2 className="text-2xl font-bold tracking-tight">{activeBeneficiary?.name}</h2>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-300 mt-2">
            <i className="fas fa-map-marker-alt mr-2 text-emerald-400"></i>
            <span>{activeBeneficiary?.county} County</span>
            <span className="mx-2">•</span>
            <span className="bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded text-xs">{activeBeneficiary?.type}</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Beneficiary Snapshot</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                <div className="text-[10px] text-gray-500 font-medium mb-1">Grant Received</div>
                <div className="text-lg font-bold text-emerald-600">{activeBeneficiary?.grant}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                <div className="text-[10px] text-gray-500 font-medium mb-1">Trainings Attended</div>
                <div className="text-lg font-bold text-gray-800">{activeBeneficiary?.trainings}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                <div className="text-[10px] text-gray-500 font-medium mb-1">Project Status</div>
                <div className={`text-sm font-bold mt-1 ${isPending ? "text-yellow-600" : "text-green-600"}`}>{activeBeneficiary?.status}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                <div className="text-[10px] text-gray-500 font-medium mb-1">Registration Date</div>
                <div className="text-sm font-bold text-gray-800 mt-1">Oct 12, 2023</div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-gray-200 bg-white flex space-x-3 flex-shrink-0">
          <button className="flex-1 py-2.5 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition">Download Profile</button>
          <button className="flex-1 py-2.5 bg-[#174a32] rounded-lg text-sm font-bold text-white hover:bg-[#123c28] transition shadow-md">Contact Beneficiary</button>
        </div>
      </div>
    </div>
  );
};

export default BeneficiariesHomePage;