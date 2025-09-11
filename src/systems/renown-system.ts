import { gameInitialState } from "../state/game-state";
import { renownLevelDivision } from "../Values";

const gameState = gameInitialState;

export function changeRenown(quantity: number, modifier: number) {
    if (gameState.renown < 500 && gameState.renown > -500) {
        gameState.renown += quantity * modifier;
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
