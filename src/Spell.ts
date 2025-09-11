import type { Entity } from "./Entity";

type TSpellVariant = "scrying";

export const SpellCardValues: (keyof Spell)[] = ["variant", "description"];

export class Spell {
    variant: TSpellVariant;
    label: string;
    description: string;
    value: number;
    target: undefined | Entity;
    action: (entity: Entity) => void;

    constructor(props: {
        variant: TSpellVariant;
        description: string;
        value: number;
        label: string;
        action: (entity: Entity) => void;
        target?: Entity;
    }) {
        this.variant = props.variant;
        this.description = props.description;
        this.target = props.target;
        this.value = props.value;
        this.label = props.label;
        this.action = props.action;
    }
}
