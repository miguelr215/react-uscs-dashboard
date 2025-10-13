import { CategoryFilter, Header, LineChart, LoadingSpinner } from 'components'
import { useCategoryFilter } from 'hooks/useCategoryFilter';
import { useChartFormat, type ChartDataType } from 'hooks/useChartFormat';
import { useData } from 'hooks/useData'
import { useInventory } from 'hooks/useInventory';
import { useSumsOfArrays } from 'hooks/useSumsOfArrays';
import React, { useEffect, useState } from 'react'

const Inventory = () => {
    const [chartData, setChartData] = useState<ChartDataType | null>(null);
    const { products, categories, currentCategory, loading, error } = useData();

    useEffect(() => {
        const filteredProducts = useCategoryFilter(products, currentCategory);
        const inventoryArrNumsArr = useInventory(filteredProducts);
        const inventoryArrTotals = useSumsOfArrays(inventoryArrNumsArr);
        const chartDataFormatted = useChartFormat(`12 Month Inventory for ${currentCategory}`, inventoryArrTotals);
        setChartData(chartDataFormatted);
    }, [products, currentCategory]);

    if (loading) return <LoadingSpinner />
    if (error) return <p className='text-red-500'>Error: {error}</p>

    return (
        <section>
            <Header title='Inventory' description='View inventory stats' />

            <CategoryFilter />

            <div>
                <p>Inventory last 12 months - line</p>

                {chartData ? (
                    <div className="w-full max-w-3xl">
                        <LineChart data={chartData} />
                    </div>
                ) : (
                    <p>Preparing chart...</p>
                )}

                <p>month to month change rate - line</p>
                <p>inventory turnover rate (?)</p>
            </div>
        </section>
    )
}

export default Inventory