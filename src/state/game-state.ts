import type { Cat } from "../Cat";
import type { Entity } from "../Entity";
import type { Events } from "../Events";

export type TScreens = "catInventory" | "orders" | "witches" | "spells" | null;

export interface IScreens {
  catInventory: Map<string, Cat>;
  orders: Map<string, Events>;
  witches: Map<string, Entity>;
  events: Map<string, Events>;
}

export interface IGameState extends IScreens {
  day: number;
  completedOrders: Map<string, Events>;
  selectedOrder: Events | null;
  selectedCat: Cat | null;
  currentScreen: TScreens;
  entities: Map<string, Entity>;
  remainingTime: number;
  maxTime: number;
}

export const gameInitialState: IGameState = {
  witches: new Map<string, Entity>(),
  entities: new Map<string, Entity>(),
  orders: new Map<string, Events>(),
  completedOrders: new Map<string, Events>(),
  events: new Map<string, Events>(),
  day: 1,
  catInventory: new Map<string, Cat>(),
  selectedOrder: null,
  selectedCat: null,
  currentScreen: null,
  remainingTime: 16,
  maxTime: 16,
};
