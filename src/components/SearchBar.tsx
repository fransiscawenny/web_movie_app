import { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [input, setInput] = useState<string>('');

    return (
        <input
            type="text"
            value={input}
            onChange={(e) => {
                const value = e.target.value;
                setInput(value);
                onSearch(value);
            }}
            placeholder="Search for movies..."
            className="w-full p-2 rounded mb-4 text-black"
        />
    );
}
