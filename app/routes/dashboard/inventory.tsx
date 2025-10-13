import { CategoryFilter, Header, LoadingSpinner } from 'components'
import { useData } from 'hooks/useData'
import React from 'react'

const Inventory = () => {
    const { products, categories, currentCategory, loading, error } = useData();

    if (loading) return <LoadingSpinner />
    if (error) return <p className='text-red-500'>Error: {error}</p>

    return (
        <section>
            <Header title='Inventory' description='View inventory stats' />

            <CategoryFilter />

            <p>
                InventoryPage content

                Inventory last 12 months - line
                month to month change rate - line
                inventory turnover rate (?)

            </p>
        </section>
    )
}

export default Inventory