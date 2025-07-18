jest.mock('@/assets/no-image.png', () => 'no-image.png');
import { render, screen, waitFor } from '@testing-library/react';
import MovieSearchPage from '@/pages/MovieSearchPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as api from '@/services/api';

jest.mock('@/services/api');
const mockedSearchMovies = api.searchMovies as jest.Mock;

const mockMovies = [
    {
        id: 1,
        title: 'Superman',
        poster_path: '/poster1.jpg',
        release_date: '2022-01-01',
    },
];

describe('MovieSearchPage', () => {
    it('renders search results when query matches', async () => {
        mockedSearchMovies.mockResolvedValue(mockMovies);

        render(
            <MemoryRouter initialEntries={['/search?q=Superman']}>
                <Routes>
                    <Route path="/search" element={<MovieSearchPage />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(
                screen.getByText(/Search Results for "Superman"/i)
            ).toBeInTheDocument();
        });
    });

    it('shows message when no search results found', async () => {
        mockedSearchMovies.mockResolvedValue([]);

        render(
            <MemoryRouter initialEntries={['/search?q=unknownmovie']}>
                <Routes>
                    <Route path="/search" element={<MovieSearchPage />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(
                screen.getByText(/No movies found matching your search/i)
            ).toBeInTheDocument();
        });
    });
});
