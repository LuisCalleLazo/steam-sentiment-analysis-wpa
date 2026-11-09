// ─────────────────────────────────────────────────────────────────────────────
// API Service Layer
// Replace hardcoded data with real HTTP calls to the backend.
//
// Endpoints:
//   GET /api/game/list?search=<query>  → DropdownOptionDto[]
//   GET /api/game?gameId=<id>          → GameDto
// ─────────────────────────────────────────────────────────────────────────────

import type { DropdownOptionDto, GameDto } from "../types";

/** Base URL from Vite env variable (defined in .env as VITE_API_URL) */
const BASE_URL = import.meta.env.VITE_API_URL as string;

// ── Game search ───────────────────────────────────────────────────────────────

/**
 * Search games by name. The API requires a non-empty `search` param.
 * Returns up to N results matchjajjajjajajing the query string.
 *
 * @example
 *   searchGames("left") → [{ id: "550", name: "Left 4 Dead 2" }, ...]
 */
export async function searchGames(query: string): Promise<DropdownOptionDto[]> {
  if (!query || query.trim() === "") return [];

  const url = `${BASE_URL}/game/list?search=${encodeURIComponent(query.trim())}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`searchGames failed: ${res.status} ${res.statusText}`);
  }

  // API returns: [{ id: string, name: string }, ...]
  return res.json() as Promise<DropdownOptionDto[]>;
}

// ── Game details ──────────────────────────────────────────────────────────────

/**
 * Fetch full metadata for a single game by its Steam App ID.
 *
 * @example
 *   fetchGame("550") → { id: "550", title: "Left 4 Dead 2", ... }
 */
export async function fetchGame(gameId: string): Promise<GameDto> {
  const url = `${BASE_URL}/game?gameId=${encodeURIComponent(gameId)}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`fetchGame failed: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<GameDto>;
}
