import { createRandomCatForSale, Entity } from "../Entity";
import { gameInitialState } from "../state/game-state";
import { getRandomInt } from "../utils";

const gameState = gameInitialState;

export function generateTraps(quantity: number = 1) {
  const traps = gameState.traps;
  for (let i = 0; i < quantity; i++) {
    traps.set(`trap-${traps.size}`, null);
  }
}

export function getCatFromTrap(trapId: string) {
  const cat = gameState.traps.get(trapId)!;
  gameState.traps.set(trapId, null);
  gameState.catInventory.set(cat.id, cat);
}

export function generateCatsForTraps(probability?: number) {
  const traps = gameState.traps;
  traps.forEach((_, key) => {
    if (!traps.get(key)) {
      const caught = probability
        ? Math.random() < probability
        : Math.random() < 0.1;
      if (caught) {
        createRandomCatForSale(
          gameState.traps as Map<string, Entity>,
          key,
          true
        );
      }
    }
  });
}

export function generateCatsForCatcher(reset: boolean, quantity?: number) {
  reset && gameState.catCatcher.clear();
  const Quantity = quantity ?? getRandomInt(5, 3);

  for (let i = 0; i < Quantity; i++) {
    createRandomCatForSale(gameState.catCatcher);
  }
  console.log(gameState.catCatcher);
}

export function initAcquisition() {
  generateTraps();
  generateCatsForCatcher(true);
}
