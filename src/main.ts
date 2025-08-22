import "./style.css";

import { gameInitialState } from "./state/game-state";
import { updateDay } from "./day-system";
import { initMenu, updateTimeUI } from "./ui";
import { EventCard } from "./components/event-card";
import { createRandomizedOrder } from "./order-system";
import { CreatureCard } from "./components/creature-card";

const gameState = gameInitialState;
function initGameStates() {
  initCustomComponents();
  initMenu();
  createRandomizedOrder();
  createRandomizedOrder();

  initDaySystem();
  updateTimeUI();
}

initGameStates();

function initDaySystem() {
  const element = document.getElementById("day");
  (element as HTMLElement).innerText = gameState.day.toString();

  const updateDayButton = document.getElementById("advance-day");

  updateDayButton!.onclick = updateDay;
}

function initCustomComponents() {
  customElements.define("event-card", EventCard);
  customElements.define("creature-card", CreatureCard);
}
