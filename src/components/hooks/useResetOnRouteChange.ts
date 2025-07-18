import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

export const useResetOnRouteChange = () => {
    const location = useLocation();
    const setError = useAppStore((state) => state.setError);
    const setLoading = useAppStore((state) => state.setLoading);

    useEffect(() => {
        setError(null);
        setLoading(false);
    }, [location.pathname, setError, setLoading]);
};
