import { Dispatch, SetStateAction, createContext } from "react";
import { Game } from "../../types/mlb/Schedule";

interface SelectedGameContextValue {
  selectedGame: Game | null;
  setSelectedGame: Dispatch<SetStateAction<Game | null>>;
}

export const SelectedGameContext =
  createContext<SelectedGameContextValue | null>(null);
