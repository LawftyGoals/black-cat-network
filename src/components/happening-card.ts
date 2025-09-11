import { cE, sgeid } from "../utils";

export class HappeningCard extends HTMLElement {
    titleSlot: HTMLElement;
    contentSlot: HTMLElement;
    clickableSlot: HTMLElement;
    fromSlot: HTMLElement;
    offerSlot: HTMLElement;
    clearSlot: HTMLElement;
    catSlot: HTMLElement;
    bondingSlot: HTMLElement;
    sendBondingSlot: HTMLElement;
    cardSlot: HTMLElement;

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
        <span id="bonding-slot" style="display:none"><button id="clickable">Pick Cat</button>
        <button style="display:none" id="clear-cat">Clear Cat</button>
        <button id="send-bonding-slot" style="display:none">Send for bonding</button></span>
      </div>
    `;

        sr.appendChild(template.content.cloneNode(true));

        this.cardSlot = sgeid(sr, "card");
        this.titleSlot = sgeid(sr, "title-slot");
        this.contentSlot = sgeid(sr, "content-slot");
        this.clickableSlot = sgeid(sr, "clickable");
        this.fromSlot = sgeid(sr, "from-slot");
        this.offerSlot = sgeid(sr, "offer-slot");
        this.catSlot = sgeid(sr, "cat-slot");
        this.clearSlot = sgeid(sr, "clear-cat");
        this.bondingSlot = sgeid(sr, "bonding-slot");
        this.sendBondingSlot = sgeid(sr, "send-bonding-slot");
    }

    static get observedAttributes() {
        return [
            "title",
            "variant",
            "content",
            "agent",
            "offer",
            "cat",
            "clear",
            "active",
            "spell",
        ];
    }

    setDivClick(onClick: () => any) {
        this.clickableSlot.onclick = onClick;
    }

    setClearCat(onClick: () => void) {
        this.clearSlot.onclick = onClick;
    }

    setSendBonding(onClick: () => void) {
        this.sendBondingSlot.onclick = onClick;
    }

    attributeChangedCallback(
        name: string,
        _oldvalue: string,
        newValue: string
    ) {
        switch (name) {
            case "title":
                this.titleSlot.textContent = newValue;
                break;
            case "content":
                this.contentSlot.textContent += newValue;
                break;
            case "agent":
                this.fromSlot.textContent = newValue;
                break;
            case "offer":
                this.offerSlot.textContent = `${newValue} gp`;
                break;
            case "cat":
                this.catSlot.textContent = `Selected Cat: ${newValue}`;
                this.sendBondingSlot.style = "display:block";
                break;
            case "variant":
                newValue === "bonding" &&
                    (this.bondingSlot.style = "display:block");
                break;
            case "clear":
                this.clearSlot.style = `display:${newValue}`;
                break;
            case "active":
                this.cardSlot.className += newValue === "true" ? "active" : "";
                break;
            case "spell": {
                this.offerSlot.textContent = `A certain spell called "${newValue}"`;
            }
        }
    }
}
