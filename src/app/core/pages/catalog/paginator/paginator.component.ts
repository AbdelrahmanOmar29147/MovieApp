import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Output() paginate = new EventEmitter<number>();

  // ngOnInit() {
  //   console.log(this.currentPage);
  // }

  getNextPage() {
    this.currentPage++;
    this.paginate.emit(this.currentPage);
  }

  getPrevPage() {
    this.currentPage--;
    this.paginate.emit(this.currentPage);
  }

  getFirstPage() {
    this.currentPage = 1;
    this.paginate.emit(this.currentPage);
  }

  getLastPage() {
    this.currentPage = this.totalPages;
    this.paginate.emit(this.currentPage);
  }
}
