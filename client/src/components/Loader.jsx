import React, { useEffect } from 'react';
import { useAppContext } from '../Context/AppContext';
import { useParams } from 'react-router-dom';

export const Loader = () => {
    const { navigate } = useAppContext();
    const { nextUrl } = useParams();

    useEffect(() => {
        if (nextUrl) {
            setTimeout(() => {
                navigate(`/${nextUrl}`);
            }, 2000);

        }
    }, [nextUrl]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500 border-solid"></div>
            <p className="mt-6 text-lg text-gray-700">Loading, please wait...</p>
        </div>
    );
};
