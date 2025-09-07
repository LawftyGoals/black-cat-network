// Happening.ts
import { Entity } from "./Entity";

export type TK = keyof Happening;

type THappeningVariants =
  | "news"
  | "bonding"
  | "active-bonding"
  | "notification"
  | "misc";

export class Happening {
  id: string;
  variant: THappeningVariants;
  triggerKeyword: string[];
  knowns: string[] | TK[];
  // Basic
  agent: Entity | null;
  patient: Entity | null = null;
  ongoing?: boolean;
  nextEventDay?: number | null;
  nextEventTick?: number | null;
  outcome?: Happening;
  // Bonding
  requestVariant?: Map<string, Entity | Happening> | null;
  bondRequirements?: string[] | null;
  bondCat?: Entity | null;
  // Description
  title?: string | null;
  content?: string | null;

  constructor(data: {
    id: string;
    variant: THappeningVariants;
    triggerKeyword: string[];
    knowns: string[] | TK[];
    agent: Entity | null;
    patient?: Entity | null;
    ongoing?: boolean;
    nextEventDay?: number | null;
    nextEventTick?: number | null;
    outcome?: Happening;
    requestVariant?: Map<string, Entity | Happening> | null;
    bondRequirements?: string[] | null;
    bondCat?: Entity | null;
    title?: string | null;
    content?: string | null;
  }) {
    this.id = data.id;
    this.variant = data.variant;
    this.triggerKeyword = data.triggerKeyword;
    this.knowns = data.knowns;
    this.agent = data.agent;
    this.patient = data.patient ?? null;
    this.ongoing = data.ongoing;
    this.nextEventDay = data.nextEventDay;
    this.nextEventTick = data.nextEventTick;
    this.outcome = data.outcome;
    this.requestVariant = data.requestVariant;
    this.bondRequirements = data.bondRequirements;
    this.bondCat = data.bondCat;
    this.title = data.title;
    this.content = data.content;
  }
}

// export class SkillCheck extends Happening {
//   constructor() {
//     super();
//   }
// }
