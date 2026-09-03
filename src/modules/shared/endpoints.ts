export const TMDB_ENDPOINTS = {
  TRENDING: '/trending/all/week',
  MOVIES: {
    POPULAR: '/movie/popular',
    TOP_RATED: '/movie/top_rated',
    NOW_PLAYING: '/movie/now_playing',
    UPCOMING: '/movie/upcoming',
    DETAILS: (id: number) => `/movie/${id}`,
  },
  TV: {
    POPULAR: '/tv/popular',
    TOP_RATED: '/tv/top_rated',
    DETAILS: (id: number) => `/tv/${id}`,
  },
  SEARCH: {
    MULTI: '/search/multi',
  },
} as const;
