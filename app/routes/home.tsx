import type { Route } from "./+types/home";
import { Hero } from "components";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Dashboard | US Cold Storage" },
    { name: "description", content: "US Cold Storage Dashboard with inventory, sales & stats tracking created by Miguel Ramos with Vite, React Router, and Chartjs!" },
  ];
}

export default function Home() {
  return <Hero />
}
