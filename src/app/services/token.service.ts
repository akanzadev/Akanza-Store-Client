import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private URI = `${environment.API_URL}/api/v1/users`;

  constructor() {}
}
