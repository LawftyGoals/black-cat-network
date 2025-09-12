import { createRandomizedWitch, type Entity } from "./Entity";
import { closeDialogElement, gEiD } from "./get-elements";
import {
    gameInitialState,
    type IAcquisition,
    type IScreens,
} from "./state/game-state";
import { getRenownLevel } from "./systems/renown-system";
import { renownLevelDivision } from "./Values";

export const gameState = gameInitialState;

export const cE = (
    type:
        | keyof HTMLElementTagNameMap
        | "happening-card"
        | "creature-card"
        | "notification-card"
        | "cat-acquisition"
        | "spell-card"
) => document.createElement(type);

export function sgeid(sr: ShadowRoot, name: string) {
    return sr.getElementById(name)!;
}

export function clearChildren(element: HTMLElement) {
    while (element.firstChild) {
        element.lastChild && element.removeChild(element.lastChild);
    }
}

export function appendChildren(element: HTMLElement, children: HTMLElement[]) {
    children.forEach((child) => element.appendChild(child));
}

export function replaceChildren(element: HTMLElement, children: HTMLElement[]) {
    clearChildren(element);
    children.forEach((child) => element.appendChild(child));
}

export function setupDialog() {
    const dialog = gEiD("dialog") as HTMLDialogElement;
    dialog?.showModal();
    closeDialogElement.onclick = () => dialog.close();
}

export const getRandomInt = (max: number, min: number = 0) => {
    return Math.floor(Math.random() * (max - min)) + min;
};
export const getRandomDecimal = (max: number, min: number) => {
    return Math.random() * (max - min) + min;
};

export const getRandomizedId = () =>
    (getRandomInt(100000) * performance.now()).toString();

export function getArrayOfItemsFromMap<T, V>(map: Map<T, V>) {
    return Array.from(map, ([_id, entOrHap]) => entOrHap);
}

export function getRandomAmountOrNone<T>(
    list: T[],
    maxReveal?: number,
    chanceOfNone?: number
) {
    const workingList = [...list];
    let max = maxReveal ?? list.length;
    const revealed = [];
    if (chanceOfNone && getRandomInt(101) <= chanceOfNone) {
        return [];
    }

    if (max >= workingList.length) return list;

    for (let i = 0; i < getRandomInt(max) + 1; i++) {
        revealed.push(
            ...workingList.splice(getRandomInt(workingList.length), 1)
        );
    }
    return revealed;
}

export function coinFlip() {
    return Math.random() > 0.5;
}

export function clearSelecteds() {
    gameState.selectedBonding = null;
    gameState.selectedCat = null;
}

export function getWitches() {
    return gameState.witches;
}

export function getKnownWitches() {
    return gameState.knownWitches;
}

export function getRandomExistingWitch() {
    const w = gameState.witches;
    return Array.from(w.values())[getRandomInt(w.size)];
}

export function getRandomExistingWitchWithoutBonding() {
    const w = gameState.witches;

    const bondinglessW = Array.from(w.values()).filter(
        (witch) => !witch.inbonding && !witch.relationship
    );

    const renownW = filterWitchesWithinRenounRange(bondinglessW);

    if (renownW.length < 1)
        renownW.push(
            createRandomizedWitch(
                undefined,
                undefined,
                renownLevelDivision[getRenownLevel(gameState.renown)].min,
                renownLevelDivision[getRenownLevel(gameState.renown)].max
            )
        );
    return renownW[getRandomInt(renownW.length)];
}

function filterWitchesWithinRenounRange(witches: Entity[]) {
    return witches.filter((witch) => {
        return (
            gameState.renown <
                renownLevelDivision[getRenownLevel(witch.value)].max &&
            gameState.renown >
                renownLevelDivision[getRenownLevel(witch.value)].min
        );
    });
}

export function getCurrentDayAndTime() {
    const { day, remainingTime } = gameState;
    return { day: day, time: remainingTime };
}

export function convertTicksToDaysAndTicks(ticks: number) {
    return {
        days: Math.floor(ticks / 16),
        ticks: ticks % 16,
    };
}

export function arrayFromMap<T>(mapName: keyof IScreens | keyof IAcquisition) {
    return Array.from((gameState[mapName] as Map<string, T>).values());
}

export function calculateWeeklyExpenses() {
    let expenseRates = new Map<string, number>([
        ["newspaper", 1],
        ["cat", 1],
        ["trap", 0],
        ["rent", 100],
    ]);
    // Retrieve expenses from gameState
    const { day, catInventory, expenses } = gameState;
    // Daily expenses
    const newspaper = expenseRates.get("newspaper");
    const catCount = Array.from(catInventory.values()).length;
    const trapCount = 1;
    const dailyExpenses =
        newspaper! +
        catCount * expenseRates.get("cat")! +
        trapCount * expenseRates.get("trap")!;
    // Weekly expenses
    const weeklyExpenses = expenseRates.get("rent")!;
    const theRentIsDue = day % 7 === 0; // Every 7 days

    // Update expenses in gameState
    // console.log(`gameState.expenses = ${gameState.expenses}`);
    gameState.expenses += dailyExpenses;
    // console.log(`gameState.expenses = ${gameState.expenses}`);
    if (theRentIsDue === true) {
        gameState.expenses += weeklyExpenses;
    }

    // Return current accrued expenses for UI
    const expensesCountdown = 7 - (day % 7);
    const accruedExpenses = theRentIsDue ? weeklyExpenses : 0;

    // Return regular daily, weekly expenses; accrued running expenses
    return {
        dailyExpenses,
        weeklyExpenses,
        accruedExpenses,
        expensesCountdown,
    };
}

export function payBills(): boolean {
    const { gp, expenses } = gameState;

    if (gp >= expenses) {
        console.log(`gameState.expenses = ${gameState.expenses}`);
        gameState.gp -= gameState.expenses;
        console.log(`gameState.expenses = ${gameState.expenses}`);
        gameState.expenses = 0;
        console.log(`gameState.expenses = ${gameState.expenses}`);
        // console.log(
        //     "You have been robbed by the political bourgeoisie and the capital owning class!"
        // );
        return true;
    } else {
        console.log("Ah, you poor bitch, you lost the fucking game!");
        return false;
    }
}
