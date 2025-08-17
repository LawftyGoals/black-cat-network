import { cE, gEiD, clearChildren } from "./utils";
import { gameInitialState } from "./state/game-state";
import type { TenumCatVariants } from "./Cat";
import { variantMapping } from "./Cat";

export class Order {
    mFrom: string;
    mDescription: string;
    mOffer: number;
    mVariant: TenumCatVariants;
    mRequirements: string[];

    constructor(from: string, text: string, offer: number, variant: TenumCatVariants, requirements: string[]) {
        this.mFrom = from;
        this.mDescription = text;
        this.mOffer = offer
        this.mVariant = variant;
        this.mRequirements = requirements
    }

    getFrom() {
        return this.mFrom;
    }

    getDescription() {
        return this.mDescription;
    }

    getOffer() {
        return this.mOffer;
    }

    getVariant() {
        return this.mVariant;
    }

    getRequirements() {
        return this.mRequirements;
    }

}


export const orders = gameInitialState.orders;
const orderElement = gEiD("orders")!;


export function updateOrders() {
    if (orders.size > 0) {

        clearChildren(orderElement);

        orders.forEach((order, id) => {
            orderElement.appendChild(generateOrderElement(order, id));

        })

    }
}

export function generateOrderElement(order: Order, id: string) {
    const orderLi = cE("li");
    orderLi.id = "order-" + id;

    const fromElement = cE("p");
    fromElement.id = "order-from-" + id;
    fromElement.innerText = "From: " + order.getFrom();

    orderLi.appendChild(fromElement);

    const descriptionElement = cE("p");
    descriptionElement.id = "order-from-" + id;
    descriptionElement.innerText = "Description: " + order.getDescription();
    orderLi.appendChild(descriptionElement);

    const offerElement = cE("p");
    offerElement.id = "order-from-" + id;
    offerElement.innerText = "Offering: " + order.getOffer().toString() + "gp";
    orderLi.appendChild(offerElement);

    const requirementsDL = cE("dl");
    const requirementsDT = cE("dt");

    requirementsDT.innerText = "Requirements:";
    requirementsDL.appendChild(requirementsDT)

    const variantDD = cE("dd");
    variantDD.innerHTML = `<strong>${variantMapping[order.getVariant()]}</strong>`;
    requirementsDT.appendChild(variantDD);

    order.getRequirements().forEach((requirement) => {
        const requirementDD = cE("dd");
        requirementDD.innerText = requirement;
        requirementsDT.appendChild(requirementDD);
    })

    orderLi.appendChild(requirementsDL);

    const completeButton = cE("button");
    completeButton.innerText = "Complete Order";
    completeButton.onclick = () => {

        const dialog = gEiD("dialog") as HTMLDialogElement;
        dialog?.showModal();
        const closeButton = gEiD("closeDialog");
        closeButton!.onclick = () => dialog.close();
    };

    orderLi.appendChild(completeButton);


    return orderLi
}