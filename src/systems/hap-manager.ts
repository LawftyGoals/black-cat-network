// hap-manager.ts
import { createRandomizedWitch } from "../Entity";
import { Happening } from "../Happening";
import { hapWitchySmalltalk } from "../HapVariants";
import { gameState, getRandomizedId } from "../utils";

// Function to generate a news Hap
export function createNewsHap(): Happening {
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

// Function to generate daily happenings (including news)
export function generateDailyHappenings(): Happening[] {
    const happenings: Happening[] = [];
    // Add witchy smalltalk
    happenings.push(hapWitchySmalltalk());
    // Add news
    happenings.push(createNewsHap());
    return happenings;
}
