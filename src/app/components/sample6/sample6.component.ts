import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Clef, NoteType, Note, Sign, NoteElement } from './note.interface';

@Component({
  selector: 'app-sample6',
  imports: [CommonModule],
  templateUrl: './sample6.component.html',
  styleUrl: './sample6.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sample6Component { 
  @Input() noteElements: NoteElement[] = []; // Массив элементов для отрисовки
  @Output() noteSelected = new EventEmitter<Note>();
  message: string = '';

  // Позиции линий нотной сетки
  staffLines = [
    { x1: 50, y1: 100, x2: 450, y2: 100 },
    { x1: 50, y1: 130, x2: 450, y2: 130 },
    { x1: 50, y1: 160, x2: 450, y2: 160 },
    { x1: 50, y1: 190, x2: 450, y2: 190 },
    { x1: 50, y1: 220, x2: 450, y2: 220 }
  ];

  // Получение изображения ключа
  getClefImage(clef: Clef): string {
    return clef.clefType === 'treble' ? 'assets/treble-clef.svg' : 'assets/bass-clef.svg';
  }

  // Получение изображения знака
  getSignImage(sign: Sign): string {
    return sign.signType === 'sharp' ? 'assets/sharp.svg' : 'assets/flat.svg';
  }

  // Выбор ноты
  selectNote(note: Note) {
    note.isSelected = !note.isSelected;
    this.noteSelected.emit(note);
  }

  // Проверка нот
  checkNotes() {
    const notes = this.noteElements.filter(e => e.type === 'note') as Note[];
    const correctNotes = notes.filter(note => note.isCorrect && note.isSelected).length;
    const totalCorrect = notes.filter(note => note.isCorrect).length;
    if (correctNotes === totalCorrect) {
      this.message = 'Вы верно угадали все ноты!';
    } else {
      this.message = `Вы угадали ${correctNotes} из ${totalCorrect} верных нот.`;
    }
  }
}
