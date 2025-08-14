import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const categoryColors = {
  Food: "#ff6384",
  Travel: "#36a2eb",
  Utilities: "#ffcd56",
  Other: "#4bc0c0"
};

export default function CategoryChart() {
  const { transactions } = useContext(TransactionContext);

  const totals = transactions
    .filter(tx => !tx.pendingConversion)
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amountInINR;
      return acc;
    }, {});

  const data = {
    labels: Object.keys(totals),
    datasets: [
      {
        data: Object.values(totals),
        backgroundColor: Object.keys(totals).map(cat => categoryColors[cat])
      }
    ]
  };

  return (
    <div style={{ width: "300px", margin: "auto" }}>
      <Pie data={data} />
    </div>
  );
}
