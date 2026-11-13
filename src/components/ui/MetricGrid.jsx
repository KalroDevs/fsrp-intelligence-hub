export default function MetricGrid({ metrics }) {
  return (
    <div className="metric-grid">
      {metrics.map((m) => (
        <div className="metric" key={m.label}>
          <div className="metric-icon">{m.icon}</div>
          <div className="metric-label">{m.label}</div>
          <div className="metric-value">{m.value}</div>
          <div className="metric-note">
            {m.positive && <span className="positive">{m.positive}</span>} {m.note}
          </div>
        </div>
      ))}
    </div>
  );
}
