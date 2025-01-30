import { CdkDragEnd, DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sample5',
  imports: [
    CommonModule,
    DragDropModule,
    ScrollingModule
  ],
  templateUrl: './sample5.component.html',
  styleUrl: './sample5.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sample5Component {
  notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  staffLines = [1, 2, 3, 4]; // 4 линии нотного стана

  // Рассчитаем координаты для оси X
  notePositions: number[] = [];

  constructor() {
    this.calculateNotePositions();
  }

  calculateNotePositions() {
    const containerWidth = 800; // Ширина контейнера для нот
    const noteCount = this.notes.length;
    const gap = containerWidth / (noteCount + 1);

    this.notePositions = this.notes.map((_, index) => gap * (index + 1));
  }

  onDragEnded(event: CdkDragEnd, index: number) {
    const element = event.source.getRootElement();
    const boundingRect = element.getBoundingClientRect();
    const x = boundingRect.x + boundingRect.width / 2;

    // Находим ближайшую позицию на оси X
    const closestPosition = this.notePositions.reduce((prev, curr) => {
      return (Math.abs(curr - x) < Math.abs(prev - x) ? curr : prev);
    });

    // Устанавливаем новую позицию для ноты
    event.source._dragRef.setFreeDragPosition({ x: closestPosition - boundingRect.width / 2, y: 0 });
  }
}
