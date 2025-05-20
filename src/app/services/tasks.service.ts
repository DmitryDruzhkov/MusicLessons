import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { ElementTypes, Notes, TaskDNDOld, TaskDND } from '../shared/interfaces';
import { taskDND, tasksDNDOld } from './tasks.dnd';
import { tasksCheck } from './task.check';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public tasksDNDOld: WritableSignal<TaskDNDOld[]> = signal(tasksDNDOld);

  public tasksCheck: WritableSignal<TaskDNDOld[]> = signal(tasksCheck);

  public tasksDND: Signal<TaskDND[]> = signal(taskDND);
}
