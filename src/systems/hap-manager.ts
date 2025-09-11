// hap-manager.ts
import { createRandomizedWitch } from "../Entity";
import { Happening } from "../Happening";
import { hapWitchySmalltalk } from "../HapVariants";
import { gameState, getRandomizedId, getRandomExistingWitch } from "../utils";

// Function to generate a news Hap
export function createNewsHapOld(): Happening {
    const id = getRandomizedId();
    const newsHap = new Happening(
        id,
        false,
        null,
        null,
        ["agent", "patient", "title", "content"],
        "news",
        createRandomizedWitch(),
        "Normal Life Cont'd!",
        "Ordinary life keeps on keeping on in the town...",
        null,
        null,
        null,
        undefined,
        ["newsworthy"]
    );
    gameState.happenings.set(id, newsHap);
    gameState.news.set(id, newsHap);
    return newsHap;
}

export function createNewsHap(): Happening {
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
        null, // cat
        undefined, // patient?
        ["newsworthy"] // triggerKeyword
    );
    gameState.happenings.set(id, newsHap);
    gameState.news.set(id, newsHap);
    return newsHap;
}

// Function to generate daily happenings (including news)
export function generateDailyHappenings(): Happening[] {
    const happenings: Happening[] = [];
    // Add witchy smalltalk
    happenings.push(hapWitchySmalltalk());
    // Add news
    happenings.push(createNewsHap());
    return happenings;
}
