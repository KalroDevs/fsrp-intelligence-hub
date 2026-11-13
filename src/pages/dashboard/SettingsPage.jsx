import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";

const NAV_ITEMS = [
  { id: "profile", icon: "👤", label: "Profile" },
  { id: "workspace", icon: "🏢", label: "Workspace" },
  { id: "language", icon: "🌐", label: "Language" },
  { id: "notifications", icon: "🔔", label: "Notifications" },
  { id: "appearance", icon: "🎨", label: "Appearance" },
  { id: "security", icon: "🔐", label: "Security" },
  { id: "privacy", icon: "🛡", label: "Privacy & Data" },
  { id: "integrations", icon: "🔌", label: "Integrations" },
];

const DEFAULT_NOTIFICATIONS = [
  { id: "advisory", title: "Advisory approval alerts", body: "Notify me when an advisory requires review, approval or publication.", checked: true },
  { id: "techValidation", title: "Technology validation alerts", body: "Receive updates when technologies move through validation or scaling stages.", checked: true },
  { id: "countyReporting", title: "County reporting reminders", body: "Remind me when county reporting submissions are due.", checked: true },
  { id: "serviceDelivery", title: "Service delivery updates", body: "Notify me about service request, fulfilment and feedback events.", checked: false },
  { id: "email", title: "Email notifications", body: "Receive selected alerts by email.", checked: true },
  { id: "sms", title: "SMS notifications", body: "Receive urgent workflow alerts by SMS.", checked: false },
];

const INTEGRATIONS = [
  { icon: "📊", name: "Advisories", desc: "Sync verified beneficiary advisories and results data." },
  { icon: "📩", name: "SMS Gateway", desc: "Deliver advisories and alerts to farmers via bulk SMS." },
  { icon: "🗺", name: "Vaccinations", desc: "National livestock vaccinations" },
   { icon: "📊", name: "eSubsidies", desc: "National eSubsidies." },
  { icon: "📩", name: "SMS Gateway", desc: "Deliver advisories and alerts to farmers via bulk SMS." },
  { icon: "🗺", name: "SACCO/FPO", desc: "Farmer Groups" },

];

export default function SettingsPage({ lang, onLangChange }) {
  const [activePanel, setActivePanel] = useState("profile");
  const [profile, setProfile] = useState({
    firstName: "Kevin",
    lastName: "Kiambe",
    email: "kevin.kiambe@example.org",
    phone: "+254 7XX XXX XXX",
    jobTitle: "ICT Officer / Data Scientist",
    organization: "KALRO",
  });
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATIONS);

  function toggleNotification(id) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, checked: !n.checked } : n))
    );
  }

  return (
    <DashboardLayout crumb="Settings" lang={lang} onLangChange={onLangChange}>
      <PageHeader
        icon="⚙"
        title="Settings"
        description="Manage your profile, workspace, language, notifications, security and platform preferences."
        actions={
          <>
            <button className="btn btn-secondary" type="button">Reset</button>
            <button className="btn btn-primary" type="button">Save changes</button>
          </>
        }
      />

      <div className="content">
        <div className="settings-layout">
          <aside className="settings-nav">
            <div className="settings-nav-title">Settings</div>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={"settings-nav-item" + (activePanel === item.id ? " active" : "")}
                onClick={() => setActivePanel(item.id)}
              >
                <span className="settings-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </aside>

          <section className="settings-content">
            {activePanel === "profile" && (
              <div className="settings-panel active">
                <section className="settings-card">
                  <div className="settings-card-header">
                    <div>
                      <strong>Profile settings</strong>
                      <span>Manage your personal information and user account details.</span>
                    </div>
                  </div>

                  <div className="settings-card-body">
                    <div className="profile-block">
                      <div className="profile-avatar">KK</div>
                      <div className="profile-info">
                        <strong>{profile.firstName} {profile.lastName}</strong>
                        <span>National / NPCU · Administrator</span>
                      </div>
                      <button className="btn btn-secondary" type="button">Change photo</button>
                    </div>

                    <div className="form-grid">
                      {[
                        ["firstName", "First name", "text"],
                        ["lastName", "Last name", "text"],
                        ["email", "Email", "email"],
                        ["phone", "Phone number", "tel"],
                        ["jobTitle", "Job title", "text"],
                        ["organization", "Organization", "text"],
                      ].map(([key, label, type]) => (
                        <div className="form-group" key={key}>
                          <label className="form-label">{label}</label>
                          <input
                            type={type}
                            className="form-control"
                            value={profile[key]}
                            onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activePanel === "workspace" && (
              <div className="settings-panel active">
                <section className="settings-card">
                  <div className="settings-card-header">
                    <div>
                      <strong>Workspace settings</strong>
                      <span>Details about your FSRP workspace and reporting scope.</span>
                    </div>
                  </div>
                  <div className="settings-card-body">
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label">Workspace name</label>
                        <input className="form-control" defaultValue="FSRP Workspace" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Reporting level</label>
                        <select className="form-control" defaultValue="National / NPCU">
                          <option>National / NPCU</option>
                          <option>County</option>
                          <option>Implementing Partner</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activePanel === "language" && (
              <div className="settings-panel active">
                <section className="settings-card">
                  <div className="settings-card-header">
                    <div>
                      <strong>Language</strong>
                      <span>Choose the language used across the FSRP platform.</span>
                    </div>
                  </div>
                  <div className="settings-card-body">
                    <div className="option-grid">
                      {[
                        { code: "en", label: "English", icon: "🇬🇧" },
                        { code: "sw", label: "Kiswahili", icon: "🇰🇪" },
                      ].map((option) => (
                        <div
                          key={option.code}
                          className={"option-card" + (lang === option.code ? " selected" : "")}
                          onClick={() => onLangChange(option.code)}
                        >
                          <div className="option-card-icon">{option.icon}</div>
                          <strong>{option.label}</strong>
                          <span>{option.code === "en" ? "Default platform language" : "Lugha ya Kiswahili"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activePanel === "notifications" && (
              <div className="settings-panel active">
                <section className="settings-card">
                  <div className="settings-card-header">
                    <div>
                      <strong>Notification settings</strong>
                      <span>Control which events generate alerts and how they are delivered.</span>
                    </div>
                  </div>
                  <div className="settings-card-body">
                    {notifications.map((n) => (
                      <div className="setting-row" key={n.id}>
                        <div className="setting-row-left">
                          <strong>{n.title}</strong>
                          <span>{n.body}</span>
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={n.checked}
                            onChange={() => toggleNotification(n.id)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activePanel === "appearance" && (
              <div className="settings-panel active">
                <section className="settings-card">
                  <div className="settings-card-header">
                    <div>
                      <strong>Appearance</strong>
                      <span>Choose how the FSRP workspace looks for you.</span>
                    </div>
                  </div>
                  <div className="settings-card-body">
                    <div className="option-grid">
                      {["Light", "Dark", "System"].map((mode) => (
                        <div className={"option-card" + (mode === "Light" ? " selected" : "")} key={mode}>
                          <div className="option-card-icon">{mode === "Dark" ? "🌙" : mode === "System" ? "🖥" : "☀"}</div>
                          <strong>{mode}</strong>
                          <span>{mode} interface theme</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activePanel === "security" && (
              <div className="settings-panel active">
                <section className="settings-card">
                  <div className="settings-card-header">
                    <div>
                      <strong>Security</strong>
                      <span>Manage password, sessions and two-factor authentication.</span>
                    </div>
                  </div>
                  <div className="settings-card-body">
                    <div className="security-summary">
                      <div className="security-card">
                        <span>Password</span>
                        <strong>Last changed 3 months ago</strong>
                      </div>
                      <div className="security-card">
                        <span>Two-factor authentication</span>
                        <strong>Not enabled</strong>
                      </div>
                    </div>
                    <div className="form-grid" style={{ marginTop: 16 }}>
                      <div className="form-group">
                        <label className="form-label">Current password</label>
                        <input type="password" className="form-control" placeholder="••••••••" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">New password</label>
                        <input type="password" className="form-control" placeholder="••••••••" />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activePanel === "privacy" && (
              <div className="settings-panel active">
                <section className="settings-card">
                  <div className="settings-card-header">
                    <div>
                      <strong>Privacy & Data</strong>
                      <span>Control how your data is used and exported.</span>
                    </div>
                  </div>
                  <div className="settings-card-body">
                    <div className="setting-row">
                      <div className="setting-row-left">
                        <strong>Usage analytics</strong>
                        <span>Help improve the platform by sharing anonymized usage data.</span>
                      </div>
                      <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <div className="setting-row">
                      <div className="setting-row-left">
                        <strong>Export my data</strong>
                        <span>Download a copy of your account and activity data.</span>
                      </div>
                      <button className="btn btn-secondary" type="button">Request export</button>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activePanel === "integrations" && (
              <div className="settings-panel active">
                <section className="settings-card">
                  <div className="settings-card-header">
                    <div>
                      <strong>Integrations</strong>
                      <span>Connected systems and data pipelines.</span>
                    </div>
                  </div>
                  <div className="settings-card-body">
                    <div className="integration-list">
                      {INTEGRATIONS.map((i) => (
                        <div className="integration-row" key={i.name}>
                          <div className="integration-icon">{i.icon}</div>
                          <div className="integration-meta">
                            <strong>{i.name}</strong>
                            <span>{i.desc}</span>
                          </div>
                          <button className="btn btn-secondary" type="button">Configure</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            )}
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
