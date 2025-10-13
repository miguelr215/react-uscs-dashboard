// this hook takes an array of products and returns an array of arrays of inventory amounts by month for each product.
// e.g. [product1, product2] => [[inv1_month1, inv1_month2], [inv2_month1, inv2_month2]]

import type { ProductType } from "context/DashboardContext";

export function useInventory(products: ProductType[]) {
	const inventoryArr = products.map((product) =>
		product.inventoryByMonth.map((item) => item.amount)
	);
	// console.log("inventoryArr:", inventoryArr);
	return inventoryArr;
}
