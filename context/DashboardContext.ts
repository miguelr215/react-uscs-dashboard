import { createContext } from "react";

export interface InventoryByMonthType {
	month: string;
	amount: number;
}

export interface SalesType {
	month: string;
	amount: number;
	revenue: number;
}

export interface ProductType {
	id: number;
	name: string;
	category: string;
	price: number;
	costPerUnit: number;
	inStock: boolean;
	quantity: number;
	inventoryByMonth: InventoryByMonthType[];
	sales: SalesType[];
}

export interface DashboardContextType {
	products: ProductType[];
	categories: string[];
	currentCategory: string;
	loading: boolean;
	error?: string | null;
	changeCurrentCategory: (category: string) => void;
	refresh: () => Promise<void>;
}

export const defaultDashboardContext: DashboardContextType = {
	products: [],
	categories: [],
	currentCategory: "All",
	loading: false,
	error: null,
	changeCurrentCategory: () => {},
	refresh: async () => {},
};

export const DashboardContext = createContext<DashboardContextType>(
	defaultDashboardContext
);
