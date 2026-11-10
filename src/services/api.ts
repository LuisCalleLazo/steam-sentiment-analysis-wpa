// ─────────────────────────────────────────────────────────────────────────────
// API Service Layer
// All HTTP calls to the .NET backend.
//
// Endpoints (from .NET service interfaces):
//   IGameService:
//     GET /api/game/list?search=<query>              → DropdownOptionDto[]
//     GET /api/game?gameId=<id>                      → GameDto
//
//   ICommentService:
//     GET /api/comment/list?gameId=<id>              → CommentDto[]
//
//   ISentimentAnalysis:
//     GET /api/sentiment/histogram?gameId=<id>
//          &startDate=<ISO>&endDate=<ISO>            → HistogramResultDto
//     GET /api/sentiment/ranked                      → GameDto[]  (pre-sorted)
//     GET /api/sentiment/top?startDate=<ISO>
//          &endDate=<ISO>                            → CommentTop[]
//
// ─────────────────────────────────────────────────────────────────────────────

import type {
  DropdownOptionDto,
  GameDto,
  CommentDto,
  HistogramResultDto,
  CommentTop,
} from "../types";

/** Base URL from Vite env variable (defined in .env as VITE_API_URL) */
const BASE_URL = import.meta.env.VITE_API_URL as string;

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildUrl(path: string, params: Record<string, string | undefined>): string {
  const url = new URL(`${BASE_URL}/${path}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      url.searchParams.set(key, value);
    }
  }
  return url.toString();
}

async function apiFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText} — ${url}`);
  }
  return res.json() as Promise<T>;
}

// ── IGameService ──────────────────────────────────────────────────────────────

/**
 * Search games by name. The API requires a non-empty `search` param.
 *
 * Maps to: IGameService.GetGamesOfSteam(string search)
 * @example searchGames("left") → [{ id: "550", name: "Left 4 Dead 2" }, ...]
 */
export async function searchGames(query: string): Promise<DropdownOptionDto[]> {
  if (!query || query.trim() === "") return [];
  const url = buildUrl("game/list", { search: query.trim() });
  return apiFetch<DropdownOptionDto[]>(url);
}

/**
 * Fetch full metadata for a single game by its Steam App ID.
 *
 * Maps to: IGameService.GetGameDetail(string gameId)
 * @example fetchGame("550") → { id: "550", title: "Left 4 Dead 2", ... }
 */
export async function fetchGame(gameId: string): Promise<GameDto> {
  const url = buildUrl("game", { gameId });
  return apiFetch<GameDto>(url);
}

// ── ICommentService ───────────────────────────────────────────────────────────

/**
 * Fetch all comments for a game. Date filtering is done client-side from this list.
 *
 * Maps to: ICommentService.GetCommentsByGameId(string gameId)
 * @example getCommentsByGameId("550") → [{ comment: "...", date: "...", ... }]
 */
export async function getCommentsByGameId(gameId: string): Promise<CommentDto[]> {
  const url = buildUrl("comment/list", { gameId });
  return apiFetch<CommentDto[]>(url);
}

// ── ISentimentAnalysis ────────────────────────────────────────────────────────

/**
 * Fetch a pre-computed histogram for a game, optionally filtered by date range.
 * The backend (ML model) groups sentiment scores into bins and computes statistics.
 *
 * Maps to: ISentimentAnalysis.GetHistogramByGameId(string gameId, DateTime? startDate, DateTime? endDate)
 */
export async function getHistogram(
  gameId: string,
  startDate?: string,
  endDate?: string,
): Promise<HistogramResultDto> {
  const url = buildUrl("sentiment/histogram", { gameId, startDate, endDate });
  return apiFetch<HistogramResultDto>(url);
}

/**
 * Fetch a pre-sorted list of the most popular games, ranked by the backend.
 *
 * Maps to: ISentimentAnalysis.GetRankedGames()
 */
export async function getRankedGames(): Promise<GameDto[]> {
  const url = buildUrl("sentiment/ranked", {});
  return apiFetch<GameDto[]>(url);
}

/**
 * Fetch the top/most-mentioned comments globally, optionally filtered by date.
 *
 * Maps to: ISentimentAnalysis.GetCommentsTop(DateTime? startDate, DateTime? endDate)
 */
export async function getTopComments(
  startDate?: string,
  endDate?: string,
): Promise<CommentTop[]> {
  const url = buildUrl("sentiment/top", { startDate, endDate });
  return apiFetch<CommentTop[]>(url);
}
