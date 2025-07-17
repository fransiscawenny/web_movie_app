import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (CATEGORY: string, page: number) => {
    const res = await axios.get(
        `${BASE_URL}/movie/${CATEGORY}?api_key=${API_KEY}&page=${page}`
    );
    return res.data;
};

export const getMovieDetails = async (id: string) => {
    const res = await axios.get(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
    );
    return res.data;
};

export const searchMovies = async (query: string, page = 1) => {
    const res = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
    );
    return res.data;
};
