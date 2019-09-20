import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import {URL_SERVER} from '../constants/urls';
import {of} from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  private urlService = URL_SERVER + '/user';
  public session = new User({'idUser': 1, 'name': 'guest', 'email': '', 'password': '', 'role': ''});

  constructor(private http: HttpClient) { }

  /** POST: check the user on the server */
  checkUser (user: User): Observable<User> {
    return this.http.post<User>(this.urlService, user, httpOptions).pipe(
      tap((user2: User) => console.log(`checked user`)),
      catchError(this.handleError<User>('checkUser'))
    );
  }

  /** GET user by id. Will 404 if id not found */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.urlService}/${id}`).pipe(
      map(user => user),
      tap((user: User) => console.log(`fetched user id`)),
      catchError(this.handleError<User>(`getUserById id=${id}`))
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
