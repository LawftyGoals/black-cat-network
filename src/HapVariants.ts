// HapVariants.ts
import { Happening } from "./Happening";
import { getRandomExistingWitch } from "./utils.ts";

// Witchy Smalltalk function to test Hap system.
export function hapWitchySmalltalk(): Happening {
  const agentWitch = getRandomExistingWitch(); // Initiated
  const patientWitch = getRandomExistingWitch(); // Initiatee

  if (agentWitch.id === patientWitch.id) {
    return hapWitchySmalltalk();
  }

  return new Happening({
    id: `smalltalk_${agentWitch.id}_${patientWitch.id}`,
    variant: "news",
    title: `Witches make small talk: ${agentWitch.name} and ${patientWitch.name}`,
    content: `This morning, ${agentWitch.name} complained to ${patientWitch.name}, a ${patientWitch.vocation}, about being a ${agentWitch.vocation}.`,
    triggerKeyword: ["daily", "news", "witchInteraction"],
    eventResolution: {
      timerType: "immediate",
      timerCount: 0,
    },
    eventPrerequisites: [],
    agent: agentWitch.name,
  });
}
