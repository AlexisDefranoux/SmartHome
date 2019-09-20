import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {URL_SERVER} from '../constants/urls';
import { Observable } from 'rxjs/Observable';
import { catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import {Mode} from '../models/mode';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ModeService {
  modes: Mode[];

  private urlService = URL_SERVER + '/mode';
  public defaultPlace = null;

  constructor(private http: HttpClient) { }

  /** GET places from the server */
  getModes (): Observable<Mode[]> {
    return this.http.get<Mode[]>(this.urlService)
      .pipe(
        tap((modes: Mode[]) => console.log(`fetched modes`)),
        catchError(this.handleError('getPlaces', []))
      );
  }

  getModeById(id: number): Observable<Mode> {
    return this.http.get<Mode>(`${this.urlService}/${id}`)
      .pipe(
        map(mode => mode), // returns a {0|1} element array
        tap((mode: Mode) => console.log(`fetched place by id`)),
        catchError(this.handleError<Mode>(`getModeById id=${id}`))
      );
  }

  /** POST: add a new place to the server */
  addMode(mode: Mode): Observable<Mode> {
    return this.http.post<Mode>(this.urlService, mode, httpOptions).pipe(
      tap((mode2: Mode) => console.log(`added mode ${mode2}`)),
      catchError(this.handleError<Mode>('addMode'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
