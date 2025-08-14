import React, { createContext, useState, useEffect } from "react";
import { fetchTransactions } from "../services/api";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  const loadTransactions = async () => {
    const { data } = await fetchTransactions();
    setTransactions(data);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions, setTransactions, loadTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};
