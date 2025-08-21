// Entity.ts

import { gameInitialState } from "./state/game-state";
import { getRandomizedId } from "./utils";

export class Entity {
    id: number | null;
    type: "witch" | "cat" | "spell" | null;
    species: string | null;
    sex: string | null;
    // Agility
    reflex: number | null;
    balance: number | null;
    speed: number | null;
    // Perception and senses
    vision: number | null;
    hearing: number | null;
    smell: number | null;
    taste: number | null;
    // Intelligence
    memory: number | null;
    intuition: number | null;
    magicinsight: number | null;
    // Temperament
    patience: number | null;
    boldness: number | null;
    mischief: number | null;
    // Stealth
    sneaking: number | null;
    hiding: number | null;
    // Power
    strength: number | null;
    grip: number | null;
    endurance: number | null;
    magicresistance: number | null;
    // Luck
    luck: number | null;
    traits: string[] | null;
    variant: string | null;

    constructor(
        id: number | null = null,
        species: string | null = null,
        sex: string | null = null,
        type: "witch" | "cat" | "spell" | null = null,
        reflex: number | null = null,
        balance: number | null = null,
        speed: number | null = null,
        vision: number | null = null,
        hearing: number | null = null,
        smell: number | null = null,
        taste: number | null = null,
        memory: number | null = null,
        intuition: number | null = null,
        magicinsight: number | null = null,
        patience: number | null = null,
        boldness: number | null = null,
        mischief: number | null = null,
        sneaking: number | null = null,
        hiding: number | null = null,
        strength: number | null = null,
        grip: number | null = null,
        endurance: number | null = null,
        magicresistance: number | null = null,
        luck: number | null = null,
        traits: string[] | null = null,
        variant: string | null = null
    ) {
        this.id = id;
        this.species = species;
        this.sex = sex;
        this.type = type;
        this.reflex = reflex;
        this.balance = balance;
        this.speed = speed;
        this.vision = vision;
        this.hearing = hearing;
        this.smell = smell;
        this.taste = taste;
        this.memory = memory;
        this.intuition = intuition;
        this.magicinsight = magicinsight;
        this.patience = patience;
        this.boldness = boldness;
        this.mischief = mischief;
        this.sneaking = sneaking;
        this.hiding = hiding;
        this.strength = strength;
        this.grip = grip;
        this.endurance = endurance;
        this.magicresistance = magicresistance;
        this.luck = luck;
        this.traits = traits;
        this.variant = variant;

    }
}

export function createRandomizedWitch() {
    const id = getRandomizedId();
    const witch = new Entity(id, "Humanish", "Female", "witch", 5, 3, 15, 100, 50, -20, 32, 100, 200, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ["peckish"], "Satanic");

    gameInitialState.entities.set(id, witch);
    gameInitialState.witches.set(id, witch);

    return witch;

}