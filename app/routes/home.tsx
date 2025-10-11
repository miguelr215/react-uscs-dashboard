import type { Route } from "./+types/home";
import { Hero } from "components";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "US Cold Storage Dashboard | React Router App" },
    { name: "description", content: "US Cold Storage Dashboard with inventory, sales & stats tracking created with Vite + React Router!" },
  ];
}

export default function Home() {
  return <Hero />
}
