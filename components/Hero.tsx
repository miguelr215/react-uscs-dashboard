import { Link } from 'react-router';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <main className={`w-screen h-screen flex items-center justify-center ${styles.heroBg}`}>
            <div className={`min-w-[270px] bg-white rounded p-4 md:p-6 lg:p-9 text-center ${styles.heroCta}`}>
                <h1 className="text-base sm:text-2xl md:text-5xl mb-4 md:mb-6">US Cold Storage Dashboard</h1>
                <Link to="/dashboard" className='db-btn mx-auto' aria-description='Go to Main Dashboard'>Launch Dashboard</Link>
            </div>
        </main>
    )
}

export default Hero