import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { ElementTypes, Notes, Task } from '../shared/interfaces';
import { XCoordinates, YCoordinates } from '../shared/constants';

export interface Task2 {
  title: string;
  elements: TaskElement2[];
}

export interface TaskElement2 {
  type: ElementTypes;
  y: number;
  name: string;
  stepNumber?: string;
  correct?: boolean;
  selected?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public tasks: WritableSignal<Task2[]> = signal([
    {
      title: 'Соль мажор',
      elements: [
        { type: ElementTypes.CLEF, y: 0, name: 'treble' }, // Скрипичный ключ
        { type: ElementTypes.ACCIDENTAL, y: 10, name: 'sharp' }, // Диез
        {
          type: ElementTypes.NOTE,
          y: 70,
          name: 'соль',
          stepNumber: 'I',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: 60,
          name: 'ля',
          stepNumber: 'II',
          correct: false,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: 40,
          name: 'до',
          stepNumber: 'III',
          correct: false,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: 30,
          name: 'ре',
          stepNumber: 'IV',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: 20,
          name: 'ми',
          stepNumber: 'V',
          correct: false,
          selected: false,
        },
      ],
    },
    {
      title: 'До мажор',
      elements: [
        { type: ElementTypes.CLEF, y: 0, name: 'treble' }, // Скрипичный ключ
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.DO_1,
          name: 'до',
          stepNumber: 'I',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.MI_1,
          name: 'ми',
          stepNumber: 'II',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.FA_1,
          name: 'фа',
          stepNumber: 'III',
          correct: false,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.LYA_1,
          name: 'ля',
          stepNumber: 'IV',
          correct: false,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.SOL_1,
          name: 'соль',
          stepNumber: 'V',
          correct: true,
          selected: false,
        },
      ],
    },
    {
      title: 'Ля минор',
      elements: [
        { type: ElementTypes.CLEF, y: 0, name: 'treble' }, // Скрипичный ключ
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.DO_1,
          name: 'до',
          stepNumber: 'I',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.RE_1,
          name: 'ре',
          stepNumber: 'II',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.MI_1,
          name: 'ми',
          stepNumber: 'I',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.FA_1,
          name: 'фа',
          stepNumber: 'I',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.SOL_1,
          name: 'соль',
          stepNumber: 'I',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.LYA_1,
          name: 'ля',
          stepNumber: 'I',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.SI_1,
          name: 'си',
          stepNumber: 'I',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.DO_2,
          name: 'до',
          stepNumber: 'I',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.RE_2,
          name: 'ре',
          stepNumber: 'II',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.MI_2,
          name: 'ми',
          stepNumber: 'I',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.FA_2,
          name: 'фа',
          stepNumber: 'I',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.SOL_2,
          name: 'соль',
          stepNumber: 'I',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.LYA_2,
          name: 'ля',
          stepNumber: 'I',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.SI_2,
          name: 'си',
          stepNumber: 'I',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.DO_3,
          name: 'до',
          stepNumber: 'I',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.RE_3,
          name: 'ре',
          stepNumber: 'II',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.MI_3,
          name: 'ми',
          stepNumber: 'I',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.FA_3,
          name: 'фа',
          stepNumber: 'I',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.SOL_3,
          name: 'соль',
          stepNumber: 'I',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.LYA_3,
          name: 'ля',
          stepNumber: 'I',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.SI_3,
          name: 'си',
          stepNumber: 'I',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.DO_4,
          name: 'до',
          stepNumber: 'I',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.RE_4,
          name: 'ре',
          stepNumber: 'II',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.MI_4,
          name: 'ми',
          stepNumber: 'I',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.FA_4,
          name: 'фа',
          stepNumber: 'I',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.SOL_4,
          name: 'соль',
          stepNumber: 'I',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.LYA_4,
          name: 'ля',
          stepNumber: 'I',
          correct: true,
          selected: false,
        },
        {
          type: ElementTypes.NOTE,
          y: YCoordinates.SI_4,
          name: 'си',
          stepNumber: 'I',
          correct: true,
          selected: false,
        },
      ],
    },
  ]);

  public tasksDND: Signal<Task[]> = signal([
    {
      title: 'Размести ноты, что бы получилась гамма До мажор',
      elements: [
        { type: ElementTypes.NOTE, note: Notes.DO },
        { type: ElementTypes.NOTE, note: Notes.RE },
        { type: ElementTypes.NOTE, note: Notes.MI },
        { type: ElementTypes.NOTE, note: Notes.FA },
        { type: ElementTypes.NOTE, note: Notes.SOL },
        { type: ElementTypes.NOTE, note: Notes.LA },
        { type: ElementTypes.NOTE, note: Notes.SI },
      ],
    },
    {
      title: 'Построй тоническое трезвучие в До мажоре',
      elements: [
        { type: ElementTypes.NOTE, note: Notes.DO },
        { type: ElementTypes.NOTE, note: Notes.MI },
        { type: ElementTypes.NOTE, note: Notes.SOL },
      ],
    },
    {
      title: 'Построй субдоминантное трезвучие в До мажоре',
      elements: [
        { type: ElementTypes.NOTE, note: Notes.FA },
        { type: ElementTypes.NOTE, note: Notes.LA },
        { type: ElementTypes.NOTE, note: Notes.DO },
      ],
    },
  ]);
}
