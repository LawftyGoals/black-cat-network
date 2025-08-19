import { enumCatVariant } from "./Cat";
import { Order, orders, updateOrdersElement } from "./Order";
import { gameInitialState } from "./state/game-state";

const gameState = gameInitialState;

export function updateDay() {
    gameState.day += 1;
    const dayElement = document.getElementById("day");
    dayElement && (dayElement.innerText = gameState.day.toString());

    /* TEMPORARY TEST STATE */
    orders.set(Math.floor(Math.random() * 100).toString(), new Order("Jessy MacGraph", "Help me get a void", 200, enumCatVariant.BLACK, [1]));

    updateOrdersElement();

    // Hide order cat-card
    const orderCatCard = document.getElementById('order-cat-card');
  if (orderCatCard) {
    orderCatCard.style.display = 'none';
  }
}