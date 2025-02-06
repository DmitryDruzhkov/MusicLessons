import { NoteElement } from "./note.interface";

export const noteElements: NoteElement[] = [
  {
    type: 'clef',
    clefType: 'treble', // Скрипичный ключ
    x: 10,
    y: 50,
    width: 60,
    height: 180
  },
  {
    type: 'sign',
    signType: 'sharp', // Диез
    x: 80,
    y: 50,
    width: 20,
    height: 20
  },
  {
    type: 'note',
    name: 'до',
    x: 100,
    y: 100,
    isCorrect: true,
    isSelected: false
  },
  {
    type: 'note',
    name: 'ре',
    x: 145,
    y: 115,
    isCorrect: true,
    isSelected: false
  },
  {
    type: 'note',
    name: 'ми',
    x: 190,
    y: 130,
    isCorrect: true,
    isSelected: false
  }
];