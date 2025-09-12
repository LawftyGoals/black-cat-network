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
import { renownLevelDivision } from "./Values";
// import { gameState } from "./utils";
import { spellMapping } from "./systems/spell-system";

export function initGameStates() {
    generateData();
    initCustomComponents();
    initAcquisition();
    initMenu();
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
    customElements.define("spell-card", SpellCard);
}

function forit(cre: () => void, quantity?: number) {
    for (let i = 0; i < (quantity ?? 3); i++) {
        // for (let i = 0; i < 10; i++) {
        cre();
    }
}

function generateData() {
    forit(
        () =>
            createRandomizedWitch(
                Math.random() < 0.5,
                undefined,
                renownLevelDivision["0"].min,
                renownLevelDivision["0"].max
            ),
        30
    );
    forit(
        () =>
            createRandomizedWitch(
                undefined,
                undefined,
                renownLevelDivision["10"].min,
                renownLevelDivision["10"].max
            ),
        20
    );
    forit(
        () =>
            createRandomizedWitch(
                undefined,
                undefined,
                renownLevelDivision["50"].min,
                renownLevelDivision["50"].max
            ),
        20
    );
    forit(
        () =>
            createRandomizedWitch(
                undefined,
                undefined,
                renownLevelDivision["100"].min,
                renownLevelDivision["100"].max
            ),
        10
    );
    forit(
        () =>
            createRandomizedWitch(
                undefined,
                undefined,
                renownLevelDivision["250"].min,
                renownLevelDivision["250"].max
            ),
        10
    );
    forit(
        () =>
            createRandomizedWitch(
                undefined,
                undefined,
                renownLevelDivision["500"].min,
                renownLevelDivision["500"].max
            ),
        10
    );
    forit(createRandomizedCat);
    forit(createBonding);
    forit(createRandomizedNews);
    forit(() => {
        gameState.spells.set("scrying", spellMapping["scrying"]);
        gameState.spells.set("forzachromata", spellMapping["forzachromata"]);
        gameState.spells.set("mutatiousia", spellMapping["mutatioousia"]);
    });
}
