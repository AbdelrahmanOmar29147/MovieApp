import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/catalog', pathMatch: 'full' },

  {
    path: 'authentication',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (mod) => mod.AuthenticationModule
      ),
  },
  {
    path: 'catalog',
    loadChildren: () =>
      import('./core/core.module').then((mod) => mod.CoreModule),
  },

  { path: '**', pathMatch: 'full', redirectTo: '/catalog' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
