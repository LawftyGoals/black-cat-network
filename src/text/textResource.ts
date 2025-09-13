import { itemValues } from "../Values";

export const textResource = {
    purchase: {
        noGp: "Moew No! Not enough shinies...",
        noSpace: "Not enough boxes, for cats to fits intos.",
    },
    traps: {
        empty: `###################
# <Trap is Empty> #
###################`,
        purchaseTrap: `Purchase trap -${itemValues.trap.value} gp`,
    },
    catInteraction: {
        learn: "You learnt something new!",
        noLearn: "You learnt nothing new...",
    },
    spells: {
        scrying: {
            noLearn:
                "You gleam a brief view into the magnificent life of a purrcious cat, but you learn nothing new.",
        },
    },
    time: {
        noTime: "No more zoomies, time for nap.",
    },
};
