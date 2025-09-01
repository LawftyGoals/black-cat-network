import { gameInitialState } from "../state/game-state";
import { Happening } from "../Happening";
import {
  convertTicksToDaysAndTicks,
  getRandomExistingWitch,
  getRandomInt,
  getRandomizedId,
} from "../utils";
import { getRandomizedCatCharacteristics } from "../Entity";
import { updateGp } from "../ui";

const gameState = gameInitialState;

export function createRandomizedBonding() {
  const id = getRandomizedId();

  const randomWitch = getRandomExistingWitch();

  const { days, ticks } = convertTicksToDaysAndTicks(getRandomInt(112, 72));

  const order = new Happening(
    id,
    false,
    gameState.day + days,
    ticks,
    ["Offer"],
    "bonding",
    randomWitch,
    "I would like to acquire a BLACK CAT",
    reasonForPuchase[getRandomInt(reasonForPuchase.length)],
    getRandomInt(200),
    gameState.catInventory,
    getRandomizedCatCharacteristics(3)
  );

  gameState.knownWitches.set(randomWitch.id, randomWitch);

  gameState.bondings.set(id, order);
  gameState.happenings.set(id, order);
}

export function updateBondings() {
  gameState.bondings.forEach((bonding) => {
    const active = bonding.Active;
    const cat = bonding.Cat!;
    const requirements = bonding.Requirements!;
    if (!active && bonding.NextEventDay! < gameState.day) {
      gameState.expiredBondings.set(bonding.id, bonding);
      gameState.bondings.delete(bonding.id);
    }

    if (active && bonding.NextEventDay === gameState.day) {
      const reqsFullfilled = requirements?.reduce((accu, curr) => {
        if (cat.traits.includes(curr)) return accu + 1;
        return accu;
      }, 0);

      gameState.completedBondings.set(bonding.id, bonding);
      gameState.bondings.delete(bonding.id);
      updateGp(
        Math.ceil(bonding.Offer! * (reqsFullfilled / requirements.length))
      );
    }
  });
}

export function acceptbonding(bonding: Happening) {
  bonding.Active = true;

  const { days, ticks } = convertTicksToDaysAndTicks(getRandomInt(112, 72));

  bonding.NextEventDay = days;
  bonding.NextEventTick = ticks;
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
