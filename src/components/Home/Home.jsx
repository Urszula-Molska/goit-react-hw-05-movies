import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchTrending } from '../../Api/Api.js';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetchTrending();
      setMovies(response.results);
    };
    fetchMovies();
  }, []);

  return (
    <>
      <main>
        <h2>Trending today: </h2>
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Home;
