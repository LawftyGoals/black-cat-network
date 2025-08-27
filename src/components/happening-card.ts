import { cE, sgeid } from "../utils";

export class HappeningCard extends HTMLElement {
  titleElement: HTMLElement;
  contentElement: HTMLElement;
  clickableElement: HTMLElement;
  fromElement: HTMLElement;
  offerElement: HTMLElement;
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
      </style>
      <div id="clickable">
        <h1 id="title-slot"></h1>
        <p>From: <span id="from-slot"></span></p>
        <p id="content-slot"></p>
        <p id="offer-slot"></p>
      </div>
    `;

    sr.appendChild(template.content.cloneNode(true));

    this.titleElement = sgeid(sr, "title-slot");
    this.contentElement = sgeid(sr, "content-slot");
    this.clickableElement = sgeid(sr, "clickable");
    this.fromElement = sgeid(sr, "from-slot");
    this.offerElement = sgeid(sr, "offer-slot");
  }

  static get observedAttributes() {
    return ["title", "content", "from", "offer"];
  }

  setDivClick(onClick: () => any) {
    this.clickableElement.onclick = onClick;
  }

  attributeChangedCallback(name: any, _oldvalue: any, newValue: string) {
    switch (name) {
      case "title":
        this.titleElement.textContent = newValue;
        break;
      case "content":
        this.contentElement.textContent = newValue;
        break;
      case "from":
        this.fromElement.textContent = newValue;
        break;
      case "offer":
        this.offerElement.textContent = `${newValue} gp`;
        break;
    }
  }
}
