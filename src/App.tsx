import { MoviesView } from '@/views/movies';

export function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <MoviesView
        onMediaSelect={(movie) => {
          console.log('Selected movie:', movie);
        }}
      />
    </div>
  );
}

export default App;
