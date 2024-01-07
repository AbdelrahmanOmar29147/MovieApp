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

export const MoviesMockData = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: '/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
      genre_ids: [18, 80],
      id: 278,
      original_language: 'en',
      original_title: 'The Shawshank Redemption',
      overview:
        'Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.',
      popularity: 143.317,
      poster_path: '/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
      release_date: '1994-09-23',
      title: 'The Shawshank Redemption',
      video: false,
      vote_average: 8.709,
      vote_count: 25263,
    },
    {
      adult: false,
      backdrop_path: '/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg',
      genre_ids: [18, 80],
      id: 238,
      original_language: 'en',
      original_title: 'The Godfather',
      overview:
        'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.',
      popularity: 144.718,
      poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      release_date: '1972-03-14',
      title: 'The Godfather',
      video: false,
      vote_average: 8.707,
      vote_count: 19250,
    },
    {
      adult: false,
      backdrop_path: '/kGzFbGhp99zva6oZODW5atUtnqi.jpg',
      genre_ids: [18, 80],
      id: 240,
      original_language: 'en',
      original_title: 'The Godfather Part II',
      overview:
        'In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily and in 1910s New York. In the 1950s, Michael Corleone attempts to expand the family business into Las Vegas, Hollywood and Cuba.',
      popularity: 71.424,
      poster_path: '/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg',
      release_date: '1974-12-20',
      title: 'The Godfather Part II',
      video: false,
      vote_average: 8.589,
      vote_count: 11606,
    },
  ],
  total_pages: 453,
  total_results: 9056,
};
