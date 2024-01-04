export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character?: string;
  credit_id: string;
  order?: number;
  job?: string;
}

export interface MovieDetails extends Omit<Movie, 'genre_ids'> {
  belongs_to_collection: string;
  budget: number;
  genres: [{ id: number; name: string }];
  homepage: string;
  imdb_id: string;
  production_companies: [
    { id: number; logo_path: string; name: string; origin_country: string }
  ];
  production_countries: [{ iso_3166_1: string; name: string }];
  revenue: number;
  runtime: number;
  spoken_languages: [{ english_name: string; iso_639_1: string; name: string }];
  status: string;
  tagline: string;
}

export interface MovieCredits {
  id: number;
  cast: Cast[];
  crew: Cast[];
}

export interface MoviesResponseData {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
