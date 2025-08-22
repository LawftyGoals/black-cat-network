import {
  characteristicsMapping,
  clearCatSelectElement,
  clearSelectedCat,
  initializeCatSelector,
  variantMapping,
  type TenumCatCharacteristics,
} from "./Cat";
import { clearSelectedOrder, setSelectedOrder } from "./order-system";
import {
  gameInitialState,
  type IScreens,
  type TScreens,
} from "./state/game-state";
import { changeRemainingTime } from "./time-system";
import { cE, clearChildren, gEiD } from "./utils";

const gameState = gameInitialState;

const menu = gEiD("menu")!;

const menuChildren = menu.children;
const [cats, orders, witches, spells] = menuChildren;

export function initMenu() {
  (Array.from(menuChildren) as HTMLButtonElement[]).forEach((element) => {
    element.onclick = () => {
      gameState.currentScreen = element.id.replace("m-", "") as TScreens;
      updateScreen();
    };
  });
}

const screen = gEiD("screen")!;

export function updateScreen() {
  switch (gameState.currentScreen) {
    case "catInventory":
      console.log(gameState.currentScreen);
      break;
    case "orders":
      gameState.orders.forEach((order, key) => {
        generateOrderElement(order, key);
      });
      break;
    case "witches":
      console.log(gameState.currentScreen);
      break;
    case "spells":
      console.log(gameState.currentScreen);
      break;
  }
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

const screenElement = gEiD("screen")!;

export function updateScreenElement(category: keyof IScreens) {
  const target = gameState[category];
  clearChildren(screenElement);
  if (target.size > 0) {
    target.forEach((entity, id) => {
      screenElement.appendChild(generateOrderElement(entity, id));
    });
  }
}
