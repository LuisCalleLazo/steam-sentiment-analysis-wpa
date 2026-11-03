import type { TimelinePoint } from "../types";

type Props = {
  points: TimelinePoint[];
};

export default function SentimentTimeline({ points }: Props) {
  if (points.length === 0) {
    return (
      <section className="timeline-card card">
        <div className="section-head">
          <div>
            <p className="eyebrow small">Línea de tiempo</p>
            <h3>Evolución del sentimiento</h3>
          </div>
        </div>
        <p className="empty-state">No hay datos para el rango seleccionado.</p>
      </section>
    );
  }

  const minVal = Math.min(...points.map((p) => p.avgSentiment));
  const maxVal = Math.max(...points.map((p) => p.avgSentiment));
  const range = maxVal - minVal || 1;

  // Build SVG polyline points
  const W = 800;
  const H = 120;
  const PAD = 24;
  const plotW = W - PAD * 2;
  const plotH = H - PAD * 2;

  const coords = points.map((p, i) => {
    const x = PAD + (i / Math.max(points.length - 1, 1)) * plotW;
    const y = PAD + ((maxVal - p.avgSentiment) / range) * plotH;
    return { x, y, point: p };
  });

  const polylinePoints = coords.map((c) => `${c.x},${c.y}`).join(" ");

  // Area fill path
  const areaPath = [
    `M ${coords[0].x} ${H - PAD}`,
    ...coords.map((c) => `L ${c.x} ${c.y}`),
    `L ${coords[coords.length - 1].x} ${H - PAD}`,
    "Z",
  ].join(" ");

  return (
    <section className="timeline-card card">
      <div className="section-head">
        <div>
          <p className="eyebrow small">Línea de tiempo</p>
          <h3>Evolución del sentimiento</h3>
        </div>
        <span className="timeline-range">
          {points[0].label} → {points[points.length - 1].label}
        </span>
      </div>

      <div className="timeline-svg-wrap">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="timeline-svg"
          aria-label="Gráfico de línea de tiempo del sentimiento"
        >
          <defs>
            <linearGradient id="timelineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#66c0f4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#66c0f4" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Zero line */}
          {minVal <= 0 && maxVal >= 0 && (
            <line
              x1={PAD}
              y1={PAD + ((maxVal - 0) / range) * plotH}
              x2={W - PAD}
              y2={PAD + ((maxVal - 0) / range) * plotH}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          )}

          {/* Area fill */}
          <path d={areaPath} fill="url(#timelineGrad)" />

          {/* Line */}
          <polyline
            points={polylinePoints}
            fill="none"
            stroke="#66c0f4"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Dots */}
          {coords.map(({ x, y, point }) => (
            <g key={point.label}>
              <circle
                cx={x}
                cy={y}
                r="5"
                fill={point.avgSentiment >= 0 ? "#5ee8a5" : "#ff6b6b"}
                stroke="#0e161f"
                strokeWidth="2"
              />
              <title>
                {point.label}: {point.avgSentiment.toFixed(1)} ({point.count} reseñas)
              </title>
            </g>
          ))}
        </svg>
      </div>

      {/* X-axis labels */}
      <div className="timeline-labels">
        {points.map((p) => (
          <span key={p.label}>{p.label}</span>
        ))}
      </div>

      {/* Summary row */}
      <div className="timeline-summary">
        <div>
          <span>Mejor mes</span>
          <strong style={{ color: "#5ee8a5" }}>
            {points.reduce((a, b) => (a.avgSentiment > b.avgSentiment ? a : b)).label}
          </strong>
        </div>
        <div>
          <span>Peor mes</span>
          <strong style={{ color: "#ff6b6b" }}>
            {points.reduce((a, b) => (a.avgSentiment < b.avgSentiment ? a : b)).label}
          </strong>
        </div>
        <div>
          <span>Tendencia</span>
          <strong>
            {points[points.length - 1].avgSentiment >= points[0].avgSentiment
              ? "📈 Creciente"
              : "📉 Decreciente"}
          </strong>
        </div>
      </div>
    </section>
  );
}
