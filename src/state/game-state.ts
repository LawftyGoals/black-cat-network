import type { Entity } from "../Entity";
import type { Order } from "../Order";

interface IGameState {
  day: number;
  catInventory: Map<number, Entity>;
  orders: Map<string, Order>;
  selectedOrder: Order | null;
  completedOrders: Map<string, Order>;
  selectedCat: Entity | null;
  witches: Map<number, Entity>;
  entities: Map<number, Entity>;
  remainingTime: number;
  maxTime: number;
}

export const gameInitialState: IGameState = {
  day: 1,
  catInventory: new Map<number, Entity>(),
  orders: new Map<string, Order>(),
  completedOrders: new Map<string, Order>(),
  selectedOrder: null,
  selectedCat: null,
  witches: new Map<number, Entity>(),
  entities: new Map<number, Entity>(),
  remainingTime: 16,
  maxTime: 16,
};
