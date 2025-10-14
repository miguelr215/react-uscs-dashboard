import { Outlet } from 'react-router'
import { LoadingSpinner, MobileSidebar, Sidebar } from 'components'

const DashboardLayout = () => {

    return (
        <main className='md:flex md:flex-row'>
            <MobileSidebar />
            <Sidebar />
            <aside className='w-full p-4 md:px-9 md:pb-9 md:ml-[13rem]'>
                <Outlet />
            </aside>
        </main>
    )
}

export default DashboardLayout