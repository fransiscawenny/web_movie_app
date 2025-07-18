import { useMovieStore } from '@/store/useMovieStore';
import { Movie } from '@/types/Movie';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';

interface ListMovieHomeProps {
    title: string;
    movies: Movie[];
    category: string;
}
export default function ListMovieHome({
    title,
    movies,
    category,
}: ListMovieHomeProps) {
    const currentRowRef = useRef<HTMLDivElement>(null);
    const setSelectedCategory = useMovieStore(
        (state) => state.setSelectedCategory
    );
    const navigate = useNavigate();

    if (!movies?.length) return null;

    const slide = (direction: 'left' | 'right') => {
        if (currentRowRef.current) {
            const { scrollLeft, clientWidth } = currentRowRef.current;
            const slideTo =
                direction === 'left'
                    ? scrollLeft - clientWidth
                    : scrollLeft + clientWidth;
            currentRowRef.current.scrollTo({
                left: slideTo,
                behavior: 'smooth',
            });
        }
    };

    const handleClick = () => {
        setSelectedCategory(category);
        navigate(`/category/${category}`);
    };
    return (
        <div className="space-y-2 px-4 mt-4">
            <div className="flex items-center justify-between relative group">
                <button
                    onClick={handleClick}
                    className="relative flex flex-row items-center space-x-2 w-full"
                >
                    <h2 className="text-xl font-semibold text-white">
                        {title}
                    </h2>
                    <div className="mt-1.5 flex items-center space-x-1 text-xs text-gray-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 hover:text-white">
                        <span>Expand All</span>
                        <ChevronRight size={16} />
                    </div>
                </button>
            </div>

            <div className="group relative">
                <button
                    className="absolute left-0 top-0 bottom-0 z-40 hidden group-hover:block bg-black/50 px-2"
                    onClick={() => slide('left')}
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <div
                    ref={currentRowRef}
                    className="flex space-x-4 overflow-x-scroll scrollbar-hide scroll-smooth no-scrollbar"
                >
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            width="w-[150px] flex-shrink-0"
                        />
                    ))}
                </div>

                <button
                    className="absolute right-0 top-0 bottom-0 z-40 hidden group-hover:block bg-black/50 px-2"
                    onClick={() => slide('right')}
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
