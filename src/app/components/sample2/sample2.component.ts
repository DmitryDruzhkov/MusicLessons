import { ChangeDetectionStrategy, Component, ElementRef, inject, input, ViewChild } from '@angular/core';
import { Task } from '../../shared/interfaces';
import { DrawService } from '../../services/draw.service';

@Component({
  selector: 'app-sample2',
  imports: [],
  templateUrl: './sample2.component.html',
  styleUrl: './sample2.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DrawService]
})
export class Sample2Component { 
  public task = input.required<Task>();

  private drawService = inject(DrawService);

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  
  public resultMessage: string = '';
  private scaleFactor: number = 1.5;

  public ngAfterViewInit() {
    this.setContext();

    this.drawService.scaleCanvas(this.scaleFactor); 
    this.drawService.drawStaff();
    this.drawService.drawElements(this.task().elements);
  }

  public selectNote(event: MouseEvent) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = (event.clientX - rect.left) / this.scaleFactor;
    const y = (event.clientY - rect.top) / this.scaleFactor;

    this.task().elements.forEach(element => {
      if (element.type === 'note') {
        const dx = this.drawService.notePositions[element.name as string] - x;
        const dy = element.y - y;
        if (Math.sqrt(dx * dx + dy * dy) < 10) {
          element.selected = !element.selected;
          this.drawService.drawElements(this.task().elements);
        }
      }
    });
  }

  public checkNotes() {
    const correctNotes = this.task().elements.filter(element => element.correct && element.selected).length;
    const totalCorrectNotes = this.task().elements.filter(element => element.correct).length;

    if (correctNotes === totalCorrectNotes) {
      this.resultMessage = `Правильно! Выбрано правильно: ${correctNotes}`;
    } else {
      this.resultMessage = `Неправильно. Выбрано правильно: ${correctNotes}`;
    }
  }
  
  private setContext() {
    const ctx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    this.drawService.setCtx(ctx);
    this.drawService.setCanvas(this.canvas);
  }
}
