import { gameInitialState } from "./state/game-state";
import type { Events } from "./Events";

const gameState = gameInitialState;

export const clearSelectedOrder = () => (gameState.selectedOrder = null);
export const setSelectedOrder = (order: Events) =>
  (gameState.selectedOrder = order);
