// Entity.ts

//  import { defaultCatAbilities, defaultWitchAbilities } from "./Values";

import { gameInitialState } from "./state/game-state.js";
import {
  getRandomAmountOrNone,
  getRandomInt,
  getRandomizedId,
} from "./utils.js";

import {
  catVariants,
  catTraits,
  witchTraits,
  catNames,
  witchFirstNames,
  witchSurNames,
  witchVocations,
  witchApproaches,
  catVariantValues,
  type TCatVariants,
} from "./Values.js";

const gameState = gameInitialState;

export const coreEntityGivens = ["name", "type", "deceased", "inBonding"];
export const witchGivens = ["approach"];
export const witchBaseUnknowns = ["age", "sex", "variant", "species"];
export const catGivens = ["sex", "color"];
export const catBaseUnknowns = ["age", "variant"];

export const coreTrapGivens = ["value", "color"];
export const coreCatcherGivens = ["variant", "age", "value", "color"];

export function getNewKnown(entity: Entity) {
  const mutable = { ...entity };
  const { type, knowns, traits, knownTraits } = mutable;

  const unknowns = [];

  if (knownTraits.length !== traits.length) {
    unknowns.push("traits");
  }

  (type === "cat" ? catBaseUnknowns : witchBaseUnknowns).forEach((unknown) => {
    if (!knowns.includes(unknown)) {
      unknowns.push(unknown);
    }
  });

  if (unknowns.length < 1) return false;

  const targetUnknown = unknowns[getRandomInt(unknowns.length)];

  if (targetUnknown === "traits") {
    const unknownTraits = traits.filter(
      (known) => !knownTraits.includes(known)
    );
    const unknownTrait = unknownTraits[getRandomInt(unknownTraits.length)];
    entity.knownTraits.push(unknownTrait);
    return unknownTrait;
  } else {
    entity.knowns.push(targetUnknown);
  }
  return mutable[targetUnknown as keyof typeof mutable];
}

export class Entity {
  id: string;
  type: "cat" | "spell" | "witch";
  inbonding: boolean;
  name: string;
  knowns: string[];
  // All Creatures
  relationship: Entity | null;
  age: number;
  deceased: boolean;
  sex: string;
  value: number | null;
  color: string | null;
  species: string | null;
  traits: string[];
  knownTraits: string[];
  variant: string | null;
  effectedspells: string[];
  // Witch-specific
  vocation: string | null;
  approach: string | null;
  // CAT ABILITIES & TRAITS
  // Agility

  constructor(
    id: string,
    type: "cat" | "spell" | "witch",
    inBonding: boolean = false,
    name: string,
    knowns: string[] = [],
    // All Creatures
    relationship: Entity | null,
    age: number,
    deceased: boolean,
    sex: string,
    value: number | null,
    color: string | null,
    species: string | null = null,
    traits: string[],
    knownTraits: string[],
    variant: string | null = null,
    effectedSpells: string[] = [],
    // Witch-specific
    vocation: string | null = null,
    approach: string | null = null
    // Agility
  ) {
    this.id = id;
    this.type = type;
    this.inbonding = inBonding;
    this.name = name;
    this.knowns = [...(type === "cat" ? catGivens : witchGivens), ...knowns];
    // All Creatures
    this.relationship = relationship;
    this.age = age;
    this.deceased = deceased;
    this.sex = sex;
    this.value = value;
    this.color = color;
    this.species = species;
    this.traits = traits;
    this.knownTraits = knownTraits;
    this.variant = variant;
    this.effectedspells = effectedSpells;
    // Witch-specific
    this.vocation = vocation;
    this.approach = approach;
  }
}

export function createRandomizedCat(freeCat?: boolean): Entity {
  const id = getRandomizedId();
  const randomName = catNames[Math.floor(Math.random() * catNames.length)];
  const randomVariant =
    catVariants[Math.floor(Math.random() * catVariants.length)];
  const randomTraits = [
    catTraits[Math.floor(Math.random() * catTraits.length)],
    catTraits[Math.floor(Math.random() * catTraits.length)],
    catTraits[Math.floor(Math.random() * catTraits.length)],
  ];

  const cat = new Entity(
    id,
    "cat",
    false,
    randomName,
    [],
    null,
    getRandomInt(27, 1), // age
    false, // deceased
    "Male", // sex
    getRandomInt(50),
    "black",
    "Feline", // species
    randomTraits,
    getRandomAmountOrNone(randomTraits, 2, 10),
    randomVariant,
    [],
    null,
    null
  );

  freeCat ?? gameState.catInventory.set(id, cat);
  gameState.entities.set(id, cat);
  gameState.cats.set(id, cat);

  return cat;
}

export function getRandomizedCatCharacteristics(
  characteristicsCount: number = 1
) {
  return new Array(characteristicsCount)
    .fill(null)
    .map(() => catTraits[getRandomInt(catTraits.length)]);
}

export function createRandomizedWitch(
  known: boolean = false,
  ownsCat?: boolean
): Entity {
  const id = getRandomizedId();
  const randomFirstName = witchFirstNames[getRandomInt(witchFirstNames.length)];
  const randomSurName = witchSurNames[getRandomInt(witchSurNames.length)];
  const randomName = `${randomFirstName} ${randomSurName}`;
  const randomTraits = getRandomWitchTraits(3);

  const randomVocation = witchVocations[getRandomInt(witchVocations.length)];
  const randomApproach =
    witchApproaches[getRandomInt(witchApproaches.length)][getRandomInt(2)];

  const witch = new Entity(
    id, //ID
    "witch", // type
    false,
    randomName,
    [],
    ownsCat ? createRandomizedCat() : null,
    getRandomInt(154, 16), // age
    false, // deceased
    "female",
    null,
    null,
    "Human",
    randomTraits,
    getRandomAmountOrNone(randomTraits, 2, 50),
    null,
    [],
    randomVocation,
    randomApproach
  );

  known && gameState.knownWitches.set(id, witch);

  gameState.witches.set(id, witch);
  gameState.entities.set(id, witch);

  return witch;
}

export function createRandomCatForSale(
  targetMap: Map<string, Entity>,
  mapId?: string,
  trap?: boolean
) {
  const id = getRandomizedId();
  const randomTraits = getRandomCatTraits(getRandomInt(5, 3));
  const variant = getRandomCatVariant();
  const { color, value } = catVariantValues[variant];

  const cat = new Entity(
    id,
    "cat",
    false,
    "",
    [],
    null,
    getRandomInt(27, 1),
    false,
    getSex(),
    value,
    color[getRandomInt(color.length)],
    "Feline",
    randomTraits,
    trap ? [] : getRandomAmountOrNone(randomTraits, 2, 10),
    variant
  );

  gameState.entities.set(id, cat);
  targetMap.set(mapId ?? id, cat);

  return cat;
}

function getSex() {
  return Math.random() < 0.5 ? "Male" : "Female";
}

function getRandomCatTraits(quantity: number) {
  const traits = [];
  const reducedTraits = [...catTraits];
  for (let i = 0; i < quantity; i++) {
    traits.push(...reducedTraits.splice(getRandomInt(reducedTraits.length), 1));
  }
  return traits;
}

function getRandomCatVariant() {
  return catVariants[getRandomInt(catVariants.length)] as TCatVariants;
}

function getRandomWitchTraits(quantity: number) {
  const traits = [];
  const reducedTraits = [...witchTraits];
  for (let i = 0; i < quantity; i++) {
    traits.push(...reducedTraits.splice(getRandomInt(reducedTraits.length), 1));
  }
  return traits;
}
