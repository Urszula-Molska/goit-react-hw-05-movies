import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Home/Home.jsx';
import { MovieDetails } from './MovieDetails/MovieDetails.jsx';
import { Cast } from './Cast/Cast.jsx';
import { Reviews } from './Reviews/Reviews.jsx';
import '../index.css';
import { fetchTrending, fetchDetails } from './Api/Api.js';

export const App = () => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState([]);
  const [movieCategories, setMovieCategories] = useState('hmm');

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
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<Home movies={movies} />} />
        </Routes>
      </div>
    </>
  );
};
