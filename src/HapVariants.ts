// HapVariants.ts
import { Happening } from "./Happening";
import { gameInitialState } from "./state/game-state";
import { getRandomExistingWitch } from "./utils.ts";



// Witchy Smalltalk function to test Hap system.

export function testWitchSmalltalk(state: )


// Function to create a "news" Hap for two witches meeting
export function createWitchMeetingHap(state: GameState): Happening {
  const witches = Array.from(state.knownWitches.values());
  if (witches.length < 2) {
    throw new Error("Not enough witches for a meeting.");
  }

  return new Happening({
    id: `news_witch_meeting_${witch1.id}_${witch2.id}`,
    variant: "news",
    title: "Witches Meet on the Street",
    content: `${witch1.name} and ${witch2.name} met on the street and had a nice talk.`,
    triggerKeyword: ["daily", "news"],
    eventResolution: {
      timerType: "sunrise",
      timerCount: 1,
    },
    eventPrerequisites: [],
  });
}
