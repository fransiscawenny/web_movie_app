import { render, waitFor } from '@testing-library/react';
import HeroHeader from '@/components/HeroHeader';
import { Movie } from '@/types/Movie';
import { BrowserRouter } from 'react-router-dom';
import * as api from '@/services/api';

jest.mock('@/services/api');

const mockMovie: Movie = {
    id: 1061474,
    title: 'Superman',
    release_date: '2025-07-09',
    poster_path: '/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg',
    backdrop_path: '/ApRxyHFuvv5yghedxXPJSm9FEDe.jpg',
    overview: 'Awesome movie overview',
};

describe('HeroHeader', () => {
    it('renders movie title and overview', async () => {
        (api.getMovieDetails as jest.Mock).mockResolvedValue({
            videos: {
                results: [],
            },
        });

        const { getByText } = render(
            <BrowserRouter>
                <HeroHeader movie={mockMovie} />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(getByText(/Superman/i)).toBeInTheDocument();
            expect(getByText(/Awesome movie overview/i)).toBeInTheDocument();
        });
    });
});
