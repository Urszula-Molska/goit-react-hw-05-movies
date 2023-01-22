import PropTypes from 'prop-types';

export const Cast = ({ movieCast }) => {
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
