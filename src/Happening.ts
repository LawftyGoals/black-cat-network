import type { Entity } from "./Entity";

type THappeningVariants =
  | "news"
  | "bonding"
  | "active-bonding"
  | "notification";

export const happeningKnowns = ["title", "content", "active", "offer"];

export class Happening {
  id: string;
  active: boolean;
  nextEventDay: number | null;
  nextEventTick: number | null;
  knowns: string[] | TK[];
  variant: THappeningVariants;
  from: Entity | null;
  title: string;
  content: string;
  offer: number | null;
  request_Variant: Map<string, Entity | Happening> | null;
  requirements: string[] | null;
  cat: Entity | null;
  constructor(
    id: string,
    active: boolean,
    nextEventDay: number | null,
    nextEventTick: number | null,
    knowns: string[] | TK[] = [],
    variant: THappeningVariants,
    from: Entity | null,
    title: string,
    content: string,
    offer: number | null,
    requestVariant: Map<string, Entity | Happening> | null,
    requirements: string[] | null
  ) {
    this.id = id;
    this.active = active;
    this.nextEventDay = nextEventDay;
    this.nextEventTick = nextEventTick;
    this.knowns = [...knowns];
    this.variant = variant;
    this.from = from;
    this.title = title;
    this.content = content;
    this.offer = offer;
    this.request_Variant = requestVariant;
    this.requirements = requirements;
    this.cat = null;
  }
}

export type TK = keyof Happening;
