import { useState, useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Home } from './Home/Home.jsx';
import { MovieDetails } from './MovieDetails/MovieDetails.jsx';
import { Cast } from './Cast/Cast.jsx';
import { Reviews } from './Reviews/Reviews.jsx';
import { Movies } from './Movies/Movies.jsx';
import '../index.css';
import {
  fetchTrending,
  fetchDetails,
  fetchCast,
  fetchReviews,
  fetchSearch,
} from './Api/Api.js';

export const App = () => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState([]);
  const [movieCategories, setMovieCategories] = useState('');
  const [movieCast, setMovieCast] = useState([]);
  const [movieReviews, setMovieReviews] = useState([]);
  const [query, setQuery] = useState('');
  const [moviesByTerm, setMoviesByTerm] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetchTrending();
      setMovies(response.results);
    };
    fetchMovies();
  }, []);

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
      setMovieReviews(movieReviews.results);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const querySearch = form.elements.searchQuery.value;
    const query = querySearch.trim();
    setQuery(query);

    const fetchMoviesByterm = async query => {
      const response = await fetchSearch(query);

      if (response.length === 0 && query.length > 0) {
        Notify.info(`There is no records that matches:  ${query}  !`);
        setMoviesByTerm(response);
      } else {
        setMoviesByTerm(response);
        console.log(response);
      }
    };
    if (query.length > 0) {
      fetchMoviesByterm(query);
    } else {
      Notify.info("You didn't write anything !");
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
        <Routes>
          <Route
            path="/"
            element={<Home movies={movies} getMovieById={getMovieById} />}
          />
          <Route
            path="/movies"
            element={
              <Movies
                handleSubmit={handleSubmit}
                query={query}
                moviesByTerm={moviesByTerm}
                getMovieById={getMovieById}
              />
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <MovieDetails
                movies={movies}
                movie={movie}
                movieCategories={movieCategories}
              />
            }
          >
            <Route path="cast" element={<Cast movieCast={movieCast} />} />
            <Route
              path="reviews"
              element={<Reviews movieReviews={movieReviews} />}
            />
          </Route>
          <Route path="*" element={<Home movies={movies} />} />
        </Routes>
      </div>
    </>
  );
};

/*const getMovieById = movieId => {
    const movie = movies.find(movie => movie.id === movieId);
    setMovie(movie);
  };*/
