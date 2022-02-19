import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';

import { ReversePipe } from './pipes/reverse.pipe';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { ImgComponent } from './components/img/img.component';
import { HighlightDirective } from './directives/highlight.directive';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    ReversePipe,
    TimeAgoPipe,
    ProductComponent,
    ProductsComponent,
    ImgComponent,
    HighlightDirective,
    LoaderComponent,
  ],
  imports: [CommonModule, RouterModule, SwiperModule],
  exports: [
    ReversePipe,
    TimeAgoPipe,
    ProductComponent,
    ProductsComponent,
    ImgComponent,
    HighlightDirective,
    LoaderComponent,
  ],
})
export class SharedModule {}
