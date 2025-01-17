"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function HomePageClient({ makes, years }) {

  const [selectedMake, setSelectedMake] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const isNextDisabled = !selectedMake || !selectedYear;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6">Car Dealer - Filter</h1>

      <div className="mb-4">
        <label htmlFor="make" className="block mb-1 font-medium">
          Select Make
        </label>
        <select
          id="make"
          className="border border-gray-300 rounded px-3 py-2"
          value={selectedMake}
          onChange={(e) => setSelectedMake(e.target.value)}
        >
          <option value="">-- Choose make --</option>
          {makes.map((make) => (
            <option key={make.MakeId} value={make.MakeId}>
              {make.MakeName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="year" className="block mb-1 font-medium">
          Select Model Year:
        </label>
        <select
          id="year"
          className="border border-gray-300 rounded px-3 py-2"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">-- Choose Year --</option>
          {years.map((yearVal) => (
            <option key={yearVal} value={yearVal}>
              {yearVal}
            </option>
          ))}
        </select>
      </div>
      <Link
        href={isNextDisabled ? "#" : `/result/${selectedMake}/${selectedYear}`}
        className={`px-4 py-2 rounded text-white bg-blue-500 ${isNextDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-blue-600"
          }`}
      >
        Next
      </Link>
    </main>
  );
}
