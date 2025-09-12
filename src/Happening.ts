// Happening.ts
import { Entity } from "./Entity";
import type { TSpells } from "./systems/spell-system";

export type TK = keyof Happening;

type THappeningVariants =
    | "news"
    | "bonding"
    | "active-bonding"
    | "notification"
    | "misc";

export const happeningKnowns = [
    "title",
    "content",
    "ongoing",
    "offer",
    "spell",
];

type TRequirements = { traits: string[]; variant: string } | null;

export class Happening {
    id: string;
    ongoing: boolean;
    nextEventDay: number | null;
    nextEventTick: number | null;
    knowns: string[] | TK[];
    variant: THappeningVariants;
    agent: Entity | null;
    title: string;
    content: string;
    offer: number | null;
    spell: TSpells | null;
    requestVariant: Map<string, Entity | Happening> | null;
    bondrequirements: TRequirements;
    cat: Entity | null;
    patient?: Entity | null;
    triggerKeyword?: string[];
    outcome?: Happening;
    triedCount?: number;

    constructor(
        id: string,
        ongoing: boolean,
        nextEventDay: number | null,
        nextEventTick: number | null,
        knowns: string[] | TK[] = [],
        variant: THappeningVariants,
        agent: Entity | null,
        title: string,
        content: string,
        offer: number | null,
        spell: TSpells | null,
        requestVariant: Map<string, Entity | Happening> | null,
        requirements: TRequirements,
        cat: Entity | null = null,
        patient?: Entity | null,
        triggerKeyword?: string[],
        outcome?: Happening,
        triedCount?: number
    ) {
        this.id = id;
        this.ongoing = ongoing;
        this.nextEventDay = nextEventDay;
        this.nextEventTick = nextEventTick;
        this.knowns = knowns;
        this.variant = variant;
        this.agent = agent;
        this.title = title;
        this.content = content;
        this.offer = offer;
        this.spell = spell;
        this.requestVariant = requestVariant;
        this.bondrequirements = requirements;
        this.cat = cat;
        this.patient = patient;
        this.triggerKeyword = triggerKeyword;
        this.outcome = outcome;
        this.triedCount = triedCount;
    }
}
