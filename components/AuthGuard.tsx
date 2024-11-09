// components/AuthGuard.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../zustand/auth.store';

export default function AuthGuard({ children }: { children: any }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token: any = useAuth.getState().token;
        if (!token) {
            router.push('/');
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    // Render loading state until auth check is complete
    if (!isAuthenticated) {
        return <div>Loading...</div>;
    }

    return children;
}
