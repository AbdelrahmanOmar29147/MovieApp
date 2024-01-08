import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './authentication/components/auth-page/auth-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/authentication', pathMatch: 'full' },
  {
    path: 'authentication',
    component: AuthPageComponent,
  },
  {
    path: 'catalog',
    loadChildren: () =>
      import('./core/core.module').then((mod) => mod.CoreModule),
  },

  { path: '**', pathMatch: 'full', redirectTo: '/catalog' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
