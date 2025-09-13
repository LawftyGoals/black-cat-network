import type { Entity } from "../Entity";
import { cE, replaceChildren, sgeid } from "../utils";

export class CreatureCard extends HTMLElement {
    titleSlot: HTMLElement;
    pictureSlot: HTMLElement;
    descriptionSlot: HTMLElement;
    cardSlot: any;
    bondingSlot: HTMLElement;
    catSlot: HTMLElement;
    interactButton: HTMLElement;
    releaseButton: HTMLElement;
    relationshipSlot: HTMLElement;
    spellListSlot: HTMLElement;
    spellSlot: HTMLElement;
    activateSpellsSlot: HTMLElement;
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        const sr = this.shadowRoot!;
        const template = cE("template") as HTMLTemplateElement;
        template.innerHTML = /*html*/ `<style>#card{background-color:#1a122f;border:1px solid #4a3b6b;border-radius:8px;padding:16px;color:#e0d8f1;font-family:'Times New Roman',serif;margin:8px;display:flex;flex-direction:column;}#card:hover{background-color:#2a223f}h3 {margin-top:0;color:#b8a9d9;}p{margin:8px 0;}#traits{font-style:italic;color:#c8b9e8;}#pps {width:50px;height:50px;border-radius:4px;background-color:#EEE;border:2px solid #333;box-shadow:0 2px 4px rgba(0, 0, 0, 0.3);background-size:cover;background-position:center;display:inline-block;}#content{display:flex;gap:8px;}#content-text{display:block;}</style><div id="card"><h3 id="title"></h3><div id="content"><div id="pps"></div><div id="content-text"><p id="spell" style="display:none;">Active spells: <span id="s-l"></span></p><p id="description"></p></div></div><div id="relationship" style="display:none;"></div><div id="bonding" style="display:none;"><button>Test</button></div><div id="cat" style="display:none"><button id="interact">Interact With Cat</button><button id="release" style="display:none;">Release</button></div><div id="a-s"></div></div>`;

        sr.appendChild(template.content.cloneNode(true));

        this.cardSlot = sgeid(sr, "card");
        this.titleSlot = sgeid(sr, "title");
        this.pictureSlot = sgeid(sr, "pps");
        this.descriptionSlot = sgeid(sr, "description");
        this.bondingSlot = sgeid(sr, "bonding");
        this.catSlot = sgeid(sr, "cat");
        this.interactButton = sgeid(sr, "interact");
        this.releaseButton = sgeid(sr, "release");
        this.relationshipSlot = sgeid(sr, "relationship");
        this.spellSlot = sgeid(sr, "spell");
        this.spellListSlot = sgeid(sr, "s-l");
        this.activateSpellsSlot = sgeid(sr, "a-s");
    }

    setDivClick(onClick?: () => void) {
        this.cardSlot.onclick = onClick;
    }

    setInteractClick(onClick: null | (() => void) = null, label?: string) {
        label && (this.interactButton.textContent = label);
        this.interactButton.onclick = onClick;
    }

    setReleaseButton(onClick: null | (() => void)) {
        onClick && (this.releaseButton.style.display = "block");
        this.releaseButton.onclick = onClick;
    }

    setRelationship(entity: Entity) {
        this.relationshipSlot.style = "display:block;";
        this.relationshipSlot.textContent = `${
            entity.type === "cat" ? "Familiar of" : "Companion of"
        } ${entity.relationship!.name}`;
    }

    setActivateSpells(spells: HTMLElement[]) {
        replaceChildren(this.activateSpellsSlot, spells);
    }

    static get observedAttributes() {
        return [
            "name",
            "variant",
            "description",
            "image",
            "inbonding",
            "showcatslot",
            "effectingspells",
        ];
    }

    attributeChangedCallback(
        name: string,
        _oldValue: string,
        newValue: string
    ) {
        switch (name) {
            case "name":
                this.titleSlot.textContent = newValue;
                break;
            case "variant":
                this.titleSlot.textContent = `${this.titleSlot.textContent} (${newValue})`;
                break;
            case "image":
                this.pictureSlot.innerHTML = newValue;
                break;
            case "description":
                this.descriptionSlot.textContent = newValue;
                break;
            case "inbonding":
                if (newValue === "true") {
                    this.titleSlot.textContent += " - in bonding";
                    this.bondingSlot.style = "display:block";
                }
                break;
            case "showcatslot":
                this.catSlot.style = "display:block";
                break;
            case "effectingspells":
                newValue !== "" && (this.spellSlot.style = "display:block;");
                this.spellListSlot.textContent = newValue;
                break;
        }
    }
}
