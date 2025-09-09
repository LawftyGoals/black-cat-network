import "./style.css";

import { initDaySystem } from "./systems/day-system";
import { initMenu, updateScreenElement } from "./ui";
import { HappeningCard } from "./components/happening-card";
import { createRandomizedBonding } from "./systems/bonding-system";
import { CreatureCard } from "./components/creature-card";
import { createRandomizedNews } from "./systems/news-system";
import { createRandomizedCat, createRandomizedWitch } from "./Entity";
import { initTimeSystem } from "./systems/time-system";
import { NotificationCard } from "./components/notification-card";
import { CatAcquisition } from "./components/cat-acquisition";
import { initAcquisition } from "./systems/acquisition-system";

function initGameStates() {
  initCustomComponents();
  initAcquisition();
  initMenu();
  generateData();
  updateScreenElement();
  initDaySystem();
  initTimeSystem();
}

initGameStates();

function initCustomComponents() {
  customElements.define("happening-card", HappeningCard);
  customElements.define("creature-card", CreatureCard);
  customElements.define("notification-card", NotificationCard);
  customElements.define("cat-acquisition", CatAcquisition);
}

function forit(cre: () => void, quantity?: number) {
  for (let i = 0; i < (quantity ?? 3); i++) {
    // for (let i = 0; i < 10; i++) {
    cre();
  }
}

function generateData() {
  forit(() => createRandomizedWitch(), 100);
  forit(createRandomizedCat);
  forit(createRandomizedBonding);
  forit(createRandomizedNews);
}
