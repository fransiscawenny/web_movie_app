import { Movie } from '@/types/Movie';
import axios from 'axios';

const API_KEY = 'acc482b12552305330d59615618acf55';
// const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const getImageUrl = (path: string | null | undefined, size = 'w500') =>
    path ? `https://image.tmdb.org/t/p/${size}${path}` : '';

export const fetchMovies = async (
    category: string,
    page: number
): Promise<Movie[]> => {
    const res = await axios.get(
        `${BASE_URL}/movie/${category}?api_key=${API_KEY}&page=${page}`
    );
    return res?.data?.results;
};

export const getMovieDetails = async (id: string) => {
    const res = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`, {
        params: { append_to_response: 'credits,videos' },
    });
    return res.data;
};

export const searchMovies = async (query: string, page = 1) => {
    const res = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
    );
    return res?.data?.results;
};
