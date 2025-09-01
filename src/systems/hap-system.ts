// hap-system.ts
import { Happening } from "../Happening";
import { gameInitialState } from "../state/game-state";
import {
  getRandomizedId,
  getRandomExistingWitch,
  getRandomInt,
} from "../utils";
import { getRandomizedCatCharacteristics } from "../Cat";
import { createRandomizedWitch } from "../Entity";

// Helper arrays/data (moved from bonding-system.ts)
const reasonForPuchase = [
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
