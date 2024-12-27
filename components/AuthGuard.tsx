import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../zustand/auth.store';

export default function AuthGuard({ children }: { children: any }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    console.log(router.pathname)

    useEffect(() => {
        const token: any = useAuth.getState().token;
        if (!token) {
            if (router.pathname.includes("/invite")) {
                setIsAuthenticated(true);
            } else {
                router.push('/');
            }
        } else {
            if (router.pathname === '/' || router.pathname === '/create-account') {
                router.push('/dashboard');
            } else {
                setIsAuthenticated(true);
            }
        }
    }, [router]);

    // Render loading state until auth check is complete
    if (!isAuthenticated) {
        return <div>Loading...</div>;
    }

    return children;
}
