import type { Entity } from "./Entity";

type TSpellVariant = "scrying";

export const SpellCardValues: (keyof Spell)[] = ["variant", "description"];

export class Spell {
    variant: TSpellVariant;
    description: string;
    target: null | Entity;

    constructor(props: {
        variant: TSpellVariant;
        description: string;
        target: Entity | null;
    }) {
        this.variant = props.variant;
        this.description = props.description;
        this.target = props.target;
    }
}
