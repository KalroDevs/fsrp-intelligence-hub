import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DigitalProductsPage = () => {
  const navigate = useNavigate();
  
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  
  // Drawer State
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Data
  const services = [
    {
      id: "EXT-01",
      title: "KAOP",
      subtitle: "Kenya Agricultural Observatory Platform",
      category: "Climate & Weather",
      description: "Provides near real-time weather data, crop condition forecasts, and agricultural advisories using satellite technology.",
      icon: "fa-satellite-dish",
      color: "from-sky-400 to-blue-600",
      bgColor: "bg-sky-500",
      status: "External",
      provider: "KALRO",
      isExternal: true,
      url: "https://kaop.co.ke/",
      features: ["Weather Forecasts", "Crop Monitoring", "Drought Alerts", "Satellite Data"]
    },
    {
      id: "EXT-02",
      title: "KALRO Selector",
      subtitle: "Crop & Variety Selection Tool",
      category: "Advisory",
      description: "A decision-support tool that helps farmers select the best crop varieties based on their specific agro-ecological zone.",
      icon: "fa-seedling",
      color: "from-emerald-400 to-green-600",
      bgColor: "bg-emerald-500",
      status: "External",
      provider: "KALRO",
      isExternal: true,
      url: "https://selector.kalro.org/",
      features: ["Variety Database", "Agro-zone Matching", "Yield Estimates", "Seed Sources"]
    },
    {
      id: "EXT-03",
      title: "KALRO Digital",
      subtitle: "Digital Repository",
      category: "Data Systems",
      description: "The central repository for KALRO's digital assets, including research publications, extension manuals, and advisory materials.",
      icon: "fa-book",
      color: "from-purple-400 to-indigo-600",
      bgColor: "bg-purple-500",
      status: "External",
      provider: "KALRO",
      isExternal: true,
      url: "http://digital.kalro.org/",
      features: ["Research Papers", "Extension Guides", "Video Tutorials", "Open Data"]
    },
    {
      id: "EXT-04",
      title: "KEEP",
      subtitle: "Kenya Extension & Empowerment Platform",
      category: "Advisory",
      description: "A digital platform connecting farmers to extension service providers, offering e-learning and expert advice.",
      icon: "fa-chalkboard-teacher",
      color: "from-amber-400 to-orange-600",
      bgColor: "bg-amber-500",
      status: "External",
      provider: "KALRO",
      isExternal: true,
      url: "https://keep.kalro.org/",
      features: ["E-Learning", "Expert Q&A", "Extension Network", "Knowledge Base"]
    },
    {
      id: "SRV-01",
      title: "One Million Farmer Platform",
      subtitle: "OMFP Data Lake",
      category: "Data Systems",
      description: "Unified farmer data lake, service matching, and big data insights across 33 FSRP counties.",
      icon: "fa-database",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-indigo-500",
      status: "Active",
      provider: "NPCU",
      isExternal: false,
      url: "/omfp/dashboard",
      features: ["Farmer Registry", "e-Vouchers", "AgTech Integration", "Data Analytics"]
    },
    {
      id: "SRV-02",
      title: "Digitized TIMPs",
      subtitle: "Technology Registry",
      category: "Advisory",
      description: "Access 650+ climate-smart technologies, innovations, and management practices digitized by KALRO.",
      icon: "fa-microchip",
      color: "from-fuchsia-500 to-pink-600",
      bgColor: "bg-fuchsia-500",
      status: "Active",
      provider: "KALRO",
      isExternal: false,
      url: "/timps/dashboard",
      features: ["Technology Database", "Adoption Tracking", "Training Manuals", "Impact Metrics"]
    },
    {
      id: "SRV-03",
      title: "Digital Climate Advisory",
      subtitle: "Weather & Climate",
      category: "Climate & Weather",
      description: "Real-time weather forecasts, seasonal predictions, and climate-smart recommendations via SMS and App.",
      icon: "fa-cloud-sun-rain",
      color: "from-cyan-400 to-blue-500",
      bgColor: "bg-cyan-500",
      status: "Active",
      provider: "KALRO",
      isExternal: false,
      url: "/climate/dashboard",
      features: ["Weather Alerts", "Pest Warnings", "Agronomic Advice", "Market Info"]
    },
    {
      id: "SRV-04",
      title: "Farmer Led Irrigation",
      subtitle: "FLID System",
      category: "Irrigation",
      description: "Monitoring tools for irrigation schemes, water usage, and solar-powered smart systems.",
      icon: "fa-water",
      color: "from-teal-400 to-emerald-600",
      bgColor: "bg-teal-500",
      status: "Active",
      provider: "NPCU",
      isExternal: false,
      url: "/flid/dashboard",
      features: ["Scheme Mapping", "Water Usage", "Yield Tracking", "Solar Pump Status"]
    },
    {
      id: "SRV-05",
      title: "Fertilizer Subsidy",
      subtitle: "eVoucher System",
      category: "Government Services",
      description: "Ministry of Agriculture subsidized fertilizer distribution tracking via eVouchers.",
      icon: "fa-ticket-alt",
      color: "from-lime-400 to-green-600",
      bgColor: "bg-lime-500",
      status: "Active",
      provider: "MoALD",
      isExternal: false,
      url: "/subsidy/dashboard",
      features: ["eVoucher Generation", "Redemption Tracking", "Dealer Network", "Farmer Verification"]
    },
    {
      id: "SRV-06",
      title: "Livestock Vaccination",
      subtitle: "Campaign Tracker",
      category: "Government Services",
      description: "Tracking of mass vaccination campaigns, disease surveillance, and livestock health.",
      icon: "fa-syringe",
      color: "from-rose-400 to-red-600",
      bgColor: "bg-rose-500",
      status: "Active",
      provider: "MoALD",
      isExternal: false,
      url: "/vaccination/dashboard",
      features: ["Campaign Tracking", "Disease Alerts", "Livestock Registry", "Vet Network"]
    },
  ];

  const categories = ["All", "Climate & Weather", "Advisory", "Data Systems", "Irrigation", "Government Services"];

  // Filtering Logic
  const filteredServices = services.filter(service => {
    const matchesCategory = activeCategory === "All" || service.category === activeCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openDrawer = (service) => {
    setSelectedService(service);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const handleLaunch = (e, service) => {
    e.stopPropagation();
    if (service.isExternal) {
      window.open(service.url, "_blank", "noopener,noreferrer");
    } else {
      navigate(service.url);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#f8fafc] text-gray-800 font-sans overflow-hidden">
      
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
          <a href="#" className="flex items-center px-6 py-3.5 text-sm font-semibold border-b-4 border-transparent hover:border-gov-gold transition-colors">
            <i className="fas fa-home mr-2 text-base"></i> Home
          </a>
          <button className="flex items-center px-6 py-3.5 text-sm font-semibold hover:bg-[#123c28] transition-colors h-full border-b-4 border-transparent hover:border-gov-gold">
            Technologies & Advisories <i className="fas fa-chevron-down ml-2 text-[10px]"></i>
          </button>
          <button className="flex items-center px-6 py-3.5 text-sm font-semibold border-b-4 border-gov-gold bg-[#123c28] transition-colors">
            Platforms & Services
          </button>
          <button className="flex items-center px-6 py-3.5 text-sm font-semibold hover:bg-[#123c28] transition-colors h-full border-b-4 border-transparent hover:border-gov-gold">
            Beneficiary Registries <i className="fas fa-chevron-down ml-2 text-[10px]"></i>
          </button>
        </div>
      </nav>

      {/* 4. MAIN LAYOUT WITH SIDEBAR */}
      <div className="flex flex-1 overflow-hidden max-w-[1600px] mx-auto w-full">
        
        {/* LEFT SIDEBAR - SEARCH, FILTERS & LINKS */}
        <aside className="w-[280px] flex-shrink-0 flex flex-col gap-6 bg-white border-r border-gray-200 p-5 overflow-y-auto h-full">
          
          {/* Search Bar */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Search</h3>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search services..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 text-sm text-gray-800 focus:outline-none focus:border-[#174a32] focus:ring-1 focus:ring-[#174a32]"
              />
              <i className="fas fa-search absolute left-3 top-2.5 text-gray-400"></i>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-col gap-1">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Filter by Category</h3>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex justify-between items-center ${
                  activeCategory === cat 
                    ? "bg-[#174a32] text-white shadow-sm" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {cat}
                {activeCategory === cat && <i className="fas fa-check text-xs"></i>}
              </button>
            ))}
          </div>

          {/* Quick Access Links */}
          <div className="flex flex-col gap-1 border-t border-gray-100 pt-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Quick Access</h3>
            <button onClick={() => navigate('/beneficiaries/home')} className="text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2">
              <i className="fas fa-users text-gray-400 w-4"></i> Beneficiaries
            </button>
            <button onClick={() => navigate('/omfp/dashboard')} className="text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2">
              <i className="fas fa-database text-gray-400 w-4"></i> OMFP Dashboard
            </button>
            <button onClick={() => navigate('/cooperatives/home')} className="text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2">
              <i className="fas fa-building text-gray-400 w-4"></i> Cooperatives
            </button>
            <button onClick={() => navigate('/timps/dashboard')} className="text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2">
              <i className="fas fa-microchip text-gray-400 w-4"></i> TIMPs
            </button>
          </div>

        </aside>

        {/* RIGHT CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-6 pb-20 bg-[#f8fafc]">
          
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              {activeCategory === "All" ? "All Services" : activeCategory}
              <span className="ml-2 text-sm font-normal text-gray-500">({filteredServices.length} items)</span>
            </h2>
            
            {/* View Toggle */}
            <div className="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm flex-shrink-0">
              <button 
                onClick={() => setViewMode("grid")} 
                className={`px-3 py-1.5 rounded text-sm transition-colors ${viewMode === 'grid' ? 'bg-[#174a32] text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                title="Grid View"
              >
                <i className="fas fa-th-large"></i>
              </button>
              <button 
                onClick={() => setViewMode("list")} 
                className={`px-3 py-1.5 rounded text-sm transition-colors ${viewMode === 'list' ? 'bg-[#174a32] text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                title="List View"
              >
                <i className="fas fa-list"></i>
              </button>
            </div>
          </div>

          {/* Dynamic Layout: Grid or List */}
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "flex flex-col gap-4"
          }>
            {filteredServices.map((service) => (
              <div 
                key={service.id} 
                onClick={() => openDrawer(service)}
                className={`
                  group relative bg-white rounded-2xl border border-gray-200 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex
                  ${viewMode === 'grid' ? 'flex-col' : 'flex-row p-4 items-center'}
                `}
              >
                {viewMode === 'grid' ? (
                  // --- MODERN GRID VIEW LAYOUT ---
                  <>
                    <div className="p-5 flex-1 flex flex-col">
                      
                      {/* Top Row: Icon & Badge */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${service.bgColor} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                          <i className={`fas ${service.icon} text-xl`}></i>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                          service.isExternal ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {service.isExternal ? "External" : "Internal"}
                        </span>
                      </div>

                      {/* Content */}
                      <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight group-hover:text-[#174a32] transition-colors">{service.title}</h3>
                      <div className="text-xs font-semibold text-gray-500 mb-3">{service.subtitle}</div>
                      <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-3">{service.description}</p>
                      
                      {/* Meta Data */}
                      <div className="flex items-center gap-2 mt-auto">
                        <span className="text-[10px] bg-gray-100 text-gray-600 font-bold px-2 py-1 rounded">
                          {service.category}
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold ml-auto">
                          By {service.provider}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Full-Width Action Area */}
                    <div className="border-t border-gray-100 bg-gray-50 p-3 flex justify-between items-center w-full group-hover:bg-emerald-50 transition-colors">
                      <span className="text-xs font-semibold text-gray-500 pl-2">View Details</span>
                      <button 
                        onClick={(e) => handleLaunch(e, service)} 
                        className="px-4 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-bold text-[#174a32] group-hover:bg-[#174a32] group-hover:text-white group-hover:border-[#174a32] transition-colors flex items-center gap-2 shadow-sm"
                      >
                        Launch {service.isExternal ? <i className="fas fa-external-link-alt text-[10px]"></i> : <i className="fas fa-arrow-right text-[10px]"></i>}
                      </button>
                    </div>
                  </>
                ) : (
                  // --- LIST VIEW LAYOUT ---
                  <>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${service.bgColor} text-white shadow-md mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <i className={`fas ${service.icon} text-xl`}></i>
                    </div>
                    <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#174a32]">{service.title}</h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                            service.isExternal ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {service.isExternal ? "External" : "Internal"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-1">{service.description}</p>
                      </div>
                      <div className="flex items-center gap-6 flex-shrink-0">
                        <div className="text-right hidden md:block">
                          <div className="text-[10px] text-gray-400 uppercase font-bold">Provider</div>
                          <div className="text-xs font-bold text-gray-700">{service.provider}</div>
                        </div>
                        <button onClick={(e) => handleLaunch(e, service)} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-[#174a32] hover:bg-[#174a32] hover:text-white transition-colors flex items-center gap-2">
                          Launch {service.isExternal ? <i className="fas fa-external-link-alt text-xs"></i> : <i className="fas fa-arrow-right text-xs"></i>}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="py-20 text-center text-gray-500 bg-white rounded-2xl border border-dashed border-gray-300">
              <i className="fas fa-search text-5xl mb-4 text-gray-300"></i>
              <h3 className="text-lg font-bold text-gray-800 mb-1">No services found</h3>
              <p>Try adjusting your search or category filters.</p>
            </div>
          )}
        </main>
      </div>

      {/* RIGHT SIDE PANEL (DRAWER) */}
      <div className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[90] transition-opacity duration-300 ${drawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={closeDrawer}></div>
      
      <div className={`fixed top-0 right-0 bottom-0 w-full max-w-[440px] bg-white z-[100] shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className={`bg-gradient-to-r ${selectedService?.color} text-white p-6 relative flex-shrink-0`}>
          <button onClick={closeDrawer} className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/10 hover:bg-black/20 p-2 rounded-full transition-colors z-10">
            <i className="fas fa-times"></i>
          </button>
          
          <div className="flex items-center space-x-4 mb-4 relative z-10">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shadow-inner border border-white/30">
              <i className={`fas ${selectedService?.icon} text-2xl text-white`}></i>
            </div>
            <div>
              <span className="text-white/80 text-[10px] font-bold uppercase tracking-wider border border-white/30 px-2 py-0.5 rounded backdrop-blur-sm bg-white/10">
                {selectedService?.provider}
              </span>
              <h2 className="text-2xl font-bold tracking-tight mt-1">{selectedService?.title}</h2>
              <div className="text-xs text-white/80 mt-0.5">{selectedService?.subtitle}</div>
            </div>
          </div>
          
          <p className="text-sm text-white/95 mt-2 leading-relaxed relative z-10">
            {selectedService?.description}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Service Metadata</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                <div className="text-[10px] text-gray-500 font-medium mb-1">Category</div>
                <div className="text-sm font-bold text-gray-800">{selectedService?.category}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                <div className="text-[10px] text-gray-500 font-medium mb-1">Access Type</div>
                <div className="text-sm font-bold text-gray-800">
                  {selectedService?.isExternal ? "Public (External)" : "Authenticated (Internal)"}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Key Features</h3>
            <ul className="space-y-3">
              {selectedService?.features.map((feature, idx) => (
                <li key={idx} className="flex items-start text-sm text-gray-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <i className="fas fa-check text-emerald-600 text-[10px]"></i>
                  </div>
                  <span className="font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#eff6ff] border border-blue-200 rounded-xl p-4 flex gap-3">
            <i className="fas fa-info-circle text-blue-500 mt-0.5"></i>
            <p className="text-xs text-blue-800 leading-relaxed">
              {selectedService?.isExternal 
                ? "This service is hosted externally. Clicking 'Launch Service' will open it in a new tab. You may need to register separately on the external platform."
                : "This service is fully integrated with the FSRP National Data Lake. You will need your FSRP Portal credentials to access this dashboard."}
            </p>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-white flex space-x-3 flex-shrink-0">
          <button className="flex-1 py-3 border border-gray-300 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition">
            Documentation
          </button>
          <button 
            onClick={(e) => handleLaunch(e, selectedService)}
            className="flex-1 py-3 bg-[#174a32] rounded-xl text-sm font-bold text-white hover:bg-[#123c28] transition shadow-md flex items-center justify-center gap-2"
          >
            Launch Service {selectedService?.isExternal ? <i className="fas fa-external-link-alt text-xs"></i> : <i className="fas fa-arrow-right text-xs"></i>}
          </button>
        </div>
      </div>

    </div>
  );
};

export default DigitalProductsPage;