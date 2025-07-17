import { useMovieStore } from '@/store/useMovieStore';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
    const { searchTerm, setSearchTerm } = useMovieStore();
    const navigate = useNavigate();

    useEffect(() => {
        const trimmed = searchTerm.trim();

        const handler = setTimeout(() => {
            if (trimmed) {
                navigate(`/search?q=${encodeURIComponent(trimmed)}`);
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [searchTerm, navigate]);

    const clearInput = () => {
        setSearchTerm('');
    };

    return (
        <div className="relative w-full md:w-fit ml-auto">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for movies..."
                className="w-full pr-10 px-4 py-2 rounded-full bg-black/30 placeholder-gray-400 text-white border border-gray-600 focus:outline-none focus:border-gray-500"
            />

            {searchTerm && (
                <button
                    onClick={clearInput}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
                >
                    <X size={18} />
                </button>
            )}
        </div>
    );
}
