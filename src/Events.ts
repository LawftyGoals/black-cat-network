import type { TenumCatVariants } from "./Cat";
import type { Entity } from "./Entity";

export class Events {
  ID: string;
  From: Entity;
  Description: string;
  Offer: number;
  Variant: TenumCatVariants;
  Requirements: number[];

  constructor(
    id: string,
    from: Entity,
    text: string,
    offer: number,
    variant: TenumCatVariants,
    requirements: number[]
  ) {
    this.ID = id;
    this.From = from;
    this.Description = text;
    this.Offer = offer;
    this.Variant = variant;
    this.Requirements = requirements;
  }
}
