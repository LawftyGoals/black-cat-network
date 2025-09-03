import { closeDialogElement, gEiD } from "./get-elements";
import { gameInitialState } from "./state/game-state";

export const gameState = gameInitialState;

export const cE = (
  type: keyof HTMLElementTagNameMap | "happening-card" | "creature-card"
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
  let max = maxReveal ?? list.length;
  const revealed = [];
  if (chanceOfNone && getRandomInt(101) <= chanceOfNone) {
    return [];
  }

  if (max >= list.length) return list;

  for (let i = 0; i < getRandomInt(max) + 1; i++) {
    revealed.push(...list.splice(getRandomInt(list.length), 1));
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
