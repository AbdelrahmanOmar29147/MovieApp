import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movies';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent implements OnInit, OnDestroy {
  constructor(private _moviesservice: MoviesService) {}

  isLoading: boolean = false;
  moviesList!: Movie[];
  totalPages!: number;
  currentPage = 1;
  movieSubscription!: Subscription;

  ngOnInit(): void {
    this.getMovies(this.currentPage);
  }

  getMovies(pageNumber: number): void {
    this.isLoading = true;
    this.movieSubscription && this.movieSubscription.unsubscribe();
    this.movieSubscription = this._moviesservice
      .getTopMovies(pageNumber)
      .subscribe((res) => {
        this.moviesList = res.results;
        this.totalPages = res.total_pages;
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.movieSubscription.unsubscribe();
  }
}
