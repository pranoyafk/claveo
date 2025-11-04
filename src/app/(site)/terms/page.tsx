import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
};

export default async function TermsPage() {
  return (
    <main className="p-8">
      <h1 className="font-bold text-3xl">Terms</h1>
    </main>
  );
}
