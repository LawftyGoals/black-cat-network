import type { Cat } from "../Cat";
import type { Entity } from "../Entity";
import type { Order } from "../Order";

interface IGameState {
    day: number,
    catInventory: Map<string, Cat>,
    orders: Map<string, Order>,
    selectedOrder: Order | null,
    completedOrders: Map<string, Order>,
    selectedCat: Cat | null,
    witches: Map<number, Entity>,
    entities: Map<number, Entity>
}

export const gameInitialState: IGameState = {
    day: 1,
    catInventory: new Map<string, Cat>(),
    orders: new Map<string, Order>(),
    completedOrders: new Map<string, Order>(),
    selectedOrder: null,
    selectedCat: null,
    witches: new Map<number, Entity>(),
    entities: new Map<number, Entity>(),
};