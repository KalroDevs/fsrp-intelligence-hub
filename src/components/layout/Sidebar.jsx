import { NavLink } from "react-router-dom";

const NAV_SECTIONS = [
  {
    label: "Workspace",
    items: [{ to: "/dashboard/home", icon: "◫", text: "Home", end: true }],
  },
  {
    label: "Program",
    items: [
      { to: "/dashboard/technologies", icon: "🌱", text: "Technologies" },
      { to: "/dashboard/advisories", icon: "☀", text: "Advisories" },
      { to: "/dashboard/services", icon: "🤝", text: "Services" },
      { to: "/dashboard/beneficiaries", icon: "👥", text: "Beneficiaries", count: "64K" },
    ],
  },
  {
    label: "Workspace Settings",
    items: [{ to: "/dashboard/settings", icon: "⚙", text: "Settings" }],
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <a href="/" className="brand">
          <div className="brand-logo">
            <img 
                src="/public/images/fsrp_logo.jpg" 
                alt="FSRP Logo"
                height={75} 
                width={100}
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
          
        </a>
      </div>

      <div className="workspace-selector">
        <button className="workspace-button" type="button">
          <div className="workspace-avatar">FK</div>
          <div className="workspace-meta">
            <strong>Beneficiaries Services Information System</strong>
            <span>National / NPCU</span>
          </div>
          <span>▾</span>
        </button>
      </div>

      <div className="sidebar-create">
        <button className="create-button" type="button">
          ＋ Add beneficiary
        </button>
      </div>

      <div className="sidebar-scroll">
        <nav>
          {NAV_SECTIONS.map((section) => (
            <div className="nav-section" key={section.label}>
              <div className="nav-label">{section.label}</div>

              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    "nav-item" + (isActive ? " active" : "")
                  }
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.text}</span>
                  {item.count && <span className="nav-count">{item.count}</span>}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="user-box">
          <div className="user-avatar">KK</div>
          <div className="user-meta">
            <strong>Kevin Kiambe</strong>
            <span>National / NPCU</span>
          </div>
          <span style={{ color: "var(--muted)" }}>⋮</span>
        </div>
      </div>
    </aside>
  );
}
