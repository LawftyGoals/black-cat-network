import { closeDialogElement, gEiD } from "./get-elements";
import {
    gameInitialState,
    type IGameState,
    type IAcquisition,
    type IScreens,
} from "./state/game-state";
import { Entity } from "./Entity.js";

export const gameState = gameInitialState;

export const cE = (
    type:
        | keyof HTMLElementTagNameMap
        | "happening-card"
        | "creature-card"
        | "notification-card"
        | "cat-acquisition"
        | "spell-card"
) => document.createElement(type);

export function sgeid(sr: ShadowRoot, name: string) {
    return sr.getElementById(name)!;
}

export function clearChildren(element: HTMLElement) {
    while (element.firstChild) {
        element.lastChild && element.removeChild(element.lastChild);
    }
}

export function appendChildren(element: HTMLElement, children: HTMLElement[]) {
    children.forEach((child) => element.appendChild(child));
}

export function replaceChildren(element: HTMLElement, children: HTMLElement[]) {
    clearChildren(element);
    children.forEach((child) => element.appendChild(child));
}

export function setupDialog() {
    const dialog = gEiD("dialog") as HTMLDialogElement;
    dialog?.showModal();
    closeDialogElement.onclick = () => dialog.close();
}

export const getRandomInt = (max: number, min: number = 0) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

export const getRandomizedId = () =>
    (getRandomInt(100000) * performance.now()).toString();

export function getArrayOfItemsFromMap<T, V>(map: Map<T, V>) {
    return Array.from(map, ([_id, entOrHap]) => entOrHap);
}

export function getRandomAmountOrNone<T>(
    list: T[],
    maxReveal?: number,
    chanceOfNone?: number
) {
    const workingList = [...list];
    let max = maxReveal ?? list.length;
    const revealed = [];
    if (chanceOfNone && getRandomInt(101) <= chanceOfNone) {
        return [];
    }

    if (max >= workingList.length) return list;

    for (let i = 0; i < getRandomInt(max) + 1; i++) {
        revealed.push(
            ...workingList.splice(getRandomInt(workingList.length), 1)
        );
    }
    return revealed;
}

export function coinFlip() {
    return Math.random() > 0.5;
}

export function clearSelecteds() {
    gameState.selectedBonding = null;
    gameState.selectedCat = null;
}

export function getWitches() {
    return gameState.witches;
}

export function getKnownWitches() {
    return gameState.knownWitches;
}

export function getRandomExistingWitch() {
    const w = gameState.witches;
    return Array.from(w.values())[getRandomInt(w.size)];
}

export function updateKnownWitchInfo(
    gameState: IGameState,
    witchInfo: Entity
): void {
    const knownWitches = gameState.knownWitches;
    const witchId = witchInfo.id;

    let existingWitch = knownWitches.get(witchId);

    const witchAttributes: (keyof Entity)[] = [
        "name",
        "age",
        "vocation",
        "approach",
        "traits",
    ];

    // If witch IS known, add newly learned attributes to her knowns.
    if (existingWitch) {
        // 1) If a known witch, update her witch knowns[] with whichever witchy nouns.
        if (!existingWitch.knowns) {
            existingWitch.knowns = [];
        }

        // 2) For each attribute in witchInfo, add to knowns[] IF not there already.
        witchAttributes.forEach((attr) => {
            if (
                witchInfo[attr] !== undefined &&
                !existingWitch.knowns!.includes(attr)
            ) {
                existingWitch.knowns!.push(attr);
            }
        });
    } else {
        // If witch not known, now she is, so add to known witch Map.
        const newWitch: Entity = {
            ...witchInfo,
            knowns: [],
        };

        // Update previously unknown witch's knowns[] with attributes in witchInfo.
        witchAttributes.forEach((attr) => {
            if (witchInfo[attr] !== undefined) {
                newWitch.knowns!.push(attr);
            }
        });

        // Add newly known previously unknown witch to knownWitches Map
        knownWitches.set(witchId, newWitch);
    }
}

export function getRandomExistingWitchWithoutBonding() {
    const w = gameState.witches;
    return Array.from(w.values()).filter(
        (witch) => !witch.inbonding && !witch.relationship
    )[getRandomInt(w.size)];
}

export function getCurrentDayAndTime() {
    const { day, remainingTime } = gameState;
    return { day: day, time: remainingTime };
}

export function convertTicksToDaysAndTicks(ticks: number) {
    return {
        days: Math.floor(ticks / 16),
        ticks: ticks % 16,
    };
}

export function arrayFromMap<T>(mapName: keyof IScreens | keyof IAcquisition) {
    return Array.from((gameState[mapName] as Map<string, T>).values());
}
