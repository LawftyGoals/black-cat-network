import { cE, sgeid } from "../utils";

export class CreatureCard2 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["name", "type", "description", "traits", "image"];
  }

  get name() {
    return this.getAttribute("name") || "Unknown Creature";
  }

  get type() {
    return this.getAttribute("type") || "Unknown Type";
  }

  get description() {
    return this.getAttribute("description") || "No description available.";
  }

  get traits() {
    return this.getAttribute("traits") || "";
  }

  get image() {
    return this.getAttribute("image") || "";
  }

  render() {
    this.shadowRoot!.innerHTML = /*html*/ `
        <style>
          .card {
            background-color: #1a122f;
            border: 1px solid #4a3b6b;
            border-radius: 8px;
            padding: 16px;
            color: #e0d8f1;
            font-family: 'Times New Roman', serif;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
            margin: 8px;
          }
          h3 {
            margin-top: 0;
            color: #b8a9d9;
          }
          p {
            margin: 8px 0;
          }
          .traits {
            font-style: italic;
            color: #c8b9e8;
          }
          .profile-picture {
            width: 50px;
            height: 50px;
            border-radius: 4px;
            background-color: #666;
            border: 2px solid #333;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            background-size: cover;
            background-position: center;
            display: inline-block;
          }
          .content{
            display:flex;
            gap: 8px;
          }
        </style>
        <div class="card">
          <h3>${this.name} (${this.type})</h3><div class="content">
          <div class="profile-picture" style="background-image: ${
            this.image ? `url('${this.image}')` : "none"
          }"></div><div>
          <p>${this.description}</p>
          <p class="traits">${this.traits}</p></div></div>
        </div>
      `;
  }
}

// npx tsc ./src/components/creature-card.ts --target es6 --module es6 --outDir ./src/components/
// npx tsc ./src/Entity.ts --target es6 --module es6 --outDir ./src/
export class CreatureCard extends HTMLElement {
  titleElement: HTMLElement;
  pictureElement: HTMLElement;
  descriptionElement: HTMLElement;
  cardElement: any;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const sr = this.shadowRoot!;
    const template = cE("template");
    template.innerHTML = this.shadowRoot!.innerHTML = /*html*/ `
        <style>
          #card-slot {
            background-color: #1a122f;
            border: 1px solid #4a3b6b;
            border-radius: 8px;
            padding: 16px;
            color: #e0d8f1;
            font-family: 'Times New Roman', serif;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
            margin: 8px;
          }
          #card-slot:hover {
            background-color: #2a223f
          }
          h3 {
            margin-top: 0;
            color: #b8a9d9;
          }
          p {
            margin: 8px 0;
          }
          #traits-slot {
            font-style: italic;
            color: #c8b9e8;
          }
          #profile-picture-slot {
            width: 50px;
            height: 50px;
            border-radius: 4px;
            background-color: #666;
            border: 2px solid #333;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            background-size: cover;
            background-position: center;
            display: inline-block;
          }
          #content{
            display:flex;
            gap: 8px;
          }
        </style>
        <div id="card-slot">
          <h3 id="title-slot"></h3><div id="content">
          <div id="profile-picture-slot"></div><div class="content">
          <p id="description-slot"></p>
          </div></div>
        </div>
      `;
    sr.appendChild(template);

    this.cardElement = sgeid(sr, "card-slot");
    this.titleElement = sgeid(sr, "title-slot");
    this.pictureElement = sgeid(sr, "profile-picture-slot");
    this.descriptionElement = sgeid(sr, "description-slot");
  }

  setDivClick(onClick?: () => any) {
    this.cardElement.onclick = onClick;
  }

  static get observedAttributes() {
    return ["name", "type", "description", "traits", "image"];
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case "name":
        this.titleElement.textContent = newValue;
        break;
      case "type":
        this.titleElement.textContent = `${this.titleElement.textContent} (${newValue})`;
        break;
      case "image":
        this.pictureElement.style = `background-image: ${
          newValue ? `url("${newValue}")` : "none"
        }`;
        break;
      case "description":
        this.descriptionElement.textContent = newValue;
        break;
    }
  }
}
