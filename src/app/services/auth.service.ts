import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpStatusCode,
} from '@angular/common/http';
import { Auth, User } from '../models/auth.model';
import { catchError, throwError, tap, switchMap, BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URI = `${environment.API_URL}/api/v1/auth`;

  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string) {
    return this.http
      .post<Auth>(`${this.URI}/login`, {
        email,
        password,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.InternalServerError) {
            return throwError(() => new Error('Error con el servidor'));
          }
          if (error.status === HttpStatusCode.Unauthorized) {
            return throwError(
              () => new Error('Usuario o Contraseña incorrectos')
            );
          }
          return throwError(() => new Error('Error desconocido'));
        }),
        tap((res) => {
          this.tokenService.saveToken(res.token);
        })
      );
  }

  /*  getProfile( token: string ) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.URI}/profile`, {
      headers
    });
      return this.http.get<User>(`${this.URI}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }*/
  getProfile() {
    return this.http
      .get<User>(`${this.URI}/profile`)
      .pipe(tap((user) => this.user.next(user)));
  }

  loginAndGetProfile(email: string, password: string) {
    return this.login(email, password).pipe(switchMap(() => this.getProfile()));
  }

  logout() {
    this.tokenService.removeToken();
  }
}
