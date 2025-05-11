import { ElementRef, Injectable } from '@angular/core';
import { staffLines } from '../shared/constants';
import { NoteElement, ElementTypes } from '../shared/interfaces';
import { TaskElement2 } from './tasks.service';

@Injectable()
export class DrawService {
  private ctx!: CanvasRenderingContext2D;
  private canvas!: ElementRef<HTMLCanvasElement>;
  public notePositions: { [key: string]: number } = {};

  public setCtx(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  public setCanvas(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas
  }

  public drawStaff() {
    staffLines.forEach((y) => {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(500, y);
      this.ctx.stroke();
    });
  }

  public scaleCanvas(scale: number) {
    this.ctx.scale(scale, scale);
  }

  public drawElements(elements: TaskElement2[]) {
    this.clearCanvas(); // Очищаем Canvas перед рисованием
    let x = 0;

    elements.forEach((element: TaskElement2) => {
      switch (element.type) {
        case ElementTypes.CLEF:
          this.drawClef(element, x);
          x += 60;
          break;
        case ElementTypes.ACCIDENTAL:
          this.drawAccidental(element, x);
          x += 50;
          break;
        case ElementTypes.NOTE:
          this.notePositions[element.name as string] = x; // Сохраняем позицию ноты
          this.drawNote(element, x);
          x += 50;
          break;
      }
    });

    this.drawStepNumbers(elements);
  }

  public drawClef(element: TaskElement2, x: number) {
    this.drawTrebleClefImage(x, element.y);
  }

  public drawTrebleClefImage(x: number, y: number) {
    const img = new Image();
    img.src = 'assets/clef.png';
    img.onload = () => {
      this.ctx.drawImage(img, x, y /* - img.height / 2 */, 50, 100);
    };
  }

  public drawAccidental(element: TaskElement2, x: number) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.font = '30px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    this.ctx.fillText('#', x, element.y + 2);

    this.ctx.restore();
  }

  public drawNote(element: TaskElement2, x: number) {
    this.ctx.beginPath();
    this.ctx.arc(x, element.y, 10, 0, 2 * Math.PI);
    if (element.selected) {
      this.ctx.fillStyle = 'black'; // Заливка черным цветом для нажатых нот
      this.ctx.fill();
    } else {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0)'; // Прозрачная заливка для ненажатых нот
      this.ctx.fill();
      this.ctx.strokeStyle = 'black'; // Контур черным цветом для ненажатых нот
      this.ctx.stroke();
    }
    this.ctx.closePath(); // Закрываем путь, чтобы избежать рисования контура
    this.ctx.fillStyle = 'black'; // Возвращаем черный цвет для текста
    this.ctx.fillText(element.name as string, x - 10, element.y + 20);
  }

  public drawStepNumbers(elements: TaskElement2[]) {
    for (const key in this.notePositions) {
      const x = this.notePositions[key];
      const element = elements.find(e => e.name === key);
      if (element && element.stepNumber) {
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(element.stepNumber, x - 10, 110); // Рисуем под нотной сеткой
      }
    }
  }

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.drawStaff(); // Перерисовываем нотный стан после очистки
  }
}
