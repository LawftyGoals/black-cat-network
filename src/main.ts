import './style.css'

import './components/game-button';
import './components/cat-card';

import { gameInitialState } from './state/game-state';
import { updateDay } from './day-system';
import { addTestOrder } from './test-data';
import { initializeCatInventory, initializeCatSelector } from './Cat';

const gameState = gameInitialState;


function initGameStates() {

  addTestOrder();
  initializeCatInventory();
  initializeCatSelector();
  initDaySystem();



}

initGameStates();


function initDaySystem() {


  const element = document.getElementById("day");
  (element as HTMLElement).innerText = gameState["day"].toString()

  const updateDayButton = document.getElementById("advance-day");

  updateDayButton!.onclick = updateDay;
}