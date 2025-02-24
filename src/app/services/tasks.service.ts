import { Injectable, signal, Signal } from '@angular/core';
import { Task } from '../shared/interfaces';
import { XCoordinates, YCoordinates } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  public tasks: Signal<Task[]> = signal([
    {
      title: 'Соль мажор',
      elements: [
        { type: 'clef', y: 0, name: 'treble' }, // Скрипичный ключ
        { type: 'accidental', y: 10, name: 'sharp' }, // Диез
        { type: 'note', y: 70, name: 'соль', stepNumber: 'I', correct: true, selected: false },
        { type: 'note', y: 60, name: 'ля', stepNumber: 'II', correct: false, selected: false },
        { type: 'note', y: 40, name: 'до', stepNumber: 'III', correct: false, selected: false },
        { type: 'note', y: 30, name: 'ре', stepNumber: 'IV', correct: true, selected: false },
        { type: 'note', y: 20, name: 'ми', stepNumber: 'V', correct: false, selected: false }
      ]
    },
    {
      title: 'До мажор',
      elements: [
        { type: 'clef', y: 0, name: 'treble' }, // Скрипичный ключ
        { type: 'note', y: YCoordinates.DO_1, name: 'до', stepNumber: 'I', correct: true, selected: false },
        { type: 'note', y: YCoordinates.MI_1, name: 'ми', stepNumber: 'II', correct: true, selected: false },
        { type: 'note', y: YCoordinates.FA_1, name: 'фа', stepNumber: 'III', correct: false, selected: false },
        { type: 'note', y: YCoordinates.LYA_1, name: 'ля', stepNumber: 'IV', correct: false, selected: false },
        { type: 'note', y: YCoordinates.SOL_1, name: 'соль', stepNumber: 'V', correct: true, selected: false }
      ]
    },
    {
      title: 'Ля минор',
      elements: [
        { type: 'clef', y: 0, name: 'treble' }, // Скрипичный ключ
        { type: 'note', y: YCoordinates.DO_1, name: 'до', stepNumber: 'I', correct: true, selected: false },
        { type: 'note', y: YCoordinates.RE_1, name: 'ре', stepNumber: 'II', correct: true, selected: false },
        { type: 'note', y: YCoordinates.MI_1, name: 'ми', stepNumber: 'I', correct: true, selected: false },
        { type: 'note', y: YCoordinates.FA_1, name: 'фа', stepNumber: 'I', correct: true, selected: false },
        { type: 'note', y: YCoordinates.SOL_1, name: 'соль', stepNumber: 'I', correct: true, selected: false },
        { type: 'note', y: YCoordinates.LYA_1, name: 'ля', stepNumber: 'I', correct: true, selected: false },
        { type: 'note', y: YCoordinates.SI_1, name: 'си', stepNumber: 'I', correct: true, selected: false },
        { type: 'note', y: YCoordinates.DO_2, name: 'до', stepNumber: 'I', correct: true, selected: false },
        { type: 'note', y: YCoordinates.RE_2, name: 'ре', stepNumber: 'II', correct: true, selected: false },
        { type: 'note', y: YCoordinates.MI_2, name: 'ми', stepNumber: 'I', correct: true, selected: false },
        { type: 'note', y: YCoordinates.FA_2, name: 'фа', stepNumber: 'I', correct: true, selected: false },
        { type: 'note', y: YCoordinates.SOL_2, name: 'соль', stepNumber: 'I', correct: true, selected: false },
        { type: 'note', y: YCoordinates.LYA_2, name: 'ля', stepNumber: 'I', correct: true, selected: false },
        { type: 'note', y: YCoordinates.SI_2, name: 'си', stepNumber: 'I', correct: true, selected: false },
        { type: 'note', y: YCoordinates.DO_3, name: 'до', stepNumber: 'I', correct: true, selected: false },
        { type: 'note', y: YCoordinates.RE_3, name: 'ре', stepNumber: 'II', correct: true, selected: false },
        { type: 'note', y: YCoordinates.MI_3, name: 'ми', stepNumber: 'I', correct: true, selected: false },
        { type: 'note', y: YCoordinates.FA_3, name: 'фа', stepNumber: 'I', correct: true, selected: false },
        { type: 'note', y: YCoordinates.SOL_3, name: 'соль', stepNumber: 'I', correct: true, selected: false },
        { type: 'note', y: YCoordinates.LYA_3, name: 'ля', stepNumber: 'I', correct: true, selected: false },
        { type: 'note', y: YCoordinates.SI_3, name: 'си', stepNumber: 'I', correct: true, selected: false },
        { type: 'note', y: YCoordinates.DO_4, name: 'до', stepNumber: 'I', correct: true, selected: false },
        { type: 'note', y: YCoordinates.RE_4, name: 'ре', stepNumber: 'II', correct: true, selected: false },
        { type: 'note', y: YCoordinates.MI_4, name: 'ми', stepNumber: 'I', correct: true, selected: false },
        { type: 'note', y: YCoordinates.FA_4, name: 'фа', stepNumber: 'I', correct: true, selected: false },
        { type: 'note', y: YCoordinates.SOL_4, name: 'соль', stepNumber: 'I', correct: true, selected: false },
        { type: 'note', y: YCoordinates.LYA_4, name: 'ля', stepNumber: 'I', correct: true, selected: false },
        { type: 'note', y: YCoordinates.SI_4, name: 'си', stepNumber: 'I', correct: true, selected: false },

      ]
    }
  ]);
}
