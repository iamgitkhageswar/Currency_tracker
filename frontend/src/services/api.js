import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const fetchTransactions = () => API.get("/transactions");
export const addTransaction = (data) => API.post("/transactions", data);
export const updatePending = () => API.post("/transactions/updatePending");
