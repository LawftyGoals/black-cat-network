import { enumCatCharacteristics, enumCatVariant } from "./Cat";
import { Order, orders, updateOrdersElement } from "./Order";
import { getRandomInt } from "./utils";

const firstNames = ["Gee", "Bethany", "Anna May", "Jebeziah", "Tania", "Jessey"];
const lastNames = ["McWitch", "Magicka", "Astral", "Aiaiai", "Baloney", "MacGraff"];
const catVariants = Object.values(enumCatVariant);
const catCharacteristics = Object.values(enumCatCharacteristics);

const reasonForPuchase = [
    "Where can I find it?",
    "I'm looking to buy it.",
    "Do you know where I can get my hands on it?",
    "Is there any way to acquire it?",
    "Could you point me in the direction of where to purchase it?",
    "I'd like to know the best place to find it.",
    "Is this something I can acquire easily?",
    "Can you help me track one down?",
    "I'm trying to locate it for purchase.",
    "What's the best way to get it?",
    "Need a new kitty."
];




export function addTestOrder() {

    orders.set(getRandomInt(100000).toString(), new Order(`${firstNames[getRandomInt(firstNames.length)]} ${lastNames[getRandomInt(lastNames.length)]}`, reasonForPuchase[getRandomInt(reasonForPuchase.length)], getRandomInt(10000), catVariants[getRandomInt(catVariants.length)], getRandomizedCatCharacteristics(3)));

    updateOrdersElement();
}



export function getRandomizedCatCharacteristics(characteristicsCount: number = 1) {
    return new Array(characteristicsCount).fill(null).map(() => getRandomInt(catCharacteristics.length));
}
