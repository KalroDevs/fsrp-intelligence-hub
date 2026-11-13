// DashboardLayout.jsx
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import DashboardFooter from './DashboardFooter.jsx';

export default function DashboardLayout({
  crumb,
  lang,
  onLangChange,
  detailsOpen,
  detailsPanel,
  children,
}) {
  return (
    <div className={"app" + (detailsOpen ? " details-open" : "")}>
      <Sidebar />

      <main className="main">
        <Topbar crumb={crumb} lang={lang} onLangChange={onLangChange} />
        
        {/* Main Content Area */}
        <div className="dashboard-content-wrapper">
          {children}
        </div>
        
        {/* Footer */}
        <DashboardFooter compact={false} />
      </main>

      {detailsPanel}
    </div>
  );
}