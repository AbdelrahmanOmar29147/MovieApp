import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movies';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent implements OnInit {
  constructor(
    private moviesService: MoviesService,
    private translate: TranslateService
  ) {}

  isLoading: boolean = false;
  moviesList!: Movie[];
  totalPages!: number;
  currentPage = 1;
  movieSubscription!: Subscription;

  ngOnInit(): void {
    this.getMovies(this.currentPage);
    this.handleLanguageChange();
  }

  getMovies(pageNumber: number): void {
    this.isLoading = true;
    this.movieSubscription && this.movieSubscription.unsubscribe();
    this.movieSubscription = this.moviesService
      .getMovies(pageNumber - 1)
      .subscribe((res) => {
        this.moviesList = res.content;
        this.totalPages = res.totalPages;
        this.isLoading = false;
      });
  }

  handleLanguageChange(): void {
    this.translate.onLangChange.subscribe(() => {
      this.getMovies(this.currentPage);
    });
  }
}
