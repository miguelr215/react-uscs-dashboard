import React, { useEffect, useState } from 'react'
import { CategoryFilter, DoughnutChart, Header, LineChart, LoadingSpinner } from 'components'
import { useData } from 'hooks/useData'
import { useLineChartFormat, type LineChartDataType } from 'hooks/useLineChartFormat';
import { useDoughnutChartFormat, type DoughnutChartDataType } from 'hooks/useDoughnutChartFormat';
import { useCategoryFilter } from 'hooks/useCategoryFilter';
import { useSalesAmt } from 'hooks/useSalesAmt';
import { useSalesRevenue } from 'hooks/useSalesRevenue';
import { useSumsOfArrays } from 'hooks/useSumsOfArrays';
import { useDoughnutSaleAmtData } from 'hooks/useDoughnutSaleAmtData';
import { useDoughnutSaleRevData } from 'hooks/useDoughnutSaleRevData';
import { useDoughnutCatLabels } from 'hooks/useDoughnutCatLabels';

const Sales = () => {
    const [lineAmtChartData, setLineAmtChartData] = useState<LineChartDataType | null>(null);
    const [lineRevChartData, setLineRevChartData] = useState<LineChartDataType | null>(null);
    const [doughnutChartData, setDoughnutChartData] = useState<DoughnutChartDataType | null>(null);
    const { products, categories, currentCategory, loading, error } = useData();

    useEffect(() => {
        // line chart
        const filteredProducts = useCategoryFilter(products, currentCategory);
        const salesAmtArrNumsArr = useSalesAmt(filteredProducts);
        const salesRevArrNumsArr = useSalesRevenue(filteredProducts);
        const salesAmtArrTotals = useSumsOfArrays(salesAmtArrNumsArr);
        const salesRevArrTotals = useSumsOfArrays(salesRevArrNumsArr);
        const salesAmtChartDataFormatted = useLineChartFormat(`12 Month Sales Amount for ${currentCategory}`, salesAmtArrTotals);
        const salesRevChartDataFormatted = useLineChartFormat(`12 Month Sales Revenue $ for ${currentCategory}`, salesRevArrTotals);

        // doughnut chart
        // const saleAmtDoughnutChartDataArr = useDoughnutSaleAmtData(filteredProducts, currentCategory);
        const saleRevDoughnutChartDataArr = useDoughnutSaleRevData(filteredProducts, currentCategory);
        const doughnutLabels = currentCategory === 'All' ? categories.slice(1) : useDoughnutCatLabels(filteredProducts, currentCategory);
        const doughnutChartDataFormatted = useDoughnutChartFormat(`Total Sales Revenue for ${currentCategory}`, saleRevDoughnutChartDataArr, doughnutLabels);

        setLineAmtChartData(salesAmtChartDataFormatted);
        setLineRevChartData(salesRevChartDataFormatted);
        setDoughnutChartData(doughnutChartDataFormatted);
    }, [products, currentCategory]);

    if (loading) return <LoadingSpinner />
    if (error) return <p className='text-red-500'>Error: {error}</p>

    return (
        <section>
            <Header title='Sales' description='View Sales & Revenue stats to understand your financial situation' />
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
                    {/* Sales Amt last 12 months */}
                    {lineAmtChartData ? (
                        <div className="w-full max-w-xl">
                            <LineChart data={lineAmtChartData} />
                        </div>
                    ) : (
                        <LoadingSpinner />
                    )}

                    {/* Sales Rev last 12 months */}
                    {lineRevChartData ? (
                        <div className="w-full max-w-xl">
                            <LineChart data={lineRevChartData} />
                        </div>
                    ) : (
                        <LoadingSpinner />
                    )}

                </div>

            </div>

        </section>
    )
}

export default Sales