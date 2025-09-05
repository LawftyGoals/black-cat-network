import { cE, sgeid } from "../utils";

export class CatAcquisition extends HTMLElement {
  cardSlot: HTMLElement;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const sr = this.shadowRoot!;

    const template = cE("template") as HTMLTemplateElement;
    template.innerHTML = /*html*/ `
       <style>
        div{
          background-color: #6C597D;
          padding:8px;
          border-radius:6px;
          border: solid 8px #4F7F7D;
        }
      </style>
      <div id="card">
      <h2>Get Your Cats here!</h2>

      <button>Cat Catcher</button>
      <button>Cages</button>
        

      </div>
    `;

    sr.appendChild(template.content.cloneNode(true));

    this.cardSlot = sgeid(sr, "card");
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name: string, _oldvalue: string, newValue: string) {
    switch (name) {
      case "title":
        this.cardSlot.textContent = newValue;
        break;
    }
  }
}
