import type {
  CommentDto,
  HistogramResultDto,
  CommentTop,
  SentimentSummary,
  TimelinePoint,
  EquationResult,
  GameRankEntry,
} from "../types";

// ─────────────────────────────────────────────
// Primitive statistical helpers
// ─────────────────────────────────────────────

/** Arithmetic mean — x̄ = (1/n) Σ xᵢ */
export const calculateMean = (values: number[]): number => {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
};

/**
 * Median — middle value of the sorted dataset.
 * For even n: (x[n/2-1] + x[n/2]) / 2
 */
export const calculateMedian = (values: number[]): number => {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
};

/**
 * Population standard deviation — σ = √( (1/n) Σ (xᵢ - x̄)² )
 */
export const calculateStandardDeviation = (values: number[]): number => {
  if (values.length === 0) return 0;
  const mean = calculateMean(values);
  const variance = values.reduce((sum, v) => sum + (v - mean) ** 2, 0) / values.length;
  return Math.sqrt(variance);
};

/**
 * Coefficient of Variation — CV = (σ / |x̄|) × 100
 * Expresses std deviation as a percentage of the mean.
 */
export const calculateCoefficientOfVariation = (values: number[]): number => {
  const mean = calculateMean(values);
  if (mean === 0) return 0;
  return (calculateStandardDeviation(values) / Math.abs(mean)) * 100;
};

/**
 * Pearson correlation coefficient between two arrays of equal length.
 * r = Σ(xᵢ-x̄)(yᵢ-ȳ) / √[ Σ(xᵢ-x̄)² · Σ(yᵢ-ȳ)² ]
 */
export const calculateCorrelation = (x: number[], y: number[]): number => {
  const n = x.length;
  if (n < 2 || n !== y.length) return 0;
  const mx = calculateMean(x);
  const my = calculateMean(y);
  let num = 0, dx2 = 0, dy2 = 0;
  for (let i = 0; i < n; i++) {
    const dx = x[i] - mx;
    const dy = y[i] - my;
    num += dx * dy;
    dx2 += dx * dx;
    dy2 += dy * dy;
  }
  const denom = Math.sqrt(dx2 * dy2);
  return denom === 0 ? 0 : num / denom;
};

/**
 * Polarization index — percentage of reviews with |sentiment| > 60.
 * High polarization means the community is divided.
 */
export const calculatePolarizationIndex = (values: number[]): number => {
  if (values.length === 0) return 0;
  const extreme = values.filter((v) => Math.abs(v) > 60).length;
  return (extreme / values.length) * 100;
};

// ─────────────────────────────────────────────
// Composite computations
// ─────────────────────────────────────────────

const EMPTY_BINS = Array.from({ length: 5 }, (_, i) => {
  const lower = -100 + i * 40;
  return {
    lowerLimit: lower,
    upperLimit: lower + 40,
    binLabel: `${lower} a ${lower + 40}`,
    frequency: 0,
    relativeFrequency: 0,
  };
});

/** Build a 5-bin histogram over the range [-100, 100] in steps of 40. */
export const buildHistogram = (
  title: string,
  values: number[],
): HistogramResultDto => {
  if (values.length === 0) {
    return {
      title,
      totalCount: 0,
      summary: { mean: 0, median: 0, standardDeviation: 0 },
      bins: EMPTY_BINS,
    };
  }

  const totalCount = values.length;
  const bins = Array.from({ length: 5 }, (_, i) => {
    const lower = -100 + i * 40;
    const upper = lower + 40;
    const frequency = values.filter((v) =>
      i === 4 ? v >= lower && v <= upper : v >= lower && v < upper,
    ).length;
    return {
      lowerLimit: lower,
      upperLimit: upper,
      binLabel: `${lower} a ${upper}`,
      frequency,
      relativeFrequency: frequency / totalCount,
    };
  });

  return {
    title,
    totalCount,
    summary: {
      mean: calculateMean(values),
      median: calculateMedian(values),
      standardDeviation: calculateStandardDeviation(values),
    },
    bins,
  };
};

/** Return the top-4 most-mentioned reviews with their sentiment polarity. */
export const buildTopComments = (comments: CommentDto[]): CommentTop[] => {
  const grouped = new Map<string, { count: number; isBad: boolean; isGood: boolean }>();
  comments.forEach(({ comment, sentiment }) => {
    const key = comment.toLowerCase().trim();
    if (!key) return;
    const cur = grouped.get(key) ?? { count: 0, isBad: false, isGood: false };
    cur.count += 1;
    cur.isBad = cur.isBad || sentiment < 0;
    cur.isGood = cur.isGood || sentiment > 0;
    grouped.set(key, cur);
  });
  return [...grouped.entries()]
    .map(([comment, meta]) => ({ comment, ...meta }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);
};

/** Aggregate sentiment summary for a list of filtered comments. */
export const buildSentimentSummary = (comments: CommentDto[]): SentimentSummary => {
  const total = comments.length;
  return {
    total,
    positive: comments.filter((c) => c.sentiment > 0).length,
    neutral: comments.filter((c) => c.sentiment === 0).length,
    negative: comments.filter((c) => c.sentiment < 0).length,
    averageSentiment: total > 0 ? calculateMean(comments.map((c) => c.sentiment)) : 0,
    averageHours: total > 0 ? calculateMean(comments.map((c) => c.hoursGameplay)) : 0,
  };
};

/**
 * Compute all equation values shown in the EquationsPanel.
 */
export const buildEquationResult = (comments: CommentDto[]): EquationResult => {
  const sentiments = comments.map((c) => c.sentiment);
  const hours = comments.map((c) => c.hoursGameplay);
  return {
    mean: calculateMean(sentiments),
    median: calculateMedian(sentiments),
    standardDeviation: calculateStandardDeviation(sentiments),
    coefficientOfVariation: calculateCoefficientOfVariation(sentiments),
    correlation: calculateCorrelation(hours, sentiments),
    polarizationIndex: calculatePolarizationIndex(sentiments),
  };
};

/**
 * Build a month-by-month sentiment timeline.
 * Groups comments by "YYYY-MM" and averages their sentiment.
 */
export const buildTimeline = (comments: CommentDto[]): TimelinePoint[] => {
  const monthMap = new Map<string, number[]>();
  comments.forEach(({ date, sentiment }) => {
    const key = date.slice(0, 7); // "YYYY-MM"
    if (!monthMap.has(key)) monthMap.set(key, []);
    monthMap.get(key)!.push(sentiment);
  });

  const sorted = [...monthMap.entries()].sort(([a], [b]) => a.localeCompare(b));
  return sorted.map(([key, vals]) => ({
    label: new Intl.DateTimeFormat("es-AR", { month: "short", year: "2-digit" }).format(
      new Date(`${key}-01`),
    ),
    avgSentiment: calculateMean(vals),
    count: vals.length,
  }));
};

/**
 * Build a popularity ranking across all games.
 *
 * Popularity Score formula (0–100):
 *   sentimentNorm  = (avgSentiment + 100) / 2        — maps [-100,100] → [0,100]
 *   acceptanceRate = (positiveReviews / total) × 100 — % positive reviews
 *   popularityScore = 0.60 × sentimentNorm + 0.40 × acceptanceRate
 *
 * @param allComments  Map of gameId → CommentDto[]
 * @param allGames     Map of gameId → { title, category, imageUrl }
 * @param topN         How many entries to return (default 10)
 */
export const buildRanking = (
  allComments: Record<string, CommentDto[]>,
  allGames: Record<string, { title: string; category: string; imageUrl: string }>,
  topN = 10,
): GameRankEntry[] => {
  const entries: Omit<GameRankEntry, "rank">[] = Object.entries(allComments)
    .filter(([, comments]) => comments.length > 0)
    .map(([gameId, comments]) => {
      const total = comments.length;
      const sentiments = comments.map((c) => c.sentiment);
      const hours = comments.map((c) => c.hoursGameplay);
      const positive = comments.filter((c) => c.sentiment > 0).length;
      const negative = comments.filter((c) => c.sentiment < 0).length;
      const avgSentiment = calculateMean(sentiments);
      const avgHours = calculateMean(hours);
      const acceptanceRate = (positive / total) * 100;
      const sentimentNorm = (avgSentiment + 100) / 2;
      const popularityScore = 0.6 * sentimentNorm + 0.4 * acceptanceRate;

      const game = allGames[gameId] ?? { title: gameId, category: "—", imageUrl: "" };

      return {
        gameId,
        title: game.title,
        category: game.category,
        imageUrl: game.imageUrl,
        totalReviews: total,
        positiveReviews: positive,
        negativeReviews: negative,
        avgSentiment,
        avgHours,
        acceptanceRate,
        sentimentNorm,
        popularityScore,
      };
    });

  return entries
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, topN)
    .map((entry, i) => ({ rank: i + 1, ...entry }));
};
