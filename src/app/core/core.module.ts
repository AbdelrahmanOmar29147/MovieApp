import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './components/catalog/catalog.component';
import { MatCardModule } from '@angular/material/card';
import { CoreRoutingModule } from './core-routing.module';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { SharedModule } from '../shared/shared.module';
import { PaginatorComponent } from './components/catalog/components/paginator/paginator.component';
import { MovieComponent } from './components/catalog/components/movie/movie.component';
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
