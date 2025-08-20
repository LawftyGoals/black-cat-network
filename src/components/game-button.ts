class GameButton extends HTMLElement {
    constructor() {
        super();
        // Shadow DOM
        this.attachShadow({ mode: 'open' });

        // Button element
        const button = document.createElement('button');

        // Default button style
        const style = document.createElement('style');
        style.textContent = `
            button {
                background-color: #1a1a2e; /* Dark purple-black */
                border: 1px solid #4a4a6a; /* Subtle border for depth */
                color: #e0e0e0; /* Light gray text */
                padding: 10px 20px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                font-family: 'Times New Roman', serif; /* Gothic-like font */
                margin: 4px 2px;
                cursor: pointer;
                border-radius: 4px; /* Less rounded for a sharper look */
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* Subtle shadow */
                transition: all 0.3s ease; /* Smooth hover effect */
                position: relative;
                overflow: hidden;
            }
            button:hover {
                background-color: #2d2d44; /* Slightly lighter on hover */
                color: #b3b3b3; /* Brighter text */
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.7); /* Deeper shadow */
                border-color: #6a6a8a; /* Lighter border */
            }
            button:active {
                background-color: #111111; /* Even darker when clicked */
                transform: translateY(1px); /* "Press down" effect */
            }
            /* Optional: Add a gothic glow effect */
            button::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, rgba(100, 50, 150, 0.3), transparent);
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            button:hover::after {
                opacity: 1;
            }
        `;

        this.shadowRoot?.appendChild(style);
        this.shadowRoot?.appendChild(button);
    }

    // Get'n'set button labels
    static get observedAttributes() {
        return ['text'];
    }

    attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
        if (name === 'text' && this.shadowRoot) {
            const button = this.shadowRoot.querySelector('button');
            if (button) {
                button.textContent = newValue;
            }
        }
    }
}

customElements.define('game-button', GameButton)