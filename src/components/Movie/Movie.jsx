export const Movie = ({ movie, movieCategories }) => {
  const date = new Date(movie.release_date);
  const releaseDate = date.getFullYear();
  const image = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  return (
    <>
      <main>
        <h2>
          {' '}
          {movie.title} ({releaseDate})
        </h2>
        <h3>Vote average: {movie.vote_average} </h3>

        <img className="movie-image" src={image} alt={movie.title} />

        <h3>Overview: </h3>
        <p>{movie.overview}</p>
        <h3>Genres</h3>
        <p>{movieCategories} </p>
      </main>
    </>
  );
};
