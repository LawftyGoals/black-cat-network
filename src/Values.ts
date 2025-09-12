// Values.ts

export const chances = {
    getSpellFromBonding: 0.01,
    discoverNewWitch: 0.25,
};

export const itemValues = {
    trap: { value: 100 },
    bonding: { value: 500 },
};
export const renownValues = {
    bonding: { maxRenown: 100, maxFailedRenown: -100 },
    detectedSpell: { failedRenown: -100 },
};

export const renownToWitchModifiers: IRenownLevels = {
    0: { max: 0.1, min: 0.05 },
    10: { max: 0.25, min: 0.1 },
    50: { max: 0.5, min: 0.1 },
    100: { max: 1.0, min: 1.0 },
    250: { max: 1.5, min: 1.5 },
    500: { max: 2, min: 2 },
};

export const renownToGoldModifiers: IRenownLevels = {
    0: { max: 0.05, min: 0.01 },
    10: { max: 0.1, min: 0.05 },
    50: { max: 0.25, min: 0.1 },
    100: { max: 0.5, min: 0.25 },
    250: { max: 0.75, min: 0.5 },
    500: { max: 1, min: 0.75 },
};

interface IRenownLevels {
    [key: string]: {
        max: number;
        min: number;
    };
}

export const renownLevelDivision: IRenownLevels = {
    0: { max: 9, min: 0 },
    10: { max: 49, min: 10 },
    50: { max: 99, min: 50 },
    100: { max: 249, min: 100 },
    250: { max: 499, min: 250 },
    500: { max: 750, min: 500 },
};
// Species
export const species: string[] = ["Human", "Feline", "Other"];

// Cat Variants
export const catVariants: TCatVariant[] = [
    "Tabby",
    "Siamese",
    "Persian",
    "Maine Coon",
    "Bengal",
    "Sphynx",
    "Ragdoll",
    "British Shorthair",
    "Abyssinian",
    "Scottish Fold",
];

export type TCatVariantValues = {
    Tabby: { value: number; color: TCatColor[] };
    Siamese: { value: number; color: TCatColor[] };
    Persian: { value: number; color: TCatColor[] };
    "Maine Coon": { value: number; color: TCatColor[] };
    Bengal: { value: number; color: TCatColor[] };
    Sphynx: { value: number; color: TCatColor[] };
    Ragdoll: { value: number; color: TCatColor[] };
    "British Shorthair": { value: number; color: TCatColor[] };
    Abyssinian: { value: number; color: TCatColor[] };
    "Scottish Fold": { value: number; color: TCatColor[] };
};

export type TCatVariant = keyof TCatVariantValues;

export const catVariantValues: TCatVariantValues = {
    Tabby: { value: 7, color: ["orange", "greytone"] },
    Siamese: { value: 25, color: ["white"] },
    Persian: { value: 30, color: ["white", "grey", "black", "orange"] },
    "Maine Coon": {
        value: 15,
        color: ["white", "orange", "greytone", "black"],
    },
    Bengal: { value: 45, color: ["orange", "greytone"] },
    Sphynx: { value: 20, color: ["pink", "grey", "black", "white"] },
    Ragdoll: { value: 35, color: ["white"] },
    "British Shorthair": {
        value: 15,
        color: ["black", "grey", "white", "orange"],
    },
    Abyssinian: { value: 40, color: ["orange"] },
    "Scottish Fold": {
        value: 25,
        color: ["grey", "white", "greytone", "black", "orange"],
    },
};

export type TCatColor =
    | "black"
    | "orange"
    | "greytone"
    | "white"
    | "grey"
    | "pink";

export const catColors: TCatColor[] = [
    "black",
    "orange",
    "greytone",
    "white",
    "grey",
    "pink",
];

export const catVariantsByColor = (color: TCatColor) =>
    Object.keys(catVariantValues).filter((cat) =>
        catVariantValues[cat as TCatVariant].color.includes(color)
    );

export const getBlackCatVariants = () =>
    Object.keys(catVariantValues).filter((cat) =>
        catVariantValues[cat as TCatVariant].color.includes("black")
    );

// Witch Traits
export const allTraits: TTrait[] = [
    "affectionate",
    "calm",
    "charming",
    "clever",
    "independent",
    "mischievous",
    "playful",
    "possessive",
    "reclusive",
    "stubborn",
    "vocal",
    "agressive",
    "thoughtful",
    "short fused",
    "defiant",
    "greedy",
];

export type TTrait =
    | "affectionate"
    | "calm"
    | "charming"
    | "clever"
    | "independent"
    | "mischievous"
    | "playful"
    | "possessive"
    | "reclusive"
    | "stubborn"
    | "vocal"
    | "agressive"
    | "thoughtful"
    | "short fused"
    | "defiant"
    | "greedy";

// Names for Cats
export const catNames: string[] = [
    "Alioth",
    "Apophis",
    "Arcana",
    "Siren",
    "Stian",
    "Sylph",
    "Talon",
    "Undine",
    "Vesper",
    "Vila",
    "Void",
    "Voodoo",
    "Wraith",
    "Zorya",
];

export const witchFirstNames = [
    "Adeline",
    "Aelin",
    "Agatha",
    "Allegra",
    "Alondra",
    "Eufemia",
    "Egeria",
    "Griselda",
    "Gwynne",
    "Jennifer",
    "Juniper",
    "Kyria",
    "Laetitia",
    "Larissa",
    "Stella",
    "Tallulah",
    "Thea",
    "Theofania",
    "Tirza",
    "Ursula",
    "Vandelia",
    "Zelia",
    "Zephyra",
    "Zelda",
];

// Surnames for Witches (REPLACED)
export const witchSurNames = [
    "Addicock",
    "Amondsham",
    "Atherton",
    "Barrentine",
    "Basset",
    "Ballard",
    "Barnaby",
    "Beauchamp",
    "Culpepper",
    "Diddle",
    "Dine",
    "Hancock",
    "Harper",
    "Harleston",
    "Hastings",
    "Pelletoot",
    "Penhallick",
    "Petham",
    "Piggott",
    "Pinncock",
    "Polsted",
    "Polton",
    "Pursglove",
    "Torrington",
    "Trump",
    "Tregonwell",
    "Twarby",
    "Waldegrave",
    "Wistring",
    "Worsley",
    "Wreke",
];

// Witch Vocations
export const witchVocations = [
    "Alchemist",
    "Diviner",
    "Enchantress",
    "Herbalist",
    "Necromancer",
    "Satanist",
];

// Witchcraft Approaches (NEW)
export const witchApproaches = [
    ["Animist", "Materialist"],
    ["Authoritarian", "Egalitarian"],
    ["Exploratory", "Scholastic"],
    ["Extremist", "Moderate"],
    ["Purist", "Syncretic"],
];