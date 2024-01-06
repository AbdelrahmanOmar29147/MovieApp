import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../../../models/movies';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
})
export class MovieComponent implements OnInit {
  @Input() movie!: Movie;
  movieID!: number;
  movieRating!: number;

  ngOnInit() {
    this.movieID = this.movie?.id;
    this.movieRating = Math.ceil(this.movie?.vote_average * 10);
  }
}
