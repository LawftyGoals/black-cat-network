import { gameInitialState } from "../state/game-state";
import { updateTimeUI } from "../ui";
import { gEiD } from "../utils";
const gameState = gameInitialState;
export const advTimeButton = gEiD("advance-time") as HTMLButtonElement;

export function getTime() {
  return {
    remainingTime: gameState.remainingTime,
    maxTime: gameState.maxTime,
  };
}

export function changeRemainingTime(change: number = -1) {
  gameState.remainingTime += change;
  if (gameState.remainingTime < 1) {
    advTimeButton.disabled = true;
  }
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
  if (advTimeButton.disabled) {
    advTimeButton.disabled = false;
  }
  updateTimeUI();
}

export function initTimeSystem() {
  advTimeButton.onclick = () => {
    changeRemainingTime();
  };
  updateTimeUI();
}
