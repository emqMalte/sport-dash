import { useState } from "react";
import { SelectedGameContext } from "./context";
import { Game } from "../../types/mlb/Schedule";

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
