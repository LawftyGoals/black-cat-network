type TSpellVariant = "scrying";

export class Spells {
  variant: TSpellVariant;
  description: string;

  constructor(props: { variant: TSpellVariant; description: string }) {
    this.variant = props.variant;
    this.description = props.description;
  }
}

const spells = {
  scrying: new Spells({
    variant: "scrying",
    description:
      "If you apply the marking to anything... even a cat, you can then view it and its surroundings through the ether.",
  }),
};
