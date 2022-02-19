import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderSub = new BehaviorSubject<boolean>(false);
  loader$ = this.loaderSub.asObservable();
  constructor() {}

  show() {
    this.loaderSub.next(true);
  }
  hide() {
    this.loaderSub.next(false);
  }
}
