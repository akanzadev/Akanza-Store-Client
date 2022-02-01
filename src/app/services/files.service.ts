import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { saveAs } from 'file-saver';
@Injectable({
  providedIn: 'root',
})
export class FilesService {
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
}
