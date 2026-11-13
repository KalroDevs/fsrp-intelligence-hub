export default function DetailsPanel({
  label,
  reference,
  initials,
  name,
  subtitle,
  pills,
  properties,
  exposureCards,
  bodyLabel,
  bodyText,
  activity,
  onClose,
  onEdit,
  onOpenFull,
}) {
  return (
    <aside className="details-panel">
      <div className="details-header">
        <div>
          <span>{label}</span>
          <strong>{reference}</strong>
        </div>
        <button className="close-details" onClick={onClose} type="button">
          ✕
        </button>
      </div>

      <div className="details-scroll">
        <div className="profile-header">
          <div className="profile-large">{initials}</div>
          <div className="profile-heading">
            <h2>{name}</h2>
            <p>{subtitle}</p>
            <div className="detail-pills">
              {pills.map((p) => (
                <span key={p} className="pill pill-gray">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="detail-section">
          <div className="detail-section-title">
            <strong>Profile</strong>
          </div>
          <div className="properties">
            {properties.map((p) => (
              <div className="property" key={p.label}>
                <div className="property-label">{p.label}</div>
                <div className="property-value">{p.value ?? "—"}</div>
              </div>
            ))}
          </div>
        </div>

        {exposureCards && (
          <div className="detail-section">
            <div className="detail-section-title">
              <strong>FSRP participation</strong>
            </div>
            <div className="exposure-grid">
              {exposureCards.map((c) => (
                <div className="exposure-card" key={c.label}>
                  <span>{c.label}</span>
                  <strong>{c.value ?? "—"}</strong>
                </div>
              ))}
            </div>
          </div>
        )}

        {bodyText && (
          <div className="detail-section">
            <div className="detail-section-title">
              <strong>{bodyLabel}</strong>
            </div>
            <div
              style={{
                padding: "12px",
                border: "1px solid var(--border)",
                borderRadius: "9px",
                background: "var(--surface-2)",
                color: "var(--muted)",
                fontSize: "10px",
                lineHeight: 1.6,
              }}
            >
              {bodyText}
            </div>
          </div>
        )}

        {activity && (
          <div className="detail-section">
            <div className="detail-section-title">
              <strong>Activity</strong>
            </div>
            <div className="activity-list">
              {activity.map((a, i) => (
                <div className="activity-item" key={i}>
                  <div className="activity-avatar">{a.initials}</div>
                  <div className="activity-body">
                    <strong>{a.title}</strong>
                    <p>{a.body}</p>
                    <time>{a.time}</time>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="details-footer">
        <button className="btn btn-secondary" onClick={onEdit} type="button">
          Edit profile
        </button>
        <button className="btn btn-primary" onClick={onOpenFull} type="button">
          Open full profile
        </button>
      </div>
    </aside>
  );
}
