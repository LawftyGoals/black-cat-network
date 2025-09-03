import { gEiD } from "../get-elements";
import { gameInitialState } from "../state/game-state";
import { updateTimeUI } from "../ui";
import { updateBondings } from "./bonding-system";
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

  updateBondings();
  updateTimeUI();

  return gameState.remainingTime;
}

export function changeMaxTime(change: number = -1) {
  gameState.maxTime += change;
  updateTimeUI();
  return gameState.maxTime;
}

export function resetRemainingTime() {
  changeRemainingTime(gameState.maxTime - gameState.remainingTime);
  if (advTimeButton.disabled) {
    advTimeButton.disabled = false;
  }
}

export function initTimeSystem() {
  advTimeButton.onclick = () => {
    changeRemainingTime();
  };
  updateTimeUI();
}
