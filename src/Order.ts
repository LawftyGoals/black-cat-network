import { cE, gEiD, clearChildren } from "./utils";
import { gameInitialState } from "./state/game-state";
import type { TenumCatCharacteristics, TenumCatVariants } from "./Cat";
import { characteristicsMapping, clearCatFromInventory, clearCatSelectElement, clearSelectedCat, initializeCatSelector, variantMapping } from "./Cat";

const gameState = gameInitialState;

const clearSelectedOrder = () => gameState.selectedOrder = null;
const setSelectedOrder = (order: Order) => gameState.selectedOrder = order;

export class Order {
    ID: string;
    From: string;
    Description: string;
    Offer: number;
    Variant: TenumCatVariants;
    Requirements: number[];

    constructor(id: string, from: string, text: string, offer: number, variant: TenumCatVariants, requirements: number[]) {
        this.ID = id;
        this.From = from;
        this.Description = text;
        this.Offer = offer
        this.Variant = variant;
        this.Requirements = requirements
    }

}


export const orders = gameState.orders;
const orderElement = gEiD("orders")!;


export function updateOrdersElement() {
    if (orders.size > 0 || gameState.completedOrders.size > 0) {

        clearChildren(orderElement);

        orders.forEach((order, id) => {
            orderElement.appendChild(generateOrderElement(order, id));

        })

    }
}

export function generateOrderElement(order: Order, id: string) {
    const orderDiv = cE("div");
    for (const [key, value] of Object.entries(order)) {

        if (Array.isArray(value)) {
            const DL = cE("dl");
            const DT = cE("dt");
            DT.innerText = "Requirements:";
            DL.appendChild(DT)
            const DD = cE("dd");
            DD.innerHTML = `<strong>${variantMapping[order.Variant]}</strong>`;
            DT.appendChild(DD);

            value.forEach((requirement) => {
                const DD = cE("dd");
                DD.innerText = characteristicsMapping[(requirement as TenumCatCharacteristics)];
                DT.appendChild(DD);
            })
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
            updateOrdersElement();

            clearCatSelectElement();
            clearCatFromInventory(gameState.selectedCat!.ID);

            clearSelectedOrder();
            clearSelectedCat();

            console.log(gameState.catInventory);

            dialog.close();
        }


        const closeButton = gEiD("close-dialog");

        closeButton!.onclick = () => {
            clearSelectedOrder();
            clearSelectedCat();
            dialog.close();
        }
    }

    orderDiv.appendChild(completeButton);

    return orderDiv
}
