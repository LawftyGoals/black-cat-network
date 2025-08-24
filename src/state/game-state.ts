import type { Entity } from "../Entity";
import type { Act } from "../Act";

export type TScreens = keyof IScreens;

export interface IScreens {
  catInventory: Map<string, Entity>;
  orders: Map<string, Act>;
  witches: Map<string, Entity>;
  news: Map<string, Act>;
}

export interface IGameState extends IScreens {
  day: number;
  creations: number;
  completedOrders: Map<string, Act>;
  selectedOrder: Act | null;
  selectedCat: Entity | null;
  currentScreen: TScreens;
  entities: Map<string, Entity>;
  remainingTime: number;
  maxTime: number;
  acts: Map<string, Act>;
}

export const gameInitialState: IGameState = {
  witches: new Map<string, Entity>(),
  entities: new Map<string, Entity>(),
  orders: new Map<string, Act>(),
  completedOrders: new Map<string, Act>(),
  news: new Map<string, Act>(),
  acts: new Map<string, Act>(),
  day: 1,
  creations: 1,
  catInventory: new Map<string, Entity>(),
  selectedOrder: null,
  selectedCat: null,
  currentScreen: "catInventory",
  remainingTime: 16,
  maxTime: 16,
};
