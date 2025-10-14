// custom hook that returns either total quantity per category or total quantity per product in category
// eg. [product1, product2] => [total1, total2] for categories or products

type Product = {
	category: string;
	name: string;
	sales: { month: string; amount: number; revenue: number }[];
};

export function useDoughnutSaleAmtData(
	products: Product[],
	currentCategory: string
) {
	const categoryMap = new Map<string, number>();

	if (currentCategory === "All") {
		// calculate total by category, return object with category names and totals
		products.forEach((product) => {
			const totalSales = product.sales.reduce(
				(sum, item) => sum + item.amount,
				0
			);
			categoryMap.set(
				product.category,
				(categoryMap.get(product.category) || 0) + totalSales
			);
		});
		// console.log("doughnut categoryMap for All:", categoryMap);
		return Array.from(categoryMap.values());
	} else {
		// calculate total per product in category, return object with product names and totals
		products.forEach((product) => {
			if (product.category === currentCategory) {
				const totalSales = product.sales.reduce(
					(sum, item) => sum + item.amount,
					0
				);
				categoryMap.set(
					product.name,
					(categoryMap.get(product.name) || 0) + totalSales
				);
			}
		});
		// console.log(
		// 	"sales amt doughnut categoryMap for categories:",
		// 	categoryMap
		// );
		// console.log(
		// 	"sales amt doughnut categoryMap values:",
		// 	Array.from(categoryMap.values())
		// );
		return Array.from(categoryMap.values());
	}
}
