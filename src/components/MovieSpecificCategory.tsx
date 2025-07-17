// CategoryPage.tsx
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function MovieSpecificCategory() {
    // const { category } = useParams();
    // const { movies, fetchMore, hasMore } =
    //     useCategoryMoviesWithInfiniteScroll(category); // Custom hook

    return (
        <div className="px-4 py-6 text-white">
            {/* <h1 className="text-2xl font-bold mb-4 capitalize">
                {category.replaceAll('_', ' ')}
            </h1>
            <InfiniteScroll
                dataLength={movies.length}
                next={fetchMore}
                hasMore={hasMore}
                loader={<p>Loading...</p>}
            >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </InfiniteScroll> */}
        </div>
    );
}
