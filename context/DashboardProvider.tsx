import type React from "react";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { ProductType, DashboardContextType } from "./DashboardContext";
import { DashboardContext } from "./DashboardContext";
import { fetchProducts } from "services/apiClient";


export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [currentCategory, setCurrentCategory] = useState("all");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const changeCurrentCategory = useCallback((category: string) => {
        setCurrentCategory(category);
    }, []);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchProducts();
            setProducts(data.products);
            setCategories(data.categories);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const contextValue: DashboardContextType = {
        products,
        categories,
        currentCategory,
        loading,
        error,
        changeCurrentCategory,
        refresh: loadData
    };

    return (
        <DashboardContext.Provider value={contextValue}>
            {children}
        </DashboardContext.Provider>
    );
}