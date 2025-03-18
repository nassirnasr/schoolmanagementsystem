import { FaSearch } from "react-icons/fa";

// Define the type for a single budget item
interface BudgetItem {
  id: number;
  category: string;
  allocated: number;
  spent: number;
}

// Define the props for the BudgetTable component
interface BudgetTableProps {
  budgets: BudgetItem[];
}

const BudgetTable: React.FC<BudgetTableProps> = ({ budgets }) => {
  return (
    <div>
      <table className="w-full border-collapse border rounded-md overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-2 text-left">Item</th>
            <th className="p-2 text-left">Allocated (TZS)</th>
            <th className="p-2 text-left">Spent (TZS)</th>
            <th className="p-2 text-left">Remaining (TZS)</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((budget) => (
            <tr key={budget.id} className="border-t">
              <td className="p-2">{budget.category}</td>
              <td className="p-2">{budget.allocated.toLocaleString()}</td>
              <td className="p-2">{budget.spent.toLocaleString()}</td>
              <td className="p-2">{(budget.allocated - budget.spent).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetTable;