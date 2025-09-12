import type { Entity } from "../Entity";
import type { TActionProps } from "../Spell";
import { cE, sgeid } from "../utils";
import type { TCatColors } from "../Values";

export class SpellCard extends HTMLElement {
    descriptionSlot: HTMLElement;
    variantSlot: HTMLElement;
    cardSlot: HTMLElement;
    applyBtn: HTMLElement;
    btnSlot: HTMLElement;
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
              <div id="btn-slot"><button id="apply-btn">Apply to Cat</button></div>
              </div>
            `;

        sr.appendChild(template.content.cloneNode(true));

        this.cardSlot = sgeid(sr, "card");
        this.variantSlot = sgeid(sr, "variant-slot");
        this.descriptionSlot = sgeid(sr, "description-slot");
        this.applyBtn = sgeid(sr, "apply-btn");
        this.btnSlot = sgeid(sr, "btn-slot");
    }

    static get observedAttributes() {
        return ["variant", "description"];
    }

    setApplyButton(onClick: () => void) {
        this.applyBtn.onclick = onClick;
    }

    setColorButtons(
        colors: TCatColors[],
        target: Entity,
        action: (props: TActionProps) => void
    ) {
        colors.forEach((color) => {
            const button = cE("button");
            button.id = color;
            button.onclick = () => action({ target, color });
            this.btnSlot.appendChild(button);
        });
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
