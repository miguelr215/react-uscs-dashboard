import { Outlet } from 'react-router'
import { LoadingSpinner, MobileSidebar, Sidebar } from 'components'
import type { Route } from "../+types/home";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Dashboard | US Cold Storage" },
        { name: "description", content: "US Cold Storage Dashboard with inventory, sales & stats tracking created by Miguel Ramos with Vite, React Router, and Chartjs!" },
    ];
}

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