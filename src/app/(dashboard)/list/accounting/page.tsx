// src/app/(dashboard)/list/account/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChartPie, FaBoxOpen, FaClipboardList, FaCoins } from "react-icons/fa";
import BudgetSection from "./components/BudgetSection";
import IncomeStatement from "./components/IncomeStatement";
import StockInventory from "./components/StockInventory";
import Procurement from "./components/Procurement";
import BankReconciliation from "./components/BankReconcilation";

// Tabs Data
const tabs = [
  { id: "budget", name: "Budget Reports", icon: <FaChartPie /> },
  { id: "income", name: "Income Statement", icon: <FaCoins /> },
  { id: "stocks", name: "Stock & Inventory", icon: <FaBoxOpen /> },
  { id: "procurement", name: "Procurement", icon: <FaClipboardList /> },
  { id: "banking", name: "Bank Reconciliation", icon: <FaCoins /> },
];

const AccountingPage = () => {
  const [activeTab, setActiveTab] = useState("budget");

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Accounting Dashboard</h1>
        <Link href="/dashboard/accounting/reports">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
            View Reports
          </button>
        </Link>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-3 border-b pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm ${
              activeTab === tab.id ? "bg-purple-600 text-white" : "text-gray-600"
            }`}
          >
            {tab.icon} {tab.name}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="mt-6">
        {activeTab === "budget" && <BudgetSection />}
        {activeTab === "income" && <IncomeStatement />}
        {activeTab === "stocks" && <StockInventory />}
        {activeTab === "procurement" && <Procurement />}
        {activeTab === "banking" && <BankReconciliation />}
      </div>
    </div>
  );
};

export default AccountingPage;