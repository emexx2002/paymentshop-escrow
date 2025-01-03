import React from 'react'
import DashboardLayout from '../layout/dashboardLayout'
import HomeScreen from '../../../screens/dashboard/HomeScreen'
import EscrowDetails from '../../../screens/dashboard/Escrow-details'
import ViewBuyer from '../../../screens/dashboard/ViewBuyer'
import { useAuth } from '../../../zustand/auth.store'

const EscrowDetail = () => {
    const role = useAuth((s) => s.profile?.role)
    return (
        <DashboardLayout>
            {/* <HomeScreen /> */}
            {
                role === "BUYER" ? <ViewBuyer /> : <EscrowDetails />
            }
        </DashboardLayout>
    )
}

export default EscrowDetail