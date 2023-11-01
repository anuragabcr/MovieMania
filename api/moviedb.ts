import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

const apiCall = async (endpoind, params?) => {
  const options = {
    method: "GET",
    url: endpoind,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("ERROR:- ", error);
    return {};
  }
};

export const fetchTrending = () => {
  const trending = `${BASE_URL}/trending/movie/day?language=en-US&api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`;
  return apiCall(trending);
};

export const fetchPlaying = () => {
  const trending = `${BASE_URL}/movie/now_playing?language=en-US&api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`;
  return apiCall(trending);
};

export const fetchPopular = () => {
  const trending = `${BASE_URL}/movie/popular?language=en-US&api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`;
  return apiCall(trending);
};

export const fetchUpcoming = () => {
  const upcoming = `${BASE_URL}/movie/upcoming?language=en-US&page=1&api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`;
  return apiCall(upcoming);
};

export const fetchTopRated = () => {
  const top_rated = `${BASE_URL}/movie/top_rated?language=en-US&page=1&api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`;
  return apiCall(top_rated);
};

export const fetchDetails = (id) => {
  const details = `${BASE_URL}/movie/${id}?language=en-US&api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`;
  return apiCall(details);
};

export const fetchCredits = (id) => {
  const credits = `${BASE_URL}/movie/${id}/credits?language=en-US&api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`;
  return apiCall(credits);
};

export const fetchSimilar = (id) => {
  const similar = `${BASE_URL}/movie/${id}/similar?language=en-US&api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`;
  return apiCall(similar);
};
