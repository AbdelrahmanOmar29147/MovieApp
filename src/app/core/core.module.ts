import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CoreRoutingModule } from './core-routing.module';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CatalogComponent, MovieDetailComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatCardModule,
    MatButtonModule,
    SharedModule,
  ],
})
export class CoreModule {}
