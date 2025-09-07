import type { Entity } from "../Entity";
import type { Happening } from "../Happening";

export type TScreens = keyof IScreens;

export interface IScreens {
  catInventory: Map<string, Entity>;
  bondings: Map<string, Happening>;
  knownWitches: Map<string, Entity>;
  news: Map<string, Happening>;
  catAcquisition: Map<string, Entity>;
}

export interface IGameState extends IScreens {
  day: number;
  witches: Map<string, Entity>;
  creations: number;
  completedBondings: Map<string, Happening>;
  expiredBondings: Map<string, Happening>;
  selectedBonding: Happening | null;
  cats: Map<string, Entity>;
  selectedCat: Entity | null;
  currentScreen: TScreens;
  entities: Map<string, Entity>;
  remainingTime: number;
  maxTime: number;
  happenings: Map<string, Happening>;
  gp: number;
  notifications: Map<string, Happening>;
  traps: number;
}

export const gameInitialState: IGameState = {
  knownWitches: new Map<string, Entity>(),
  witches: new Map<string, Entity>(),
  entities: new Map<string, Entity>(),
  bondings: new Map<string, Happening>(),
  completedBondings: new Map<string, Happening>(),
  expiredBondings: new Map<string, Happening>(),
  news: new Map<string, Happening>(),
  catAcquisition: new Map<string, Entity>(),
  happenings: new Map<string, Happening>(),
  day: 1,
  creations: 1,
  catInventory: new Map<string, Entity>(),
  cats: new Map<string, Entity>(),
  selectedBonding: null,
  selectedCat: null,
  currentScreen: "bondings",
  remainingTime: 16,
  maxTime: 16,
  gp: 0,
  notifications: new Map<string, Happening>(),
  traps: 1,
};
