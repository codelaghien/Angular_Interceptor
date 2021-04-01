import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private REST_API_SERVER = 'http://localhost:5000/api/users/login';

  constructor(private httpClient: HttpClient, public dialog: MatDialog) {}

  public login(): void {
    this.openDialog();
  }

  private openDialog(): void {
    const dialogRef = this.dialog.open(DialogLoginComponent, {
      width: '250px',
      data: { username: '', password: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('AuthService: afterClosed', result);
      const username = result?.data?.username;
      const password = result?.data?.password;
      if (!!username && !!password) {
        this.authLogin(username, password).subscribe(
          (token) => {
            console.log('AuthService: login, token = ', token);
            localStorage.setItem('token', token);
            // return new Observable((observer) => {
            //   observer.complete();
            // });
            console.log('AuthService: calling api users');
            // return (
            //   this.httpClient
            //     .get('http://localhost:5000/api/users')
            //     // .pipe(delay(3000))
            //     .pipe(catchError(this.handleError))
            // );
          },
          (error) => {
            console.log('AuthService: failed', error);
          }
        );
      }
    });
  }

  public authLogin(username, password): Observable<any> {
    console.log('AuthService: authLogin: ', username, password);
    const httpParams = new HttpParams();
    const payload = { username, password };
    return (
      this.httpClient
        .post(this.REST_API_SERVER, payload, {
          params: httpParams,
        })
        // .pipe(delay(3000))
        // .pipe(map(data => {
        //   console.log('DataService: login', data);
        //   return data;
        // }))
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
