import React, { useState, useEffect } from "react";
import { Bot } from "lucide-react";
import DynamicIcon from "../../components/DynamicIcon";
import "./homepage.css";

const HomePage = ({ lang = "en", onLangChange, t }) => {
  const [highContrast, setHighContrast] = useState(false);

  // Toggle high contrast class on body
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }
  }, [highContrast]);

  const handleLanguageChange = (newLang) => {
    if (onLangChange) {
      onLangChange(newLang);
    }
  };

  // Fallback translations if 't' prop isn't provided by the i18n hook
  const translations = {
    en: {
      heroTitle: "Data-Driven Decisions.\nResilient Food Systems.",
      heroDesc:
        "Connecting knowledge, technologies, and institutions to build productive, climate-resilient food systems across Kenya.",
      btnExplore: "Explore Digital Services",
      btnResults: "View Project Results",
      navHome: "Home",
      navTech: "Technologies & Advisories",
      navPlatforms: "Platforms & Services",
      navRegistries: "Beneficiary Registries",
    },
    sw: {
      heroTitle: "Maamuzi Yanayoongozwa na Takwimu.\nMifumo Imara ya Chakula.",
      heroDesc:
        "Kuunganisha maarifa, teknolojia, na taasisi ili kujenga mifumo ya chakula yenye tija na inayostahimili mabadiliko ya tabianchi kote Kenya.",
      btnExplore: "Gundua Huduma za Kidijitali",
      btnResults: "Tazama Matokeo ya Mradi",
      navHome: "Mwanzo",
      navTech: "Teknolojia na Ushauri",
      navPlatforms: "Majukwaa na Huduma",
      navRegistries: "Daftari za Walengwa",
    },
  };

  const currentT = t || translations[lang] || translations.en;

  // Data arrays
  const alerts = [
    {
      type: "red",
      icon: "fa-exclamation-triangle",
      title: "Drought Watch: 12 Counties",
      desc: "Water trucking required in ASAL regions.",
    },
    {
      type: "amber",
      icon: "fa-ticket-alt",
      title: "3,000 eVouchers Pending",
      desc: "Fertilizer redemption closes in 48 hours.",
    },
    {
      type: "blue",
      icon: "fa-bug",
      title: "Pest Outbreak Alert",
      desc: "Fall Armyworm reported in Trans Nzoia.",
    },
  ];

  const marqueeItems = [
    <React.Fragment key="1">
      <span className="tag urgent">URGENT</span>{" "}
      <DynamicIcon name="fa-exclamation-triangle" size={14} /> Fall Armyworm
      alert issued for Trans Nzoia and Bungoma counties.
    </React.Fragment>,
    <React.Fragment key="2">
      <DynamicIcon name="fa-cloud-sun-rain" size={14} /> Short rains expected to
      begin early in the Eastern region. View advisory.
    </React.Fragment>,
    <React.Fragment key="3">
      <span className="tag">NEW</span>{" "}
      <DynamicIcon name="fa-star" size={14} /> One Million Farmer Platform API
      v2.0 is now live for all Agtechs.
    </React.Fragment>,
    <React.Fragment key="4">
      <DynamicIcon name="fa-syringe" size={14} /> Livestock vaccination drive
      starts next Monday in Garissa.
    </React.Fragment>,
  ];

  const impactStats = [
    {
      value: "1.3 Million +",
      label: "Targeted Beneficiaries",
      desc: "Improved productivity, Resilience, Commercialization",
      spark: "M0,20 L10,18 L20,19 L30,14 L40,15 L50,10 L60,12 L70,6 L80,4",
    },
    {
      value: "-",
      label: "Farmers Adopting TIMPs",
      desc: "Resilience-enhancing practices",
      spark: "M0,20 L10,19 L20,16 L30,15 L40,12 L50,10 L60,7 L70,4 L80,2",
    },
    {
      value: "-",
      label: "Hectares Managed",
      desc: "Integrated land management",
      spark: "M0,22 L10,20 L20,18 L30,18 L40,14 L50,11 L60,9 L70,7 L80,5",
    },
    {
      value: "KSh -",
      label: "Market Volume",
      desc: "Agricultural production sold",
      spark: "M0,18 L10,15 L20,17 L30,12 L40,13 L50,8 L60,9 L70,4 L80,3",
    },
   
  ];

  const services = [
    {
      id: 1,
      title: "Project Cooperatives",
      tag: "EasySacco Integration",
      desc: "Manage FPOs and SACCOs: membership, savings, credit scores, and automated EasySacco integration.",
      stat: "158",
      statLabel: "groups",
      icon: "fa-users-rectangle",
      iconClass: "icon-coop",
      status: "amber",
      statusLabel: "amber",
      statusText: "Syncing 2d ago",
      img: "images/cooperatives.jpg",
      cta: "Manage",
    },
    
    {
      id: 2,
      title: "Agripreneur Management",
      tag: "Agtech Pathway 1",
      desc: "Manage agripreneur bootcamps, incubation, commercialization, and performance tracking.",
      stat: "1,336",
      statLabel: "agents",
      icon: "fa-user-tie",
      iconClass: "icon-agripreneur",
      status: "grey",
      statusLabel: "grey",
      statusText: "Secure",
      img: "images/agripreneur.jpg",
      cta: "Manage",
    },
    {
      id: 3,
      title: "One Million Farmer Platform",
      tag: "Agtech Pathway 2",
      desc: "OMFP integration, unified farmer data lake, service matching, and big data insights.",
      stat: "6.4M",
      statLabel: "records",
      icon: "fa-database",
      iconClass: "icon-omfp",
      status: "live",
      statusLabel: "green",
      statusText: "Synced 10m ago",
      img: "images/agritech.webp",
      cta: "View Data",
    },
    {
      id: 4,
      title: "Fertilizer Subsidies",
      tag: "eVoucher",
      desc: "Ministry services: Fertilizer distribution (eVoucher)",
      stat: "eVoucher",
      statLabel: "& Vaccines",
      icon: "fa-syringe",
      iconClass: "icon-moald",
      status: "amber",
      statusLabel: "amber",
      statusText: "Pending",
      img: "images/fertilized.jpg",
      cta: "Check",
    },
    {
      id: 5,
      title: "Vaccination",
      tag: "eVoucher",
      desc: "Ministry services: livestock vaccination tracking.",
      stat: "eVoucher",
      statLabel: "& Vaccines",
      icon: "fa-syringe",
      iconClass: "icon-moald",
      status: "amber",
      statusLabel: "amber",
      statusText: "Pending",
      img: "images/vaccination.jpg",
      cta: "Check",
    },
    {
      id: 6,
      title: "Digital Climate Advisory",
      tag: "KAOP & KALRO",
      desc: "Real-time weather, seasonal forecasts, and climate-smart recommendations delivered via SMS and app.",
      stat: "3,800",
      statLabel: "farmers",
      icon: "fa-cloud-sun-rain",
      iconClass: "icon-climate",
      status: "live",
      statusLabel: "green",
      statusText: "Live Forecast",
      img: "images/kaop.jpg",
      cta: "Get Forecast",
    },
    {
      id: 7,
      title: "Soil Sampling",
      tag: "SFSHMP Platform",
      desc: "Track soil health, sampling requests, and lab results. Precision agriculture starts with accurate soil data.",
      stat: "1,250",
      statLabel: "samples",
      icon: "fa-flask",
      iconClass: "icon-soil",
      status: "live",
      statusLabel: "green",
      statusText: "Synced 2m ago",
      img: "images/soil.jpg",
      cta: "Request",
    },
    {
      id: 8,
      title: "Digitized TIMPs",
      tag: "KeEP Platform",
      desc: "Beneficiaries of Technology, Innovation & Management Practices – monitor adoption and impact.",
      stat: "4,100",
      statLabel: "adopters",
      icon: "fa-microchip",
      iconClass: "icon-timp",
      status: "amber",
      statusLabel: "amber",
      statusText: "Delayed 5d",
      img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      cta: "View",
    },
    
    {
      id: 9,
      title: "Farmer Led Irrigation (FLID)",
      tag: "IoT Sensor Network",
      desc: "Monitor irrigation schemes, water use, and connect farmers with solar-powered smart systems.",
      stat: "78",
      statLabel: "schemes",
      icon: "fa-water",
      iconClass: "icon-flid",
      status: "live",
      statusLabel: "green",
      statusText: "Live Sensor",
      img: "images/irrigation.jpg",
      cta: "View",
    },
    
    {
      id: 10,
      title: "Common Interest Groups",
      tag: "KIAMIS Database",
      desc: "Beneficiary CIG registry: profiles, group dynamics, and saturation coverage across all project wards.",
      stat: "2,300",
      statLabel: "CIGs",
      icon: "fa-people-group",
      iconClass: "icon-cig",
      status: "grey",
      statusLabel: "grey",
      statusText: "Registry",
      img: "images/apoei2.jpg",
      cta: "View",
    },
    
    
    
  ];

  return (
    <>
      {/* TOP UTILITY BAR */}
      <div className="top-utility-bar">
        <div className="utility-left">
          <span>
            <DynamicIcon name="fa-landmark" size={14} /> Official Government
            Portal
          </span>
          <span>
            <DynamicIcon name="fa-shield-alt" size={14} /> Secure Connection
          </span>
        </div>
        <div className="utility-right">
          <button
            className="a11y-btn"
            onClick={() => setHighContrast(!highContrast)}
            title="Toggle High Contrast Mode"
          >
            <DynamicIcon name="fa-eye" size={14} /> High Contrast
          </button>

          <div className="lang-selector-wrapper">
            <button className="lang-btn">
              <DynamicIcon name="fa-globe" size={14} />
              <span>{lang === "en" ? "English" : "Kiswahili"}</span>
              <DynamicIcon name="fa-chevron-down" size={10} />
            </button>
            <div className="lang-dropdown">
              <div
                className={`lang-option ${lang === "en" ? "active" : ""}`}
                onClick={() => handleLanguageChange("en")}
              >
                <DynamicIcon
                  name="fa-check"
                  size={14}
                  style={{
                    color:
                      lang === "en" ? "var(--primary-green)" : "transparent",
                  }}
                />{" "}
                English
              </div>
              <div
                className={`lang-option ${lang === "sw" ? "active" : ""}`}
                onClick={() => handleLanguageChange("sw")}
              >
                <DynamicIcon
                  name="fa-check"
                  size={14}
                  style={{
                    color:
                      lang === "sw" ? "var(--primary-green)" : "transparent",
                  }}
                />{" "}
                Kiswahili
              </div>
            </div>
          </div>
          <span className="utility-link">
            <DynamicIcon name="fa-question-circle" size={14} /> Help Desk
          </span>
        </div>
      </div>

      {/* MAIN HEADER & NAVIGATION */}
      <header>
        <div className="top-header">
          <div className="logo-container">
            <div className="logo-icon-wrapper"> 
              <img 
                src="/public/images/fsrp_logo.jpg" 
                alt="FSRP Logo"
                height={60} 
                width={70}
                
              />

            </div>
            <div className="logo-text">
              <h1>
                FSRP Kenya Intelligence Hub 
              </h1>
              <p>Ministry of Agriculture & Livestock Development</p>
            </div>
          </div>
        </div>

        <div className="nav-bar">
          <nav className="nav-links">
            <div className="nav-item">
              <a href="#" className="active">
                <DynamicIcon name="fa-home" size={16} /> {currentT.navHome}
              </a>
            </div>

            <div className="nav-item">
              <a href="#">
                {currentT.navTech}{" "}
                <DynamicIcon name="fa-chevron-down" size={14} />
              </a>
              <div className="mega-menu">
                <div className="mega-menu-inner">
                  <div className="mega-column">
                    <h4>Climate & Weather</h4>
                    <a href="#" className="mega-link">
                      <DynamicIcon name="fa-cloud-sun-rain" size={24} />
                      <div>
                        <strong>Digital Climate Advisory</strong>
                        <span>Real-time weather, forecasts, and alerts.</span>
                      </div>
                    </a>
                    <a href="#" className="mega-link">
                      <DynamicIcon name="fa-satellite-dish" size={24} />
                      <div>
                        <strong>KAOP Platform</strong>
                        <span>Kenya Agricultural Observatory Platform.</span>
                      </div>
                    </a>
                  </div>
                  <div className="mega-column">
                    <h4>Farm Practices</h4>
                    <a href="#" className="mega-link">
                      <DynamicIcon name="fa-microchip" size={24} />
                      <div>
                        <strong>Digitized TIMPs</strong>
                        <span>Technology & Management Practices.</span>
                      </div>
                    </a>
                    <a href="#" className="mega-link">
                      <DynamicIcon name="fa-flask" size={24} />
                      <div>
                        <strong>Soil Sampling</strong>
                        <span>Precision agriculture and lab results.</span>
                      </div>
                    </a>
                  </div>
                  <div className="mega-column">
                    <h4>Irrigation</h4>
                    <a href="#" className="mega-link">
                      <DynamicIcon name="fa-water" size={24} />
                      <div>
                        <strong>Farmer Led Irrigation</strong>
                        <span>Monitor smart irrigation schemes.</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="nav-item">
              <a href="#">
                {currentT.navPlatforms}{" "}
                <DynamicIcon name="fa-chevron-down" size={14} />
              </a>
              <div className="mega-menu">
                <div className="mega-menu-inner">
                  <div className="mega-column">
                    <h4>Agtech Pathways</h4>
                    <a href="#" className="mega-link">
                      <DynamicIcon name="fa-user-tie" size={24} />
                      <div>
                        <strong>Agripreneur Management</strong>
                        <span>Bootcamps and agent performance.</span>
                      </div>
                    </a>
                    <a href="#" className="mega-link">
                      <DynamicIcon name="fa-database" size={24} />
                      <div>
                        <strong>One Million Farmer Platform</strong>
                        <span>OMFP data lake and insights.</span>
                      </div>
                    </a>
                  </div>
                  <div className="mega-column">
                    <h4>Gov Services</h4>
                    <a href="#" className="mega-link">
                      <DynamicIcon name="fa-syringe" size={24} />
                      <div>
                        <strong>MoALD eVoucher & Vaccines</strong>
                        <span>Fertilizer and livestock vaccination.</span>
                      </div>
                    </a>
                  </div>
                  <div className="mega-column">
                    <h4>Markets</h4>
                    <a href="#" className="mega-link">
                      <DynamicIcon name="fa-truck-fast" size={24} />
                      <div>
                        <strong>Market Linkages (KAMIS)</strong>
                        <span>Commodity prices and market access.</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="nav-item">
              <a href="#">
                {currentT.navRegistries}{" "}
                <DynamicIcon name="fa-chevron-down" size={14} />
              </a>
              <div className="mega-menu">
                <div className="mega-menu-inner">
                  <div className="mega-column">
                    <h4>National Databases</h4>
                    <a href="#" className="mega-link">
                      <DynamicIcon name="fa-people-group" size={24} />
                      <div>
                        <strong>Common Interest Groups</strong>
                        <span>Group profiles and saturation.</span>
                      </div>
                    </a>
                    <a href="#" className="mega-link">
                      <DynamicIcon name="fa-user-check" size={24} />
                      <div>
                        <strong>Registered Farmers</strong>
                        <span>6.4M+ digitized farmer database.</span>
                      </div>
                    </a>
                  </div>
                  <div className="mega-column">
                    <h4>Financial</h4>
                    <a href="#" className="mega-link">
                      <DynamicIcon name="fa-users-rectangle" size={24} />
                      <div>
                        <strong>FPOs & SACCOs</strong>
                        <span>EasySacco integration and credit scores.</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-tag">
              <div className="dot"></div> FOOD SYSTEMS RESILIENCE PROGRAM
            </div>
            <h2 style={{ whiteSpace: "pre-line" }}>{currentT.heroTitle}</h2>
            <p>{currentT.heroDesc}</p>
            <div className="hero-buttons">
              <button className="btn btn-primary">
                {currentT.btnExplore}{" "}
                <DynamicIcon name="fa-arrow-right" size={18} />
              </button>
              <button className="btn btn-outline">
                {currentT.btnResults}
              </button>
            </div>
          </div>

          {/* Priority Alerts Widget */}
          <div className="priority-widget">
            <h4>
              <DynamicIcon name="fa-bell" size={18} /> Priority Actions
            </h4>
            {alerts.map((alert, idx) => (
              <div className="alert-item" key={idx}>
                <div className={`alert-icon ${alert.type}`}>
                  <DynamicIcon name={alert.icon} size={16} />
                </div>
                <div className="alert-text">
                  <strong>{alert.title}</strong>
                  <span>{alert.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-container">
        <div className="marquee-label">
          <DynamicIcon
            name="fa-bullhorn"
            size={16}
            style={{ marginRight: "8px" }}
          />{" "}
          Official Updates
        </div>
        <div className="marquee-content">
          {marqueeItems.map((item, idx) => (
            <div className="marquee-item" key={idx}>
              {item}
            </div>
          ))}
          {marqueeItems.map((item, idx) => (
            <div className="marquee-item" key={`dup-${idx}`}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* IMPACT STATISTICS */}
      <section className="impact-stats-section">
        <div className="impact-grid">
          {impactStats.map((stat, idx) => (
            <div className="impact-item" key={idx}>
              <div className="impact-value">{stat.value}</div>
              <div className="impact-label">{stat.label}</div>
              <div className="impact-desc">{stat.desc}</div>
              <svg className="sparkline" viewBox="0 0 80 24">
                <path className="fill" d={`${stat.spark} L80,24 L0,24 Z`} />
                <path d={stat.spark} />
              </svg>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE MAP PLACEHOLDER */}
      <section className="map-section">
        <div className="map-container">
          <div>
            <h4
              style={{
                fontFamily: "Inter",
                color: "var(--primary-dark)",
                marginBottom: "4px",
                fontWeight: 800,
              }}
            >
              Geospatial Intelligence
            </h4>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
              Explore national agricultural data.
            </p>
          </div>

          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Map of Kenya"
          >
            <path d="M94.7,10.5c-4.3,1.6-9,2.6-12.6,5.4c-3.8,3-6.3,7.4-9.8,10.7c-6.6,6.2-15.6,9-23,14.1c-4.7,3.3-8.5,7.7-13.6,10.4c-4.6,2.4-10.1,3-14.3,6.1c-3,2.2-5.1,5.4-7.8,7.9c-4,3.7-9,6.1-13.4,9.4c-4,3-7.4,6.8-11.7,9.4c-3.9,2.3-8.5,3.3-12,6.2c-2.6,2.2-4.2,5.4-6.7,7.7c-3.7,3.4-8.5,5.3-12.2,8.6c-3,2.7-4.9,6.3-7.7,9.1c-3.8,3.8-8.8,6.1-12.6,9.8c-3.2,3.1-5.2,7.3-8.4,10.4c-3,3-6.9,4.9-10.1,7.6c-2.7,2.3-4.7,5.3-7.4,7.6c-3.7,3.1-8.2,5.1-12,8c-3.2,2.4-5.7,5.6-8.7,8.2c-3.5,3-7.8,4.9-11.5,7.6c-2.7,2.1-4.8,4.9-7.5,7c-3.5,2.8-7.8,4.5-11.2,7.4c-2.8,2.3-4.8,5.4-7.4,7.8c-3.2,3-7.2,4.9-10.6,7.5c-2.7,2.1-4.8,4.9-7.5,7c-3.6,2.7-8,4.3-11.5,7.1c-2.8,2.2-4.9,5.2-7.6,7.5c-3.2,2.7-7.1,4.5-10.5,6.9c-2.7,2-4.8,4.8-7.4,6.9c-3.6,2.9-8,4.6-11.5,7.6c-2.8,2.4-4.8,5.6-7.5,8c-3,2.7-6.9,4.4-10.1,6.8c-2.8,2.1-4.9,5-7.6,7.1c-3.6,2.8-8.1,4.4-11.7,7.2c-2.9,2.3-5,5.4-7.8,7.8c-3,2.6-6.8,4.3-10,6.7c-2.8,2.1-4.9,5-7.6,7.1c-3.5,2.7-7.8,4.3-11.3,7c-2.9,2.2-5,5.2-7.8,7.5c-2.8,2.3-6.1,3.8-9.1,5.9c-2.6,1.8-4.8,4.2-7.2,6.3c-0.4,0.3-0.8,0.5-1.2,0.8c1.6-1.3,3.3-2.5,4.9-3.8c2.9-2.3,5.1-5.4,8-7.7c3.5-2.8,7.8-4.5,11.4-7.2c2.9-2.3,5-5.4,7.8-7.7c3.1-2.6,6.9-4.3,10-6.7c2.8-2.1,4.9-5,7.6-7.2c3.5-2.8,7.9-4.5,11.5-7.3c2.8-2.2,4.9-5.2,7.6-7.5c3.2-2.7,7.1-4.5,10.5-6.9c2.7-2,4.8-4.8,7.4-6.9c3.6-2.9,8-4.6,11.5-7.6c2.8-2.4,4.8-5.6,7.5-8c3-2.7,6.9-4.4,10.1-6.8c2.8-2.1,4.9-5,7.6-7.1c3.6-2.8,8.1-4.4,11.7-7.2c2.9-2.3,5-5.4,7.8-7.8c3-2.6,6.8-4.3,10-6.7c2.8-2.1,4.9-5,7.6-7.1c3.5-2.7,7.8-4.3,11.3-7c2.9-2.2,5-5.2,7.8-7.5c2.8-2.3,6.1-3.8,9.1-5.9c2.6-1.8,4.8-4.2,7.2-6.3c3.8-3.3,8.3-5.7,12.2-8.9c3.5-2.9,6.4-6.5,9.8-9.5c3.9-3.4,8.5-5.8,12.4-9c3.2-2.7,5.8-6.2,8.9-9c3.9-3.5,8.6-6,12.5-9.4c3.2-2.8,5.8-6.4,8.9-9.3c3.5-3.2,7.7-5.5,11.2-8.6c3.5-3.1,6.3-6.9,9.8-9.9c3.5-3.1,7.7-5.4,11.2-8.5c3.5-3.1,6.3-6.9,9.8-9.9c3.1-2.7,6.8-4.6,9.9-7.3c3.7-3.2,6.6-7.2,10.3-10.4c3.7-3.2,8.2-5.5,11.9-8.7c3.2-2.8,5.8-6.3,8.9-9.2c4.2-3.8,9.3-6.5,13.5-10.2c3-2.7,5.3-6.1,8.3-8.8c4.1-3.7,9-6.3,13.1-9.9c2.8-2.4,5.1-5.4,7.9-7.7c3.5-2.9,7.8-4.6,11.3-7.4c3.4-2.8,6-6.5,9.4-9.4c3.8-3.2,8.3-5.5,12.2-8.6c3.2-2.6,5.8-6,8.9-8.6c3.8-3.2,8.2-5.5,12-8.7c3.2-2.7,5.8-6.2,8.9-9c3.9-3.5,8.6-6,12.5-9.4c3.2-2.8,5.8-6.4,8.9-9.3c3.5-3.2,7.7-5.5,11.2-8.6C180.8,11,185.4,8.6,189,5.6c2.3-1.8,4.5-3.8,6.8-5.6c-3.4,1.3-6.6,3-9.8,4.7c-4.5,2.4-9.2,4.2-13.5,7C169.1,13.8,165.7,16.8,162,19c-4.1,2.5-8.7,4.2-12.8,6.8c-3.3,2.1-6.1,4.9-9.4,7c-4,2.5-8.4,4.3-12.4,6.9c-3.3,2.1-6.2,4.9-9.5,7c-4,2.5-8.5,4.2-12.5,6.7c-3.4,2.1-6.2,4.9-9.6,7c-4,2.5-8.5,4.2-12.5,6.7c-3.4,2.1-6.2,4.9-9.6,7c-4,2.5-8.5,4.2-12.5,6.7c-3.4,2.1-6.2,4.9-9.6,7c-4,2.5-8.5,4.2-12.5,6.7c-3.4,2.1-6.2,4.9-9.6,7c-4,2.5-8.5,4.2-12.5,6.7C75,130.6,71.6,133.2,68,135c-4.1,2.2-8.8,3.6-12.8,6c-3.1,1.8-5.7,4.4-8.8,6.2c-4.1,2.4-8.9,3.7-13,6c-3,1.7-5.6,4.1-8.6,5.8c-4.2,2.4-9,3.7-13.1,6.1c-3,1.8-5.6,4.2-8.6,6c-4.2,2.5-9,3.9-13.1,6.4c-3,1.8-5.5,4.3-8.5,6.1c-4.3,2.6-9.1,4-13.2,6.6c-2.9,1.8-5.4,4.2-8.3,6c-4.3,2.7-9.2,4.1-13.4,6.8c-2.8,1.8-5.2,4.3-8,6.1c-4.3,2.7-9.3,4.2-13.5,6.9c-2.7,1.8-5.1,4.3-7.8,6.1c-0.1,0.1-0.2,0.1-0.3,0.2c-0.5,0.3-0.9,0.7-1.4,1c3.7-1.8,7.2-4,10.6-6.2c4.4-2.9,9.5-4.4,13.9-7.3c2.8-1.8,5.1-4.4,7.9-6.2c4.3-2.7,9.3-4.2,13.5-6.9c2.8-1.8,5.2-4.3,8-6.1c4.3-2.7,9.3-4.2,13.5-6.9c2.8-1.8,5.1-4.4,7.9-6.2c4.3-2.7,9.3-4.2,13.5-6.9c2.8-1.8,5.2-4.3,8-6.1c4.3-2.7,9.3-4.2,13.5-6.9c2.8-1.8,5.1-4.4,7.9-6.2c4.3-2.7,9.3-4.2,13.5-6.9c2.8-1.8,5.2-4.3,8-6.1c4.3-2.7,9.2-4.1,13.4-6.8c2.9-1.8,5.4-4.2,8.3-6c4.1-2.6,8.9-4,13.2-6.6c3-1.8,5.5-4.3,8.5-6.1c4.1-2.5,8.9-3.9,13.1-6.4c3-1.8,5.6-4.2,8.6-6c4.1-2.4,8.8-3.7,13-6c3-1.7,5.6-4.1,8.6-5.8c4.1-2.3,8.9-3.6,12.8-6c3.2-1.8,5.8-4.4,8.8-6.2c4-2.4,8.7-3.8,12.5-6.4c3.2-2.1,5.9-4.9,9.1-7c4-2.5,8.5-4.2,12.5-6.7c3.4-2.1,6.2-4.9,9.6-7c4-2.5,8.5-4.2,12.5-6.7c3.4-2.1,6.2-4.9,9.6-7c4-2.5,8.5-4.2,12.5-6.7c3.4-2.1,6.2-4.9,9.6-7c4-2.5,8.5-4.2,12.5-6.7c3.4-2.1,6.2-4.9,9.6-7c4-2.5,8.5-4.2,12.5-6.7c3.4-2.1,6.2-4.9,9.6-7c4-2.5,8.5-4.2,12.5-6.7c3.4-2.1,6.2-4.9,9.6-7c4-2.5,8.5-4.2,12.5-6.7c3.4-2.1,6.2-4.9,9.6-7c4-2.5,8.5-4.2,12.5-6.7c0.3-0.2,0.7-0.4,1-0.6c-0.7-0.3-1.3-0.6-2-0.9c-3.5-1.5-6.5-3.6-9.8-5.4C110.4,10.3,102.7,8.7,94.7,10.5z" />
          </svg>

          <button className="btn-export">
            Open Full Map <DynamicIcon name="fa-expand" size={16} />
          </button>
        </div>
      </section>

      {/* DASHBOARD CARDS SECTION */}
      <section className="dashboard-section">
        <div className="section-header">
          <div>
            <h3>
              <DynamicIcon
                name="fa-network-wired"
                size={24}
                style={{ color: "var(--primary-light)" }}
              />{" "}
              Integrated Service Dashboards
            </h3>
            <div className="legend">
              <div className="legend-item">
                <div className="legend-dot green"></div> Real-time
              </div>
              <div className="legend-item">
                <div className="legend-dot amber"></div> Syncing
              </div>
              <div className="legend-item">
                <div className="legend-dot grey"></div> Registry
              </div>
            </div>
          </div>

          <div className="header-controls">
            <button
              className="btn-export"
              onClick={() => alert("Generating M&E Report for World Bank...")}
            >
              <DynamicIcon name="fa-file-export" size={16} /> Export Report
            </button>
          </div>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div
              className="service-card"
              key={service.id}
              onClick={() => alert(`Navigating to ${service.title}...`)}
            >
              <div className={`sync-bar ${service.status}`}></div>
              <div className="card-image-wrapper">
                <img src={service.img} alt={service.title} />
                <div className="card-image-overlay"></div>
              </div>
              <div className="card-content">
                <div className="card-header">
                  <div className={`card-icon ${service.iconClass}`}>
                    <DynamicIcon name={service.icon} size={24} />
                  </div>
                  <div className="data-status">
                    <div className={`status-pill ${service.statusLabel}`}>
                      <DynamicIcon name="fa-circle" size={8} />{" "}
                      {service.statusText}
                    </div>
                  </div>
                </div>
                <h4>{service.title}</h4>
                <div className="card-tag">{service.tag}</div>
                <p>{service.desc}</p>
                <div className="card-footer">
                  <div className="stat">
                    <DynamicIcon name={service.icon} size={16} /> {service.stat}{" "}
                    <span>{service.statLabel}</span>
                  </div>
                  <button className="cta-button">
                    {service.cta} <DynamicIcon name="fa-arrow-right" size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IMPACT SPOTLIGHT */}
      <section className="spotlight-section">
        <div className="spotlight-card">
          <img
            src="https://images.unsplash.com/photo-1595155370214-4b3e3f9d1c2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Mary, a Kenyan Farmer"
            className="spotlight-img"
          />
          <div className="spotlight-content">
            <h3>Impact Spotlight</h3>
            <p>
              "Before the FLID platform, I relied on rain. Now, with the soil
              sensors and irrigation scheduling from the FSRP team, my maize
              yield has increased by 40%. I can finally plan for my children's
              school fees."
            </p>
            <div className="spotlight-tag">
              Mary W., Farmer in Baringo County
            </div>
          </div>
        </div>
      </section>

      {/* SYSTEM STATUS FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="system-status">
            <div className="pulse"></div> All Systems Operational (API Uptime:
            99.98%)
          </div>
          <div className="footer-links">
            <a href="#">
              <DynamicIcon name="fa-shield-alt" size={14} /> Data Protection Act
              Compliance
            </a>
            <a href="#">
              <DynamicIcon name="fa-file-contract" size={14} /> Data Sharing
              Agreements
            </a>
            <a href="#">
              <DynamicIcon name="fa-headset" size={14} /> NPCU Support
            </a>
          </div>
          <div style={{ fontSize: "0.75rem" }}>
            © 2026 Ministry of Agriculture & Livestock Development. Powered by KALRO.
          </div>
        </div>
      </footer>

      {/* FLOATING AI ASSISTANT */}
      <div
        className="ai-fab"
        onClick={() =>
          alert(
            "FSRP AI Assistant activated. How can I help you with the DAT Manual or TIMPs today?"
          )
        }
        title="Ask FSRP AI"
      >
        <Bot size={28} />
      </div>
    </>
  );
};

export default HomePage;