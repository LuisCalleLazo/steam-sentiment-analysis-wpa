import AsyncSelect from "react-select/async";
import type { StylesConfig, GroupBase } from "react-select";
import { searchGames } from "../services/api";
import type { DropdownOptionDto } from "../types";

// ── Option shape react-select uses ───────────────────────────────────────────
type GameOption = {
  value: string;   // game id
  label: string;   // game name
};

type Props = {
  value: GameOption | null;
  onChange: (option: GameOption | null) => void;
};

// ── Steam dark theme for react-select ────────────────────────────────────────
const steamStyles: StylesConfig<GameOption, false, GroupBase<GameOption>> = {
  control: (base, state) => ({
    ...base,
    minWidth: 280,
    background: "rgba(15, 28, 44, 0.85)",
    border: state.isFocused
      ? "1px solid #66c0f4"
      : "1px solid rgba(102, 192, 244, 0.25)",
    borderRadius: 8,
    boxShadow: state.isFocused
      ? "0 0 0 3px rgba(102, 192, 244, 0.18)"
      : "none",
    color: "#c6d4df",
    cursor: "text",
    padding: "2px 4px",
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: "#66c0f4",
    },
  }),
  input: (base) => ({
    ...base,
    color: "#c6d4df",
    caretColor: "#66c0f4",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#5a7a9a",
    fontSize: "0.875rem",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#e8eaf6",
    fontSize: "0.9rem",
    fontWeight: 500,
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  menu: (base) => ({
    ...base,
    background: "rgba(15, 28, 44, 0.98)",
    border: "1px solid rgba(102, 192, 244, 0.25)",
    borderRadius: 10,
    boxShadow: "0 16px 48px rgba(0, 0, 0, 0.5)",
    marginTop: 6,
    overflow: "hidden",
    backdropFilter: "blur(12px)",
  }),
  menuList: (base) => ({
    ...base,
    padding: "4px",
    maxHeight: 300,
    "::-webkit-scrollbar": {
      width: "5px",
    },
    "::-webkit-scrollbar-thumb": {
      background: "rgba(102, 192, 244, 0.3)",
      borderRadius: "4px",
    },
  }),
  option: (base, state) => ({
    ...base,
    background: state.isSelected
      ? "rgba(102, 192, 244, 0.2)"
      : state.isFocused
      ? "rgba(102, 192, 244, 0.1)"
      : "transparent",
    color: state.isSelected ? "#66c0f4" : "#c6d4df",
    borderRadius: 6,
    padding: "10px 14px",
    fontSize: "0.875rem",
    cursor: "pointer",
    transition: "background 0.15s ease",
    "&:active": {
      background: "rgba(102, 192, 244, 0.25)",
    },
  }),
  loadingMessage: (base) => ({
    ...base,
    color: "#8892a4",
    fontSize: "0.85rem",
  }),
  noOptionsMessage: (base) => ({
    ...base,
    color: "#8892a4",
    fontSize: "0.85rem",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? "#66c0f4" : "#5a7a9a",
    transition: "color 0.2s ease, transform 0.2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
    "&:hover": { color: "#66c0f4" },
  }),
  clearIndicator: (base) => ({
    ...base,
    color: "#5a7a9a",
    "&:hover": { color: "#ff6b6b" },
  }),
};

// ── Debounced async loader ───────────────────────────────────────────────────

let debounceTimer: ReturnType<typeof setTimeout>;

/**
 * Called by react-select on every keystroke.
 * Uses a 300ms debounce to avoid flooding the API.
 * Maps DropdownOptionDto → GameOption for react-select.
 */
function loadOptions(inputValue: string): Promise<GameOption[]> {
  return new Promise((resolve) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      if (!inputValue || inputValue.trim().length < 1) {
        resolve([]);
        return;
      }
      try {
        const results = await searchGames(inputValue);
        resolve(
          results.map((g: DropdownOptionDto) => ({ value: g.id, label: g.name }))
        );
      } catch {
        resolve([]);
      }
    }, 300);
  });
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function GameSearchSelect({ value, onChange }: Props) {
  return (
    <div className="game-search-wrap">
      <label className="game-search-label" htmlFor="game-search">
        Buscar juego
      </label>
      <AsyncSelect<GameOption>
        inputId="game-search"
        placeholder="Escribe el nombre del juego…"
        loadingMessage={() => "Buscando en Steam…"}
        noOptionsMessage={({ inputValue }) =>
          inputValue.length === 0
            ? "Escribe para buscar"
            : "No se encontraron juegos"
        }
        loadOptions={loadOptions}
        onChange={onChange}
        value={value}
        isClearable
        defaultOptions={false}
        cacheOptions
        styles={steamStyles}
        menuPortalTarget={document.body}
        menuPosition="fixed"
        menuShouldScrollIntoView={false}
        // Debounce built-in via loadOptions — fires on every change
      />
    </div>
  );
}
