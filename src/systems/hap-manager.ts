// hap-manager.ts
import { Happening } from "../Happening";
import { hapWitchySmalltalk } from "../HapVariants";
import { gameState, getRandomizedId, getRandomExistingWitch } from "../utils";

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
        `Long-time resident ${agent.name} wishes for a new feline companion.`, // content
        null, // offer
        null, // spell
        new Map(), // requestVariant
        { traits: [], variant: "" }, // bondrequirements (matches TRequirements)
        null, // cat
        null, // patient
        [], // triggerKeyword
        undefined, // outcome
        0 // triedCount
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
