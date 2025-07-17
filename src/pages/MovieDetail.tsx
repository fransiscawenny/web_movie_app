import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getImageUrl, getMovieDetails } from '@/services/api';
import { MovieDetailInterface } from '@/types/MovieDetail';
import { ArrowLeft } from 'lucide-react';
import Loading from '@/components/general/Loading';

export default function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState<MovieDetailInterface>();
    const [loading, setLoading] = useState(true);

    const fetchMovieDetails = async () => {
        setLoading(true);
        try {
            if (!id) return;
            const movieDetails = await getMovieDetails(id);
            setMovie(movieDetails);
        } catch (error) {
            console.error('Failed to fetch movie details:', error);
            setMovie(undefined); // Reset movie state on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovieDetails();
    }, [id]);

    const director =
        movie?.credits?.crew
            .filter((d) => d.job === 'Director')
            .slice(0, 5)
            .map((d) => d.name)
            .join(', ') || 'Unknown';
    const cast =
        movie?.credits?.cast
            .filter((c) => c.order < 5)
            .sort((a, b) => a.order - b.order) || [];
    const genres = movie?.genres.map((g) => g.name).join(', ');

    if (loading) {
        return <Loading />;
    }
    return (
        <div className="relative w-full h-screen text-white">
            <div className="absolute inset-0">
                <img
                    src={getImageUrl(movie?.backdrop_path)}
                    alt={movie?.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/40" />
            </div>
            <div className="relative z-10 py-10 px-14 h-full flex flex-col justify-end max-w-7xl mx-auto">
                <button
                    onClick={() => navigate('/')}
                    className="absolute top-16 left-6 px-2 py-1 text-white"
                >
                    <ArrowLeft className="inline mr-2" /> Back
                </button>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-5xl font-bold">{movie?.title}</h1>
                        <div className="flex flex-row items-center gap-6">
                            <div className="text-base inline-flex items-center space-x-1">
                                <p>⭐ {movie?.vote_average} </p>
                                <p className="text-gray-400 text-sm -mt-[2.5px]">
                                    |
                                </p>
                                <p className="text-[13px]">
                                    {movie?.vote_count}
                                </p>
                            </div>
                            <p className="text-xs">
                                {movie?.runtime} mins • {genres || 'Unknown'} •{' '}
                                {movie?.release_date?.split('-')[0]}
                            </p>
                        </div>
                        <p className="max-w-2xl text-gray-300">
                            {movie?.overview}
                        </p>
                    </div>
                    <div className="flex flex-col justify-between gap-2">
                        <div className="flex flex-col">
                            <h2 className="text-xl font-semibold text-white mt-6 mb-2">
                                Cast
                            </h2>
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {cast?.map((actor) => (
                                    <div
                                        key={actor?.id}
                                        className="w-16 flex-shrink-0 text-center text-white"
                                    >
                                        <img
                                            src={getImageUrl(
                                                actor?.profile_path
                                            )}
                                            alt={actor?.name}
                                            className="w-14 h-14 object-cover rounded-full mx-auto"
                                            loading="lazy"
                                        />
                                        <p className="mt-1 text-sm">
                                            {actor?.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-xl font-semibold text-white">
                                Director
                            </h2>
                            <p className="mt-1 text-sm">{director}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
