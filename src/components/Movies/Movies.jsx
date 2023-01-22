import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from './Movies.module.css';

export const Movies = ({ handleSubmit, moviesByTerm, getMovieById, query }) => {
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
                  <li
                    key={movie.id}
                    onClick={() => {
                      getMovieById(movie.id);
                    }}
                  >
                    <Link to={`:${movie.id}`}>{movie.title}</Link>
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
