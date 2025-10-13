import React, { useEffect, useState } from 'react'
import { CategoryFilter, DoughnutChart, Header, LineChart, LoadingSpinner } from 'components'
import { useCategoryFilter } from 'hooks/useCategoryFilter';
import { useLineChartFormat, type LineChartDataType } from 'hooks/useLineChartFormat';
import { useData } from 'hooks/useData'
import { useInventory } from 'hooks/useInventory';
import { useSumsOfArrays } from 'hooks/useSumsOfArrays';
import { useDeltaCalc } from 'hooks/useDeltaCalc';
import { useDoughnutData } from 'hooks/useDoughnutData';
import { useDoughnutCatLabels } from 'hooks/useDoughnutCatLabels';
import { useDoughnutChartFormat, type DoughnutChartDataType } from 'hooks/useDoughnutChartFormat';

const Inventory = () => {
    const [lineChartData, setLineChartData] = useState<LineChartDataType | null>(null);
    const [deltaLineChartData, setDeltaLineChartData] = useState<LineChartDataType | null>(null);
    const [doughnutChartData, setDoughnutChartData] = useState<DoughnutChartDataType | null>(null);
    const { products, categories, currentCategory, loading, error } = useData();

    useEffect(() => {
        // line chart
        const filteredProducts = useCategoryFilter(products, currentCategory);
        const inventoryArrNumsArr = useInventory(filteredProducts);
        const inventoryArrTotals = useSumsOfArrays(inventoryArrNumsArr);
        const chartDataFormatted = useLineChartFormat(`12 Month Inventory for ${currentCategory}`, inventoryArrTotals);
        // delta line chart
        const deltaInventoryArr = useDeltaCalc(inventoryArrTotals);
        const deltaChartDataFormatted = useLineChartFormat(`Month-to-Month % Change in Inventory for ${currentCategory}`, deltaInventoryArr);
        // doughnut chart
        const doughnutChartDataArr = useDoughnutData(filteredProducts, currentCategory);
        const doughnutLabels = currentCategory === 'All' ? categories.slice(1) : useDoughnutCatLabels(filteredProducts, currentCategory)
        const doughnutChartDataFormatted = useDoughnutChartFormat(`Current Inventory for ${currentCategory}`, doughnutChartDataArr, doughnutLabels);


        setLineChartData(chartDataFormatted);
        setDeltaLineChartData(deltaChartDataFormatted);
        setDoughnutChartData(doughnutChartDataFormatted);
    }, [products, currentCategory]);

    if (loading) return <LoadingSpinner />
    if (error) return <p className='text-red-500'>Error: {error}</p>

    return (
        <section>
            <Header title='Inventory' description='View inventory stats to make informed decisions' />

            <CategoryFilter />

            <div className='flex flex-col gap-6 items-center lg:flex-row'>
                {/* Doughnut chart */}
                {doughnutChartData ? (
                    <div className='w-full max-w-xl lg:max-w-lg'>
                        <DoughnutChart data={doughnutChartData} />
                    </div>
                ) : (
                    <LoadingSpinner />
                )}

                <div className="flex flex-col gap-6">
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

                </div>

            </div>
        </section>
    )
}

export default Inventory