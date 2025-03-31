import { useEffect } from "react";

import { useRef, useState } from "react";
import { ScoringPlay } from "../types/mlb/Schedule";

export const useScoreChangeHook = (
  currentScore: number,
  scoringPlays: ScoringPlay[],
) => {
  const prevScoreRef = useRef(currentScore);
  const prevScoringPlaysRef = useRef(scoringPlays);
  const [animationState, setAnimationState] = useState({
    isScoreChanged: false,
    isHomeRun: false,
  });

  useEffect(() => {
    // Only trigger animation if score increased
    if (prevScoreRef.current < currentScore) {
      // const scoreIncrease = currentScore - prevScoreRef.current;
      setAnimationState({
        isScoreChanged: true,
        isHomeRun: scoringPlays.at(-1)?.result.event === "Home Run",
      });

      const timer = setTimeout(() => {
        setAnimationState({ isScoreChanged: false, isHomeRun: false });
      }, 3000);

      return () => clearTimeout(timer);
    }
    prevScoreRef.current = currentScore;
    prevScoringPlaysRef.current = scoringPlays;
  }, [currentScore, scoringPlays]);

  return animationState;
};
