import { Injectable, signal, Signal } from '@angular/core';
import { Task } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  public tasks: Signal<Task[]> = signal([
    {
      title: 'Соль мажор',
      elements: [
        { type: 'clef', x: 0, y: 0, name: 'treble' }, // Скрипичный ключ
        { type: 'accidental', x: 60, y: 10, name: 'sharp' }, // Диез
        { type: 'note', x: 110, y: 70, name: 'соль', stepNumber: 'I', correct: true, selected: false },
        { type: 'note', x: 160, y: 60, name: 'ля', stepNumber: 'II', correct: false, selected: false },
        { type: 'note', x: 210, y: 40, name: 'до', stepNumber: 'III', correct: false, selected: false },
        { type: 'note', x: 260, y: 30, name: 'ре', stepNumber: 'IV', correct: true, selected: false },
        { type: 'note', x: 310, y: 20, name: 'ми', stepNumber: 'V', correct: false, selected: false }
      ]
    },
    {
      title: 'Соль мажор 2',
      elements: [
        { type: 'clef', x: 0, y: 0, name: 'treble' }, // Скрипичный ключ
        { type: 'accidental', x: 60, y: 10, name: 'sharp' }, // Диез
        { type: 'note', x: 110, y: 70, name: 'соль', stepNumber: 'I', correct: true, selected: false },
        { type: 'note', x: 160, y: 60, name: 'ля', stepNumber: 'II', correct: false, selected: false },
        { type: 'note', x: 210, y: 40, name: 'до', stepNumber: 'III', correct: false, selected: false },
        { type: 'note', x: 260, y: 30, name: 'ре', stepNumber: 'IV', correct: true, selected: false },
        { type: 'note', x: 310, y: 20, name: 'ми', stepNumber: 'V', correct: false, selected: false }
      ]
    }
  ]);
}
