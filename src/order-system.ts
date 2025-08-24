import { gameInitialState } from "./state/game-state";
import { Act } from "./Act";
import { getRandomInt, getRandomizedId } from "./utils";
import { createRandomizedWitch } from "./Entity";
import { getRandomizedCatCharacteristics, reasonForPuchase } from "./test-data";

const gameState = gameInitialState;

export const clearSelectedOrder = () => (gameState.selectedOrder = null);

export function createRandomizedOrder() {
  gameState.creations += 1;
  const id = getRandomizedId() + gameState.creations;
  const order = new Act(
    id,
    "request",
    createRandomizedWitch(),
    "I would like to acquire a BLACK CAT",
    reasonForPuchase[getRandomInt(reasonForPuchase.length)],
    100,
    0,
    getRandomizedCatCharacteristics(3)
  );

  gameState.orders.set(id, order);
  gameState.acts.set(id, order);
}
