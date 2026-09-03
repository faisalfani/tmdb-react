import { useEffect, useMemo, useRef, useState } from 'react';
import { Bookmark, Film, Search, X } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import useDebounce from '@/hooks/useDebounce';
import { useWatchlistMovies } from '@/modules/watchlist/queries';

interface NavItem {
  id: string;
  label: string;
  to: string;
  showBadge?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'movies', label: 'Movies', to: '/' },
  { id: 'watchlist', label: 'Watchlist', to: '/watchlist', showBadge: true },
];

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const isSearchPage = location.pathname === '/search';
  const query = searchParams.get('q') ?? '';

  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(isSearchPage);
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    if (isSearchPage) {
      setIsSearchOpen(true);
      setSearchQuery(query);
    } else {
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  }, [isSearchPage, query]);

  const { data: watchlistMovies } = useWatchlistMovies();
  const watchlistCount = useMemo(() => watchlistMovies?.length ?? 0, [watchlistMovies]);

  useDebounce(
    () => {
      const trimmed = searchQuery.trim();
      if (!isSearchPage && trimmed.length > 1) {
        navigate(`/search?q=${encodeURIComponent(trimmed)}&page=1`);
      } else if (isSearchPage && trimmed) {
        setSearchParams({ q: trimmed, page: '1' }, { replace: true });
      }
    },
    [searchQuery, isSearchPage],
    400
  );

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 md:px-12 h-16 md:h-20 flex items-center justify-between">
        {isSearchOpen ? (
          <div className="flex items-center gap-3 w-full">
            <Search className="w-5 h-5 text-neutral-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies, TV shows..."
              autoFocus={isSearchPage}
              className="flex-1 bg-transparent text-white placeholder-neutral-500 text-sm focus:outline-none"
            />
            <button
              type="button"
              onClick={handleSearchClose}
              aria-label="Close search"
              className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-8">
              <Link
                to="/"
                className="flex items-center gap-2 text-red-600 font-black text-xl md:text-2xl tracking-tighter hover:opacity-90 transition"
              >
                <Film className="w-6 h-6 stroke-[2.5]" />
                <span>TMDB CATALOG</span>
              </Link>

              <nav className="hidden md:flex items-center gap-2 p-1 rounded-full bg-neutral-900/50 border border-neutral-800/60 backdrop-blur-sm">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${isActive
                        ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700/60'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
                      } ${item.showBadge ? 'flex items-center gap-1.5' : ''}`
                    }
                  >
                    <span>{item.label}</span>
                    {item.showBadge && watchlistCount > 0 && (
                      <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-red-600 text-white">
                        {watchlistCount}
                      </span>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSearchOpen}
                aria-label="Search movies and TV shows"
                className="p-2 rounded-full text-neutral-300 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                to="/watchlist"
                aria-label="View Watchlist"
                className="relative p-2 rounded-full text-neutral-300 hover:text-white hover:bg-neutral-800 transition md:hidden"
              >
                <Bookmark className="w-5 h-5" />
                {watchlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-600" />
                )}
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
