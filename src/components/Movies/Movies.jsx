import { Link } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Movies.module.css';
import { fetchSearch } from '../Api/Api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const Movies = () => {
  const [query, setQuery] = useState('');
  const [moviesByTerm, setMoviesByTerm] = useState([]);

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
      }
    };
    if (query.length > 0) {
      fetchMoviesByterm(query);
    } else {
      Notify.info("You didn't write anything !");
    }
  };

  return (
    <main>
      <div className={css.searchbar}>
        <form onSubmit={handleSubmit} className={css.searchForm}>
          <input
            className={css.searchFormInput}
            type="text"
            name="searchQuery"
            autoComplete="off"
            placeholder="Search movies"
          />
          <button className={css.searchFormButton} type="submit">
            Search
          </button>
        </form>
      </div>
      {query.length > 0 && (
        <div className="TitlesBySearch">
          {moviesByTerm.length === 0 ? (
            <p>There is no match for query: {query}</p>
          ) : (
            <>
              <h2>Query: {query}</h2>
              <ul>
                {moviesByTerm.map(movie => (
                  <li key={movie.id}>
                    <Link to={`${movie.id}`}>{movie.title}</Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </main>
  );
};

Movies.propTypes = {
  query: PropTypes.string,
  handleSubmit: PropTypes.func,
  getMovieById: PropTypes.func,
  moviesByTerm: PropTypes.arrayOf(PropTypes.objectOf),
};
export default Movies;
