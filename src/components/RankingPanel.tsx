import type { GameRankEntry } from "../types";

type Props = {
  ranking: GameRankEntry[];
};

const MEDALS: Record<number, { emoji: string; colorClass: string }> = {
  1: { emoji: "🥇", colorClass: "rank-gold" },
  2: { emoji: "🥈", colorClass: "rank-silver" },
  3: { emoji: "🥉", colorClass: "rank-bronze" },
};

const ScoreBar = ({ value, max = 100 }: { value: number; max?: number }) => (
  <div className="score-bar-track">
    <div
      className="score-bar-fill"
      style={{ width: `${(value / max) * 100}%` }}
    />
  </div>
);

export default function RankingPanel({ ranking }: Props) {
  const handlePrint = () => {
    // Temporarily switch to ranking-only print mode
    document.body.classList.add("print-ranking");
    window.print();
    document.body.classList.remove("print-ranking");
  };

  return (
    <section className="ranking-card card" id="ranking-section">
      {/* ── Header ────────────────────────────────────────────────────── */}
      <div className="ranking-header">
        <div>
          <p className="eyebrow small">Análisis comparativo</p>
          <h3>Top 10 Juegos más populares</h3>
          <p className="ranking-subtitle">
            Puntuación calculada: <span className="formula-inline">P = 0.60 × S<sub>norm</sub> + 0.40 × A</span>
            <br />
            donde <em>S<sub>norm</sub> = (sentimiento + 100) / 2</em> y <em>A = % reseñas positivas</em>
          </p>
        </div>
        <button
          type="button"
          className="pdf-button ranking-pdf-btn"
          onClick={handlePrint}
          aria-label="Exportar ranking a PDF"
        >
          📄 Exportar ranking PDF
        </button>
      </div>

      {/* ── Top 3 podium ──────────────────────────────────────────────── */}
      <div className="podium-row">
        {ranking.slice(0, 3).map((entry) => {
          const medal = MEDALS[entry.rank];
          return (
            <article key={entry.gameId} className={`podium-card ${medal.colorClass}`}>
              <div className="podium-rank">{medal.emoji}</div>
              <img
                src={entry.imageUrl}
                alt={entry.title}
                className="podium-img"
              />
              <div className="podium-info">
                <strong>{entry.title}</strong>
                <span className="podium-category">{entry.category}</span>
                <div className="podium-score">
                  {entry.popularityScore.toFixed(1)}
                  <small>/100</small>
                </div>
                <ScoreBar value={entry.popularityScore} />
              </div>
            </article>
          );
        })}
      </div>

      {/* ── Full table ranks 1–10 ─────────────────────────────────────── */}
      <div className="ranking-table-wrap">
        <table className="ranking-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Juego</th>
              <th>Categoría</th>
              <th title="Reseñas totales">Reseñas</th>
              <th title="Sentimiento promedio">Sent. medio</th>
              <th title="Porcentaje de reseñas positivas">% Positivo</th>
              <th title="Horas de juego promedio">Horas prom.</th>
              <th title="Puntuación de popularidad (0-100)">Score</th>
              <th>Barra</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((entry) => {
              const medal = MEDALS[entry.rank];
              const sentColor =
                entry.avgSentiment >= 60
                  ? "val-green"
                  : entry.avgSentiment >= 0
                  ? "val-blue"
                  : "val-red";

              return (
                <tr key={entry.gameId} className={entry.rank <= 3 ? "top-row" : ""}>
                  <td>
                    <span className={`rank-badge ${medal?.colorClass ?? ""}`}>
                      {medal ? medal.emoji : `#${entry.rank}`}
                    </span>
                  </td>
                  <td>
                    <div className="table-game-cell">
                      <img
                        src={entry.imageUrl}
                        alt={entry.title}
                        className="table-game-img"
                      />
                      <span>{entry.title}</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge">{entry.category}</span>
                  </td>
                  <td className="td-num">{entry.totalReviews}</td>
                  <td className={`td-num ${sentColor}`}>
                    {entry.avgSentiment.toFixed(1)}
                  </td>
                  <td className="td-num">
                    <span
                      className={`acceptance-pill ${
                        entry.acceptanceRate >= 80
                          ? "pill-green"
                          : entry.acceptanceRate >= 60
                          ? "pill-blue"
                          : "pill-red"
                      }`}
                    >
                      {entry.acceptanceRate.toFixed(0)}%
                    </span>
                  </td>
                  <td className="td-num">{entry.avgHours.toFixed(1)}h</td>
                  <td className="td-num score-cell">
                    <strong>{entry.popularityScore.toFixed(1)}</strong>
                  </td>
                  <td className="td-bar">
                    <ScoreBar value={entry.popularityScore} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Formula legend ────────────────────────────────────────────── */}
      <div className="ranking-legend">
        <div className="legend-item">
          <span className="legend-dot" style={{ background: "#5ee8a5" }} />
          <span>Sent. ≥ 60 pts (muy positivo)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: "#66c0f4" }} />
          <span>Sent. 0–60 pts (positivo)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: "#ff6b6b" }} />
          <span>Sent. &lt; 0 pts (negativo)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot pill-green" style={{ background: "#5ee8a5" }} />
          <span>Aceptación ≥ 80%</span>
        </div>
      </div>
    </section>
  );
}
