import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { fetchCast } from '../../Api/Api.js';

export const Cast = () => {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);

  const createId = () => {
    const id = nanoid();
    return id;
  };

  useEffect(() => {
    const getCast = async () => {
      const movieCast = await fetchCast(movieId);
      setMovieCast(movieCast.cast);
    };
    getCast(movieId);
  }, [movieId]);

  return (
    <>
      <h2>Cast</h2>
      <ul>
        {movieCast.map(cast => (
          <li key={createId()} style={{ listStyle: 'none' }}>
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

export default Cast;
