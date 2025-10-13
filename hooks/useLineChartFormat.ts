export interface LineChartDataType {
	labels: string[];
	datasets: {
		label: string;
		data: number[];
		borderColor: string;
		backgroundColor: string;
	}[];
}

export function useLineChartFormat(chartLabel: string, chartData: number[]) {
	const labels = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const data = {
		labels: labels,
		datasets: [
			{
				label: chartLabel,
				data: chartData,
				borderColor: "rgb(53, 162, 235)",
				backgroundColor: "rgba(53, 162, 235, 0.5)",
			},
		],
	};

	console.log("data:", data);
	return data;
}
