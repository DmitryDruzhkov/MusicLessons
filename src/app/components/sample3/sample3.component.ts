import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

export interface Element {
  type: string;
  x: number;
  y: number;
  name?: string;
  stepNumber?: string;
  correct?: boolean;
  selected?: boolean;
}

@Component({
  selector: 'app-sample3',
  imports: [CommonModule],
  templateUrl: './sample3.component.html',
  styleUrl: './sample3.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sample3Component { 
  taskText = 'Перетащите ноты на нотную сетку в правильном порядке.';
  notes: Element[] = [
    { type: 'note', x: 0, y: 0, name: 'До' },
    { type: 'note', x: 0, y: 0, name: 'Ре' },
    { type: 'note', x: 0, y: 0, name: 'Ми' },
    { type: 'note', x: 0, y: 0, name: 'Фа' },
    { type: 'note', x: 0, y: 0, name: 'Соль' },
    { type: 'note', x: 0, y: 0, name: 'Ля' },
    { type: 'note', x: 0, y: 0, name: 'Си' }
  ];
  placedNotes: Element[] = [];
  correctNotes: Element[] = [
    { type: 'note', x: 100, y: 40, name: 'До', correct: true },
    { type: 'note', x: 120, y: 60, name: 'Ре', correct: true },
    { type: 'note', x: 140, y: 80, name: 'Ми', correct: true },
    { type: 'note', x: 160, y: 100, name: 'Фа', correct: true },
    { type: 'note', x: 180, y: 120, name: 'Соль', correct: true },
    { type: 'note', x: 200, y: 140, name: 'Ля', correct: true },
    { type: 'note', x: 220, y: 160, name: 'Си', correct: true }
  ];

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  dragStart(event: DragEvent, note: Element) {
    event.dataTransfer?.setData('text', note.name!);
    event.dataTransfer?.setData('note', JSON.stringify(note));
  }

  drop(event: DragEvent) {
    event.preventDefault();
    const noteData = event.dataTransfer?.getData('note');
    const note = JSON.parse(noteData as string) as Element;
    if (note) {
      note.x = Math.round(event.offsetX / 20) * 20; // Притягивание к шагу нотной сетки
      note.y = Math.round(event.offsetY / 20) * 20; // Притягивание к шагу нотной сетки
      this.placedNotes.push(note);
      this.notes = this.notes.filter(n => n.name !== note.name);
    }
  }

  checkTask() {
    let correctCount = 0;
    this.placedNotes.forEach(note => {
      const correctNote = this.correctNotes.find(n => n.name === note.name);
      if (correctNote && note.x === correctNote.x && note.y === correctNote.y) {
        note.correct = true;
        correctCount++;
      } else {
        note.correct = false;
      }
    });
    alert(`Верно установлено нот: ${correctCount} из ${this.placedNotes.length}`);
  }
}
