jest.mock('@/assets/no-image.png', () => 'no-image.png');
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Movie } from '@/types/Movie';
import MovieCard from '@/components/MovieCard';

describe('MovieCard', () => {
    const mockMovie: Movie = {
        id: 1061474,
        title: 'Superman',
        release_date: '2025-07-09',
        poster_path: '/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg',
        backdrop_path: '/ApRxyHFuvv5yghedxXPJSm9FEDe.jpg',
    };

    const renderComponent = (movie = mockMovie) =>
        render(
            <BrowserRouter>
                <MovieCard movie={movie} width="w-[150px]" />
            </BrowserRouter>
        );

    it('renders movie title and release year correctly', () => {
        renderComponent();

        expect(screen.getByText('Superman')).toBeInTheDocument();
        expect(screen.getByText(/2025/)).toBeInTheDocument();
    });

    it('renders poster image from API when poster_path exists', () => {
        renderComponent();

        const img = screen.getByRole('img');
        expect(img).toHaveAttribute(
            'src',
            'https://image.tmdb.org/t/p/w500/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg'
        );
        expect(img).toHaveAttribute('alt', 'Superman');
    });

    it('links to correct movie detail page', () => {
        renderComponent();

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/movie/1061474');
    });
});
