"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (query) {
      router.push(`/Search?query=${encodeURIComponent(query)}`);
    }
  };

  const handleChange = (evt) => {
    setQuery(evt.target.value);
  };

  return (
    <>
      <form onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}>
        <div className="relative w-full text-white-600 px-4 ">
          <span className="absolute ml-2  mt-2 mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.35-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
              />
            </svg>
          </span>
          <input
            type="search"
            name="search"
            placeholder="Search"
            className="bg-transparent pl-8 pt-1 h-10 px-5 pr-10 w-2/3 rounded-full text-sm focus:outline-none "
            onChange={handleChange}
            value={query}
          />
        </div>
      </form>
    </>
  );
}
