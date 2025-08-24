import type { Entity } from "../Entity";
import type { Happening } from "../Happening";

export type TScreens =
  | "catInventory"
  | "orders"
  | "witches"
  | "spells"
  | "news"
  | null;

export interface IScreens {
  catInventory: Map<string, Entity>;
  orders: Map<string, Happening>;
  witches: Map<string, Entity>;
  news: Map<string, Happening>;
}

export interface IGameState extends IScreens {
  day: number;
  creations: number;
  completedOrders: Map<string, Happening>;
  selectedOrder: Happening | null;
  selectedCat: Entity | null;
  currentScreen: TScreens;
  entities: Map<string, Entity>;
  remainingTime: number;
  maxTime: number;
  happenings: Map<string, Happening>;
}

export const gameInitialState: IGameState = {
  witches: new Map<string, Entity>(),
  entities: new Map<string, Entity>(),
  orders: new Map<string, Happening>(),
  completedOrders: new Map<string, Happening>(),
  news: new Map<string, Happening>(),
  happenings: new Map<string, Happening>(),
  day: 1,
  creations: 1,
  catInventory: new Map<string, Entity>(),
  selectedOrder: null,
  selectedCat: null,
  currentScreen: null,
  remainingTime: 16,
  maxTime: 16,
};
