import {
  Component,
  ElementRef,
  ViewChild,
  HostListener,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';

@Component({
  selector: 'app-music-game-8',
  standalone: true,
  imports: [CommonModule, InlineSVGModule],
  template: `
    <div class="container">
      <div class="note-line" #noteLine>
        <div
          *ngFor="let note of notes; let i = index"
          class="note"
          [ngStyle]="{ 'left.px': i * baseNotesStep }"
          (mousedown)="startDrag($event, note, false)"
        >
          {{ note.name }}
        </div>
      </div>

      <div class="music-grid" #grid>
        <div
          class="grid-line horizontal"
          *ngFor="let y of gridY"
          [style.top.px]="y"
        ></div>

        <div
          *ngFor="let note of placedNotes"
          class="note placed"
          [ngStyle]="{ 'top.px': note.y, 'left.px': note.x }"
          (mousedown)="startDrag($event, note, true)"
        >
          {{ note.name }}
        </div>

        <span class="clef" [inlineSVG]="'assets/clef.svg'"></span>

        <div
          *ngIf="draggingNote"
          class="note dragging"
          [ngStyle]="{
            'top.px': draggingNote.y - draggingNote.offsetY,
            'left.px': draggingNote.x - draggingNote.offsetX
          }"
        >
          {{ draggingNote.name }}
        </div>

        <div class="step-labels">
          <div
            *ngFor="let pos of correctPositions"
            class="step-label"
            [ngStyle]="{ 'left.px': pos.x }"
          >
            {{ pos.stepNumber }}
          </div>
        </div>
      </div>

      <button class="check-button" (click)="checkNotes()">Проверить</button>
      <p *ngIf="resultMessage">{{ resultMessage }}</p>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px;
      }

      .note-line {
        display: flex;
        gap: 10px;
        position: relative;
        height: 50px;
        width: 400px;
      }

      .note {
        width: 40px;
        height: 25px;
        background: lightblue;
        text-align: center;
        line-height: 24px;
        cursor: grab;
        border-radius: 50%;
        user-select: none;
        position: absolute;
        transition: top 0.3s ease, left 0.3s ease;
      }

      .music-grid {
        position: relative;
        width: 800px;
        height: 210px;
        margin-top: 20px;
      }

      .grid-line.horizontal {
        position: absolute;
        width: 100%;
        height: 1px;
        background: gray;
      }

      .step-labels {
        position: absolute;
        top: 180px;
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      .step-label {
        position: absolute;
        font-size: 12px;
        text-align: center;
      }

      .placed {
        background: lightcoral;
      }

      .dragging {
        background: orange;
        opacity: 0.7;
        pointer-events: none;
        transition: none;
      }

      .check-button {
        margin-top: 20px;
        padding: 10px 20px;
        cursor: pointer;
      }

      ::ng-deep {
        .clef {
          position: relative;
          left: 0;
          top: -46px;

          svg {
            height: 219px;
            width: auto;
          }
        }
      }
    `,
  ],
})
export class AppMusic8Component {
  @Input() correctPositions: {
    name: string;
    x: number;
    y: number;
    stepNumber?: string;
  }[] = [];

  public baseNotesStep = 50;

  private xStep: number = 75;
  private yStep: number = 30;

  public clifOffset: number = 200;

  gridY = Array.from({ length: 5 }, (_, i) => i * this.yStep);

  notes = [
    { name: 'До', id: 1 },
    { name: 'Ре', id: 2 },
    { name: 'Ми', id: 3 },
    { name: 'Фа', id: 4 },
    { name: 'Соль', id: 5 },
    { name: 'Ля', id: 6 },
    { name: 'Си', id: 7 },
  ];

  gridX = Array.from({ length: 8 }, (_, i) => i * this.xStep);
  placedNotes: any[] = [];
  draggingNote: any = null;

  @ViewChild('grid') grid!: ElementRef;
  @ViewChild('noteLine') noteLine!: ElementRef;

  startDrag(event: MouseEvent, note: any, isPlaced = false) {
    const element = event.target as HTMLElement;

    if (isPlaced) {
      this.placedNotes = this.placedNotes.filter((n) => n !== note);
    }

    const gridRect = this.grid.nativeElement.getBoundingClientRect();
    const offsetX = event.clientX - element.getBoundingClientRect().left;
    const offsetY = event.clientY - element.getBoundingClientRect().top;

    this.draggingNote = {
      ...note,
      originalX: element.offsetLeft,
      originalY: element.offsetTop,
      x: event.clientX - gridRect.left,
      y: event.clientY - gridRect.top,
      offsetX,
      offsetY,
    };
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.draggingNote) return;
    const gridRect = this.grid.nativeElement.getBoundingClientRect();
    this.draggingNote.x = event.clientX - gridRect.left;
    this.draggingNote.y = event.clientY - gridRect.top;
  }

  @HostListener('document:mouseup', [])
  stopDrag() {
    if (!this.draggingNote) return;

    let x = this.draggingNote.x - this.draggingNote.offsetX + 20;
    let y = this.draggingNote.y - this.draggingNote.offsetY + 12;

    const snappedX = Math.round(x / this.xStep) * this.xStep - 20;
    const snappedY = Math.round(y / this.yStep / 2) * (this.yStep / 2) - 12;

    const conflict = this.placedNotes.some((note) => note.x === snappedX);

    const isByClif: boolean = x < this.clifOffset;

    if (conflict || isByClif) {
      const note = document.createElement('div');
      note.className = 'note';
      note.style.position = 'absolute';
      note.style.left = `${this.draggingNote.originalX}px`;
      note.style.top = `${this.draggingNote.originalY}px`;
      note.textContent = this.draggingNote.name;
      note.style.background = 'lightblue';
      note.style.transition = 'top 0.3s ease, left 0.3s ease';
      this.noteLine.nativeElement.appendChild(note);

      setTimeout(() => {
        this.noteLine.nativeElement.removeChild(note);
      }, 300);
    } else {
      this.placedNotes.push({ ...this.draggingNote, x: snappedX, y: snappedY });
    }

    this.draggingNote = null;
  }

  checkNotes() {
    const isCorrect = this.correctPositions.every((correctNote) =>
      this.placedNotes.some(
        (placed) =>
          placed.name === correctNote.name &&
          placed.x === correctNote.x &&
          placed.y === correctNote.y
      )
    );

    this.resultMessage = isCorrect
      ? 'Все ноты установлены правильно!'
      : 'Ошибка! Попробуй еще раз.';
  }

  resultMessage = '';
}
