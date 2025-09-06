import { createRandomizedBonding } from "./bonding-system";
import { gameInitialState } from "../state/game-state";
import { resetRemainingTime } from "./time-system";
import { dayElement, gEiD } from "../get-elements";
import { updateScreenElement } from "../ui";

const gameState = gameInitialState;

export function updateDay() {
  gameState.day += 1;
  dayElement && (dayElement.innerText = `Day: ${gameState.day.toString()}`);

  /* TEMPORARY TEST STATE */
  createRandomizedBonding();

  resetRemainingTime();
  updateScreenElement();
}

export function initDaySystem() {
  dayElement.innerText = `Day: ${gameState.day.toString()}`;

  const updateDayButton = gEiD("advance-day");

  updateDayButton!.onclick = updateDay;
}
