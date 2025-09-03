// Happening.ts
import type { Entity } from "./Entity";

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

type TK = string;

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
  agent?: Entity | string;
  patient?: Entity | string;
  instrument?: Entity | string;
  // Bonding
  Active?: boolean;
  NextEventDay?: number | null;
  NextEventTick?: number | null;
  Knowns?: string[] | TK[];
  Request_Variant?: Map<string, Entity | Happening> | null;
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
  title?: string;
  content?: string;
  // Spellcasting
  domain?: string;
  enchantment?: Entity;
  curse?: Entity;

  constructor(data: {
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
    agent?: Entity | string;
    patient?: Entity | string;
    instrument?: Entity | string;
    Active?: boolean;
    NextEventDay?: number | null;
    NextEventTick?: number | null;
    bondKnowns?: string[] | TK[];
    bondRequestVariant?: Map<string, Entity | Happening> | null;
    bondRequirements?: string[] | null;
    bondCat?: Entity | null;
    dialogueTree?: string[];
    skill?: string;
    difficulty?: number;
    cost?: Record<string, number | string>;
    outcome?: Happening;
    success?: Happening;
    failure?: Happening;
    title?: string;
    content?: string;
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
    this.Active = data.Active;
    this.NextEventDay = data.NextEventDay;
    this.NextEventTick = data.NextEventTick;
    this.Knowns = data.bondKnowns;
    this.Request_Variant = data.bondRequestVariant;
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
