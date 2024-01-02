import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movies';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent implements OnInit {
  constructor(private _moviesservice: MoviesService) {}

  isLoading: boolean = false;
  moviesList!: Movie[];
  totalPages!: number;
  currentPage = 1;
  subscription!: Subscription;

  ngOnInit(): void {
    this.getMovies(this.currentPage);
  }

  getMovies(pageNumber: number): void {
    this.isLoading = true;
    this.subscription && this.subscription.unsubscribe();
    this.subscription = this._moviesservice
      .getTopMovies(pageNumber)
      .subscribe((res) => {
        this.moviesList = res.results;
        this.totalPages = res.total_pages;
        this.isLoading = false;
      });
  }

  getNextPage() {
    this.currentPage++;
    this.getMovies(this.currentPage);
  }

  getPrevPage() {
    this.currentPage--;
    this.getMovies(this.currentPage);
  }

  getFirstPage() {
    this.currentPage = 1;
    this.getMovies(this.currentPage);
  }

  getLastPage() {
    this.currentPage = this.totalPages;
    this.getMovies(this.currentPage);
  }
}
