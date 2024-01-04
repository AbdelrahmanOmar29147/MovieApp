import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { AuthGuard } from '../authentication/auth.guard';

const routes: Routes = [
  {
    path: '',
    // component: CatalogComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: CatalogComponent },
      {
        path: ':id',
        component: MovieDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
