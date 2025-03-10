import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

// Register required Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const IncomeStatement = () => (
  <div className="bg-white p-4 rounded-md shadow-md">
    <h2 className="text-xl font-semibold text-gray-700">Income Statement</h2>
    <Bar
      data={{
        labels: ["Revenue", "Expenses", "Net Profit"],
        datasets: [
          {
            label: "Amount (TZS)",
            data: [80000000, 50000000, 30000000],
            backgroundColor: ["#3B82F6", "#EF4444", "#10B981"],
          },
        ],
      }}
    />
  </div>
);

export default IncomeStatement;
