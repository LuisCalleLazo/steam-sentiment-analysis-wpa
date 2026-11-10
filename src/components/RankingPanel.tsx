import type { GameDto } from "../types";

type Props = {
  games: GameDto[];
  loading?: boolean;
};

const MEDALS: Record<number, { emoji: string; colorClass: string }> = {
  1: { emoji: "🥇", colorClass: "rank-gold" },
  2: { emoji: "🥈", colorClass: "rank-silver" },
  3: { emoji: "🥉", colorClass: "rank-bronze" },
};

function RankingSkeleton() {
  return (
    <div className="ranking-skeleton">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="skeleton-row" />
      ))}
    </div>
  );
}

export default function RankingPanel({ games, loading = false }: Props) {
  const handlePrint = () => {
    document.body.classList.add("print-ranking");
    window.print();
    document.body.classList.remove("print-ranking");
  };

  return (
    <section className="ranking-card card" id="ranking-section">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="ranking-header">
        <div>
          <p className="eyebrow small">Análisis comparativo — API</p>
          <h3>Top {games.length || 10} Juegos más populares</h3>
          <p className="ranking-subtitle">
            Ordenados por popularidad según el motor de análisis de sentimiento
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

      {loading ? (
        <RankingSkeleton />
      ) : games.length === 0 ? (
        <p className="ranking-empty">No hay datos de ranking disponibles.</p>
      ) : (
        <>
          {/* ── Top 3 podium ──────────────────────────────────────────── */}
          <div className="podium-row">
            {games.slice(0, 3).map((game, idx) => {
              const rank = idx + 1;
              const medal = MEDALS[rank];
              return (
                <article key={game.id} className={`podium-card ${medal.colorClass}`}>
                  <div className="podium-rank">{medal.emoji}</div>
                  {game.imageUrl && (
                    <img
                      src={game.imageUrl}
                      alt={game.title}
                      className="podium-img"
                    />
                  )}
                  <div className="podium-info">
                    <strong>{game.title}</strong>
                    <span className="podium-category">{game.category}</span>
                    <span className="podium-developer">{game.developer}</span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* ── Full table ────────────────────────────────────────────── */}
          <div className="ranking-table-wrap">
            <table className="ranking-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Juego</th>
                  <th>Categoría</th>
                  <th>Desarrollador</th>
                  <th>Lanzamiento</th>
                </tr>
              </thead>
              <tbody>
                {games.map((game, idx) => {
                  const rank = idx + 1;
                  const medal = MEDALS[rank];
                  const year = game.date ? new Date(game.date).getFullYear() : "—";
                  return (
                    <tr key={game.id} className={rank <= 3 ? "top-row" : ""}>
                      <td>
                        <span className={`rank-badge ${medal?.colorClass ?? ""}`}>
                          {medal ? medal.emoji : `#${rank}`}
                        </span>
                      </td>
                      <td>
                        <div className="table-game-cell">
                          {game.imageUrl && (
                            <img
                              src={game.imageUrl}
                              alt={game.title}
                              className="table-game-img"
                            />
                          )}
                          <span>{game.title}</span>
                        </div>
                      </td>
                      <td>
                        <span className="badge">{game.category}</span>
                      </td>
                      <td className="td-num">{game.developer}</td>
                      <td className="td-num">{year}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
