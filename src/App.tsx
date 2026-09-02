import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MoviesView } from '@/views/movies';
import { RootLayout } from '@/views/shared/layouts/RootLayout';
import { WatchlistView } from '@/views/watchlist';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <RootLayout
              onSearchClick={() => {
                console.log('Search clicked');
              }}
            />
          }
        >
          <Route
            path="/"
            element={
              <MoviesView
                onMediaSelect={(movie) => {
                  console.log('Selected movie:', movie);
                }}
              />
            }
          />
          <Route path="/watchlist" element={<WatchlistView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
