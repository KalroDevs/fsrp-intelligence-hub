import React, { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const CooperativesHomePage = () => {
  // State for toggles
  const [scope, setScope] = useState("county");
  const [view, setView] = useState("saccos");
  const [selectedCounty, setSelectedCounty] = useState("Nakuru");

  // Chart Refs
  const fpoGenderRef = useRef(null);
  const saccoGenderRef = useRef(null);
  const fpoBarRef = useRef(null);
  const saccoBarRef = useRef(null);
  const fpoAgeRef = useRef(null);
  const saccoAgeRef = useRef(null);
  const chartInstances = useRef([]);

  // Data Store for the sidebar list
  const dataStore = {
    county: {
      saccos: {
        subtitle: "(Earnings - SACCOS)",
        listTitle: `Best Performing Sub-Counties (${selectedCounty})`,
        list: [
          { name: "Nakuru Town East", val: "Ksh 120m", badge: "12" },
          { name: "Naivasha", val: "Ksh 95m", badge: "8" },
          { name: "Gilgil", val: "Ksh 45m", badge: "6" },
        ],
      },
      fpos: {
        subtitle: "(Earnings - FPOs)",
        listTitle: `Best Performing Sub-Counties (${selectedCounty})`,
        list: [
          { name: "Bahati", val: "Ksh 45m", badge: "5" },
          { name: "Rongai", val: "Ksh 30m", badge: "4" },
          { name: "Subukia", val: "Ksh 18m", badge: "3" },
        ],
      },
    },
    national: {
      saccos: {
        subtitle: "(Earnings - SACCOS)",
        listTitle: "Best Performing Counties (FSRP)",
        list: [
          { name: "Nairobi", val: "Ksh 520m", badge: "47" },
          { name: "Kiambu", val: "Ksh 380m", badge: "22" },
          { name: "Nakuru", val: "Ksh 310m", badge: "32" },
        ],
      },
      fpos: {
        subtitle: "(Earnings - FPOs)",
        listTitle: "Best Performing Counties (FSRP)",
        list: [
          { name: "Kakamega", val: "Ksh 210m", badge: "18" },
          { name: "Meru", val: "Ksh 180m", badge: "25" },
          { name: "Trans Nzoia", val: "Ksh 150m", badge: "14" },
        ],
      },
    },
  };

  const currentData = dataStore[scope][view];

  // Initialize all 6 charts
  useEffect(() => {
    Chart.defaults.font.family = "Inter";
    Chart.defaults.color = "#64748b";

    // Custom Plugin for Age Charts
    const valueLabelPlugin = {
      id: "valueLabel",
      afterDatasetsDraw(chart) {
        const { ctx } = chart;
        ctx.save();
        const meta = chart.getDatasetMeta(0);
        meta.data.forEach((bar, index) => {
          const data = chart.data.datasets[0].data[index];
          const formattedData = data.toLocaleString("en-US");
          ctx.fillStyle = "#334155";
          ctx.font = "500 11px Inter";
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom";
          ctx.fillText(formattedData, bar.x, bar.y - 5);
        });
        ctx.restore();
      },
    };

    const c1 = new Chart(fpoGenderRef.current.getContext("2d"), {
      type: "doughnut",
      data: {
        labels: ["Male", "Female"],
        datasets: [{ data: [50600, 48513], backgroundColor: ["#fbbf24", "#f97316"], borderWidth: 0, cutout: "70%" }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } } },
    });

    const c2 = new Chart(saccoGenderRef.current.getContext("2d"), {
      type: "doughnut",
      data: {
        labels: ["Male", "Female"],
        datasets: [{ data: [30100, 38456], backgroundColor: ["#fcd34d", "#ef4444"], borderWidth: 0, cutout: "70%" }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } } },
    });

    const c3 = new Chart(fpoBarRef.current.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["Transzoia", "Kiambu", "Muranga", "Kakamega", "Meru", "Kitul", "Kisumu"],
        datasets: [{ data: [150000, 220000, 180000, 250000, 300000, 130000, 120000], backgroundColor: "#f97316", borderRadius: 4, barThickness: 10 }],
      },
      options: { indexAxis: "y", responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false, max: 500000 }, y: { display: false } } },
    });

    const c4 = new Chart(saccoBarRef.current.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["Transzoia", "Kiambu", "Muranga", "Kakamega", "Meru", "Kitul", "Kisumu"],
        datasets: [{ data: [250000, 200000, 280000, 320000, 260000, 210000, 380000], backgroundColor: "#fbbf24", borderRadius: 4, barThickness: 10 }],
      },
      options: { indexAxis: "y", responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false, max: 500000 }, y: { display: false } } },
    });

    const ageOptions = {
      responsive: true, maintainAspectRatio: false, layout: { padding: { top: 25 } },
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, title: { display: true, text: "Age", color: "#94a3b8", font: { size: 11 } }, ticks: { color: "#64748b", font: { size: 10 } } },
        y: { beginAtZero: true, max: 20000, grid: { color: "#e2e8f0" }, ticks: { stepSize: 5000, color: "#64748b", font: { size: 10 }, callback: (val) => (val === 0 ? "0" : val / 1000 + "k") } },
      },
    };

    const c5 = new Chart(fpoAgeRef.current.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["18-24", "25-34", "35-44", "45-54", "55-64", "65-74", "75+"],
        datasets: [{ data: [5400, 15000, 17000, 12800, 7200, 2300, 607], backgroundColor: "#ff6b35", borderWidth: 0, barPercentage: 0.6 }],
      },
      options: ageOptions,
      plugins: [valueLabelPlugin],
    });

    const c6 = new Chart(saccoAgeRef.current.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["18-24", "25-34", "35-44", "45-54", "55-64", "65-74", "75+"],
        datasets: [{ data: [4200, 10900, 16500, 18800, 12300, 4600, 920], backgroundColor: "#ff6b35", borderWidth: 0, barPercentage: 0.6 }],
      },
      options: ageOptions,
      plugins: [valueLabelPlugin],
    });

    chartInstances.current = [c1, c2, c3, c4, c5, c6];
    return () => chartInstances.current.forEach((c) => c.destroy());
  }, []);

  // Dynamic styles based on State
  const scopeBtnClass = (type) =>
    `px-6 py-1 text-xs font-bold rounded-full transition-colors ${
      scope === type ? "bg-[#263238] text-white shadow-sm" : "text-gray-500 hover:text-gray-800 hover:bg-gray-300"
    }`;

  const viewBtnClass = (type) =>
    `flex-1 py-1.5 rounded-md text-sm font-medium transition-colors ${
      view === type ? "bg-[#263238] text-white" : "bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0]"
    }`;

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] text-gray-800 font-sans">
      
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

      {/* 4. SUB-HEADER */}
      <div className="bg-gray-100 border-b border-gray-200 px-6 py-3 flex justify-between items-center flex-shrink-0 z-30">
        <div className="flex items-center text-sm text-gray-700">
          <i className="fas fa-users text-main-nav mr-2 text-lg"></i>
          <span className="font-semibold text-gray-900 mr-2">Current Focus:</span> Farmer Cooperatives, SACCOs and FPO Data Insights
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-200 rounded-full p-1 border border-gray-300">
            <button onClick={() => setScope("county")} className={scopeBtnClass("county")}>County</button>
            <button onClick={() => setScope("national")} className={scopeBtnClass("national")}>National</button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search FSRP County..."
              value={scope === "county" ? selectedCounty : ""}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="bg-white border border-gray-300 text-gray-700 rounded-full py-1 px-4 pl-8 text-xs focus:outline-none focus:border-[#174a32] w-56 transition-all shadow-sm"
            />
            <i className="fas fa-search absolute left-2.5 top-2 text-gray-400 text-xs"></i>
          </div>
        </div>
      </div>

      {/* MAIN DASHBOARD CONTENT */}
      <main className="flex p-4 gap-4 flex-1 overflow-hidden bg-gray-50 mb-10 max-w-[1600px] mx-auto w-full">
        
        {/* Left Sidebar */}
        <aside className="w-[280px] flex flex-col gap-4 flex-shrink-0 overflow-y-auto pr-1">
          <div className="bg-[#dbe4e8] rounded-lg p-3">
            <h2 className="text-lg font-semibold text-gray-800">General Overview</h2>
          </div>

          <div className="flex space-x-2 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
            <button onClick={() => setView("saccos")} className={viewBtnClass("saccos")}>SACCOS</button>
            <button onClick={() => setView("fpos")} className={viewBtnClass("fpos")}>FPO's</button>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col p-3">
            <h3 className="font-semibold text-gray-700 mb-1 text-sm">Country Collection Map</h3>
            <p className="text-xs text-gray-500 mb-2">{currentData.subtitle}</p>
            
            <div className="map-container h-[350px]"></div>
            
            <div className="mt-4">
              <h4 className="text-xs font-semibold text-gray-700 mb-2">{currentData.listTitle}</h4>
              
              <div className="space-y-2">
                {currentData.list.map((item, index) => {
                  const bgColors = ["bg-[#334155]", "bg-[#1e293b]", "bg-[#0f172a]"];
                  return (
                    <div key={index} className={`flex items-center justify-between ${bgColors[index]} text-white rounded-md p-2`}>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium">{item.name}</span>
                        <span className="text-sm font-bold">{item.val}</span>
                      </div>
                      <span className="text-xs bg-gray-700 px-2 py-0.5 rounded">{item.badge}</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 space-y-1.5">
                <div className="flex items-center text-[10px] text-gray-500"><div className="w-16 h-2 bg-[#bfdbfe] mr-2"></div> &lt;50m</div>
                <div className="flex items-center text-[10px] text-gray-500"><div className="w-16 h-2 bg-[#60a5fa] mr-2"></div> 50-99m</div>
                <div className="flex items-center text-[10px] text-gray-500"><div className="w-16 h-2 bg-[#3b82f6] mr-2"></div> 100-199m</div>
                <div className="flex items-center text-[10px] text-gray-500"><div className="w-16 h-2 bg-[#1e3a8a] mr-2"></div> 200m+</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 pb-10">
          
          {/* Headers Row */}
          <div className="flex gap-4">
            <div className="flex-1 bg-[#dbe4e8] rounded-lg p-3 flex justify-between items-center shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800">SACCO's</h2>
              <a href="/cooperatives/sacco" className="group flex items-center text-xs font-bold text-[#174a32] hover:text-emerald-700 transition-colors bg-white/50 hover:bg-white px-3 py-1.5 rounded-md border border-transparent hover:border-emerald-200">
                View SACCO Details <i className="fas fa-arrow-right ml-1.5 transform group-hover:translate-x-1 transition-transform"></i>
              </a>
            </div>
            <div className="flex-1 bg-[#dbe4e8] rounded-lg p-3 flex justify-between items-center shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800">FPO's</h2>
              <a href="#" className="group flex items-center text-xs font-bold text-[#174a32] hover:text-emerald-700 transition-colors bg-white/50 hover:bg-white px-3 py-1.5 rounded-md border border-transparent hover:border-emerald-200">
                View FPO Details <i className="fas fa-arrow-right ml-1.5 transform group-hover:translate-x-1 transition-transform"></i>
              </a>
            </div>
          </div>

          {/* Stat Cards Row */}
          <div className="flex gap-4">
            {/* SACCOs Column */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex-1 bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-semibold text-gray-500">Total SACCOs</h4>
                    <i className="fas fa-chart-bar text-gray-400"></i>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">1,820</div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-green-500 flex items-center"><i className="fas fa-caret-up mr-1"></i> 956.9% vs prior month</span>
                    <i className="far fa-clock text-gray-400"></i>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-semibold text-gray-500">Total. no of SACCO Members</h4>
                    <i className="fas fa-chart-bar text-gray-400"></i>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">232,392</div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-green-500 flex items-center"><i className="fas fa-caret-up mr-1"></i> 956.9% vs prior month</span>
                    <i className="far fa-clock text-gray-400"></i>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-semibold text-gray-500">SACCO Grants</h4>
                    <i className="fas fa-chart-bar text-gray-400"></i>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">300M</div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-green-500 flex items-center"><i className="fas fa-caret-up mr-1"></i> 956.9% vs prior month</span>
                    <i className="far fa-clock text-gray-400"></i>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-semibold text-gray-500">SACCO Arrears</h4>
                    <i className="fas fa-chart-bar text-gray-400"></i>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">318</div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-green-500 flex items-center"><i className="fas fa-caret-up mr-1"></i> 956.9% vs prior month</span>
                    <i className="far fa-clock text-gray-400"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* FPOs Column */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex-1 bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-semibold text-gray-500">Total FPO's</h4>
                    <i className="fas fa-chart-bar text-gray-400"></i>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">1,820</div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-green-500 flex items-center"><i className="fas fa-caret-up mr-1"></i> 956.9% vs prior month</span>
                    <i className="far fa-clock text-gray-400"></i>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-semibold text-gray-500">Total Grants to FPO's</h4>
                    <i className="fas fa-chart-bar text-gray-400"></i>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">250m</div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-green-500 flex items-center"><i className="fas fa-caret-up mr-1"></i> 956.9% vs prior month</span>
                    <i className="far fa-clock text-gray-400"></i>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-semibold text-gray-500">Total no. of FPO Members</h4>
                    <i className="fas fa-chart-bar text-gray-400"></i>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">60,307</div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-green-500 flex items-center"><i className="fas fa-caret-up mr-1"></i> 956.9% vs prior month</span>
                    <i className="far fa-clock text-gray-400"></i>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-semibold text-gray-500">Total no. of FPO Members</h4>
                    <i className="fas fa-chart-bar text-gray-400"></i>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">60,307</div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-green-500 flex items-center"><i className="fas fa-caret-up mr-1"></i> 956.9% vs prior month</span>
                    <i className="far fa-clock text-gray-400"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gender Charts Row */}
          <div className="flex gap-4 pb-4">
            {/* FPOs */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="bg-[#eef2f5] rounded-lg p-2 flex justify-between items-center border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700">Gender distribution (FPOs)</h3>
                <div className="flex items-center text-xs text-gray-600">
                  <span className="mr-2">Period</span>
                  <select className="border border-gray-300 rounded p-1 text-xs bg-white outline-none"><option>Sep 2026</option></select>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex items-center justify-between">
                <div className="relative w-[160px] h-[160px]">
                  <canvas ref={fpoGenderRef}></canvas>
                  <div className="absolute -left-12 top-4 bg-gray-800 text-white text-[10px] p-1 rounded shadow">50,600<br/><span className="text-gray-300 text-[8px]">Male</span></div>
                  <div className="absolute -right-12 bottom-4 bg-gray-800 text-white text-[10px] p-1 rounded shadow">48,513<br/><span className="text-gray-300 text-[8px]">Female</span></div>
                </div>
                <div className="flex flex-col space-y-4 ml-4">
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Male</div>
                    <div className="text-xl font-bold text-gray-800">50,600</div>
                    <div className="text-[10px] text-green-500 mt-1"><i className="fas fa-caret-up"></i> 20% vs prior month</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Female</div>
                    <div className="text-xl font-bold text-gray-800">48,513</div>
                    <div className="text-[10px] text-green-500 mt-1"><i className="fas fa-caret-up"></i> 10% vs prior month</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#eef2f5] rounded-lg p-2 flex justify-between items-center border border-gray-200 mt-2">
                <h3 className="text-sm font-semibold text-gray-700">Members by county</h3>
                <i className="fas fa-chart-bar text-gray-500"></i>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <div className="flex items-center">
                  <div className="w-20 text-xs text-gray-600 flex flex-col justify-between h-[120px] py-1">
                    <span>Transzoia</span><span>Kiambu</span><span>Muranga</span><span>Kakamega</span><span>Meru</span><span>Kitul</span><span>Kisumu</span>
                  </div>
                  <div className="flex-1 relative h-[120px] ml-2"><canvas ref={fpoBarRef}></canvas></div>
                </div>
                <div className="flex justify-end space-x-4 text-[9px] text-gray-500 mt-2 pr-2">
                  <span>10K</span><span>30K</span><span>60K</span><span>100K</span><span>200K</span><span>300K</span><span>500K</span>
                </div>
              </div>
            </div>

            {/* SACCOs */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="bg-[#e5ebd9] rounded-lg p-2 flex justify-between items-center border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700">Gender distribution (SACCOs)</h3>
                <div className="flex items-center text-xs text-gray-600">
                  <span className="mr-2">Period</span>
                  <select className="border border-gray-300 rounded p-1 text-xs bg-white outline-none"><option>Sep 2026</option></select>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex items-center justify-between">
                <div className="relative w-[160px] h-[160px]">
                  <canvas ref={saccoGenderRef}></canvas>
                  <div className="absolute -left-12 top-4 bg-gray-800 text-white text-[10px] p-1 rounded shadow">30,100<br/><span className="text-gray-300 text-[8px]">Male</span></div>
                  <div className="absolute -right-12 bottom-4 bg-gray-800 text-white text-[10px] p-1 rounded shadow">38,456<br/><span className="text-gray-300 text-[8px]">Female</span></div>
                </div>
                <div className="flex flex-col space-y-4 ml-4">
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Male</div>
                    <div className="text-xl font-bold text-gray-800">30,100</div>
                    <div className="text-[10px] text-green-500 mt-1"><i className="fas fa-caret-up"></i> 20% vs prior month</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Female</div>
                    <div className="text-xl font-bold text-gray-800">38,456</div>
                    <div className="text-[10px] text-green-500 mt-1"><i className="fas fa-caret-up"></i> 10% vs prior month</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#eef2f5] rounded-lg p-2 flex justify-between items-center border border-gray-200 mt-2">
                <h3 className="text-sm font-semibold text-gray-700">Members by county</h3>
                <i className="fas fa-chart-bar text-gray-500"></i>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <div className="flex items-center">
                  <div className="w-20 text-xs text-gray-600 flex flex-col justify-between h-[120px] py-1">
                    <span>Transzoia</span><span>Kiambu</span><span>Muranga</span><span>Kakamega</span><span>Meru</span><span>Kitul</span><span>Kisumu</span>
                  </div>
                  <div className="flex-1 relative h-[120px] ml-2"><canvas ref={saccoBarRef}></canvas></div>
                </div>
                <div className="flex justify-end space-x-4 text-[9px] text-gray-500 mt-2 pr-2">
                  <span>0</span><span>10K</span><span>30K</span><span>60K</span><span>100K</span><span>200K</span><span>300K</span><span>500K</span>
                </div>
              </div>
            </div>
          </div>

          {/* Age Profile Charts */}
          <div className="flex gap-4 pb-6">
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
              <div className="bg-[#cfdde5] rounded-t-lg p-3 flex justify-between items-center border-b border-gray-300">
                <h3 className="text-sm font-semibold text-gray-800">Membership by age · Age profile</h3>
                <div className="text-sm text-gray-700">Total 60,307</div>
              </div>
              <div className="p-4 flex-1">
                <div className="relative h-[250px] w-full bg-[#f8fafc] rounded-md p-2">
                  <canvas ref={fpoAgeRef}></canvas>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
              <div className="bg-[#e9eed9] rounded-t-lg p-3 flex justify-between items-center border-b border-gray-300">
                <h3 className="text-sm font-semibold text-gray-800">SACCO membership by age</h3>
                <div className="text-sm text-gray-700">Total 68,220</div>
              </div>
              <div className="p-4 flex-1">
                <div className="relative h-[250px] w-full bg-[#f8fafc] rounded-md p-2">
                  <canvas ref={saccoAgeRef}></canvas>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default CooperativesHomePage;