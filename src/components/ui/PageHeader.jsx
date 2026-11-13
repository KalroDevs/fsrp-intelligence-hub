export default function PageHeader({
  icon,
  title,
  description,
  actions,
  tabs,
  activeTab,
  onTabChange,
}) {
  return (
    <section className="page-bar">
      <div className="page-title-row">
        <div className="page-title">
          <div className="page-icon">{icon}</div>
          <div>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </div>

        {actions && <div className="page-actions">{actions}</div>}
      </div>

      {tabs && (
        <div className="view-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={"view-tab" + (tab === activeTab ? " active" : "")}
              onClick={() => onTabChange?.(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
