// pages/404.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../zustand/auth.store';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    // Check for the SESSION cookie
        const sessionToken =  useAuth.getState().token;

    // Redirect based on whether the token is present
    if (sessionToken) {
      // If token is present, redirect to dashboard
      router.replace('/dashboard');
    } else {
      // If token is absent, redirect to login
      router.replace('/');
    }
  }, [router]);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}
