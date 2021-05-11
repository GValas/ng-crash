import { logger } from '../decorators/logger';
import { AbstractStore } from './AbstractStore';

export class LocalStore<T extends { id: string }> extends AbstractStore<T> {
  constructor(private _items: T[]) {
    super();
    this.init();
  }

  @logger()
  private init() {
    this._get$.subscribe((_) => {
      this._items.sort((a: T, b: T) => (a.id > b.id ? 1 : -1));
      this._items$.next(this._items);
    });

    this._del$.subscribe((item) => {
      this._items = this._items.filter((i) => i.id != item.id);
      this.triggerUpdate();
    });

    this._set$.subscribe((item) => {
      this._items = [...this._items.filter((i) => i.id != item.id), item];
      this.triggerUpdate();
    });

    this.triggerUpdate();
  }
}
