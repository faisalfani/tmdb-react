import { useEffect } from 'react';
import { usePopularMovies } from '@/modules/movies/queries';

export function App() {
  const { data: movies, isLoading, isError, error } = usePopularMovies();

  useEffect(() => {
    if (movies) {
      console.log('Popular Movies TMDB Response:', movies);
    }
    if (isError) {
      console.error('TMDB API Error:', error);
    }
  }, [movies, isError, error]);

  return (
    <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black tracking-tight text-red-600">TMDB CATALOG</h1>
        <p className="text-gray-400">Cinematic Movie & TV Show Explorer</p>
        <p className="text-xs text-neutral-500">
          Status: {isLoading ? 'Fetching data...' : isError ? 'Error (check console)' : `${movies?.length ?? 0} movies fetched (logged in console)`}
        </p>
      </div>
    </div>
  );
}

export default App;
