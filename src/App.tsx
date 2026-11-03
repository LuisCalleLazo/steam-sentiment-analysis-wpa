import { useMemo, useState } from "react";
import "./App.css";

// ── Data (swap these imports for API calls when ready) ──────────────────────
import { dropdownOptions, gameDetails } from "./data/games";
import { gameCommentsById } from "./data/comments";

// ── Statistical utilities ────────────────────────────────────────────────────
import {
  buildHistogram,
  buildTopComments,
  buildSentimentSummary,
  buildEquationResult,
  buildTimeline,
  buildRanking,
} from "./utils/statistics";

// ── Components ────────────────────────────────────────────────────────────────
import GameOverview from "./components/GameOverview";
import SentimentPanel from "./components/SentimentPanel";
import MetricsGrid from "./components/MetricsGrid";
import HistogramChart from "./components/HistogramChart";
import EquationsPanel from "./components/EquationsPanel";
import SentimentTimeline from "./components/SentimentTimeline";
import CommentsSection from "./components/CommentsSection";
import RankingPanel from "./components/RankingPanel";

// ─────────────────────────────────────────────────────────────────────────────

function App() {
  const [selectedGameId, setSelectedGameId] = useState<string>(dropdownOptions[0].id);
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-31");

  const selectedGame = gameDetails[selectedGameId] ?? gameDetails[dropdownOptions[0].id];

  // Filter + sort comments by date range
  const filteredComments = useMemo(() => {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return [...(gameCommentsById[selectedGameId] ?? [])]
      .filter(({ date }) => {
        const d = new Date(date);
        if (start && d < start) return false;
        if (end && d > end) return false;
        return true;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedGameId, startDate, endDate]);

  // Derived data — all computed from filteredComments
  const sentimentSummary = useMemo(
    () => buildSentimentSummary(filteredComments),
    [filteredComments],
  );

  const histogram = useMemo(
    () => buildHistogram(selectedGame.title, filteredComments.map((c) => c.sentiment)),
    [filteredComments, selectedGame.title],
  );

  const equationResult = useMemo(
    () => buildEquationResult(filteredComments),
    [filteredComments],
  );

  const timeline = useMemo(() => buildTimeline(filteredComments), [filteredComments]);

  const topComments = useMemo(() => buildTopComments(filteredComments), [filteredComments]);

  // Global ranking across ALL games (not filtered)
  const ranking = useMemo(
    () => buildRanking(gameCommentsById, gameDetails),
    [],
  );

  return (
    <div className="app-shell">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="page-header">
        <div>
          <p className="eyebrow">Steam sentiment analysis</p>
          <h1>Análisis de sentimiento por juego</h1>
        </div>

        <div className="header-actions">
          <div className="selector-wrap">
            <label htmlFor="game-select">Juego</label>
            <select
              id="game-select"
              value={selectedGameId}
              onChange={(e) => setSelectedGameId(e.target.value)}
            >
              {dropdownOptions.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <button type="button" className="pdf-button" onClick={() => window.print()}>
            Exportar PDF
          </button>
        </div>
      </header>

      {/* ── Main grid ──────────────────────────────────────────────────────── */}
      <main className="content-grid">
        {/* Row 1: Game card + Sentiment ring */}
        <GameOverview game={selectedGame} summary={sentimentSummary} />
        <SentimentPanel summary={sentimentSummary} />

        {/* Row 2: KPI metrics */}
        <MetricsGrid summary={sentimentSummary} />

        {/* Row 3: Global ranking (full width) */}
        <RankingPanel ranking={ranking} />

        {/* Row 3: Histogram + Comments */}
        <HistogramChart
          histogram={histogram}
          startDate={startDate}
          endDate={endDate}
          onStartDate={setStartDate}
          onEndDate={setEndDate}
        />
        <CommentsSection comments={filteredComments} topComments={topComments} />

        {/* Row 4: Equations panel (full width) */}
        <EquationsPanel result={equationResult} n={filteredComments.length} />

        {/* Row 5: Sentiment timeline (full width) */}
        <SentimentTimeline points={timeline} />
      </main>
    </div>
  );
}

export default App;
