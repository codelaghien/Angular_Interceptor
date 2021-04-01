import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private REST_API_SERVER = 'http://localhost:5000/api/users/login';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {}

  public setToken(token: string) {
    localStorage.setItem('token', token);
  }

  public removeToken() {
    localStorage.removeItem('token');
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  public logout() {
    this.removeToken();
    this.router.navigate(['/']);
  }

  public login(backUrl): void {
    this.openDialog(backUrl);
  }

  private openDialog(backUrl): void {
    const dialogRef = this.dialog.open(DialogLoginComponent, {
      width: '250px',
      data: { username: '', password: '', token: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('AuthService: afterClosed', result);
      const username = result?.data?.username;
      const password = result?.data?.password;
      const token = result?.data?.token;
      console.log(
        'AuthService: afterClosed',
        result,
        username,
        password,
        token
      );
      if (!!username && !!password && !!token) {
        this.setToken(token);
        this.router.navigate([backUrl]);
        // this.authLogin(username, password).subscribe(
        //   (token) => {
        //     console.log('AuthService: login, token = ', token, backUrl);
        //     this.setToken(token);
        //     this.router.navigate([backUrl]);
        //   },
        //   (error) => {
        //     console.log('AuthService: failed', error);
        //   }
        // );
      } else {
        this.login(backUrl);
      }
    });
  }

  // public authLogin(username, password): Observable<any> {
  //   console.log('AuthService: authLogin: ', username, password);
  //   const httpParams = new HttpParams();
  //   const payload = { username, password };
  //   return (
  //     this.httpClient
  //       .post(this.REST_API_SERVER, payload, {
  //         params: httpParams,
  //       })
  //       // .pipe(delay(3000))
  //       // .pipe(map(data => {
  //       //   console.log('DataService: login', data);
  //       //   return data;
  //       // }))
  //       .pipe(catchError(this.handleError))
  //   );
  // }

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
