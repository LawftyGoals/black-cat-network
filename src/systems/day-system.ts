import { createRandomizedBonding } from "./bonding-system";
import { gameInitialState } from "../state/game-state";
import { resetRemainingTime } from "./time-system";
import { dayElement, gEiD } from "../get-elements";
import { updateScreenElement } from "../ui";
import {
    generateCatsForCatcher,
    generateCatsForTraps,
} from "./acquisition-system";

import { calculateWeeklyExpenses } from "../utils";
const gameState = gameInitialState;

export function updateDay() {
    gameState.day += 1;
    dayElement && (dayElement.innerText = `Day: ${gameState.day.toString()}`);

    // Call this daily to update expenses and rentDue
    const { dailyExpenses, accruedExpenses, expensesCountdown } =
        calculateWeeklyExpenses();
    console.log(
        `Daily expenses: ${dailyExpenses}gp, Accrued rent: ${accruedExpenses}gp due in ${expensesCountdown} days.`
    );

    /* TEMPORARY TEST STATE */
    createRandomizedBonding();

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
