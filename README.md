# TMDB Movie Catalog

A modern movie catalog web application powered by the TMDB API, built with React, TypeScript, Tailwind CSS, and TanStack Query.

## Demo & Repository

- **Live Demo:** [https://tmdb-react-nu.vercel.app](https://tmdb-react-nu.vercel.app)
- **Repository:** [https://github.com/faisalfani/tmdb-react](https://github.com/faisalfani/tmdb-react)

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State & Data Fetching:** TanStack Query v5 (React Query)
- **Routing:** React Router v7
- **HTTP Client:** Axios
- **Icons & Carousel:** Lucide React, Swiper
- **Git Hooks:** Husky + Commitlint (Conventional Commits)

## Key Features

- **Hero Banner:** Displays weekly trending movie with backdrop, overview, quick watchlist toggle, and trailer launcher.
- **Movie Catalog Rows:** Swiper-based responsive carousels for Popular, Top Rated, Now Playing, and Upcoming movies.
- **Search & Pagination:** Live search with 400ms debounce, URL query parameter sync (`/search?q=...&page=...`), and custom pagination.
- **Media Detail Modal:** Shows full overview, release info, runtime, vote rating, genre tags, top cast, and embedded YouTube trailer.
- **TMDB Watchlist Integration:** Full integration with TMDB's `account/{account_id}/watchlist` endpoint to add/remove movies with live bookmark badges and a dedicated `/watchlist` page.
- **UX & Accessibility:** Skeleton loaders for async states, image fallbacks, semantic HTML, and `aria-*` labels for screen readers.

## TMDB API Endpoints

This application integrates with the following TMDB API endpoints:

1. `GET /movie/popular` - Popular movies
2. `GET /movie/top_rated` - Top rated movies
3. `GET /movie/now_playing` - Movies in theatres
4. `GET /movie/upcoming` - Upcoming movies
5. `GET /trending/all/week` - Weekly trending items for Hero section
6. `GET /search/multi` - Multi search for movies & shows
7. `GET /movie/{id}` (with `append_to_response=videos,credits`) - Movie details, trailers, and cast
8. `GET & POST /account/{account_id}/watchlist` - Watchlist management

## Project Structure

```
src/
├── hooks/              # Custom hooks (useDebounce, useDisclosure)
├── lib/                # API client and React Query configuration
├── modules/            # Domain-based modules (queries, services, types)
│   ├── details/        # Movie details & credits
│   ├── movies/         # Catalog queries & endpoints
│   ├── search/         # Search queries & pagination
│   ├── shared/         # Common types & endpoints
│   └── watchlist/      # TMDB Watchlist queries & mutations
├── utils/              # Formatters, constants, helpers
└── views/              # Page views and UI components
    ├── movies/         # Home / Movies page & Hero banner
    ├── search/         # Search view with pagination
    ├── watchlist/      # User's saved watchlist view
    └── shared/         # Shared components (Card, Carousel, Modal, Pagination, Skeletons)
```

## Getting Started

### Prerequisites

- Node.js >= 18
- npm / pnpm / yarn
- TMDB API Key / Access Token ([Get one here](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/faisalfani/tmdb-react.git
   cd tmdb-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in your TMDB credentials in `.env`:
   ```env
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
   VITE_TMDB_API_TOKEN=your_tmdb_bearer_token
   VITE_TMDB_API_KEY=your_tmdb_api_key
   ```

4. Run locally:
   ```bash
   npm run dev
   ```

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Type check and build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run Oxlint linter

## Commit Guidelines

The repository uses Conventional Commits enforced via Husky and Commitlint:
- `feat:` New features
- `fix:` Bug fixes
- `refactor:` Code refactoring
- `docs:` Documentation updates
- `chore:` Tooling, configuration, or dependency maintenance
