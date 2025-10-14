// custom hook that returns either total quantity per category or total quantity per product in category
// eg. [product1, product2] => [total1, total2] for categories or products

type Product = {
	category: string;
	name: string;
	quantity: number;
};

export function useDoughnutData(products: Product[], currentCategory: string) {
	const categoryMap = new Map<string, number>();

	if (currentCategory === "All") {
		// calculate total by category, return object with category names and totals
		products.forEach((product) => {
			categoryMap.set(
				product.category,
				(categoryMap.get(product.category) || 0) + product.quantity
			);
		});
		// console.log("doughnut categoryMap for All:", categoryMap);
		return Array.from(categoryMap.values());
	} else {
		// calculate total per product in category, return object with product names and totals
		products.forEach((product) => {
			if (product.category === currentCategory) {
				categoryMap.set(
					product.name,
					(categoryMap.get(product.name) || 0) + product.quantity
				);
			}
		});
		// console.log("doughnut categoryMap for categories:", categoryMap);
		// console.log(
		// 	"doughnut categoryMap values:",
		// 	Array.from(categoryMap.values())
		// );
		return Array.from(categoryMap.values());
	}
}
