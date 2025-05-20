import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Sample2Component } from './components/sample2/sample2.component';
import { TasksService } from './services/tasks.service';
import { TaskDND, TaskDNDOld } from './shared/interfaces';
import { noteElements } from './components/sample6/note.constants';
import { AppMusicDNDComponent } from './components/dnd/dnd.component';
import { AppMusicCheckComponent } from './components/check/check.component';

@Component({
  selector: 'app-root',
  imports: [Sample2Component, AppMusicDNDComponent, AppMusicCheckComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private tasksService = inject(TasksService);

  public tasksDNDOld:  Signal<TaskDNDOld[]>  = this.tasksService.tasksDNDOld;

  public tasksCheck:  Signal<TaskDNDOld[]>  = this.tasksService.tasksCheck;

  public tasksDND:  Signal<TaskDND[]>  = this.tasksService.tasksDND;

  public noteElements = noteElements;
}
