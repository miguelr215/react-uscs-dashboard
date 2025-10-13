import React, { useEffect } from 'react';
import { Header } from 'components';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// export const data = {
//     labels,
//     datasets: [
//         {
//             label: 'Dataset 1',
//             data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//             borderColor: 'rgb(255, 99, 132)',
//             backgroundColor: 'rgba(255, 99, 132, 0.5)',
//         },
//         {
//             label: 'Dataset 2',
//             data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//             borderColor: 'rgb(53, 162, 235)',
//             backgroundColor: 'rgba(53, 162, 235, 0.5)',
//         },
//     ],
// };

const data = [
    { month: "January", amount: 50 },
    { month: "February", amount: 44 },
    { month: "March", amount: 32 },
    { month: "April", amount: 46 },
    { month: "May", amount: 33 },
    { month: "June", amount: 24 },
    { month: "July", amount: 29 },
    { month: "August", amount: 36 },
    { month: "September", amount: 40 },
    { month: "October", amount: 42 },
    { month: "November", amount: 38 },
    { month: "December", amount: 45 },
];

const Dashboard = () => {

    return (
        <section>
            <Header title="Dashboard" description="View popular Dashboards" />
            <div className="dashboard-content">
                current inventory by category - doughnut
                current sales by category - doughnut
                total inventory last 12 months - line
                total sales last 12 months - line
                total revenue last 12 months - line
                <div className="sm-chart">
                    <Line
                        data={{
                            labels: labels,
                            datasets: [
                                {
                                    label: 'set1',
                                    data: [5, 6, 7, 12, 15, 10, 7, 9, 16, 21, 18, 15],
                                    borderColor: 'rgb(255, 99, 132)',
                                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                },
                                {
                                    label: 'set2',
                                    data: [3, 2, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                                    borderColor: 'rgb(53, 162, 235)',
                                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                },
                            ],
                        }}
                    />
                </div>

            </div>
        </section>
    )
}
``
export default Dashboard