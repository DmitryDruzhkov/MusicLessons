import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Sample2Component } from './components/sample2/sample2.component';
import { Task2, TasksService } from './services/tasks.service';
import { Task } from './shared/interfaces';
import { noteElements } from './components/sample6/note.constants';
import { AppMusicDNDComponent } from './components/dnd/sample8.component';

@Component({
  selector: 'app-root',
  imports: [Sample2Component, AppMusicDNDComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private tasksService = inject(TasksService);

  public tasks:  Signal<Task2[]>  = this.tasksService.tasks;

  public tasksDND:  Signal<Task[]>  = this.tasksService.tasksDND;

  public noteElements = noteElements;
}
