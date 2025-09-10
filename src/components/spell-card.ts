import { cE, sgeid } from "../utils";

export class SpellCard extends HTMLElement {
    descriptionSlot: HTMLElement;
    variantSlot: HTMLElement;
    cardSlot: HTMLElement;
    applyBtn: HTMLElement;
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        const sr = this.shadowRoot!;

        const template = cE("template") as HTMLTemplateElement;
        template.innerHTML = /*html*/ `
               <style>
                #card{
                  background-color: #6C597D;
                  padding:8px;
                  border-radius:6px;
                  border: solid 8px #4F7F7D;
                  color: white;
                }
              </style>
              <div id="card">
              <h2 id="variant-slot"></h2>
              <p id="description-slot"></p>
              <button id="apply-btn">Apply to Cat</button>
              </div>
            `;

        sr.appendChild(template.content.cloneNode(true));

        this.cardSlot = sgeid(sr, "card");
        this.variantSlot = sgeid(sr, "variant-slot");
        this.descriptionSlot = sgeid(sr, "description-slot");
        this.applyBtn = sgeid(sr, "apply-btn");
    }

    static get observedAttributes() {
        return ["variant", "description"];
    }

    setApplyButton(onClick: () => void) {
        this.applyBtn.onclick = onClick;
    }

    attributeChangedCallback(
        name: string,
        _oldvalue: string,
        newValue: string
    ) {
        switch (name) {
            case "variant":
                this.variantSlot.textContent = newValue;
                break;
            case "description":
                this.descriptionSlot.textContent = newValue;
                break;
        }
    }
}
