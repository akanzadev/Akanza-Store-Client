import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent {
  /*   @Input() img: string = 'valir inicial';
   */
  img: string = '';
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img')
  set imgSet(img: string) {
    this.img = img;
    console.log('set img');
  }
  @Output() loaded = new EventEmitter<string>();
  imgDefault = './assets/img/default.png';

  counter = 0;
  constructor() {}

  imgError() {
    this.img = this.imgDefault;
  }
  loadImg() {
    this.loaded.emit(this.img);
  }
}
