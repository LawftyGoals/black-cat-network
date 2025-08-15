import { cE, clearChildren } from "./utils";


export const orders = new Map<string, Order>();
const orderElement = document.getElementById("orders")!;


export function updateOrders() {
    if (orders.size > 0) {

        clearChildren(orderElement);

        orders.forEach((order, id) => {
            orderElement.appendChild(generateOrderElement(order, id));

        })

    }
}


export class Order {
    mFrom: string;
    mDescription: string;
    mOffer: number;
    mRequirements: string[];

    constructor(from: string, text: string, offer: number, requirements: string[]) {
        this.mFrom = from;
        this.mDescription = text;
        this.mOffer = offer
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

    getRequirements() {
        return this.mRequirements;
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

    requirementsDL.appendChild(requirementsDT)
    requirementsDT.innerText = "Requirements:";
    order.getRequirements().forEach((requirement) => {
        const requirementDD = cE("dd");
        requirementDD.innerText = requirement;
        requirementsDT.appendChild(requirementDD);
    })

    orderLi.appendChild(requirementsDL);

    return orderLi
}