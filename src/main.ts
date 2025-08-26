import "./style.css";

import { gameInitialState } from "./state/game-state";
import { initDaySystem } from "./systems/day-system";
import { initMenu, updateScreenElement } from "./ui";
import { HappeningCard } from "./components/happening-card";
import { createRandomizedBonding } from "./systems/bonding-system";
import { CreatureCard } from "./components/creature-card";
import { createRandomizedNews } from "./systems/news-system";
import { createRandomizedCat, createRandomizedWitch } from "./Entity";
import { initTimeSystem } from "./systems/time-system";

const gameState = gameInitialState;
function initGameStates() {
  initCustomComponents();
  initMenu();
  generateData();
  updateScreenElement(gameState.currentScreen);
  initDaySystem();
  initTimeSystem();
}

initGameStates();

function initCustomComponents() {
  customElements.define("happening-card", HappeningCard);
  customElements.define("creature-card", CreatureCard);
}

function generateData() {
  for (let i = 0; i < 10; i++) {
    createRandomizedBonding();
    createRandomizedNews();
    createRandomizedCat();
    createRandomizedWitch();
  }
}
