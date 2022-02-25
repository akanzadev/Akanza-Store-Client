import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, take, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CheckLoginGuard implements CanActivate {
  constructor(private authServie: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    /*   return this.authServie.user$.pipe(
      // take last
      take(1),
      map((isLogged) => {
        console.log('isLogged check login', isLogged);
        if (isLogged) {
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      })
    ); */
    return this.authServie.validateToken().pipe(
      map((isLogged) => {
        if (!isLogged) return true;
        this.router.navigate(['/home']);
        return false;
      })
    );
  }
}
