// Values.ts

export const chances = { getSpellFromBonding: 0.01, discoverNewWitch: 0.25 };

export const itemValues = { trap: { value: 100 }, bonding: { value: 500 } };
export const renownValues = {
    bonding: { maxRenown: 100, maxFailedRenown: -100 },
    detectedSpell: { failedRenown: -100 },
};

export const levels = ["0", "10", "50", "100", "250", "500"];

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
    [key: string]: { max: number; min: number };
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
    "Astaroth",
    "Baba",
    "Bannik",
    "Bastet",
    "Belladonna",
    "Beliaal",
    "Bingus",
    "Blackie",
    "Boginka",
    "Brimstone",
    "Cernunnos",
    "Cobweb",
    "Cossack",
    "Circe",
    "Dark One",
    "Domovoi",
    "Draco",
    "Dusk",
    "Djinni",
    "Echo",
    "Eclipse",
    "Fenrir",
    "Freya",
    "Gargoyle",
    "Goblin",
    "Grimoire",
    "Hecate",
    "Hex",
    "Hypnos",
    "Isolde",
    "Jinx",
    "Jormungandr",
    "Jove",
    "Kikimora",
    "Kitsune",
    "Leshy",
    "Lucifer",
    "Luna",
    "Mab",
    "Maw",
    "Mingus",
    "Mittens",
    "Morana",
    "Morpheus",
    "Morgana",
    "Nebula",
    "Nimue",
    "Nyx",
    "Obsidian",
    "Oliver",
    "Omen",
    "Onyx",
    "Orpheus",
    "Pandora",
    "Persephone",
    "Phobos",
    "Pixie",
    "Puck",
    "Pudge",
    "Quicksilver",
    "Raven",
    "Rook",
    "Rusalka",
    "Sable",
    "Salem",
    "Selene",
    "Seth",
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
    "Amity",
    "Aurora",
    "Aurelia",
    "Avery",
    "Belladonna",
    "Billie",
    "Borghilde",
    "Bronwyn",
    "Brione",
    "Calantha",
    "Calliope",
    "Cassandra",
    "Ceres",
    "Clementine",
    "Cleo",
    "Cosette",
    "Constance",
    "Dea",
    "Donna",
    "Elowen",
    "Electra",
    "Elspeth",
    "Etta",
    "Eufemia",
    "Egeria",
    "Fern",
    "Fillippa",
    "Fawn",
    "Fleur",
    "Freya",
    "Francesca",
    "Ginevra",
    "Georgianna",
    "Gladys",
    "Griselda",
    "Gwynne",
    "Gwendolyn",
    "Halimeda",
    "Hazel",
    "Heather",
    "Helga",
    "Hestia",
    "Helenore",
    "Hyacinth",
    "Iris",
    "Isis",
    "Isobel",
    "Jeanne",
    "Jennifer",
    "Juniper",
    "Kyria",
    "Laetitia",
    "Larissa",
    "Lexa",
    "Lissandra",
    "Lilith",
    "Lux",
    "Lyra",
    "Maribel",
    "Minerva",
    "Morticia",
    "Moxie",
    "Nebula",
    "Odette",
    "Olga",
    "Olive",
    "Orelia",
    "Perspicacity",
    "Piper",
    "Prudence",
    "Qaeda",
    "Quintessa",
    "Raven",
    "Rowan",
    "Rue",
    "Salome",
    "Scarlet",
    "Seraphina",
    "Sherah",
    "Shoggoth",
    "Stacy",
    "Stella",
    "Tallulah",
    "Thea",
    "Theofania",
    "Tirza",
    "Ursula",
    "Vandelia",
    "Vashti",
    "Verity",
    "Vesper",
    "Vivianne",
    "Winnie",
    "Wisteria",
    "Xanthe",
    "Xiomara",
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
    "Beaumont",
    "Beauclair",
    "Berdwell",
    "Bexley",
    "Blackwood",
    "Blodwell",
    "Blount",
    "Botteler",
    "Braunstone",
    "Brecknock",
    "Brassie",
    "Brook",
    "Bulkeley",
    "Bulstrode",
    "Burgoyne",
    "Buslingthorpe",
    "Chauncey",
    "Chatwyn",
    "Chilton",
    "Cheddar",
    "Cockayne",
    "Coggshall",
    "Cossington",
    "Culpepper",
    "Dagworth",
    "Damsell",
    "Davenport",
    "Devereaux",
    "Diddle",
    "Dimmock",
    "Dogmersfield",
    "Dusteby",
    "Ellison",
    "Etton",
    "Finch",
    "Flexney",
    "Fortescue",
    "Garwood",
    "Gardner",
    "Gavell",
    "Gaylord",
    "Goldwell",
    "Goodrick",
    "Halebourne",
    "Hancock",
    "Harper",
    "Harleston",
    "Hastings",
    "Higden",
    "Killigrew",
    "Kirkeby",
    "Latham",
    "Leventhorpe",
    "Lestrange",
    "Lodding",
    "Lovelace",
    "Malster",
    "Mapilton",
    "Marcheford",
    "Markeley",
    "Massingberd",
    "Mauntell",
    "McSpooky",
    "Menzies",
    "Motesfont",
    "Mowfurth",
    "Mugg",
    "Neburgh",
    "Newdegate",
    "Nightingale",
    "Norbury",
    "Outlawe",
    "Oxenbrigg",
    "Pemberton",
    "Pelletoot",
    "Penhallick",
    "Petham",
    "Piggott",
    "Pinncock",
    "Polsted",
    "Polton",
    "Pursglove",
    "Radcliffe",
    "Risley",
    "Roper",
    "Saltonstall",
    "Saintjohn",
    "Sackville",
    "Selwyn",
    "Sinclair",
    "Sibbell",
    "Stoddeley",
    "Strangewayes",
    "Strelley",
    "Sweetecok",
    "Tabard",
    "Tedcastle",
    "Thorn",
    "Thornburgh",
    "Thursby",
    "Tiploft",
    "Tibbord",
    "Topsfield",
    "Torrington",
    "Trump",
    "Tregonwell",
    "Twarby",
    "Ufford",
    "Urswick",
    "Underwood",
    "Vintner",
    "Waldegrave",
    "Walrond",
    "Warbulton",
    "Wexcombe",
    "Whitewood",
    "Whitton",
    "Wightman",
    "Winthrop",
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

export const witchSVG = `<svg width="50px" height="50px" viewBox="0 0 64 64" version="1.1" id="svg1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><defs id="defs1" /><g id="layer2"><path style="fill:#000000;stroke-width:0.264583" d="m 27.975404,17.69607 -4.554135,-5.204727 16.915362,-11.3202796 -3.51319,11.1901616 8.587798,4.163781 -9.758863,6.245672 4.293899,4.163781 19.647842,2.992718 -3.750919,5.626027 -7.699478,2.701534 -9.636331,-2.619851 -11.169547,1.218204 -9.511654,3.873893 L 9.2277009,38.233372 5.4649629,33.440367 18.737015,29.66694 Z" id="path1" /><ellipse style="fill:#000000;fill-opacity:0;stroke:#000000;stroke-width:2.973;stroke-dasharray:none;stroke-opacity:1" id="path2" cx="32.334358" cy="39.946278" rx="15.554242" ry="12.626583" /><path style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:2.97299;stroke-dasharray:none;stroke-opacity:1" d="m 19.908079,48.79431 -8.067326,12.100988 45.93171,-4.033663 -10.799807,-10.799807 -7.546853,5.725199 -12.100989,0.13012 z" id="path3" /></g></svg>`;

export const catSVG = `<svg width="50" height="50" viewBox="0 0 13.229167 13.229167" version="1.1" id="svg1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><defs id="defs1" /><g id="layer3"><ellipse style="fill:#000000;stroke-width:3.46405" id="path1" cx="6.7165418" cy="6.762547" rx="5.7044616" ry="4.6463757" /><path style="fill:#000000;stroke-width:2.97299" id="path2" d="m 3.8643123,0.87407064 -3.58828998,2.07170016 0,-4.1434003 z" transform="matrix(1.2307693,0,0,1.2109549,1.0403918,2.0007871)" /><path style="fill:#000000;stroke-width:2.97299" id="path3" d="M 14.445168,-3.0822493 14.309456,4.1726843 8.0943555,0.42768766 Z" transform="matrix(0.6015936,0,0,0.80976924,3.730884,2.3578993)" /><ellipse style="fill:#ffffff;fill-opacity:1;stroke-width:2.19414" id="path4" cx="5.0302038" cy="5.2399859" rx="1.472119" ry="0.73605949" transform="rotate(5)" /><ellipse style="fill:#ffffff;fill-opacity:1;stroke-width:2.19414" id="path4-7" cx="-8.5396643" cy="-6.8836594" rx="1.472119" ry="0.73605949" transform="rotate(172.4)" /><ellipse style="fill:#000000;fill-opacity:1;stroke-width:2.97299" id="path5" cx="4.5083642" cy="5.612453" rx="0.55204457" ry="0.9660781" /><ellipse style="fill:#000000;fill-opacity:1;stroke-width:2.97299" id="path5-7" cx="9.3521757" cy="5.6129494" rx="0.55204457" ry="0.9660781" /><path style="fill:#000000;fill-opacity:1;stroke-width:2.97299" d="m 2.3461896,9.2467471 c 0,0 -0.7003033,0.3421585 -1.0104363,1.2343839 -0.310133,0.892226 -0.1856604,1.801861 -0.1856604,1.801861 0,0 1.439634,0.523797 5.4728956,0.388576 4.0332615,-0.135221 5.1539625,-0.618594 5.1539625,-0.618594 0,0 0.167413,-0.564258 0.08065,-1.368828 -0.08676,-0.8045692 -0.632697,-1.4373989 -0.632697,-1.4373989 z" id="path6" /><path style="fill:#ffffff;fill-opacity:1;stroke-width:2.97299" id="path7" d="M 7.5906136,8.8787176 3.8179848,7.284541 7.0848966,4.8144369 Z" transform="matrix(0.20851111,0.12038394,-0.09843707,0.17049801,6.328186,5.3769613)" /></g></svg>`;
