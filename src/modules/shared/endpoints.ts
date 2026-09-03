export const TMDB_ENDPOINTS = {
  TRENDING: '/trending/all/week',
  MOVIES: {
    POPULAR: '/movie/popular',
    TOP_RATED: '/movie/top_rated',
    NOW_PLAYING: '/movie/now_playing',
    UPCOMING: '/movie/upcoming',
    DETAILS: (id: number) => `/movie/${id}`,
  },
  SEARCH: {
    MULTI: '/search/multi',
  },
} as const;
