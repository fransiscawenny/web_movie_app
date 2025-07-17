import { useEffect, useState } from 'react';
import SearchBar from './filter/SearchBar';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import FilterCategory from './filter/FilterCategory';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed w-full z-40 transition-colors duration-300 ${
                isScrolled
                    ? 'bg-black'
                    : 'bg-gradient-to-b from-black to-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16 ml-auto w-full justify-between">
                    <Link to="/" className="flex items-center">
                        <span className="text-red-600 text-2xl font-bold">
                            FLIXNET
                        </span>
                    </Link>
                    <div className="md:flex hidden items-center w-full space-x-8">
                        <SearchBar />
                        <FilterCategory />
                    </div>
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <SearchBar />
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
