import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { CustomPreloadService } from './services/custom-preload.service';
import { QuicklinkStrategy } from 'ngx-quicklink';
import { AdminGuard } from './guards/admin.guard';
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./website/website.module').then((m) => m.WebsiteModule),
    /*  data: {
      preload: true,
    }, */
  },
  {
    path: 'cms',
    canActivate: [AdminGuard],
    loadChildren: () => import('./cms/cms.module').then((m) => m.CmsModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadAllModules, // Aplicaciones con pocos modulos, los carga en background
      // preloadingStrategy: CustomPreloadService, // Aplica a las cuales tengan la bandera preload
      preloadingStrategy: QuicklinkStrategy, // Aplica segun los router link q ve
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
