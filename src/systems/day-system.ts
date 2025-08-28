import { createRandomizedBonding } from "./bonding-system";
import { gameInitialState } from "../state/game-state";
import { resetRemainingTime } from "./time-system";
import { dayElement, gEiD } from "../get-elements";

const gameState = gameInitialState;

export function updateDay() {
  gameState.day += 1;
  dayElement && (dayElement.innerText = gameState.day.toString());

  /* TEMPORARY TEST STATE */
  createRandomizedBonding();

  resetRemainingTime();
}

export function initDaySystem() {
  dayElement.innerText = gameState.day.toString();

  const updateDayButton = gEiD("advance-day");

  updateDayButton!.onclick = updateDay;
}
