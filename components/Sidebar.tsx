import React from 'react'
import { Link } from 'react-router'
import LogoLink from './LogoLink'
import SidebarFooter from './SidebarFooter'

const Sidebar = () => {
    return (
        <aside className='w-full max-w-[13rem] h-screen shadow-2xl shadow-gray-500 hidden md:block'>
            <div className={`flex flex-col justify-between h-screen w-52 bg-gray-200 z-50`}>
                <nav className="flex flex-col p-4 gap-4">
                    <LogoLink />
                    <Link to="/dashboard" className="db-nav-btn">
                        <i className="bi bi-bar-chart-fill"></i> Dashboard
                    </Link>
                    <Link to="/dashboard/inventory" className="db-nav-btn">
                        <i className="bi bi-boxes"></i>
                        Inventory
                    </Link>
                    <Link to="/dashboard/sales" className="db-nav-btn">
                        <i className="bi bi-piggy-bank-fill"></i>
                        Sales
                    </Link>
                </nav>

                <SidebarFooter />
            </div>
        </aside>
    )
}

export default Sidebar