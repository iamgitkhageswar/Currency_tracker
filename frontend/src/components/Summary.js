import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

export default function Summary() {
  const { transactions } = useContext(TransactionContext);

  const totalINR = transactions
    .filter(tx => !tx.pendingConversion)
    .reduce((sum, tx) => sum + tx.amountInINR, 0);

  return (
    <div className="summary">
      <h3>Total Spend (INR): ₹{totalINR.toFixed(2)}</h3>
      <p>Total Transactions: {transactions.length}</p>
    </div>
  );
}
