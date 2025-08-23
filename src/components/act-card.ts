import { cE, sgeid } from "../utils";

export class ActCard extends HTMLElement {
  titleElement: HTMLElement;
  contentElement: HTMLElement;
  clickableElement: HTMLElement;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

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
        <p id="content-slot"></p>
      </div>
    `;

    this.shadowRoot?.appendChild(template.content.cloneNode(true));

    this.titleElement = sgeid(this.shadowRoot!, "title-slot")!;
    this.contentElement = sgeid(this.shadowRoot!, "content-slot")!;
    this.clickableElement = sgeid(this.shadowRoot!, "clickable")!;
  }

  static get observedAttributes() {
    return ["title", "content"];
  }

  setDivClick(onClick: () => any) {
    this.clickableElement.onclick = onClick;
  }

  attributeChangedCallback(
    name: any,
    _oldvalue: any,
    newValue: string | (() => void)
  ) {
    switch (name) {
      case "title":
        this.titleElement.textContent = newValue as string;
        break;
      case "content":
        this.contentElement.textContent = newValue as string;
        break;
    }
  }
}
