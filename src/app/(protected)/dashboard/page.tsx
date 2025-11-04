import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  return <h1 className="font-bold text-3xl">Dashboard</h1>;
}
