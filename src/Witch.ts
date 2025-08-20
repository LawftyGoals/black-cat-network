// Witch.ts

import {
    variantMapping,
    characteristicsMapping,
  } from './Cat.ts';


interface Witch {
    name: string;
    witch_trait: string;
    coven: string;
    preferences: {
      cat_type: string;
      cat_traits: string[];
    };
  }
  
  const firstnames = [
    "Morgana", "Belladonna", "Hecate", "Circe", "Seraphina",
    "Elspeth", "Gwendolyn", "Rowan", "Sybil", "Ursula",
    "Jennifer", "Shoggoth", "Stella", "Isis", "Qaeda",
    "Minerva", "Gladys", "Hazel", "Helga", "Olga",
    "Fern", "Iris", "Juniper", "Raven", "Cassandra",
    "Thea", "Astrid", "Piper", "Lilith", "Dea",
    "Cleo", "Winnie", "Zelda", "Agatha", "Aurora",
    "Brigitte", "Isobel", "Lydia", "Matilda", "Borghilde"
  ];

  const surnames = [
    "Blackwood", "McSpooky", "Beaumont", "Underwood", "Finch",
    "Thorn", "Lovelace", "Menzies", "Radcliffe", "Hastings",
    "Ellison", "Barnaby", "Winthrop", "Pemberton", "Beauclair",
    "Davenport", "Nightingale", "Sinclair", "Devereaux", "Chilton",
    "Addicock", "Amondsham", "Atherton", "Gavell", "Gardner",
    "Coggshall", "Goldwell", "Goodrick", "Selwyn", "Sibbell",
    "Massingberd", "Mauntell", "Dagworth", "Harleston", "Hancock",
    "Basset", "Ballard", "Harper", "Culpepper", "Garwood",
    "Halebourne", "404 not found", "Higden", "Bexley", "Trump"
  ];

  const covens = [
    "Wiccan", "Necromancer", "Herbalist", "Diviner", "Oracle",
    "Hedge Witch", "Voodoo Priestess", "Medium", "Druid", "Hag",
    "Hellenic", "Seidwoman", "Selkie", "Hekatean", "Satanist",
    "Arcanist", "Summoner", "Crone", "Nahuatl", "Bruja", 
    "Enchantress", "Fungalist", "Racist", "Hex Supremacist", "Nun",
    "Moon Priestess", "Anchoress"
  ];

  const traits = [
    "Wise", "Raunchy", "Moody", "Coquettish", "Holistic",
    "Eccentric", "Weird", "Inscrutable", "Gentle", "Cunning"
  ];

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
    const randomCoven = covens[Math.floor(Math.random() * covens.length)];
    const randomTrait = traits[Math.floor(Math.random() * traits.length)];

    return {
        name: `${randomFirstName} ${randomSurname}`,
        witch_trait: randomTrait,
        coven: randomCoven,
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