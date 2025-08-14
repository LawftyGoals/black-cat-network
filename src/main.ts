import './style.css'


import { gameInitialState } from './state/game-state'


const cE = (type: keyof HTMLElementTagNameMap) => document.createElement(type);

const gameState = gameInitialState;

const textFields = ["day"];

textFields.forEach((field: string) => {
  const element = document.getElementById(field);
  (element as HTMLElement).innerText = gameState[field as keyof typeof gameState].toString();
})

const updateDayButton = document.getElementById("advanceDay");

updateDayButton!.onclick = updateDay;



export function updateDay() {
  gameState.day += 1;
  const dayElement = document.getElementById("day");
  dayElement && (dayElement.innerText = gameState.day.toString());


}




const orders = new Map<string, Order>();

class Order {
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

orders.set("first", new Order("Gee McWitches", "need a new kitty", 100, ["black"]))


const orderElement = document.getElementById("orders")!;

orders.forEach((order, id) => {

  /*
  for (let field in order) {
    console.log(field);

  }*/

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

  orderElement.appendChild(orderLi);


})
