import React, { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { addTransaction } from "../services/api";

const categories = ["Food", "Travel", "Utilities", "Other"];
const currencies = ["INR", "USD"];

export default function TransactionForm() {
  const { loadTransactions } = useContext(TransactionContext);
  const [form, setForm] = useState({ amount: "", currency: "INR", category: "Food", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || form.amount <= 0) return alert("Enter valid amount");
    await addTransaction({ ...form, amount: Number(form.amount) });
    setForm({ amount: "", currency: "INR", category: "Food", description: "" });
    loadTransactions();
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input type="number" placeholder="Amount" value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })} required />

      <select value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })}>
        {currencies.map(c => <option key={c}>{c}</option>)}
      </select>

      <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
        {categories.map(c => <option key={c}>{c}</option>)}
      </select>

      <input type="text" placeholder="Description (optional)"
        maxLength="100"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })} />

      <button type="submit">Add</button>
    </form>
  );
}
