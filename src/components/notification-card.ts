import { cE, sgeid } from "../utils";

export class NotificationCard extends HTMLElement {
  titleSlot: HTMLElement;
  clickable: HTMLElement;
  fromSlot: HTMLElement;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const sr = this.shadowRoot!;

    const template = cE("template") as HTMLTemplateElement;
    template.innerHTML = /*html*/ `
    <style>
        #clickable-slot {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: white;
        }
        #clickable-slot:hover {
            background: #ADD8E6;
        }
        #clickable-slot #inActive {
            background-color: gray;
        }
    </style>
    <div id="clickable-slot">
    <div id="from-slot"></div>
    <div id="title-slot"></div>
    </div>`;

    sr.appendChild(template.content.cloneNode(true));
    this.clickable = sgeid(sr, "clickable-slot");
    this.titleSlot = sgeid(sr, "title-slot");
    this.fromSlot = sgeid(sr, "from-slot");
  }

  static get observedAttributes() {
    return ["title", "active", "agent"];
  }

  setClickable(onClick: () => void) {
    this.clickable.onclick = onClick;
  }

  attributeChangedCallback(name: string, _oldvalue: string, newValue: string) {
    switch (name) {
      case "title":
        this.titleSlot.textContent = newValue;
        break;
      case "active":
        this.clickable.className = newValue === "false" ? "inactive" : "active";
        break;
      case "agent":
        this.fromSlot.textContent = newValue;
        break;
    }
  }
}
