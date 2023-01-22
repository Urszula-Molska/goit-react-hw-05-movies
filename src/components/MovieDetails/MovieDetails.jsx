import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link, Outlet } from 'react-router-dom';
import css from './MovieDetails.module.css';

export const MovieDetails = ({ movie, movieCategories }) => {
  const location = useLocation();
  const date = new Date(movie.release_date);
  const releaseDate = date.getFullYear();
  const image = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  const backLinkHrefHome = location.state?.from ?? '/';
  const backLinkHrefMovies = location.state?.from ?? '/movies';

  return (
    <>
      <main>
        <ul>
          <li>
            <Link to={backLinkHrefHome}>Back Home</Link>
          </li>
          <li>
            <Link to={backLinkHrefMovies}>Back Movies</Link>
          </li>
        </ul>
        <h2>
          {' '}
          {movie.title} ({releaseDate})
        </h2>
        <h3>Vote average: {movie.vote_average} </h3>
        <img className={css.image} src={image} alt={movie.title} />
        <h3>Overview: </h3>
        <p>{movie.overview}</p>
        <h3>Genres</h3>
        <p>{movieCategories} </p>
        <hr />
        <h3> Additional Information</h3>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
        <Outlet />
      </main>
    </>
  );
};
MovieDetails.propTypes = {
  movie: PropTypes.object,
  movieCategories: PropTypes.string,
};
