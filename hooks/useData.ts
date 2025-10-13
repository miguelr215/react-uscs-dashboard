import { DashboardContext } from "context/DashboardContext";
import { useContext } from "react";

export function useData() {
	const context = useContext(DashboardContext);
	if (!context) throw new Error("useData must be used within a DataProvider");
	return context;
}
