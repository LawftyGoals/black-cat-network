import { gameInitialState } from "./state/game-state";
import { updateTimeUI } from "./ui";

const gameState = gameInitialState;

export function getTime() {
  return {
    remainingTime: gameState.remainingTime,
    maxTime: gameState.maxTime,
  };
}

export function changeRemainingTime(change: number = -1) {
  gameState.remainingTime += change;
  updateTimeUI();
  return gameState.remainingTime;
}

export function changeMaxTime(change: number = -1) {
  gameState.maxTime += change;
  updateTimeUI();
  return gameState.maxTime;
}

export function resetRemainingTime() {
  gameState.remainingTime = gameState.maxTime;
  updateTimeUI();
}
