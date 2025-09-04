// Happening.ts
import { Entity } from "./Entity";

export type TK = keyof Happening;

type THappeningVariants =
  | "news"
  | "bonding"
  | "active-bonding"
  | "notification"
  | "action"
  | "spellcasting"
  | "skill-check"
  | "interaction"
  | "spell-effect";

export class Happening {
  id: string;
  variant: THappeningVariants;
  triggerKeyword: string[];
  eventResolution: {
    timerType:
      | "permanent"
      | "immediate"
      | "tick"
      | "sunrise"
      | "noon"
      | "sunset"
      | "midnight"
      | null;
    timerCount?: number;
  };
  eventPrerequisites: {
    criteriaType: string;
    criteriaCount?: number;
    criteriaValue?: string | number;
  }[];
  // Actions
  agent: Entity | null;
  patient?: Entity | null = null;
  instrument?: Entity | string;
  cause?: Happening | string;
  valence?: string;
  ongoing?: boolean;
  // Bonding
  nextEventDay?: number | null;
  nextEventTick?: number | null;
  knowns: string[] | TK[];
  requestVariant?: Map<string, Entity | Happening> | null;
  bondRequirements?: string[] | null;
  bondCat?: Entity | null;
  // Interactions
  dialogueTree?: string[];
  // Skill Check
  skill?: string;
  difficulty?: number;
  // Costs & Consequences
  cost?: Record<string, number | string>;
  outcome?: Happening;
  success?: Happening;
  failure?: Happening;
  // Description
  title?: string | null;
  content?: string | null;
  // Spellcasting
  domain?: string;
  enchantment?: Entity;
  curse?: Entity;

  constructor(data: {
    id: string;
    variant: THappeningVariants;
    triggerKeyword: string[];
    knowns: string[] | TK[];
    eventResolution: {
      timerType:
        | "permanent"
        | "immediate"
        | "tick"
        | "sunrise"
        | "noon"
        | "sunset"
        | "midnight"
        | null;
      timerCount?: number;
    };
    eventPrerequisites: {
      criteriaType: string;
      criteriaCount?: number;
      criteriaValue?: string | number;
    }[];
    agent: Entity | null;
    patient?: Entity | null;
    instrument?: Entity | string;
    cause?: Happening | string;
    valence?: string;
    ongoing?: boolean;
    nextEventDay?: number | null;
    nextEventTick?: number | null;
    requestVariant?: Map<string, Entity | Happening> | null;
    bondRequirements?: string[] | null;
    bondCat?: Entity | null;
    dialogueTree?: string[];
    skill?: string;
    difficulty?: number;
    cost?: Record<string, number | string>;
    outcome?: Happening;
    success?: Happening;
    failure?: Happening;
    title?: string | null;
    content?: string | null;
    domain?: string;
    enchantment?: Entity;
    curse?: Entity;
  }) {
    this.id = data.id;
    this.variant = data.variant;
    this.triggerKeyword = data.triggerKeyword;
    this.eventResolution = data.eventResolution;
    this.eventPrerequisites = data.eventPrerequisites;
    this.agent = data.agent;
    this.patient = data.patient;
    this.instrument = data.instrument;
    this.cause = data.cause;
    this.valence = data.valence;
    this.ongoing = data.ongoing;
    this.nextEventDay = data.nextEventDay;
    this.nextEventTick = data.nextEventTick;
    this.knowns = data.knowns;
    this.requestVariant = data.requestVariant;
    this.bondRequirements = data.bondRequirements;
    this.bondCat = data.bondCat;
    this.dialogueTree = data.dialogueTree;
    this.skill = data.skill;
    this.difficulty = data.difficulty;
    this.cost = data.cost;
    this.outcome = data.outcome;
    this.success = data.success;
    this.failure = data.failure;
    this.title = data.title;
    this.content = data.content;
    this.domain = data.domain;
    this.enchantment = data.enchantment;
    this.curse = data.curse;
  }
}

// export class SkillCheck extends Happening {
//   constructor() {
//     super();
//   }
// }
