import { create } from 'zustand';

type AppState = {
    loading: boolean;
    error: string | null;
    setLoading: (value: boolean) => void;
    setError: (error: string | null) => void;
};

export const useAppStore = create<AppState>((set) => ({
    loading: false,
    error: null,
    setLoading: (value) => set({ loading: value }),
    setError: (err) => set(() => ({ error: err })),
}));
