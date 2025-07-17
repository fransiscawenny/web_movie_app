import { create } from 'zustand';

type MovieStore = {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
};

export const useMovieStore = create<MovieStore>((set) => ({
    searchTerm: '',
    setSearchTerm: (term) => set({ searchTerm: term }),
    selectedCategory: '',
    setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
