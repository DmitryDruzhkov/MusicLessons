// note.model.ts
export interface NoteType {
  type: 'clef' | 'sign' | 'note';
}

export interface Clef extends NoteType {
  type: 'clef';
  clefType: 'treble' | 'bass'; // Тип ключа: скрипичный или басовый
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Sign extends NoteType {
  type: 'sign';
  signType: 'sharp' | 'flat'; // Тип знака: диез или бемоль
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Note extends NoteType {
  type: 'note';
  name: string; // Название ноты
  x: number;
  y: number;
  isCorrect: boolean;
  isSelected: boolean;
}

export type NoteElement = Clef | Sign | Note;