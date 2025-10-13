import type { ProductType } from "context/DashboardContext";

export function useCategoryFilter(
	products: ProductType[],
	currentCategory: string
): ProductType[] {
	if (currentCategory === "All") {
		return products;
	}

	return products.filter((product) => product.category === currentCategory);
}
