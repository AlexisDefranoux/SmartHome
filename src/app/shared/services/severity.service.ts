import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {URL_SERVER} from '../constants/urls';
import { Observable } from 'rxjs/Observable';
import { catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Severity } from '../models/severity';

@Injectable()
export class SeverityService {

  private urlService = URL_SERVER + '/severity';

  constructor(private http: HttpClient) { }

  /** GET emergencies from the server */
  getSeverities (): Observable<Severity[]> {
    return this.http.get<Severity[]>(this.urlService)
      .pipe(
        tap((severities: Severity[]) => console.log(`fetched emergencies`)),
        catchError(this.handleError('getSeverities', []))
    );
  }


  getSeverityById<Data>(id: number): Observable<Severity> {
    return this.http.get<Severity>(`${this.urlService}/${id}`)
      .pipe(
        map(severity => severity), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          console.log(`${outcome} emergency id=${id}`);
        }),
        catchError(this.handleError<Severity>(`getEmergencyById id=${id}`))
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
