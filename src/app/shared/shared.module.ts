import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [CommonModule],
  exports: [CommonModule, SpinnerComponent, HttpClientModule],
})
export class SharedModule {}
