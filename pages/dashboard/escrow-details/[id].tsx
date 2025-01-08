import React, { useState } from 'react'
import DashboardLayout from '../layout/dashboardLayout'
import HomeScreen from '../../../screens/dashboard/HomeScreen'
import EscrowDetails from '../../../screens/dashboard/Escrow-details'
import ViewBuyer from '../../../screens/dashboard/ViewBuyer'
import { useAuth } from '../../../zustand/auth.store'
import { useQuery } from 'react-query'
import { EscrowServices } from '../../../services/escrow'
import { useRouter } from 'next/router'
import Spinner from '../../../components/spinner/Spinner'

const EscrowDetail = () => {
    // const role = useAuth((s) => s.profile?.role)
    const router = useRouter();
    const [role, setRole] = useState("")

    const { id }: any = router.query;
    const { data: EscrowData, isLoading, refetch } = useQuery(
        ["query-escrow-details-id", id],
        () => EscrowServices.getEscrowById(id),
        {
            onSuccess: (data: any) => {
                console.log(data.data);

            },
            keepPreviousData: false,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
        })

    console.log(EscrowData);

    return (
        <DashboardLayout>
            {/* <HomeScreen /> */}
            {
                isLoading ?
                 <div className='flex mt-[100px] justify-center items-center'>
                    <Spinner />

                </div> :
                role === "BUYER" ? <ViewBuyer /> : <EscrowDetails />
            }
        </DashboardLayout>
    )
}

export default EscrowDetail