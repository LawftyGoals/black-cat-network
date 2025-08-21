import type { Cat } from "../Cat";
import type { Entity } from "../Entity";
import type { Order } from "../Order";

export type TScreens = "catInventory" | "orders" | "witches" | "spells" | null;

interface IGameState {
  day: number;
  catInventory: Map<string, Cat>;
  orders: Map<string, Order>;
  completedOrders: Map<string, Order>;
  selectedOrder: Order | null;
  selectedCat: Cat | null;
  currentScreen: TScreens;
  witches: Map<number, Entity>;
  entities: Map<number, Entity>;
  remainingTime: number;
  maxTime: number;
}

export const gameInitialState: IGameState = {
  day: 1,
  catInventory: new Map<string, Cat>(),
  orders: new Map<string, Order>(),
  completedOrders: new Map<string, Order>(),
  selectedOrder: null,
  selectedCat: null,
  currentScreen: null,
  witches: new Map<number, Entity>(),
  entities: new Map<number, Entity>(),
  remainingTime: 16,
  maxTime: 16,
};
