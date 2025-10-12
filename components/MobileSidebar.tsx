import { useState } from "react"
import { Link } from "react-router"
import LogoLink from "./LogoLink";
import SidebarFooter from "./SidebarFooter";

const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="mobile-sidebar md:hidden">
                <header className="flex justify-between items-center p-4 border-b border-gray-300">
                    <LogoLink />
                    <button type="button" className="text-2xl cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                        <i className="bi bi-list"></i>
                    </button>
                </header>

                <div className={`fixed top-0 left-0 h-screen w-52 bg-gray-200 transform transition-transform duration-300 ${isOpen ? "translate-x-0 z-50" : "-translate-x-full"}`}>
                    <div className="flex flex-col h-full justify-between">
                        <nav className="flex flex-col p-4 gap-4">
                            <Link to="/" className="db-nav-btn" onClick={() => setIsOpen(false)}>
                                <i className="bi bi-house-door"></i> Home
                            </Link>
                            <Link to="/dashboard" className="db-nav-btn" onClick={() => setIsOpen(false)}>
                                <i className="bi bi-bar-chart-fill"></i> Dashboard
                            </Link>
                            <Link to="/dashboard/inventory" className="db-nav-btn" onClick={() => setIsOpen(false)}>
                                <i className="bi bi-boxes"></i>
                                Inventory
                            </Link>
                            <Link to="/dashboard/sales" className="db-nav-btn" onClick={() => setIsOpen(false)}>
                                <i className="bi bi-piggy-bank-fill"></i>
                                Sales
                            </Link>
                        </nav>

                        <SidebarFooter />

                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/50"
                />
            )}
        </>
    )
}

export default MobileSidebar