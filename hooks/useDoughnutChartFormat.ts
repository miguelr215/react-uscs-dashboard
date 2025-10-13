export interface DoughnutChartDataType {
	labels: string[];
	datasets: {
		label: string;
		data: number[];
		backgroundColor: string[];
		hoverOffset: number;
	}[];
}

export function useDoughnutChartFormat(
	chartLabel: string,
	chartData: number[],
	chartCategories: string[]
) {
	const colors = [
		"rgb(255, 99, 132)",
		"rgb(54, 162, 235)",
		"rgb(255, 205, 86)",
		"rgb(92, 205, 86)",
		"rgb(169, 82, 223)",
		"rgb(252, 169, 3)",
	];
	const data = {
		labels: chartCategories,
		datasets: [
			{
				label: chartLabel,
				data: chartData,
				backgroundColor: colors.filter(
					(color, index) => index < chartCategories.length
				),
				hoverOffset: 4,
			},
		],
	};

	console.log("data:", data);
	return data;
}
