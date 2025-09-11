import { getNewKnown, type Entity } from "../Entity";
import { Spell } from "../Spell";
import { textResource } from "../text/textResource";
import { displayModalMessage, updateScreenElement } from "../ui";
import { cE, gameState, getRandomInt } from "../utils";
import { createNotification } from "./notifications-system";
import { changeRemainingTime } from "./time-system";

export function createScryingButton(target: Entity) {
    const button = cE("button");
    button.onclick = () => {
        if (changeRemainingTime() > 0) {
            scryingEffect(target);
        } else {
            displayModalMessage(textResource.time.noTime);
        }
    };
    return button;
}

export function createSpellButton(target: Entity, spelltype: TSpells) {
    const button = cE("button");
    button.textContent = spellMapping[spelltype].label;
    button.onclick = () => {
        spellMapping[spelltype].action(target);
        updateScreenElement();
    };
    return button;
}

export type TSpells = keyof typeof spellMapping;

export const spellMapping = {
    scrying: new Spell({
        variant: "scrying",
        description:
            "If you apply the marking to anything... even a cat, you can then view it and its surroundings through the ether. Simply speaking, you might not learn something interesting. Costs 1 hour.",
        value: 0,
        label: "Scry",
        action: (target: Entity) => {
            if (changeRemainingTime() > 0) {
                scryingEffect(target);
            } else {
                displayModalMessage(textResource.time.noTime);
            }
        },
        target: undefined,
    }),
};

function scryingEffect(target: Entity) {
    const chanceOfEvent = 0.25 < Math.random();
    if (!chanceOfEvent) {
        createNotification(
            textResource.catInteraction.noLearn,
            textResource.spells.scrying.noLearn,
            [],
            target,
            null,
            null
        );
    } else if (target.relationship) {
        const newKnown = getNewKnown(target.relationship);
        newKnown
            ? createNotification(
                  textResource.catInteraction.learn,
                  `You managed to learn that ${target.relationship.name} is ${newKnown}`,
                  [],
                  target,
                  null,
                  null
              )
            : createNotification(
                  textResource.catInteraction.noLearn,
                  textResource.spells.scrying.noLearn,
                  [],
                  target,
                  null,
                  null
              );
    } else {
        const newKnown = getNewKnown(target);
        newKnown
            ? createNotification(
                  textResource.catInteraction.learn,
                  `You managed to learn that ${target.name} is ${newKnown}`,
                  [],
                  target,
                  null,
                  null
              )
            : createNotification(
                  textResource.catInteraction.noLearn,
                  textResource.spells.scrying.noLearn,
                  [],
                  target,
                  null,
                  null
              );
    }
}

export function getNonlearntSpells() {
    const notFoundSpells = Object.keys(spellMapping)
        .filter((spell) => !gameState.spells.has(spell))
        .filter(
            (spell) => spellMapping[spell as TSpells].value <= gameState.renown
        );

    if (notFoundSpells.length < 1) {
        return null;
    }

    return notFoundSpells[getRandomInt(notFoundSpells.length)] as TSpells;
}
