export interface TaskElement2 {
  type: ElementTypes;
  y: number;
  name: string;
  stepNumber?: string;
  correct?: boolean;
  selected?: boolean;
}

export interface TaskDNDOld {
  title: string;
  elements: TaskElement2[];
}

export interface TaskCheck {
  title: string;
  elements: TaskElement[];
}

export interface TaskDND {
  title: string;
  elements: TaskElement[];
}

export enum ElementTypes {
  NOTE,
  CLEF,
  ACCIDENTAL,
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
  VII = 'VII',
}

/* export interface Note {
  name: NoteNames,
} */

export interface TaskElement {
  type: ElementTypes;
  note: Notes;
}

export interface CorrectNote {
  name: string;
  x: number;
  y: number;
}

export interface NoteElement extends TaskElement, CorrectNote {
  stepNumber?: string;
  correct?: boolean;
  selected?: boolean;
}

export interface DragNoteElement extends NoteElement {
  originalX: number;
  originalY: number;
  offsetX: number;
  offsetY: number;
  isWithSubLine?: boolean;
}
