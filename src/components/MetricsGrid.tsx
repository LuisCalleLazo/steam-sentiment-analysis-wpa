import type { SentimentSummary } from "../types";

type Props = {
  summary: SentimentSummary;
};

export default function MetricsGrid({ summary }: Props) {
  const { total, positive, averageSentiment, averageHours } = summary;
  const acceptanceRate = total > 0 ? ((positive / total) * 100).toFixed(0) : "0";

  const metrics = [
    { label: "Promedio de sentimiento", value: `${averageSentiment.toFixed(1)}`, unit: "pts" },
    { label: "Horas jugadas (promedio)", value: averageHours.toFixed(1), unit: "h" },
    { label: "Reseñas analizadas", value: String(total), unit: "" },
    { label: "Nivel de aceptación", value: acceptanceRate, unit: "%" },
  ];

  return (
    <section className="metrics-grid">
      {metrics.map(({ label, value, unit }) => (
        <article key={label} className="metric-card card">
          <span className="metric-label">{label}</span>
          <strong>
            {value}
            <small className="metric-unit">{unit}</small>
          </strong>
        </article>
      ))}
    </section>
  );
}
