import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdkDragDrop, CdkDragEnd, CdkDragMove, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sample4',
  imports: [
    CommonModule,
    DragDropModule
  ],
  templateUrl: './sample4.component.html',
  styleUrl: './sample4.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sample4Component { 
  notes = [
    { id: 0, name: 'C', position: { x: 0, y: 0 }, originalPosition: { x: 0 * 60, y: 0 } },
    { id: 1, name: 'D', position: { x: 0, y: 0 }, originalPosition: { x: 1 * 60, y: 0 } },
    { id: 2, name: 'E', position: { x: 0, y: 0 }, originalPosition: { x: 2 * 60, y: 0 } },
    { id: 3, name: 'F', position: { x: 0, y: 0 }, originalPosition: { x: 3 * 60, y: 0 } },
    { id: 4, name: 'G', position: { x: 0, y: 0 }, originalPosition: { x: 4 * 60, y: 0 } },
    { id: 5, name: 'A', position: { x: 0, y: 0 }, originalPosition: { x: 5 * 60, y: 0 } },
    { id: 6, name: 'B', position: { x: 0, y: 0 }, originalPosition: { x: 6 * 60, y: 0 } }
  ];
  gridLines = Array.from({ length: 10 }, (_, i) => i * 50); // 10 lines, 50px apart
  occupiedLines: Set<number> = new Set();

  onDragEnded(event: CdkDragEnd, note: any) {
    const container = document.querySelector('.grid-container');
    if (!container) {
      this.returnNoteToOriginalPosition(note);
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const noteRect = event.source.element.nativeElement.getBoundingClientRect();
    const noteX = noteRect.left - containerRect.left + noteRect.width / 2;
    const noteY = noteRect.top - containerRect.top + noteRect.height / 2;

    /* if (noteX < 0 || noteX > containerRect.width || noteY < 0 || noteY > containerRect.height) {
      this.returnNoteToOriginalPosition(note);
      return;
    } */

    const closestLine = this.findClosestLine(noteX);
    console.log(closestLine)
    /* if (this.occupiedLines.has(closestLine)) {
      this.returnNoteToOriginalPosition(note);
    } else { */
      this.occupiedLines.add(closestLine);
      console.log({ x: closestLine - note.originalPosition.x, y: noteY - note.originalPosition.y })
      /* note.position = { x: closestLine - note.originalPosition.x, y: noteY - note.originalPosition.y }; */
    /* } */
  }

  findClosestLine(x: number): number {
    let closestLine = this.gridLines[0];
    let minDistance = Math.abs(this.gridLines[0] - x);

    for (let i = 1; i < this.gridLines.length; i++) {
      const distance = Math.abs(this.gridLines[i] - x);
      if (distance < minDistance) {
        minDistance = distance;
        closestLine = this.gridLines[i];
      }
    }

    return closestLine;
  }

  returnNoteToOriginalPosition(note: any) {
    note.position = note.originalPosition;
    setTimeout(() => {
      note.position = { x: 0, y: 0 };
    }, 500); // Длительность анимации возврата
  }
  
  onDragMoved($event: CdkDragMove, note: any) {
    console.log($event.pointerPosition);
    /* console.log($event.delta); */
  }

}
