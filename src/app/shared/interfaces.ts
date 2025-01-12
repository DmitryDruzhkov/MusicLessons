export interface Task {
  title: string;
  elements: Element[];
}

export interface Element {
  type: string;
  x: number;
  y: number;
  name?: string;
  stepNumber?: string;
  correct?: boolean;
  selected?: boolean;
}
