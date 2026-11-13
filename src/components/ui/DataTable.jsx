import Pill from "./Pill.jsx";

/**
 * columns: [{ key, label, width }]   width is a CSS grid track, e.g. "100px" or "1.8fr"
 * rows: array of plain objects, each rendered via `renderCell(row, column)`
 */
export default function DataTable({
  title,
  count,
  columns,
  rows,
  selectedId,
  onSelectRow,
  renderCell,
}) {
  const gridTemplateColumns = columns.map((c) => c.width).join(" ");

  return (
    <section className="list-card">
      <div className="list-toolbar">
        <div className="list-heading">
          <strong>{title}</strong>
          <span className="list-count">{count}</span>
        </div>

        <div className="list-actions">
          <button className="small-btn" type="button">⌕ Search</button>
          <button className="small-btn" type="button">☷ Filter</button>
          <button className="small-btn" type="button">↕ Sort</button>
          <button className="small-btn" type="button">⚙</button>
        </div>
      </div>

      <div className="list-header" style={{ gridTemplateColumns }}>
        {columns.map((c) => (
          <div key={c.key}>{c.label}</div>
        ))}
      </div>

      <div>
        {rows.map((row) => (
          <div
            key={row.id}
            className={
              "beneficiary-row" + (selectedId === row.id ? " selected" : "")
            }
            style={{ gridTemplateColumns }}
            onClick={() => onSelectRow?.(row.id)}
          >
            {columns.map((c) => (
              <div key={c.key}>{renderCell(row, c.key)}</div>
            ))}
          </div>
        ))}

        {rows.length === 0 && (
          <div style={{ padding: "24px", color: "var(--muted)", fontSize: "10px" }}>
            No records match the current filters.
          </div>
        )}
      </div>
    </section>
  );
}

export { Pill };
