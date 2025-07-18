import { getImageUrl, getMovieDetails } from '@/services/api';
import { Movie } from '@/types/Movie';
import { Info } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
    movie: Movie;
}
export default function HeroHeader({ movie }: HeroProps) {
    const [trailerKey, setTrailerKey] = useState<string | null>(null);

    useEffect(() => {
        if (!movie?.id) return;
        const loadTrailer = async () => {
            try {
                const response = await getMovieDetails(movie.id?.toString());
                const trailers = response.videos?.results.find(
                    (video: any) => video.type === 'Trailer'
                );
                setTrailerKey(trailers?.key || null);
            } catch (error) {
                console.error('Failed to load trailer:', error);
            }
        };
        loadTrailer();
    }, [movie.id]);

    return (
        <div className="relative w-full h-screen overflow-hidden no-scrollbar">
            <div className="absolute inset-0">
                {trailerKey ? (
                    <div className="relative w-full h-full">
                        <iframe
                            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&showinfo=0&loop=1&playlist=${trailerKey}&disablekb=1&modestbranding=1`}
                            title="Movie Trailer"
                            className="w-full h-full scale-150"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                ) : (
                    <img
                        src={getImageUrl(movie.backdrop_path, 'original/')}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                )}
                <div className="absolute h-screen inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black z-10" />
            </div>
            <div className="absolute z-20 top-1/3 left-4 space-y-4 text-white px-4 sm:px-8 md:px-16">
                <div className="max-w-2xl">
                    <h1 className="text-2xl md:text-5xl font-bold text-white mb-4">
                        {movie.title}
                    </h1>
                    <p className="text-sm text-gray-200 mb-8 line-clamp-3">
                        {movie.overview}
                    </p>
                    <div className="flex space-x-4">
                        <Link
                            to={`/movie/${movie.id}`}
                            className="flex items-center px-6 py-2 bg-gray-500/70 text-white rounded-md hover:bg-gray-600/70 transition-colors"
                        >
                            <Info className="w-5 h-5 mr-2" />
                            More Info
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
