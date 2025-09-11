import { gameInitialState } from "../state/game-state";
import { Happening } from "../Happening";
import {
    convertTicksToDaysAndTicks,
    getRandomDecimal,
    getRandomExistingWitchWithoutBonding,
    getRandomInt,
    getRandomizedId,
} from "../utils";
import { getRandomTraits } from "../Entity";
import { updateGp } from "../ui";
import { createNotification } from "./notifications-system";
import { changeRenown, getRenownLevel } from "./renown-system";
import {
    itemValues,
    renownToGoldModifiers,
    renownToWitchModifiers,
    renownValues,
} from "../Values";

const gameState = gameInitialState;

export function createRandomizedBonding() {
    const id = getRandomizedId();

    const randomWitch = getRandomExistingWitchWithoutBonding();

    randomWitch.inbonding = true;

    const { days, ticks } = convertTicksToDaysAndTicks(getRandomInt(112, 72));

    const witchValues =
        renownToGoldModifiers[getRenownLevel(randomWitch.value)];

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
        Math.floor(
            itemValues.bonding.value *
                getRandomDecimal(witchValues.max, witchValues.min)
        ),
        gameState.catInventory,
        getRandomTraits(getRandomInt(3, 5))
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
            const requirements = bonding.bondrequirements!;

            const reqsFullfilled = requirements?.reduce((accu, curr) => {
                if (cat.traits.includes(curr)) return accu + 1;
                return accu;
            }, 0);

            gameState.completedBondings.set(bonding.id, bonding);
            gameState.bondings.delete(bonding.id);

            const received = Math.ceil(
                bonding.offer! * (reqsFullfilled / requirements.length)
            );
            updateGp(received);

            if (received === 0) {
                gameState.catInventory.set(cat.id, cat);
                cat.inbonding = false;
                bonding.agent!.inbonding = false;
                changeRenown(
                    renownValues.bonding.maxFailedRenown,
                    renownToWitchModifiers[
                        getRenownLevel(bonding.agent!.value!)
                    ].min
                );
                createNotification(
                    "Bonding Failed!",
                    `Unfortuantely ${cat.name} and ${bonding.agent!
                        .name!} did not get along. ${
                        cat.name
                    } returned to you slightly miffed.`,
                    [],
                    cat,
                    received
                );
            } else {
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
                createNotification(
                    "Bonding Succeeded!",
                    `${cat.name} and ${bonding.agent!
                        .name!} bonded successfully. ${
                        cat.name
                    } will now be a beloved familiar.`,
                    [],
                    cat,
                    received
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
