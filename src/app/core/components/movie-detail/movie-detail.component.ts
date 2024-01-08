import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieCredits, MovieDetails } from '../../models/movies';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
})
export class MovieDetailComponent {
  detailsSubscription!: Subscription;
  creditsSubscription!: Subscription;
  movieID!: number;
  movieDetails: MovieDetails | undefined;
  movieCredits: MovieCredits | undefined;

  constructor(
    private moviesService: MoviesService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.getMovieID();
    this.getMovieDetails();
    this.getMovieCredits();
    this.handleLanguageChange();
  }

  getMovieID() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.movieID = params['id'];
    });
  }

  getMovieDetails(): void {
    this.detailsSubscription = this.moviesService
      .getMovieDetails(this.movieID)
      .subscribe({
        next: (data) => {
          this.movieDetails = data;
        },
        error: () => {
          console.log('hello');
          this.route.navigate(['/catalog']);
        },
      });
  }

  getMovieCredits(): void {
    this.creditsSubscription = this.moviesService
      .getMovieCredits(this.movieID)
      .subscribe((data) => {
        data.cast = data.cast.splice(0, 10);
        this.movieCredits = data;
      });
  }

  handleLanguageChange(): void {
    this.translate.onLangChange.subscribe(() => {
      this.getMovieDetails();
      this.getMovieCredits();
    });
  }
}
