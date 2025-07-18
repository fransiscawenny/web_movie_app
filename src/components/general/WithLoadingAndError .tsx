import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import Loading from './Loading';
import Retry from './Retry';

export default function WithLoadingAndError({
    children,
}: {
    children: React.ReactNode;
}) {
    const loading = useAppStore((state) => state.loading);
    const error = useAppStore((state) => state.error);

    if (loading) return <Loading />;
    if (error) return <Retry error={error} />;
    return <>{children}</>;
}
