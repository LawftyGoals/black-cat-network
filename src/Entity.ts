// Entity.ts

    // Numerical type alias
export type IDnum = number;

    // All components must have a 'type' property that is a string.
export interface Component {
    type: string;
}

export interface Creature extends Component {
    type: "Creature";
    species: string;
    sex: string;
}

export interface Name extends Component {
    type: "Name";
    value: string;
}

export interface CatVariant extends Component {
    type: "CatVariant";
    variant: string;
}

export interface CatTraits extends Component {
    type: "CatTraits";
    traits: string[];
}

export interface CatAbilities extends Component {
    type: "CatAbilities";
    // Agility
    reflex: number;
    balance: number;
    speed: number;
    // Perception and senses
    vision: number;
    hearing: number;
    smell: number;
    taste: number;
    // Intelligence
    memory: number;
    intuition: number;
    magicInsight: number;
    // Temperament
    patience: number;
    boldness: number;
    mischief: number;
    // Stealth
    sneaking: number;
    hiding: number;
    // Power
    strength: number;
    grip: number;
    endurance: number;
    magicResistance: number;
    // Luck
    luck: number;
    
}

export interface HumanTraits extends Component {
    type: "HumanTraits";
    traits: string[];
}

export interface WitchVariant extends Component {
    type: "WitchVariant";
    variant: string;
}

export class Entity {
    private id: IDnum;
    private components: Map<string, Component>;

    // Initializes a new Entity from the IDnum with a tabula rasa, an empty Map.
    constructor(id: IDnum) {
        this.id = id;
        this.components = new Map();
    }

    // Function to add a component, takes a key ('type' str) and value (Component) pair.
    addComponent(component: Component): void {
        this.components.set(component.type, component);
    }
    // Function to retrieve a Component (val) by its type (key) from the Map.
    getComponent<T extends Component>(type: string): T | undefined {
        return this.components.get(type) as T;
    }
    // Function to check if the Entity has a given Component.
    hasComponent(type: string): boolean {
        return this.components.has(type);
    }
    // Wait, fuck, they're called methods - not functions. Bah.
}