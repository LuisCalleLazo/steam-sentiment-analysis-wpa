import type { CommentDto, CommentTop } from "../types";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));

type Props = {
  comments: CommentDto[];
  topComments: CommentTop[];
};

export default function CommentsSection({ comments, topComments }: Props) {
  return (
    <section className="comments-card card">
      <div className="section-head">
        <div>
          <p className="eyebrow small">Reseñas de Steam</p>
          <h3>Comentarios destacados</h3>
        </div>
      </div>

      {/* Top / most-mentioned */}
      <div className="top-comments">
        {topComments.map((entry) => (
          <article key={entry.comment} className="comment-chip">
            <div className="chip-topline">
              <span
                className={`status ${entry.isBad && !entry.isGood ? "negative" : "positive"}`}
              >
                {entry.isBad && !entry.isGood ? "Negativo" : "Positivo"}
              </span>
              <span>{entry.count} menciones</span>
            </div>
            <p>{entry.comment}</p>
          </article>
        ))}
      </div>

      {/* Full scrollable list */}
      <div className="comment-list">
        {comments.map((comment) => (
          <article
            key={`${comment.comment}-${comment.date}`}
            className="comment-item"
          >
            <div className="comment-header">
              <span
                className={`sentiment-tag ${
                  comment.sentiment >= 0 ? "positive" : "negative"
                }`}
              >
                {comment.sentiment >= 0 ? "Positivo" : "Negativo"}
              </span>
              <time>{formatDate(comment.date)}</time>
            </div>
            <p>{comment.comment}</p>
            <footer>
              <span>{comment.hoursGameplay}h jugadas</span>
              <span>Sentimiento: {comment.sentiment} pts</span>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
