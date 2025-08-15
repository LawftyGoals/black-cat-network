import type { Cat } from "../Cat";

interface ICat {
    day: number,
    catInventory: Cat[]
}

export const gameInitialState: ICat = {
    day: 1,
    catInventory: []
};