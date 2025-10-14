import { Link } from "react-router"

const SidebarFooter = () => {
    return (
        <footer className="flex items-center gap-2.5 pb-8 px-4">
            <img src="https://mrtech.dev/images/Ramos_Miguel2.jpg" alt="User image - Miguel Ramos" className="size-10 rounded-full aspect-square" />
            <div className="flex flex-col max-w-[110px]">
                <h2 className="text-sm md:text-base font-semibold text-gray-900 truncate">Miguel Ramos</h2>
                <p className="text-gray-400 text-xs font-normal truncate">miguel@mrtech.dev</p>
            </div>
            <Link to="/" aria-label="Logout" title="Logout">
                <i className="bi bi-box-arrow-left"></i>
            </Link>
        </footer>
    )
}

export default SidebarFooter