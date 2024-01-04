import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieCredits, MovieDetails } from '../../models/movies';

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
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.movieID = params['id'];
    });
    this.getMovieDetails();
    this.getMovieCredits();
  }

  getMovieDetails(): void {
    this.detailsSubscription = this.moviesService
      .getMovieDetails(this.movieID)
      .subscribe((data) => {
        this.movieDetails = data;
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

  ngOnDestroy() {
    this.detailsSubscription.unsubscribe();
    this.creditsSubscription.unsubscribe();
  }
}
