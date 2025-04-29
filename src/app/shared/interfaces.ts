export interface Task {
  title: string;
  elements: Element[];
}

export enum ElementTypes {
  NOTE,
  CLEF,
  ACCIDENTAL
}

export interface Element {
  type: ElementTypes;
  x?: number;
  y: number;
  name?: string;
  stepNumber?: string;
  correct?: boolean;
  selected?: boolean;
}
