import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMovieDetails } from '@/services/api';
import { MovieDetailInterface } from '@/types/MovieDetail';

export default function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState<MovieDetailInterface>();

    useEffect(() => {
        if (!id) return;
        getMovieDetails(id).then((res) => {
            console.log('🚀 ~ useEffect ~ res:', res);
            return setMovie(res);
        });
    }, [id]);

    const director = movie?.credits?.crew.find((d) => d.job === 'Director');
    const cast = movie?.credits?.cast
        .slice(0, 5)
        .map((c) => c.name)
        .join(', ');

    console.log('🚀 ~ MovieDetail ~ movie:', movie);
    return (
        <div className="p-4 text-black bg-white min-h-screen">
            <button onClick={() => navigate(-1)} className="mb-4 text-blue-500">
                ← Back
            </button>
            <img
                src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`}
                alt={movie?.title}
            />
            <h1 className="text-3xl font-bold">{movie?.title}</h1>
            <p>{movie?.overview}</p>
            <p>
                <strong>Director:</strong> {director?.name}
            </p>
            <p>
                <strong>Main Cast:</strong> {cast}
            </p>
        </div>
    );
}
