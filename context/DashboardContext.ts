import { createContext } from "react";

interface InventoryByMonthType {
	month: string;
	amount: number;
}

interface SalesType {
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
	sale: SalesType[];
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
	currentCategory: "all",
	loading: false,
	error: null,
	changeCurrentCategory: () => {},
	refresh: async () => {},
};

export const DashboardContext = createContext<DashboardContextType>(
	defaultDashboardContext
);
