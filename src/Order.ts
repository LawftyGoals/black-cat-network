import { cE, gEiD, clearChildren } from "./utils";
import { gameInitialState } from "./state/game-state";
import type { TenumCatCharacteristics, TenumCatVariants } from "./Cat";
import { characteristicsMapping, clearSelectedCat, variantMapping } from "./Cat";

const gameState = gameInitialState;

const clearSelectedOrder = () => gameState.selectedOrder = null;
const setSelectedOrder = (order: Order) => gameState.selectedOrder = order;

export class Order {
    From: string;
    Description: string;
    Offer: number;
    Variant: TenumCatVariants;
    Requirements: number[];

    constructor(from: string, text: string, offer: string, variant: TenumCatVariants, requirements: number[]) {
        this.From = from;
        this.Description = text;
        this.Offer = "All the bitches you could dream of!!"
        this.Variant = variant;
        this.Requirements = requirements
    }

}

export const orders = gameState.orders;
const orderElement = gEiD("orders")!;


export function updateOrdersElement() {
    console.log("Updating orders..."); // Log when the function runs

    if (orders.size > 0) {
        clearChildren(orderElement);

        orders.forEach((order) => {
            orderElement.appendChild(generateOrderElement(order));

        });
    }
}
        // Update the cat-card after rendering orders
        // const firstOrder = orders.values().next().value; // Get the first order
        // const orderCatCard = document.getElementById('order-cat-card');
        // console.log("Cat-card element:", orderCatCard); // Log the element

        // if (orderCatCard) {
        // orderCatCard.setAttribute('type', variantMapping[firstOrder.Variant]);
        // orderCatCard.setAttribute('description', firstOrder.Description);
        // orderCatCard.setAttribute('traits', firstOrder.Requirements.map(req => characteristicsMapping[req]).join(', '));
        // orderCatCard.style.display = 'block';
        // console.log("Cat-card found! Updating attributes..."); // Log if the element exists
        // } else {
        // console.warn("Cat-card element not found!");
        // }



export function generateOrderElement(order: Order) {
    const orderDiv = cE("div");

    for (const [key, value] of Object.entries(order)) {

        if (Array.isArray(value)) {
            const DL = cE("dl");
            const DT = cE("dt");
            DT.innerText = "Requirements:";
            // DL.appendChild(DT)
            
            // Cat-card
            const catCard = document.createElement('cat-card');
            catCard.setAttribute('type', variantMapping[order.Variant]);
            catCard.setAttribute('description', order.Description);
            catCard.setAttribute('traits', order.Requirements.map(req => characteristicsMapping[req]).join(', '));
            DL.appendChild(catCard);

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


        const closeButton = gEiD("close-dialog");

        closeButton!.onclick = () => {
            clearSelectedOrder();
            clearSelectedCat();
            dialog.close();

        };
    };

    orderDiv.appendChild(completeButton);

    return orderDiv
}
