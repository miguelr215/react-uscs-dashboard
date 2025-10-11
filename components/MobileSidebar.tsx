import { useState } from "react"
import { Link } from "react-router"

const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="mobile-sidebar md:hidden">
                <header className="flex justify-between items-center p-4">
                    <Link to="/" className="max-w-[125px]">
                        <img src="https://www.uscold.com/wp-content/uploads/2023/07/USCS_Logo_Horizontal_Email.png" alt="US Cold Storage logo" />
                    </Link>
                    <button type="button" className="text-2xl cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                        <i className="bi bi-list"></i>
                    </button>
                </header>

                <div className={`mobile-sidebar-content fixed top-0 left-0 h-screen w-52 bg-gray-200 transform transition-transform duration-300 ${isOpen ? "translate-x-0 z-50" : "-translate-x-full"}`}>
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