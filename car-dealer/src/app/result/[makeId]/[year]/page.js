import React from "react";
import ModelsClient from "./ModelsClient";

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

  return <ModelsClient models={data.Results || []} year={year} />;
}



