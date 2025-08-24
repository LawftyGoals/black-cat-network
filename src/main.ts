import "./style.css";

import { gameInitialState } from "./state/game-state";
import { updateDay } from "./systems/day-system";
import { initMenu, updateScreenElement, updateTimeUI } from "./ui";
import { ActCard } from "./components/act-card";
import { createRandomizedOrder } from "./systems/order-system";
import { CreatureCard } from "./components/creature-card";
import { createRandomizedNews } from "./systems/news-system";
import { createRandomizedCat, createRandomizedWitch } from "./Entity";

const gameState = gameInitialState;
function initGameStates() {
  initCustomComponents();
  initMenu();
  generateData();
  updateScreenElement(gameState.currentScreen);
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
  customElements.define("act-card", ActCard);
  customElements.define("creature-card", CreatureCard);
}

function generateData() {
  for (let i = 0; i < 10; i++) {
    createRandomizedOrder();
    createRandomizedNews();
    createRandomizedCat();
    createRandomizedWitch();
  }
}
