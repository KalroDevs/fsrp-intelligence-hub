import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bot } from "lucide-react";
import DynamicIcon from "../../components/DynamicIcon";
import "./homepage.css";

const HomePage = ({ lang = "en", onLangChange, t }) => {
  const navigate = useNavigate();
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

  // Built-in translations
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

  // Resolve translations safely
  const fallback = translations[lang] || translations.en;
  const currentT = (() => {
    if (typeof t === "function") {
      const resolved = {};
      Object.keys(fallback).forEach((key) => {
        const value = t(key);
        resolved[key] = value && value !== key ? value : fallback[key];
      });
      return resolved;
    }
    return fallback;
  })();

  // Data arrays
  const alerts = [
    {
      type: "red",
      icon: "fa-exclamation-triangle",
      title: "Drought Watch: 2 Counties",
      desc: "Water trucking required in ASAL regions.",
    },
    {
      type: "amber",
      icon: "fa-ticket-alt",
      title: "3,000+ eVouchers Pending",
      desc: "Fertilizer redemption closes in 1 week.",
    },
    {
      type: "blue",
      icon: "fa-bug",
      title: "Pest Outbreak Alert",
      desc: "Fall Armyworm reported in Garisaa, Tana River counties.",
    },
  ];

  const marqueeItems = [
    <React.Fragment key="1">
      <span className="tag urgent">URGENT</span>{" "}
      <DynamicIcon name="fa-exclamation-triangle" size={14} />{" "}
      <span>Fall Armyworm alert issued for Trans Nzoia and Bungoma counties.</span>
    </React.Fragment>,
    <React.Fragment key="2">
      <DynamicIcon name="fa-cloud-sun-rain" size={14} />{" "}
      <span>Short rains expected to begin early in the Eastern region. View advisory.</span>
    </React.Fragment>,
    <React.Fragment key="3">
      <span className="tag">NEW</span>{" "}
      <DynamicIcon name="fa-star" size={14} />{" "}
      <span>One Million Farmer Platform API v2.0 is now live for all Agtechs.</span>
    </React.Fragment>,
    <React.Fragment key="4">
      <DynamicIcon name="fa-syringe" size={14} />{" "}
      <span>Livestock vaccination drive starts next Monday in Garissa.</span>
    </React.Fragment>,
  ];

  const impactStats = [
    {
      value: "1.3 Million +",
      label: "Targeted Beneficiaries",
      desc: "Improved productivity, Resilience, Commercialization",
    },
    {
      value: "20",
      label: "Priority Value Chains",
      desc: "Resilience-enhancing practices",
    },
    {
      value: "45%",
      label: "Reported farmer income increases",
      desc: "Beneficiary linkage to inputs, aggregation, and credit access leading to increase in farm income",
    },
    {
      value: "500,000+",
      label: "Livestock Population",
      desc: "Cattle, sheep, goat population",
    },
  ];

  // Each service now has a `route` field mapping to a dashboard page
  const services = [
    {
      id: 1,
      title: "Project Cooperatives",
      tag: "NPCU",
      desc: "Manage FPOs and SACCOs: membership, savings, credit scores, and automated EasySacco integration.",
      stat: "247",
      statLabel: "farmer cooperatives",
      icon: "fa-users-rectangle",
      iconClass: "icon-coop",
      status: "amber",
      statusLabel: "amber",
      statusText: "Syncing 2d ago",
      img: "images/cooperatives.jpg",
      cta: "Manage",
      route: "/cooperatives/home",
    },
    {
      id: 2,
      title: "Agripreneur Management System",
      tag: "CPHRM - Agtech Pathway 1",
      desc: "Manage agripreneur bootcamps, incubation, commercialization, and performance tracking.",
      stat: "1795",
      statLabel: "active agripreneurs",
      icon: "fa-user-tie",
      iconClass: "icon-agripreneur",
      status: "grey",
      statusLabel: "grey",
      statusText: "Secure",
      img: "images/agripreneur.jpg",
      cta: "Manage",
      route: "/dashboard/beneficiaries",
    },
    {
      id: 3,
      title: "Beneficiaries Dashboard",
      tag: "NPCU",
      desc: "Targetted beneficiaries",
      stat: "1.3M",
      statLabel: "beneficiaries",
      icon: "fa-database",
      iconClass: "icon-omfp",
      status: "live",
      statusLabel: "green",
      statusText: "Synced 1 day ago",
      img: "images/farmers.jpg",
      cta: "View Dashboard",
      route: "/beneficiaries/home",
    },
    {
      id: 4,
      title: "One Million Farmer Platform",
      tag: "NPCU - Agtech Pathway 2",
      desc: "OMFP integration, unified farmer data lake, service matching, and big data insights.",
      stat: "60K",
      statLabel: "agritechs",
      icon: "fa-database",
      iconClass: "icon-omfp",
      status: "live",
      statusLabel: "green",
      statusText: "Synced 10m ago",
      img: "images/agritech.webp",
      cta: "View Data",
      route: "/dashboard/beneficiaries",
    },
    {
      id: 5,
      title: "Fertilizer Subsidies",
      tag: "MoALD",
      desc: "Ministry services: Fertilizer distribution (eVoucher)",
      stat: "500K",
      statLabel: "eVouchers",
      icon: "fa-syringe",
      iconClass: "icon-moald",
      status: "amber",
      statusLabel: "amber",
      statusText: "Pending",
      img: "images/fertilized.jpg",
      cta: "Check",
      route: "/dashboard/services",
    },
    {
      id: 6,
      title: "Vaccination",
      tag: "MoALD",
      desc: "Ministry services: livestock vaccination tracking.",
      stat: "300K",
      statLabel: "Vaccines",
      icon: "fa-syringe",
      iconClass: "icon-moald",
      status: "amber",
      statusLabel: "amber",
      statusText: "Pending",
      img: "images/vaccination.jpg",
      cta: "Check",
      route: "/dashboard/services",
    },
    {
      id: 7,
      title: "Digital Climate Advisory",
      tag: "KALRO",
      desc: "Real-time weather, seasonal forecasts, and climate-smart recommendations delivered via SMS and app.",
      stat: "300K",
      statLabel: "beneficiaries",
      icon: "fa-cloud-sun-rain",
      iconClass: "icon-climate",
      status: "live",
      statusLabel: "green",
      statusText: "Live Forecast",
      img: "images/kaop.jpg",
      cta: "Get Forecast",
      route: "/dashboard/advisories",
    },
    {
      id: 8,
      title: "Soil Sampling",
      tag: "KALRO",
      desc: "Sampling requests, digital soil fertility maps and lab results. Precision agriculture starts with accurate soil data.",
      stat: "1,250",
      statLabel: "samples",
      icon: "fa-flask",
      iconClass: "icon-soil",
      status: "live",
      statusLabel: "green",
      statusText: "Synced 2m ago",
      img: "images/soil.jpg",
      cta: "Request",
      route: "/dashboard/technologies",
    },
    {
      id: 9,
      title: "Soil Recommendations",
      tag: "KALRO",
      desc: "Track soil health, sampling requests, and lab results. Precision agriculture starts with accurate soil data.",
      stat: "100K",
      statLabel: "recommendation",
      icon: "fa-flask",
      iconClass: "icon-soil",
      status: "live",
      statusLabel: "green",
      statusText: "Synced 2m ago",
      img: "images/apoei.jpg",
      cta: "Request",
      route: "/dashboard/technologies",
    },
    {
      id: 10,
      title: "Digitized TIMPs",
      tag: "KALRO",
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
      route: "/dashboard/technologies",
    },
    {
      id: 11,
      title: "Farmer Led Irrigation (FLID)",
      tag: "NPCU",
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
      route: "/dashboard/technologies",
    },
    {
      id: 12,
      title: "Common Interest Groups",
      tag: "Business Accelerator-CPHRM",
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
      route: "/dashboard/beneficiaries",
    },
  ];

  return (
    <>
      {/* TOP UTILITY BAR */}
      <div className="top-utility-bar">
        <div className="utility-left">
          <span>
            <DynamicIcon name="fa-landmark" size={14} />{" "}
            <span>Official Government Portal</span>
          </span>
          <span>
            <DynamicIcon name="fa-shield-alt" size={14} />{" "}
            <span>Secure Connection</span>
          </span>
        </div>
        <div className="utility-right">
          <button
            className="a11y-btn"
            onClick={() => setHighContrast(!highContrast)}
            title="Toggle High Contrast Mode"
          >
            <DynamicIcon name="fa-eye" size={14} />{" "}
            <span>High Contrast</span>
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
                <span>English</span>
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
                <span>Kiswahili</span>
              </div>
            </div>
          </div>
          <span className="utility-link">
            <DynamicIcon name="fa-question-circle" size={14} />{" "}
            <span>Help Desk</span>
          </span>
        </div>
      </div>

      {/* MAIN HEADER & NAVIGATION */}
      <header>
        <div className="top-header">
          <div className="logo-container">
            <div className="logo-icon-wrapper">
              <img
                src="/images/fsrp_logo.jpg"
                alt="FSRP Logo"
                height={60}
                width={70}
              />
            </div>
            <div className="logo-text">
              <h1>FSRP Kenya Intelligence Hub</h1>
              <p>Ministry of Agriculture and Livestock Development</p>
            </div>
          </div>
        </div>

        <div className="nav-bar">
          <nav className="nav-links">
            <div className="nav-item">
              <a href="#" className="active">
                <DynamicIcon name="fa-home" size={16} />{" "}
                <span>{currentT.navHome}</span>
              </a>
            </div>

            <div className="nav-item">
              <a href="#">
                <span>{currentT.navTech}</span>
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
                <span>{currentT.navPlatforms}</span>
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
                    <h4>GOV Services</h4>
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
                <span>{currentT.navRegistries}</span>
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
              <div className="dot"></div>{" "}
              <span>FOOD SYSTEMS RESILIENCE PROGRAM</span>
            </div>
            <h2 style={{ whiteSpace: "pre-line" }}>{currentT.heroTitle}</h2>
            <p>{currentT.heroDesc}</p>
            <div className="hero-buttons">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/login")}
              >
                <span>{currentT.btnExplore}</span>
                <DynamicIcon name="fa-arrow-right" size={18} />
              </button>
              <button
                className="btn btn-outline"
                onClick={() => navigate("/dashboard/home")}
              >
                <span>{currentT.btnResults}</span>
              </button>
            </div>
          </div>

          {/* Priority Alerts Widget */}
          <div className="priority-widget">
            <h4>
              <DynamicIcon name="fa-bell" size={18} />{" "}
              <span>Priority Actions</span>
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
          <span>Official Updates</span>
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
            </div>
          ))}
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
              <span>Integrated Service Dashboards</span>
            </h3>
            <div className="legend">
              <div className="legend-item">
                <div className="legend-dot green"></div>{" "}
                <span>Real-time</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot amber"></div>{" "}
                <span>Syncing</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot grey"></div>{" "}
                <span>Registry</span>
              </div>
            </div>
          </div>

          <div className="header-controls">
            <button
              className="btn-export"
              onClick={() => alert("Generating M&E Report for World Bank...")}
            >
              <DynamicIcon name="fa-file-export" size={16} />{" "}
              <span>Export Report</span>
            </button>
          </div>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div
              className="service-card"
              key={service.id}
              onClick={() => navigate(service.route)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate(service.route);
                }
              }}
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
                      <span>{service.statusText}</span>
                    </div>
                  </div>
                </div>
                <h4>{service.title}</h4>
                <div className="card-tag">{service.tag}</div>
                <p>{service.desc}</p>
                <div className="card-footer">
                  <div className="stat">
                    <DynamicIcon name={service.icon} size={16} />{" "}
                    <span>{service.stat}</span>{" "}
                    <span>{service.statLabel}</span>
                  </div>
                  <button
                    className="cta-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(service.route);
                    }}
                  >
                    <span>{service.cta}</span>{" "}
                    <DynamicIcon name="fa-arrow-right" size={14} />
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
            src="images/cig.jpg"
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
            <div className="pulse"></div>{" "}
            <span>All Systems Operational (API Uptime: 99.98%)</span>
          </div>
          <div className="footer-links">
            <a href="#">
              <DynamicIcon name="fa-shield-alt" size={14} />{" "}
              <span>Data Protection Act Compliance</span>
            </a>
            <a href="#">
              <DynamicIcon name="fa-file-contract" size={14} />{" "}
              <span>Data Sharing Agreements</span>
            </a>
            <a href="#">
              <DynamicIcon name="fa-headset" size={14} />{" "}
              <span>NPCU Support</span>
            </a>
          </div>
          <div style={{ fontSize: "0.75rem" }}>
            © 2026 Ministry of Agriculture & Livestock Development. Powered by
            KALRO.
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