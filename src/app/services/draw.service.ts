import { Injectable } from '@angular/core';
import { staffLines } from '../shared/constants';
import { Element } from '../shared/interfaces';

@Injectable()
export class DrawService {
  private ctx!: CanvasRenderingContext2D;

  public setCtx(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
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

  public drawElements(elements: Element[]) {
    elements.forEach((element: Element) => {
      switch (element.type) {
        case 'clef':
          this.drawClef(element);
          break;
        case 'accidental':
          this.drawAccidental(element);
          break;
        case 'note':
          this.drawNote(element);
          break;
      }
    });

    this.drawStepNumbers(elements);
  }

  public drawClef(element: Element) {
    this.drawTrebleClefImage(element.x, element.y);
  }

  public drawTrebleClefImage(x: number, y: number) {
    const img = new Image();
    img.src = 'clef/clef.png';
    img.onload = () => {
      this.ctx.drawImage(img, x, y /* - img.height / 2 */, 50, 100);
    };
  }

  public drawAccidental(element: Element) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.font = '20px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    this.ctx.fillText('#', element.x, element.y + 2);

    this.ctx.restore();
  }

  public drawNote(element: Element) {
    this.ctx.beginPath();
    this.ctx.arc(element.x, element.y, 10, 0, 2 * Math.PI);
    this.ctx.fillStyle = element.selected ? 'pink' : 'black';
    this.ctx.fill();
    this.ctx.fillStyle = 'black';
    /* this.ctx.fillText(element.name as string, element.x - 10, element.y + 20); */
  }

  public drawStepNumbers(elements: Element[]) {
    elements.forEach((element: Element) => {
      if (element.type === 'note' && element.stepNumber) {
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(element.stepNumber, element.x - 10, 110); // Рисуем под нотной сеткой
      }
    });
  }
}
