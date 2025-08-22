import { cE, gEiD, clearChildren } from "./utils";
import { gameInitialState } from "./state/game-state";
// import type { TenumCatCharacteristics, TenumCatVariants } from "./Cat";
// import {
//   characteristicsMapping,
//   clearCatSelectElement,
//   clearSelectedCat,
//   initializeCatSelector,
//   variantMapping,
// } from "./Cat";

import { catVariants, catTraits } from "./Values";
import {
  clearCatSelectElement,
  clearSelectedCat,
  initializeCatSelector,
} from "./Entity.ts";

const gameState = gameInitialState;
const clearSelectedOrder = () => (gameState.selectedOrder = null);
const setSelectedOrder = (order: Order) => (gameState.selectedOrder = order);

export class Order {
  id: number;
  From: string;
  Description: string;
  Offer: number;
  Variant: string; // CHANGE THIS
  Requirements: string[];

  constructor(
    id: number,
    from: string,
    text: string,
    offer: number,
    variant: string,
    requirements: string[]
  ) {
    this.id = id;
    this.From = from;
    this.Description = text;
    this.Offer = offer;
    this.Variant = variant;
    this.Requirements = requirements;
  }
}

export const orders = gameState.orders;
const orderElement = gEiD("orders")!;

export function updateOrdersElement() {
  if (orders.size > 0 || gameState.completedOrders.size > 0) {
    clearChildren(orderElement);

    orders.forEach((order, id) => {
      orderElement.appendChild(generateOrderElement(order, id));
    });
  }
}

export function generateOrderElement(order: Order, id: string) {
  const orderDiv = cE("div");

  for (const [key, value] of Object.entries(order)) {
    if (Array.isArray(value)) {
      const DL = cE("dl");
      const DT = cE("dt");
      DT.innerText = "Requirements:";
      DL.appendChild(DT);

      const variantDD = cE("dd");
      variantDD.innerHTML = `<strong>${order.Variant}</strong>`;
      DT.appendChild(variantDD);

      value.forEach((requirement) => {
        const reqDD = cE("dd");
        reqDD.innerText = requirement;
        DT.appendChild(reqDD);
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

    // initializeCatSelector();
    // ^- defunct, so change the initialisation logic

    const completeButton = gEiD("complete-order");
    completeButton!.onclick = () => {
      gameState.completedOrders.set(id, order);
      gameState.orders.delete(id);
      updateOrdersElement();

      //   clearCatSelectElement();
      // ^- defunct

      clearSelectedOrder();
      //   clearSelectedCat();
      // ^- defunct

      dialog.close();
    };

    const closeButton = gEiD("close-dialog");

    closeButton!.onclick = () => {
      clearSelectedOrder();
      //   clearSelectedCat();
      // ^- defunct
      dialog.close();
    };
  };

  orderDiv.appendChild(completeButton);

  return orderDiv;
}

export function createCatOrder(
  id: string,
  from: string,
  text: string,
  offer: number,
  variant: string,
  requirements: string[]
) {
  return new Order(id, from, text, offer, variant, requirements);
}
