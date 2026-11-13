export default function FilterBar({
  buttons,
  activeButton,
  onButtonChange,
  selects,
}) {
  return (
    <div className="filterbar">
      {buttons && (
        <div className="filter-left">
          {buttons.map((btn) => (
            <button
              key={btn.value}
              type="button"
              className={"filter-button" + (activeButton === btn.value ? " active" : "")}
              onClick={() => onButtonChange?.(btn.value)}
            >
              {btn.label}
            </button>
          ))}
        </div>
      )}

      {selects && (
        <div className="filter-right">
          {selects.map((select) => (
            <select
              key={select.id}
              className="filter-select"
              value={select.value}
              onChange={(e) => select.onChange(e.target.value)}
              aria-label={select.label}
            >
              <option value="">{select.placeholder}</option>
              {select.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ))}
        </div>
      )}
    </div>
  );
}
