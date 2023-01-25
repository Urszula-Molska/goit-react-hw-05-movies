import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviews } from '../Api/Api.js';
import { nanoid } from 'nanoid';

export const Reviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);

  const createId = () => {
    const idReview = nanoid();
    return idReview;
  };

  useEffect(() => {
    const getReviews = async () => {
      const movieReviews = await fetchReviews(movieId);
      if (movieReviews.length > 0) {
        setMovieReviews(movieReviews);
      }
    };
    getReviews(movieId);
  }, []);

  return (
    <>
      <h2>Reviews</h2>
      {movieReviews.length === 0 ? (
        <p>There is no review for this movie</p>
      ) : (
        <ul>
          {movieReviews.map(review => (
            <li key={createId()}>
              <h3>author: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
Reviews.propTypes = {
  movieReviews: PropTypes.arrayOf(PropTypes.object),
};
export default Reviews;
