export const Cast = ({ movieCast }) => {
  //const actorImage = `https://image.tmdb.org/t/p/w500/${}`;
  return (
    <>
      <h2>Cast</h2>
      <ul>
        {movieCast.map(cast => (
          <li key={cast.id} style={{ listStyle: 'none' }}>
            <img
              style={{ width: '200px' }}
              src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
              alt={`picture of ${cast.name}`}
            />
            <p>{cast.name}</p>
            <p>character: {cast.character}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
