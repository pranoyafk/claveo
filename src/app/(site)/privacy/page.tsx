import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
};

export default async function PrivacyPage() {
  return (
    <main className="p-8">
      <h1 className="font-bold text-3xl">Privacy</h1>
    </main>
  );
}
