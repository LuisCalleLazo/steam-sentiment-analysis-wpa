import { useMemo, useState, useCallback, useEffect } from "react";
import "./App.css";

// ── API services ──────────────────────────────────────────────────────────────
import {
  fetchGame,
  getCommentsByGameId,
  getHistogram,
  getRankedGames,
  getTopComments,
} from "./services/api";

// ── Types ─────────────────────────────────────────────────────────────────────
import type {
  GameDto,
  CommentDto,
  HistogramResultDto,
  CommentTop,
} from "./types";

// ── Statistical utilities (computed on the frontend from API comments) ────────
import {
  buildHistogram,
  buildSentimentSummary,
  buildEquationResult,
  buildTimeline,
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

/** Empty histogram shown while loading or when no game is selected */
const EMPTY_HISTOGRAM: HistogramResultDto = buildHistogram("", []);

function App() {
  // ── Game selector ──────────────────────────────────────────────────────────
  const [selectedOption, setSelectedOption] = useState<GameOption | null>(null);
  const [selectedGame, setSelectedGame] = useState<GameDto | null>(null);

  // ── API data ───────────────────────────────────────────────────────────────
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [histogram, setHistogram] = useState<HistogramResultDto>(EMPTY_HISTOGRAM);
  const [topComments, setTopComments] = useState<CommentTop[]>([]);
  const [rankedGames, setRankedGames] = useState<GameDto[]>([]);

  // ── Loading / error states ─────────────────────────────────────────────────
  const [gameLoading, setGameLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);
  const [rankingLoading, setRankingLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  // ── Date filters (vacío = sin filtro) ───────────────────────────────────────
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // ── Load global ranking once on mount ────────────────────────────────────
  useEffect(() => {
    setRankingLoading(true);
    getRankedGames()
      .then(setRankedGames)
      .catch(() => setRankedGames([]))
      .finally(() => setRankingLoading(false));
  }, []);

  // ── Load game data when selection changes ────────────────────────────────
  useEffect(() => {
    if (!selectedOption) {
      setSelectedGame(null);
      setComments([]);
      setHistogram(EMPTY_HISTOGRAM);
      setTopComments([]);
      return;
    }

    const gameId = selectedOption.value;
    setStatsError(null);

    // 1. Fetch game metadata
    setGameLoading(true);
    fetchGame(gameId)
      .then(setSelectedGame)
      .catch(() => setStatsError("No se pudo cargar la información del juego."))
      .finally(() => setGameLoading(false));

    // 2. Fetch comments + histogram + top comments in parallel
    setStatsLoading(true);
    Promise.all([
      getCommentsByGameId(gameId),
      getHistogram(gameId, startDate, endDate),
      getTopComments(startDate, endDate),
    ])
      .then(([newComments, newHistogram, newTopComments]) => {
        setComments(newComments);
        setHistogram(newHistogram);
        setTopComments(newTopComments);
      })
      .catch(() => setStatsError("Error al cargar los datos de análisis."))
      .finally(() => setStatsLoading(false));
  }, [selectedOption]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Re-fetch histogram + top comments when dates change ──────────────────
  useEffect(() => {
    if (!selectedOption) return;
    const gameId = selectedOption.value;

    Promise.all([
      getHistogram(gameId, startDate, endDate),
      getTopComments(startDate, endDate),
    ])
      .then(([newHistogram, newTopComments]) => {
        setHistogram(newHistogram);
        setTopComments(newTopComments);
      })
      .catch(() => {}); // silent — keep previous data on error
  }, [startDate, endDate]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Handle game selection from combobox ──────────────────────────────────
  const handleGameChange = useCallback((option: GameOption | null) => {
    setSelectedOption(option);
  }, []);

  // ── Locally filtered comments (for equations, timeline, sentiment ring) ──
  const filteredComments = useMemo(() => {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    // Año 1 = fecha inválida/sin fecha en MongoDB → siempre incluir
    const MIN_VALID = new Date("2000-01-01");

    return [...comments]
      .filter(({ date }) => {
        const d = new Date(date);
        // Si la fecha es inválida o antes de 2000, incluirla sin filtrar
        if (!date || isNaN(d.getTime()) || d < MIN_VALID) return true;
        if (start && d < start) return false;
        if (end && d > end) return false;
        return true;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [comments, startDate, endDate]);

  // ── Derived statistics (computed on the frontend from API comments) ───────
  const sentimentSummary = useMemo(
    () => buildSentimentSummary(filteredComments),
    [filteredComments],
  );

  const equationResult = useMemo(
    () => buildEquationResult(filteredComments),
    [filteredComments],
  );

  const timeline = useMemo(
    () => buildTimeline(filteredComments),
    [filteredComments],
  );

  // ── Determine whether to show game-specific panels ───────────────────────
  const hasGame = selectedGame !== null;

  return (
    <div className="app-shell">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="page-header">
        <div>
          <p className="eyebrow">Steam sentiment analysis</p>
          <h1>Análisis de sentimiento por juego</h1>
        </div>

        <div className="header-actions">
          <GameSearchSelect
            value={selectedOption}
            onChange={handleGameChange}
          />

          <button
            type="button"
            className="pdf-button"
            onClick={() => window.print()}
          >
            Exportar PDF
          </button>
        </div>
      </header>

      {/* ── Status banners ──────────────────────────────────────────────── */}
      {(gameLoading || statsLoading) && (
        <div className="api-status loading" role="status" aria-live="polite">
          <span className="spinner" /> Cargando datos del juego…
        </div>
      )}
      {statsError && (
        <div className="api-status error" role="alert">
          ⚠️ {statsError}
        </div>
      )}

      {/* ── Main grid ───────────────────────────────────────────────────── */}
      <main className="content-grid">

        {/* ── Global ranking (always visible, loads from API on mount) ── */}
        <RankingPanel games={rankedGames} loading={rankingLoading} />

        {/* ── Empty state: no game selected ──────────────────────────── */}
        {!hasGame && !statsLoading && (
          <div className="empty-state card">
            <div className="empty-icon">🎮</div>
            <h3>Busca un juego para ver su análisis</h3>
            <p>Escribe el nombre en el buscador de arriba para comenzar.</p>
          </div>
        )}

        {/* ── Game-specific panels (shown only when a game is selected) ─ */}
        {hasGame && (
          <>
            {/* Row: Game card + Sentiment ring */}
            <GameOverview game={selectedGame} summary={sentimentSummary} />
            <SentimentPanel summary={sentimentSummary} />

            {/* Row: KPI metrics */}
            <MetricsGrid summary={sentimentSummary} />

            {/* Row: Histogram (API) + Comments (API) */}
            <HistogramChart
              histogram={histogram}
              startDate={startDate}
              endDate={endDate}
              onStartDate={setStartDate}
              onEndDate={setEndDate}
            />
            <CommentsSection
              comments={filteredComments}
              topComments={topComments}
            />

            {/* Row: Statistical equations (computed locally from API comments) */}
            <EquationsPanel
              result={equationResult}
              n={filteredComments.length}
            />

            {/* Row: Sentiment timeline (computed locally from API comments) */}
            <SentimentTimeline points={timeline} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
