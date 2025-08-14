import './style.css'


import { gameInitialState } from './state/game-state'

const gameState = gameInitialState;

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


}





