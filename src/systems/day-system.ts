import { createRandomizedBonding } from "./bonding-system";
import { gameInitialState } from "../state/game-state";
import { resetRemainingTime } from "./time-system";

const gameState = gameInitialState;

export function updateDay() {
  gameState.day += 1;
  const dayElement = document.getElementById("day");
  dayElement && (dayElement.innerText = gameState.day.toString());

  /* TEMPORARY TEST STATE */
  createRandomizedBonding();

  resetRemainingTime();
}
