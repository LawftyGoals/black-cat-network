import { gameInitialState } from "../state/game-state";
import { renownLevelDivision } from "../Values";

const gameState = gameInitialState;

export function changeRenown(quantity: number, modifier: number) {
    if (gameState.renown < 750 && gameState.renown > 0) {
        gameState.renown += quantity * modifier;
        if (gameState.renown < 0) gameState.renown = 0;
        if (gameState.renown > 750) gameState.renown = 750;
    }
    return gameState.renown;
}

export function getRenownLevel(renown: number) {
    const pRenown = renown;

    const level = Object.entries(renownLevelDivision).find(([_key, values]) => {
        return values.max >= pRenown && pRenown >= values.min;
    })!;
    return level[0];
}
