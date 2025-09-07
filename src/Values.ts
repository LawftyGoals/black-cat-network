// Values.ts

// Species
export const species: string[] = ["Human", "Feline", "Other"];

export type TCatVariants =
  | "Black"
  | "Tabby"
  | "Siamese"
  | "Persian"
  | "Maine Coon"
  | "Bengal"
  | "Sphynx"
  | "Ragdoll"
  | "British Shorthair"
  | "Abyssinian"
  | "Scottish Fold";
// Cat Variants
export const catVariants = [
  "Black",
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

export const catVariantValues = {
  Black: { value: 10, color: ["black"] },
  Tabby: { value: 7, color: ["orange", "greytone"] },
  Siamese: { value: 25, color: ["white"] },
  Persian: { value: 30, color: ["white", "grey", "black", "orange"] },
  "Maine Coon": { value: 15, color: ["white", "ginger", "greytone", "black"] },
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
    color: ["grey", "white", "greystone", "black", "orange"],
  },
};

// Cat Traits
export const catTraits = [
  "playful",
  "curious",
  "affectionate",
  "independent",
  "shy",
  "vocal",
  "lazy",
  "friendly",
  "aggressive",
  "intelligent",
];

// Cat Traits Reworked    (Are we missing Playful or Mischievous?)
// export const catTraitsNew: string[] = [
//   ["Active", "Lazy"],
//   ["Curious", "Shy"],
//   ["Cunning", "Derpy"],
//   ["Impulsive", "Anxious"],
//   ["Sweet", "Mischievous"],
//   ["Vocal", "Quiet"],
// ];

// Witch Traits
export const witchTraits: string[] = [
  "vindictive",
  "paranoid",
  "lustful",
  "wise",
  "mysterious",
  "manipulative",
  "charismatic",
  "secretive",
  "ambitious",
  "cunning",
];

// Names for Cats
export const catNames: string[] = [
  "Mittens",
  "Beliaal",
  "Lucifer",
  "Oliver",
  "Luna",
  "Jove",
  "Seth",
  "Pudge",
  "Phobos",
  "Alioth",
  "Djinni",
  "Artemis",
];

export const witchFirstNames = [
  "Fillippa",
  "Brione",
  "Constance",
  "Nebula",
  "Fleur",
  "Adeline",
  "Olive",
  "Odette",
  "Aurora",
  "Alondra",
  "Eufemia",
  "Stella",
  "Rowan",
  "Vivianne",
  "Kyria",
  "Larissa",
  "Tirza",
  "Xanthe",
  "Billie",
  "Aurelia",
  "Ursula",
  "Vashti",
  "Juniper",
  "Moxie",
  "Halimeda",
  "Stacy",
  "Agatha",
  "Freya",
  "Scarlet",
  "Isobel",
];

// Surnames for Witches (REPLACED)
export const witchSurNames = [
  "Massingberd",
  "Menzies",
  "Pinncock",
  "Diddle",
  "Strangewayes",
  "Finch",
  "Newdegate",
  "Mauntell",
  "Chauncey",
  "Coggshall",
  "Roper",
  "Atherton",
  "Gardner",
  "Oxenbrigg",
  "Norbury",
  "Cockayne",
  "Petham",
  "Brecknock",
  "Bulkeley",
  "Blount",
  "Waldegrave",
  "Higden",
  "Tregonwell",
  "Topsfield",
  "Chilton",
  "Trump",
  "Blackwood",
  "Yornold",
  "Basset",
  "Amondsham",
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
  ["Explorer", "Scholastic"],
  ["Extremist", "Moderate"],
  ["Purist", "Syncretic"],
];

// Default Abilities for Cats
export const defaultCatAbilities = {
  reflex: 40,
  balance: 40,
  speed: 40,
  vision: 40,
  hearing: 40,
  smell: 40,
  taste: 40,
  memory: 40,
  intuition: 40,
  magicinsight: 40,
  patience: 40,
  boldness: 40,
  mischief: 40,
  sneaking: 40,
  hiding: 40,
  strength: 40,
  grip: 40,
  endurance: 40,
  magicresistance: 40,
  luck: 40,
};

// Default Abilities for Witches        NEEDS REWORK
export const defaultWitchAbilities = {
  reflex: 40,
  balance: 40,
  speed: 40,
  vision: 40,
  hearing: 40,
  smell: 40,
  taste: 40,
  memory: 40,
  intuition: 40,
  magicinsight: 40,
  patience: 40,
  boldness: 40,
  mischief: 40,
  sneaking: 40,
  hiding: 40,
  strength: 40,
  grip: 40,
  endurance: 40,
  magicresistance: 40,
  luck: 40,
};
