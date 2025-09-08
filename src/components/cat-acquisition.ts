import { cE, replaceChildren, sgeid } from "../utils";

export class CatAcquisition extends HTMLElement {
  cardSlot: HTMLElement;
  ccbtn: HTMLElement;
  cgbtn: HTMLElement;
  aqcSlot: HTMLElement;
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
          height:80vh;
        }
        #aqc-slot {
          display:flex;
          flex-direction:column;
          height:70vh;
          overflow: auto;
          gap: 4px;
          margin-top:8px;
        }
        .btn-container{
          display:flex;
          justify-content:space-evenly;
        }
      </style>
      <div id="card">
      <h2>Get Your Cats here!</h2>
      <div class=btn-container>
      <button id= "cc">Cat Catcher</button>
      <button id="cg">Traps</button></div>
      <div id="aqc-slot"></div>
      </div>
    `;

    sr.appendChild(template.content.cloneNode(true));

    this.cardSlot = sgeid(sr, "card");
    this.ccbtn = sgeid(sr, "cc");
    this.cgbtn = sgeid(sr, "cg");
    this.aqcSlot = sgeid(sr, "aqc-slot");
  }

  setCatcherBtn(onClick: () => void) {
    this.ccbtn.onclick = onClick;
  }

  setTrapsBtn(onClick: () => void) {
    this.cgbtn.onclick = onClick;
  }

  setAcquisitionType(entities: HTMLElement[]) {
    replaceChildren(this.aqcSlot, entities);
  }

  static get observedAttributes() {
    return ["title"];
  }

  attributeChangedCallback(name: string, _oldvalue: string, newValue: string) {
    switch (name) {
      case "title":
        this.cardSlot.textContent = newValue;
        break;
    }
  }
}
