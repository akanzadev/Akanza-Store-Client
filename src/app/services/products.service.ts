import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpStatusCode,
} from '@angular/common/http';
import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from '../models/product.model';
import { retry, catchError, throwError, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private URI = `${environment.API_URL}/api/v1`;

  constructor(private http: HttpClient) {}

  getAll(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit.toString());
      params = params.set('offset', offset.toString());
    }
    return this.http
      .get<Product[]>(`${this.URI}/products`, { params, context: checkTime() })
      .pipe(
        retry(3),
        map((products) =>
          products.map((product) => {
            return {
              ...product,
              taxes: 0.19 * product.price,
            };
          })
        )
      );
  }

  getByCategory(id: number, limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit.toString());
      params = params.set('offset', offset.toString());
    }
    return this.http.get<Product[]>(`${this.URI}/categories/${id}/products`, {
      params,
    });
    /*  .pipe(retry(3)); */
  }
  /*
  getByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.URI}`, {
      params: {
        limit: limit.toString(),
        offset: offset.toString(),
      },
    });
  } */

  getOne(id: number) {
    return this.http.get<Product>(`${this.URI}/products/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.InternalServerError) {
          return throwError(() => new Error('Error con el servidor'));
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError(() => new Error('No se encontr?? el producto'));
        }
        return throwError(() => new Error('No se encontr?? el producto'));
      })
    );
  }

  create(product: CreateProductDTO) {
    return this.http.post<Product>(`${this.URI}/products`, product);
  }

  update(id: number, product: UpdateProductDTO) {
    return this.http.put<Product>(`${this.URI}/products/${id}`, product);
  }

  delete(id: number) {
    return this.http.delete(`${this.URI}/products/${id}`);
  }
}
