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

/*
export function generateScreenElement(order: keyof IScreens, id: string) {
  const orderDiv = cE("div");
  for (const [key, value] of Object.entries(order)) {
    if (Array.isArray(value)) {
      const DL = cE("dl");
      const DT = cE("dt");
      DT.innerText = "Requirements:";
      DL.appendChild(DT);
      const DD = cE("dd");
      DD.innerHTML = `<strong>${variantMapping[order.Variant]}</strong>`;
      DT.appendChild(DD);

      value.forEach((requirement) => {
        const DD = cE("dd");
        DD.innerText =
          characteristicsMapping[requirement as TenumCatCharacteristics];
        DT.appendChild(DD);
      });
      orderDiv.appendChild(DL);
    } else {
      const p = cE("p");
      p.innerText = `${key}: ` + value;
      orderDiv.appendChild(p);
    }
  }

  const completeButton = cE("button");
  completeButton.innerText = "Complete Order";
  completeButton.onclick = () => {
    setSelectedOrder(order);

    const dialog = gEiD("dialog") as HTMLDialogElement;
    dialog?.showModal();

    initializeCatSelector();

    const completeButton = gEiD("complete-order");
    completeButton!.onclick = () => {
      gameState.completedOrders.set(id, order);
      gameState.orders.delete(id);
      gameState.catInventory.delete(gameState.selectedCat!.ID);
      updateOrdersElement();

      changeRemainingTime();
      updateTimeUI();

      clearCatSelectElement();

      clearSelectedOrder();
      clearSelectedCat();

      dialog.close();
    };

    const closeButton = gEiD("close-dialog");

    closeButton!.onclick = () => {
      clearSelectedOrder();
      clearSelectedCat();
      dialog.close();
    };
  };

  orderDiv.appendChild(completeButton);

  return orderDiv;
}
*/

function createCreatureComponent(entity: Entity) {
  const isCat = entity.type === "cat";
  const description = isCat
    ? `Variant: ${entity.variant}, Age: ${entity.age}`
    : `Age: ${entity.age}<br>A ${
        entity.domain
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
  const comp = cE("happening") as HappeningCard;
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
