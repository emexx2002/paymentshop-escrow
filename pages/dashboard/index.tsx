import React from 'react'
import DashboardLayout from './layout/dashboardLayout'
import HomeScreen from '../../screens/dashboard/HomeScreen'
import EscrowDetails from '../../screens/dashboard/Escrow-details'

const index = () => {
    return (
        <DashboardLayout>
            {/* <HomeScreen /> */}
            <EscrowDetails/>
        </DashboardLayout>
    )
}

export default index