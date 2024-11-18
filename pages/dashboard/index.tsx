import React from 'react'
import DashboardLayout from './layout/dashboardLayout'
import HomeScreen from '../../screens/dashboard/HomeScreen'
import ViewBuyer from '../../screens/dashboard/ViewBuyer'

const index = () => {
    return (
        <DashboardLayout>
            {/* <HomeScreen /> */}
            <ViewBuyer/>
        </DashboardLayout>
    )
}

export default index