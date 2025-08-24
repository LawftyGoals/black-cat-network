import type { Entity } from "./Entity";
import type { Act } from "./Act";
import {
  gameInitialState,
  type IScreens,
  type TScreens,
} from "./state/game-state";
import { cE, clearChildren, gEiD } from "./utils";
import type { ActCard } from "./components/act-card";

const gameState = gameInitialState;

const menu = gEiD("menu")!;
const dialog = gEiD("dialog")! as HTMLDialogElement;
const closeButton = gEiD("close-dialog");

closeButton!.onclick = () => {
  dialog.close();
};

const menuChildren = menu.children;
//const [cats, orders, witches, spells, news] = menuChildren;

export function initMenu() {
  (Array.from(menuChildren) as HTMLButtonElement[]).forEach((element) => {
    element.onclick = () => {
      gameState.currentScreen = element.id.replace("m-", "") as TScreens;
      updateScreenElement(gameState.currentScreen as keyof IScreens);
    };
  });
}

const time = gEiD("time")!;

export function updateTimeUI() {
  clearChildren(time);
  for (let i = 0; i < gameState.maxTime; i++) {
    const timePip = cE("div");
    timePip.className = `time ${
      i < gameState.remainingTime ? "remain" : "used"
    }`;
    time?.appendChild(timePip);
  }
}

function createCreatureComponent(entity: Entity) {
  const isCat = entity.type === "cat";
  const description = isCat
    ? `Variant: ${entity.variant}, Age: ${entity.age}`
    : `Age: ${entity.age}<br>A ${
        entity.domain
      } known for her ${entity.approach?.join(" & ")} approach to her craft.`;

  const attributes = [
    ["name", entity.name],
    ["type", entity.type],
    ["description", description],
    ["traits", entity.traits],
    ["image", `./src/img/${isCat ? "cat" : "witch"}.jpg`],
  ];

  const comp = cE("creature-card");
  attributes.forEach(
    ([tag, attribute]) =>
      attribute && comp.setAttribute(tag as string, attribute as string)
  );

  return comp;
}

function createActComponent(act: Act) {
  const comp = cE("act-card") as ActCard;
  comp.setAttribute("title", act.Title);

  comp.setAttribute("content", act.Contents);

  if (act.Variant === "request") {
    comp;
    comp.setDivClick(() => dialog.showModal());
  }

  return comp;
}

const actsOrCreature = (variant: string, item: Entity | Act) =>
  variant === "act"
    ? createActComponent(item as Act)
    : createCreatureComponent(item as Entity);

const screenElement = gEiD("screen")!;

export function updateScreenElement(category: TScreens) {
  const aOe =
    category === "catInventory" || category === "witches" ? "creature" : "act";
  const target = gameState[category];
  clearChildren(screenElement);

  if (target.size > 0) {
    target.forEach((entity, _id) => {
      const comp = actsOrCreature(aOe, entity);
      screenElement.appendChild(comp);
    });
  }
}
