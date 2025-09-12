import { getNewKnown, type Entity } from "../Entity";
import { Spell } from "../Spell";
import { textResource } from "../text/textResource";
import { displayModalMessage, updateScreenElement } from "../ui";
import { cE, gameState, getRandomExistingWitch, getRandomInt } from "../utils";
import { chances, type TCatColor, type TTrait } from "../Values";
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

export function createSpellButton(
    target: Entity,
    spelltype: TSpells,
    color?: TCatColor
) {
    const button = cE("button");
    button.textContent = spellMapping[spelltype].label;
    button.onclick = () => {
        spellMapping[spelltype].action({ target, color });
        updateScreenElement();
    };
    return button;
}

export type TSpells = keyof typeof spellMapping;

export const spellMapping = {
    scrying: new Spell({
        name: "scrying",
        variant: "scrying",
        description:
            "If you apply the marking to anything... even a cat, you can then view it and its surroundings through the ether. Simply speaking, you might not learn something interesting. Costs 1 hour.",
        value: 0,
        label: "Scry",
        action: (props: { target: Entity }) => {
            if (changeRemainingTime() > 0) {
                scryingEffect(props.target);
            } else {
                displayModalMessage(textResource.time.noTime);
            }
        },
        target: undefined,
    }),
    forzachromata: new Spell({
        name: "forzachromata",
        variant: "colorize",
        description:
            "By weaving this spell onto any victim... target, you change their base color to whatever you desire.",
        value: 10,
        label: "Colorize",
        action: (props: { target: Entity; color?: TCatColor }) => {
            if (changeRemainingTime() > 0) {
                props.target.color = props.color!;
                createNotification(
                    `${props.target.name} has been colorized`,
                    `${
                        props.target.name
                    } looks bedazzeling with the new ${props.color!} color`,
                    [],
                    props.target,
                    null,
                    null
                );
                updateScreenElement();
            } else {
                displayModalMessage(textResource.time.noTime);
            }
        },
        target: undefined,
    }),
    mutatioousia: new Spell({
        name: "mutatioousia",
        variant: "trait-change",
        description: "",
        value: 100,
        label: "Change trait",
        action: (props: { target: Entity; trait?: TTrait }) => {
            if (props.target.traits.includes(props.trait!)) {
                if (!props.target.knownTraits.includes(props.trait!)) {
                    props.target.knownTraits.push(props.trait!);
                }
                displayModalMessage(
                    `${props.target.name} seems to already behave this way.`
                );
            } else if (props.target.traits.length > 5) {
                displayModalMessage(
                    `${props.target.name}'s little brain couldn't possibly hold any more traits`
                );
            } else if (changeRemainingTime() > 0) {
                props.target.traits.push(props.trait!);
                props.target.knownTraits.push(props.trait!);
                createNotification(
                    `${props.target.name} has had a change in personality`,
                    `${
                        props.target.name
                    } is panicking following the psychological expansion of being ${props.trait!}`,
                    [],
                    props.target,
                    null,
                    null
                );
                updateScreenElement();
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
        if (Math.random() < chances.discoverNewWitch) {
            const witch = getRandomExistingWitch();
            let newKnown;
            if (gameState.knownWitches.has(witch.id)) {
                gameState.knownWitches.set(witch.id, witch);
            } else {
                newKnown = getNewKnown(witch);
            }
            createNotification(
                textResource.catInteraction.learn,
                `You tune in to ${target.name} only to discover that ${
                    target.relationship.name
                } is having a bewitching conversation with ${witch.name}.${
                    newKnown
                        ? `You've learnt something new about ${witch.name}`
                        : ""
                }`,
                [],
                target,
                null,
                null
            );
        } else {
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
        }
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
