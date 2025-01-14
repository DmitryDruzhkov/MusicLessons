export interface Task {
  title: string;
  elements: Element[];
}

export interface Element {
  type: string;
  y: number;
  name?: string;
  stepNumber?: string;
  correct?: boolean;
  selected?: boolean;
}
