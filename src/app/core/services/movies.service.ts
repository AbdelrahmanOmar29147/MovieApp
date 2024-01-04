import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TMDB_API_KEY } from '../../environments/environment';
import {
  MovieCredits,
  MovieDetails,
  MoviesResponseData,
} from '../models/movies';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getTopMovies(pageNumber: number) {
    return this.http.get<MoviesResponseData>(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageNumber}`,
      {
        params: new HttpParams().set('api_key', TMDB_API_KEY),
      }
    );
  }
  getMovieDetails(movieID: number) {
    return this.http.get<MovieDetails>(
      `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`,
      {
        params: new HttpParams().set('api_key', TMDB_API_KEY),
      }
    );
  }
  getMovieCredits(movieID: number) {
    return this.http.get<MovieCredits>(
      `https://api.themoviedb.org/3/movie/${movieID}/credits?language=en-US`,
      {
        params: new HttpParams().set('api_key', TMDB_API_KEY),
      }
    );
  }
}
