import type { ProductType } from "context/DashboardContext";

export function useDoughnutCatLabels(
	products: ProductType[],
	currentCategory: string
) {
	const categoryMap = new Map<string, number>();

	products.forEach((product) => {
		if (product.category === currentCategory) {
			categoryMap.set(
				product.name,
				(categoryMap.get(product.name) || 0) + product.quantity
			);
		}
	});
	// console.log("categoryMap for categories:", categoryMap);
	return Array.from(categoryMap.keys());
}
