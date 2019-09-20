import { Injectable } from '@angular/core';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {URL_SERVER} from '../constants/urls';
import {HttpClient} from '@angular/common/http';
import {State} from '../models/state';
import {Mishap} from '../models/mishap';

@Injectable()
export class StateService {

  private urlService = URL_SERVER + '/state';

  constructor(private http: HttpClient) { }

  /** GET states from the server */
  getStates (): Observable<State[]> {
    return this.http.get<State[]>(this.urlService)
      .pipe(
        tap((states: State[]) => console.log(`fetched states`)),
        catchError(this.handleError('getStates', []))
      );
  }

  /** GET mishap by id. Will 404 if id not found */
  getStateById(id: number): Observable<State> {
    const url = `${this.urlService}/${id}`;
    return this.http.get<State>(url).pipe(
      tap((state: State) => console.log(`fetched state id=${id}`)),
      catchError(this.handleError<State>(`getState id=${id}`))
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
