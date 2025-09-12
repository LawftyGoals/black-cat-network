import { gameInitialState } from "../state/game-state";
import { Happening } from "../Happening";
import {
    convertTicksToDaysAndTicks,
    getRandomDecimal,
    getRandomExistingWitchWithoutBonding,
    getRandomInt,
    getRandomizedId,
} from "../utils";
import { updateGp } from "../ui";
import { createNotification } from "./notifications-system";
import { changeRenown, getRenownLevel } from "./renown-system";
import {
    catVariantsByColor,
    chanceToGetSpellFromBonding,
    itemValues,
    renownToGoldModifiers,
    renownToWitchModifiers,
    renownValues,
} from "../Values";
import { getNonlearntSpells, spellMapping } from "./spell-system";

const gameState = gameInitialState;

export function createRandomizedBonding() {
    const id = getRandomizedId();

    const randomWitch = getRandomExistingWitchWithoutBonding();

    randomWitch.inbonding = true;

    const { days, ticks } = convertTicksToDaysAndTicks(getRandomInt(112, 72));

    const witchValues =
        renownToGoldModifiers[getRenownLevel(randomWitch.value)];

    const randomTrait =
        randomWitch.traits[getRandomInt(randomWitch.traits.length)];

    if (!randomWitch.knownTraits.includes(randomTrait)) {
        randomWitch.knownTraits.push(randomTrait);
    }

    const spell =
        Math.random() < chanceToGetSpellFromBonding
            ? getNonlearntSpells()
            : null;
    const goldOffer = spell
        ? null
        : Math.floor(
              itemValues.bonding.value *
                  getRandomDecimal(witchValues.max, witchValues.min)
          );
    const catVariants = catVariantsByColor("black");

    const order = new Happening(
        id,
        false,
        gameState.day + days,
        ticks,
        ["offer"],
        "bonding",
        randomWitch,
        "I would like to acquire a BLACK CAT",
        reasonForPuchase[getRandomInt(reasonForPuchase.length)],
        goldOffer,
        spell,
        gameState.catInventory,
        {
            traits: [randomTrait],
            variant: catVariants[getRandomInt(catVariants.length)],
        },
        1
    );

    gameState.knownWitches.set(randomWitch.id, randomWitch);

    gameState.bondings.set(id, order);
    gameState.happenings.set(id, order);
}

export function updateBondings() {
    gameState.bondings.forEach((bonding) => {
        const active = bonding.ongoing;

        if (!active && bonding.nextEventDay! < gameState.day) {
            gameState.expiredBondings.set(bonding.id, bonding);
            gameState.bondings.delete(bonding.id);
            bonding.agent!.inbonding = false;
        }

        if (active && bonding.nextEventDay === gameState.day) {
            const cat = bonding.cat!;
            const witch = bonding.agent!;

            let missTraits = 0;
            let hitTraits = 0;

            cat.traits.forEach((trait) => {
                console.log({ catTrait: trait, witchTrait: witch.traits });
                if (witch.traits.includes(trait)) {
                    console.log("included");
                    hitTraits++;
                } else missTraits++;
            });

            const offer = bonding.offer ?? 0;

            const offerMultiplyer =
                hitTraits === cat.traits.length
                    ? Math.ceil(
                          offer +
                              (offer * hitTraits) / witch.traits.length +
                              (cat.variant === bonding.bondrequirements?.variant
                                  ? offer * 0.25
                                  : 0)
                      )
                    : offer;

            const spell = bonding.spell;

            if (hitTraits < 1) {
                gameState.catInventory.set(cat.id, cat);
                cat.inbonding = false;
                bonding.agent!.inbonding = false;
                const possibleTraits = witch.traits.filter(
                    (trait) => !witch.knownTraits.includes(trait)
                );
                const possibleTrait =
                    possibleTraits[getRandomInt(possibleTraits.length)];

                if (bonding.triedCount! > 2) {
                    changeRenown(
                        renownValues.bonding.maxFailedRenown,
                        renownToWitchModifiers[
                            getRenownLevel(bonding.agent!.value!)
                        ].min
                    );
                    gameState.completedBondings.set(bonding.id, bonding);
                    gameState.bondings.delete(bonding.id);
                } else {
                    bonding.ongoing = false;
                    bonding.cat = null;
                    bonding.bondrequirements!.traits.push(possibleTrait);
                    bonding.nextEventDay = gameState.day + getRandomInt(5, 7);
                }
                createNotification(
                    "Bonding Failed!",
                    `Unfortuantely ${cat.name} and ${bonding.agent!
                        .name!} did not get along. ${
                        cat.name
                    } returned to you slightly miffed.${
                        possibleTraits.length > 0
                            ? ` It seems${witch.name} would preffer a familiar that is a bit more: ${possibleTrait}`
                            : ""
                    }`,
                    [],
                    cat,
                    0,
                    null
                );
            } else {
                gameState.completedBondings.set(bonding.id, bonding);
                gameState.bondings.delete(bonding.id);
                updateGp(offerMultiplyer);
                cat.inbonding = false;
                bonding.agent!.inbonding = false;
                cat.relationship = bonding.agent;
                bonding.agent!.relationship = cat;
                changeRenown(
                    renownValues.bonding.maxRenown,
                    renownToWitchModifiers[
                        getRenownLevel(bonding.agent!.value!)
                    ].max
                );
                spell && gameState.spells.set(spell, spellMapping[spell]);
                createNotification(
                    "Bonding Succeeded!",
                    `${cat.name} and ${bonding.agent!
                        .name!} bonded successfully. ${
                        cat.name
                    } will now be a beloved familiar.`,
                    [],
                    cat,
                    offer,
                    spell
                );
            }
        }
    });
}

export function acceptbonding(bonding: Happening) {
    bonding.ongoing = true;
    bonding.agent!.inbonding = true;

    const { days, ticks } = convertTicksToDaysAndTicks(getRandomInt(112, 72));

    bonding.nextEventDay! += days;
    bonding.nextEventTick! += ticks;
}

export const reasonForPuchase = [
    "Where can I find it?",
    "I'm looking to buy it.",
    "Do you know where I can get my hands on it?",
    "Is there any way to acquire it?",
    "Could you point me in the direction of where to purchase it?",
    "I'd like to know the best place to find it.",
    "Is this something I can acquire easily?",
    "Can you help me track one down?",
    "I'm trying to locate it for purchase.",
    "What's the best way to get it?",
    "Need a new kitty.",
];
