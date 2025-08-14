import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

export default function TransactionList() {
  const { transactions } = useContext(TransactionContext);

  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>Amount</th>
          <th>Currency</th>
          <th>Amount in INR</th>
          <th>Category</th>
          <th>Description</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(tx => (
          <tr key={tx.id}>
            <td>{tx.amount}</td>
            <td>{tx.currency}</td>
            <td>
              {tx.pendingConversion ? "Pending..." : tx.amountInINR}
            </td>
            <td>{tx.category}</td>
            <td>{tx.description}</td>
            <td>{new Date(tx.timestampUTC).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
