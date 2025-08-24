import type { TenumCatCharacteristics, TenumCatVariants } from "./Cat";
import type { Entity } from "./Entity";

type THappeningVariants = "news" | "request";

export class Happening {
  ID: string;
  Variant: THappeningVariants;
  From: Entity | null;
  Title: string;
  Contents: string;
  Offer: number | null;
  Request_Variant: TenumCatVariants | null;
  Requirements: TenumCatCharacteristics[] | null;

  constructor(
    id: string,
    variant: THappeningVariants,
    from: Entity | null,
    title: string,
    contents: string,
    offer: number | null,
    requestVariant: TenumCatVariants | null,
    requirements: TenumCatCharacteristics[] | null
  ) {
    this.ID = id;
    this.Variant = variant;
    this.From = from;
    this.Title = title;
    this.Contents = contents;
    this.Offer = offer;
    this.Request_Variant = requestVariant;
    this.Requirements = requirements;
  }
}
