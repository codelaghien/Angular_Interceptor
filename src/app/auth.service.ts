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
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public roles = [];

  constructor(private router: Router, public dialog: MatDialog) {}

  public setToken(token: string) {
    if (!token) {
      this.removeToken();
      return;
    }
    localStorage.setItem('token', token);

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    // console.log('decodedToken', decodedToken);
    this.roles = decodedToken.roles.map((role) => role.toLowerCase());
    console.log('roles', this.roles);

    // const expirationDate = helper.getTokenExpirationDate(token);
    // const isExpired = helper.isTokenExpired(token);

    // console.log('expirationDate', expirationDate);
    // console.log('isExpired', isExpired);
  }

  public removeToken() {
    localStorage.removeItem('token');
    this.roles = [];
  }

  public getToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.removeToken();
      return;
    }
    if (this.roles.length === 0) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      // console.log('decodedToken', decodedToken);
      this.roles = decodedToken.roles.map((role) => role.toLowerCase());
      console.log('roles', this.roles);
    }

    return token;
  }

  public isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  public canAccess(url) {
    console.log('canAccess', this.roles, url);
    if (this.roles.includes('admin')) {
      // console.log('admin OK');
      return true;
    }
    const page = url.toString().substr(1);
    // console.log('canAccess', page);
    if (this.roles.includes(page)) {
      return true;
    }
    console.error('Bạn không thể vào trang ' + page);
    return false;
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
      // console.log('AuthService: afterClosed', result);
      const username = result?.data?.username;
      const password = result?.data?.password;
      const token = result?.data?.token;
      // console.log(
      //   'AuthService: afterClosed',
      //   result,
      //   username,
      //   password,
      //   token
      // );
      if (!!username && !!password && !!token) {
        this.setToken(token);
        this.router.navigate([backUrl]);
      } else {
        this.login(backUrl);
      }
    });
  }
}
