import { gameInitialState } from "./state/game-state";

const gameState = gameInitialState;

export function getTime() {
  return {
    remainingTime: gameState.remainingTime,
    maxTime: gameState.maxTime,
  };
}

export function changeRemainingTime(change: number = -1) {
  gameState.remainingTime += change;
  return gameState.remainingTime;
}

export function changeMaxTime(change: number = -1) {
  gameState.maxTime += change;
  return gameState.maxTime;
}

export function resetRemainingTime() {
  gameState.remainingTime = gameState.maxTime;
}
