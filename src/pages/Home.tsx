import HeroHeader from '@/components/HeroHeader';
import ListMovieHome from '@/components/ListMovieHome';
import { fetchMovies } from '@/services/api';
import { useAppStore } from '@/store/useAppStore';
import { Movie } from '@/types/Movie';
import { useEffect, useState } from 'react';

export default function Home() {
    const [movies, setMovies] = useState<{
        nowPlaying: Movie[];
        popular: Movie[];
        topRated: Movie[];
        upcoming: Movie[];
    }>({
        nowPlaying: [],
        popular: [],
        topRated: [],
        upcoming: [],
    });
    const setLoading = useAppStore((s) => s.setLoading);
    const setError = useAppStore((s) => s.setError);

    useEffect(() => {
        const getListMovies = async () => {
            try {
                setLoading(true);
                const [nowPlaying, popular, topRated, upcoming] =
                    await Promise.all([
                        fetchMovies('now_playing', 1),
                        fetchMovies('popular', 1),
                        fetchMovies('top_rated', 1),
                        fetchMovies('upcoming', 1),
                    ]);

                setMovies({
                    nowPlaying,
                    popular,
                    topRated,
                    upcoming,
                });
                console.log(movies);
                setLoading(false);
            } catch (err) {
                setError('Failed to load movies. Please try again later.');
                console.error('Error loading movies:', err);
            } finally {
                setLoading(false);
            }
        };
        getListMovies();
    }, []);

    return (
        <div className="min-h-screen bg-black">
            {movies.nowPlaying?.length > 0 && (
                <HeroHeader movie={movies.nowPlaying[0]} />
            )}
            <div className="space-y-8 pb-8">
                <ListMovieHome
                    title="Now Playing"
                    movies={movies.nowPlaying}
                    category="now_playing"
                />
                <ListMovieHome
                    title="Popular"
                    movies={movies.popular}
                    category="popular"
                />
                <ListMovieHome
                    title="Top Rated"
                    movies={movies.topRated}
                    category="top_rated"
                />
                <ListMovieHome
                    title="Upcoming"
                    movies={movies.upcoming}
                    category="upcoming"
                />
            </div>
        </div>
    );
}
