import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDisclosure } from '@/hooks/useDisclosure';
import type { MediaItem } from '@/modules/shared/types';
import { MediaDetailModal } from '@/views/shared/components/MediaDetailModal';
import { MoviesView } from '@/views/movies';
import { SearchView } from '@/views/search';
import { RootLayout } from '@/views/shared/layouts/RootLayout';
import { TvShowsView } from '@/views/tv';
import { WatchlistView } from '@/views/watchlist';

export function App() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const modal = useDisclosure({
    onClose: () => setSelectedMedia(null),
  });

  const handleMediaSelect = (media: MediaItem) => {
    setSelectedMedia(media);
    modal.onOpen();
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<MoviesView onMediaSelect={handleMediaSelect} />} />
          <Route path="/tv" element={<TvShowsView onMediaSelect={handleMediaSelect} />} />
          <Route path="/watchlist" element={<WatchlistView onMediaSelect={handleMediaSelect} />} />
          <Route path="/search" element={<SearchView onMediaSelect={handleMediaSelect} />} />
        </Route>
      </Routes>

      <MediaDetailModal
        media={selectedMedia}
        isOpen={modal.isOpen}
        onClose={modal.onClose}
      />
    </BrowserRouter>
  );
}

export default App;
