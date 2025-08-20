class CatCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const card = document.createElement('div');
    const style = document.createElement('style');

    //   Angus, give me something spooky....
    style.textContent = `
        div {
          background-color: #1a122f; /* Dark gothic background */
          border: 1px solid #4a3b6b;
          border-radius: 8px;
          padding: 16px;
          color: #e0d8f1;
          font-family: 'Times New Roman', serif;
          max-width: 300px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
          margin: 8px;
        }
        h3 {
          margin-top: 0;
          color: #b8a9d9; /* Light purple for the cat type */
        }
        p {
          margin: 8px 0;
        }
        .traits {
          font-style: italic;
          color: #c8b9e8;
        }
      `;

    //   HTML STRUCTURE
    card.innerHTML = `
      <h3 id="cat-type">Cat Type</h3>
      <p id="cat-description">This is a description.</p>
      <p class="traits" id="cat-traits">These are the traits.</p>
      `;

    this.shadowRoot?.appendChild(style);
    this.shadowRoot?.appendChild(card);
  }

  // Keep tabs on these cattributes
  static get observedAttributes() {
    return ['type', 'description', 'traits'];
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (!this.shadowRoot) return;

    const card = this.shadowRoot.querySelector('div');
    if (!card) return;

    if (name === 'type') {
      const typeElement = this.shadowRoot?.getElementById('cat-type');
      if (typeElement) typeElement.textContent = newValue;
    }

    if (name === 'description') {
      const typeElement = this.shadowRoot?.getElementById('cat-description');
      if (typeElement) typeElement.textContent = newValue;
    }

    if (name === 'traits') {
      const typeElement = this.shadowRoot?.getElementById('cat-traits');
      if (typeElement) typeElement.textContent = `Traits: ${newValue}`;
    }
  }
}

customElements.define('cat-card', CatCard)

// 1. class NewClass extends HTMLElement
//      Declare class, inherit properties and methods from HTMLElement
// 2. constructor() to create CatCard, super() to inherit from HTMLElement
// 3. this.attachShadow({ mode: 'open' })
//      Create shadow DOM for encapsulation, prevent style leakage.
//      Open to acces outside element, e.g. 'shadowRoot'.
// 4. const card, const style
// 5. style.textContent... etcetera
// 
//  NEXT, automatic monitoring of cat-card attributes... lifecycle callback or something.
// 6. static get observedAttributes() {}
//      method defining attributes for browser to monitor.
// 7. attributeChangedCallback
//      gets called when browser detects change in attributes it monitors.
//      