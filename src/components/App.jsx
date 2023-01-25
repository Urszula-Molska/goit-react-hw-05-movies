import { lazy, Suspense } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';

import '../index.css';

const MovieDetails = lazy(() => import('./MovieDetails/MovieDetails.jsx'));
const Home = lazy(() => import('./Home/Home.jsx'));
const Cast = lazy(() => import('./Cast/Cast.jsx'));
const Reviews = lazy(() => import('./Reviews/Reviews.jsx'));
const Movies = lazy(() => import('./Movies/Movies.jsx'));

export const App = () => {
  return (
    <>
      <div className="App">
        <header>
          <nav>
            <NavLink className="navLink" to="/" end>
              Home
            </NavLink>
            <NavLink className="navLink" to="/movies">
              Movies
            </NavLink>
          </nav>
        </header>

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieId" element={<MovieDetails />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
};
