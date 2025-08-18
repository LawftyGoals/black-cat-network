import type { Cat } from "../Cat";
import type { Order } from "../Order";

interface IGameState {
    day: number,
    catInventory: Cat[],
    orders: Map<string, Order>,
    selectedOrder: Order | null,
    completedOrders: Map<string, Order>,
    selectedCat: Cat | null,
}

export const gameInitialState: IGameState = {
    day: 1,
    catInventory: [],
    orders: new Map<string, Order>(),
    completedOrders: new Map<string, Order>(),
    selectedOrder: null,
    selectedCat: null
};