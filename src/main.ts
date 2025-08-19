import './style.css'

import { gameInitialState } from './state/game-state';
import { updateDay } from './day-system';
import { addTestCat, addTestOrder } from './test-data';

const gameState = gameInitialState;


function initGameStates() {

  addTestOrder();
  addTestCat();
  initDaySystem();

}

initGameStates();


function initDaySystem() {


  const element = document.getElementById("day");
  (element as HTMLElement).innerText = gameState["day"].toString()

  const updateDayButton = document.getElementById("advance-day");

  updateDayButton!.onclick = updateDay;
}