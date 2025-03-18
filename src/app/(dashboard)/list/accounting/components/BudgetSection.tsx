"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import BudgetTable from "./BudgetTable";
import BudgetForm from "./BudgetForm";

ChartJS.register(ArcElement, Tooltip, Legend);

const dummyBudgetData = [
  { id: 1, category: "Infrastructure", allocated: 50000, spent: 32000 },
  { id: 2, category: "Staff Salaries", allocated: 80000, spent: 75000 },
  { id: 3, category: "Educational Resources", allocated: 30000, spent: 15000 },
  { id: 4, category: "Extracurricular Activities", allocated: 15000, spent: 8000 },
  { id: 5, category: "Maintenance", allocated: 20000, spent: 10000 },
];

const BudgetSection = () => {
  const [search, setSearch] = useState("");
  const [filteredBudgets, setFilteredBudgets] = useState(dummyBudgetData);
  const [isFormOpen, setIsFormOpen] = useState(false); // Toggle for form visibility

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

  const totalAllocated = dummyBudgetData.reduce((sum, item) => sum + item.allocated, 0);
  const totalSpent = dummyBudgetData.reduce((sum, item) => sum + item.spent, 0);
  const totalRemaining = totalAllocated - totalSpent;

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
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Budget Management</h1>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-md px-10 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
          >
            <FaPlus /> Add Budget
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Budget Overview</h2>
          <div className="flex justify-center">
            <Doughnut data={chartData} />
          </div>
          <div className="mt-4 space-y-1">
            <p className="text-gray-600"><span className="font-medium">Total Allocated:</span> ${totalAllocated.toLocaleString()}</p>
            <p className="text-gray-600"><span className="font-medium">Total Spent:</span> ${totalSpent.toLocaleString()}</p>
            <p className="text-gray-600"><span className="font-medium">Total Remaining:</span> ${totalRemaining.toLocaleString()}</p>
          </div>
        </div>

        <BudgetTable budgets={filteredBudgets} />
      </div>

      {isFormOpen && <BudgetForm onClose={() => setIsFormOpen(false)} />} 
    </div>
  );
};

export default BudgetSection;
