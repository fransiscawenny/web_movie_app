import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '@/pages/Home';
import MovieDetail from '@/pages/MovieDetail';
import Navbar from './components/Navbar';
import MovieSearchPage from './pages/MovieSearchPage';
import { useMovieStore } from './store/useMovieStore';
import { useEffect } from 'react';
import MovieSpecificCategory from './components/MovieSpecificCategory';
import WithLoadingAndError from './components/general/WithLoadingAndError ';
import { useResetOnRouteChange } from './components/hooks/useResetOnRouteChange';
import ScrollToTop from './components/general/ScrollToTop';
import FloatingScrollTopButton from './components/general/FloatingScrollTopButton';

function App() {
    const location = useLocation();
    const setSearchTerm = useMovieStore((state) => state.setSearchTerm);

    useResetOnRouteChange();

    useEffect(() => {
        // Clear query when leaving /search
        if (location.pathname !== '/search') {
            setSearchTerm('');
        }
    }, [location.pathname, setSearchTerm]);

    return (
        <div className="min-h-screen text-white bg-black">
            <ScrollToTop />
            <FloatingScrollTopButton />
            <WithLoadingAndError>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movie/:id" element={<MovieDetail />} />
                    <Route path="/search" element={<MovieSearchPage />} />
                    <Route
                        path="/category/:category"
                        element={<MovieSpecificCategory />}
                    />
                </Routes>
            </WithLoadingAndError>
        </div>
    );
}

export default App;
