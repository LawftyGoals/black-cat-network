import "./style.css";
import { gameState } from "./utils";
import { initDaySystem } from "./systems/day-system";
import { initMenu, updateScreenElement } from "./ui";
import { HappeningCard } from "./components/happening-card";
import { createBonding } from "./systems/bonding-system";
import { CreatureCard } from "./components/creature-card";
import { createRandomizedNews } from "./systems/news-system";
import { createRandomizedCat, createRandomizedWitch } from "./Entity";
import { initTimeSystem } from "./systems/time-system";
import { NotificationCard } from "./components/notification-card";
import { CatAcquisition } from "./components/cat-acquisition";
import { initAcquisition } from "./systems/acquisition-system";
import { SpellCard } from "./components/spell-card";
import { levels, renownLevelDivision } from "./Values";
import { spellMapping } from "./systems/spell-system";
import { initBank } from "./systems/banking-system";

export function initGameStates() {
    generateData();
    initAcquisition();
    initMenu();
    updateScreenElement();
    initDaySystem();
    initTimeSystem();
    initBank();
}

initCustomComponents();
initGameStates();

function initCustomComponents() {
    customElements.define("happening-card", HappeningCard);
    customElements.define("creature-card", CreatureCard);
    customElements.define("notification-card", NotificationCard);
    customElements.define("cat-acquisition", CatAcquisition);
    customElements.define("spell-card", SpellCard);
}

function forit(cre: () => void, quantity?: number) {
    for (let i = 0; i < (quantity ?? 3); i++) {
        cre();
    }
}

function generateData() {
    levels.forEach((level) => {
        forit(
            () =>
                createRandomizedWitch(
                    undefined,
                    undefined,
                    renownLevelDivision[level].min,
                    renownLevelDivision[level].max
                ),
            30
        );
    });
    forit(createRandomizedCat, 2);
    forit(createBonding, 1);
    forit(createRandomizedNews, 1);
    forit(() => {
        gameState.spells.set("scrying", spellMapping["scrying"]);
        gameState.spells.set("forzachromata", spellMapping["forzachromata"]);
        gameState.spells.set("mutatiousia", spellMapping["mutatioousia"]);
    });
}
