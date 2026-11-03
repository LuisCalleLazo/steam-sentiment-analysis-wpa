import type { GameDto, SentimentSummary } from "../types";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));

type Props = {
  game: GameDto;
  summary: SentimentSummary;
};

export default function GameOverview({ game, summary }: Props) {
  return (
    <section className="game-overview card">
      <div className="cover-panel">
        <img src={game.imageUrl} alt={game.title} />
      </div>

      <div className="game-meta">
        <div className="meta-row">
          <span className="badge">{game.category}</span>
          <span className="release-date">Lanzamiento: {formatDate(game.date)}</span>
        </div>

        <h2>{game.title}</h2>
        <p>{game.description}</p>

        <div className="detail-list">
          <div>
            <span>Desarrollador</span>
            <strong>{game.developer}</strong>
          </div>
          <div>
            <span>Año</span>
            <strong>{new Date(game.date).getFullYear()}</strong>
          </div>
          <div>
            <span>Reseñas analizadas</span>
            <strong>{summary.total}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
