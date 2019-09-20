import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {catchError, tap, map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {URL_SERVER} from '../constants/urls';
import {Mishap} from '../models/mishap';
import {of} from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MishapService {

  private urlService = URL_SERVER + '/mishap';

  constructor(
    private http: HttpClient
  ) { }

  /** GET mishaps from the server */
  getMishaps (): Observable<Mishap[]> {
    return this.http.get<Mishap[]>(this.urlService)
      .pipe(
        tap((mishaps: Mishap[]) => console.log(`fetched mishaps`)),
        catchError(this.handleError('getMishaps', []))
      );
  }

  /** GET mishap by Userid. Will 404 if id not found */
  getMishapByUserId(id: number): Observable<Mishap[]> {
    const url = `${this.urlService}/user/${id}`;
    return this.http.get<Mishap[]>(url).pipe(
      tap((mishap: Mishap[]) => console.log(`fetched mishap id=${id}`)),
      catchError(this.handleError<Mishap[]>(`getMisahp id=[]${id}`))
    );
  }

  /** GET mishap by id. Will 404 if id not found */
  getMishapById(id: number): Observable<Mishap> {
    const url = `${this.urlService}/${id}`;
    return this.http.get<Mishap>(url).pipe(
      tap((mishap: Mishap) => console.log(`fetched mishap id=${id}`)),
      catchError(this.handleError<Mishap>(`getMisahp id=[]${id}`))
    );
  }

    /** Search */
  searchMishap(text: string, id: number): Observable<Mishap[]> {
    const url = `${this.urlService}/search/${text}|${id}`;
    return this.http.get<Mishap[]>(url).pipe(
      tap((mishaps: Mishap[]) => console.log(`fetched mishap text=${text}`)),
      catchError(this.handleError<Mishap[]>(`getMisahp text=${text}`))
    );
  }

  /** POST: add a new mishap to the server */
  addMishap (mishap: Mishap): Observable<Mishap> {
    return this.http.post<Mishap>(this.urlService, mishap, httpOptions).pipe(
      tap((mishap: Mishap) => console.log(`added mishap w/ id=${mishap.idMishap}`)),
      catchError(this.handleError<Mishap>('addMishap'))
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
