import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter } from 'lucide-react'; // optional icon library
import { useMovieStore } from '@/store/useMovieStore';

const categories = [
    { name: 'Now Playing', slug: 'now_playing' },
    { name: 'Popular', slug: 'popular' },
    { name: 'Top Rated', slug: 'top_rated' },
    { name: 'Upcoming', slug: 'upcoming' },
];

export default function FilterCategory() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { setSelectedCategory } = useMovieStore();

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (category: { name: string; slug: string }) => {
        setSelectedCategory(category.slug);
        setOpen(false);
        navigate(`/category/${category.slug}`);
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded"
            >
                <Filter size={16} />
                <span>Category</span>
            </button>

            {open && (
                <div className="absolute mt-3 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 right-0">
                    <div className="py-1">
                        {categories.map((cat) => (
                            <button
                                key={cat.slug}
                                onClick={() => handleSelect(cat)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
