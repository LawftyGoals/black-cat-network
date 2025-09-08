// Happening.ts
import { Entity } from "./Entity";

export type TK = keyof Happening;

type THappeningVariants =
  | "news"
  | "bonding"
  | "active-bonding"
  | "notification"
  | "misc";

export const happeningKnowns = ["title", "content", "active", "offer"];

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
  request_Variant: Map<string, Entity | Happening> | null;
  bondrequirements: string[] | null;
  cat: Entity | null;
  patient?: Entity;
  triggerKeyword?: string[];
  outcome?: Happening;
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
    requestVariant: Map<string, Entity | Happening> | null,
    requirements: string[] | null,
    patient?: Entity,
    triggerKeyword?: string[],
    outcome?: Happening
  ) {
    this.id = id;
    this.ongoing = ongoing;
    this.nextEventDay = nextEventDay;
    this.nextEventTick = nextEventTick;
    this.knowns = [...knowns];
    this.variant = variant;
    this.agent = agent;
    this.title = title;
    this.content = content;
    this.offer = offer;
    this.request_Variant = requestVariant;
    this.bondrequirements = requirements;
    this.cat = null;
    this.patient = patient;
    this.triggerKeyword = triggerKeyword;
    this.outcome = outcome;
  }
}
