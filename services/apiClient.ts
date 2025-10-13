import type { ProductType } from "context/DashboardContext";

interface ProductsDataType {
	categories: string[];
	products: ProductType[];
}

export async function fetchProducts(): Promise<ProductsDataType> {
	try {
		const res = await fetch("/data.json");
		const data = await res.json();
		// console.log(data)
		return data;
	} catch (error) {
		console.error("Error fetching products:", error);
		return { categories: [], products: [] };
	}
}
