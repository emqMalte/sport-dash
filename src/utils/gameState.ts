import { DetailedState, Game } from "../types/mlb/Schedule";

const finalStates: DetailedState[] = ["Game Over", "Final"];
const pregameStates: DetailedState[] = ["Scheduled", "Pre-Game", "Warmup"];
const delayedStates: DetailedState[] = ["Postponed"];

export function isPregame(game: Game) {
  return pregameStates.includes(game.status.detailedState);
}

export function isInProgress(game: Game) {
  return game.status.detailedState === "In Progress";
}

export function isFinal(game: Game) {
  return finalStates.includes(game.status.detailedState);
}

export function isDelayed(game: Game) {
  return delayedStates.includes(game.status.detailedState);
}

export function showScores(game: Game) {
  return isInProgress(game) || isFinal(game);
}
