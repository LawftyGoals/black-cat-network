import { gameInitialState } from "./state/game-state";
import { cE, gEiD } from "./utils";

const gameState = gameInitialState;
export const clearSelectedCat = () => gameState.selectedCat = null;

export class Cat {
    mName: string
    mType: typeof enumCatVariant[TCatVariants]
    constructor(name: string, type: TenumCatVariants) {
        this.mName = name;
        this.mType = type;
    }
}


export const enumCatVariant = Object.freeze({
    BLACK: 0,
    TABBY: 1,
    PERSIAN: 2,
    SIAMESE: 3,
    NAKED: 4
})

export type TCatVariants = keyof typeof enumCatVariant;
export type TenumCatVariants = typeof enumCatVariant[TCatVariants];

export const variantMapping = Object.freeze({
    "0": "Black",
    "1": "Tabby",
    "2": "Persian",
    "3": "Siamese",
    "4": "Naked"
});

export const enumCatCharacteristics = Object.freeze({
    SASSY: 0,
    CHARMING: 1,
    ANGRY: 2,
    THOUGHTLESS: 3,
    AGRESSIVE: 4,
    LOVING: 5,
    FLATULANT: 6,
    PROMISCUOUS: 7
});

export const characteristicsMapping = Object.freeze(
    {
        "0": "Sassy",
        "1": "Charming",
        "2": "Angry",
        "3": "Thoughtless",
        "4": "Aggressive",
        "5": "Loving",
        "6": "Flatulent",
        "7": "Promiscuous",
    }

);

export type TCatCharacteristics = keyof typeof enumCatCharacteristics;
export type TenumCatCharacteristics = typeof enumCatCharacteristics[TCatCharacteristics];
export type TmapCatCharactheristics = keyof typeof characteristicsMapping;


export function initializeCatInventory() {
    gameState.catInventory.push(new Cat("Bingus", enumCatVariant.NAKED), new Cat("Terror of the void", enumCatVariant.BLACK));

}

export function initializeCatSelector() {

    const catSelect = document.getElementById("cat-select") as HTMLSelectElement;

    gameState.catInventory.forEach((cat, idx) => {
        const catOption = cE("option") as HTMLOptionElement;
        catOption.innerText = `${cat.mName} - ${variantMapping[cat.mType]}`;
        catOption.value = idx.toString();
        catSelect?.appendChild(catOption);
    });

    catSelect.onchange = (event: Event) => {
        gameState.selectedCat = gameState.catInventory[Number((event!.target! as HTMLInputElement).value)]

        const completeOrder = gEiD("complete-order") as HTMLButtonElement;
        completeOrder!.disabled = false;
    };



}