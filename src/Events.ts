import type { TenumCatVariants } from "./Cat";
import { cE } from "./utils";

export class Events {
  ID: string;
  From: string;
  Description: string;
  Offer: number;
  Variant: TenumCatVariants;
  Requirements: number[];

  constructor(
    id: string,
    from: string,
    text: string,
    offer: number,
    variant: TenumCatVariants,
    requirements: number[]
  ) {
    this.ID = id;
    this.From = from;
    this.Description = text;
    this.Offer = offer;
    this.Variant = variant;
    this.Requirements = requirements;
  }
}

export class EventsComponent extends HTMLElement {
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

    this.titleElement = this.shadowRoot?.getElementById("title-slot")!;
    this.contentElement = this.shadowRoot?.getElementById("content-slot")!;
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

customElements.define("events", EventsComponent);
