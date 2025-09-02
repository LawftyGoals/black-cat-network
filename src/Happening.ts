import type { Entity } from "./Entity";

type THappeningVariants =
  | "news"
  | "bonding"
  | "active-bonding"
  | "notification";

export class Happening {
  id: string;
  Active: boolean;
  NextEventDay: number | null;
  NextEventTick: number | null;
  Knowns: string[] | TK[];
  Variant: THappeningVariants;
  From: Entity | null;
  Title: string;
  Content: string;
  Offer: number | null;
  Request_Variant: Map<string, Entity | Happening> | null;
  Requirements: string[] | null;
  Cat: Entity | null;
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
    this.Active = active;
    this.NextEventDay = nextEventDay;
    this.NextEventTick = nextEventTick;
    this.Knowns = ["From", "Title", "Content", "Variant", "Active", ...knowns];
    this.Variant = variant;
    this.From = from;
    this.Title = title;
    this.Content = content;
    this.Offer = offer;
    this.Request_Variant = requestVariant;
    this.Requirements = requirements;
    this.Cat = null;
  }
}

export type TK = keyof Happening;
