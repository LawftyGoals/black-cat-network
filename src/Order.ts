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

    constructor(from: string, text: string, offer: number, variant: TenumCatVariants, requirements: number[]) {
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
    if (orders.size > 0) {

        clearChildren(orderElement);

        orders.forEach((order, id) => {
            orderElement.appendChild(generateStreamlinedOrderElement(order, id));

        })

    }
}

export function generateOrderElement(order: Order, id: string) {
    const orderLi = cE("div");
    orderLi.id = "order-" + id;

    const fromElement = cE("p");
    fromElement.id = "order-from-" + id;
    fromElement.innerText = "From: " + order.From;

    orderLi.appendChild(fromElement);

    const descriptionElement = cE("p");
    descriptionElement.id = "order-from-" + id;
    descriptionElement.innerText = "Description: " + order.Description;
    orderLi.appendChild(descriptionElement);

    const offerElement = cE("p");
    offerElement.id = "order-from-" + id;
    offerElement.innerText = "Offering: " + order.Offer.toString() + "gp";
    orderLi.appendChild(offerElement);

    const requirementsDL = cE("dl");
    const requirementsDT = cE("dt");

    requirementsDT.innerText = "Requirements:";
    requirementsDL.appendChild(requirementsDT)

    const variantDD = cE("dd");
    variantDD.innerHTML = `<strong>${variantMapping[order.Variant]}</strong>`;
    requirementsDT.appendChild(variantDD);

    order.Requirements.forEach((requirement) => {
        const requirementDD = cE("dd");
        requirementDD.innerText = characteristicsMapping[(requirement as TenumCatCharacteristics)];
        requirementsDT.appendChild(requirementDD);
    })

    orderLi.appendChild(requirementsDL);

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

    orderLi.appendChild(completeButton);


    return orderLi
}




export function generateStreamlinedOrderElement(order: Order, id: string) {
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
