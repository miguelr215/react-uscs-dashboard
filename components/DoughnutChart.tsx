import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import type { DoughnutChartDataType } from 'hooks/useDoughnutChartFormat';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const DoughnutChart = ({ data }: { data: DoughnutChartDataType }) => {
    return (
        <div>
            <Doughnut data={data} />
        </div>
    )
}

export default DoughnutChart