import Link from 'next/link'
import React from 'react'
import AuthGuard from '../../../components/AuthGuard'
import { useRouter } from 'next/router'
import { AuthActions } from '../../../zustand/auth.store'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    const handleLogout = () => {
        // Perform logout logic here, e.g., clearing tokens, etc.
        // For example:
        // localStorage.removeItem('token');
        // Redirect to login page
        AuthActions.logout()
        router.push('/login');
    }

    return (
        <AuthGuard>
            <div className='h-auto px-3 min-h-screen bg-[#F9FBFC]'>
                <header className='w-full h-[62px] bg-white flex justify-center gap-3 items-center ' >
                    <Link className='px-[10px] text-sm font-semibold text-[#1F2126]' href={"/dashboard"}>Home</Link>
                    <Link className='px-[10px] text-sm font-semibold text-[#1F2126]' href={"#"}>Vendors</Link>
                    <button onClick={handleLogout} className='px-[10px] text-sm font-semibold text-[#25479e]'>Logout</button>
                </header>
                <div className='flex w-full  mx-auto justify-center py-12'>
                    {children}
                </div>
            </div>
        </AuthGuard>
    )
}

export default DashboardLayout