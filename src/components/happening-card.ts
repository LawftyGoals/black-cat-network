import type { Happening } from "../Happening";
import { type IGameState } from "../state/game-state";
import { cE, sgeid } from "../utils";

export class HappeningCard extends HTMLElement {
  titleElement: HTMLElement;
  contentElement: HTMLElement;
  clickableElement: HTMLElement;
  fromElement: HTMLElement;
  offerElement: HTMLElement;
  clearElement: HTMLElement;
  catElement: HTMLElement;
  bondingElement: HTMLElement;
  sendBondingElement: HTMLElement;
  cardElement: HTMLElement;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const sr = this.shadowRoot!;

    const template = cE("template") as HTMLTemplateElement;
    template.innerHTML = /*html*/ `
       <style>
        h1 {
          color: #1A4D4A;
        }
        p {
          color:#EFEBE0;
          font-size: 1.2rem;
        }
        div{
          background-color: #6C597D;
          padding:8px;
          border-radius:6px;
          border: solid 8px #4F7F7D;
        }
        div:hover{
          background-color: #7C898D;
          padding:8px;
          border-radius:6px;
          border: solid 8px #4F7F7D;

        }
        div.active {
          background-color: #9adae6
        }
      </style>
      <div id="card">
        <h1 id="title-slot"></h1>
        <p>From: <span id="from-slot"></span></p>
        <p id="content-slot"></p>
        <p id="offer-slot"></p>
        <p id="cat-slot"></p>
        <span id="bonding-slot" style="display:none"><button id="clickable">Pick Cat</button><button style="display:none" id="clear-cat">Clear Cat</button><button id="send-bonding-slot" style="display:none">Send for bonding</button></span>
      </div>
    `;

    sr.appendChild(template.content.cloneNode(true));

    this.cardElement = sgeid(sr, "card");
    this.titleElement = sgeid(sr, "title-slot");
    this.contentElement = sgeid(sr, "content-slot");
    this.clickableElement = sgeid(sr, "clickable");
    this.fromElement = sgeid(sr, "from-slot");
    this.offerElement = sgeid(sr, "offer-slot");
    this.catElement = sgeid(sr, "cat-slot");
    this.clearElement = sgeid(sr, "clear-cat");
    this.bondingElement = sgeid(sr, "bonding-slot");
    this.sendBondingElement = sgeid(sr, "send-bonding-slot");
  }

  static get observedAttributes() {
    return [
      "title",
      "variant",
      "content",
      "from",
      "offer",
      "cat",
      "clear",
      "active",
    ];
  }

  setDivClick(onClick: () => any) {
    this.clickableElement.onclick = onClick;
  }

  setClearCat(onClick: () => void) {
    this.clearElement.onclick = onClick;
  }

  setSendBonding(onClick: () => void) {
    this.sendBondingElement.onclick = onClick;
  }

  attributeChangedCallback(name: string, _oldvalue: string, newValue: string) {
    switch (name) {
      case "title":
        this.titleElement.textContent = newValue;
        break;
      case "content":
        this.contentElement.textContent += newValue;
        break;
      case "from":
        this.fromElement.textContent = newValue;
        break;
      case "offer":
        this.offerElement.textContent = `${newValue} gp`;
        break;
      case "cat":
        this.catElement.textContent = `Selected Cat: ${newValue}`;
        this.sendBondingElement.style = "display:block";
        break;
      case "variant":
        newValue === "bonding" && (this.bondingElement.style = "display:block");
        break;
      case "clear":
        this.clearElement.style = `display:${newValue}`;
        break;
      case "active":
        this.cardElement.className = newValue === "true" ? "active" : "";
        break;
    }
  }
}
