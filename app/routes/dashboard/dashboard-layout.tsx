import React from 'react'
import MobileSidebar from 'components/MobileSidebar'
import { Outlet } from 'react-router'

const DashboardLayout = () => {
    return (
        <main>
            <MobileSidebar />
            <Outlet />
        </main>
    )
}

export default DashboardLayout