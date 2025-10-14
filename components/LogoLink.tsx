import { Link } from 'react-router'

const LogoLink = () => {
    return (
        <Link to="/" className="max-w-[125px] md:max-w-[155px]" aria-description='Go to Home Page' role='button'>
            <img src="https://www.uscold.com/wp-content/uploads/2023/07/USCS_Logo_Horizontal_Email.png" alt="US Cold Storage logo" />
        </Link>
    )
}

export default LogoLink