import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { MatCardModule } from '@angular/material/card';
import { CoreRoutingModule } from './core-routing.module';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { SharedModule } from '../shared/shared.module';
import { PaginatorComponent } from './pages/catalog/paginator/paginator.component';
import { MovieComponent } from './pages/catalog/movie/movie.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    CatalogComponent,
    MovieDetailComponent,
    PaginatorComponent,
    MovieComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
})
export class CoreModule {}
