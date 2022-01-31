import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Auth } from '../models/auth.model';
import { catchError, throwError, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URI = `${environment.API_URL}/api/v1/auth`;

  constructor(private http: HttpClient) {}

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
            return throwError(() => new Error('Usuario o Contraseña incorrectos'));
          }
          return throwError(() => new Error('Error desconocido'));
        })
      );
  }

  profile(token: string) {
    return this.http.get(`${this.URI}/profile`);
  }
}
