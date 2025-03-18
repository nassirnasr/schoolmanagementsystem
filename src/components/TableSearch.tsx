'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiSearch } from "react-icons/hi";

const TableSearch = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchValue.trim()) return; // Prevent empty search

    const params = new URLSearchParams(window.location.search);
    params.set("search", searchValue);
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full md:w-auto flex items-center gap-2 bg-white border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition-all"
    >
      <HiSearch size={12} className="opacity-60 text-gray-700"/>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search..."
        className="w-[180px] text-xs bg-transparent outline-none placeholder-opacity-50 placeholder-gray-500"
      />
    </form>
  );
};

export default TableSearch;
