// CategoryPage.tsx
import { categories } from '@/helpers/dataConstant';
import { fetchMovies } from '@/services/api';
import { useAppStore } from '@/store/useAppStore';
import { Movie } from '@/types/Movie';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from './general/Loading';
import MovieCard from './MovieCard';

export default function MovieSpecificCategory() {
    const { category } = useParams();
    const selectedCategory = categories.find(
        (cat) => cat.slug === category
    )?.name;
    const [movies, setMovies] = useState<Movie[]>([]);
    const setLoading = useAppStore((s) => s.setLoading);
    const setError = useAppStore((s) => s.setError);
    const [page, setPage] = useState<number>(1);
    const navigate = useNavigate();

    const loadMoreMovies = async () => {
        try {
            if (!category) return;
            const nextPage = page + 1;
            const results = await fetchMovies(category, nextPage);
            setMovies((prev) => [...prev, ...results]);
            setPage((prev) => prev + 1);
        } catch (error) {
            console.error('Error loading more movies:', error);
        }
    };
    useEffect(() => {
        const getListMovies = async () => {
            try {
                setLoading(true);
                if (!category) return;
                const results = await fetchMovies(category, 1);
                setMovies(results);
                console.log(movies);
                setLoading(false);
            } catch (err: any) {
                setError(
                    err.message ||
                        'Failed to load movies. Please try again later.'
                );
            } finally {
                setLoading(false);
            }
        };
        getListMovies();
    }, [category]);

    return (
        <div className="min-h-screen bg-black pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate('/')}
                    className="absolute top-14 left-6 px-2 py-1 text-white"
                >
                    <ArrowLeft className="inline mr-2" /> Back
                </button>
                <h1 className="text-2xl font-bold mb-8">
                    Movie Category "{selectedCategory}"
                </h1>
                {movies?.length === 0 ? (
                    <p className="text-gray-400 text-center py-12">
                        No movies for Category "{selectedCategory}".
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
