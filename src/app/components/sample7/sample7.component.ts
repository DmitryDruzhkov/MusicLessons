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
             (cdkDragEnded)="onDragEnd($event, note, i)">
          {{ note.name }}
        </div>
      </div>

      <div class="staff-container">
        <div *ngFor="let line of lines" class="staff-line" [style.top.px]="line.top"></div>
        <div *ngFor="let vline of verticalLines" 
             class="staff-vertical-line" 
             [style.left.px]="vline.left"></div>
        <div *ngFor="let note of placedNotes" 
             class="note" 
             cdkDrag
             (cdkDragStarted)="onDragStart($event, note)"
             (cdkDragEnded)="onDragEnd($event, note, -1)"
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
      justify-content: center;
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
    { name: 'C', x: 100, y: 0 }, { name: 'D', x: 160, y: 0 }, { name: 'E', x: 220, y: 0 },
    { name: 'F', x: 280, y: 0 }, { name: 'G', x: 340, y: 0 }, { name: 'A', x: 400, y: 0 },
    { name: 'B', x: 460, y: 0 }
  ];
  placedNotes: { name: string; x: number; y: number }[] = [];
  lines = new Array(5).fill(0).map((_, i) => ({ top: (i + 1) * 40 }));
  verticalLines = new Array(7).fill(0).map((_, i) => ({ left: i * 60 + 64 }));
  snapPoints = this.lines.flatMap(l => this.verticalLines.map(v => ({ x: v.left, y: l.top })));

  onDragStart(event: any, note: { name: string; x: number; y: number }) {
    // Удаляем ноту из списка размещенных, если она уже была размещена
    this.placedNotes = this.placedNotes.filter(n => !(n.name === note.name && n.x === note.x && n.y === note.y));
  }

  onDragEnd(event: any, note: { name: string; x: number; y: number }, index: number) {
    const boundingRect = event.source.element.nativeElement.getBoundingClientRect();
    const staffRect = document.querySelector('.staff-container')?.getBoundingClientRect();
    
    if (staffRect) {
      const centerX = boundingRect.left - staffRect.left + boundingRect.width / 2;
      const centerY = boundingRect.top - staffRect.top + boundingRect.height / 2;
      const closest = this.getClosestSnap(centerX, centerY);
      
      if (!this.placedNotes.some(n => n.x === closest.x && n.y === closest.y)) {
        note.x = closest.x;
        note.y = closest.y;
        this.placedNotes.push(note);
        if (index !== -1) {
          this.notes.splice(index, 1);
        }
      } else {
        setTimeout(() => event.source.reset(), 100);
      }
    }
  }

  getClosestSnap(x: number, y: number) {
    return this.snapPoints.reduce((prev, curr) => {
      const prevDist = Math.hypot(prev.x - x, prev.y - y);
      const currDist = Math.hypot(curr.x - x, curr.y - y);
      return currDist < prevDist ? curr : prev;
    });
  }
}