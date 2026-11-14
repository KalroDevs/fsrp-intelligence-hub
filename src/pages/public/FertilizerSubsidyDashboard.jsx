import React, { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { useNavigate } from "react-router-dom";

const FertilizerSubsidyDashboard = () => {
  const navigate = useNavigate();
  
  // State
  const [scope, setScope] = useState("county");
  const [selectedCounty, setSelectedCounty] = useState("Trans Nzoia");
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Drawer State
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Chart Refs
  const fertilizerTypeRef = useRef(null);
  const redemptionTrendRef = useRef(null);
  const countyDistributionRef = useRef(null);
  const genderRef = useRef(null);
  const chartInstances = useRef([]);

  // Table Data
  const voucherData = [
    { id: "eV-24-001", farmer: "Jane Wanjiku", county: "Trans Nzoia", idNumber: "12345678", fertilizerType: "DAP", quantity: "50kg", value: "KES 3,500", status: "Redeemed", issueDate: "2024-03-01", expiryDate: "2024-04-01", vendor: "KFA Kitale Depot" },
    { id: "eV-24-002", farmer: "Peter Ochieng", county: "Kisumu", idNumber: "23456789", fertilizerType: "CAN", quantity: "50kg", value: "KES 2,800", status: "Pending", issueDate: "2024-03-05", expiryDate: "2024-04-05", vendor: "Agro-Dealers Kisumu" },
    { id: "eV-24-003", farmer: "Mary Atieno", county: "Siaya", idNumber: "34567890", fertilizerType: "Urea", quantity: "25kg", value: "KES 1,500", status: "Redeemed", issueDate: "2024-02-28", expiryDate: "2024-03-28", vendor: "KFA Bondo" },
    { id: "eV-24-004", farmer: "David Kiprop", county: "Uasin Gishu", idNumber: "45678901", fertilizerType: "DAP", quantity: "50kg", value: "KES 3,500", status: "Redeemed", issueDate: "2024-03-10", expiryDate: "2024-04-10", vendor: "KFA Eldoret" },
    { id: "eV-24-005", farmer: "Grace Muthoni", county: "Nyeri", idNumber: "56789012", fertilizerType: "CAN", quantity: "50kg", value: "KES 2,800", status: "Expired", issueDate: "2024-02-01", expiryDate: "2024-03-01", vendor: "Agro-Dealers Nyeri" },
    { id: "eV-24-006", farmer: "Ali Hassan", county: "Garissa", idNumber: "67890123", fertilizerType: "Urea", quantity: "25kg", value: "KES 1,500", status: "Pending", issueDate: "2024-03-15", expiryDate: "2024-04-15", vendor: "KFA Garissa" },
    { id: "eV-24-007", farmer: "Sarah Chebet", county: "Bungoma", idNumber: "78901234", fertilizerType: "DAP", quantity: "50kg", value: "KES 3,500", status: "Redeemed", issueDate: "2024-03-02", expiryDate: "2024-04-02", vendor: "Agro-Dealers Bungoma" },
    { id: "eV-24-008", farmer: "James Mwangi", county: "Laikipia", idNumber: "89012345", fertilizerType: "CAN", quantity: "50kg", value: "KES 2,800", status: "Redeemed", issueDate: "2024-03-08", expiryDate: "2024-04-08", vendor: "KFA Nanyuki" },
  ];

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = voucherData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(voucherData.length / itemsPerPage);

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

    // 1. Fertilizer Types Distribution (Doughnut)
    createChart(fertilizerTypeRef, {
      type: "doughnut",
      data: {
        labels: ["DAP", "CAN", "Urea", "NPK"],
        datasets: [{ data: [45, 30, 15, 10], backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"], borderWidth: 0, cutout: "70%" }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "right", labels: { boxWidth: 12, font: { size: 10 } } } } },
    });

    // 2. Redemption Trend (Line)
    createChart(redemptionTrendRef, {
      type: "line",
      data: {
        labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
        datasets: [{ label: "Vouchers Redeemed", data: [12000, 18000, 15000, 22000, 25000, 30000], borderColor: "#10b981", backgroundColor: "rgba(16, 185, 129, 0.1)", fill: true, tension: 0.4, pointRadius: 3 }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: true, grid: { color: "#f1f5f9" }, ticks: { callback: (v) => v / 1000 + "k" } } } },
    });

    // 3. County Distribution (Bar)
    createChart(countyDistributionRef, {
      type: "bar",
      data: {
        labels: ["Trans Nzoia", "Uasin Gishu", "Nakuru", "Kisumu", "Bungoma"],
        datasets: [{ label: "eVouchers Issued", data: [15000, 12000, 18000, 8000, 10000], backgroundColor: "#0ea5e9", borderRadius: 4, barPercentage: 0.6 }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: true, grid: { color: "#f1f5f9" }, ticks: { callback: (v) => v / 1000 + "k" } } } },
    });

    // 4. Gender Distribution of Recipients (Doughnut)
    createChart(genderRef, {
      type: "doughnut",
      data: {
        labels: ["Male", "Female"],
        datasets: [{ data: [48, 52], backgroundColor: ["#0ea5e9", "#ec4899"], borderWidth: 0, cutout: "70%" }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "right", labels: { boxWidth: 12, font: { size: 10 } } } } },
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
                Subsidies <span className="font-normal text-xs block text-gray-300">Dashboard</span>
              </h2>
            </div>
            <nav className="flex flex-col">
              <a href="#" className="nav-link-item flex items-center px-5 py-2.5 text-sm font-medium">
                <i className="fas fa-home w-6 text-center mr-2"></i> Home
              </a>
              <a href="#" className="nav-link-item active flex items-center px-5 py-2.5 text-sm font-medium border-l-4 border-[#f59e0b] bg-white/10 text-white">
                <i className="fas fa-ticket-alt w-6 text-center mr-2"></i> eVouchers
              </a>
              <a href="#" className="nav-link-item flex items-center px-5 py-2.5 text-sm font-medium">
                <i className="fas fa-store w-6 text-center mr-2"></i> Agro-Dealers
              </a>
              <a href="#" className="nav-link-item flex items-center px-5 py-2.5 text-sm font-medium">
                <i className="fas fa-box-open w-6 text-center mr-2"></i> Redemption Rates
              </a>
              <a href="#" className="nav-link-item flex items-center px-5 py-2.5 text-sm font-medium">
                <i className="fas fa-file-invoice-dollar w-6 text-center mr-2"></i> Financial Reports
              </a>
            </nav>
          </div>
          
          <div className="p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-wider text-gray-400 mb-1 px-1 font-bold">Switch Dashboard</div>
            <button onClick={() => navigate('/omfp/dashboard')} className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-300 bg-white/5 rounded-md hover:bg-white/10 transition border border-transparent">
              <i className="fas fa-users mr-2"></i> OMFP
            </button>
            <button onClick={() => navigate('/cooperatives/home')} className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-300 bg-white/5 rounded-md hover:bg-white/10 transition border border-transparent">
              <i className="fas fa-building mr-2"></i> SACCOs
            </button>
            <button className="w-full text-left px-3 py-2 text-xs font-bold text-white bg-[#d97706] rounded-md shadow-sm">
              <i className="fas fa-ticket-alt mr-2"></i> Subsidies <i className="fas fa-check-circle ml-1 float-right mt-0.5"></i>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-4 overflow-y-auto pr-1 pb-6 relative">
          
          {/* Top Bar: Title & Filters */}
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-800">Fertilizer Subsidies Overview</h1>
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
                      {["Trans Nzoia", "Uasin Gishu", "Nakuru", "Kisumu", "Bungoma"].map((county) => (
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
              { title: "Total eVouchers Issued", value: "150,000" },
              { title: "Total Redeemed", value: "120,500" },
              { title: "Pending Redemption", value: "29,500" },
              { title: "Total Value (KES)", value: "450M" }
            ].map((kpi, idx) => (
              <div key={idx} className="kpi-card flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-gray-600">{kpi.title}</span>
                  <i className="fas fa-ticket-alt text-gray-400"></i>
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
              { title: "DAP Subsidies", value: "65,000" },
              { title: "CAN Subsidies", value: "45,000" },
              { title: "Urea Subsidies", value: "25,000" },
              { title: "NPK Subsidies", value: "15,000" }
            ].map((kpi, idx) => (
              <div key={idx} className="kpi-card flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-gray-600">{kpi.title}</span>
                  <i className="fas fa-box-open text-gray-400"></i>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-2">{kpi.value}</div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-green-500 flex items-center"><i className="fas fa-caret-up mr-1"></i> Active</span>
                  <i className="far fa-clock text-gray-400"></i>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="chart-card flex flex-col">
              <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                <h3 className="text-base font-semibold text-gray-800">Fertilizer Types Distribution</h3>
                <select className="custom-select text-xs border border-gray-300 rounded px-2 py-1 bg-white"><option>Current</option></select>
              </div>
              <div className="h-[220px] w-full relative"><canvas ref={fertilizerTypeRef}></canvas></div>
            </div>

            <div className="chart-card flex flex-col">
              <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                <h3 className="text-base font-semibold text-gray-800">Redemption Trend</h3>
                <select className="custom-select text-xs border border-gray-300 rounded px-2 py-1 bg-white"><option>6 Months</option></select>
              </div>
              <div className="flex items-center justify-center h-[220px] w-full relative"><canvas ref={redemptionTrendRef}></canvas></div>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="chart-card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-gray-800">eVouchers by County</h3>
                <select className="custom-select text-xs border border-gray-300 rounded px-2 py-1 bg-white"><option>Top 5</option></select>
              </div>
              <div className="h-[160px] w-full relative"><canvas ref={countyDistributionRef}></canvas></div>
            </div>

            <div className="chart-card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-gray-800">Recipient Gender Split</h3>
              </div>
              <div className="h-[160px] w-full relative"><canvas ref={genderRef}></canvas></div>
            </div>
          </div>

          {/* Search Table */}
          <div className="chart-card mt-2 mb-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Recent eVouchers</h2>
              <span className="text-[10px] text-gray-500 italic flex items-center"><i className="fas fa-info-circle mr-1"></i> Click on any row to view voucher details</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-200 mb-4">
              <div className="flex items-center space-x-3">
                <input type="text" placeholder="Search Farmer or Voucher ID..." className="custom-select text-xs border border-gray-300 rounded-md pl-3 pr-8 py-1.5 w-48 bg-white focus:outline-none" />
                <select className="custom-select text-xs border border-gray-300 rounded-md px-3 py-1.5 bg-white"><option>All Counties</option></select>
                <select className="custom-select text-xs border border-gray-300 rounded-md px-3 py-1.5 bg-white"><option>All Statuses</option></select>
              </div>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-4 py-1.5 rounded-md flex items-center transition">Export CSV <i className="fas fa-download ml-2"></i></button>
            </div>
            
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-left border-collapse data-table text-sm">
                <thead>
                  <tr>
                    <th className="py-3 px-4">eVoucher ID</th>
                    <th className="py-3 px-4">Farmer Name</th>
                    <th className="py-3 px-4">County</th>
                    <th className="py-3 px-4">Fertilizer</th>
                    <th className="py-3 px-4 text-right">Value</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 font-medium">
                  {currentItems.map((row, idx) => (
                    <tr key={idx} onClick={() => openDrawer(row)}>
                      <td className="py-3 px-4 font-mono text-xs text-gray-500 flex items-center">{row.id} <i className="fas fa-chevron-right text-[10px] text-gray-300 ml-2"></i></td>
                      <td className="py-3 px-4 font-bold text-gray-900">{row.farmer}</td>
                      <td className="py-3 px-4">{row.county}</td>
                      <td className="py-3 px-4"><span className="bg-sky-50 text-sky-700 px-2 py-1 rounded text-xs font-semibold border border-sky-100">{row.fertilizerType}</span></td>
                      <td className="py-3 px-4 text-right text-gray-600">{row.value}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={`text-[11px] font-bold px-2 py-1 rounded ${
                          row.status === 'Redeemed' ? 'bg-emerald-100 text-emerald-700' : 
                          row.status === 'Pending' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
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
                Showing <span className="font-bold text-gray-800">{indexOfFirstItem + 1}</span> to <span className="font-bold text-gray-800">{Math.min(indexOfLastItem, voucherData.length)}</span> of <span className="font-bold text-gray-800">{voucherData.length}</span> entries
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
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white shadow-inner"><i className="fas fa-ticket-alt text-lg"></i></div>
            <div>
              <span className="text-emerald-300 text-xs font-bold uppercase tracking-wider">{selectedFarmer?.id}</span>
              <h2 className="text-xl font-bold tracking-tight">{selectedFarmer?.farmer}</h2>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-300 mt-2">
            <i className="fas fa-map-marker-alt mr-2 text-emerald-400"></i>
            <span>{selectedFarmer?.county} County</span>
            <span className="mx-2">•</span>
            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${selectedFarmer?.status === 'Redeemed' ? 'bg-emerald-800 text-emerald-200' : 'bg-amber-800 text-amber-200'}`}>
              {selectedFarmer?.status}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Voucher Details</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                <div className="text-[10px] text-gray-500 font-medium mb-1">Fertilizer Type</div>
                <div className="text-sm font-bold text-gray-800">{selectedFarmer?.fertilizerType}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                <div className="text-[10px] text-gray-500 font-medium mb-1">Quantity</div>
                <div className="text-sm font-bold text-gray-800">{selectedFarmer?.quantity}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm col-span-2">
                <div className="text-[10px] text-gray-500 font-medium mb-1">Voucher Value</div>
                <div className="text-lg font-bold text-emerald-600">{selectedFarmer?.value}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm col-span-2">
                <div className="text-[10px] text-gray-500 font-medium mb-1">Authorized Agro-Dealer</div>
                <div className="text-sm font-bold text-sky-700">{selectedFarmer?.vendor}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Voucher Validity</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-gray-500">Issue Date</span>
                  <span className="font-bold text-gray-900">{selectedFarmer?.issueDate}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-xs">
                <span className="font-medium text-gray-500">Expiry Date</span>
                <span className="font-bold text-red-600">{selectedFarmer?.expiryDate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-white flex space-x-3 flex-shrink-0">
          <button className="flex-1 py-2.5 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition">Print Voucher</button>
          <button className="flex-1 py-2.5 bg-[#174a32] rounded-lg text-sm font-bold text-white hover:bg-[#123c28] transition shadow-md">Mark Redeemed</button>
        </div>
      </div>

    </div>
  );
};

export default FertilizerSubsidyDashboard;