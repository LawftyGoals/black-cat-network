import { cE, sgeid } from "../utils";

export class EventCard extends HTMLElement {
  titleElement: HTMLElement;
  contentElement: HTMLElement;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const template = cE("template") as HTMLTemplateElement;
    template.innerHTML = /*html*/ `
       <style>
        h1 {
          color: green;
        }
        p {
          font-size: 1.2rem;
        }
      </style>
      <div>
        <h1 id="title-slot">Hello, from my custom element!</h1>
        <p id="content-slot">This content is created from a string.</p>
      </div>
    `;

    this.shadowRoot?.appendChild(template.content.cloneNode(true));

    this.titleElement = sgeid(this.shadowRoot!, "title-slot")!;
    this.contentElement = sgeid(this.shadowRoot!, "content-slot")!;
  }

  static get observedAttributes() {
    return ["title"];
  }

  attributeChangedCallback(name: any, _oldvalue: any, newValue: any) {
    switch (name) {
      case "title":
        this.titleElement.textContent = newValue;
        break;
    }
  }
}
