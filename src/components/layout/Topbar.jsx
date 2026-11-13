export default function Topbar({ crumb, lang, onLangChange }) {
  return (
    <header className="topbar">
      <div>
        <button className="menu-mobile" type="button" aria-label="Toggle menu">
          ☰
        </button>

        <div className="breadcrumbs">
          FSRP / <strong>{crumb}</strong>
        </div>
      </div>

      <div className="command-search">
        <span className="search-icon">⌕</span>
        <input
          type="search"
          placeholder="Search beneficiaries, organizations, counties..."
        />
        <span className="search-shortcut">Ctrl + K</span>
      </div>

      <div className="top-actions">
        <select
          className="language-top"
          value={lang}
          onChange={(e) => onLangChange?.(e.target.value)}
          aria-label="Language"
        >
          <option value="en">English</option>
          <option value="sw">Kiswahili</option>
        </select>

        <button className="top-button" type="button" aria-label="Help">
          ?
        </button>
        <button className="top-button" type="button" aria-label="Notifications">
          ◉
        </button>
        <button className="top-button" type="button" aria-label="Apps">
          ▦
        </button>
      </div>
    </header>
  );
}
