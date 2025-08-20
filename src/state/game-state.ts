import type { Cat } from "../Cat";
import type { Order } from "../Order";

export type TScreens = "catInventory" | "orders" | "witches" | "spells" | null

interface IGameState {
    day: number,
    catInventory: Map<string, Cat>,
    orders: Map<string, Order>,
    selectedOrder: Order | null,
    completedOrders: Map<string, Order>,
    selectedCat: Cat | null,
    currentScreen: TScreens
}

export const gameInitialState: IGameState = {
    day: 1,
    catInventory: new Map<string, Cat>(),
    orders: new Map<string, Order>(),
    completedOrders: new Map<string, Order>(),
    selectedOrder: null,
    selectedCat: null,
    currentScreen: null
};