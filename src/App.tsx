import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import type { MediaItem } from '@/modules/shared/types';
import { MediaDetailModal } from '@/views/details';
import { MoviesView } from '@/views/movies';
import { RootLayout } from '@/views/shared/layouts/RootLayout';
import { WatchlistView } from '@/views/watchlist';

export function App() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

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
            element={<MoviesView onMediaSelect={(media) => setSelectedMedia(media)} />}
          />
          <Route path="/watchlist" element={<WatchlistView />} />
        </Route>
      </Routes>

      <MediaDetailModal
        media={selectedMedia}
        isOpen={Boolean(selectedMedia)}
        onClose={() => setSelectedMedia(null)}
      />
    </BrowserRouter>
  );
}

export default App;
