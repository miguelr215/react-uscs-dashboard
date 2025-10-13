import React, { useEffect, useState } from 'react'
import { CategoryFilter, Header, LineChart, LoadingSpinner } from 'components'
import { useCategoryFilter } from 'hooks/useCategoryFilter';
import { useLineChartFormat, type LineChartDataType } from 'hooks/useLineChartFormat';
import { useData } from 'hooks/useData'
import { useInventory } from 'hooks/useInventory';
import { useSumsOfArrays } from 'hooks/useSumsOfArrays';
import { useDeltaCalc } from 'hooks/useDeltaCalc';

const Inventory = () => {
    const [lineChartData, setLineChartData] = useState<LineChartDataType | null>(null);
    const [deltaLineChartData, setDeltaLineChartData] = useState<LineChartDataType | null>(null);
    const { products, categories, currentCategory, loading, error } = useData();

    useEffect(() => {
        const filteredProducts = useCategoryFilter(products, currentCategory);
        const inventoryArrNumsArr = useInventory(filteredProducts);
        const inventoryArrTotals = useSumsOfArrays(inventoryArrNumsArr);
        const chartDataFormatted = useLineChartFormat(`12 Month Inventory for ${currentCategory}`, inventoryArrTotals);
        const deltaInventoryArr = useDeltaCalc(inventoryArrTotals);
        const deltaChartDataFormatted = useLineChartFormat(`Month-to-Month % Change in Inventory for ${currentCategory}`, deltaInventoryArr);
        setLineChartData(chartDataFormatted);
        setDeltaLineChartData(deltaChartDataFormatted);
    }, [products, currentCategory]);

    if (loading) return <LoadingSpinner />
    if (error) return <p className='text-red-500'>Error: {error}</p>

    return (
        <section>
            <Header title='Inventory' description='View inventory stats to make informed decisions' />

            <CategoryFilter />

            <div className='chart-wrapper'>
                {/* Inventory last 12 months */}
                {lineChartData ? (
                    <div className="w-full max-w-xl">
                        <LineChart data={lineChartData} />
                    </div>
                ) : (
                    <LoadingSpinner />
                )}

                {/* Change in inventory Inventory last 12 months */}
                {deltaLineChartData ? (
                    <div className="w-full max-w-xl">
                        <LineChart data={deltaLineChartData} />
                    </div>
                ) : (
                    <LoadingSpinner />
                )}


                <p>month to month change rate - line</p>
                <p>inventory turnover rate (?)</p>
            </div>
        </section>
    )
}

export default Inventory