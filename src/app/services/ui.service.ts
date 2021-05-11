import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showAddTask$ = new BehaviorSubject<boolean>(true);

  constructor() {}

  toggleAddTask() {
    this.showAddTask$.next(!this.showAddTask$.getValue());
  }

  showAddTask() {
    return this.showAddTask$.asObservable();
  }
}
