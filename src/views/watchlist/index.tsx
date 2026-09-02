import { Bookmark } from 'lucide-react';

export function WatchlistView() {
  return (
    <div className="pt-24 md:pt-32 px-4 md:px-12 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Bookmark className="w-8 h-8 text-red-600" />
        <h1 className="text-2xl md:text-3xl font-bold text-white">My Watchlist</h1>
      </div>
      <p className="text-neutral-400">Your saved movies and TV shows will appear here.</p>
    </div>
  );
}

export default WatchlistView;
