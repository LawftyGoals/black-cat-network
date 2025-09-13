import { createBonding } from "./bonding-system";
import { gameInitialState } from "../state/game-state";
import { resetRemainingTime } from "./time-system";
import { dayElement, gEiD } from "../get-elements";
import { updateScreenElement } from "../ui";
import {
    generateCatsForCatcher,
    generateCatsForTraps,
} from "./acquisition-system";
import { payBills, calculateWeeklyExpenses } from "../systems/banking-system";
import { createNewsHap } from "./news-system";

const gameState = gameInitialState;

export function updateDay() {
    gameState.day += 1;
    dayElement && (dayElement.innerText = `Day: ${gameState.day.toString()}`);

    /* TEMPORARY TEST STATE */
    if (gameState.day % 7 === 0) {
        payBills();
    }

    if (Math.random() < 0.2) createNewsHap();
    if (Math.random() < 0.15) createBonding();

    calculateWeeklyExpenses();

    /*PERMANENT CHANGES*/
    generateCatsForCatcher(true);
    generateCatsForTraps(0.25);
    resetRemainingTime();
    updateScreenElement();
}

export function initDaySystem() {
    dayElement.innerText = `Day: ${gameState.day.toString()}`;

    const updateDayButton = gEiD("advance-day");

    updateDayButton!.onclick = updateDay;
}
