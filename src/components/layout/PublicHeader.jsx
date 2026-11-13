import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Accessibility settings component
function AccessibilityTools({ onSettingsChange }) {
  const [settings, setSettings] = useState({
    fontSize: 100,
    contrast: false,
    darkMode: false,
    grayscale: false,
  });

  useEffect(() => {
    const root = document.documentElement;
    
    root.style.fontSize = `${settings.fontSize}%`;
    
    if (settings.darkMode) {
      root.classList.add('dark-mode');
    } else {
      root.classList.remove('dark-mode');
    }
    
    if (settings.grayscale) {
      root.classList.add('grayscale');
    } else {
      root.classList.remove('grayscale');
    }
    
    if (settings.contrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    onSettingsChange?.(settings);
  }, [settings, onSettingsChange]);

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: key === 'fontSize' ? prev[key] : !prev[key]
    }));
  };

  const handleFontSizeChange = (e) => {
    setSettings(prev => ({
      ...prev,
      fontSize: parseInt(e.target.value)
    }));
  };

  return (
    <div className="accessibility-tools">
      <button
        onClick={() => toggleSetting('fontSize')}
        className="access-btn"
        title="Toggle font size controls"
      >
        A<span style={{ fontSize: '10px' }}>↑↓</span>
      </button>
      {settings.fontSize !== 100 && (
        <>
          <input
            type="range"
            min="80"
            max="150"
            value={settings.fontSize}
            onChange={handleFontSizeChange}
            className="access-font-size-range"
          />
          <span className="access-font-size-label">{settings.fontSize}%</span>
        </>
      )}
      
      <div className="access-divider" />
      
      <button
        onClick={() => toggleSetting('contrast')}
        className={`access-btn ${settings.contrast ? 'active' : ''}`}
        title="High contrast"
      >
        ◐
      </button>
      
      <button
        onClick={() => toggleSetting('darkMode')}
        className={`access-btn ${settings.darkMode ? 'active' : ''}`}
        title="Dark mode"
      >
        {settings.darkMode ? '☀️' : '🌙'}
      </button>
      
      <button
        onClick={() => toggleSetting('grayscale')}
        className={`access-btn ${settings.grayscale ? 'active' : ''}`}
        title="Grayscale mode"
      >
        ◯
      </button>
    </div>
  );
}

export default function PublicHeader({ lang, onLangChange, t }) {
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [accessSettings, setAccessSettings] = useState({});

  const handleSettingsChange = (settings) => {
    setAccessSettings(settings);
    const hasActive = settings.contrast || settings.darkMode || settings.grayscale || settings.fontSize !== 100;
    setHasChanges(hasActive);
  };

  return (
    <>
      <div className="identity-header">
        <div className="container identity-inner">
          <Link to="/" className="brand">
            <div className="brand-mark">
              <img 
                src="/public/images/fsrp_logo.jpg" 
                alt="FSRP Logo"
                height={60} 
                width={70}
                onError={(e) => {
                  e.target.style.display = 'none';
                  const parent = e.target.parentElement;
                  const fallback = document.createElement('span');
                  fallback.className = 'brand-icon-fallback';
                  fallback.textContent = 'FSRP';
                  parent.appendChild(fallback);
                }}
              />
            </div>
            <div>
              <div className="brand-name">
               Beneficiary Services Information System<span className="brand-badge">BSIS</span>
              </div>
              <div className="brand-description">
                Resilient Livelihoods. Connected Communities.
                <span style={{ marginLeft: '6px', color: 'var(--brand-500)' }}>✦</span>
              </div>
            </div>
          </Link>

          <div className="header-actions">
            <button
              className={`access-toggle-btn ${showAccessibility ? 'active' : ''} ${hasChanges ? 'has-changes' : ''}`}
              onClick={() => setShowAccessibility(!showAccessibility)}
              aria-expanded={showAccessibility}
              aria-label="Accessibility settings"
            >
              ♿ <span className="badge-dot" />
            </button>

            {showAccessibility && (
              <AccessibilityTools onSettingsChange={handleSettingsChange} />
            )}

            <select
              className="btn-pill btn-pill-light"
              value={lang}
              onChange={(e) => onLangChange(e.target.value)}
              aria-label="Language"
              style={{ 
                cursor: "pointer",
                minHeight: '36px',
                fontSize: '10px',
              }}
            >
              <option value="en">English</option>
              <option value="sw">Kiswahili</option>
            </select>
          </div>
        </div>
      </div>

      <nav className="main-menu" aria-label="Primary navigation">
        <div className="container menu-inner">
          <ul className="menu-links">
            <li><Link to="/" aria-current="page">{t("navHome")}</Link></li>
            <li><Link to="/dashboard/technologies">{t("navTechnologies")}</Link></li>
            <li><Link to="/dashboard/advisories">{t("navAdvisories")}</Link></li>
            <li><Link to="/dashboard/services">{t("navServices")}</Link></li>
            <li><Link to="/dashboard/beneficiaries">{t("navBeneficiaries")}</Link></li>
          </ul>

          <div className="menu-actions">
            <Link to="/login" className="btn-pill btn-pill-light">{t("signIn")}</Link>
            <Link to="/dashboard" className="btn-pill btn-pill-primary">{t("dashboard")}</Link>
          </div>
        </div>
      </nav>
    </>
  );
}