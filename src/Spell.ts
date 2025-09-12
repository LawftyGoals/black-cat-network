import type { Entity } from "./Entity";
import type { TCatColors } from "./Values";

type TSpellVariant = "scrying" | "colorize";

export const SpellCardValues: (keyof Spell)[] = ["variant", "description"];

export type TActionProps = { target: Entity; color?: TCatColors };

export type TSpellName = "forzachromata" | "scrying";

export class Spell {
    name: TSpellName;
    variant: TSpellVariant;
    label: string;
    description: string;
    value: number;
    target: undefined | Entity;
    action: (props: TActionProps) => void;

    constructor(props: {
        name: TSpellName;
        variant: TSpellVariant;
        description: string;
        value: number;
        label: string;
        action: (props: TActionProps) => void;
        target?: Entity;
    }) {
        this.name = props.name;
        this.variant = props.variant;
        this.description = props.description;
        this.target = props.target;
        this.value = props.value;
        this.label = props.label;
        this.action = props.action;
    }
}
