import React from 'react';
import DynamicIcon from './DynamicIcon';

const Header = ({ highContrast, toggleContrast, language, setLanguage }) => {
  const translations = {
    en: { home: 'Home', tech: 'Technologies & Advisories', platforms: 'Platforms & Services', registries: 'Beneficiary Registries' },
    sw: { home: 'Mwanzo', tech: 'Teknolojia na Ushauri', platforms: 'Majukwaa na Huduma', registries: 'Daftari za Walengwa' }
  };
  const t = translations[language];

  return (
    <>
      <div className="top-utility-bar">
        <div className="utility-left">
          <span><DynamicIcon name="fa-landmark" size={14} /> Official Government Portal</span>
          <span><DynamicIcon name="fa-shield-alt" size={14} /> Secure Connection</span>
        </div>
        <div className="utility-right">
          <button className="a11y-btn" onClick={toggleContrast}>
            <DynamicIcon name="fa-eye" size={14} /> High Contrast
          </button>
          
          <div className="lang-selector-wrapper">
            <button className="lang-btn">
              <DynamicIcon name="fa-globe" size={14} /> {language === 'en' ? 'English' : 'Kiswahili'} <DynamicIcon name="fa-chevron-down" size={12} />
            </button>
            <div className="lang-dropdown">
              <div className={`lang-option ${language === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')}>
                <DynamicIcon name="fa-check" size={14} style={{color: language === 'en' ? 'var(--primary-green)' : 'transparent'}} /> English
              </div>
              <div className={`lang-option ${language === 'sw' ? 'active' : ''}`} onClick={() => setLanguage('sw')}>
                <DynamicIcon name="fa-check" size={14} style={{color: language === 'sw' ? 'var(--primary-green)' : 'transparent'}} /> Kiswahili
              </div>
            </div>
          </div>
          <span className="utility-link"><DynamicIcon name="fa-question-circle" size={14} /> Help Desk</span>
        </div>
      </div>

      <header>
        <div className="top-header">
          <div className="logo-container">
            <div className="logo-icon-wrapper">
              <DynamicIcon name="fa-leaf" size={28} />
            </div>
            <div className="logo-text">
              <h1>FSRP Kenya Intelligence Hub <span className="badge">FSRP</span></h1>
              <p>Ministry of Agriculture & Livestock Development · World Bank</p>
            </div>
          </div>
        </div>

        <div className="nav-bar">
          <nav className="nav-links">
            <div className="nav-item"><a href="#" className="active"><DynamicIcon name="fa-home" size={16} /> {t.home}</a></div>
            
            <div className="nav-item">
              <a href="#">{t.tech} <DynamicIcon name="fa-chevron-down" size={14} /></a>
              <div className="mega-menu">
                <div className="mega-menu-inner">
                  <div className="mega-column">
                    <h4>Climate & Weather</h4>
                    <a href="#" className="mega-link"><DynamicIcon name="fa-cloud-sun-rain" size={20} /><div><strong>Digital Climate Advisory</strong><span>Real-time weather, forecasts, and alerts.</span></div></a>
                    <a href="#" className="mega-link"><DynamicIcon name="fa-database" size={20} /><div><strong>KAOP Platform</strong><span>Kenya Agricultural Observatory Platform.</span></div></a>
                  </div>
                  <div className="mega-column">
                    <h4>Farm Practices</h4>
                    <a href="#" className="mega-link"><DynamicIcon name="fa-microchip" size={20} /><div><strong>Digitized TIMPs</strong><span>Technology & Management Practices.</span></div></a>
                    <a href="#" className="mega-link"><DynamicIcon name="fa-flask" size={20} /><div><strong>Soil Sampling</strong><span>Precision agriculture and lab results.</span></div></a>
                  </div>
                  <div className="mega-column">
                    <h4>Irrigation</h4>
                    <a href="#" className="mega-link"><DynamicIcon name="fa-water" size={20} /><div><strong>Farmer Led Irrigation</strong><span>Monitor smart irrigation schemes.</span></div></a>
                  </div>
                </div>
              </div>
            </div>

            <div className="nav-item">
              <a href="#">{t.platforms} <DynamicIcon name="fa-chevron-down" size={14} /></a>
              <div className="mega-menu">
                <div className="mega-menu-inner">
                  <div className="mega-column">
                    <h4>Agtech Pathways</h4>
                    <a href="#" className="mega-link"><DynamicIcon name="fa-user-tie" size={20} /><div><strong>Agripreneur Management</strong><span>Bootcamps and agent performance.</span></div></a>
                    <a href="#" className="mega-link"><DynamicIcon name="fa-database" size={20} /><div><strong>One Million Farmer Platform</strong><span>OMFP data lake and insights.</span></div></a>
                  </div>
                  <div className="mega-column">
                    <h4>Gov Services</h4>
                    <a href="#" className="mega-link"><DynamicIcon name="fa-syringe" size={20} /><div><strong>MoALD eVoucher & Vaccines</strong><span>Fertilizer and livestock vaccination.</span></div></a>
                  </div>
                  <div className="mega-column">
                    <h4>Markets</h4>
                    <a href="#" className="mega-link"><DynamicIcon name="fa-truck-fast" size={20} /><div><strong>Market Linkages (KAMIS)</strong><span>Commodity prices and market access.</span></div></a>
                  </div>
                </div>
              </div>
            </div>

            <div className="nav-item">
              <a href="#">{t.registries} <DynamicIcon name="fa-chevron-down" size={14} /></a>
              <div className="mega-menu">
                <div className="mega-menu-inner">
                  <div className="mega-column">
                    <h4>National Databases</h4>
                    <a href="#" className="mega-link"><DynamicIcon name="fa-people-group" size={20} /><div><strong>Common Interest Groups</strong><span>Group profiles and saturation.</span></div></a>
                    <a href="#" className="mega-link"><DynamicIcon name="fa-user-check" size={20} /><div><strong>Registered Farmers</strong><span>6.4M+ digitized farmer database.</span></div></a>
                  </div>
                  <div className="mega-column">
                    <h4>Financial</h4>
                    <a href="#" className="mega-link"><DynamicIcon name="fa-users-rectangle" size={20} /><div><strong>FPOs & SACCOs</strong><span>EasySacco integration and credit scores.</span></div></a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;