import { Link } from 'react-router-dom';

export const Home = ({ movies, getMovieById }) => {
  return (
    <>
      <main>
        <h2>Trending today: </h2>
        <ul>
          {movies.map(movie => (
            <li
              key={movie.id}
              onClick={() => {
                getMovieById(movie.id);
              }}
            >
              <Link to={`movies/:${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};
