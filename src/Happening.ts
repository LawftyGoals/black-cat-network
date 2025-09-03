// Happening.ts
import type { Entity } from "./Entity";

export class Happening {
  id: string;
  variant: string;
  triggerKeyword: string[]; // Keyword to filter eligible Haps by the Hap-Manager.
  eventResolution: {
    timerType: "immediate" | "sunrise" | "noon" | "sunset" | "midnight" | null;
    timerCount?: number; // e.g. X ticks or X midnights
  };
  eventPrerequisites: {
    criteriaType: string; // e.g. "vocation", "trait", "location"
    criteriaCount?: number; // How many of this criteria are required.
    criteriaValue?: string | number; // Value to match (e.g. "Divination", or "reflex: 60").
  }[];
  // Actions
  agent?: string;
  patient?: Entity;
  instrument?: Entity;
  // Interactions
  dialogueTree?: string[];
  // Skill Check
  skill?: string;
  difficulty?: number; // d20 or 100% system, tho?
  // Costs & Consequences
  cost?: {};
  outcome?: Happening;
  success?: Happening;
  failure?: Happening;
  // News Item
  title?: string;
  content?: string;
  // Spellcasting
  domain?: string;
  // Spell Effect
  enchantment?: Entity;
  curse?: Entity;

  constructor(data: {
    id: string;
    variant: string;
    triggerKeyword: string[];
    eventResolution: {
      timerType:
        | "immediate"
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
    agent?: string;
    patient?: Entity;
    instrument?: Entity;
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
