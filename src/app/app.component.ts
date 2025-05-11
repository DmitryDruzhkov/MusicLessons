import { ChangeDetectionStrategy, Component, inject, signal, Signal } from '@angular/core';
import { Sample1Component } from './components/sample1/sample1.component';
import { Sample2Component } from './components/sample2/sample2.component';
import { Task2, TasksService } from './services/tasks.service';
import { ElementTypes, Notes, Task } from './shared/interfaces';
import { Sample3Component } from './components/sample3/sample3.component';
import { Sample4Component } from './components/sample4/sample4.component';
import { Sample5Component } from './components/sample5/sample5.component';
import { Sample6Component } from './components/sample6/sample6.component';
import { noteElements } from './components/sample6/note.constants';
import { MusicGameComponent } from './components/sample7/sample7.component';
import { AppMusic8Component } from './components/sample8/sample8.component';

@Component({
  selector: 'app-root',
  imports: [Sample2Component, Sample3Component, Sample4Component, Sample5Component, Sample6Component, MusicGameComponent, AppMusic8Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private tasksService = inject(TasksService);

  public tasks:  Signal<Task2[]>  = this.tasksService.tasks;

  public noteElements = noteElements;

  public tasksDND: Signal<Task[]> = signal([
    {
      title: 'Размести ноты, что бы получилась гамма До мажор',
      elements: [
        { type: ElementTypes.NOTE, note: Notes.DO },
        { type: ElementTypes.NOTE, note: Notes.RE },
        { type: ElementTypes.NOTE, note: Notes.MI },
        { type: ElementTypes.NOTE, note: Notes.FA },
        { type: ElementTypes.NOTE, note: Notes.SOL },
        { type: ElementTypes.NOTE, note: Notes.LA },
        { type: ElementTypes.NOTE, note: Notes.SI },
      ]
    },
    {
      title: 'Построй тоническое трезвучие в До мажоре',
      elements: [
        { type: ElementTypes.NOTE, note: Notes.DO },
        { type: ElementTypes.NOTE, note: Notes.MI },
        { type: ElementTypes.NOTE, note: Notes.SOL },
      ]
    },
    {
      title: 'Построй субдоминантное трезвучие в До мажоре',
      elements: [
        { type: ElementTypes.NOTE, note: Notes.FA },
        { type: ElementTypes.NOTE, note: Notes.LA },
        { type: ElementTypes.NOTE, note: Notes.DO },
      ]
    },
  ]);
}
