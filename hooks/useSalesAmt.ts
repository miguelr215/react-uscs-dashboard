// this hook returns an array of arrays containing sales amounts for each product
// e.g. [product1, product2] => [[sales1_month1, sales1_month2], [sales2_month1, sales2_month2]]

import type { ProductType } from "context/DashboardContext";

export function useSalesAmt(products: ProductType[]) {
	const salesAmtArr = products.map((product) =>
		product.sales.map((item) => item.amount)
	);
	// console.log("salesAmtArr:", salesAmtArr);
	return salesAmtArr;
}
