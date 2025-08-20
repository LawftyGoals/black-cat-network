import { generateOrderElement } from "./Order";
import { gameInitialState, type TScreens } from "./state/game-state";
import { gEiD } from "./utils";

const gameState = gameInitialState;

const menu = gEiD("menu")!;

const menuChildren = menu.children;
const [cats, orders, witches, spells] = menuChildren;

export function initMenu() {
    (Array.from(menuChildren) as HTMLButtonElement[]).forEach(element => {
        element.onclick = () => {
            gameState.currentScreen = element.id.replace("m-", "") as TScreens;
            updateScreen()
        }
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
