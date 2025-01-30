import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Sample1Component } from './components/sample1/sample1.component';
import { Sample2Component } from './components/sample2/sample2.component';
import { TasksService } from './services/tasks.service';
import { Task } from './shared/interfaces';
import { Sample3Component } from './components/sample3/sample3.component';
import { Sample4Component } from './components/sample4/sample4.component';
import { Sample5Component } from './components/sample5/sample5.component';
import { Sample6Component } from './components/sample6/sample6.component';

@Component({
  selector: 'app-root',
  imports: [Sample1Component, Sample2Component, Sample3Component, Sample4Component, Sample5Component, Sample6Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private tasksService = inject(TasksService);

  public tasks:  Signal<Task[]>  = this.tasksService.tasks;
}
