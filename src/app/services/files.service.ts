import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { environment } from './../../environments/environment';

interface File {
  originalname: string;
  filename: string;
  location: string;
}
@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private URI = `${environment.API_URL}/api/v1/files`;
  constructor(private http: HttpClient) {}

  getFile(name: string, url: string, type: string) {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      tap((data: Blob) => {
        const blob = new Blob([data], { type: type });
        saveAs(blob, name);
      }),
      map(() => true)
    );
  }

  uploadFile(file: Blob) {
    /* let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data'); */
    const dto = new FormData();
    dto.append('file', file);
    return this.http.post<File>(`${this.URI}/upload`, dto);
  }
}
