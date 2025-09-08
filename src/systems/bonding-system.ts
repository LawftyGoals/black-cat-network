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
import { createNotification } from "./notifications-system";

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
    ["offer"],
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
    const active = bonding.ongoing;

    if (!active && bonding.nextEventDay! < gameState.day) {
      gameState.expiredBondings.set(bonding.id, bonding);
      gameState.bondings.delete(bonding.id);
    }

    const cat = bonding.cat!;
    const requirements = bonding.bondrequirements!;

    if (active && bonding.nextEventDay === gameState.day) {
      const reqsFullfilled = requirements?.reduce((accu, curr) => {
        if (cat.traits.includes(curr)) return accu + 1;
        return accu;
      }, 0);

      gameState.completedBondings.set(bonding.id, bonding);
      gameState.bondings.delete(bonding.id);

      const received = Math.ceil(
        bonding.offer! * (reqsFullfilled / requirements.length)
      );
      updateGp(received);

      if (received === 0) {
        gameState.catInventory.set(cat.id, cat);
        createNotification(
          "Bonding Failed!",
          `Unfortuantely ${cat.name} and ${bonding.agent!
            .name!} did not get along. ${
            cat.name
          } returned to you slightly miffed.`,
          [],
          cat,
          received
        );
      } else {
        createNotification(
          "Bonding Succeeded!",
          `${cat.name} and ${bonding.agent!.name!} bonded successfully. ${
            cat.name
          } will now be a beloved familiar.`,
          [],
          cat,
          received
        );
      }
    }
  });
}

export function acceptbonding(bonding: Happening) {
  bonding.ongoing = true;

  const { days, ticks } = convertTicksToDaysAndTicks(getRandomInt(112, 72));

  bonding.nextEventDay! += days;
  bonding.nextEventTick! += ticks;
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
