import { DetailedState, Game } from "../types/mlb/Schedule";

const inProgressStates: DetailedState[] = ["In Progress"];
const finalStates: DetailedState[] = ["Game Over", "Final"];
const pregameStates: DetailedState[] = ["Scheduled", "Pre-Game", "Warmup"];
const delayedStates: DetailedState[] = ["Postponed"];

export function isPregame(game: Game) {
  return pregameStates.includes(game.status.detailedState);
}

export function isInProgress(game: Game) {
  return inProgressStates.includes(game.status.detailedState);
}

export function isFinal(game: Game) {
  return finalStates.includes(game.status.detailedState);
}

export function isPostponed(game: Game) {
  return game.status.detailedState === "Postponed";
}

export function isDelayed(game: Game) {
  return (
    delayedStates.includes(game.status.detailedState) ||
    game.status.detailedState.toLowerCase().startsWith("delayed")
  );
}

export function isSuspended(game: Game) {
  return game.status.detailedState.toLowerCase().startsWith("suspended");
}

export function showScores(game: Game) {
  return isInProgress(game) || isFinal(game);
}
