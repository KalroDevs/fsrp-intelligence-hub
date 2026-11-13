export default function Modal({
  open,
  onClose,
  initials,
  title,
  subtitle,
  tabs,
  activeTab,
  onTabChange,
  children,
  footerNote,
  onSave,
  showSave,
}) {
  if (!open) return null;

  return (
    <div
      className="modal-overlay open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="profile-modal">
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="modal-profile-avatar">{initials}</div>
            <div className="modal-header-text">
              <strong>{title}</strong>
              <span>{subtitle}</span>
            </div>
          </div>
          <button className="modal-close" onClick={onClose} type="button">
            ✕
          </button>
        </div>

        <div className="modal-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={"modal-tab" + (activeTab === tab.id ? " active" : "")}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="modal-body">{children}</div>

        <div className="modal-footer">
          <div className="modal-footer-left">{footerNote}</div>
          <div className="modal-footer-actions">
            <button className="modal-btn modal-btn-secondary" onClick={onClose} type="button">
              Cancel
            </button>
            {showSave && (
              <button className="modal-btn modal-btn-primary" onClick={onSave} type="button">
                Save changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
