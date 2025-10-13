import { useData } from 'hooks/useData'
import React from 'react'

const CategoryFilter = () => {
    const { categories, currentCategory, changeCurrentCategory } = useData();

    return (
        <div className='mb-4 md:mb-5'>
            <p className='text-xs text-gray-500 mb-1 md:mb-2'>Filter by category:</p>
            <ul className='flex flex-wrap gap-4 md:gap-5'>
                {categories.map((category) => (
                    <li key={category}>
                        <button
                            onClick={() => changeCurrentCategory(category)}
                            className={`db-cat-btn ${currentCategory === category ? 'font-bold' : ''}`}
                        >
                            {category}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CategoryFilter