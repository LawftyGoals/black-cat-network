import type { Cat } from "../Cat";
import type { Order } from "../Order";

interface ICat {
    day: number,
    catInventory: Cat[],
    orders: Map<string, Order>
}

export const gameInitialState: ICat = {
    day: 1,
    catInventory: [],
    orders: new Map<string, Order>(),
};