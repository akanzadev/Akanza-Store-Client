import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from '../guards/auth.guard';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { ExitGuard } from '../guards/exit.guard';
import { RecoveryFormComponent } from './pages/recovery-form/recovery-form.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { CheckLoginGuard } from '../guards/check-login.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./pages/category/category.module').then(
            (m) => m.CategoryModule
          ),
        data: {
          preload: true,
        },
      },
      {
        path: 'product/:id',
        component: ProductDetailComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [CheckLoginGuard],
      },
      {
        path: 'register',
        canDeactivate: [ExitGuard],
        component: RegisterComponent,
      },
      {
        path: 'recovery',
        component: RecoveryComponent,
        canActivate: [CheckLoginGuard],
        children: [
          {
            path: '',
            component: RecoveryFormComponent,
          },
          {
            path: 'change-password',
            component: ChangePasswordComponent,
          },
        ],
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        component: ProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsiteRoutingModule {}
