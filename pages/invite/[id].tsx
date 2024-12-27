import React from 'react'
import DashboardLayout from '../dashboard/layout/dashboardLayout'
import HomeScreen from '../../screens/dashboard/HomeScreen'
import EscrowDetails from '../../screens/dashboard/Escrow-details'
import ViewBuyer from '../../screens/dashboard/ViewBuyer'
import { useAuth } from '../../zustand/auth.store'

const index = () => {
    const role = useAuth((s) => s.profile?.role)
    return (
        <DashboardLayout>
            {/* <HomeScreen /> */}
            <EscrowDetails />

        </DashboardLayout>
    )
}

export default index