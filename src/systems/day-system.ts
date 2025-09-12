import { createRandomizedBonding } from "./bonding-system";
import { gameInitialState } from "../state/game-state";
import { resetRemainingTime } from "./time-system";
import { dayElement, gEiD } from "../get-elements";
import { updateScreenElement } from "../ui";
import {
    generateCatsForCatcher,
    generateCatsForTraps,
} from "./acquisition-system";

import { calculateWeeklyExpenses, payBills } from "../utils";
const gameState = gameInitialState;

export function updateDay() {
    gameState.day += 1;
    dayElement && (dayElement.innerText = `Day: ${gameState.day.toString()}`);

    // Pay bills every 7 days.
    if (gameState.day % 7 === 0) {
        payBills();
    }

    // Daily update of running expenses
    const { dailyExpenses, expensesCountdown } = calculateWeeklyExpenses();
    console.log(
        `Current debt: ${gameState.expenses}gp, daily expenses: ${dailyExpenses}gp, due: ${expensesCountdown} days.`
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
