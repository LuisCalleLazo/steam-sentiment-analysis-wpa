import { useMemo, useState, useCallback } from "react";
import "./App.css";

// ── Static data (stats stay hardcoded, game metadata comes from API) ──────────
import { gameDetails as hardcodedGameDetails } from "./data/games";
import { gameCommentsById } from "./data/comments";

// ── API service ───────────────────────────────────────────────────────────────
import { fetchGame } from "./services/api";
import type { GameDto } from "./types";

// ── Statistical utilities ─────────────────────────────────────────────────────
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
import GameSearchSelect from "./components/GameSearchSelect";

// ─────────────────────────────────────────────────────────────────────────────

type GameOption = { value: string; label: string };

// Default game shown on first load (hardcoded fallback)
const DEFAULT_GAME_ID = "the-forest";

function App() {
  // ── Selector state ──────────────────────────────────────────────────────────
  const [selectedOption, setSelectedOption] = useState<GameOption | null>({
    value: DEFAULT_GAME_ID,
    label: hardcodedGameDetails[DEFAULT_GAME_ID]?.title ?? DEFAULT_GAME_ID,
  });

  // ── Game metadata: starts with hardcoded fallback, replaced by API data ─────
  const [selectedGame, setSelectedGame] = useState<GameDto>(
    hardcodedGameDetails[DEFAULT_GAME_ID],
  );
  const [gameLoading, setGameLoading] = useState(false);
  const [gameError, setGameError] = useState<string | null>(null);

  // ── Date filter state ────────────────────────────────────────────────────────
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-31");

  // ── Handle game selection ────────────────────────────────────────────────────
  const handleGameChange = useCallback(async (option: GameOption | null) => {
    setSelectedOption(option);
    setGameError(null);

    if (!option) return;

    const gameId = option.value;

    // 1. If we have hardcoded metadata, use it immediately (no flicker)
    if (hardcodedGameDetails[gameId]) {
      setSelectedGame(hardcodedGameDetails[gameId]);
    }

    // 2. Always fetch from API to get fresh/accurate data
    setGameLoading(true);
    try {
      const apiGame = await fetchGame(gameId);
      setSelectedGame(apiGame);
    } catch (err) {
      // If API fails and we have hardcoded fallback, keep it silently
      if (!hardcodedGameDetails[gameId]) {
        setGameError("No se pudo cargar la información del juego.");
      }
    } finally {
      setGameLoading(false);
    }
  }, []);

  // ── Active game ID (for stats lookup) ───────────────────────────────────────
  const selectedGameId = selectedOption?.value ?? DEFAULT_GAME_ID;

  // ── Filter + sort comments by date range (stats stay hardcoded) ─────────────
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

  // ── Derived statistics ───────────────────────────────────────────────────────
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

  // Global ranking across ALL hardcoded games (not affected by filter)
  const ranking = useMemo(
    () => buildRanking(gameCommentsById, hardcodedGameDetails),
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
          {/* ── Async game search combobox ─────────────────────────────────── */}
          <GameSearchSelect
            value={selectedOption}
            onChange={handleGameChange}
          />

          <button type="button" className="pdf-button" onClick={() => window.print()}>
            Exportar PDF
          </button>
        </div>
      </header>

      {/* ── API status feedback ─────────────────────────────────────────────── */}
      {gameLoading && (
        <div className="api-status loading" role="status" aria-live="polite">
          <span className="spinner" /> Cargando información del juego…
        </div>
      )}
      {gameError && (
        <div className="api-status error" role="alert">
          ⚠️ {gameError}
        </div>
      )}

      {/* ── Main grid ──────────────────────────────────────────────────────── */}
      <main className="content-grid">
        {/* Row 1: Game card + Sentiment ring */}
        <GameOverview game={selectedGame} summary={sentimentSummary} />
        <SentimentPanel summary={sentimentSummary} />

        {/* Row 2: KPI metrics */}
        <MetricsGrid summary={sentimentSummary} />

        {/* Row 3: Global ranking (full width) */}
        <RankingPanel ranking={ranking} />

        {/* Row 4: Histogram + Comments */}
        <HistogramChart
          histogram={histogram}
          startDate={startDate}
          endDate={endDate}
          onStartDate={setStartDate}
          onEndDate={setEndDate}
        />
        <CommentsSection comments={filteredComments} topComments={topComments} />

        {/* Row 5: Equations panel (full width) */}
        <EquationsPanel result={equationResult} n={filteredComments.length} />

        {/* Row 6: Sentiment timeline (full width) */}
        <SentimentTimeline points={timeline} />
      </main>
    </div>
  );
}

export default App;
