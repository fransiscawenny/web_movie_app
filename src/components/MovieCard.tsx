import moment from 'moment';
import { Movie } from '@/types/Movie';
import { Link } from 'react-router-dom';
import { getImageUrl } from '@/services/api';
import noImage from '@/assets/no-image.png';
interface MovieCardProps {
    movie: Movie;
    width: string;
}
export default function MovieCard({
    movie,
    width = 'w-[150px]',
}: MovieCardProps) {
    return (
        <Link
            to={`/movie/${movie?.id}`}
            className={`transition-transform duration-200 hover:scale-105 ${width}`}
        >
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-md">
                <img
                    src={
                        movie?.poster_path
                            ? getImageUrl(movie?.poster_path)
                            : noImage
                    }
                    alt={movie?.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 p-4">
                        <h3 className="text-sm font-semibold line-clamp-2">
                            {movie?.title}
                        </h3>
                        <p className="text-xs text-gray-300">
                            Release Year:{' '}
                            {moment(movie?.release_date).format('YYYY') ||
                                'Unknown'}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
