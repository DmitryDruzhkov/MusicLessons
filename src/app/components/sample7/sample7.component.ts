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
             [style.transform]="'translate(' + note.x + 'px, ' + note.y + 'px)'" 
             cdkDrag 
             (cdkDragStarted)="onDragStart($event, note)"
             (cdkDragMoved)="onDragMove($event, note)"
             (cdkDragEnded)="onDragEnd($event, note, i)">
          {{ note.name }}
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
             (cdkDragStarted)="onDragStart($event, note)"
             (cdkDragMoved)="onDragMove($event, note)"
             (cdkDragEnded)="onDragEnd($event, note, i)"
             [style.transform]="'translate(' + note.x + 'px, ' + note.y + 'px)'">
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
      width: 30px;
      height: 20px;
      background-color: lightblue;
      text-align: center;
      line-height: 20px;
      border-radius: 50%;
      cursor: grab;
      position: absolute;
      transition: transform 100ms ease;
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
  notes = [
    { name: 'C', x: 15, y: 10 }, { name: 'D', x: 75, y: 10 }, { name: 'E', x: 135, y: 10 },
    { name: 'F', x: 195, y: 10 }, { name: 'G', x: 255, y: 10 }, { name: 'A', x: 315, y: 10 },
    { name: 'B', x: 375, y: 10 }
  ];
  placedNotes: { name: string; x: number; y: number }[] = [];
  lines = new Array(5).fill(0).map((_, i) => ({ top: (i + 1) * 40 }));
  verticalLines = new Array(7).fill(0).map((_, i) => ({ left: i * 60 + 64 }));
  snapPoints = this.lines.flatMap(l => this.verticalLines.map(v => ({ x: v.left, y: l.top })));

  getClosestSnap(x: number, y: number) {
    return this.snapPoints.reduce((prev, curr) => {
      const prevDist = Math.hypot(prev.x - x, prev.y - y);
      const currDist = Math.hypot(curr.x - x, curr.y - y);
      return currDist < prevDist ? curr : prev;
    });
  }

  onDragStart(event: any, note: { name: string; x: number; y: number }) {
    note.x = event.source.getFreeDragPosition().x;
    note.y = event.source.getFreeDragPosition().y;
  }

  onDragMove(event: any, note: { name: string; x: number; y: number }) {
    note.x = event.source.getFreeDragPosition().x;
    note.y = event.source.getFreeDragPosition().y;
  }

  onDragEnd(event: any, note: { name: string; x: number; y: number }, index: number) {
    const boundingRect = event.source.element.nativeElement.getBoundingClientRect();
    const staffRect = document.querySelector('.staff-container')?.getBoundingClientRect();
    
    if (staffRect) {
      const centerX = boundingRect.left - staffRect.left + 15;
      const centerY = boundingRect.top - staffRect.top + 10;
      const { x, y } = this.getClosestSnap(centerX, centerY);
      
      if (!this.placedNotes.some(n => n.x === x && n.y === y)) {
        note.x = x;
        note.y = y;
        this.placedNotes.push(note);
        this.notes.splice(index, 1);
      } else {
        setTimeout(() => event.source.reset(), 100);
      }
    }
  }
}
