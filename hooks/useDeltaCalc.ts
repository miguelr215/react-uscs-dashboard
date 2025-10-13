// Custom hook to calculate percentage deltas between consecutive numbers in an array

export function useDeltaCalc(array: number[]): number[] {
	const deltas = array
		.slice(1)
		.map((num, i) => ((num - array[i]) / array[i]) * 100);
	deltas.unshift(0); // Add a zero at the start to maintain the same length
	console.log("deltas:", deltas);
	return deltas;
}
