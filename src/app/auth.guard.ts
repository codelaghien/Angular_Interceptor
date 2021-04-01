import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // console.log('canActivate', route, state);
    if (state.url.includes('secret')) {
      console.log('Bạn không thể vào phòng bí mật này !');
      return false;
    }
    return true;

    // const token = localStorage.getItem('token');
    // if (token) {
    //   return true;
    // } else {
    //   this.authService.login(state.url);
    // }
  }
}
