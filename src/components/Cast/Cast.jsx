import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchCast } from '../Api/Api.js';

export const Cast = () => {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);

  useEffect(() => {
    const getCast = async () => {
      const movieCast = await fetchCast(movieId);
      setMovieCast(movieCast.cast);
    };
    getCast(movieId);
  }, []);

  return (
    <>
      <h2>Cast</h2>
      <ul>
        {movieCast.map(cast => (
          <li key={cast.id} style={{ listStyle: 'none' }}>
            <img
              style={{ width: '200px' }}
              src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
              alt={`${cast.name}'s portrait`}
            />
            <p>{cast.name}</p>
            <p>character: {cast.character}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

Cast.propTypes = {
  movieCast: PropTypes.arrayOf(PropTypes.objectOf),
};
export default Cast;
