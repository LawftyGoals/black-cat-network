import type { TenumCatCharacteristics, TenumCatVariants } from "./Cat";
import type { Entity } from "./Entity";

export class Act {
  ID: string;
  From: Entity;
  Description: string;
  Offer: number;
  Variant: TenumCatVariants;
  Requirements: TenumCatCharacteristics[];

  constructor(
    id: string,
    from: Entity,
    text: string,
    offer: number,
    variant: TenumCatVariants,
    requirements: TenumCatCharacteristics[]
  ) {
    this.ID = id;
    this.From = from;
    this.Description = text;
    this.Offer = offer;
    this.Variant = variant;
    this.Requirements = requirements;
  }
}
