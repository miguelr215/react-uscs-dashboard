import { Outlet } from 'react-router'
import { LoadingSpinner, MobileSidebar, Sidebar } from 'components'

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