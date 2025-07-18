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
import AnimationPageWrapper from './components/general/AnimationPageWrapper';
import { AnimatePresence } from 'framer-motion';

const routes = [
    { path: '/', element: <Home /> },
    { path: '/movie/:id', element: <MovieDetail /> },
    { path: '/search', element: <MovieSearchPage /> },
    { path: '/category/:category', element: <MovieSpecificCategory /> },
];

function App() {
    const location = useLocation();
    const setSearchTerm = useMovieStore((state) => state.setSearchTerm);

    useResetOnRouteChange();

    useEffect(() => {
        const hasQuery =
            location.pathname === '/search' && location.search.includes('q=');
        if (!hasQuery) {
            setSearchTerm('');
        }
    }, [location.pathname, location.search, setSearchTerm]);

    return (
        <div className="min-h-screen text-white bg-black">
            <ScrollToTop />
            <FloatingScrollTopButton />
            <WithLoadingAndError>
                <Navbar />
                <AnimatePresence mode="wait">
                    <Routes location={location}>
                        {routes.map(({ path, element }) => (
                            <Route
                                key={path}
                                path={path}
                                element={
                                    <AnimationPageWrapper
                                        key={location.pathname}
                                    >
                                        {element}
                                    </AnimationPageWrapper>
                                }
                            />
                        ))}
                    </Routes>
                </AnimatePresence>
            </WithLoadingAndError>
        </div>
    );
}

export default App;
