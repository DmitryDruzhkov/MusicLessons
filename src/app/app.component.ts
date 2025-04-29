import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Sample1Component } from './components/sample1/sample1.component';
import { Sample2Component } from './components/sample2/sample2.component';
import { TasksService } from './services/tasks.service';
import { ElementTypes, Task } from './shared/interfaces';
import { Sample3Component } from './components/sample3/sample3.component';
import { Sample4Component } from './components/sample4/sample4.component';
import { Sample5Component } from './components/sample5/sample5.component';
import { Sample6Component } from './components/sample6/sample6.component';
import { noteElements } from './components/sample6/note.constants';
import { MusicGameComponent } from './components/sample7/sample7.component';
import { AppMusic8Component } from './components/sample8/sample8.component';

@Component({
  selector: 'app-root',
  imports: [Sample1Component, Sample2Component, Sample3Component, Sample4Component, Sample5Component, Sample6Component, MusicGameComponent, AppMusic8Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private tasksService = inject(TasksService);

  public tasks:  Signal<Task[]>  = this.tasksService.tasks;

  public noteElements = noteElements;

  public task: Task = {
    title: 'Поставь ноты в правильном порядке',
    elements: [
      { type: ElementTypes.NOTE, name: 'До', x: 50, y: 180, stepNumber: 'V' },
      { type: ElementTypes.NOTE, name: 'Ре', x: 125, y: 150, stepNumber: 'V' },
      { type: ElementTypes.NOTE, name: 'Ми', x: 200, y: 120, stepNumber: 'V' },
      { type: ElementTypes.NOTE, name: 'Фа', x: 275, y: 90, stepNumber: 'V' },
      { type: ElementTypes.NOTE, name: 'Соль', x: 350, y: 60, stepNumber: 'V' },
    ]
  };
}

/* name До x 205 y 138
name Ре x 280 y 108
name Ре x 280 y 123
name Ми x 355 y 108
name Фа x 430 y 93
name Соль x 505 y 78
name Ля x 580 y 63
name Си x 655 y 48 */
