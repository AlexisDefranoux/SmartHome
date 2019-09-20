import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {URL_SERVER} from '../constants/urls';
import { Observable } from 'rxjs/Observable';
import { catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Place } from '../models/place';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PlaceService {
  places: Place[];

  private urlService = URL_SERVER + '/place';
  public defaultPlace = null;

  constructor(private http: HttpClient) { }

  /** GET places from the server */
  getPlaces (): Observable<Place[]> {
    return this.http.get<Place[]>(this.urlService)
      .pipe(
        tap((places: Place[]) => console.log(`fetched places`)),
        catchError(this.handleError('getPlaces', []))
    );
  }

  getPlacesByUserId (id: number): Observable<Place[]> {
    return this.http.get<Place[]> (`${this.urlService}/ByUserId/${id}`)
      .pipe(
        tap((places: Place[]) => console.log(`fetched places`)),
        catchError(this.handleError('getPlacesByUserId', []))
      );
  }

  getPlaceById(id: number): Observable<Place> {
    return this.http.get<Place>(`${this.urlService}/ById/${id}`)
      .pipe(
        map(place => place), // returns a {0|1} element array
        tap((place: Place) => console.log(`fetched place by id`)),
        catchError(this.handleError<Place>(`getPlaceById id=${id}`))
      );
  }

  /** POST: add a new place to the server */
  addPlace(place: Place): Observable<Place> {
    return this.http.post<Place>(this.urlService, place, httpOptions).pipe(
      tap((place2: Place) => console.log(`added task w/ id=${place2.idPlace}`)),
      catchError(this.handleError<Place>('addTask'))
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
