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

