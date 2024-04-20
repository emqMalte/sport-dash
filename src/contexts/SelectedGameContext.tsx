import { Dispatch, SetStateAction, createContext, useState } from "react";
import { Game } from "../types/mlb/Schedule";

interface SelectedGameContextValue {
  selectedGame: Game | null;
  setSelectedGame: Dispatch<SetStateAction<Game | null>>;
}

export const SelectedGameContext =
  createContext<SelectedGameContextValue | null>(null);

interface SelectedGameContextProviderProps {
  children: React.ReactNode;
  game?: Game | null;
}

export const SelectedGameContextProvider = ({
  children,
  game = null,
}: SelectedGameContextProviderProps) => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(game);

  return (
    <SelectedGameContext.Provider value={{ selectedGame, setSelectedGame }}>
      {children}
    </SelectedGameContext.Provider>
  );
};
