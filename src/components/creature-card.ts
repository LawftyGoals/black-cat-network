export class CreatureCard extends HTMLElement {
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
