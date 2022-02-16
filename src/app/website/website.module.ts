import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { SwiperModule } from 'swiper/angular';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { LayoutComponent } from './components/layout/layout.component';
import { QuicklinkModule } from 'ngx-quicklink';
import { MessageComponent } from './pages/message/message.component';
import { RecoveryFormComponent } from './pages/recovery-form/recovery-form.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

@NgModule({
  declarations: [
    NavComponent,
    HomeComponent,
    ProductDetailComponent,
    ProfileComponent,
    RecoveryComponent,
    RegisterComponent,
    LoginComponent,
    MycartComponent,
    LayoutComponent,
    MessageComponent,
    RecoveryFormComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    SwiperModule,
    SharedModule,
    QuicklinkModule,
    ReactiveFormsModule,
  ],
})
export class WebsiteModule {}
