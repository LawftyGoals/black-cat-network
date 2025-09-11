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

    return new Happening(
        `smalltalk_${agentWitch.id}_${patientWitch.id}`,
        false,
        null,
        null,
        undefined,
        "news",
        agentWitch,
        `Witches make small talk: ${agentWitch.name} and ${patientWitch.name}`,
        `This morning, ${agentWitch.name} complained to ${patientWitch.name}, a ${patientWitch.vocation}, about being a ${agentWitch.vocation}.`,
        null,
        null,
        null,
        null,
        undefined,
        ["daily", "news", "witchInteraction"]
    );
}
