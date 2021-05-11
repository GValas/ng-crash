import { HttpClient } from '@angular/common/http';
import { shareReplay, switchMap } from 'rxjs/operators';
import { logger } from '../decorators/logger';
import { AbstractStore } from './AbstractStore';

export class HttpStore<T extends { id: string }> extends AbstractStore<T> {
  constructor(private apiUrl: string, private http: HttpClient) {
    super();
    this.init()
  }
 
  @logger()
  private init() {
    this._get$
      .pipe(
        switchMap((b) => {
          return this.http.get<T[]>(this.apiUrl); //.pipe(take(1));
        }),
        shareReplay(1)
      )
      .subscribe((items) => this._items$.next(items));

    this._del$
      .pipe(
        switchMap((item) => {
          const url = `${this.apiUrl}/${item.id}`;
          return this.http.delete<T>(url);
        })
      )
      .subscribe(() => this.triggerUpdate());

    this._set$
      .pipe(
        switchMap((item) => {
          const url = `${this.apiUrl}/${item.id}`;
          return this.http.put<T>(url, item);
        })
      )
      .subscribe(() => this.triggerUpdate());

    // init values
    this.triggerUpdate();
  }
}
