jest.mock('@/assets/no-image.png', () => 'no-image.png');
import MovieSpecificCategory from '@/components/MovieSpecificCategory';
import * as api from '@/services/api';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

jest.mock('@/services/api');
const mockedFetchMovies = api.fetchMovies as jest.Mock;

const mockMovies = [
    {
        id: 1,
        title: 'Movie One',
        poster_path: '/poster1.jpg',
        release_date: '2020-01-01',
    },
    {
        id: 2,
        title: 'Movie Two',
        poster_path: '/poster2.jpg',
        release_date: '2021-01-01',
    },
];

describe('MovieSpecificCategory', () => {
    it('renders movies from specific category', async () => {
        mockedFetchMovies.mockResolvedValue(mockMovies);

        render(
            <MemoryRouter initialEntries={['/category/popular']}>
                <Routes>
                    <Route
                        path="/category/:category"
                        element={<MovieSpecificCategory />}
                    />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Movie Category/i)).toBeInTheDocument();
        });
    });

    it('renders message when no movies are found', async () => {
        mockedFetchMovies.mockResolvedValue([]);

        render(
            <MemoryRouter initialEntries={['/category/top_rated']}>
                <Routes>
                    <Route
                        path="/category/:category"
                        element={<MovieSpecificCategory />}
                    />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(
                screen.getByText(/No movies for Category/i)
            ).toBeInTheDocument();
        });
    });
});
