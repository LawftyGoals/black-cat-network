import './style.css'

import { gameInitialState } from './state/game-state';
import { updateDay } from './day-system';
import { addTestOrder } from './test-data';
import { initializeCatInventory, initializeCatSelector } from './Cat';

const gameState = gameInitialState;


function initGameStates() {

  addTestOrder();
  initializeCatInventory();
  initializeCatSelector();
  initDay();



}


initGameStates();


function initDay() {

  const textFields = ["day"];

  textFields.forEach((field: string) => {
    const element = document.getElementById(field);
    (element as HTMLElement).innerText = gameState[field as keyof typeof gameState].toString();
  })

  const updateDayButton = document.getElementById("advanceDay");

  updateDayButton!.onclick = updateDay;
}