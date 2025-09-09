import { getNewKnown, type Entity } from "../Entity";
import { Spell } from "../Spell";
import { textResource } from "../text/textResource";
import { displayModalMessage } from "../ui";
import { cE } from "../utils";
import { createNotification } from "./notifications-system";
import { changeRemainingTime } from "./time-system";

export function createScryingSpell(target: Entity | null) {
    const spell = new Spell({
        variant: "scrying",
        description:
            "If you apply the marking to anything... even a cat, you can then view it and its surroundings through the ether.",
        target: target,
    });

    return spell;
}

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

function scryingEffect(target: Entity) {
    const chanceOfEvent = 0.25 < Math.random();
    if (!chanceOfEvent) {
        createNotification(
            textResource.catInteraction.noLearn,
            textResource.spells.scrying.noLearn,
            [],
            target,
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
                  null
              )
            : createNotification(
                  textResource.catInteraction.noLearn,
                  textResource.spells.scrying.noLearn,
                  [],
                  target,
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
                  null
              )
            : createNotification(
                  textResource.catInteraction.noLearn,
                  textResource.spells.scrying.noLearn,
                  [],
                  target,
                  null
              );
    }
}
