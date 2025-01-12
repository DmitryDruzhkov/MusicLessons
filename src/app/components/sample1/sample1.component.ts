import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as Tone from "tone";

@Component({
  selector: 'app-sample1',
  imports: [FormsModule],
  templateUrl: './sample1.component.html',
  styleUrl: './sample1.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sample1Component {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private notes: { x: number, y: number, note: string }[] = [];
  public currentNote: string = 'C4';
  public notesList: string[] = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.drawStaff();
  }

  drawStaff() {
    const canvas = this.canvas.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.beginPath();
    for (let i = 1; i <= 5; i++) {
      this.ctx.moveTo(0, i * 20);
      this.ctx.lineTo(canvas.width, i * 20);
    }
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();
    this.drawNotes();
  }

  drawNotes() {
    this.notes.forEach(note => {
      this.ctx.beginPath();
      this.ctx.arc(note.x, note.y, 5, 0, 2 * Math.PI);
      this.ctx.fillStyle = 'black';
      this.ctx.fill();
    });
  }

  addNote(event: MouseEvent) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const noteY = Math.round(y / 20) * 20;
    this.notes.push({ x, y: noteY, note: this.currentNote });
    this.drawStaff();
  }

  playNotes() {
    const synth = new Tone.Synth().toDestination();
    let now = Tone.now();
    this.notes.forEach((note, index) => {
      synth.triggerAttackRelease(note.note, '8n', now + index * 0.5);
    });
  }
}
