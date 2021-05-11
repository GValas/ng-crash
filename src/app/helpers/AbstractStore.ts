import { BehaviorSubject, Subject } from 'rxjs';
import { logger } from '../decorators/logger';

export abstract class AbstractStore<T extends { id: string }> {
  protected _items$ = new BehaviorSubject<T[]>(null);
  protected _get$ = new Subject<boolean>();
  protected _set$ = new Subject<T>();
  protected _del$ = new Subject<T>();

  constructor() {}

  @logger()
  get() {
    return this._items$.asObservable();
  }

  @logger()
  triggerDelete(item: T) {
    this._del$.next(item);
  }

  @logger()
  triggerSet(item: T) {
    this._set$.next(item);
  }

  @logger()
  triggerUpdate() {
    this._get$.next(true);
  }
}
