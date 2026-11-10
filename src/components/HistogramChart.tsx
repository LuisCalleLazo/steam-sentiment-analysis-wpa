import type { HistogramResultDto } from "../types";

type Props = {
  histogram: HistogramResultDto;
  startDate: string;
  endDate: string;
  onStartDate: (v: string) => void;
  onEndDate: (v: string) => void;
};

const maxFrequency = (bins: HistogramResultDto["bins"]) =>
  Math.max(...bins.map((b) => b.relativeFrequency), 0.01);

export default function HistogramChart({
  histogram,
  startDate,
  endDate,
  onStartDate,
  onEndDate,
}: Props) {
  const max = maxFrequency(histogram.bins);

  return (
    <section className="chart-card card">
      <div className="section-head">
        <div>
          <p className="eyebrow small">Histograma de frecuencias</p>
          <h3>Distribución del sentimiento</h3>
        </div>

        <div className="date-filters">
          <label>
            Desde
            <input
              type="date"
              value={startDate}
              onChange={(e) => onStartDate(e.target.value)}
            />
          </label>
          <label>
            Hasta
            <input
              type="date"
              value={endDate}
              onChange={(e) => onEndDate(e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="chart-wrapper">
        {histogram.bins.map((bin) => {
          const heightPct = Math.max((bin.relativeFrequency / max) * 100, 4);
          const isPositive = bin.lowerLimit >= 0;
          const isNegative = bin.upperLimit <= 0;

          return (
            <div key={bin.binLabel} className="bar-group">
              <span className="bar-freq">{(bin.relativeFrequency * 100).toFixed(0)}%</span>
              <div className="bar-stack">
                <div
                  className={`bar-fill ${isPositive ? "positive" : isNegative ? "negative" : ""}`}
                  style={{ height: `${heightPct}%` }}
                  title={`${bin.binLabel}: ${bin.frequency} reseñas`}
                />
              </div>
              <span>{bin.binLabel}</span>
              <small>{bin.frequency}</small>
            </div>
          );
        })}
      </div>

      <div className="summary-grid">
        <div>
          <span>Media (x̄)</span>
          <strong>{(histogram.summary?.mean ?? 0).toFixed(2)}</strong>
        </div>
        <div>
          <span>Mediana</span>
          <strong>{(histogram.summary?.median ?? 0).toFixed(2)}</strong>
        </div>
        <div>
          <span>Desv. estándar (σ)</span>
          <strong>{(histogram.summary?.standardDeviation ?? 0).toFixed(2)}</strong>
        </div>
      </div>
    </section>
  );
}
