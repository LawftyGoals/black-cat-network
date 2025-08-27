import type { TenumCatCharacteristics, TenumCatVariants } from "./Cat";
import type { Entity } from "./Entity";

type THappeningVariants = "news" | "bonding";

export class Happening {
  ID: string;
  Knowns: TK[];
  Variant: THappeningVariants;
  From: Entity | null;
  Title: string;
  Content: string;
  Offer: number | null;
  Request_Variant: Map<string, Entity | Happening> | null;
  Requirements: TenumCatCharacteristics[] | null;

  constructor(
    id: string,
    knowns: TK[] = [],
    variant: THappeningVariants,
    from: Entity | null,
    title: string,
    content: string,
    offer: number | null,
    requestVariant: Map<string, Entity | Happening> | null,
    requirements: TenumCatCharacteristics[] | null
  ) {
    this.ID = id;
    this.Knowns = ["From", "Title", "Content", "Offer", ...knowns];
    this.Variant = variant;
    this.From = from;
    this.Title = title;
    this.Content = content;
    this.Offer = offer;
    this.Request_Variant = requestVariant;
    this.Requirements = requirements;
  }
}

export type TK = keyof Happening;
