"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

// Dummy data for budgets (replace with your API/data fetching)
const dummyBudgetData = [
  { id: 1, category: "Infrastructure", allocated: 50000, spent: 32000 },
  { id: 2, category: "Staff Salaries", allocated: 80000, spent: 75000 },
  { id: 3, category: "Educational Resources", allocated: 30000, spent: 15000 },
  { id: 4, category: "Extracurricular Activities", allocated: 15000, spent: 8000 },
  { id: 5, category: "Maintenance", allocated: 20000, spent: 10000 },
];

const BudgetPage = () => {
  const [search, setSearch] = useState("");
  const [filteredBudgets, setFilteredBudgets] = useState(dummyBudgetData);

  useEffect(() => {
    if (search === "") {
      setFilteredBudgets(dummyBudgetData);
    } else {
      setFilteredBudgets(
        dummyBudgetData.filter((item) =>
          item.category.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search]);

  // Calculate summary totals
  const totalAllocated = dummyBudgetData.reduce(
    (sum, item) => sum + item.allocated,
    0
  );
  const totalSpent = dummyBudgetData.reduce(
    (sum, item) => sum + item.spent,
    0
  );
  const totalRemaining = totalAllocated - totalSpent;

  // Chart data: Spent vs. Remaining
  const chartData = {
    labels: ["Spent", "Remaining"],
    datasets: [
      {
        data: [totalSpent, totalRemaining],
        backgroundColor: ["#F87171", "#34D399"],
        hoverBackgroundColor: ["#EF4444", "#10B981"],
      },
    ],
  };

  return (
    <div className="p-4">
      {/* Header with title, search & add button */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Budget Management</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-myPurple transition duration-200 text-sm"
          />
          <Link href="/dashboard/list/budget/create">
            <button className="bg-myPurple hover:bg-purple-600 text-white px-4 py-2 rounded-md text-sm">
              Add Budget
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart Section */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Budget Overview
          </h2>
          <div className="flex justify-center">
            <Doughnut data={chartData} />
          </div>
          <div className="mt-4 space-y-1">
            <p className="text-gray-600">
              <span className="font-medium">Total Allocated:</span> $
              {totalAllocated.toLocaleString()}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Total Spent:</span> $
              {totalSpent.toLocaleString()}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Total Remaining:</span> $
              {totalRemaining.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white p-4 rounded-md shadow-md overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Budget Items
          </h2>
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left text-sm font-medium text-gray-600">
                  Category
                </th>
                <th className="p-2 text-left text-sm font-medium text-gray-600">
                  Allocated
                </th>
                <th className="p-2 text-left text-sm font-medium text-gray-600">
                  Spent
                </th>
                <th className="p-2 text-left text-sm font-medium text-gray-600">
                  Remaining
                </th>
                <th className="p-2 text-left text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBudgets.map((item) => {
                const remaining = item.allocated - item.spent;
                return (
                  <tr key={item.id} className="border-b">
                    <td className="p-2 text-sm text-gray-700">
                      {item.category}
                    </td>
                    <td className="p-2 text-sm text-gray-700">
                      ${item.allocated.toLocaleString()}
                    </td>
                    <td className="p-2 text-sm text-gray-700">
                      ${item.spent.toLocaleString()}
                    </td>
                    <td className="p-2 text-sm text-gray-700">
                      ${remaining.toLocaleString()}
                    </td>
                    <td className="p-2 text-sm text-gray-700">
                      <div className="flex gap-2">
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded-md text-xs">
                          Edit
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md text-xs">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredBudgets.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No budget items found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
