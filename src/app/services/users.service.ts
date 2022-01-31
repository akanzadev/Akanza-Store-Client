import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CreateUserDTO } from './../models/user.model';
import { User } from '../models/user.model';
import { pipe, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private URI = `${environment.API_URL}/api/v1/users`;

  constructor(private http: HttpClient) {}

  create(user: CreateUserDTO) {
    return this.http.post(this.URI, user).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.InternalServerError) {
          return throwError(() => new Error('Error con el servidor'));
        }
        if (error.status === HttpStatusCode.BadRequest) {
          return throwError(() => new Error('Datos invalidos o insuficientes'));
        }
        return throwError(() => new Error('Error desconocido'));
      })
    );
  }

  getAll() {
    return this.http.get<User[]>(this.URI);
  }
}
