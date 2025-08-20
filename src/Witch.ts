// Witch.ts

import {
    variantMapping,
    characteristicsMapping,
  } from './Cat.ts';


interface Witch {
    name: string;
    witch_trait: string;
    domain: string;
    approach: string[];
    preferences: {
      cat_type: string;
      cat_traits: string[];
    };
  }
  
  const firstnames = [
    "Adeline", "Aelin", "Agatha", "Allegra", "Alondra",
    "Amity", "Aurora", "Aurelia", "Avery", "Belladonna",
    "Billie", "Borghilde", "Bronwyn", "Brione", "Calantha",
    "Calliope", "Cassandra", "Ceres", "Clementine", "Cleo",
    "Cosette", "Constance", "Dea", "Donna", "Elowen",
    "Electra", "Elspeth", "Etta", "Eufemia", "Egeria",
    "Fern", "Fillippa", "Fawn", "Fleur", "Freya",
    "Francesca", "Ginevra", "Georgianna", "Gladys", "Griselda",
    "Gwynne", "Gwendolyn", "Halimeda", "Hazel", "Heather",
    "Helga", "Hestia", "Helenore", "Hyacinth", "Iris",
    "Isis", "Isobel", "Jeanne", "Jennifer", "Juniper",
    "Kyria", "Laetitia", "Larissa", "Lexa", "Lissandra",
    "Lilith", "Lux", "Lyra", "Maribel", "Minerva",
    "Morticia", "Moxie", "Nebula", "Odette", "Olga",
    "Odette", "Olive", "Orelia", "Perspicacity", "Piper",
    "Prudence", "Qaeda", "Quintessa", "Raven", "Rowan",
    "Rue", "Salome", "Scarlet", "Seraphina", "Sherah",
    "Shoggoth", "Stacy", "Stella", "Tallulah", "Thea",
    "Theofania", "Tirza", "Ursula", "Vandelia", "Vashti",
    "Verity", "Vesper", "Vivianne", "Winnie", "Wisteria",
    "Xanthe", "Xiomara", "Zelia", "Zephyra", "Zelda"
  ];
  

  const surnames = [
    "Addicock", "Amondsham", "Atherton", "Barrentine",
    "Basset", "Ballard", "Barnaby", "Beauchamp", "Beaumont",
    "Beauclair", "Berdwell", "Bexley", "Blackwood", "Blodwell",
    "Blount", "Botteler", "Braunstone", "Brecknock", "Brassie",
    "Brook", "Bulkeley", "Bulstrode", "Burgoyne", "Buslingthorpe",
    "Chauncey", "Chatwyn", "Chilton", "Cheddar", "Cockayne",
    "Coggshall", "Cossington", "Culpepper", "Dagworth", "Damsell",
    "Davenport", "Devereaux", "Diddle", "Dimmock", "Dogmersfield",
    "Dusteby", "Ellison", "Etton", "Finch", "Flexney",
    "Fortescue", "Garwood", "Gardner", "Gavell", "Gaylord",
    "Goldwell", "Goodrick", "Halebourne", "Hancock", "Harper",
    "Harleston", "Hastings", "Higden", "Killigrew", "Kirkeby",
    "Latham", "Leventhorpe", "Lestrange", "Lodding", "Lovelace",
    "Malster", "Mapilton", "Marcheford", "Markeley", "Massingberd",
    "Mauntell", "McSpooky", "Menzies", "Motesfont", "Mowfurth",
    "Mugg", "Neburgh", "Newdegate", "Nightingale", "Norbury",
    "Outlawe", "Oxenbrigg", "Pemberton", "Pelletoot", "Penhallick",
    "Petham", "Piggott", "Pinncock", "Polsted", "Polton",
    "Pursglove", "Radcliffe", "Risley", "Roper", "Saltonstall",
    "Saintjohn", "Sackville", "Selwyn", "Sinclair", "Sibbell",
    "Stoddeley", "Strangewayes", "Strelley", "Sweetecok", "Tabard",
    "Tedcastle", "Thorn", "Thornburgh", "Thursby", "Tiploft",
    "Tibbord", "Topsfield", "Torrington", "Trump", "Tregonwell",
    "Twarby", "Ufford", "Urswick", "Underwood", "Vintner",
    "Waldegrave", "Walrond", "Warbulton", "Wexcombe", "Whitewood",
    "Whitton", "Wightman", "Winthrop", "Wistringt", "Worsley",
    "Wreke", "Yornold"
  ];
  

  const domains = [
    "Adoratrice", "Anchoress", "Arcanist", "Bruja", "Chthonian",
    "Crone", "Diviner", "Druid", "Enchantress", "Fungalist",
    "Gnostic", "Hag", "Hedge Witch", "Hekatean", "Hellenic",
    "Herbalist", "Medium", "Moon Priestess", "Nahuatl", "Necromancer",
    "Harpy", "Oracle", "Satanist", "Seidwoman", "Sethian",
    "Summoner", "Supremacist", "Tantrik", "Voodoo Priestess", "Wiccan",
    "Mutilant", "Galvanist", "Seancer", "Maledictrice", "Goetic",
    "Strega", 
  ];

  const approaches = [
    ["Orthodox", "Liberal"], ["Syncretic", "Segregationist"], ["Rational", "Empirical"],
    ["Moderate", "Extremist"], ["Inclusionary", "Exclusionary"], ["Realist", "Idealist"],
    ["Determinist", "Volitionist"], ["Ambitious", "Content"], ["Dogmatic", "Iconoclastic"],
    ["Scholastic", "Experiential"], ["Theoretical", "Applied"], ["Legalist", "Mystic"],
    ["Ascetic", "Indulgent"], ["Prudish", "Wanton"], ["Hedonist", "Fuddy-Duddy"]
  ];

  const traits = [
    "Arcane", "Austere", "Baleful", "Capricious", "Coquettish",
    "Cunning", "Dour", "Eccentric", "Eldritch", "Enigmatic",
    "Fey", "Gentle", "Gloomy", "Haughty", "Holistic",
    "Inscrutable", "Lugubrious", "Maudlin", "Moody", "Mordant",
    "Oracular", "Pernicious", "Petulant", "Quixotic", "Raunchy",
    "Sardonic", "Solitary", "Venerable", "Vivacious", "Wistful",
    "Wise", "Wonky", "Wraithlike", "Zealous", "Zany"
  ];

  function getRandomApproaches(): [string, string] {
    const idx1 = Math.floor(Math.random() * approaches.length);
    let idx2 = Math.floor(Math.random() * approaches.length);
    while (idx2 === idx1) {
        idx2 = Math.floor(Math.random() * approaches.length);
    }
    // If we have a lot of binary choices, we should just make a cointoss function.
    // Wait how is there not a fucking random.sample() function in JS?
    const approach1 = approaches[idx1][Math.floor(Math.random() * approaches[idx1].length)]
    const approach2 = approaches[idx2][Math.floor(Math.random() * approaches[idx2].length)]
    return [approach1, approach2]
  }

  function getRandomCatType(): string {
    const keys = Object.keys(variantMapping);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return variantMapping[randomKey];
  }
  
  function getRandomCatTrait(): string {
    const keys = Object.keys(characteristicsMapping);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return characteristicsMapping[randomKey];
  }

function generateRandomWitch(): Witch {
    const randomFirstName = firstnames[Math.floor(Math.random() * firstnames.length)];
    const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    const [approach1, approach2] = getRandomApproaches();
    const randomTrait = traits[Math.floor(Math.random() * traits.length)];

    return {
        name: `${randomFirstName} ${randomSurname}`,
        witch_trait: randomTrait,
        domain: randomDomain,
        approach: [approach1, approach2],
        preferences: {
            cat_type: getRandomCatType(),
            cat_traits: [
                getRandomCatTrait(),
                getRandomCatTrait()
            ]
        }
    }
}
export { generateRandomWitch };