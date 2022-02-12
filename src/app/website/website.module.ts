import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { SwiperModule } from 'swiper/angular';

import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { CategoryComponent } from './pages/category/category.component';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  declarations: [
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    NavComponent,
    HomeComponent,
    ProductDetailComponent,
    ProfileComponent,
    RecoveryComponent,
    RegisterComponent,
    LoginComponent,
    MycartComponent,
    CategoryComponent,
    LayoutComponent,
  ],
  imports: [CommonModule, WebsiteRoutingModule, SwiperModule],
})
export class WebsiteModule {}
