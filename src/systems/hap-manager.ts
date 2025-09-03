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
