import './style.css'

import { gameInitialState } from './state/game-state';
import { Order, orders, updateOrders } from "./Order";
import { Cat, enumCatVariant, variantMapping } from "./Cat";
import { cE } from './utils';


const gameState = gameInitialState;
const catInventory = gameState.catInventory;

catInventory.push(new Cat("Bingus", enumCatVariant.NAKED), new Cat("Terror of the void", enumCatVariant.BLACK));

const catSelect = document.getElementById("cat-select")
catInventory.forEach(cat => {
  const catOption = cE("option");
  catOption.innerText = `${cat.mName} - ${variantMapping[cat.mType]}`;
  catSelect?.appendChild(catOption);
})



const textFields = ["day"];

textFields.forEach((field: string) => {
  const element = document.getElementById(field);
  (element as HTMLElement).innerText = gameState[field as keyof typeof gameState].toString();
})

const updateDayButton = document.getElementById("advanceDay");

updateDayButton!.onclick = updateDay;



export function updateDay() {
  gameState.day += 1;
  const dayElement = document.getElementById("day");
  dayElement && (dayElement.innerText = gameState.day.toString());

  orders.set(Math.floor(Math.random() * 100).toString(), new Order("Jessy MacGraph", "Help me get a void", 200, enumCatVariant.BLACK, ["pissy"]));

  updateOrders();

}


orders.set("first", new Order("Gee McWitches", "need a new kitty", 100, enumCatVariant.BLACK, ["charming"]))
