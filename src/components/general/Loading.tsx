import React from 'react';

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen overflow-hidden">
            <div className=" border-4 border-red-600 border-t-transparent w-10 h-10 rounded-full animate-spin"></div>
        </div>
    );
}
