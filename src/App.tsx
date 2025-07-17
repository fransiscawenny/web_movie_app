import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '@/pages/Home';
import MovieDetail from '@/pages/MovieDetail';
import Navbar from './components/Navbar';
import MovieSearchPage from './pages/MovieSearchPage';
import { useMovieStore } from './store/useMovieStore';
import { useEffect } from 'react';
import MovieSpecificCategory from './components/MovieSpecificCategory';

function App() {
    const location = useLocation();
    const { setSearchTerm } = useMovieStore();

    useEffect(() => {
        // Clear query when leaving /search
        if (location.pathname !== '/search') {
            setSearchTerm('');
        }
    }, [location.pathname, setSearchTerm]);

    return (
        <div className="min-h-screen text-white bg-black">
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
        </div>
    );
}

export default App;
