// this hook takes an array of arrays of numbers and returns an array where each element is the sum of the corresponding elements in the input arrays.
// e.g. [[1,2,3],[4,5,6]] => [5,7,9]

export function useSumsOfArrays(arrays: number[][]): number[] {
	const result = arrays.reduce((sum, arr) =>
		sum.map((num, i) => num + (arr[i] ?? 0))
	);
	// console.log("result:", result);
	return result;
}
