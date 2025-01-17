"use client";
import React from "react";

export default function ModelsClient({ models, year }) {
  if (!models.length) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold">No Results Found</h2>
        <p className="mt-2 text-gray-700">
          Please try again with different filters.
        </p>
      </div>
    );
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Vehicle Models of {year}</h1>
      <ul className="space-y-2">
        {models.map((model, index) => (
          <li
            key={`${model.Make_ID}-${index}`}
            className="border-b border-gray-200 py-2"
          >
            <span className="font-medium">{model.Model_Name}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}

