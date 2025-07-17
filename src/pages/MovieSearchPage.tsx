import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { Movie } from '@/types/Movie';
import { fetchMovies, searchMovies } from '@/services/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '@/components/general/Loading';

export default function MovieSearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState<number>(1);

    const handleSearch = async () => {
        if (!query) return;
        try {
            setLoading(true);
            setPage(1);
            const results = await searchMovies(query, 1);
            setMovies(results);
        } catch (error) {
            console.error('Error searching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadMoreMovies = async () => {
        try {
            const nextPage = page + 1;
            const newResults = await searchMovies(query, nextPage);
            setMovies((prev) => [...prev, ...newResults]);
            setPage(nextPage);
        } catch (error) {
            console.error('Error loading more movies:', error);
        }
    };

    useEffect(() => {
        handleSearch();
    }, [query]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold mb-8">
                    Search Results for "{query}"
                </h1>
                {movies?.length === 0 ? (
                    <p className="text-gray-400 text-center py-12">
                        No movies found matching your search.
                    </p>
                ) : (
                    <InfiniteScroll
                        dataLength={movies.length}
                        next={loadMoreMovies}
                        hasMore={true}
                        loader={<Loading />}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                    >
                        {movies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                width="w-full"
                            />
                        ))}
                    </InfiniteScroll>
                )}
            </div>
        </div>
    );
}
