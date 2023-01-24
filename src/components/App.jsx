import { useState, lazy, Suspense } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { fetchDetails, fetchCast, fetchReviews } from './Api/Api.js';
import '../index.css';

const MovieDetails = lazy(() => import('./MovieDetails/MovieDetails.jsx'));
const Home = lazy(() => import('./Home/Home.jsx'));
const Cast = lazy(() => import('./Cast/Cast.jsx'));
const Reviews = lazy(() => import('./Reviews/Reviews.jsx'));
const Movies = lazy(() => import('./Movies/Movies.jsx'));

export const App = () => {
  const [movie, setMovie] = useState({});
  const [movieCategories, setMovieCategories] = useState('');
  const [movieCast, setMovieCast] = useState([]);
  const [movieReviews, setMovieReviews] = useState([]);

  const getMovieById = async movieId => {
    const movie = await fetchDetails(movieId);
    const categories = movie.genres;
    const genres = categories.map(object => object.name).join(', ');
    setMovie(movie);
    setMovieCategories(genres);

    const movieCast = await fetchCast(movieId);
    setMovieCast(movieCast.cast);

    const movieReviews = await fetchReviews(movieId);
    if (movieReviews.length > 0) {
      setMovieReviews(movieReviews);
    }
  };

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
            <Route path="/" element={<Home getMovieById={getMovieById} />} />
            <Route
              path="/movies"
              element={<Movies getMovieById={getMovieById} />}
            />
            <Route
              path="/movies/:movieId"
              element={
                <MovieDetails movie={movie} movieCategories={movieCategories} />
              }
            >
              <Route path="cast" element={<Cast movieCast={movieCast} />} />
              <Route
                path="reviews"
                element={<Reviews movieReviews={movieReviews} />}
              />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
};
