import type { SentimentSummary } from "../types";

type Props = {
  summary: SentimentSummary;
};

export default function SentimentPanel({ summary }: Props) {
  const { total, positive, neutral, negative, averageSentiment } = summary;

  // Map the average sentiment (-100…100) to a 0–360° arc
  const normalized = Math.min(Math.max((averageSentiment + 100) / 200, 0), 1);
  const degrees = Math.round(normalized * 360);

  const ringColor =
    averageSentiment >= 50
      ? "#5ee8a5"
      : averageSentiment >= 0
      ? "#66c0f4"
      : "#ff6b6b";

  return (
    <aside className="stats-panel card">
      <h3>Resumen de sentimiento</h3>

      <div
        className="sentiment-ring"
        style={{
          background: `conic-gradient(${ringColor} 0deg ${degrees}deg, rgba(255,255,255,0.06) ${degrees}deg 360deg)`,
        }}
      >
        <div className="ring-value">{Math.round(averageSentiment)}</div>
      </div>

      <div className="sentiment-legend">
        <div>
          <span className="dot positive" />
          <span>Positivo: {positive}</span>
        </div>
        <div>
          <span className="dot neutral" />
          <span>Neutral: {neutral}</span>
        </div>
        <div>
          <span className="dot negative" />
          <span>Negativo: {negative}</span>
        </div>
        {total > 0 && (
          <div className="approval-bar-wrap">
            <div className="approval-label">
              <span>Aceptación</span>
              <strong>{((positive / total) * 100).toFixed(0)}%</strong>
            </div>
            <div className="approval-bar">
              <div
                className="approval-fill"
                style={{ width: `${(positive / total) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
