import PropTypes from 'prop-types';

export const Reviews = ({ movieReviews }) => {
  return (
    <>
      <h2>Reviews</h2>
      {movieReviews.length === 0 ? (
        <p>There is no review for this movie</p>
      ) : (
        <ul>
          {movieReviews.map(review => (
            <li key={review.cretaed_at}>
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
  movieReviews: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    )
  ),
};
export default Reviews;
