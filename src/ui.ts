import type { Entity } from "./Entity";
import type { Happening } from "./Happening";
import {
  gameInitialState,
  type IScreens,
  type TScreens,
} from "./state/game-state";
import { cE, clearChildren } from "./utils";
import type { HappeningCard } from "./components/happening-card";
import { closeDialogElement, dialogElement, gEiD } from "./get-elements";

const gameState = gameInitialState;

const menu = gEiD("menu")!;
closeDialogElement.onclick = () => {
  dialogElement.close();
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
  const comp = cE("creature-card");
  const { name, age, knowns, coreKnowns, knownTraits } = { ...entity };
  coreKnowns.forEach((value) => {
    comp.setAttribute(value, { ...entity }[value] as string);
  });
  comp.setAttribute(
    "description",
    `What you know about ${name}: ${knowns
      .map((k) => ({ ...entity, age: `${age} years` }[k]))
      .join(", ")}, ${knownTraits.join(", ")}`
  );

  comp.setAttribute("image", `./src/img/${isCat ? "cat" : "witch"}.jpg`);

  return comp;
}
/*
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
    ["traits", entity.traits?.join(", ")],
    ["image", `./src/img/${isCat ? "cat" : "witch"}.jpg`],
  ];

  const comp = cE("creature-card");
  attributes.forEach(
    ([tag, attribute]) =>
      attribute && comp.setAttribute(tag as string, attribute as string)
  );

  return comp;
}*/

function createHappeningComponent(happening: Happening) {
  const comp = cE("happening-card") as HappeningCard;
  comp.setAttribute("title", happening.Title);

  comp.setAttribute("content", happening.Contents);

  if (happening.Variant === "request") {
    comp;
    comp.setDivClick(() => dialogElement.showModal());
  }

  return comp;
}

const happeningsOrCreature = (variant: string, item: Entity | Happening) =>
  variant === "happening"
    ? createHappeningComponent(item as Happening)
    : createCreatureComponent(item as Entity);

const screenElement = gEiD("screen")!;

export function updateScreenElement(category: TScreens) {
  const aOe =
    category === "catInventory" || category === "witches"
      ? "creature"
      : "happening";
  const target = gameState[category];
  clearChildren(screenElement);

  if (target.size > 0) {
    target.forEach((entity, _id) => {
      screenElement.appendChild(happeningsOrCreature(aOe, entity));
    });
  }
}
