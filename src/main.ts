import "./style.css";

import { gameInitialState } from "./state/game-state";
import { updateDay } from "./day-system";
import { addTestCat, addTestOrder } from "./test-data";
import { initMenu, updateTimeUI } from "./ui";
import { EventsComponent } from "./Events";

const gameState = gameInitialState;
function initGameStates() {
  initMenu();
  addTestOrder();
  addTestCat();
  initDaySystem();
  updateTimeUI();
  initCustomComponents();
}

initGameStates();

function initDaySystem() {
  const element = document.getElementById("day");
  (element as HTMLElement).innerText = gameState.day.toString();

  const updateDayButton = document.getElementById("advance-day");

  updateDayButton!.onclick = updateDay;
}

function initCustomComponents() {
  customElements.define("events", EventsComponent);
}
