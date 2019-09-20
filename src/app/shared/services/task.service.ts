import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {URL_SERVER} from '../constants/urls';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import {Task} from '../models/task';
import {catchError, map, tap} from 'rxjs/operators';
import {User} from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TaskService {

  private  urlService = URL_SERVER + '/task';

  constructor(private http: HttpClient) { }

  /** GET tasks from the server */
  getTasksByMishapId(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.urlService}/${id}`).pipe(
        tap((tasks: Task[]) => console.log(`fetched tasks from idMishap`)),
        catchError(this.handleError<Task[]>('getTasksByMishapId id=${id}', []))
      );
  }

  /** GET tasks from the server */
  getTasksById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.urlService}/task/${id}`).pipe(
      tap((task: Task) => console.log(`fetched tasks from idMishap`)),
      catchError(this.handleError<Task>('getTasksById id=${id}'))
    );
  }

  /** GET recipients from the server */
  getRecipientsByTaskId(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.urlService}/recipient/${id}`)
      .pipe(
        map(tasks => tasks),
        tap((tasks: User[]) => console.log(`fetched users from idTask`)),
        catchError(this.handleError<User[]>('getRecipientsByTaskId id=${id}', []))
      );
  }

  /** POST: add a new task to the server */
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.urlService, task, httpOptions).pipe(
      tap((task2: Task) => console.log(`added task w/ id=${task2.idTask}`)),
      catchError(this.handleError<Task>('addTask'))
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
