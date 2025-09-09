import type { Entity } from "../Entity";

const spellMapping = {
  scrying: (entity: Entity, chance?: number) => {
    const chanceOfEvent = (chance ?? 0.25) < Math.random();
    if (!chanceOfEvent) {
      //do soemthing with scryingOutcomes.noOutcome.textReturn.
    }
  },
};

const scryingOutcomes = {
  noOutcome: {
    textReturn:
      "You gleam a brief view into the magnificent life of a purrcious cat, and while the experience enriches your life, you learn nothing new.",
  },
};
