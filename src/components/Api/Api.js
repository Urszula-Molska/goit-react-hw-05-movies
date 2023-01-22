import axios from 'axios';
let ApiKey = '209b988e1e5a3c54f84bfbe290fdf3e2';

export const fetchTrending = async () => {
  const URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${ApiKey}`;
  try {
    const response = await axios.get(`${URL}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchDetails = async movieId => {
  const URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${ApiKey}`;
  try {
    const response = await axios.get(`${URL}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
