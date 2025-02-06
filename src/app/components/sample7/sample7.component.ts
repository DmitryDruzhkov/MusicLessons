import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-music-game',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  template: `
    <div class="game-container">
      <h2>Размести ноты на нотной сетке</h2>
      
      <div class="note-palette">
        <div *ngFor="let note of notes; let i = index" 
             class="note" 
             [style.left.px]="originalPositions[i].x" 
             cdkDrag 
             (cdkDragEnded)="onDragEnd($event, note, i)">
          {{ note }}
        </div>
      </div>

      <div class="staff-container">
        <div *ngFor="let line of lines" class="staff-line" [style.top.px]="line.top"></div>
        <div *ngFor="let vline of verticalLines" 
             class="staff-vertical-line" 
             [style.left.px]="vline.left"></div>
        <div *ngFor="let note of placedNotes; let i = index" 
             class="note" 
             cdkDrag
             (cdkDragEnded)="onDragMove($event, note, i)"
             [style.top.px]="note.y - 20" 
             [style.left.px]="note.x - 20">
          {{ note.name }}
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .game-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .note-palette {
      display: flex;
      gap: 20px;
      margin-bottom: 64px;
      position: relative;
    }
    .note {
      width: 40px;
      height: 40px;
      background-color: lightblue;
      text-align: center;
      line-height: 40px;
      border-radius: 50%;
      cursor: grab;
      position: absolute;
      transition: top 200ms ease, left 200ms ease;
    }
    .staff-container {
      width: 500px;
      height: 200px;
      position: relative;
      border: 1px solid black;
      overflow: hidden;
      padding-left: 64px;
    }
    .staff-line {
      height: 2px;
      background-color: black;
      width: 100%;
      position: absolute;
    }
    .staff-vertical-line {
      width: 2px;
      height: 100%;
      background-color: black;
      position: absolute;
      opacity: 0.3;
      font-style: italic;
    }
    `
  ]
})
export class MusicGameComponent {
  notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  placedNotes: { name: string; x: number; y: number }[] = [];
  lines = new Array(5).fill(0).map((_, i) => ({ top: (i + 1) * 40 }));
  verticalLines = new Array(7).fill(0).map((_, i) => ({ left: i * 60 + 64 }));
  originalPositions = this.notes.map((_, i) => ({ x: i * 60, y: 0 }));
  snapPoints = this.lines.flatMap(l => this.verticalLines.map(v => ({ x: v.left, y: l.top })));

  getClosestSnap(x: number, y: number) {
    return this.snapPoints.reduce((prev, curr) => {
      const prevDist = Math.hypot(prev.x - x, prev.y - y);
      const currDist = Math.hypot(curr.x - x, curr.y - y);
      return currDist < prevDist ? curr : prev;
    });
  }

  onDragEnd(event: any, note: string, index: number) {
    const boundingRect = event.source.element.nativeElement.getBoundingClientRect();
    const staffRect = document.querySelector('.staff-container')?.getBoundingClientRect();
    
    if (staffRect) {
      const { x, y } = this.getClosestSnap(boundingRect.left - staffRect.left, boundingRect.top - staffRect.top);
      
      if (!this.placedNotes.some(n => n.x === x && n.y === y)) {
        this.placedNotes.push({ name: note, x, y });
        this.notes = this.notes.filter(n => n !== note);
      } else {
        event.source.element.nativeElement.style.transition = 'top 200ms ease, left 200ms ease';
        event.source.reset();
      }
    }
  }

  onDragMove(event: any, note: { name: string; x: number; y: number }, index: number) {
    const boundingRect = event.source.element.nativeElement.getBoundingClientRect();
    const staffRect = document.querySelector('.staff-container')?.getBoundingClientRect();
    
    if (staffRect) {
      const { x, y } = this.getClosestSnap(boundingRect.left - staffRect.left, boundingRect.top - staffRect.top);
      
      if (!this.placedNotes.some(n => n.x === x && n.y === y)) {
        note.x = x;
        note.y = y;
      } else {
        event.source.element.nativeElement.style.transition = 'top 200ms ease, left 200ms ease';
        event.source.reset();
      }
    }
  }
}
