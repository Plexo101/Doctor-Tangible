export interface SpellSource {
  source: string,
  page: number
}

export interface SpellTime {
  number: number,
  unit: string,
  condition: string
}

export interface SpellRange {
  type: string,
  distance: SpellRangeDistance
}

export interface SpellRangeDistance {
  type: string,
  amount: number
}

export interface SpellComponents {
  v: boolean,
  s: boolean,
  m: SpellComponentsMaterials | string
}

export interface SpellComponentsMaterials {
  text: string,
  cost: number,
  consume: boolean
}

export interface SpellDuration {
  type: string,
  duration: SpellDurationDuration
  ends: string[],
  concentration: boolean
}

export interface SpellDurationDuration {
  type: string,
  amount: number
}

export interface SpellEntries {
  type: string,
  name: string,
  entries: string[]
}

export interface SpellScalingLevelDice {  //Only for cantrips
  lavel: string,
  scaling: SpellScalingLevelDiceScaling
}

export interface SpellScalingLevelDiceScaling {
  1: string,
  5: string,
  11: string,
  17: string
}

export interface SpellClassesGroup {
  fromClassList: SpellClasses[],
  fromClassListVariant: SpellClasses[],
  backgrounds: SpellClasses[]
}

export interface SpellClasses {
  name: string,
  source: string,
  definedInSource: string
}

export interface Spell {
  name: string;
  source: SpellSource;
  otherSources: SpellSource[];
  level: number;
  school: string;
  time: SpellTime[];
  range: SpellRange;
  components: SpellComponents;
  duration: SpellDuration[];
  entries: string & SpellEntries[];
  entriesHigherLevel: SpellEntries[];
  damageInflict: string[];
  savingThrow: string[];
  miscTags: string[];
  areaTags: string[];
  classes: SpellClassesGroup;
}

//

export interface Multiclass {
  class: string,
  level: number
}

export interface stuff {
  stuff: string
}

export type Character = {
  name: string,
  class: string,
  subclass: string,
  classLevel: number,
  multiclass: Multiclass[],
  otherStuff: stuff[]
}