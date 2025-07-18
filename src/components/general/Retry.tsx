import React from 'react';

export default function Retry({ error }: { error: string }) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <p className="text-xl text-red-500 mb-4">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                    Retry
                </button>
            </div>
        </div>
    );
}
