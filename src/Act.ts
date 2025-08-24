import type { TenumCatCharacteristics, TenumCatVariants } from "./Cat";
import type { Entity } from "./Entity";

type TActVariants = "news" | "request";

export class Act {
  ID: string;
  Variant: TActVariants;
  From: Entity | null;
  Title: string;
  Contents: string;
  Offer: number | null;
  Request_Variant: TenumCatVariants | null;
  Requirements: TenumCatCharacteristics[] | null;

  constructor(
    id: string,
    variant: TActVariants,
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
