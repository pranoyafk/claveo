import Link from "next/link";

function Page() {
  return (
    <div>
      <Link href="/dashboard">/dashboard</Link>
      <Link href="/sign-in">/sign-in</Link>
    </div>
  );
}

export default Page;
