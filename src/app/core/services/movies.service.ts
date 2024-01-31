import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV } from '../../../environments/environment';
import {
  MovieCredits,
  MovieDetails,
  MoviesResponseData,
} from '../models/movies';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  language: string = localStorage.getItem('language')!;
  token: string = localStorage.getItem('userData')!;

  constructor(private http: HttpClient, private translate: TranslateService) {}

  getLanguage() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.language = event.lang;
    });
  }

  getMovies(pageNumber: number) {
    this.getLanguage();
    return this.http.get<MoviesResponseData>(
      ENV.TMDB.port + `?pageNo=${pageNumber}`,
      {
        headers: new HttpHeaders({ Authorization: `Bearer ${this.token}` }),
      }
    );
  }

  getMovieDetails(movieID: number) {
    this.getLanguage();
    return this.http.get<MovieDetails>(ENV.TMDB.port + `/${movieID}`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.token}` }),
    });
  }

  getMovieCredits(movieID: number) {
    this.getLanguage();
    return this.http.get<MovieCredits>(
      ENV.TMDB.baseUrl + `${movieID}/credits?language=${this.language}`,
      {
        params: new HttpParams().set('api_key', ENV.TMDB.key),
      }
    );
  }
}
