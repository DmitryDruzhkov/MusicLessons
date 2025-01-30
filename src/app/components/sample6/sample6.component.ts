import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export interface Note {
  x: number;
  y: number;
  name: string;
  isCorrect: boolean;
  isSelected: boolean;
}

const notes: Note[] = [
  { x: 50, y: 100, name: 'до', isCorrect: true, isSelected: false },
  { x: 100, y: 150, name: 'ре', isCorrect: true, isSelected: false },
  { x: 150, y: 200, name: 'ми', isCorrect: true, isSelected: false },
  { x: 200, y: 250, name: 'фа', isCorrect: false, isSelected: false }
];

@Component({
  selector: 'app-sample6',
  imports: [CommonModule],
  templateUrl: './sample6.component.html',
  styleUrl: './sample6.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sample6Component { 
  @Output() noteSelected = new EventEmitter<Note>();

  notes = notes;

  message: string = '';
  trebleClefImage = 'clef/clef.png'; // Путь к изображению скрипичного ключа

  // Позиции линий нотной сетки
  staffLines = [
    { x1: 50, y1: 100, x2: 450, y2: 100 },
    { x1: 50, y1: 120, x2: 450, y2: 120 },
    { x1: 50, y1: 140, x2: 450, y2: 140 },
    { x1: 50, y1: 160, x2: 450, y2: 160 },
    { x1: 50, y1: 180, x2: 450, y2: 180 }
  ];

  constructor() {
    // Инициализация нот на нотной сетке или между линиями
    const noteSpacing = 45; // Расстояние между нотами (1.5 размера ноты)
    this.notes = [
      { x: 100, y: 100, name: 'до', isCorrect: true, isSelected: false }, // На первой линии
      { x: 100 + noteSpacing, y: 110, name: 'ре', isCorrect: true, isSelected: false }, // Между первой и второй линиями
      { x: 100 + 2 * noteSpacing, y: 120, name: 'ми', isCorrect: true, isSelected: false }, // На второй линии
      { x: 100 + 3 * noteSpacing, y: 130, name: 'фа', isCorrect: false, isSelected: false }, // Между второй и третьей линиями
      { x: 100 + 4 * noteSpacing, y: 140, name: 'соль', isCorrect: true, isSelected: false } // На третьей линии
    ];
  }

  selectNote(note: Note) {
    note.isSelected = !note.isSelected;
    this.noteSelected.emit(note);
  }

  checkNotes() {
    const correctNotes = this.notes.filter(note => note.isCorrect && note.isSelected).length;
    const totalCorrect = this.notes.filter(note => note.isCorrect).length;
    if (correctNotes === totalCorrect) {
      this.message = 'Вы верно угадали все ноты!';
    } else {
      this.message = `Вы угадали ${correctNotes} из ${totalCorrect} верных нот.`;
    }
  }
}
