import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Home/Home.jsx';
import { MovieDetails } from './MovieDetails/MovieDetails.jsx';
import { Cast } from './Cast/Cast.jsx';
import { Reviews } from './Reviews/Reviews.jsx';
import '../index.css';
import {
  fetchTrending,
  fetchDetails,
  fetchCast,
  fetchReviews,
} from './Api/Api.js';

export const App = () => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState([]);
  const [movieCategories, setMovieCategories] = useState('hmm');
  const [movieCast, setMovieCast] = useState([]);
  const [movieReviews, setMovieReviews] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      //setLoading(true);
      const response = await fetchTrending();
      setMovies(response.results);
    };
    fetchMovies();
  }, []);

  /*const getMovieById = movieId => {
    const movie = movies.find(movie => movie.id === movieId);
    setMovie(movie);
  };*/

  const getMovieById = async movieId => {
    const movie = await fetchDetails(movieId);
    const categories = movie.genres;
    const genres = categories.map(object => object.name).join(', ');
    setMovie(movie);
    setMovieCategories(genres);
    console.log(movieCategories);
    console.log(movie);

    const movieCast = await fetchCast(movieId);
    setMovieCast(movieCast.cast);
    console.log(movieCast.cast);

    const movieReviews = await fetchReviews(movieId);
    setMovieReviews(movieReviews.results);
    console.log(movieReviews);
  };

  return (
    <>
      <div className="App">
        <Routes>
          <Route
            path="/goit-react-hw-05-movies/"
            element={<Home movies={movies} getMovieById={getMovieById} />}
          />
          <Route
            path="/goit-react-hw-05-movies/:movieId"
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
