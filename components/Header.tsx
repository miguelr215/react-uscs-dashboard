interface HeaderProps {
    title: string,
    description: string
}

const Header = ({ title, description }: HeaderProps) => {
    return (
        <section className="mb-5 md:mb-7">
            <h1 className="text-2xl font-bold mb-1 md:text-4xl">{title}</h1>
            <p className="text-base text-gray-600">{description}</p>
        </section>
    )
}

export default Header