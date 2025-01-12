import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Sample1Component } from './components/sample1/sample1.component';
import { Sample2Component } from './components/sample2/sample2.component';
import { TasksService } from './services/tasks.service';
import { Task } from './shared/interfaces';

@Component({
  selector: 'app-root',
  imports: [Sample1Component, Sample2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private tasksService = inject(TasksService);

  public tasks:  Signal<Task[]>  = this.tasksService.tasks;
}
