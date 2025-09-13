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
<style>#clickable {display: flex;flex-direction: column;justify-content: center;align-items: center;background: white;}#clickable:hover {background: #ADD8E6;}#clickable #inActive {background-color: gray;}</style><div id="clickable"><div id="from"></div><div id="title"></div></div>`;

sr.appendChild(template.content.cloneNode(true));
this.clickable = sgeid(sr, "clickable");
  this.titleSlot = sgeid(sr, "title");
    this.fromSlot = sgeid(sr, "from");
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
