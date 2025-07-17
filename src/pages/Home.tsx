import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { fetchMovies, searchMovies } from '@/services/api';
import { Movie } from '@/types/Movie';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [category, setCategory] = useState<string>('popular');
    const [page, setPage] = useState<number>(1);
    const [ , setQuery] = useState<string>('');
    const CATEGORIES = ['now_playing', 'popular', 'top_rated', 'upcoming'];

    const loadMoreMovies = () => {
        fetchMovies(category, page + 1).then((res) => {
            setPage((prevValue) => prevValue + 1);
            setMovies([...movies, ...res.results]);
        });
    };

    const handleSearch = async (q: string) => {
        setQuery(q);
        setPage(1);

        if (q) {
            const data = await searchMovies(q, 1);
            setMovies(data.results);
        } else {
            const data = await fetchMovies(category, 1);
            setMovies(data.results);
        }
    };

    useEffect(() => {
        fetchMovies(category, page).then((res) => {
            return setMovies(res.results);
        });
    }, [category]);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">
                {category.toUpperCase()} Movies
            </h1>
            <SearchBar onSearch={handleSearch} />
            <div className="mb-4 flex gap-2">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => {
                            setCategory(cat);
                            setPage(1);
                        }}
                    >
                        {cat.replace('_', ' ')}
                    </button>
                ))}
            </div>
            <InfiniteScroll
                dataLength={movies.length}
                next={loadMoreMovies}
                hasMore={true}
                loader={<p>Loading...</p>}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </InfiniteScroll>
        </div>
    );
}
