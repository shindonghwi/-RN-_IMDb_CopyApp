const API_KEY = "6af4fcae26906604686c7328b79cf4b9";
const BASE_URL = "https://api.themoviedb.org/3";

const trending = () => fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((res) => res.json());

const upComing = () =>
    fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`).then((res) => res.json());

const nowPlaying = () =>
    fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`).then((res) => res.json());

export const moviesApi = { trending, upComing, nowPlaying };
