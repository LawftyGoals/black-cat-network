import "./style.css";

import { gameInitialState } from "./state/game-state";
import { initDaySystem } from "./systems/day-system";
import { initMenu, updateElementWithList } from "./ui";
import { HappeningCard } from "./components/happening-card";
import { createRandomizedBonding } from "./systems/bonding-system";
import { CreatureCard } from "./components/creature-card";
import { createRandomizedNews } from "./systems/news-system";
import { createRandomizedCat, createRandomizedWitch } from "./Entity";
import { initTimeSystem } from "./systems/time-system";
import { coinFlip } from "./utils";
import { screen } from "./get-elements";

//const gameState = gameInitialState;
function initGameStates() {
  initCustomComponents();
  initMenu();
  generateData();
  updateElementWithList(screen);
  initDaySystem();
  initTimeSystem();
}

initGameStates();

function initCustomComponents() {
  customElements.define("happening-card", HappeningCard);
  customElements.define("creature-card", CreatureCard);
}

function forit(cre: () => void) {
  for (let i = 0; i < 10; i++) {
    cre();
  }
}

function generateData() {
  forit(() => createRandomizedWitch(coinFlip()));
  forit(createRandomizedCat);
  forit(createRandomizedBonding);
  forit(createRandomizedNews);
}
