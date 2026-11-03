// ─────────────────────────────────────────────
// DTOs — mirror what a real Steam-like API would return
// ─────────────────────────────────────────────

export type DropdownOptionDto = {
  id: string;
  name: string;
};

export type GameDto = {
  id: string;
  title: string;
  description: string;
  date: string;
  developer: string;
  category: string;
  imageUrl: string;
};

export type CommentDto = {
  comment: string;
  date: string;
  hoursGameplay: number;
  sentiment: number;
};

// ─────────────────────────────────────────────
// Derived / computed types (UI-facing)
// ─────────────────────────────────────────────

export type HistogramSummaryDto = {
  mean: number;
  median: number;
  standardDeviation: number;
};

export type HistogramBinDto = {
  lowerLimit: number;
  upperLimit: number;
  binLabel: string;
  frequency: number;
  relativeFrequency: number;
};

export type HistogramResultDto = {
  title: string;
  totalCount: number;
  summary: HistogramSummaryDto;
  bins: HistogramBinDto[];
};

export type CommentTop = {
  comment: string;
  count: number;
  isBad: boolean;
  isGood: boolean;
};

export type SentimentSummary = {
  total: number;
  positive: number;
  neutral: number;
  negative: number;
  averageSentiment: number;
  averageHours: number;
};

export type TimelinePoint = {
  label: string;       // "Ene 2024"
  avgSentiment: number;
  count: number;
};

export type GameRankEntry = {
  rank: number;
  gameId: string;
  title: string;
  category: string;
  imageUrl: string;
  totalReviews: number;
  positiveReviews: number;
  negativeReviews: number;
  avgSentiment: number;
  avgHours: number;
  acceptanceRate: number;    // % de reseñas positivas
  sentimentNorm: number;     // sentimiento normalizado 0–100
  popularityScore: number;   // score final 0–100
};

export type EquationResult = {
  mean: number;
  median: number;
  standardDeviation: number;
  coefficientOfVariation: number;   // CV = σ/μ × 100
  correlation: number;              // Pearson r: hours vs sentiment
  polarizationIndex: number;        // % comentarios extremos (|s| > 60)
};
