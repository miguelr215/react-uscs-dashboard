import React from 'react'
import { MobileSidebar, Sidebar } from 'components'
import { Outlet } from 'react-router'

const DashboardLayout = () => {
    return (
        <main className='md:flex md:flex-row'>
            <MobileSidebar />
            <Sidebar />
            <aside className='p-4 md:px-9'>
                <Outlet />
            </aside>
        </main>
    )
}

export default DashboardLayout