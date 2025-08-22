// Entity.ts

//  import { defaultCatAbilities, defaultWitchAbilities } from "./Values";

import { getRandomInt } from "./utils.js";

import {
  catVariants,
  catTraits,
  witchTraits,
  witchVariants,
  catNames,
  witchFirstNames,
  witchSurNames,
  witchDomains,
  witchApproaches,
  defaultCatAbilities,
  defaultWitchAbilities,
} from "./Values.js";

export class Entity {
  id: number | null;
  type: "cat" | "spell" | "witch" | null;
  name: string | null;
  // All Creatures
  age: number | null;
  deceased: boolean | null;
  sex: string | null;
  species: string | null;
  traits: string[] | null;
  variant: string | null;
  // Witch-specific
  domain: string | null;
  approach: string[] | null;
  // CAT ABILITIES & TRAITS
  // Agility
  balance: number | null;
  reflex: number | null;
  speed: number | null;
  // Intelligence
  intuition: number | null;
  magicinsight: number | null;
  memory: number | null;
  // Perception and senses
  hearing: number | null;
  smell: number | null;
  taste: number | null;
  vision: number | null;
  // Power
  endurance: number | null;
  grip: number | null;
  magicresistance: number | null;
  strength: number | null;
  // Stealth
  hiding: number | null;
  sneaking: number | null;
  // Temperament
  boldness: number | null;
  mischief: number | null;
  patience: number | null;
  // Luck
  luck: number | null;

  constructor(
    id: number | null = null,
    type: "cat" | "spell" | "witch" | null = null,
    name: string | null = null,
    // All Creatures
    age: number | null = null,
    deceased: boolean | null = null,
    sex: string | null = null,
    species: string | null = null,
    traits: string[] | null = null,
    variant: string | null = null,
    // Witch-specific
    domain: string | null = null,
    approach: string[] | null = null,
    // Agility
    balance: number | null = null,
    reflex: number | null = null,
    speed: number | null = null,
    // Intelligence
    intuition: number | null = null,
    magicinsight: number | null = null,
    memory: number | null = null,
    // Perception and senses
    hearing: number | null = null,
    smell: number | null = null,
    taste: number | null = null,
    vision: number | null = null,
    // Power
    endurance: number | null = null,
    grip: number | null = null,
    magicresistance: number | null = null,
    strength: number | null = null,
    // Stealth
    hiding: number | null = null,
    sneaking: number | null = null,
    // Temperament
    boldness: number | null = null,
    mischief: number | null = null,
    patience: number | null = null,
    // Luck
    luck: number | null = null
  ) {
    this.id = id;
    this.type = type;
    this.name = name;
    // All Creatures
    this.age = age;
    this.deceased = deceased;
    this.sex = sex;
    this.species = species;
    this.traits = traits;
    this.variant = variant;
    // Witch-specific
    this.domain = domain;
    this.approach = approach;
    // Agility
    this.balance = balance;
    this.reflex = reflex;
    this.speed = speed;
    // Intelligence
    this.intuition = intuition;
    this.magicinsight = magicinsight;
    this.memory = memory;
    // Perception and senses
    this.hearing = hearing;
    this.smell = smell;
    this.taste = taste;
    this.vision = vision;
    // Power
    this.endurance = endurance;
    this.grip = grip;
    this.magicresistance = magicresistance;
    this.strength = strength;
    // Stealth
    this.hiding = hiding;
    this.sneaking = sneaking;
    // Temperament
    this.boldness = boldness;
    this.mischief = mischief;
    this.patience = patience;
    // Luck
    this.luck = luck;
  }
}

export function createRandomizedCat(): Entity {
  // const randomName = getRandomCatName();
  // const randomVariant = getRandomCatVariant();
  // const randomTraits = getRandomCatTraits();

  const randomName = catNames[Math.floor(Math.random() * catNames.length)];
  const randomVariant =
    catVariants[Math.floor(Math.random() * catVariants.length)];
  const randomTraits = [
    catTraits[Math.floor(Math.random() * catTraits.length)],
    catTraits[Math.floor(Math.random() * catTraits.length)],
  ];

  return new Entity(
    getRandomInt(),
    "cat",
    randomName,
    getRandomInt(27, 1), // age
    false, // deceased
    "Male", // sex
    "Feline", // species
    randomTraits,
    randomVariant,
    null,
    null,
    defaultCatAbilities.reflex,
    defaultCatAbilities.balance,
    defaultCatAbilities.speed,
    defaultCatAbilities.vision,
    defaultCatAbilities.hearing,
    defaultCatAbilities.smell,
    defaultCatAbilities.taste,
    defaultCatAbilities.memory,
    defaultCatAbilities.intuition,
    defaultCatAbilities.magicinsight,
    defaultCatAbilities.patience,
    defaultCatAbilities.boldness,
    defaultCatAbilities.mischief,
    defaultCatAbilities.sneaking,
    defaultCatAbilities.hiding,
    defaultCatAbilities.strength,
    defaultCatAbilities.grip,
    defaultCatAbilities.endurance,
    defaultCatAbilities.magicresistance,
    defaultCatAbilities.luck
  );
}

export function createRandomizedWitch(): Entity {
  const randomFirstName =
    witchFirstNames[Math.floor(Math.random() * witchFirstNames.length)];
  const randomSurName =
    witchSurNames[Math.floor(Math.random() * witchSurNames.length)];
  const randomName = `${randomFirstName} ${randomSurName}`;
  const randomVariant =
    witchVariants[Math.floor(Math.random() * witchVariants.length)];
  const randomTraits = [
    witchTraits[Math.floor(Math.random() * witchTraits.length)],
    witchTraits[Math.floor(Math.random() * witchTraits.length)],
    witchTraits[Math.floor(Math.random() * witchTraits.length)],
  ];

  const randomDomain =
    witchDomains[Math.floor(Math.random() * witchDomains.length)];
  const randomApproach =
    witchApproaches[Math.floor(Math.random() * witchApproaches.length)];

  return new Entity(
    getRandomInt(),
    "witch", // type
    randomName,
    getRandomInt(154, 16), // age
    false, // deceased
    "female",
    "Human",
    randomTraits,
    randomVariant,
    randomDomain,
    randomApproach,
    defaultWitchAbilities.reflex,
    defaultWitchAbilities.balance,
    defaultWitchAbilities.speed,
    defaultWitchAbilities.vision,
    defaultWitchAbilities.hearing,
    defaultWitchAbilities.smell,
    defaultWitchAbilities.taste,
    defaultWitchAbilities.memory,
    defaultWitchAbilities.intuition,
    defaultWitchAbilities.magicinsight,
    defaultWitchAbilities.patience,
    defaultWitchAbilities.boldness,
    defaultWitchAbilities.mischief,
    defaultWitchAbilities.sneaking,
    defaultWitchAbilities.hiding,
    defaultWitchAbilities.strength,
    defaultWitchAbilities.grip,
    defaultWitchAbilities.endurance,
    defaultWitchAbilities.magicresistance,
    defaultWitchAbilities.luck
  );
}
