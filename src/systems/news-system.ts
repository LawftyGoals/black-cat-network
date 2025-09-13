// import { Happening } from "../Happening";
// import { createRandomizedWitch } from "../Entity";
// import { gameInitialState } from "../state/game-state";
// import { gameState, getRandomizedId } from "../utils";
import { Happening } from "../Happening";
import { gameState, getRandomizedId, getRandomExistingWitch } from "../utils";

export function createNewsHap() {
    const id = getRandomizedId();
    const agent = getRandomExistingWitch();
    const newsHap = new Happening(
        id,
        false, // ongoing
        null, // nextEventDay
        null, // nextEventTick
        ["agent", "patient"], // knowns
        "news", // variant
        agent, // agent
        "Cat wanted for adoption!", // title
        `Long-time resident ${agent.name} wishes for a new feline companion.`,
        // "Ordinary life keeps on keeping on in the town...", // content
        null, // request_Variant
        null, // bondrequirements
        null,
        null,
        undefined, // cat
        undefined, // patient?
        ["newsworthy"] // triggerKeyword
    );
    gameState.happenings.set(id, newsHap);
    gameState.news.set(id, newsHap);
}
