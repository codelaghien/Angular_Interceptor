import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // private REST_API_SERVER = 'http://localhost:5000/users';
  private REST_API_SERVER = 'https://randomuser.me/api/?results=10';
  private REST_API_SERVER2 = 'https://randomuser.me/api/?results=2';

  constructor(private httpClient: HttpClient) {}

  public getUsers(): Observable<any> {
    return (
      this.httpClient
        .get(this.REST_API_SERVER)
        // .pipe(delay(3000))
        .pipe(catchError(this.handleError))
    );
  }

  public getUsers2(): Observable<any> {
    return (
      this.httpClient
        .get(this.REST_API_SERVER2)
        // .pipe(delay(3000))
        .pipe(catchError(this.handleError))
    );
  }

  handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    console.log('Error', errorMessage);
    return throwError(errorMessage);
  }
}
