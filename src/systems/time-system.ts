import { gEiD } from "../get-elements";
import { gameInitialState } from "../state/game-state";
import { textResource } from "../text/textResource";
import { displayModalMessage, updateScreenElement, updateTimeUI } from "../ui";
import { generateCatsForTraps } from "./acquisition-system";
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
    if (gameState.remainingTime < 1 && change < 0) {
        advTimeButton.disabled = true;
        displayModalMessage(textResource.time.noTime);
    } else {
        generateCatsForTraps();
        updateBondings();
        updateScreenElement();
        gameState.remainingTime += change;
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
