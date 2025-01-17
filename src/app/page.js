import HomePageClient from "./HomePageClient";
import { Suspense } from "react";

export default async function HomePage() {
  const makesUrl = process.env.NEXT_PUBLIC_API_GET_MAKES;

  const res = await fetch(makesUrl);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  const makes = data.Results || [];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => 2015 + i);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageClient makes={makes} years={years} />
    </Suspense>
  );
}