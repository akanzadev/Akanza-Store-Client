import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable, map, take, tap } from 'rxjs';
import { TokenService } from '../services/token.service';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    /*  return this.authService.user$.pipe(
      take(1),
      map((user) => {
        console.log('auth guard', user);
        return user ? true : false;
      }),
      tap((isAuth) => {
        if (!isAuth) this.router.navigate(['/login']);
      })
    ); */
    if (!this.authService.isLogged) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
