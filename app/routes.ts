import {
	type RouteConfig,
	index,
	layout,
	route,
} from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	layout("routes/dashboard/dashboard-layout.tsx", [
		route("dashboard", "routes/dashboard/dashboard.tsx"),
		route("dashboard/inventory", "routes/dashboard/inventory.tsx"),
		route("dashboard/sales", "routes/dashboard/sales.tsx"),
	]),
] satisfies RouteConfig;
