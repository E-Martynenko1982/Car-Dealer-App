import ModelsClient from "./ModelsClient";
import { Suspense } from "react";

export async function generateStaticParams() {
  const makesUrl = process.env.NEXT_PUBLIC_API_GET_MAKES;
  const res = await fetch(makesUrl);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const data = await res.json();
  const makes = data.Results || [];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => 2015 + i);

  const paths = makes.flatMap(make =>
    years.map(year => ({ params: { makeId: make.MakeId.toString(), year: year.toString() } }))
  );

  return paths;
}

export default async function ResultPage({ params }) {
  const { makeId, year } = await params;
  const modelsUrlBase = process.env.NEXT_PUBLIC_API_GET_MODELS_BASE;

  if (!modelsUrlBase) {
    throw new Error("NEXT_PUBLIC_API_GET_MODELS_BASE is not defined in .env.local");
  }

  const fetchUrl = `${modelsUrlBase}/makeId/${makeId}/modelyear/${year}?format=json`;
  const res = await fetch(fetchUrl, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const data = await res.json();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ModelsClient models={data.Results || []} year={year} />
    </Suspense>
  );
}