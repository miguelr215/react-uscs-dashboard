// this hook returns an array of arrays containing sales revenues for each product
// e.g. [product1, product2] => [[revenue1_month1, revenue1_month2], [revenue2_month1, revenue2_month2]]

import type { ProductType } from "context/DashboardContext";

export function useSalesRevenue(products: ProductType[]) {
	const salesRevArr = products.map((product) =>
		product.sales.map((item) => item.revenue)
	);
	// console.log("salesRevArr:", salesRevArr);
	return salesRevArr;
}
