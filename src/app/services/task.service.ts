import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { AbstractStore } from '../helpers/AbstractStore';
import { LocalStore } from '../helpers/LocalStore';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  updateTask(task: Task) {
    this.store.triggerSet(task);
  }

  removeTask(task: Task) {
    this.store.triggerDelete(task);
  }

  getTasks() {
    return this.store.get();
  }

  private store: AbstractStore<Task>;

  constructor() {
    // this.store = new HttpStore<Task>('http://localhost:5000/tasks', http);
    this.store = new LocalStore<Task>(defaultTasks);
  }
}

const defaultTasks: Task[] = [
  {
    id: '16ad523a-29bb-4379-92eb-943d4fba56e7',
    text: 'Doctors Appointment',
    day: 'May 5th at 2:30pm',
    reminder: false,
  },
  {
    id: '89139779-fa5d-48ec-9512-6da6936c6beb',
    text: 'Meeting at School',
    day: 'May 6th at 2:30pm',
    reminder: true,
  },
  {
    id: 'f7ec4813-089e-4a03-be26-b9e83d034f23',
    text: 'Food Shopping',
    day: 'May 7th at 12:30pm',
    reminder: false,
  },
];
