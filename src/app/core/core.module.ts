import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CatalogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CatalogComponent }]),
  ],
})
export class CoreModule {}
