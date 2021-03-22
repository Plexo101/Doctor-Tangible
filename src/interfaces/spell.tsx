interface Props {
  index: number;
  max: number;
}

interface SpellSource {
  source: string,
  page: number
}

interface SpellTime{
  number: number,
  unit: string,
  condition: string
}

interface SpellRange {
  type: string,
  distance : SpellRangeDistance
}

interface SpellRangeDistance {
  type: string,
  amount: number
}

interface SpellComponents {
  v: boolean,
  s: boolean,
  m: SpellComponentsMaterials | string
}

interface SpellComponentsMaterials {
  text: string,
  cost: number,
  consume: boolean
}

interface SpellDuration {
  type: string,
  duration: SpellDurationDuration
  ends: string[],
  concentration: boolean
}

interface SpellDurationDuration {
  type: string,
  amount: number
}

interface SpellEntries {
  type: string,
  name: string,
  entries: string[]
}

interface SpellScalingLevelDice {  //Only for cantrips
  lavel: string,
  scaling: SpellScalingLevelDiceScaling
}

interface SpellScalingLevelDiceScaling {
  1: string,
  5: string,
  11: string,
  17: string
}

interface SpellClassesGroup {
  fromClassList: SpellClasses[],
  fromClassListVariant: SpellClasses[],
  backgrounds: SpellClasses[]
}

interface SpellClasses {
  name: string,
  source: string,
  definedInSource: string
}

interface Spell {
  name: string;
  source: SpellSource;
  otherSources: SpellSource[];
  level: number;
  school: string;
  time: SpellTime[];
  range: SpellRange;
  components: SpellComponents;
  duration: SpellDuration[];
  entries:  string &  SpellEntries[];
  entriesHigherLevel: SpellEntries[];
  damageInflict: string[];
  savingThrow: string[];
  miscTags: string[];
  areaTags: string[];
  classes: SpellClassesGroup;
}