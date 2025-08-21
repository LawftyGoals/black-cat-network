
import { gameInitialState } from "./state/game-state";
import { cE, clearChildren, gEiD } from "./utils";

const gameState = gameInitialState;
export const catInventory = gameState.catInventory;
export const clearSelectedCat = () => gameState.selectedCat = null;

export class Cat {
    ID: string
    Name: string
    Type: typeof enumCatVariant[TCatVariants]
    constructor(id: string, name: string, type: TenumCatVariants) {
        this.ID = id;
        this.Name = name;
        this.Type = type;
    }
}


export const enumCatVariant = Object.freeze({
    BLACK: 0,
    TABBY: 1,
    PERSIAN: 2,
    SIAMESE: 3,
    SPHYNX: 4,
    CALICO: 5,
    ORANGE: 6,
    RAGDOLL: 7,
    BENGAL: 8,
    FOLD: 9
})

export type TCatVariants = keyof typeof enumCatVariant;
export type TenumCatVariants = typeof enumCatVariant[TCatVariants];

export const variantMapping = Object.freeze({
    "0": "Black",
    "1": "Tabby",
    "2": "Persian",
    "3": "Siamese",
    "4": "Sphynx",
    "5": "Calico",
    "6": "Orange",
    "7": "Ragdoll",
    "8": "Bengal",
    "9": "Scottish Fold"
});

export const enumCatCharacteristics = Object.freeze({
    CURIOUS: 0,      // Explores new environments, investigates objects.
    LAZY: 1,         // Prefers sleeping and minimal activity.
    VENGEFUL: 2,     // Retaliates for perceived slights.
    SOCIAL: 3,       // Enjoys interaction and affection.
    FERAL: 4,        // Avoids human contact, highly independent.
    PLAYFUL: 5,      // Energetic, loves toys and games.
    SHY: 6,          // Hides from strangers or new situations.
    VOCAL: 7,        // Communicates frequently with meows or chirps.
    LOYAL: 8,        // Bonds strongly with specific people.
    AGGRESSIVE: 9,   // Prone to hissing, swatting, or biting.
    PREDATORY: 10,      // Stalks, pounces, and "catches" prey (real or toy).
    FOODMOTIVATED: 11, // Always begging for treats or stealing food.
    CLINGY: 12,      // Follows owner everywhere, demands constant attention.
    INDEPENDENT: 13, // Self-sufficient, content alone for long periods.
    MISCHIEVOUS: 14, // Playfully destructive or causes harmless chaos.
    AFFECTIONATE: 15, // Loves cuddling, purring, and physical contact.
    TERRITORIAL: 16, // Marks space, guards areas, or acts possessive.
    NOCTURNAL: 17,   // Most active at night, zooms around or meows.
    PICKY: 18,       // Fussy about food, litter, or attention.
    OBSERVANT: 19,   // Watches everything intently but rarely engages.
    DARING: 20,      // Fearless, climbs high places, takes risks.
    GENTLE: 21       // Soft, patient, and tolerant.
});

export const characteristicsMapping = Object.freeze({
    "0": "Curious",
    "1": "Lazy",
    "2": "Vengeful",
    "3": "Social",
    "4": "Feral",
    "5": "Playful",
    "6": "Shy",
    "7": "Vocal",
    "8": "Loyal",
    "9": "Aggressive",
    "10": "Predatory",
    "11": "Food-Motivated",
    "12": "Clingy",
    "13": "Independent",
    "14": "Mischievous",
    "15": "Affectionate",
    "16": "Territorial",
    "17": "Nocturnal",
    "18": "Picky",
    "19": "Observant",
    "20": "Daring",
    "21": "Gentle"
});

export type TCatCharacteristics = keyof typeof enumCatCharacteristics;
export type TenumCatCharacteristics = typeof enumCatCharacteristics[TCatCharacteristics];
export type TmapCatCharactheristics = keyof typeof characteristicsMapping;



const catSelect = gEiD("cat-select") as HTMLSelectElement;
const completeOrder = gEiD("complete-order") as HTMLButtonElement;
export function initializeCatSelector() {


    gameState.catInventory.forEach((cat, key) => {
        const catOption = cE("option") as HTMLOptionElement;
        catOption.innerText = `${cat.Name} - ${variantMapping[cat.Type]}`;
        catOption.value = key;
        catSelect?.appendChild(catOption);
    });

    catSelect.onchange = (event: Event) => {
        if ((event!.target! as HTMLInputElement).value !== "") {
            gameState.selectedCat = gameState.catInventory.get((event!.target! as HTMLInputElement).value)!

            completeOrder!.disabled = false;
        }
        else {
            completeOrder!.disabled = true;
        }
    };

}

export function clearCatSelectElement() {
    clearChildren(catSelect);
}