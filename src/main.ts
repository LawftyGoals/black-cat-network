import './style.css'

import { gameInitialState } from './state/game-state';
import { Order, orders, updateOrders } from "./Order";
import { enumCatVariant } from "./Cat";

const gameState = gameInitialState;


function initGameStates() {

  orders.set("first", new Order("Gee McWitches", "need a new kitty", 100, enumCatVariant.BLACK, ["charming"]))
  updateOrders();

  const textFields = ["day"];

  textFields.forEach((field: string) => {
    const element = document.getElementById(field);
    (element as HTMLElement).innerText = gameState[field as keyof typeof gameState].toString();
  })

  const updateDayButton = document.getElementById("advanceDay");

  updateDayButton!.onclick = updateDay;
}




export function updateDay() {
  gameState.day += 1;
  const dayElement = document.getElementById("day");
  dayElement && (dayElement.innerText = gameState.day.toString());

  orders.set(Math.floor(Math.random() * 100).toString(), new Order("Jessy MacGraph", "Help me get a void", 200, enumCatVariant.BLACK, ["pissy"]));

  updateOrders();

}


initGameStates();
