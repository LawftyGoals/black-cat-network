import { gameInitialState } from "../state/game-state";
import { Act } from "../Act";
import { getRandomInt, getRandomizedId } from "../utils";
import { createRandomizedWitch } from "../Entity";
import { getRandomizedCatCharacteristics } from "../Cat";

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

export const reasonForPuchase = [
  "Where can I find it?",
  "I'm looking to buy it.",
  "Do you know where I can get my hands on it?",
  "Is there any way to acquire it?",
  "Could you point me in the direction of where to purchase it?",
  "I'd like to know the best place to find it.",
  "Is this something I can acquire easily?",
  "Can you help me track one down?",
  "I'm trying to locate it for purchase.",
  "What's the best way to get it?",
  "Need a new kitty.",
];
