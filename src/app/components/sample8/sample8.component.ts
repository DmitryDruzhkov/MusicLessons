import {
  Component,
  ElementRef,
  ViewChild,
  HostListener,
  InputSignal,
  input,
  computed,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import {
  CorrectNote,
  NoteElement,
  DragNoteElement,
  Task,
  TaskElement,
} from '../../shared/interfaces';
import { CorrectNotes } from '../../shared/constants';

@Component({
  selector: 'app-music-game-8',
  standalone: true,
  imports: [CommonModule, InlineSVGModule],
  template: `
    <div class="container">
      <div class="title">
        {{ task().title }}
      </div>
      <div class="note-line" #noteLine>
        <div
          *ngFor="let note of notes(); let i = index"
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
          *ngFor="let note of placedNotes()"
          class="note placed"
          [ngStyle]="{ 'top.px': note.y, 'left.px': note.x }"
          (mousedown)="startDrag($event, note, true)"
        >
          {{ note.name }}
          @if (note.isWithSubLine) {
          <div class="subline"></div>
          }
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

        <!-- <div class="step-labels">
          <div
            *ngFor="let pos of task().elements"
            class="step-label"
            [ngStyle]="{ 'left.px': pos.x }"
          >
            {{ pos.stepNumber }}
          </div>
        </div> -->
      </div>

      <button
        [disabled]="isCanCheck() === false"
        class="check-button"
        (click)="checkNotes()"
      >
        Проверить
      </button>
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

      .title {
        margin-bottom: 18px;
      }

      .note-line {
        display: flex;
        gap: 10px;
        position: relative;
        height: 50px;
        width: 400px;
      }

      .subline {
        width: 60px;
        display: flex;
        border: 1px solid;
        position: relative;
        bottom: 12px;
        left: -11px;
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
        height: 180px;
        margin-top: 50px;
      }

      .grid-line.horizontal {
        position: absolute;
        width: 100%;
        height: 1px;
        background: gray;
      }

      .step-labels {
        margin-left: 170px;
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
        background: lightblue;
      }

      .dragging {
        background: lightblue;
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
  public task: InputSignal<Task> = input.required<Task>();

  @ViewChild('grid') grid!: ElementRef;
  @ViewChild('noteLine') noteLine!: ElementRef;

  public isCanCheck: Signal<boolean> = computed(() => {
    const notesLength: number = this.notes().length;
    const placedNotesLength: number = this.placedNotes().length;

    return notesLength === placedNotesLength;
  });

  public baseNotesStep = 50;

  private xStep: number = 75;
  private yStep: number = 30;
  private dragElement!: HTMLElement;

  public clifOffset: number = 200;

  public gridY = Array.from({ length: 5 }, (_, i) => i * this.yStep);

  public notes: Signal<NoteElement[]> = computed(() => {
    return this.task()
      .elements.map((element: TaskElement) => {
        const correctNote: CorrectNote | undefined = CorrectNotes.get(
          element.note
        );

        if (correctNote) {
          return {
            ...element,
            ...correctNote,
          };
        }

        return null;
      })
      .filter(Boolean) as NoteElement[];
  });

  public placedNotes: WritableSignal<DragNoteElement[]> = signal([]);
  public draggingNote: DragNoteElement | null = null;

  public startDrag(event: MouseEvent, note: NoteElement, isPlaced = false) {
    this.dragElement = event.target as HTMLElement;

    if (isPlaced) {
      this.placedNotes.set(this.placedNotes().filter((n) => n !== note));
    }

    const gridRect = this.grid.nativeElement.getBoundingClientRect();
    const offsetX: number =
      event.clientX - this.dragElement.getBoundingClientRect().left;
    const offsetY: number =
      event.clientY - this.dragElement.getBoundingClientRect().top;

    this.draggingNote = {
      ...note,
      originalX: this.dragElement.offsetLeft,
      originalY: this.dragElement.offsetTop,
      x: event.clientX - gridRect.left,
      y: event.clientY - gridRect.top,
      offsetX,
      offsetY,
    };
  }

  @HostListener('document:mousemove', ['$event'])
  public onMouseMove(event: MouseEvent) {
    if (!this.draggingNote) return;
    const gridRect = this.grid.nativeElement.getBoundingClientRect();
    this.draggingNote.x = event.clientX - gridRect.left;
    this.draggingNote.y = event.clientY - gridRect.top;
  }

  @HostListener('document:mouseup', [])
  public stopDrag() {
    if (!this.draggingNote) return;

    let x = (this.draggingNote.x as number) - this.draggingNote.offsetX + 20;
    let y = this.draggingNote.y - this.draggingNote.offsetY + 12;

    const snappedX = Math.round(x / this.xStep) * this.xStep - 20;
    const snappedY = Math.round(y / (this.yStep / 2)) * (this.yStep / 2) - 12;

    const conflict = this.placedNotes().some((note) => note.x === snappedX);

    const isByClif: boolean = x < this.clifOffset;

    if (conflict || isByClif) {
      this.setToDefaultPlace(
        snappedX,
        snappedY,
        this.draggingNote.originalX,
        this.draggingNote.originalY
      );
    } else {
      this.placedNotes.set([
        ...this.placedNotes(),
        {
          ...this.draggingNote,
          x: snappedX,
          y: snappedY,
          isWithSubLine: this.isWithSubLine(snappedY),
        },
      ]);
    }

    this.draggingNote = null;
  }

  private setToDefaultPlace(
    x: number,
    y: number,
    originalX: number,
    originalY: number
  ) {
    const note = document.createElement('div');
    note.className = 'note';
    note.style.position = 'absolute';
    note.style.left = `${x}px`;
    note.style.top = `${y}px`;
    note.textContent = this.draggingNote?.name || '';
    note.style.background = 'lightblue';
    this.grid.nativeElement.appendChild(note);

    setTimeout(() => {
      note.style.transition = 'top 0.3s ease, left 0.3s ease';
      note.style.left = `${originalX}px`;
      note.style.top = `${originalY}px`;
    }, 0);

    setTimeout(() => {
      this.grid.nativeElement.removeChild(note);
    }, 300);
  }

  private isWithSubLine(y: number): boolean {
    if (y > 120) {
      if ((y + 12) % 30 === 0) {
        return true;
      }
    } else if (y < 0) {
      if ((y + 12) % 30 === 0) {
        return true;
      }
    }

    return false;
  }

  public checkNotes() {
    const isCorrect = this.placedNotes().every((placed: DragNoteElement) => {
      if (CorrectNotes.has(placed.note)) {
        const correctNote: CorrectNote = CorrectNotes.get(
          placed.note
        ) as CorrectNote;
        const isCorrect = placed.y === correctNote.y;
        return isCorrect;
      }

      return false;
    });

    this.resultMessage = isCorrect
      ? 'Все ноты установлены правильно!'
      : 'Ошибка! Попробуй еще раз.';
  }

  resultMessage = '';
}
