// adds up all numbers in an array and returns the sum
// e.g. [1,2,3] => 6

import React, { useMemo } from "react";

export function useArraySum(arr: number[]): number {
	// Ensure arr is an array and contains numbers, otherwise return 0
	const sum = useMemo(() => {
		if (!Array.isArray(arr) || arr.some(isNaN)) {
			return 0;
		}
		return arr.reduce(
			(accumulator, currentValue) => accumulator + currentValue,
			0
		);
	}, [arr]);

	return sum;
}
