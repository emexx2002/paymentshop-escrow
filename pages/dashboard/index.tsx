import React from 'react'
import DashboardLayout from './layout/dashboardLayout'
import HomeScreen from '../../screens/dashboard/HomeScreen'

const index = () => {
    return (
        <DashboardLayout>
            <HomeScreen />
        </DashboardLayout>
    )
}

export default index