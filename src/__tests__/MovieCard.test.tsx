import { render, screen } from '@testing-library/react';
import MovieCard from '@/components/MovieCard';
import { BrowserRouter } from 'react-router-dom';

const mockMovie = {
    id: 1061474,
    title: 'Superman',
    release_date: '2025-07-09',
    poster_path: '/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg',
};

test('renders movie title', () => {
    render(
        <BrowserRouter>
            <MovieCard movie={mockMovie} />
        </BrowserRouter>
    );
    expect(screen.getByText('Superman')).toBeInTheDocument();
});
