import type { Entity } from "./Entity";
import type { Happening } from "./Happening";
import {
  gameInitialState,
  type IScreens,
  type TScreens,
} from "./state/game-state";
import { cE, clearChildren, gEiD } from "./utils";
import type { HappeningCard } from "./components/happening-card";

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
      updateScreen();
    };
  });
}

export function updateScreen() {
  updateScreenElement(gameState.currentScreen as keyof IScreens);
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
        entity.vocation
      } known for her ${entity.approach?.join(" & ")} approach to her craft.`;

  const comp = cE("creature-card");
  comp.setAttribute("name", entity.name);
  comp.setAttribute("type", entity.type!);
  comp.setAttribute("description", description);
  entity.traits && comp.setAttribute("traits", entity.traits?.join(", "));
  comp.setAttribute("image", `./src/img/${isCat ? "cat" : "witch"}.jpg`);

  return comp;
}

function createHappeningComponent(happening: Happening) {
  const comp = cE("happening-card") as HappeningCard;
  comp.setAttribute("title", happening.Title);

  comp.setAttribute("content", happening.Contents);

  if (happening.Variant === "request") {
    comp;
    comp.setDivClick(() => dialog.showModal());
  }

  return comp;
}

const happeningsOrCreature = (variant: string, item: Entity | Happening) =>
  variant === "happening"
    ? createHappeningComponent(item as Happening)
    : createCreatureComponent(item as Entity);

const screenElement = gEiD("screen")!;

export function updateScreenElement(category: keyof IScreens) {
  const aOe =
    category === "catInventory" || category === "witches"
      ? "creature"
      : "happening";
  const target = gameState[category];
  clearChildren(screenElement);

  if (target.size > 0) {
    target.forEach((entity, _id) => {
      const comp = happeningsOrCreature(aOe, entity);
      screenElement.appendChild(comp);
    });
  }
}
