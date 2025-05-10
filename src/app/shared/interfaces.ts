export interface Task {
  title: string;
  elements: Element[];
}

export enum ElementTypes {
  NOTE,
  CLEF,
  ACCIDENTAL
}

export enum Notes {
  DO,
  RE,
  MI,
  FA,
  SOL,
  LA,
  SI,
}

export enum StepNumbers {
  I = 'I',
  II = 'II',
  III = 'III',
  IV = 'IV',
  V = 'V',
  VI = 'VI',
  VII = 'VII'
}

/* export interface Note {
  name: NoteNames,
} */

export interface Element {
  type: ElementTypes;
  x?: number;
  y: number;
  note?: Notes;
  name?: string;
  stepNumber?: string;
  correct?: boolean;
  selected?: boolean;
}

export interface CorrectNote {
  x: number;
  y: number;
}
