import Link from 'next/link'
import React from 'react'
import AuthGuard from '../../../components/AuthGuard'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <AuthGuard>
            <div className='h-auto px-3 min-h-screen bg-[#F9FBFC]'>
                <header className='w-full h-[62px] bg-white flex justify-center gap-3 items-center ' >
                    <Link className='px-[10px] text-sm font-semibold text-[#1F2126]' href={"/dashboard"}>Home</Link>
                    <Link className='px-[10px] text-sm font-semibold text-[#1F2126]' href={"#"}>Vendors</Link>

                </header>
                <div className='flex w-full  mx-auto max-w-[630px] py-12'>
                    {children}
                </div>

            </div>
        </AuthGuard>

    )
}

export default DashboardLayout