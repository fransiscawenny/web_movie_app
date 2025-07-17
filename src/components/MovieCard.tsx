import moment from 'moment';
import { Movie } from '@/types/Movie';
import { Link } from 'react-router-dom';

interface MovieCardProps {
    movie: Movie;
}
export default function MovieCard({ movie }: MovieCardProps) {
    return (
        <Link to={`/movie/${movie.id}`}>
            <div className="bg-white rounded-lg shadow-md p-4">
                <img
                    src={
                        movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : 'https://via.placeholder.com/500x750?text=No+Image+Available'
                    }
                    alt={movie.title}
                    className="w-full h-auto rounded"
                />
                <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
                <p className="text-gray-600">
                    Release Year: {moment(movie.release_date).get('year')}
                </p>
            </div>
        </Link>
    );
}
