import React from "react";
import { TransactionProvider } from "./context/TransactionContext";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Summary from "./components/Summary";
import CategoryChart from "./components/CategoryChart";
import "./styles/app.css";

export default function App() {
  return (
    <TransactionProvider>
      <div className="container">
        <h1>💰 Currency Tracker</h1>
        <TransactionForm />
        <Summary />
        <CategoryChart />
        <TransactionList />
      </div>
    </TransactionProvider>
  );
}
