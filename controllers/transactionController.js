const { readTransactions, writeTransactions } = require("../models/transactionModel");
const { getExchangeRate } = require("../services/exchangeService");

// Allowed values
const ALLOWED_CURRENCIES = ["INR", "USD"];
const ALLOWED_CATEGORIES = ["Food", "Travel", "Utilities", "Other"];

async function addTransaction(req, res) {
  try {
    let { amount, currency, category, description } = req.body;

    // Validate amount
    if (typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ error: "Amount must be a positive number" });
    }

    // Validate currency
    if (!ALLOWED_CURRENCIES.includes(currency)) {
      return res.status(400).json({ error: `Currency must be one of: ${ALLOWED_CURRENCIES.join(", ")}` });
    }

    // Validate category
    if (!ALLOWED_CATEGORIES.includes(category)) {
      return res.status(400).json({ error: `Category must be one of: ${ALLOWED_CATEGORIES.join(", ")}` });
    }

    // Validate description length
    if (description && description.length > 100) {
      return res.status(400).json({ error: "Description must be 100 characters or less" });
    }

    // Fetch transactions
    const transactions = readTransactions();

    // Get exchange rate
    const rate = await getExchangeRate();
    const amountInINR = currency === "USD" ? amount * rate : amount;

    // Create transaction
    const newTx = {
      id: Date.now(),
      amount,
      currency,
      amountInINR: parseFloat(amountInINR.toFixed(2)),
      category,
      description: description || "",
      timestampUTC: new Date().toISOString()
    };

    // Save
    transactions.push(newTx);
    writeTransactions(transactions);

    res.status(201).json(newTx);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

function getTransactions(req, res) {
  const transactions = readTransactions();
  res.json(transactions);
}

module.exports = { addTransaction, getTransactions };
