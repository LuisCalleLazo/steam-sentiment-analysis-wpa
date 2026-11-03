import type { EquationResult } from "../types";

type Props = {
  result: EquationResult;
  n: number;
};

type EqRow = {
  name: string;
  symbol: string;
  formula: string;
  value: string;
  description: string;
  colorClass: string;
};

const interpretCorrelation = (r: number): string => {
  const abs = Math.abs(r);
  const direction = r >= 0 ? "positiva" : "negativa";
  if (abs >= 0.8) return `Muy fuerte ${direction}`;
  if (abs >= 0.6) return `Fuerte ${direction}`;
  if (abs >= 0.4) return `Moderada ${direction}`;
  if (abs >= 0.2) return `Débil ${direction}`;
  return "Sin correlación";
};

export default function EquationsPanel({ result, n }: Props) {
  const equations: EqRow[] = [
    {
      name: "Media aritmética",
      symbol: "x̄",
      formula: "x̄ = (1/n) · Σ xᵢ",
      value: result.mean.toFixed(3),
      description: `Promedio del sentimiento de las ${n} reseñas analizadas.`,
      colorClass: "eq-blue",
    },
    {
      name: "Mediana",
      symbol: "Md",
      formula: "Md = x[(n+1)/2]",
      value: result.median.toFixed(3),
      description: "Valor central del conjunto ordenado de sentimientos.",
      colorClass: "eq-cyan",
    },
    {
      name: "Desviación estándar",
      symbol: "σ",
      formula: "σ = √[ (1/n) · Σ(xᵢ − x̄)² ]",
      value: result.standardDeviation.toFixed(3),
      description: "Dispersión del sentimiento respecto a la media.",
      colorClass: "eq-purple",
    },
    {
      name: "Coeficiente de variación",
      symbol: "CV",
      formula: "CV = (σ / |x̄|) · 100",
      value: `${result.coefficientOfVariation.toFixed(1)}%`,
      description:
        "Variabilidad relativa: qué tan dispersas son las reseñas en comparación a la media.",
      colorClass: "eq-orange",
    },
    {
      name: "Correlación de Pearson",
      symbol: "r",
      formula: "r = Σ(xᵢ−x̄)(yᵢ−ȳ) / √[Σ(xᵢ−x̄)²·Σ(yᵢ−ȳ)²]",
      value: result.correlation.toFixed(4),
      description: `Relación lineal entre horas jugadas y sentimiento: ${interpretCorrelation(result.correlation)}.`,
      colorClass: "eq-green",
    },
    {
      name: "Índice de polarización",
      symbol: "IP",
      formula: "IP = (|s| > 60) / n · 100",
      value: `${result.polarizationIndex.toFixed(1)}%`,
      description: "Porcentaje de reseñas con sentimiento extremo (positivo o negativo intenso).",
      colorClass: "eq-red",
    },
  ];

  return (
    <section className="equations-card card">
      <div className="section-head">
        <div>
          <p className="eyebrow small">Análisis estadístico</p>
          <h3>Ecuaciones y resultados</h3>
        </div>
        <span className="eq-badge">n = {n} reseñas</span>
      </div>

      <div className="equations-grid">
        {equations.map((eq) => (
          <article key={eq.symbol} className={`eq-card ${eq.colorClass}`}>
            <div className="eq-header">
              <span className="eq-symbol">{eq.symbol}</span>
              <span className="eq-name">{eq.name}</span>
            </div>
            <div className="eq-formula">{eq.formula}</div>
            <div className="eq-result">
              <span className="eq-result-label">Resultado</span>
              <span className="eq-result-value">{eq.value}</span>
            </div>
            <p className="eq-description">{eq.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
